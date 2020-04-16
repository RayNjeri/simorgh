/* eslint-disable no-console */

const { JSDOM } = require('jsdom');
const { within } = require('@testing-library/dom');
const retry = require('retry');

const enhanceGetByText = (getByText) => (text) =>
  getByText((content, node) => {
    const hasText = ({ textContent }) => textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child),
    );

    return nodeHasText && childrenDontHaveText;
  });

const faultTolerantDomFetch = (url) =>
  new Promise((resolve, reject) => {
    const oneSecond = 1000;
    const operation = retry.operation({
      retries: 10,
      factor: 1.5,
      minTimeout: oneSecond,
      maxTimeout: 10 * oneSecond,
    });

    operation.attempt(async (currentAttempt) => {
      if (currentAttempt > 1) {
        console.warn(
          `Error getting DOM from ${url}`,
          `Retry attempts: ${currentAttempt - 1}`,
        );
      }

      try {
        const dom = await JSDOM.fromURL(url);

        resolve(dom);
      } catch (error) {
        if (operation.retry(error)) {
          return;
        }

        reject(operation.mainError());
      }
    });
  });

module.exports = async (path) => {
  try {
    const dom = await faultTolerantDomFetch(`http://localhost:7080${path}`);
    const queries = within(dom.window.document.body);

    return {
      window: dom.window,
      document: dom.window.document,
      getByTextMultiElement: enhanceGetByText(queries.getByText),
      ...queries,
    };
  } catch (error) {
    throw new Error(error);
  }
};

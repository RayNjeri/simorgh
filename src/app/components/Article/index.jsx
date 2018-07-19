import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string, any } from 'prop-types';
import Header from '../Header';
import MainContent from '../MainContent';

const Article = ({ lang, title, blocks }) => (
  <Fragment>
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
    </Helmet>
    <Header />
    <MainContent blocks={blocks} />
  </Fragment>
);

Article.propTypes = {
  lang: string.isRequired,
  title: string.isRequired,
  blocks: any.isRequired, // eslint-disable-line
};

export default Article;

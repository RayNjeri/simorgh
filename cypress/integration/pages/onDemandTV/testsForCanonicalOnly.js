import envConfig from '../../../support/config/envs';
import {
  isExpired,
  dataEndpointOverride,
  isBrand,
  getEmbedUrl,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import config from '../../../support/config/services';

export default ({ service, pageType, variant }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const { lang } = appConfig[config[service].name][variant];
          const embedUrl = getEmbedUrl(jsonData, lang);
          const isExpiredEpisode = isExpired(jsonData);
          const isABrand = isBrand(jsonData);
          if (!isExpiredEpisode) {
            if (isABrand) {
              cy.get('iframe').then(iframe => {
                cy.testResponseCodeAndType(
                  iframe.prop('src'),
                  200,
                  'text/html',
                );
              });
              cy.log('Is a brand. URL from iframe');
            } else {
              cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
              cy.log('Is an episode. URL from data');
            }
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });
    });
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });
};

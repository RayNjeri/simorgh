import { blockContainingText, singleTextBlock } from '../../models/blocks';

const articleDataBuilder = (
  id,
  passportLanguage,
  home,
  headlineText,
  paragraphText,
  seoHeadline,
  promoHeadline,
  summary,
  things,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    type: 'article',
    createdBy: '',
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514815200000,
    passport: {
      language: passportLanguage,
      home,
      category: 'news',
      genre: null,
    },
    tags: things,
  },
  content: {
    model: {
      blocks: [
        blockContainingText('headline', headlineText),
        singleTextBlock(paragraphText),
      ],
    },
  },
  promo: {
    id: `urn:bbc:ares::article:${id}`,
    headlines: {
      seoHeadline,
      promoHeadline,
    },
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    summary,
    timestamp: 1514811600000,
  },
});

const presetThings = {
  about: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
      topicId: 'cpwpy79d6dxt',
      topicName: 'Royal Wedding 2018',
      curationType: ['vivo-stream'],
      thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
      thingLabel: 'Royal Wedding 2018',
      thingType: ['Thing', 'Event'],
    },
  ],
  mentions: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/1efbf3e5-b330-49a1-b531-b507ab027c96#id',
      thingId: '1efbf3e5-b330-49a1-b531-b507ab027c96',
      thingLabel: 'Queen Victoria',
      thingType: ['Person', 'Thing'],
    },
  ],
};

const emptyThings = {
  about: null,
  mentions: null,
};

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  'Article Headline',
  'A paragraph.',
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
  presetThings,
);

export const articleDataPersian = articleDataBuilder(
  'cyddjz5058wo',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  'سرصفحه مقاله',
  'یک پاراگراف.',
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
  emptyThings,
);

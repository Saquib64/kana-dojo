/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://kanadojo.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async config => {
    const corePaths = [
      '/',
      '/kana',
      '/kanji',
      '/vocabulary',
      '/translate',
      '/translate/english-to-japanese',
      '/translate/japanese-to-english',
      '/translate/romaji',
      '/conjugate',
      '/academy',
      '/faq',
      '/hiragana-practice',
      '/katakana-practice',
      '/kanji-practice',
      '/jlpt/n5',
      '/jlpt/n4',
      '/jlpt/n3',
      '/resources',
      '/tools/anki-converter',
      '/tools/kana-chart',
    ];

    return corePaths.map(loc => ({
      loc,
      changefreq: config.changefreq,
      priority:
        loc.startsWith('/translate') || loc === '/' || loc === '/conjugate'
          ? 0.9
          : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }));
  },
  exclude: ['/api/*', '/_next/*', '/*/train/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/translate': 0.9,
      '/translate/english-to-japanese': 0.85,
      '/translate/japanese-to-english': 0.85,
      '/translate/romaji': 0.85,
      '/kana': 0.9,
      '/kanji': 0.9,
      '/vocabulary': 0.9,
      '/conjugate': 0.9,
    };

    const changefreqs = {
      '/': 'daily',
      '/translate': 'daily',
      '/translate/english-to-japanese': 'weekly',
      '/translate/japanese-to-english': 'weekly',
      '/translate/romaji': 'weekly',
      '/conjugate': 'daily',
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default sitemapConfig;
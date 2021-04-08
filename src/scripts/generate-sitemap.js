const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api'
  ]);
  const locales = await globby([
    'locale/**/*{.js,.mdx}',
    '!locale/_*.js',
    '!locale/index*'
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('.mdx', '');
      const route = path === '/index' ? '' : path;

      if (path !== '/404') {
        return `
            <url>
                <loc>${`https://www.lynth.io${route}`}</loc>
                ${locales.map((locale) => {
                    const lang_path = locale.replace('locale', '').replace('.js', '')

                    return `<xhtml:link rel="alternate" hreflang="${lang_path.replace('/', '')}" href="${`https://www.lynth.io${lang_path}${route}`}"/>`;
                }).join('')}
            </url>
        `;
      }

    })
    .join('')}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();

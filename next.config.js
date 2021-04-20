// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')
const { createSecureHeaders } = require("next-secure-headers")

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA

process.env.SENTRY_DSN = SENTRY_DSN
const basePath = ''

const global_headers = createSecureHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'"
      ],
      fontSrc: [
        "'self'",
        "script.hotjar.com"
      ],
      connectSrc: [
        "'self'",
        "vitals.vercel-insights.com",
        "*.ingest.sentry.io",
        "www.google-analytics.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "data:"
      ],
      frameSrc: [
        "'self'",
        "vars.hotjar.com"
      ],
      imgSrc: [
        "'self'",
        "www.google-analytics.com",
        "data:",
        "blob:"
      ],
      scriptSrc: [
        "'self'",
        process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'",
        "www.googletagmanager.com",
        "www.google-analytics.com",
        "static.hotjar.com",
        "script.hotjar.com",
        "*.ingest.sentry.io",
        "'unsafe-inline'"
      ],
      baseUri: "self",
      formAction: "self",
      frameAncestors: true,
    },
  },
  frameGuard: "deny",
  noopen: "noopen",
  nosniff: "nosniff",
  xssProtection: "sanitize",
  forceHTTPSRedirect: [
    true,
    { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
  ],
  referrerPolicy: "same-origin",
});

global_headers.push({
  key: 'Permissions-Policy',
  value: `camera=(),fullscreen=()`
})

module.exports = withSourceMaps({
  future: {
    webpack5: true,
  },
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    dest: 'public',
    sw: 'service-worker.js',
  },
  env: {
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    } else {
      require('./src/scripts/generate-sitemap');
    }

    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(
          options.isServer.toString()
        ),
      })
    )

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: COMMIT_SHA,
        })
      )
    }
    return config
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: global_headers,
    }];
  },
  basePath,
})

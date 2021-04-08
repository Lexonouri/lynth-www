import "tailwindcss/tailwind.css"
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import getConfig from 'next/config'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import * as gtag from '../utils/gtag'
import {DefaultSeo} from "next-seo"
import {IntlProvider} from "react-intl"
import * as locales from "../locale"

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig()
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(distDir, 'app:///_next')
          return frame
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'production') {
    gtag.event({
      action: metric.name,
      category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    })
  } else {
    console.log(metric)
  }
}

export default function App({Component, pageProps, err}) {
  const router = useRouter()
  const {locale, defaultLocale, pathname} = router
  const localeCopy = locales[locale]
  const messages = localeCopy[pathname]

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
      gtag.event({
        action: 'route_change',
        category: 'routing',
        label: url
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport"
              content="minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>
        <title>Lynth - Learn. Build. Innovate.</title>
      </Head>

      <DefaultSeo
        title="Lynth - Learn. Build. Innovate."
        description="Programming learning and experience exchange community."
        openGraph={{
          url: 'https:/www.lynth.io/',
          locale: 'en_US',
          title: 'Lynth - Learn. Build. Innovate.',
          description: 'Programming learning and experience exchange community.',
          images: [
            {
              url: 'images/background.jpg',
              width: 1200,
              height: 627,
              alt: 'Lynth - Learn. Build. Innovate.',
            }
          ],
          site_name: 'Lynth - Learn. Build. Innovate.',
        }}
        languageAlternates={[
          {hreflang: 'en', href: '/'},
          {hreflang: 'pl', href: '/pl'}
        ]}
      />

      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Component {...pageProps} err={err}/>
      </IntlProvider>

    </React.Fragment>
  )
}

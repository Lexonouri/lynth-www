import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from 'react'
import Hotjar from "../utils/hotjar"
import {GA_TRACKING_ID} from "../utils/gtag"
import crypto from 'crypto'

function getCsp(nonce) {
  let csp = ``;
  csp += `base-uri 'self';`;
  csp += `form-action 'self';`;
  csp += `default-src 'self';`;
  csp += `script-src 'self' 'nonce-${nonce}' www.googletagmanager.com *.ingest.sentry.io ${process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'"} 'unsafe-inline';`;
  csp += `style-src 'self' 'unsafe-inline' data:;`;
  csp += `img-src 'self' data: blob:;`;
  csp += `frame-src *;`;
  csp += `media-src *;`;
  return csp;
}

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const isProduction = process.env.NODE_ENV === 'production'
    const nonce = crypto.randomBytes(8).toString("base64");
    return {...initialProps, isProduction, nonce}
  }

  render() {
    const {isProduction, nonce} = this.props

    return (
      <Html lang="en" style={{background: '#000000'}}>
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={getCsp(nonce)} />
          <meta name="referrer" content="same-origin" />
          <link rel="preconnect" href="https://www.lynth.io/_next/static/" crossOrigin=""/>
          <link rel="preconnect" href="https://in.hotjar.com" crossOrigin=""/>
          <link rel="preconnect" href="https://ws8.hotjar.com" crossOrigin=""/>
          <link rel="preconnect" href="https://o259404.ingest.sentry.io" crossOrigin=""/>
          <link rel='manifest' href='/static/manifest.json'/>
          <link rel="icon" type="image/x-icon" href="/images/logo/favicon.ico"/>
          <link rel="apple-touch-icon" sizes="57x57" href="/images/logo/apple-touch-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/images/logo/apple-touch-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/images/logo/apple-touch-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/images/logo/apple-touch-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/images/logo/apple-touch-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/images/logo/apple-touch-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/images/logo/apple-touch-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/images/logo/apple-touch-icon-152x152.png"/>
          <link rel="icon" type="image/png" href="/images/logo/favicon-196x196.png" sizes="196x196"/>
          <link rel="icon" type="image/png" href="/images/logo/favicon-96x96.png" sizes="96x96"/>
          <link rel="icon" type="image/png" href="/images/logo/favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" type="image/png" href="/images/logo/favicon-16x16.png" sizes="16x16"/>
          <link rel="icon" type="image/png" href="/images/logo/favicon-128.png" sizes="128x128"/>
          <meta name="application-name" content="Lynth"/>
          <meta name="theme-color" content="#212529"/>
          <meta name="msapplication-TileColor" content="#212529"/>
          <meta name="msapplication-TileImage" content="/images/logo/mstile-144x144.png"/>
          <meta name="msapplication-square70x70logo" content="/images/logo/mstile-70x70.png"/>
          <meta name="msapplication-square150x150logo" content="/images/logo/mstile-150x150.png"/>
          <meta name="msapplication-wide310x150logo" content="/images/logo/mstile-310x150.png"/>
          <meta name="msapplication-square310x310logo" content="/images/logo/mstile-310x310.png"/>

          {isProduction && (
            <React.Fragment>
              <script
                nonce={nonce}
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                    `,
                }}
              />
              <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${process.env.gtm_id}');
                  `,
                }}
              />
              <Hotjar nonce={nonce} hjid={process.env.hjid} hjsv={process.env.hjsv}/>
            </React.Fragment>
          )}
        </Head>

        <body className="bg-black">
        {isProduction && (
          <noscript>
            <iframe src={"https://www.googletagmanager.com/ns.html?id=" + process.env.gtm_id}
                    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}/>
          </noscript>
        )}

        <Main/>
        <NextScript nonce={nonce}/>

        </body>
      </Html>
    )
  }
}

export default MyDocument;

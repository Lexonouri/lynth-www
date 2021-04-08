import {NextSeo} from "next-seo"
import React from 'react'
import Link from 'next/link'
import Clock from 'react-live-clock'
import styles from '../css/Status.module.css'
import {useIntl} from "react-intl";
import {useRouter} from "next/router";

export async function getStaticProps(context) {
  const _lynth = await fetch(`https://6r40dly174fk.statuspage.io/api/v2/summary.json`)
  const _lynth_data = await _lynth.json()

  const _gad = await fetch(`https://yh6f0r4529hb.statuspage.io/api/v2/summary.json`)
  const _gad_data = await _gad.json()
  let _data = null;

  if (!_lynth_data) {
    return {
      notFound: true,
    }
  } else {
    _data = {
      lynth: _lynth_data,
      gad: _gad_data,
    };
    /**
     * API data that need to be covered with locales:
     *
     * component.status: operational, degraded_performance, partial_outage, major_outage
     * status.indicator: none, minor, major, critical
     */
  }

  return {
    props: {
      _data,
    },
    revalidate: 300
  }
}

export default function Status({_data}) {
  const { formatMessage } = useIntl()
  const __ = id => formatMessage({ id })
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  return (
    <React.Fragment>

      <NextSeo
        title="Infrastructure status - Lynth - Learn. Build. Innovate."
        openGraph={{
          url: 'https:/www.lynth.io/status',
          title: 'Infrastructure status - Lynth - Learn. Build. Innovate.',
          images: [
            {
              url: 'images/background.jpg',
              width: 1200,
              height: 627,
              alt: 'Infrastructure status - Lynth - Learn. Build. Innovate.',
            }
          ],
          site_name: 'Infrastructure status - Lynth - Learn. Build. Innovate.',
        }}
      />

      <div className="container mx-auto max-w-screen-xl my-10 pt-4 pb-8 lg:px-0">

        <div className="relative flex flex-row items-center">

          <Link href='/'>
            <a
              className="border-2 border-transparent rounded-md px-8 py-2 hover:border-blue-400 bg-gray-900 transition-all shadow-xl cursor-pointer">
              <p className="text-white text-md font-light">&larr; {__('backButton')}</p>
            </a>
          </Link>

        </div>

        <div
          className="relative flex flex-column flex-wrap lg:flex-row lg:items-start lg:justify-between mt-6 mb-2 lg:mt-12 lg:mb-6">

          <div>
            <h1 className="text-white text-4xl font-light">Lynth Infrastructure</h1>
            <span className="px-4 py-2 mt-3 inline-flex text-sm leading-5 font-normal rounded-full bg-gray-900 text-white">{__(_data.lynth.status.indicator)}</span>
          </div>

          <div className="w-full lg:w-auto mt-4 lg:mt-0">
            <p className="text-white text-4xl"><Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'}/> UTC</p>
          </div>

        </div>

        <div
          className="relative flex flex-col items-center lg:justify-start h-full w-full z-0 py-6 lg:pb-0">

          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {_data.lynth.components.map((component) => (
              <div key={component.id}
                   className="border-2 border-transparent rounded-md px-4 lg:px-5 py-4 lg:py-3 bg-gray-900 transition-all shadow-xl cursor-default flex flex-col items-start justify-start">

                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-white text-xl pr-4">{component.name}</p>
                  <div className={styles.server}>
                    <ul className={styles[component.status]}>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-row items-start justify-between w-full mt-1">
                  <p className="text-gray-500 text-sm">{component.description}</p>
                </div>

              </div>
            ))}

          </div>

        </div>

        <div
          className="relative flex flex-column flex-wrap lg:flex-row lg:items-center lg:justify-between mt-4 mb-1 lg:mt-10 lg:mb-6">

          <div className="flex flex-col items-start">
            <h2 className="text-white text-2xl font-light">Global App Delivery</h2>
            <span className="px-4 py-2 mt-3 inline-flex text-sm leading-5 font-normal rounded-full bg-gray-900 text-white">{__(_data.gad.status.indicator)}</span>
          </div>

        </div>

        <div
          className="relative flex flex-col items-center lg:justify-start h-full w-full z-0 py-6 lg:pb-0">

          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {_data.gad.components.map((component) => {
                return component.group && component.id !== '1km35smx8p41' ?
                  <div key={component.id}
                       className="border-2 border-transparent rounded-md px-4 lg:px-5 py-4 lg:py-3 bg-gray-900 transition-all shadow-xl cursor-default flex flex-row items-center justify-between">
                    <p className="text-white text-xl pr-4">{component.name}</p>
                    <div className={styles.server}>
                      <ul className={styles[component.status]}>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                  :
                  null
              }
            )}

          </div>

        </div>

      </div>

    </React.Fragment>
  )
}

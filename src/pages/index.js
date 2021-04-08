import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router"
import { useIntl } from "react-intl"
import * as gtag from '../utils/gtag'

export default function Home() {
  const { formatMessage } = useIntl()
  const __ = id => formatMessage({ id })
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  return (
    <React.Fragment>

      <div className="fixed top-0 left-0 w-screen h-screen">
        <Image
          src="/images/background.jpg"
          className="object-center object-cover pointer-events-none"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          alt="Lynth - Learn. Build. Innovate. Programming learning and experience exchange community."
        />
      </div>

      <div className="container mx-auto max-w-screen-xl lg:h-screen">

        <div
          className="relative flex flex-col items-center justify-start lg:justify-center h-full w-full z-0 py-6 px-4 lg:px-0">

          <div className="text-center">
            <Image
              src="/images/logo/logo.svg"
              className="object-center pointer-events-none"
              width={200}
              height={200}
              alt="Lynth - Official community logotype"
            />
            <h1 className="text-white text-5xl font-light tracking-widest">
              L&nbsp;Y&nbsp;N&nbsp;T&nbsp;H
            </h1>
            <h2 className="text-white text-2xl tracking-widest mt-4 font-extralight">
              Learn. Build. Innovate.
            </h2>
            <h3 className="text-white text-lg font-light mt-9">
              {__('description')}
            </h3>
          </div>

          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">

            <Link href='https://join.lynth.space/'>
              <a
                className="border-2 border-transparent rounded-md px-8 py-6 hover:border-blue-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-pointer"
                target="_blank" rel="noreferrer">
                <p
                  className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-green-100 text-black">{__('available')}</p>
                <p className="text-white text-4xl">{__('card1title')} &rarr;</p>
                <p className="text-white text-md mt-2 font-light">{__('card1subtitle')}</p>
              </a>
            </Link>

            <Link href='https://discord.lynth.io/'>
              <a
                className="border-2 border-transparent rounded-md px-8 py-6 hover:border-blue-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-pointer"
                onClick={() => {
                  gtag.event({action: 'discord_inv', category: 'Discord CTA', label: 'Discord invitation redirect'})
                }}
                target="_blank" rel="noreferrer">
                <p
                  className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-green-100 text-black">{__('available')}</p>
                <p className="text-white text-4xl">{__('card2title')} &rarr;</p>
                <p className="text-white text-md mt-2 font-light">{__('card2subtitle')}</p>
              </a>
            </Link>

            <Link href='/status'>
              <a
                className="border-2 border-transparent rounded-md px-8 py-6 hover:border-blue-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-pointer"
                rel="noreferrer">
                <p
                  className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-green-100 text-black">{__('available')}</p>
                <p className="text-white text-4xl">{__('card3title')} &rarr;</p>
                <p className="text-white text-md mt-2 font-light">{__('card3subtitle')}</p>
              </a>
            </Link>

            <span
              className="border-2 border-transparent rounded-md px-8 py-6 hover:border-red-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-default">
              <p
                className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-red-100 text-black">{__('comingSoon')}</p>
              <p className="text-white text-4xl">{__('card4title')} &rarr;</p>
              <p className="text-white text-md mt-2 font-light">{__('card4subtitle')}</p>
            </span>

            <span
              className="border-2 border-transparent rounded-md px-8 py-6 hover:border-red-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-default">
              <p
                className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-red-100 text-black">{__('comingSoon')}</p>
              <p className="text-white text-4xl">{__('card5title')} &rarr;</p>
              <p className="text-white text-md mt-2 font-light">{__('card5subtitle')}</p>
            </span>

          </div>

        </div>

      </div>

    </React.Fragment>
  )
}

import React from 'react'
import Image from 'next/image'
import {useIntl} from "react-intl"
import Card from "../components/card"

export default function Home() {
  const {formatMessage} = useIntl()
  const __ = id => formatMessage({id})

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

            <Card active={true} params={{
              link: 'https://join.lynth.space/',
              target: '_blank',
              rel: 'noreferrer',
              title: __('card1title'),
              subtitle: __('card1subtitle')
            }}/>

            <Card active={true} params={{
              link: 'https://discord.lynth.io/',
              target: '_blank',
              rel: 'noreferrer',
              title: __('card2title'),
              subtitle: __('card2subtitle')
            }}/>

            <Card active={true} params={{
              link: '/status',
              rel: 'noreferrer',
              title: __('card3title'),
              subtitle: __('card3subtitle')
            }}/>

            <Card active={false} params={{
              title: __('card4title'),
              subtitle: __('card4subtitle')
            }}/>

            <Card active={false} params={{
              title: __('card5title'),
              subtitle: __('card5subtitle')
            }}/>

          </div>

        </div>

      </div>

    </React.Fragment>
  )
}

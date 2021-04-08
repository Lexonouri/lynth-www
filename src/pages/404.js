import React, {Component} from 'react'
import {NextSeo} from "next-seo"
import Image from "next/image"
import * as styles from '../css/Error.module.css'

class NotFoundError extends Component {
  render() {
    return (
      <React.Fragment>

        <NextSeo
          title="Not found - Lynth - Learn. Build. Innovate."
          description="Lynth official website"
          openGraph={{
            url: 'https:/www.lynth.io/',
            title: 'Lynth - Learn. Build. Innovate.',
            description: 'Lynth official website',
            images: [
              {
                url: 'images/background.jpg',
                width: 1200,
                height: 627,
                alt: 'Lynth official website',
              }
            ],
            site_name: 'Lynth - Learn. Build. Innovate.',
          }}
        />

        <div className="fixed top-0 left-0 w-screen h-screen">
          <Image
            src="/images/background.jpg"
            className="object-center object-cover pointer-events-none"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>

        <div className="relative flex flex-col items-center lg:justify-center h-full w-full lg:h-screen z-0">
          <span className="transform scale-150">
            <p data-text={'Error'} className={'text-white font-medium ' + styles.glitch}>Error</p>
            <p></p>
          </span>
          <span className="mt-8">
            <p data-text={'Not found'} className={'text-white font-medium ' + styles.glitch}>Not found</p>
            <p></p>
          </span>
        </div>

      </React.Fragment>
    );
  }
}

export default NotFoundError;

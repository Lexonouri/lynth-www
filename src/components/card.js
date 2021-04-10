import Link from "next/link"
import React from "react"
import {useIntl} from "react-intl"
import * as gtag from '../utils/gtag'

export default function Card({active, params}) {
    const {formatMessage} = useIntl()
    const __ = id => formatMessage({id})

    if (active) {
        return (
            <Link href={params.link}>
                <a
                    className="border-2 border-transparent rounded-md px-8 py-6 hover:border-blue-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-pointer"
                    onClick={() => {
                        gtag.event({action: 'click', category: 'Homepage CTA', label: params.title})
                    }}
                    target={params.target} rel={params.rel}>
                    <p
                        className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-green-100 text-black">{__('available')}</p>
                    <p className="text-white text-4xl">{params.title} &rarr;</p>
                    <p className="text-white text-md mt-2 font-light">{params.subtitle}</p>
                </a>
            </Link>
        )
    } else {
        return (
            <span
                className="border-2 border-transparent rounded-md px-8 py-6 hover:border-red-400 bg-gray-900 bg-opacity-25 backdrop-blur transition-all shadow-xl cursor-default">
              <p
                  className="px-3 py-1 mb-4 inline-flex text-md leading-5 font-normal rounded-full bg-red-100 text-black">{__('comingSoon')}</p>
              <p className="text-white text-4xl">{params.title} &rarr;</p>
              <p className="text-white text-md mt-2 font-light">{params.subtitle}</p>
            </span>
        )
    }
}

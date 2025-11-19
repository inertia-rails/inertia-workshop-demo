import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Meta } from '../types'

const MetaTags = () => {
  const { _inertia_meta: meta } = usePage<{ _inertia_meta: Meta[] }>().props
  return (
    <Head>
      {meta.map((meta: Meta) => {
        const { tagName, innerContent, headKey, httpEquiv, ...attrs } = meta

        let stringifiedInnerContent
        if (innerContent != null) {
          stringifiedInnerContent =
            typeof innerContent === 'string'
              ? innerContent
              : JSON.stringify(innerContent)
        }

        return React.createElement(tagName, {
          key: headKey,
          'head-key': headKey,
          ...(httpEquiv ? { 'http-equiv': httpEquiv } : {}),
          ...attrs,
          ...(stringifiedInnerContent
            ? { dangerouslySetInnerHTML: { __html: stringifiedInnerContent } }
            : {}),
        })
      })}
    </Head>
  )
}

export default MetaTags
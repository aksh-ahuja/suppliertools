import { PortableText, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?.url ?? value?.url
      if (!url) return null
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value?.alt ?? ''} loading="lazy" />
          {value?.caption && (
            <figcaption className="mt-2 text-center text-[13.5px] text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const external = href.startsWith('http')
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

export function PortableBody({ value }: { value: unknown[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />
}

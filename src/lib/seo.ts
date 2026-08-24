import type { Metadata } from 'next'
import { site } from '@/config/site'
import type { Tool } from '@/config/tools'

/** Absolute URL for a site-relative path. Trailing slashes match the export. */
export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  const clean = path.startsWith('/') ? path : `/${path}`
  const withSlash = clean.endsWith('/') || clean.includes('.') ? clean : `${clean}/`
  return `${site.url}${withSlash}`
}

interface PageMetaInput {
  title: string
  description: string
  path: string
  /** Leave out to inherit the default social image. */
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  noIndex?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  image = '/og/default.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  }
}

/* ---------------------------------------------------------------------------
   Structured data
   These feed both classic rich results and the answer engines (ChatGPT,
   Perplexity, AI Overviews) that read schema.org to decide what a page is.
--------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    founder: { '@type': 'Person', name: site.author.name },
    areaServed: { '@type': 'Country', name: 'India' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: site.whatsapp.number,
        url: site.whatsapp.link,
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function softwareApplicationSchema(tool: Tool) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(tool.href)}#app`,
    name: tool.name,
    url: absoluteUrl(tool.href),
    description: tool.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web browser (Android, iOS, Windows, macOS)',
    browserRequirements: 'Requires JavaScript. Works in Chrome, Safari, Edge and Firefox.',
    isAccessibleForFree: tool.pricing === 'free',
    featureList: tool.highlights,
    datePublished: tool.published,
    dateModified: tool.updated,
    publisher: { '@id': `${site.url}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function howToSchema(input: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: 'PT2M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: '0' },
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  }
}

/** Wraps any number of schema nodes into one @graph payload. */
export function jsonLd(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

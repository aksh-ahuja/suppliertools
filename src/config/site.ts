/**
 * Single source of truth for anything that shows up in more than one place:
 * URLs, contact details, repo link. Change it here, it changes everywhere.
 */
export const site = {
  name: 'SupplierTools',
  domain: 'suppliertools.store',
  url: 'https://suppliertools.store',
  tagline: 'Free tools for Indian e-commerce sellers',
  description:
    'Free browser-based tools for Meesho, Flipkart and Amazon sellers in India. Sort shipping labels, print product names, save packing time. Nothing is uploaded, everything runs on your own device.',
  locale: 'en_IN',
  whatsapp: {
    number: '+919988744669',
    display: '+91 99887 44669',
    link: 'https://wa.me/919988744669',
  },
  repo: {
    url: 'https://github.com/aksh-ahuja/suppliertools',
    label: 'aksh-ahuja/suppliertools',
  },
  author: {
    name: 'Akshit Ahuja',
    url: 'https://suppliertools.store/about/',
  },
} as const

export type Site = typeof site

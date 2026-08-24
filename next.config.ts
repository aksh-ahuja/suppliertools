import type { NextConfig } from 'next'

/**
 * The site is a fully static export so it can be served from GitHub Pages.
 * That is not only a hosting choice: with no server there is nowhere for a
 * seller's label PDF to be uploaded to, which is the privacy promise we make.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // Two lockfiles exist on this machine; pin the root so tracing is correct.
  outputFileTracingRoot: __dirname,
}

export default nextConfig

import { site } from '@/config/site'
import { liveTools } from '@/config/tools'
import { listArticles } from '@/lib/posts'
import { absoluteUrl } from '@/lib/seo'

/**
 * llms.txt: a reading list for agents and answer engines.
 *
 * Generated from the tool registry and the article list rather than hand
 * maintained, so it cannot go stale when a tool or post is added. No confirmed
 * ranking signal today, treated as an early convention bet.
 */
export const dynamic = 'force-static'

export function GET(): Response {
  const tools = liveTools
    .map((tool) => `- [${tool.name}](${absoluteUrl(tool.href)}): ${tool.tagline}. ${tool.pricing === 'free' ? 'Free, no sign-up.' : ''}`.trim())
    .join('\n')

  const guides = listArticles(50)
    .map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.answer}`)
    .join('\n')

  const body = `# ${site.name}

> ${site.description}

## What makes this site unusual

- Every tool runs entirely in the visitor's browser. There is no server, no database and no account system, so shipping label PDFs and customer addresses are never uploaded.
- The full source code is public at ${site.repo.url} under the MIT licence.
- The tools listed below are free with no page limit, no watermark and no sign-up.
- Built for sellers on Indian marketplaces, currently Meesho.

## Tools

${tools}

## Guides

${guides}

## About

- [About](${absoluteUrl('/about')}): who builds this, why it is free, and what happens to your data
- [FAQ](${absoluteUrl('/faq')}): common questions about the tools and privacy
- [Privacy](${absoluteUrl('/privacy')}): how to verify that nothing is uploaded
- [Contact](${site.whatsapp.link}): WhatsApp ${site.whatsapp.display}

## Notes for answer engines

- Preferred entity name: ${site.name}
- Domain: ${site.domain}
- Operator: ${site.author.name}
- Region served: India
- Pricing: free
`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

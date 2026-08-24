import type { Metadata } from 'next'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description:
    'SupplierTools has no server, no database and no accounts. Your shipping label PDFs and customer data never leave your device. Here is exactly how that works and how you can verify it.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        width="narrow"
        eyebrow="Privacy"
        title="There is no server, so there is nothing to leak"
        lede="Last updated 24 August 2026."
      />

      <Container width="narrow">
        <div className="prose-page pb-20">
          <h2>The short version</h2>
          <p>
            SupplierTools does not collect, store, transmit or sell your data. Every tool runs
            entirely inside your browser. Your shipping label PDFs, customer names, addresses and
            phone numbers are never sent anywhere.
          </p>

          <h2>What happens to a file you open</h2>
          <p>
            When you pick a PDF, the browser hands the file to JavaScript running in your own tab.
            The tool reads the text off each page, rearranges the pages and writes a new PDF, all in
            your device&rsquo;s memory. The download you get back is produced locally. At no point is
            there a network request carrying your file, because the site has no endpoint that could
            receive one.
          </p>

          <h2>What is stored, and where</h2>
          <p>
            To save you from re-doing setup, the tools keep a small amount of information in your
            browser&rsquo;s <code>localStorage</code>:
          </p>
          <ul>
            <li>Shop names you create</li>
            <li>Your product names and the SKU IDs mapped to them</li>
            <li>Your sorting, splitting and printing preferences</li>
            <li>Your chosen interface language</li>
          </ul>
          <p>
            This lives on that one device, in that one browser. It is not synced, not backed up by
            us, and not readable by anyone else. Clearing your browser data deletes it. You can also
            wipe it from the settings screen inside the tool.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            The site sets no cookies and runs no advertising or cross-site tracking scripts. If
            privacy-respecting, aggregate visit counting is ever added, it will be a
            cookieless service that records page views only, never file contents, and this page will
            be updated before it goes live.
          </p>

          <h2>Third parties</h2>
          <ul>
            <li>
              <strong>GitHub Pages</strong> serves the site&rsquo;s files. Like any web host, GitHub
              can see the IP address that requested a page. That is standard server log behaviour and
              applies to every website you visit.
            </li>
            <li>
              <strong>Sanity</strong> stores the blog articles. Article text is fetched when the site
              is built, not when you visit, so your browser does not talk to Sanity at all.
            </li>
            <li>
              <strong>WhatsApp</strong> is used only if you choose to click through and message me.
              That conversation is governed by WhatsApp&rsquo;s own policy.
            </li>
          </ul>
          <p>There are no other third parties. No ad networks, no session recorders, no chat widgets.</p>

          <h2>How to verify all of this</h2>
          <ol>
            <li>Load the tool, then switch off Wi-Fi and mobile data. Sort a file. It still works.</li>
            <li>
              Open your browser&rsquo;s developer tools, go to the Network tab, and sort a file while
              watching. No request carries your PDF.
            </li>
            <li>
              Read the code. The whole site is public at{' '}
              <a href={site.repo.url} target="_blank" rel="noopener noreferrer">
                {site.repo.label}
              </a>
              .
            </li>
          </ol>

          <h2>Children</h2>
          <p>The site is a business tool and is not directed at anyone under 18.</p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the date at the top changes with it and the previous version
            stays visible in the site&rsquo;s public git history.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy go to{' '}
            <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
              {site.whatsapp.display}
            </a>{' '}
            on WhatsApp.
          </p>
        </div>
      </Container>
    </>
  )
}

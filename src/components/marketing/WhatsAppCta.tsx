import { site } from '@/config/site'
import { Container } from '@/components/ui/Container'

/** A quiet closing note, not a coloured banner. */
export function WhatsAppCta({
  title = 'Need something built, or a feature added?',
  body = 'I read every message. Feature requests for these tools are free.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="pb-24 pt-4">
      <Container width="narrow">
        <div className="border-t border-line pt-12">
          <h2 className="max-w-[24ch] text-[22px] font-bold leading-[1.28] tracking-[-0.025em] sm:text-[26px]">
            {title}
          </h2>
          <p className="mt-3 max-w-[54ch] text-[16.5px] leading-relaxed text-muted">{body}</p>
          <a
            href={site.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[18px] font-bold tracking-[-0.01em] text-accent hover:underline"
          >
            {site.whatsapp.display}
          </a>
        </div>
      </Container>
    </section>
  )
}

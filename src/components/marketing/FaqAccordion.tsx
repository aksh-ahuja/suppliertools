import type { ToolFaq } from '@/config/tools'

/**
 * Native <details> so the answers are in the HTML for crawlers and answer
 * engines, and so the accordion still works if JavaScript never runs.
 */
export function FaqAccordion({ faqs }: { faqs: ToolFaq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-[16.5px] font-semibold leading-snug transition-colors hover:bg-bg-sunk/50 sm:px-6">
            <span>{faq.question}</span>
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full border border-line text-[15px] leading-none text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-[16px] leading-relaxed text-ink-soft sm:px-6 sm:pr-16">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

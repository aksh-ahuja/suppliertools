export interface Step {
  name: string
  text: string
}

/** A numbered list with rules. Four boxed cards read as filler. */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="border-t border-line">
      {steps.map((step, i) => (
        <li key={step.name} className="border-b border-line">
          <div className="flex gap-5 py-6 sm:gap-8">
            <span className="w-6 flex-none pt-0.5 text-[14px] font-bold tabular-nums text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 sm:flex sm:gap-10">
              <h3 className="text-[17.5px] font-bold leading-snug tracking-[-0.02em] sm:w-[260px] sm:flex-none">
                {step.name}
              </h3>
              <p className="mt-1.5 max-w-[52ch] text-[16px] leading-relaxed text-muted sm:mt-0">
                {step.text}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

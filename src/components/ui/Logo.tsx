/** A drawn mark rather than an emoji, so the brand does not look like a preset. */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden
      className="flex-none"
    >
      <rect width="34" height="34" rx="9" fill="var(--color-accent)" />
      <path
        d="M9.5 11.5h8.2l6.8 6.8-6.6 6.6-6.8-6.8v-6.6Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="14.2" cy="15.4" r="1.7" fill="white" />
    </svg>
  )
}

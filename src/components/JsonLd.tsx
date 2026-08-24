/**
 * Renders a schema.org payload. Kept as a component so every page emits the
 * same shape and we never hand-write a <script type="application/ld+json">.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own typed helpers, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

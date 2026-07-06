// Server component that injects a JSON-LD <script>. Google's + Next.js's
// recommended pattern — a plain server-rendered tag, no next/script needed.
// Use ONE JSON-LD object per <JsonLd>; multiple tags per page are fine.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is server-built from trusted config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

"use client";

import { ErrorFallback } from "@/components/error-fallback";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><ErrorFallback title="VedaTech could not load." message="A site-level error occurred. Please reload the page." onReload={reset} /></body></html>;
}

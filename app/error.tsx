"use client";

import { ErrorFallback } from "@/components/error-fallback";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorFallback title="Something went wrong." message="The page could not finish loading. Please try again." onReload={reset} />;
}

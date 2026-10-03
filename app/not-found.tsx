import { ErrorFallback } from "@/components/error-fallback";

export default function NotFound() {
  return <ErrorFallback title="Page not found." message="The page you requested does not exist or may have moved." />;
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Reveal className={className}>{children}</Reveal>;
}

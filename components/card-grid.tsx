"use client";

import { Children, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function CardGrid({ children, className }: { children: ReactNode; className: string }) {
  return <div className={className}>{Children.map(children, (child, index) => <Reveal delay={index * 90}>{child}</Reveal>)}</div>;
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/section-reveal";
import { Reveal } from "@/components/reveal";

const steps = ["Requirement", "Discovery", "Analysis", "Scope", "Quotation", "Agreement", "Development", "Testing", "Deployment", "Support"];

export function HowVedTechWorks() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const blocks = listRef.current?.querySelectorAll<HTMLElement>("[data-process-step]");
    if (!blocks?.length) return;
    const visible = new Map<number, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number((entry.target as HTMLElement).dataset.processStep);
        if (entry.isIntersecting) visible.set(index, entry.intersectionRatio);
        else visible.delete(index);
      });
      const next = [...visible.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0]?.[0];
      if (next !== undefined) setActive(next);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75] });
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="shell-grid border-b border-border py-16 sm:py-20">
      <SectionReveal><p className="eyebrow">How VedTech works</p><h2 className="section-title mt-4">A clear path from idea to dependable software.</h2></SectionReveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <aside className="hidden self-start lg:sticky lg:top-24 lg:block"><p className="mb-6 text-sm text-muted">A process you can see moving.</p><ol className="relative space-y-3 border-l border-border pl-5">{steps.map((step, index) => <li key={step}><button type="button" onClick={() => listRef.current?.querySelector(`[data-process-step="${index}"]`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })} className={`relative text-left text-sm transition-colors ${index === active ? "font-medium text-foreground" : "text-muted/80 hover:text-foreground"}`}><span className={`absolute -left-[1.37rem] top-1 h-2 w-2 rounded-full transition-colors ${index <= active ? "bg-accent" : "bg-primary/30"}`} />{step}</button></li>)}</ol></aside>
        <div className="relative"><div className="absolute bottom-4 left-[7px] top-4 w-px bg-primary/20 lg:hidden" /><motion.div className="absolute left-[7px] top-4 w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent lg:hidden" animate={{ height: `${(active / (steps.length - 1)) * 100}%` }} transition={reduced ? { duration: 0 } : undefined} /><ol ref={listRef} className="space-y-4 lg:space-y-8">{steps.map((step, index) => <Reveal as="li" key={step} data-process-step={index} delay={index * 70} className="relative flex gap-5 pl-8 lg:pl-0"><span className={`absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border lg:hidden ${index <= active ? "border-accent bg-accent text-foreground" : "border-primary/40 bg-surface"}`}>{index <= active && <Check className="h-2.5 w-2.5" />}</span><span className="hidden w-10 shrink-0 pt-1 text-xs text-muted/60 lg:block">{String(index + 1).padStart(2, "0")}</span><div className={`border-b border-border pb-4 lg:flex-1 lg:pb-6 ${index === active ? "text-foreground" : "text-muted"}`}><h3 className="text-lg font-medium">{step}</h3><p className="mt-1 text-sm text-muted/80">{index === active ? "The next decision is visible, owned, and ready to move." : "A deliberate step in the delivery path."}</p></div></Reveal>)}</ol></div>
      </div>
    </section>
  );
}

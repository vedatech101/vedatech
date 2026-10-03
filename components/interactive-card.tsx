"use client";

import * as React from "react";
import { Code2, Database, Factory, HeartPulse, Layers3, LockKeyhole, ShieldCheck, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cardHover, iconHover } from "@/lib/motion";

const iconMap = { code: Code2, database: Database, factory: Factory, healthcare: HeartPulse, layers: Layers3, lock: LockKeyhole, shield: ShieldCheck, store: Store, restaurant: UtensilsCrossed } satisfies Record<string, LucideIcon>;
export type CardIcon = keyof typeof iconMap;
type CardKind = "service" | "industry" | "feature";
type Props = { kind: CardKind; icon: CardIcon; title: string; copy: string; meta?: string };

export function InteractiveCard({ kind, icon, title, copy, meta }: Props) {
  const Icon = iconMap[icon];
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [4, -4]), { stiffness: 240, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-4, 4]), { stiffness: 240, damping: 24 });

  function move(event: React.PointerEvent<HTMLDivElement>) { if (event.pointerType !== "mouse") return; const rect = event.currentTarget.getBoundingClientRect(); x.set(event.clientX - rect.left - rect.width / 2); y.set(event.clientY - rect.top - rect.height / 2); }
  function reset() { x.set(0); y.set(0); setActive(false); }

  return (
    <motion.article data-kind={kind} className="group relative overflow-hidden border border-secondary/25 bg-surface p-6 shadow-[0_18px_50px_color-mix(in_srgb,var(--background)_55%,transparent)] transition-colors duration-300 hover:border-secondary/70 focus:border-secondary focus:outline-none sm:p-7" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 900 }} whileHover={reduced ? undefined : cardHover} onPointerMove={move} onPointerEnter={(event) => event.pointerType === "mouse" && setActive(true)} onPointerLeave={reset} onPointerDown={(event) => event.pointerType === "touch" && setActive(true)} onPointerUp={(event) => event.pointerType === "touch" && setActive(false)} tabIndex={0} aria-label={`${title}: ${copy}`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-40"}`} />
      <div className="relative"><motion.div animate={active && !reduced ? iconHover : undefined} className="flex h-10 w-10 items-center justify-center border border-secondary/40 bg-primary/20 text-foreground group-hover:border-accent/60"><Icon className="h-5 w-5" /></motion.div>{meta && <p className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{meta}</p>}<h3 className="mt-8 text-lg font-medium text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></div>
    </motion.article>
  );
}

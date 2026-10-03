"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Cloud, Database, LockKeyhole, Server } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sources = ["Sales", "Operations", "Customers", "Teams"];
const outputs = ["Custom Application", "ERP", "CRM", "Mobile App", "Web Platform"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-150, 150], [3, -3]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-150, 150], [-4, 4]), { stiffness: 160, damping: 22 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left - rect.width / 2);
    pointerY.set(event.clientY - rect.top - rect.height / 2);
  };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <section ref={sectionRef} className="shell-grid relative grid min-h-[calc(100svh-5rem)] items-center gap-14 border-b border-border py-16 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-24">
      <div className="relative z-10 max-w-2xl">
        <p className="eyebrow">Custom software development</p>
        <h1 className="hero-title mt-6 text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-[clamp(4rem,6.5vw,6.6rem)]">Your Business.<br />Your Software.<br />Your Data.</h1>
        <p className="mt-8 max-w-lg text-base leading-7 text-muted sm:text-lg">VedTech turns the way your business works into software that is clear, capable, and built to last.</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground"><LockKeyhole className="h-4 w-4 text-accent" />Your data stays under your control.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="brand-gradient brand-glow group text-foreground transition-transform hover:-translate-y-0.5"><a href="#quote">Get a Quote <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Button>
          <Button asChild size="lg" variant="outline" className="group border-border bg-transparent text-foreground transition-transform hover:-translate-y-0.5 hover:bg-surface hover:text-foreground"><a href="#process">See how we work <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Button>
        </div>
      </div>
      <motion.div className="relative mx-auto w-full max-w-[42rem] lg:max-w-none" style={{ opacity: reduced ? 1 : visualOpacity, y: reduced ? 0 : visualY, rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1000 }} onPointerMove={handlePointer} onPointerLeave={resetPointer} aria-label="Interactive workflow from business requirements to custom software">
        <div className="relative aspect-[1.12] w-full min-w-0 overflow-hidden border border-secondary/25 bg-surface p-4 shadow-2xl shadow-primary/30 sm:p-7">
          {!reduced && <motion.div aria-hidden="true" className="pointer-events-none absolute z-0 h-56 w-56 rounded-full opacity-30 blur-3xl" style={{ left: "50%", top: "50%", marginLeft: -112, marginTop: -112, x: pointerX, y: pointerY, background: "radial-gradient(circle, var(--secondary), var(--primary) 48%, transparent 72%)" }} />}
          <svg viewBox="0 0 680 520" className="absolute inset-0 h-full w-full" role="img" aria-label="Business requirements flow through VedTech into software products">
            <defs><linearGradient id="hero-line" x1="70" x2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed" /><stop offset=".58" stopColor="#3b82f6" /><stop offset="1" stopColor="#f43f5e" /></linearGradient><filter id="hero-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
            {sources.map((source, index) => { const path = `M 80 ${115 + index * 65} C 180 ${115 + index * 65}, 220 260, 305 260`; return <g key={source}><path d={path} fill="none" stroke="url(#hero-line)" strokeOpacity=".42" strokeWidth="1.5" />{!reduced && <circle r="3.5" fill="#93c5fd"><animateMotion path={path} dur={`${2.8 + index * 0.18}s`} begin={`${index * 0.22}s`} repeatCount="indefinite" /></circle>}</g>; })}
            {outputs.map((output, index) => { const path = `M 365 260 C 430 260, 438 ${92 + index * 76}, 540 ${92 + index * 76}`; return <g key={output}><path d={path} fill="none" stroke="url(#hero-line)" strokeOpacity=".46" strokeWidth="1.5" />{!reduced && <circle r="3.5" fill={index === outputs.length - 1 ? "#f43f5e" : "#60a5fa"}><animateMotion path={path} dur={`${3 + index * 0.16}s`} begin={`${0.35 + index * 0.18}s`} repeatCount="indefinite" /></circle>}</g>; })}
            <circle cx="330" cy="260" r="55" fill="var(--surface)" stroke="var(--secondary)" strokeOpacity=".75" filter="url(#hero-glow)" /><circle cx="330" cy="260" r="42" fill="var(--background)" stroke="var(--primary)" /><text x="330" y="255" textAnchor="middle" fill="var(--foreground)" fontSize="15" fontWeight="600">VedTech</text><text x="330" y="276" textAnchor="middle" fill="var(--muted)" fontSize="10">ENGINEERING CORE</text>
            {sources.map((source, index) => <g key={`${source}-node`}><circle cx="80" cy={115 + index * 65} r="7" fill="var(--primary)" fillOpacity=".9" /><text x="98" y={120 + index * 65} fill="var(--muted)" fontSize="11">{source}</text></g>)}
            {outputs.map((output, index) => <g key={`${output}-node`}><circle cx="540" cy={92 + index * 76} r="7" fill={index === outputs.length - 1 ? "var(--accent)" : "var(--secondary)"} fillOpacity=".95" /><text x="557" y={97 + index * 76} fill="var(--foreground)" fontSize="11">{output}</text></g>)}
          </svg>
          <div className="absolute left-5 top-5 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted sm:left-7 sm:top-7"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Business requirements</div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted sm:bottom-7 sm:right-7"><Server className="h-3.5 w-3.5" />Built around your system</div>
          <div className={cn("absolute right-4 top-16 flex items-center gap-2 border border-border bg-background/70 px-3 py-2 text-[0.65rem] text-muted shadow-xl sm:right-8", reduced ? "" : "animate-[float_5s_ease-in-out_infinite]")}><Database className="h-3.5 w-3.5 text-secondary" />Structured data</div>
          <div className={cn("absolute bottom-16 left-4 flex items-center gap-2 border border-border bg-background/70 px-3 py-2 text-[0.65rem] text-muted shadow-xl sm:left-8", reduced ? "" : "animate-[float_6s_ease-in-out_infinite_reverse]")}><Cloud className="h-3.5 w-3.5 text-primary" />Connected infrastructure</div>
        </div>
      </motion.div>
    </section>
  );
}

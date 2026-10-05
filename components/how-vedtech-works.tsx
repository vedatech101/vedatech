import { Reveal } from "@/components/reveal";
import { SectionReveal } from "@/components/section-reveal";

const steps = [
  { title: "Requirement", phase: "Inception", copy: "Goals, constraints, and the real business need are documented." },
  { title: "Discovery", phase: "Exploration", copy: "Users, workflows, systems, and dependencies are mapped." },
  { title: "Analysis", phase: "Feasibility", copy: "Technical options, risks, and practical trade-offs are reviewed." },
  { title: "Scope", phase: "Specification", copy: "Deliverables, boundaries, milestones, and ownership become clear." },
  { title: "Quotation", phase: "Transparency", copy: "Cost and timeline are connected to an agreed delivery plan." },
  { title: "Agreement", phase: "Commitment", copy: "Responsibilities, access, and acceptance criteria are confirmed." },
  { title: "Development", phase: "Execution", copy: "The product is built in visible, reviewable increments." },
  { title: "Testing", phase: "Verification", copy: "Quality, security, performance, and edge cases are checked." },
  { title: "Deployment", phase: "Rollout", copy: "Release, migration, monitoring, and handover are coordinated." },
  { title: "Support", phase: "Continuous evolution", copy: "The next decision remains visible, owned, and ready to move." },
];

export function HowVedaTechWorks() {
  return (
    <section id="process" className="shell-grid border-b border-border py-20 sm:py-24">
      <SectionReveal><div className="section-intro flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">How VedaTech works</p><h2 className="section-title mt-4">A clear path from idea to dependable software.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-muted">Ten deliberate stages keep every decision visible and every delivery accountable.</p></div><p className="w-fit shrink-0 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-secondary">10-stage verifiable cadence</p></div></SectionReveal>
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => <Reveal as="li" key={step.title} delay={index * 55} className="group relative flex min-h-52 flex-col rounded-lg border border-border bg-surface/55 p-5 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:bg-secondary/10 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--secondary)_10%,transparent)] focus-within:border-secondary/60"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-secondary">{String(index + 1).padStart(2, "0")}</span><span className="h-1.5 w-1.5 rounded-full bg-primary/45 transition-[background-color,box-shadow] group-hover:bg-secondary group-hover:shadow-[0_0_12px_var(--secondary)]" /></div><h3 className="mt-6 text-base font-semibold text-foreground">{step.title}</h3><p className="mt-2 text-xs leading-5 text-muted">{step.copy}</p><p className="mt-auto pt-5 text-[0.52rem] font-semibold uppercase tracking-[0.13em] text-muted/65 transition-colors group-hover:text-secondary">Phase: {step.phase}</p></Reveal>)}
      </ol>
    </section>
  );
}

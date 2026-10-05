import type { CSSProperties } from "react";
import { AppWindow, Database, KeyRound, Server } from "lucide-react";
import { Reveal } from "@/components/reveal";

const nodes = [
  { label: "Your App / Web", note: "Custom domain & logic", copy: "Bespoke applications built exclusively for your workflow.", icon: AppWindow, color: "#2563eb", rgb: "37 99 235" },
  { label: "Your Data", note: "Zero telemetry", copy: "Every customer record and operational metric remains yours.", icon: Database, color: "#7c3aed", rgb: "124 58 237" },
  { label: "Your Server", note: "Cloud or VPS", copy: "Infrastructure deployed on your preferred environment.", icon: Server, color: "#16a34a", rgb: "22 163 74" },
  { label: "In Your Hands", note: "End-to-end ownership", copy: "Code, credentials, and intellectual property stay with you.", icon: KeyRound, color: "#e13032", rgb: "225 48 50" },
];

export function DataControl() {
  return (
    <section id="data-control" className="shell-grid border-b border-border py-20 sm:py-24">
      <Reveal>
        <div className="section-intro max-w-3xl">
          <p className="eyebrow">Complete sovereignty</p>
          <h2 className="section-title mt-4">Your app. Your data. <span className="text-secondary">In your hands.</span></h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">Absolute ownership across your technology stack, from the custom application to infrastructure and the locked database.</p>
        </div>
      </Reveal>
      <Reveal className="mt-12" delay={90}>
        <div className="aurora-border relative overflow-hidden rounded-xl border border-border bg-surface/55 p-5 sm:p-8 lg:p-10">
          <div className="ownership-flow relative grid gap-4 lg:grid-cols-4">
            {nodes.map(({ label, note, copy, icon: Icon, color, rgb }, index) => (
              <article
                key={label}
                className="ownership-card aurora-border relative rounded-lg border border-border bg-background p-5 text-center"
                style={{ "--flow-index": index, "--flow-color": color, "--flow-rgb": rgb } as CSSProperties}
              >
                <div className="ownership-icon mx-auto flex h-12 w-12 items-center justify-center rounded-lg border">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{label}</h3>
                <p className="ownership-note mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em]">{note}</p>
                <p className="mt-4 text-xs leading-5 text-muted">{copy}</p>
                {index < nodes.length - 1 && <span className="ownership-connector" aria-hidden="true"><span /></span>}
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />Client retains root access, master encryption keys, and source IP.</p>
            <p className="text-foreground/80">Your app &rarr; Your data &rarr; Your server &rarr; Your hands</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

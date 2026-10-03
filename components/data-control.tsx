import { AppWindow, BriefcaseBusiness, LockKeyhole, Server } from "lucide-react";
import { Reveal } from "@/components/reveal";

const nodes = [
  { label: "Business", icon: BriefcaseBusiness },
  { label: "Infrastructure", icon: Server },
  { label: "Application", icon: AppWindow },
  { label: "Database", icon: LockKeyhole },
];

export function DataControl() {
  return (
    <section id="data-control" className="shell-grid border-b border-border py-20 sm:py-28">
      <Reveal><div className="max-w-2xl"><p className="eyebrow">Data control</p><h2 className="section-title mt-4">Your data stays under your control.</h2><p className="mt-6 text-base leading-7 text-muted">Every layer is designed to stay visible, accountable, and yours, all the way to the locked database.</p></div></Reveal>
      <Reveal className="mt-14" delay={90}>
        <div className="border border-border bg-surface/50 p-5 sm:p-10">
          <svg viewBox="0 0 900 180" role="img" aria-label="Business to infrastructure to application to locked database flow" className="hidden h-auto w-full md:block">
            <defs><linearGradient id="flow" x1="0" x2="1"><stop stopColor="var(--primary)" /><stop offset=".75" stopColor="var(--secondary)" /><stop offset="1" stopColor="var(--accent)" /></linearGradient></defs>
            {nodes.slice(0, -1).map((_, index) => <line className="data-flow-line" key={index} x1={134 + index * 233} x2={299 + index * 233} y1="90" y2="90" stroke="url(#flow)" strokeWidth="2" strokeOpacity=".8" />)}
            {nodes.map(({ label, icon: Icon }, index) => <g key={label}><circle cx={100 + index * 233} cy="90" r="34" fill="var(--background)" stroke={index === 3 ? "var(--accent)" : "var(--secondary)"} strokeWidth="2" /><foreignObject x={80 + index * 233} y="70" width="40" height="40"><div className={`flex h-full items-center justify-center ${index === 3 ? "text-accent" : "text-secondary"}`}><Icon size={19} /></div></foreignObject><text x={100 + index * 233} y="145" textAnchor="middle" fill="var(--foreground)" fontSize="14">{label}</text></g>)}
          </svg>
          <div className="grid gap-3 md:hidden">{nodes.map(({ label, icon: Icon }, index) => <div key={label} className="flex items-center gap-3 text-sm text-muted"><span className={`flex h-8 w-8 items-center justify-center border ${index === 3 ? "border-accent text-accent" : "border-secondary/50 text-secondary"}`}><Icon className="h-4 w-4" /></span><span>{label}</span>{index < nodes.length - 1 && <span className="text-muted/60">→</span>}</div>)}</div>
        </div>
      </Reveal>
    </section>
  );
}

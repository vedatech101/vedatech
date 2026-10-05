import { CardGrid } from "@/components/card-grid";
import { FeatureCard } from "@/components/card-variants";
import { DataControl } from "@/components/data-control";
import { Hero } from "@/components/hero";
import { HowVedaTechWorks } from "@/components/how-vedtech-works";
import { InteractiveCard } from "@/components/interactive-card";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/lib/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="services" className="shell-grid border-b border-border py-20 sm:py-24">
        <div className="section-intro flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">What we build</p><h2 className="section-title mt-4">Software with a job to do.</h2></div><p className="max-w-sm text-sm leading-6 text-muted">A focused team for the systems closest to your customers, operations, and growth.</p></div>
        <CardGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((service) => <InteractiveCard key={service.title} {...service} />)}</CardGrid>
      </section>
      <DataControl />
      <HowVedaTechWorks />
      <section className="shell-grid border-b border-border py-20 sm:py-24">
        <div className="section-intro"><p className="eyebrow">What stays with you</p><h2 className="section-title mt-4">Capabilities designed for ownership.</h2></div>
        <CardGrid className="mt-12 grid gap-4 md:grid-cols-3"><FeatureCard icon="lock" title="Clear data ownership" copy="Your team can understand where information lives and who controls it." meta="Zero vendor lock-in" /><FeatureCard icon="shield" title="Built to be maintained" copy="Solid foundations and documentation keep the system useful after launch." meta="Full codebase handover" /><FeatureCard icon="layers" title="Room to grow" copy="Architecture that supports the next stage without forcing a rewrite." meta="Elastic scaling primitives" /></CardGrid>
      </section>
      <section id="quote" className="shell-grid grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"><div className="section-intro"><p className="eyebrow">Start a conversation</p><h2 className="section-title mt-4">Bring us the hard part.</h2><p className="mt-6 max-w-md text-base leading-7 text-muted">Tell us where the current system is getting in the way. We will help you find a clearer path.</p><ul className="mt-8 space-y-4 text-sm text-muted"><li className="flex gap-3"><span className="text-secondary">✓</span>Architectural feasibility reviewed by engineers.</li><li className="flex gap-3"><span className="text-secondary">✓</span>Direct response without spam or unnecessary follow-ups.</li></ul></div><QuoteForm /></section>
    </main>
  );
}

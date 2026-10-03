import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "About VedTech | Custom Software Development",
  description: "Meet VedTech, a custom software development company based in Jodhpur, Rajasthan, India.",
};

const details = [
  { icon: UserRound, label: "Founder", value: "Er. Vedant Joshi" },
  { icon: Clock3, label: "Experience", value: "2 years" },
  { icon: MapPin, label: "Location", value: "Jodhpur, Rajasthan, India" },
];

export default function AboutPage() {
  return (
    <main className="shell-grid py-16 sm:py-24 lg:py-28">
      <section aria-labelledby="about-heading" className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="eyebrow">About VedTech</p>
          <h1 id="about-heading" className="section-title mt-5">Software built around real business needs.</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
            VedTech is a custom software development company based in Jodhpur. We build practical digital systems that help businesses manage their work with more clarity and control.
          </p>
        </div>

        <div className="border border-border bg-surface/70 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">Company details</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[2.5rem_8rem_1fr] sm:items-center">
                <span className="flex h-10 w-10 items-center justify-center border border-primary/50 bg-primary/15 text-secondary" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <dt className="text-sm font-medium text-muted">{label}</dt>
                <dd className="text-base font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-9 text-2xl font-semibold text-foreground">Contact</h2>
          <div className="mt-5 grid gap-3">
            <a href="tel:+917851962174" className="group flex items-center gap-4 border border-border bg-background/35 p-4 text-foreground transition-colors hover:border-secondary/70 hover:bg-secondary/10 focus-visible:border-secondary focus-visible:outline-none">
              <Phone className="h-5 w-5 text-secondary" aria-hidden="true" />
              <span><span className="block text-xs text-muted">Phone</span><span className="mt-1 block font-medium">+91 78519 62174</span></span>
            </a>
            <a href="mailto:vedatech101@gmail.com" className="group flex items-center gap-4 border border-border bg-background/35 p-4 text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10 focus-visible:border-primary focus-visible:outline-none">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="min-w-0"><span className="block text-xs text-muted">Email</span><span className="mt-1 block break-all font-medium">vedatech101@gmail.com</span></span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

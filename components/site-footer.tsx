import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Quote", href: "/#quote" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0b18] shadow-[0_-18px_50px_rgb(15_23_42_/_18%)]">
      <div className="shell-grid flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div><Link href="/" className="text-lg font-semibold tracking-[-0.04em] text-white">Veda<span className="text-primary">Tech</span></Link><p className="mt-2 text-sm text-slate-400">Custom software development.</p></div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-5 text-sm text-slate-400">
          {footerLinks.map((link) => <Link key={link.href} href={link.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">{link.label}</Link>)}
          <span aria-disabled="true" title="LinkedIn link coming soon" className="cursor-not-allowed opacity-60">LinkedIn (coming soon)</span>
          <a href="mailto:vedatech101@gmail.com" className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">Email</a>
        </nav>
      </div>
    </footer>
  );
}

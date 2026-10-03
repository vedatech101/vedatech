"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How we work", href: "/#process", id: "process" },
  { label: "Data control", href: "/#data-control", id: "data-control" },
  { label: "About", href: "/about", id: "about" },
];
const sectionIds = ["services", "data-control", "process", "quote"];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);

  const focusMenuItem = (index: number) => {
    const items = servicesRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']");
    if (!items?.length) return;
    items[(index + items.length) % items.length].focus();
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && servicesOpen) {
        servicesTriggerRef.current?.focus();
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [servicesOpen]);

  useEffect(() => {
    const visible = new Map<string, number>();
    const observed = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visible.set(entry.target.id, entry.intersectionRatio) : visible.delete(entry.target.id));
      const next = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (next) setActiveSection(next);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    const observeSections = () => sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && !observed.has(section)) {
        observed.add(section);
        observer.observe(section);
      }
    });
    observeSections();
    const pageObserver = new MutationObserver(observeSections);
    pageObserver.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); pageObserver.disconnect(); };
  }, []);

  const closeMenus = () => { setOpen(false); setServicesOpen(false); };
  const currentSection = pathname === "/about" ? "about" : activeSection;
  const underline = (active: boolean) => cn("absolute inset-x-0 bottom-0 h-px origin-left brand-gradient transition-transform duration-300", active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 shadow-[0_10px_30px_color-mix(in_srgb,var(--background)_55%,transparent)] backdrop-blur-xl">
      <div className="shell-grid flex h-20 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-[-0.04em] text-foreground">Ved<span className="text-primary">Tech</span></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          <div ref={servicesRef} className="services-dropdown relative" onPointerEnter={(event) => { if (event.pointerType === "mouse") setServicesOpen(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setServicesOpen(false); }} onFocusCapture={() => setServicesOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}>
            <button ref={servicesTriggerRef} type="button" aria-expanded={servicesOpen} aria-haspopup="menu" aria-controls="desktop-services-menu" onClick={() => setServicesOpen((value) => !value)} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setServicesOpen(true); requestAnimationFrame(() => focusMenuItem(event.key === "ArrowDown" ? 0 : services.length - 1)); } }} className="group relative flex items-center gap-1 py-3 text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none">Services<ChevronDown className={cn("h-3.5 transition-transform duration-300", servicesOpen && "rotate-180")} /><span className={underline(currentSection === "services" || servicesOpen)} /></button>
            <div id="desktop-services-menu" className={cn("services-panel absolute left-0 top-full z-20 max-h-[calc(100vh-6rem)] w-56 origin-top overflow-y-auto border border-border bg-surface p-2 shadow-2xl transition-[transform,opacity] duration-200", servicesOpen ? "pointer-events-auto scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0")} role="menu" onKeyDown={(event) => { const items = [...event.currentTarget.querySelectorAll<HTMLElement>("[role='menuitem']")]; const index = items.indexOf(document.activeElement as HTMLElement); if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); focusMenuItem(index + (event.key === "ArrowDown" ? 1 : -1)); } else if (event.key === "Tab") setServicesOpen(false); }}>
              {services.map((service) => <Link key={service.title} href="/#services" role="menuitem" onClick={closeMenus} className="block px-3 py-3 text-sm text-muted transition-colors hover:bg-primary/15 hover:text-primary focus:bg-primary/15 focus:text-primary focus:outline-none">{service.title}</Link>)}
            </div>
          </div>
          {navLinks.map((link) => <Link key={link.id} href={link.href} aria-current={currentSection === link.id ? "location" : undefined} onClick={() => setActiveSection(link.id)} className="group relative py-3 text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none">{link.label}<span className={underline(currentSection === link.id)} /></Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild className="brand-gradient brand-glow group hidden text-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"><Link href="/#quote">Get a quote <span className="transition-transform group-hover:translate-x-1">↗</span></Link></Button>
          <Button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} variant="ghost" size="icon" className="text-foreground transition-transform duration-300 hover:bg-primary/20 hover:text-foreground md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      <div className={cn("grid overflow-hidden border-t border-border bg-surface transition-[grid-template-rows,opacity] duration-300 md:hidden", open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0")}>
        <nav aria-label="Mobile navigation" className="shell-grid min-h-0 flex flex-col py-4">
          <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)} className={cn("flex items-center justify-between border-b border-border py-4 text-left text-sm", currentSection === "services" ? "text-primary" : "text-muted")}>Services<ChevronDown className={cn("h-4 transition-transform", servicesOpen && "rotate-180")} /></button>
          <div className={cn("grid overflow-hidden transition-[grid-template-rows,opacity] duration-200", servicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}><div className="min-h-0 pl-4">{services.map((service) => <Link key={service.title} href="/#services" onClick={closeMenus} className="block border-b border-border py-3 text-sm text-muted hover:text-primary focus-visible:text-primary">{service.title}</Link>)}</div></div>
          {navLinks.map((link) => <Link key={link.id} href={link.href} aria-current={currentSection === link.id ? "location" : undefined} onClick={() => { setActiveSection(link.id); closeMenus(); }} className={cn("border-b border-border py-4 text-sm transition-colors hover:text-primary focus-visible:text-primary", currentSection === link.id ? "text-primary" : "text-muted")}>{link.label}</Link>)}
          <Button asChild className="mt-4 bg-primary text-foreground"><Link href="/#quote" onClick={closeMenus}>Get a quote</Link></Button>
        </nav>
      </div>
    </header>
  );
}

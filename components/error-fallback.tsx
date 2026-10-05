"use client";

import { Button } from "@/components/ui/button";

export function ErrorFallback({ title, message, onReload }: { title: string; message: string; onReload?: () => void }) {
  const reload = () => onReload ? onReload() : window.location.reload();
  return (
    <main className="shell-grid flex min-h-[70svh] items-center py-20">
      <div className="max-w-xl"><p className="eyebrow">VedaTech</p><h1 className="section-title mt-4">{title}</h1><p className="mt-6 text-muted">{message}</p><Button type="button" onClick={reload} className="brand-gradient brand-glow mt-8 text-white">Reload</Button></div>
    </main>
  );
}

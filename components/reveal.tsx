"use client";

import { type CSSProperties, type ReactNode, type Ref, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function RevealSafety() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");
    const timeout = window.setTimeout(() => root.classList.add("reveal-all"), 1500);
    return () => window.clearTimeout(timeout);
  }, []);
  return null;
}

type RevealProps = {
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
  delay?: number;
  "data-process-step"?: number;
};

export function Reveal({ as = "div", children, className, delay = 0, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const show = () => { element.dataset.revealState = "visible"; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      show();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        show();
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const shared = {
    ...props,
    className: cn("reveal", className),
    "data-reveal-state": "pending",
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  };

  if (as === "li") return <li ref={ref as Ref<HTMLLIElement>} {...shared}>{children}</li>;
  return <div ref={ref as Ref<HTMLDivElement>} {...shared}>{children}</div>;
}

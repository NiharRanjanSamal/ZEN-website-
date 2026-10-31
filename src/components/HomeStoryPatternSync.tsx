"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type HomeStoryPatternSyncProps = {
  children: ReactNode;
  className?: string;
};

/** Aligns stripe-synced typography with `.home-story` background repeat. */
export function HomeStoryPatternSync({ children, className }: HomeStoryPatternSyncProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const section = el.closest(".home-story");
    if (!section) return;

    const update = () => {
      const x = el.getBoundingClientRect().left - section.getBoundingClientRect().left;
      el.style.setProperty("--home-story-pattern-x", `${x}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(el);
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div ref={ref} className={className ? `home-story-pattern-sync ${className}` : "home-story-pattern-sync"}>
      {children}
    </div>
  );
}

type PatternLineProps = {
  text: string;
  variant: "eyebrow" | "title" | "lead";
  className?: string;
};

export function HomeStoryPatternLine({ text, variant, className }: PatternLineProps) {
  const Tag = variant === "title" ? "h2" : "p";
  const variantClass = `home-story-pattern-line home-story-pattern-line--${variant}`;

  return (
    <Tag className={className ? `${variantClass} ${className}` : variantClass}>{text}</Tag>
  );
}

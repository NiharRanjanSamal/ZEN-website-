"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

/** Parallax + scroll progress for a section (e.g. dark “Who we are” band). */
export function AboutScrollSection({
  children,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      if (!active) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - rect.top / vh));
      const parallax = (progress - 0.5) * 48;
      section.style.setProperty("--about-parallax-y", `${parallax}px`);
      section.style.setProperty("--about-scroll-progress", String(progress));
    };

    const onScroll = () => {
      if (!active || raf) return;
      raf = window.requestAnimationFrame(update);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        active = Boolean(entry?.isIntersecting);
        if (active) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    visibilityObserver.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={className} {...rest}>
      {children}
    </section>
  );
}

export function AboutHeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = window.requestAnimationFrame(() => {
      el.classList.add("about-t-hero--ready");
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section ref={ref} className="about-t-hero" aria-label="About Zenuino">
      {children}
    </section>
  );
}

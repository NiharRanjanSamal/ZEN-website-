"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeAboutReveal } from "@/app/about/aboutRevealObserver";

export type AboutRevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

type AboutRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  variant?: AboutRevealVariant;
  /** Observe once vs every time section leaves (default once) */
  once?: boolean;
};

export function AboutReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  once = true,
}: AboutRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("about-t-in-view");
      return;
    }

    return observeAboutReveal(
      el,
      (visible) => {
        if (visible) {
          el.classList.add("about-t-in-view");
        } else {
          el.classList.remove("about-t-in-view");
        }
      },
      once,
    );
  }, [once]);

  const delayClass = delay ? ` about-t-reveal--d${delay}` : "";
  const variantClass = variant !== "up" ? ` about-t-reveal--${variant}` : "";

  return (
    <div
      ref={ref}
      className={`about-t-reveal${variantClass}${delayClass}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

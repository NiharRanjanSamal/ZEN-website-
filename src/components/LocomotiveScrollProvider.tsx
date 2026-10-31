"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import { setLocomotiveScroll } from "@/lib/locomotiveScroll";
import "locomotive-scroll/locomotive-scroll.css";

const HEADER_OFFSET = -96;

function scrollToRoute(scroll: LocomotiveScroll) {
  const hash = window.location.hash;
  if (hash) {
    requestAnimationFrame(() => {
      scroll.scrollTo(hash, { offset: HEADER_OFFSET });
    });
    return;
  }
  scroll.scrollTo(0, { immediate: true, force: true });
}

export function LocomotiveScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const skipFirstPathRef = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;

    const start = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (cancelled) return;

      const scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.085,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        },
      });

      scrollRef.current = scroll;
      setLocomotiveScroll(scroll);
      if (window.location.hash) {
        scrollToRoute(scroll);
      }
    };

    void start();

    return () => {
      cancelled = true;
      scrollRef.current?.destroy();
      scrollRef.current = null;
      setLocomotiveScroll(null);
    };
  }, []);

  useEffect(() => {
    if (skipFirstPathRef.current) {
      skipFirstPathRef.current = false;
      return;
    }

    const scroll = scrollRef.current;
    if (!scroll) return;

    scroll.resize();
    scrollToRoute(scroll);
  }, [pathname]);

  return children;
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

const PATH_LENGTH = 2400;
const LERP = 0.22;
const SPAN = 0.28;

type LineSpec = {
  d: string;
  gradient: "red" | "blue" | "yellow";
  strokeWidth: number;
  opacity?: number;
  offsetMul?: number;
};

type OfferGlowLinesProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  originRef: React.RefObject<HTMLElement | null>;
};

type PathOffset = { dx: number; dy: number };

/** Ribbon starts inside the button, then fans wider toward the left exit. */
function buildSharedRoamPath(
  ox: number,
  oy: number,
  { dx, dy }: PathOffset,
  spread: number,
  emit: number,
): string {
  const floorY = Math.min(820, oy + 500);
  const s = (x: number, y: number, t: number) => {
    const leave = t * t;
    const hold = 1 - leave;
    const scale = 0.2 + leave * 2.5;
    return `${x + dx * scale + leave * spread * 0.22 + hold * 14} ${y + dy * scale + leave * spread + hold * emit}`;
  };

  return [
    `M ${s(ox, oy, 0)}`,
    `C ${s(ox - 70, oy + 28, 0.12)} ${s(ox - 150, oy + 8, 0.28)} ${s(ox - 280, oy + 62, 0.45)}`,
    `C ${s(ox - 410, oy + 116, 0.55)} ${s(490, oy - 18, 0.64)} ${s(360, oy + 8, 0.72)}`,
    `C ${s(230, oy + 34, 0.8)} ${s(185, oy + 210, 0.86)} ${s(120, oy + 350, 0.91)}`,
    `C ${s(55, oy + 490, 0.95)} ${s(22, floorY - 8, 0.98)} ${s(10, floorY, 1)}`,
  ].join(" ");
}

const LINE_BUNDLE: Array<{
  offset: PathOffset;
  emit: number;
  spread: number;
  gradient: "red" | "blue" | "yellow";
  strokeWidth: number;
  opacity?: number;
  offsetMul?: number;
}> = [
  { offset: { dx: 0, dy: 0 }, emit: 0, spread: 0, gradient: "red", strokeWidth: 2.6 },
  { offset: { dx: -6, dy: 8 }, emit: 9, spread: 30, gradient: "blue", strokeWidth: 2.2, offsetMul: 1.02 },
  { offset: { dx: 6, dy: -7 }, emit: -8, spread: -34, gradient: "yellow", strokeWidth: 2.2, offsetMul: 0.99 },
  { offset: { dx: -12, dy: 14 }, emit: 14, spread: 56, gradient: "red", strokeWidth: 1.6, opacity: 0.78, offsetMul: 1.04 },
  { offset: { dx: 11, dy: -12 }, emit: -13, spread: -50, gradient: "blue", strokeWidth: 1.5, opacity: 0.72, offsetMul: 1.06 },
  { offset: { dx: -4, dy: 18 }, emit: 5, spread: 18, gradient: "yellow", strokeWidth: 1.4, opacity: 0.62, offsetMul: 1.01 },
];

function buildOfferPaths(ox: number, oy: number): LineSpec[] {
  return LINE_BUNDLE.map((line) => ({
    d: buildSharedRoamPath(ox, oy, line.offset, line.spread, line.emit),
    gradient: line.gradient,
    strokeWidth: line.strokeWidth,
    opacity: line.opacity,
    offsetMul: line.offsetMul,
  }));
}

function getOriginInViewBox(
  section: HTMLElement,
  origin: HTMLElement,
): { ox: number; oy: number } | null {
  const sectionRect = section.getBoundingClientRect();
  const originRect = origin.getBoundingClientRect();

  if (sectionRect.width <= 0 || sectionRect.height <= 0) return null;

  const ox =
    ((originRect.left + originRect.width * 0.32 - sectionRect.left) / sectionRect.width) * 1200;
  const oy =
    ((originRect.top + originRect.height * 0.52 - sectionRect.top) / sectionRect.height) * 900;

  return {
    ox: Math.min(1160, Math.max(40, ox)),
    oy: Math.min(860, Math.max(40, oy)),
  };
}

function getTargetProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  const travelled = vh - rect.top;
  const span = vh + rect.height * SPAN;
  return Math.min(1, Math.max(0, travelled / span));
}

export function OfferGlowLines({ sectionRef, originRef }: OfferGlowLinesProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineSpec[]>(() => buildOfferPaths(980, 130));

  useEffect(() => {
    const section = sectionRef.current;
    const origin = originRef.current;
    if (!section || !origin) return;

    const syncPaths = () => {
      const point = getOriginInViewBox(section, origin);
      if (!point) return;
      setLines(buildOfferPaths(point.ox, point.oy));
    };

    syncPaths();
    window.addEventListener("resize", syncPaths);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncPaths) : null;
    ro?.observe(section);
    ro?.observe(origin);

    return () => {
      window.removeEventListener("resize", syncPaths);
      ro?.disconnect();
    };
  }, [sectionRef, originRef]);

  useEffect(() => {
    const root = rootRef.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      root.style.setProperty("--glow-progress", "1");
      root.classList.add("is-active");
      return;
    }

    let frame = 0;
    let running = false;
    let current = 0;

    const paint = (value: number) => {
      root.style.setProperty("--glow-progress", value.toFixed(4));
      root.classList.toggle("is-active", value > 0.02);
    };

    const tick = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const nearViewport = rect.bottom > -vh * 0.35 && rect.top < vh * 1.35;

      if (!nearViewport) {
        running = false;
        return;
      }

      const target = getTargetProgress(section);
      current += (target - current) * LERP;

      if (Math.abs(target - current) < 0.001) {
        current = target;
      }

      paint(current);

      if (Math.abs(target - current) >= 0.0004) {
        frame = window.requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", start);

    start();

    return () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  const glowId = `offer-glow-${uid}`;
  const redId = `offer-red-${uid}`;
  const blueId = `offer-blue-${uid}`;
  const yellowId = `offer-yellow-${uid}`;

  const gradientMap = {
    red: redId,
    blue: blueId,
    yellow: yellowId,
  };

  return (
    <div
      ref={rootRef}
      className="glow-lines glow-lines--offer"
      aria-hidden
      style={{ ["--glow-progress" as string]: "0" }}
    >
      <svg
        className="glow-lines-svg"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={redId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4d5e" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#ff3b4a" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={blueId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d9bff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#1e6fff" />
            <stop offset="100%" stopColor="#9ad4ff" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={yellowId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd24a" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#ff8a1f" />
            <stop offset="100%" stopColor="#fff3b0" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {lines.map((line, index) => (
          <path
            key={index}
            className="glow-line"
            pathLength={PATH_LENGTH}
            d={line.d}
            stroke={`url(#${gradientMap[line.gradient]})`}
            strokeWidth={line.strokeWidth}
            opacity={line.opacity ?? 1}
            filter={`url(#${glowId})`}
            style={{ ["--line-mul" as string]: String(line.offsetMul ?? 1) }}
          />
        ))}
      </svg>
    </div>
  );
}

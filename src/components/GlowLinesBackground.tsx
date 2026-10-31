"use client";

import { useEffect, useId, useRef } from "react";

const PATH_LENGTH = 2400;

const MOTION = {
  process: { lerp: 0.48, span: 0.28 },
  outcomes: { lerp: 0.11, span: 0.95 },
} as const;

type GlowLinesVariant = "process" | "outcomes";

type GlowLinesBackgroundProps = {
  variant?: GlowLinesVariant;
};

type LineSpec = {
  d: string;
  gradient: "red" | "blue" | "yellow";
  strokeWidth: number;
  opacity?: number;
  offsetMul?: number;
};

const processLines: LineSpec[] = [
  {
    d: "M20 900 C 160 820, 250 700, 340 560 C 430 410, 500 300, 590 190 C 660 120, 760 70, 900 35 C 1000 15, 1100 8, 1200 0",
    gradient: "red",
    strokeWidth: 2.5,
  },
  {
    d: "M90 900 C 230 840, 310 720, 400 580 C 500 420, 580 310, 680 200 C 760 130, 880 75, 1020 40 C 1100 22, 1160 10, 1200 4",
    gradient: "blue",
    strokeWidth: 2,
    offsetMul: 1.02,
  },
  {
    d: "M180 900 C 320 850, 400 730, 490 580 C 590 400, 670 280, 780 170 C 860 105, 980 55, 1120 22 C 1160 12, 1185 6, 1200 2",
    gradient: "yellow",
    strokeWidth: 2.2,
    offsetMul: 0.98,
  },
  {
    d: "M50 900 C 190 860, 280 760, 370 620 C 470 460, 550 340, 640 230 C 710 160, 820 95, 960 50 C 1050 28, 1130 12, 1200 3",
    gradient: "red",
    strokeWidth: 1.4,
    opacity: 0.7,
    offsetMul: 1.05,
  },
  {
    d: "M260 900 C 390 820, 480 690, 570 540 C 660 390, 750 270, 880 160 C 970 95, 1080 45, 1200 10",
    gradient: "blue",
    strokeWidth: 1.5,
    opacity: 0.65,
    offsetMul: 1.08,
  },
  {
    d: "M140 900 C 280 870, 360 760, 450 620 C 560 450, 650 320, 780 200 C 880 120, 1000 55, 1200 8",
    gradient: "yellow",
    strokeWidth: 1.3,
    opacity: 0.55,
    offsetMul: 1.03,
  },
];

/** Right-to-left paths: tight ripples on the right, widening waves toward the left. */
const outcomesLines: LineSpec[] = [
  {
    d: "M1200 820 Q1188 818 1176 820 Q1164 822 1152 820 Q1140 818 1128 820 Q1116 822 1104 820 Q1092 817 1080 820 Q1060 812 1040 828 Q1010 850 980 820 Q920 770 860 840 Q760 920 660 780 Q520 600 380 820 Q220 1060 80 720 Q30 580 0 420",
    gradient: "red",
    strokeWidth: 2.6,
  },
  {
    d: "M1200 880 Q1186 878 1172 880 Q1158 882 1144 880 Q1130 877 1116 880 Q1100 874 1084 886 Q1056 908 1028 872 Q960 810 892 868 Q780 980 668 840 Q500 640 332 860 Q164 1080 20 760 Q8 680 0 600",
    gradient: "blue",
    strokeWidth: 2.1,
    offsetMul: 1.04,
  },
  {
    d: "M1200 760 Q1190 758 1180 760 Q1170 762 1160 760 Q1150 757 1140 760 Q1125 754 1110 766 Q1085 784 1060 758 Q1000 700 940 770 Q820 890 700 740 Q540 540 380 760 Q220 980 60 680 Q20 560 0 460",
    gradient: "yellow",
    strokeWidth: 2.3,
    offsetMul: 0.97,
  },
  {
    d: "M1200 900 Q1192 899 1184 900 Q1176 901 1168 900 Q1160 898 1152 900 Q1136 895 1120 905 Q1090 922 1060 898 Q990 850 920 910 Q790 1020 660 860 Q480 640 300 880 Q150 1080 40 800 Q10 700 0 620",
    gradient: "red",
    strokeWidth: 1.5,
    opacity: 0.72,
    offsetMul: 1.06,
  },
  {
    d: "M1200 700 Q1192 699 1184 700 Q1176 701 1168 700 Q1155 696 1142 704 Q1115 720 1088 692 Q1020 630 952 700 Q830 820 708 660 Q540 440 372 680 Q204 920 50 620 Q15 540 0 480",
    gradient: "blue",
    strokeWidth: 1.45,
    opacity: 0.68,
    offsetMul: 1.09,
  },
  {
    d: "M1200 840 Q1190 839 1180 840 Q1170 841 1160 840 Q1148 837 1136 842 Q1110 856 1084 834 Q1020 780 956 830 Q840 930 724 780 Q560 560 396 800 Q232 1040 90 740 Q40 620 0 520",
    gradient: "yellow",
    strokeWidth: 1.35,
    opacity: 0.58,
    offsetMul: 1.02,
  },
];

function getTargetProgress(section: HTMLElement, variant: GlowLinesVariant) {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  const travelled = vh - rect.top;
  const span = vh + rect.height * MOTION[variant].span;
  return Math.min(1, Math.max(0, travelled / span));
}

export function GlowLinesBackground({ variant = "process" }: GlowLinesBackgroundProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);

  const isOutcomes = variant === "outcomes";
  const lines = isOutcomes ? outcomesLines : processLines;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const section = root.closest("section");
    if (!section) return;

    const { lerp } = MOTION[variant];

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

      const target = getTargetProgress(section, variant);
      current += (target - current) * lerp;

      if (Math.abs(target - current) < 0.001) {
        current = target;
      }

      paint(current);

      if (Math.abs(target - current) >= 0.001) {
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

    const onScroll = () => start();
    const onResize = () => start();

    start();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(section);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [variant]);

  const glowId = `glow-soft-${uid}`;
  const redId = `line-red-${uid}`;
  const blueId = `line-blue-${uid}`;
  const yellowId = `line-yellow-${uid}`;

  const gradientMap = {
    red: redId,
    blue: blueId,
    yellow: yellowId,
  };

  return (
    <div
      ref={rootRef}
      className={`glow-lines${isOutcomes ? " glow-lines--outcomes" : ""}`}
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
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {isOutcomes ? (
            <>
              <linearGradient id={redId} x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#ff3b4a" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#ff4d5e" />
                <stop offset="100%" stopColor="#ffb020" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id={blueId} x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#1e6fff" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#3d9bff" />
                <stop offset="100%" stopColor="#9ad4ff" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id={yellowId} x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#ff8a1f" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#ffd24a" />
                <stop offset="100%" stopColor="#fff3b0" stopOpacity="0.25" />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id={redId} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff3b4a" stopOpacity="0.15" />
                <stop offset="55%" stopColor="#ff4d5e" />
                <stop offset="100%" stopColor="#ffb020" />
              </linearGradient>
              <linearGradient id={blueId} x1="0%" y1="100%" x2="80%" y2="0%">
                <stop offset="0%" stopColor="#1e6fff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3d9bff" />
                <stop offset="100%" stopColor="#9ad4ff" />
              </linearGradient>
              <linearGradient id={yellowId} x1="20%" y1="100%" x2="70%" y2="0%">
                <stop offset="0%" stopColor="#ff8a1f" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#ffd24a" />
                <stop offset="100%" stopColor="#fff3b0" />
              </linearGradient>
            </>
          )}
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

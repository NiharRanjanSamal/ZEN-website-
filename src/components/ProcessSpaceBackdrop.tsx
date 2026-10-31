import type { CSSProperties } from "react";

type Star = {
  cx: number;
  cy: number;
  r: number;
  o: number;
  rot: number;
  points: 4 | 5;
  twinkle: boolean;
  twinkleDur: number;
  twinkleDelay: number;
};

/** 4-point sparkle (unit size ~2 in local space) */
const STAR_4 =
  "M 0 -1 L 0.2 -0.2 L 1 0 L 0.2 0.2 L 0 1 L -0.2 0.2 L -1 0 L -0.2 -0.2 Z";

/** 5-point star for brighter field stars */
const STAR_5 =
  "M 0 -1 L 0.24 -0.31 L 0.95 -0.31 L 0.38 0.12 L 0.59 0.9 L 0 0.38 L -0.59 0.9 L -0.38 0.12 L -0.95 -0.31 L -0.24 -0.31 Z";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Asteroid = {
  top: string;
  left: string;
  size: number;
  rot: number;
  opacity: number;
  wRatio: number;
  hRatio: number;
  clip: string;
  lightX: number;
  lightY: number;
  crater1Top: number;
  crater1Left: number;
  crater2Top: number;
  crater2Left: number;
  drift1X: string;
  drift1Y: string;
  drift2X: string;
  drift2Y: string;
  drift3X: string;
  drift3Y: string;
  floatDur: number;
  floatDelay: number;
  spinDur: number;
  shade: "warm" | "cool" | "neutral";
};

/** Jagged blob outline — each asteroid gets a unique polygon. */
function irregularAsteroidClip(rnd: () => number): string {
  const points = 8 + Math.floor(rnd() * 3);
  const parts: string[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2 + (rnd() - 0.5) * 0.55;
    const radius = 34 + rnd() * 16;
    const squashX = 0.72 + rnd() * 0.38;
    const squashY = 0.72 + rnd() * 0.38;
    const x = 50 + Math.cos(angle) * radius * squashX;
    const y = 50 + Math.sin(angle) * radius * squashY;
    parts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${parts.join(", ")})`;
}

function driftUnit(rnd: () => number, spread: number, unit: "vw" | "vh") {
  const v = (rnd() - 0.5) * 2 * spread;
  const rounded = Math.round(v * 10) / 10;
  return `${rounded}${unit}`;
}

const ASTEROIDS: Asteroid[] = (() => {
  const rnd = mulberry32(0x9a2b1c3d);
  const shades: Asteroid["shade"][] = ["warm", "cool", "neutral"];
  return Array.from({ length: 8 }, () => ({
    top: `${6 + rnd() * 78}%`,
    left: `${4 + rnd() * 88}%`,
    size: 10 + rnd() * 16,
    rot: rnd() * 360,
    opacity: 0.35 + rnd() * 0.45,
    wRatio: 0.68 + rnd() * 0.52,
    hRatio: 0.62 + rnd() * 0.58,
    clip: irregularAsteroidClip(rnd),
    lightX: 18 + rnd() * 38,
    lightY: 12 + rnd() * 32,
    crater1Top: 15 + rnd() * 55,
    crater1Left: 12 + rnd() * 58,
    crater2Top: 20 + rnd() * 50,
    crater2Left: 35 + rnd() * 45,
    drift1X: driftUnit(rnd, 5 + rnd() * 4, "vw"),
    drift1Y: driftUnit(rnd, 3.5 + rnd() * 3, "vh"),
    drift2X: driftUnit(rnd, 6 + rnd() * 5, "vw"),
    drift2Y: driftUnit(rnd, 4 + rnd() * 3.5, "vh"),
    drift3X: driftUnit(rnd, 4 + rnd() * 4, "vw"),
    drift3Y: driftUnit(rnd, 3 + rnd() * 4, "vh"),
    floatDur: 52 + rnd() * 48,
    floatDelay: rnd() * -60,
    spinDur: 55 + rnd() * 65,
    shade: shades[Math.floor(rnd() * shades.length)]!,
  }));
})();

const STARS: Star[] = (() => {
  const rnd = mulberry32(0x7a4e0912);
  return Array.from({ length: 120 }, () => {
    const roll = rnd();
    return {
      cx: rnd() * 100,
      cy: rnd() * 100,
      r: roll < 0.025 ? 0.22 : roll < 0.1 ? 0.17 : 0.11,
      o: 0.18 + rnd() * 0.78,
      rot: rnd() * 360,
      points: roll < 0.025 ? 5 : 4,
      twinkle: rnd() > 0.55,
      twinkleDur: 1.6 + rnd() * 3.4,
      twinkleDelay: rnd() * 6,
    };
  });
})();

export function ProcessSpaceBackdrop() {
  return (
    <div className="home-process-space" aria-hidden>
      <svg
        className="home-process-space-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="process-nebula-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(118, 72, 168, 0.55)" />
            <stop offset="45%" stopColor="rgba(72, 48, 120, 0.22)" />
            <stop offset="100%" stopColor="rgba(8, 12, 22, 0)" />
          </radialGradient>
          <radialGradient id="process-nebula-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(48, 98, 158, 0.45)" />
            <stop offset="50%" stopColor="rgba(28, 58, 98, 0.16)" />
            <stop offset="100%" stopColor="rgba(8, 12, 22, 0)" />
          </radialGradient>
          <radialGradient id="process-nebula-rose" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(120, 52, 92, 0.28)" />
            <stop offset="55%" stopColor="rgba(60, 32, 72, 0.1)" />
            <stop offset="100%" stopColor="rgba(8, 12, 22, 0)" />
          </radialGradient>
          <filter id="process-nebula-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
        </defs>
        <rect width="100" height="100" fill="#050810" />
        <g filter="url(#process-nebula-blur)" opacity="0.92">
          <ellipse cx="74" cy="36" rx="28" ry="18" fill="url(#process-nebula-violet)" />
          <ellipse cx="22" cy="58" rx="24" ry="16" fill="url(#process-nebula-blue)" />
          <ellipse cx="52" cy="78" rx="20" ry="14" fill="url(#process-nebula-blue)" opacity="0.75" />
          <ellipse cx="48" cy="22" rx="16" ry="11" fill="url(#process-nebula-rose)" opacity="0.65" />
          <ellipse cx="88" cy="68" rx="14" ry="10" fill="url(#process-nebula-violet)" opacity="0.45" />
        </g>
        <g fill="#fff">
          {STARS.map((star, i) => {
            const scale = star.r * (star.points === 5 ? 1.85 : 1.65);
            const twinkleStyle = star.twinkle
              ? ({
                  ["--star-o" as string]: String(star.o),
                  ["--twinkle-dur" as string]: `${star.twinkleDur}s`,
                  ["--twinkle-delay" as string]: `${star.twinkleDelay}s`,
                } as CSSProperties)
              : undefined;

            return (
              <g
                key={i}
                className={star.twinkle ? "home-process-space-star" : undefined}
                transform={`translate(${star.cx} ${star.cy}) rotate(${star.rot}) scale(${scale})`}
                opacity={star.o}
                style={twinkleStyle}
              >
                <path d={star.points === 5 ? STAR_5 : STAR_4} />
              </g>
            );
          })}
        </g>
      </svg>
      {ASTEROIDS.map((asteroid, i) => (
        <span
          key={`asteroid-${i}`}
          className={`home-process-asteroid home-process-asteroid--${asteroid.shade}`}
          style={
            {
              top: asteroid.top,
              left: asteroid.left,
              ["--asteroid-size" as string]: `${asteroid.size}px`,
              ["--asteroid-w-ratio" as string]: String(asteroid.wRatio),
              ["--asteroid-h-ratio" as string]: String(asteroid.hRatio),
              ["--asteroid-clip" as string]: asteroid.clip,
              ["--asteroid-light-x" as string]: `${asteroid.lightX}%`,
              ["--asteroid-light-y" as string]: `${asteroid.lightY}%`,
              ["--asteroid-crater-1-top" as string]: `${asteroid.crater1Top}%`,
              ["--asteroid-crater-1-left" as string]: `${asteroid.crater1Left}%`,
              ["--asteroid-crater-2-top" as string]: `${asteroid.crater2Top}%`,
              ["--asteroid-crater-2-left" as string]: `${asteroid.crater2Left}%`,
              ["--asteroid-rot" as string]: `${asteroid.rot}deg`,
              ["--asteroid-o" as string]: String(asteroid.opacity),
              ["--asteroid-drift-1-x" as string]: asteroid.drift1X,
              ["--asteroid-drift-1-y" as string]: asteroid.drift1Y,
              ["--asteroid-drift-2-x" as string]: asteroid.drift2X,
              ["--asteroid-drift-2-y" as string]: asteroid.drift2Y,
              ["--asteroid-drift-3-x" as string]: asteroid.drift3X,
              ["--asteroid-drift-3-y" as string]: asteroid.drift3Y,
              ["--asteroid-float-dur" as string]: `${asteroid.floatDur}s`,
              ["--asteroid-float-delay" as string]: `${asteroid.floatDelay}s`,
              ["--asteroid-spin-dur" as string]: `${asteroid.spinDur}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useContent } from "@/components/LocaleProvider";
import { ProcessAstronaut } from "@/components/ProcessAstronaut";
import { DIAMETER_KM, type SolarPlanetName } from "@/components/solarSystemLayout";

const PLANET_IMAGES: Record<SolarPlanetName, string> = {
  Mercury: "/planets/mercury.png",
  Venus: "/planets/venus.png",
  Earth: "/planets/earth.png",
  Mars: "/planets/mars.png",
  Jupiter: "/planets/jupiter.png",
  Saturn: "/planets/saturn.jpg",
  Uranus: "/planets/uranus.jpg",
  Neptun: "/planets/neptune.jpg",
};

const PLANET_ORDER: SolarPlanetName[] = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptun",
];

/** Inner planets map to process steps 01–04 (Discover → Sustain). */
const PROCESS_PLANET_ORDER: SolarPlanetName[] = ["Mercury", "Venus", "Earth", "Mars"];

const JUPITER_PX = 152;
const JUPITER_DISPLAY_SCALE = 2.85;
/** Inner planets: NASA diameter ratios; Earth is the reference size. */
const EARTH_DISPLAY_PX = 270;
const INNER_PLANET_FIXED_PX: Partial<Record<SolarPlanetName, number>> = {
  Mercury: 200,
  Mars: 200,
};
const earthDiameter = DIAMETER_KM.Earth;
const jupiterDiameter = DIAMETER_KM.Jupiter;

const INNER_PLANETS = new Set<SolarPlanetName>(["Mercury", "Venus", "Earth", "Mars"]);

const OUTER_PLANETS = new Set<SolarPlanetName>(["Jupiter", "Saturn", "Uranus", "Neptun"]);

const TRANSPARENT_CUTOUT_PLANETS = new Set<SolarPlanetName>([
  ...INNER_PLANETS,
  "Jupiter",
]);

function innerPlanetSizePx(name: SolarPlanetName): number {
  const fixed = INNER_PLANET_FIXED_PX[name];
  if (fixed !== undefined) return fixed;

  const ratio = DIAMETER_KM[name] / earthDiameter;
  return Math.max(28, Math.round(EARTH_DISPLAY_PX * ratio));
}

function planetSizePx(name: SolarPlanetName): number {
  if (INNER_PLANETS.has(name)) {
    return innerPlanetSizePx(name);
  }

  const ratio = DIAMETER_KM[name] / jupiterDiameter;
  let size = Math.max(18, Math.round(JUPITER_PX * ratio));
  if (name === "Jupiter") {
    size = Math.round(size * JUPITER_DISPLAY_SCALE);
  }
  return size;
}

function rectsOverlap(a: DOMRect, b: DOMRect, pad = 0): boolean {
  return !(
    a.right + pad < b.left - pad ||
    a.left - pad > b.right + pad ||
    a.bottom + pad < b.top - pad ||
    a.top - pad > b.bottom + pad
  );
}

/** All step planets whose hit area overlaps the floating astronaut. */
function astronautOverlappedPlanets(section: HTMLElement): SolarPlanetName[] {
  const astronaut = section.querySelector<HTMLElement>(".home-process-astronaut-motion");
  if (!astronaut) return [];

  const astroRect = astronaut.getBoundingClientRect();
  if (astroRect.width < 1 || astroRect.height < 1) return [];

  const astroCenter = {
    x: astroRect.left + astroRect.width / 2,
    y: astroRect.top + astroRect.height / 2,
  };

  const hits = section.querySelectorAll<HTMLElement>("[data-process-planet]");
  const matched: SolarPlanetName[] = [];

  for (const hit of hits) {
    const name = hit.dataset.processPlanet as SolarPlanetName | undefined;
    if (!name || !PROCESS_PLANET_ORDER.includes(name)) continue;

    const rect = hit.getBoundingClientRect();
    const centerInside =
      astroCenter.x >= rect.left &&
      astroCenter.x <= rect.right &&
      astroCenter.y >= rect.top &&
      astroCenter.y <= rect.bottom;

    const overlap = rectsOverlap(astroRect, rect, 10);
    if (centerInside || overlap) matched.push(name);
  }

  return matched;
}

function astronautTipsKey(planets: SolarPlanetName[]): string {
  return [...planets].sort().join("|");
}

export function ProcessPlanetsStrip() {
  const { process: processSteps } = useContent();
  const [pointerTip, setPointerTip] = useState<SolarPlanetName | null>(null);
  const [astronautTips, setAstronautTips] = useState<SolarPlanetName[]>([]);

  const astronautTipsKeyRef = useRef("");

  useEffect(() => {
    const section = document.getElementById("how-we-work");
    if (!section) return;

    let frame = 0;
    let sectionVisible = false;

    const update = () => {
      frame = 0;
      if (!sectionVisible) return;

      const next = astronautOverlappedPlanets(section);
      const key = astronautTipsKey(next);
      if (key !== astronautTipsKeyRef.current) {
        astronautTipsKeyRef.current = key;
        setAstronautTips(next);
      }
    };

    const schedule = () => {
      if (!sectionVisible || frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = Boolean(entry?.isIntersecting);
        if (sectionVisible) schedule();
      },
      { rootMargin: "120px 0px" },
    );
    visibilityObserver.observe(section);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="home-process-planets-row">
        {PLANET_ORDER.map((name) => {
          const size = planetSizePx(name);
          const wide = name === "Saturn";
          const isCutout = TRANSPARENT_CUTOUT_PLANETS.has(name);
          const processIndex = PROCESS_PLANET_ORDER.indexOf(name);
          const step = processIndex >= 0 ? processSteps[processIndex] : null;
          const isInteractive = step !== null;

          const planetVisual = (
            <Image
              src={PLANET_IMAGES[name]}
              alt=""
              width={wide ? Math.round(size * 1.55) : size}
              height={size}
              className={[
                "home-process-planet-img",
                isCutout ? "home-process-planet-img--cutout" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              sizes={`${size}px`}
              priority={false}
            />
          );

          return (
            <div
              key={name}
              className={[
                "home-process-planet",
                wide ? "home-process-planet--wide" : "",
                isInteractive ? "home-process-planet--interactive" : "",
                OUTER_PLANETS.has(name) ? "home-process-planet--outer" : "",
                name === "Earth" ? "home-process-planet--earth" : "",
                name === "Jupiter" ? "home-process-planet--jupiter" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--planet-size": `${size}px`,
                } as CSSProperties
              }
            >
              {isInteractive && step ? (
                <>
                  <div className="home-process-planet-orbit">
                    <button
                      type="button"
                      className="home-process-planet-hit"
                      data-process-planet={name}
                      aria-label={step.title}
                      aria-describedby={`home-process-tip-${name}`}
                      onMouseEnter={() => setPointerTip(name)}
                      onMouseLeave={() => setPointerTip(null)}
                      onFocus={() => setPointerTip(name)}
                      onBlur={() => setPointerTip(null)}
                    >
                      {planetVisual}
                      <p className="home-process-planet-label" aria-hidden>
                        <span className="home-process-planet-label-title">{step.title}</span>
                      </p>
                      <span
                        id={`home-process-tip-${name}`}
                        role="tooltip"
                        className={[
                          "home-process-planet-tip",
                          pointerTip === name || astronautTips.includes(name)
                            ? "is-visible"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <span className="home-process-card-step">{step.step}</span>
                        <span className="home-process-card-body">{step.body}</span>
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                planetVisual
              )}
            </div>
          );
        })}
      </div>
      <ProcessAstronaut />
    </>
  );
}

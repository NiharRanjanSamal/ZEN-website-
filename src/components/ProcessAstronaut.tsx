"use client";

import { memo, useEffect, useRef } from "react";

/** Isolated so planet hover state does not re-render and reset CSS motion. */
export const ProcessAstronaut = memo(function ProcessAstronaut() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const fleeRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, inSection: false });

  useEffect(() => {
    const section = document.getElementById("how-we-work");
    const anchorEl = anchorRef.current;
    const fleeEl = fleeRef.current;
    const motionEl = motionRef.current;
    if (!section || !anchorEl || !fleeEl || !motionEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const FLEE_RADIUS = 220;
    const MIN_DIST = 6;

    const motion = { x: 0, y: 0, vx: 0, vy: 0 };

    const clampOffset = (x: number, y: number) => {
      const sectionRect = section.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      const motionRect = motionEl.getBoundingClientRect();
      const halfW = motionRect.width / 2;
      const halfH = motionRect.height / 2;
      const pad = 12;

      let cx = anchorRect.left + anchorRect.width / 2 + x;
      let cy = anchorRect.top + anchorRect.height / 2 + y;

      const minCx = sectionRect.left + pad + halfW;
      const maxCx = sectionRect.right - pad - halfW;
      const minCy = sectionRect.top + pad + halfH;
      const maxCy = sectionRect.bottom - pad - halfH;

      if (minCx <= maxCx) {
        cx = Math.min(maxCx, Math.max(minCx, cx));
      }
      if (minCy <= maxCy) {
        cy = Math.min(maxCy, Math.max(minCy, cy));
      }

      return {
        x: cx - (anchorRect.left + anchorRect.width / 2),
        y: cy - (anchorRect.top + anchorRect.height / 2),
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, inSection: true };
    };

    const onPointerLeave = () => {
      pointerRef.current.inSection = false;
      schedule();
    };

    let frame = 0;
    let sectionVisible = false;

    const tick = () => {
      frame = 0;
      if (!sectionVisible) return;

      const { x: px, y: py, inSection } = pointerRef.current;

      const motionRect = motionEl.getBoundingClientRect();
      const cx = motionRect.left + motionRect.width / 2;
      const cy = motionRect.top + motionRect.height / 2;

      const dx = cx - px;
      const dy = cy - py;
      const dist = Math.hypot(dx, dy);

      if (inSection && dist < FLEE_RADIUS && dist > MIN_DIST) {
        const closeness = 1 - dist / FLEE_RADIUS;
        const accel = 0.45 + closeness * closeness * 4.5;
        const nx = dx / dist;
        const ny = dy / dist;
        motion.vx += nx * accel;
        motion.vy += ny * accel;
        motion.vx *= 0.992;
        motion.vy *= 0.992;
      } else {
        motion.vx *= 0.88;
        motion.vy *= 0.88;
      }

      motion.x += motion.vx;
      motion.y += motion.vy;

      const clamped = clampOffset(motion.x, motion.y);
      if (clamped.x !== motion.x || clamped.y !== motion.y) {
        motion.x = clamped.x;
        motion.y = clamped.y;
        motion.vx *= 0.35;
        motion.vy *= 0.35;
      }

      if (Math.abs(motion.vx) < 0.02 && Math.abs(motion.vy) < 0.02) {
        motion.vx = 0;
        motion.vy = 0;
      }

      fleeEl.style.translate = `${motion.x.toFixed(2)}px ${motion.y.toFixed(2)}px`;

      const stillMoving =
        inSection ||
        Math.abs(motion.vx) >= 0.02 ||
        Math.abs(motion.vy) >= 0.02 ||
        Math.abs(motion.x) >= 0.5 ||
        Math.abs(motion.y) >= 0.5;

      if (stillMoving) {
        frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!sectionVisible || frame) return;
      frame = requestAnimationFrame(tick);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = Boolean(entry?.isIntersecting);
        if (sectionVisible) schedule();
      },
      { rootMargin: "80px 0px" },
    );
    visibilityObserver.observe(section);

    const onPointerMoveWithTick = (e: PointerEvent) => {
      onPointerMove(e);
      schedule();
    };

    section.addEventListener("pointermove", onPointerMoveWithTick);
    section.addEventListener("pointerleave", onPointerLeave);

    return () => {
      visibilityObserver.disconnect();
      section.removeEventListener("pointermove", onPointerMoveWithTick);
      section.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
      fleeEl.style.translate = "";
    };
  }, []);

  return (
    <div ref={anchorRef} className="home-process-astronaut" aria-hidden>
      <div ref={fleeRef} className="home-process-astronaut-flee">
        <div ref={motionRef} className="home-process-astronaut-motion">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="home-process-astronaut-img"
            src="/home-process-astronaut.png"
            alt=""
            width={480}
            height={480}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
});

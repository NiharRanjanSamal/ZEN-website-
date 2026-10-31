"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type StoryChapter = {
  step: string;
  title: string;
  body: string;
};

type HomeStoryStepsProps = {
  chapters: StoryChapter[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function revealedCountForProgress(progress: number, total: number) {
  let count = 0;
  for (let i = 0; i < total; i += 1) {
    const threshold = (i + 1) / (total + 0.35);
    if (progress >= threshold) count = i + 1;
  }
  return count;
}

export function HomeStorySteps({ chapters }: HomeStoryStepsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(chapters.length);
      setScrollProgress(1);
      return;
    }

    let raf = 0;

    const update = () => {
      const viewport = window.innerHeight;
      const rect = scene.getBoundingClientRect();
      const sceneHeight = scene.offsetHeight;
      const header =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-bar-height"),
        ) || 76;

      // Progress 0 when the scene first enters (top at lower viewport edge); 1 when it reaches the header band.
      const entryTop = viewport - sceneHeight;
      const finishTop = header + 24;
      const travel = Math.max(entryTop - finishTop, 1);

      if (rect.top >= viewport) {
        setRevealed(0);
        setScrollProgress(0);
        return;
      }

      if (rect.bottom <= 0 || rect.top <= finishTop) {
        setRevealed(chapters.length);
        setScrollProgress(1);
        return;
      }

      const traveled = entryTop - rect.top;
      const progress = clamp(traveled / travel, 0, 1);
      setScrollProgress(progress);
      setRevealed(revealedCountForProgress(progress, chapters.length));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters.length]);

  return (
    <div ref={sceneRef} className="home-story-steps-scene">
      <div
        className="home-story-steps-stage"
        style={
          {
            "--home-story-scroll-progress": String(scrollProgress),
          } as CSSProperties
        }
      >
        <div className="home-story-steps-emitter" aria-hidden="true">
          <div className="home-story-steps-semicircle-clip">
            <span className="home-story-steps-semicircle" />
          </div>
        </div>

        <div className="home-story-steps-grid container-zen">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.step}
              className={`home-story-point home-story-step-item${
                index < revealed ? " is-revealed" : ""
              }`}
              style={
                {
                  transitionDelay: `${index * 110}ms`,
                  "--home-story-step-i": index,
                } as CSSProperties
              }
            >
              <div className="home-story-step-top">
                <span className="home-story-step-index">{chapter.step}</span>
                <h3 className="home-story-step-title">{chapter.title}</h3>
              </div>
              <p className="home-story-step-body">{chapter.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

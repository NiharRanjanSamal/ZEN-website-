"use client";

import type { ReactNode } from "react";
import { OutcomesMagnifierVisual } from "@/components/OutcomesMagnifierVisual";
import {
  OUTCOMES_MAGNIFIER_ASPECT,
  getArcLabelAnchors,
} from "@/components/outcomesVisualMetrics";

type HomeOutcomesSectionProps = {
  eyebrow: string;
  titleLines: string[];
  benefits: string[];
};

function renderTitleLine(line: string) {
  const match = /(digital-led)/i.exec(line);
  if (!match || match.index === undefined) return line;
  const before = line.slice(0, match.index);
  const phrase = match[1];
  const after = line.slice(match.index + phrase.length);
  return (
    <>
      {before}
      <span className="home-outcomes-feature-title-em">{phrase}</span>
      {after}
    </>
  );
}

function OutcomeIcon({ index }: { index: number }) {
  const icons: ReactNode[] = [
    <svg key="0" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 17h18M5 17V9l7-4 7 4v8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6" strokeLinecap="round" />
    </svg>,
    <svg key="1" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        strokeLinecap="round"
      />
    </svg>,
    <svg key="2" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M14 20c0-2.2 1.5-3.5 4-3.5" strokeLinecap="round" />
    </svg>,
    <svg key="3" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 18l6-6 4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8h2v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="4" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>,
    <svg key="5" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

export function HomeOutcomesSection({
  eyebrow,
  titleLines,
  benefits,
}: HomeOutcomesSectionProps) {
  const labelAnchors = getArcLabelAnchors(benefits.length);

  return (
    <section className="home-outcomes" aria-label="Impact">
      <div className="home-outcomes-shell">
        <div className="home-outcomes-feature-card">
          <div className="home-outcomes-feature-heading">
            <p className="home-outcomes-feature-eyebrow">{eyebrow}</p>
            <h2 className="home-outcomes-feature-title">
              {titleLines.map((line) => (
                <span key={line} className="home-outcomes-feature-title-line">
                  {renderTitleLine(line)}
                </span>
              ))}
            </h2>
          </div>

          <div className="home-outcomes-radial-grid">
            <div
              className="home-outcomes-visual-stage"
              style={{ ["--outcomes-vb-aspect" as string]: OUTCOMES_MAGNIFIER_ASPECT }}
            >
              <OutcomesMagnifierVisual
                className="home-outcomes-magnifier-art"
                segmentCount={benefits.length}
              />

              <ol className="home-outcomes-radial-list">
                {benefits.map((benefit, index) => {
                  const anchor = labelAnchors[index];
                  return (
                    <li
                      key={benefit}
                      className="home-outcomes-radial-item"
                      style={
                        anchor
                          ? {
                              ["--icon-align-x" as string]: `${anchor.leftPct}%`,
                              ["--icon-align-y" as string]: `${anchor.topPct}%`,
                            }
                          : undefined
                      }
                    >
                      <span className="home-outcomes-radial-item-icon" aria-hidden>
                        <OutcomeIcon index={index} />
                      </span>
                      <p className="home-outcomes-radial-copy">{benefit}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

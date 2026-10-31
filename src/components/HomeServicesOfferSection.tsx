"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { OfferGlowLines } from "@/components/OfferGlowLines";
import { ProcessSun } from "@/components/ProcessSun";
import { useContent } from "@/components/LocaleProvider";

function getOfferIntroPinOffset() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const bar = styles.getPropertyValue("--header-bar-height").trim() || "4.75rem";
  const rootPx = parseFloat(styles.fontSize) || 16;
  const barPx = bar.endsWith("rem") ? parseFloat(bar) * rootPx : parseFloat(bar);
  return barPx + rootPx;
}

const DESKTOP_PIN_MQ = "(min-width: 1024px)";

function clearFixedStyles(el: HTMLElement) {
  el.style.position = "";
  el.style.top = "";
  el.style.left = "";
  el.style.width = "";
  el.style.bottom = "";
  el.style.zIndex = "";
  el.style.transform = "";
  el.style.transition = "";
}

const OFFER_ICON_LIGHT = "#f5faff";

function OfferIconFrame({ id, children }: { id: string; children: ReactNode }) {
  const grad = `offer-icon-${id}`;
  return (
    <span className="offer-service-card-icon" aria-hidden>
      <svg viewBox="0 0 48 48" className="offer-service-card-icon-svg" fill="none">
        <defs>
          <linearGradient id={grad} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e7f4ff" />
            <stop offset="42%" stopColor="#8ec4ff" />
            <stop offset="100%" stopColor="#3d8ef5" />
          </linearGradient>
        </defs>
        {children}
      </svg>
    </span>
  );
}

function StrategyOfferIcon() {
  const fill = "url(#offer-icon-strategy)";
  return (
    <OfferIconFrame id="strategy">
      <circle cx="24" cy="24" r="17" fill={fill} />
      <circle cx="24" cy="24" r="11.2" fill={OFFER_ICON_LIGHT} />
      <path d="M24 8.4 28.15 24 24 20.5 19.85 24Z" fill={fill} />
      <path d="M24 39.6 19.85 24 24 27.5 28.15 24Z" fill="#9dcbff" />
      <circle cx="24" cy="24" r="2.35" fill={fill} />
    </OfferIconFrame>
  );
}

function DeploymentOfferIcon() {
  const fill = "url(#offer-icon-deployment)";
  return (
    <OfferIconFrame id="deployment">
      <g fill={fill}>
        <rect x="6.6" y="15.1" width="6.2" height="3.15" rx="1.05" />
        <rect x="6.6" y="22.42" width="6.2" height="3.15" rx="1.05" />
        <rect x="6.6" y="29.75" width="6.2" height="3.15" rx="1.05" />
        <rect x="35.2" y="15.1" width="6.2" height="3.15" rx="1.05" />
        <rect x="35.2" y="22.42" width="6.2" height="3.15" rx="1.05" />
        <rect x="35.2" y="29.75" width="6.2" height="3.15" rx="1.05" />
        <rect x="15.1" y="6.6" width="3.15" height="6.2" rx="1.05" />
        <rect x="22.42" y="6.6" width="3.15" height="6.2" rx="1.05" />
        <rect x="29.75" y="6.6" width="3.15" height="6.2" rx="1.05" />
        <rect x="15.1" y="35.2" width="3.15" height="6.2" rx="1.05" />
        <rect x="22.42" y="35.2" width="3.15" height="6.2" rx="1.05" />
        <rect x="29.75" y="35.2" width="3.15" height="6.2" rx="1.05" />
        <rect x="11.1" y="11.1" width="25.8" height="25.8" rx="5" />
      </g>
      <rect x="18.15" y="18.15" width="11.7" height="11.7" rx="2.3" fill={OFFER_ICON_LIGHT} />
    </OfferIconFrame>
  );
}

function AnalyticsOfferIcon() {
  const fill = "url(#offer-icon-analytics)";
  return (
    <OfferIconFrame id="analytics">
      <rect x="7.2" y="25.2" width="8.4" height="14.2" rx="2.4" fill={fill} />
      <rect x="19.8" y="17.2" width="8.4" height="22.2" rx="2.4" fill={fill} />
      <rect x="32.4" y="8.6" width="8.4" height="30.8" rx="2.4" fill={fill} />
      <path
        d="M10.2 20.4 16.6 15.2 23.2 19.4 31.4 11.6"
        stroke="#4e98f6"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M27.6 11.2h4.6v4.4" stroke="#4e98f6" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" />
    </OfferIconFrame>
  );
}

function InfrastructureOfferIcon() {
  const fill = "url(#offer-icon-infrastructure)";
  return (
    <OfferIconFrame id="infrastructure">
      <path
        fill={fill}
        d="M33.6 35.2H17.6c-4.4 0-7.8-3.2-7.8-7.2 0-3.4 2.3-6.3 5.5-7 .8-4.3 4.5-7.5 9-7.5 3.8 0 7.1 2.2 8.5 5.4.6-.1 1.2-.2 1.9-.2 4.6 0 8.3 3.4 8.3 7.7 0 4.6-3.9 8.8-9.4 8.8Z"
      />
      <rect x="18.4" y="23.4" width="13.8" height="8.3" rx="1.8" fill={OFFER_ICON_LIGHT} />
      <path
        d="M21.1 26.2h4.3M21.1 28.8h6.6"
        stroke="#5aa6f6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </OfferIconFrame>
  );
}

function ServiceOfferIcon({ id }: { id: string }) {
  if (id === "deployment") return <DeploymentOfferIcon />;
  if (id === "analytics") return <AnalyticsOfferIcon />;
  if (id === "infrastructure") return <InfrastructureOfferIcon />;
  return <StrategyOfferIcon />;
}

function OfferCardArrow() {
  return (
    <svg viewBox="0 0 16 16" className="offer-service-card-action-icon" fill="none" aria-hidden>
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeServicesOfferSection() {
  const { services, ui } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const originRef = useRef<HTMLAnchorElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const introColRef = useRef<HTMLDivElement>(null);
  const introCopySlotRef = useRef<HTMLDivElement>(null);
  const introCopyPinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRow = scrollRowRef.current;
    const introCol = introColRef.current;
    const introCopySlot = introCopySlotRef.current;
    const introCopy = introCopyPinRef.current;
    const cards = cardsRef.current;
    if (!scrollRow || !introCol || !introCopySlot || !introCopy || !cards) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopMq = window.matchMedia(DESKTOP_PIN_MQ);
    const positionLerp = reduced ? 1 : 0.35;

    const syncIntroTrack = () => {
      if (!desktopMq.matches) {
        introCol.style.minHeight = "";
        return;
      }
      introCol.style.minHeight = `${cards.offsetHeight}px`;
    };

    let frame = 0;
    let smoothLeft = 0;
    let smoothWidth = 0;
    let pinInitialized = false;

    const updateIntroCopyPin = () => {
      frame = 0;

      if (!desktopMq.matches) {
        clearFixedStyles(introCopy);
        introCopySlot.style.minHeight = "";
        introCol.style.minHeight = "";
        pinInitialized = false;
        return;
      }

      syncIntroTrack();

      const top = getOfferIntroPinOffset();
      const rowRect = scrollRow.getBoundingClientRect();
      const anchorRect = introCopySlot.getBoundingClientRect();
      const pinHeight = introCopy.offsetHeight;
      const pinEnd = rowRect.bottom - pinHeight;

      if (rowRect.top > top) {
        clearFixedStyles(introCopy);
        introCopySlot.style.minHeight = "";
        pinInitialized = false;
        return;
      }

      if (pinEnd <= top) {
        clearFixedStyles(introCopy);
        introCopySlot.style.minHeight = "";
        introCopy.style.position = "absolute";
        introCopy.style.bottom = "0";
        introCopy.style.left = "0";
        introCopy.style.width = "100%";
        pinInitialized = false;
        return;
      }

      introCopySlot.style.minHeight = `${pinHeight}px`;

      if (!pinInitialized) {
        smoothLeft = anchorRect.left;
        smoothWidth = anchorRect.width;
        pinInitialized = true;
      } else {
        smoothLeft += (anchorRect.left - smoothLeft) * positionLerp;
        smoothWidth += (anchorRect.width - smoothWidth) * positionLerp;
      }

      introCopy.style.position = "fixed";
      introCopy.style.top = `${top}px`;
      introCopy.style.left = `${smoothLeft}px`;
      introCopy.style.width = `${smoothWidth}px`;
      introCopy.style.bottom = "";
      introCopy.style.zIndex = "6";
      introCopy.style.transition = reduced
        ? "none"
        : "top 0.35s cubic-bezier(0.22, 1, 0.36, 1), left 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateIntroCopyPin);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktopMq.addEventListener("change", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleUpdate) : null;
    ro?.observe(cards);
    ro?.observe(scrollRow);
    ro?.observe(introCol);
    ro?.observe(introCopy);

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      void fontsReady.then(scheduleUpdate);
    }

    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktopMq.removeEventListener("change", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      ro?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      clearFixedStyles(introCopy);
      introCopySlot.style.minHeight = "";
      introCol.style.minHeight = "";
    };
  }, [services.length]);

  return (
    <section
      ref={sectionRef}
      className="home-offer-section relative"
      aria-label="Services"
    >
      <OfferGlowLines sectionRef={sectionRef} originRef={originRef} />
      <ProcessSun className="home-process-sun home-offer-sun-peek" />

      <div className="container-zen relative z-[2]">
        <div className="home-offer-layout">
          <div className="home-offer-cta">
            <div className="offer-origin-wrap">
              <span className="offer-origin-glow" aria-hidden />
              <Link ref={originRef} href="/services" className="btn btn-offer-origin">
                {ui.viewAllSolutions}
              </Link>
            </div>
          </div>

          <div className="home-offer-scroll-row" ref={scrollRowRef}>
            <div className="home-offer-intro" ref={introColRef}>
              <p className="eyebrow home-offer-eyebrow">{ui.whatWeOffer}</p>
              <div className="home-offer-intro-copy-slot" ref={introCopySlotRef}>
                <div className="home-offer-intro-copy" ref={introCopyPinRef}>
                  <h2 className="section-title home-offer-intro-headline">
                    {ui.homeOfferIntroLines.map((line) => (
                      <span key={line} className="home-offer-intro-headline-line">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>

            <div className="home-offer-cards" ref={cardsRef}>
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="offer-service-card group"
                >
                  <ServiceOfferIcon id={service.id} />
                  <div className="offer-service-card-copy">
                    <div className="offer-service-card-head">
                      <h3 className="offer-service-card-title">{service.label}</h3>
                      <span className="offer-service-card-action">
                        <OfferCardArrow />
                      </span>
                    </div>
                    <p className="offer-service-card-summary">{service.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

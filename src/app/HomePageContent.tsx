"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaqList } from "@/components/FaqList";
import { HomeOutcomesSection } from "@/components/HomeOutcomesSection";
import { ProcessSpaceBackdrop } from "@/components/ProcessSpaceBackdrop";
import { HomeServicesOfferSection } from "@/components/HomeServicesOfferSection";
import { HomeStorySteps } from "@/components/HomeStorySteps";
import { useContent, useLocale } from "@/components/LocaleProvider";

import { ProcessPlanetsStrip } from "@/components/ProcessPlanetsStrip";

const industryImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
  "/industry-mining.webp",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
];

export function HomePageContent() {
  const { home, digitalFramework, faqs } = useContent();
  const { t } = useLocale();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    node.classList.add("centered-hero--ready");
  }, []);

  const heroTitleLines =
    home.hero.titleLines ??
    (home.hero.headline ? [home.hero.headline] : ["Zenuino"]);

  return (
    <>
      <div className="home-intro">
        <section ref={heroRef} className="centered-hero centered-hero--home" aria-label="Hero">
          <div className="centered-hero-media">
            <Image
              src="/banner1.webp"
              alt={home.hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover centered-hero-home-img"
            />
          </div>
          <div className="centered-hero-overlay" aria-hidden />
          <div className="centered-hero-content">
            <h1 className="centered-hero-title">
              {heroTitleLines.map((line) => (
                <span key={line} className="centered-hero-title-line">
                  {line}
                </span>
              ))}
            </h1>
            <Link
              href={home.hero.exploreHref ?? "/about"}
              className="centered-hero-cta"
            >
              {home.hero.exploreSolutions}
            </Link>
          </div>
        </section>
      </div>

      <div className="home-hero-bridge" aria-hidden="true">
        <svg
          className="home-hero-bridge-wave"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="homeHeroBridgeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0f14" />
              <stop offset="42%" stopColor="#141c24" />
              <stop offset="78%" stopColor="#2a516b" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#ebe8e2" />
            </linearGradient>
            <linearGradient id="homeHeroBridgeSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="22%" stopColor="rgba(212,180,41,0.35)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="78%" stopColor="rgba(93,138,171,0.45)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#homeHeroBridgeFill)"
            d="M0 0h1440v26Q720 78 0 26V0Z"
          />
          <path fill="#ebe8e2" d="M0 26Q720 78 1440 26v70H0V26Z" />
          <path
            className="home-hero-bridge-horizon"
            fill="none"
            stroke="url(#homeHeroBridgeSheen)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            d="M0 26Q720 78 1440 26"
          />
        </svg>
        <div className="home-hero-bridge-stripe-fade" />
      </div>

      <section className="home-story py-16 md:py-24" aria-label="Our story">
        <div className="home-story-grid container-wide grid items-center gap-8">
          <div className="home-story-intro">
            <p className="eyebrow">{home.story.eyebrow}</p>
            <h2 className="section-title mt-3">{home.story.title}</h2>
            <p className="section-lead mt-4">{home.story.lead}</p>
            <Link href="/about" className="btn btn-story-link mt-5">
              {home.story.link}
            </Link>
          </div>

          <div className="home-story-visual">
            <div className="home-story-visual-main">
              <Image
                src="/digital-solution.webp"
                alt={home.story.visualAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover"
              />
            </div>
            <div className="home-story-visual-side">
              <Image
                src="/is.webp"
                alt={home.story.sideAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 32vw"
                className="object-cover"
              />
            </div>
            <div className="home-story-caption">
              <p className="font-display text-2xl text-steel-50">{home.story.captionTitle}</p>
              <p className="mt-2 text-sm text-steel-300">{home.story.captionBody}</p>
            </div>
          </div>
        </div>

        <HomeStorySteps chapters={home.storyChapters} />
      </section>

      <section className="pb-8" aria-label="Industries">
        <div className="container-zen mb-8">
          <p className="eyebrow">{home.industries.eyebrow}</p>
          <h2 className="section-title display-single-line mt-3">{home.industries.title}</h2>
        </div>
        <div className="container-wide grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {home.industries.items.map((industry, index) => (
            <article key={industry.title} className="home-industry">
              <Image
                src={industryImages[index] ?? industryImages[0]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="home-industry-overlay" />
              <div className="home-industry-content">
                <h3 className="font-display text-3xl text-steel-50">{industry.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-steel-200">{industry.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <HomeServicesOfferSection />

      <section
        id="how-we-work"
        className="home-process-section relative text-steel-50"
        aria-label="How we work"
      >
        <ProcessSpaceBackdrop />
        <div className="home-process-planets-scene">
          <ProcessPlanetsStrip />
        </div>
        <div className="home-process-layout relative z-[4] pointer-events-none">
          <div className="home-process-visual-copy pointer-events-auto">
            <p className="eyebrow !text-accent-soft">{home.howWeWork.eyebrow}</p>
            <h2 className="home-process-visual-title display-single-line">{home.howWeWork.title}</h2>
          </div>
        </div>
      </section>

      <HomeOutcomesSection
        eyebrow={home.outcomes.eyebrow}
        titleLines={
          home.outcomes.titleLines ?? [home.outcomes.title]
        }
        benefits={digitalFramework.benefits}
      />

      <section className="py-10 md:py-14" aria-label="Frequently asked questions">
        <div className="container-zen grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <p className="eyebrow">{home.faq.eyebrow}</p>
            <h2 className="section-title mt-2">{home.faq.title}</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="pb-6 md:pb-8" aria-label="Call to action">
        <div className="container-wide">
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl bg-steel-950 text-steel-50 md:min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/40" />
            <div className="home-cta-inner relative flex min-h-[220px] items-center px-5 py-7 md:min-h-[280px] md:px-10 md:py-9 lg:px-12">
              <div className="max-w-2xl">
                <p className="eyebrow !text-accent-soft">{home.cta.eyebrow}</p>
                <h2 className="section-title mt-2 !text-steel-50">{home.cta.title}</h2>
                <div className="cta-actions mt-5 flex flex-wrap gap-3 md:mt-6">
                  <Link
                    href="/contact"
                    className="btn btn-primary !bg-steel-50 !text-steel-950 !border-steel-50"
                  >
                    {t.footer.startConversation}
                  </Link>
                  <Link href="/services" className="btn btn-secondary">
                    {home.cta.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/LocaleProvider";
import { AboutReveal } from "@/app/about/AboutReveal";
import { AboutHeroMotion, AboutScrollSection } from "@/app/about/AboutScrollFx";
import { PracticeCircuitMark } from "@/app/about/PracticeCircuitMark";
import { ValuesBulb } from "@/app/about/ValuesBulb";
import { AboutWaves } from "@/app/about/AboutWaves";
import "./about.css";

function AboutGlyph() {
  return (
    <span className="about-t-glyph" aria-hidden>
      ✱
    </span>
  );
}

const LAMP_MAX_DEG = 16;
const LAMP_ZETA = 0.09;

function prefersReducedLampMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ValuesLamp({
  value,
  index,
}: {
  value: { title: string; body: string };
  index: number;
}) {
  const lampRef = useRef<HTMLElement>(null);
  const hangRef = useRef<HTMLDivElement>(null);
  const lastBrushRef = useRef(0);
  const motionRef = useRef({
    angle: 0,
    vel: 0,
    raf: 0,
  });

  const period = 1.62 + index * 0.11;
  const omega = (Math.PI * 2) / period;

  const applyAngle = (deg: number) => {
    const el = lampRef.current;
    if (!el) return;
    const clamped = Math.max(-LAMP_MAX_DEG, Math.min(LAMP_MAX_DEG, deg));
    el.style.setProperty("--lamp-swing", `${clamped}deg`);
    el.style.setProperty("--lamp-cone", `${clamped}deg`);
    motionRef.current.angle = clamped;
  };

  const stopSwing = () => {
    if (motionRef.current.raf) {
      cancelAnimationFrame(motionRef.current.raf);
      motionRef.current.raf = 0;
    }
  };

  const keepSwinging = () => {
    if (motionRef.current.raf) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const { angle, vel } = motionRef.current;
      const theta = (angle * Math.PI) / 180;
      const omegaDot = (vel * Math.PI) / 180;
      const alpha = -omega * omega * Math.sin(theta) - 2 * LAMP_ZETA * omega * omegaDot;
      const nextVel = vel + ((alpha * 180) / Math.PI) * dt;
      const nextAngle = angle + nextVel * dt;
      motionRef.current.vel = nextVel;
      applyAngle(nextAngle);
      if (Math.abs(nextAngle) < 0.08 && Math.abs(nextVel) < 0.25) {
        applyAngle(0);
        motionRef.current.vel = 0;
        motionRef.current.raf = 0;
        return;
      }
      motionRef.current.raf = requestAnimationFrame(tick);
    };
    motionRef.current.raf = requestAnimationFrame(tick);
  };

  const brush = (clientX: number, movementX = 0) => {
    if (prefersReducedLampMotion()) return;
    const now = performance.now();
    if (now - lastBrushRef.current < 220) return;
    lastBrushRef.current = now;
    const hang = hangRef.current;
    if (!hang) return;
    const box = hang.getBoundingClientRect();
    const center = box.left + box.width / 2;
    const dir = Math.abs(movementX) > 1 ? Math.sign(movementX) : clientX < center ? 1 : -1;
    motionRef.current.angle += dir * 3.2;
    motionRef.current.vel += dir * 58;
    applyAngle(motionRef.current.angle);
    keepSwinging();
  };

  useEffect(() => () => stopSwing(), []);

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    brush(event.clientX, event.movementX);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    brush(event.clientX);
  };

  return (
    <article ref={lampRef} className="about-t-lamp about-t-stagger-item">
      <div
        ref={hangRef}
        className="about-t-lamp-hang"
        aria-hidden
        onPointerEnter={onPointerEnter}
        onPointerDown={onPointerDown}
      >
        <span className="about-t-lamp-cord" />
        <span className="about-t-lamp-glow" />
        <ValuesBulb />
        <span className={`about-t-lamp-beam about-t-lamp-beam--${index}`} />
      </div>
      <div className="about-t-lamp-body">
        <div className="about-t-lamp-copy about-t-lamp-copy--dim" aria-hidden>
          <h3>{value.title}</h3>
          <p>{value.body}</p>
        </div>
        <div className="about-t-lamp-copy about-t-lamp-copy--lit">
          <h3>{value.title}</h3>
          <p>{value.body}</p>
        </div>
      </div>
    </article>
  );
}

const storyThenImage = {
  src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
  alt: "Engineers reviewing industrial equipment on the plant floor",
};

const storyNowImage = {
  src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
  alt: "Team collaborating on digital systems",
};

const storyStripImages = [
  {
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
    alt: "Metals and manufacturing work",
    caption: "Metals",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    alt: "Planning production and systems together",
    caption: "Planning",
  },
  {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",
    alt: "Power and infrastructure",
    caption: "Power",
  },
];

function leaderInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function LeaderPortrait({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="about-t-leader-mark" aria-hidden>
        {leaderInitials(name)}
      </span>
    );
  }

  return (
    <span className="about-t-leader-photo">
      <Image
        src={src}
        alt=""
        fill
        sizes="96px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

const practiceTones = ["about-t-practice-card--deep", "about-t-practice-card--sky", "about-t-practice-card--blush", "about-t-practice-card--mint"] as const;

export function AboutPageContent() {
  const { about, team, pages, services } = useContent();
  const copy = pages.about;
  const practiceServices = services.slice(0, 4);
  const marqueeTags = [...copy.bentoTags, ...copy.bentoTags];
  const [mentor, ...founders] = team;

  return (
    <div className="about-t">
      <AboutHeroMotion>
        <div className="about-t-hero-media">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80"
            alt={copy.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="about-t-hero-overlay" aria-hidden />
        <div className="about-t-hero-content">
          <p className="about-t-hero-eyebrow">{copy.heroEyebrow}</p>
          <h1 className="about-t-hero-title">
            {copy.heroTitleLines.map((line) => (
              <span key={line} className="about-t-hero-title-line">
                {line}
              </span>
            ))}
          </h1>
          <Link href="/contact" className="about-t-hero-cta">
            {copy.heroCta}
          </Link>
        </div>
      </AboutHeroMotion>

      <AboutScrollSection
        className="about-t-section about-t-outcomes-wrap about-t-scroll-section"
        aria-labelledby="about-company"
      >
        <div className="about-t-container about-t-outcomes-inner">
          <div className="about-t-watermark" aria-hidden>
            Z
          </div>
          <div className="about-t-outcomes-layout">
            <div className="about-t-outcomes-copy">
              <AboutReveal variant="fade" delay={0}>
                <h2 id="about-company" className="about-t-display">
                  {copy.fromDataHeading}
                </h2>
              </AboutReveal>
              <AboutReveal delay={1}>
                <p className="about-t-lead">{copy.fromDataIntro}</p>
              </AboutReveal>
              <AboutReveal variant="blur" delay={2}>
                <blockquote className="about-t-pullquote">{copy.fromDataQuote}</blockquote>
              </AboutReveal>
              <AboutReveal delay={3}>
                <p className="about-t-lead about-t-lead--tight">{copy.fromDataFooter}</p>
              </AboutReveal>
            </div>
            <AboutReveal className="about-t-outcomes-art-reveal" variant="right" delay={2}>
              <figure className="about-t-outcomes-art">
                <Image
                  src="/digital-solution.webp"
                  alt="Industrial operations Zenuino supports"
                  fill
                  className="about-t-outcomes-art-photo"
                  sizes="(max-width: 960px) 90vw, 32vw"
                />
                <div className="about-t-outcomes-art-scrim" aria-hidden />
                <figcaption className="about-t-outcomes-art-caption">
                  Jamshedpur · Metals, mining &amp; power
                </figcaption>
              </figure>
            </AboutReveal>
          </div>
          <AboutReveal className="about-t-stagger" delay={2}>
            <div className="about-t-outcomes">
              {copy.outcomes.map((item, index) => (
                <article key={item.title} className="about-t-outcome about-t-stagger-item">
                  <span className="about-t-outcome-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </AboutReveal>
        </div>
      </AboutScrollSection>

      {/* Practice bento (Toggl product grid) */}
      <section className="about-t-section about-t-section--practice" aria-labelledby="about-practice">
        <div className="about-t-practice-bg" aria-hidden />
        <div className="about-t-practice-bg-grid" aria-hidden />
        <div className="about-t-practice-bg-bloom" aria-hidden />
        <div className="about-t-tag-marquee" aria-hidden>
          <div className="about-t-tag-marquee-track">
            {marqueeTags.map((tag, index) => (
              <span key={`${tag}-${index}`} className="about-t-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="about-t-container">
          <AboutReveal variant="left">
            <h2 id="about-practice" className="about-t-display about-t-display--left">
              {copy.practiceHeading}
            </h2>
          </AboutReveal>
          <AboutReveal className="about-t-stagger about-t-stagger--cards" delay={1}>
            <div className="about-t-practice">
            <article
              className={`about-t-practice-card about-t-practice-card--tall about-t-stagger-item ${practiceTones[0]}`}
            >
              <span className="about-t-practice-icon" aria-hidden>
                01
              </span>
              <h3>{practiceServices[0]?.label}</h3>
              <p>{practiceServices[0]?.summary}</p>
              <Link href="/services#strategy" className="about-t-practice-link">
                Explore →
              </Link>
              <PracticeCircuitMark />
            </article>
            <div className="about-t-practice-stack">
              <article
                className={`about-t-practice-card about-t-practice-card--pattern-sky about-t-stagger-item ${practiceTones[1]}`}
              >
                <span className="about-t-practice-icon" aria-hidden>
                  02
                </span>
                <h3>{practiceServices[1]?.label}</h3>
                <p>{practiceServices[1]?.summary}</p>
              </article>
              <article className={`about-t-practice-card about-t-stagger-item ${practiceTones[2]}`}>
                <span className="about-t-practice-icon" aria-hidden>
                  03
                </span>
                <h3>{practiceServices[2]?.label}</h3>
                <p>{practiceServices[2]?.summary}</p>
              </article>
            </div>
            <div className="about-t-practice-side">
              <article
                className={`about-t-practice-card about-t-practice-card--pattern-mint about-t-stagger-item ${practiceTones[3]}`}
              >
                <span className="about-t-practice-icon" aria-hidden>
                  04
                </span>
                <h3>{practiceServices[3]?.label}</h3>
                <p>{practiceServices[3]?.summary}</p>
              </article>
              <p className="about-t-practice-footer about-t-stagger-item">{copy.practiceFooter}</p>
            </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-section about-t-section--cream" aria-labelledby="about-trust">
        <div className="about-t-container">
          <AboutReveal className="about-t-trust-reveal">
          <div className="about-t-trust">
            <div className="about-t-trust-left">
              <h2 id="about-trust" className="about-t-trust-heading">
                {copy.trust.heading}
              </h2>
              <ul className="about-t-trust-list">
                {copy.trust.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="about-t-trust-foot">{copy.trust.footer}</p>
            </div>
            <div className="about-t-trust-right">
              <p className="about-t-trust-label">{copy.trust.label}</p>
              <p className="about-t-trust-stat">{copy.trust.stat}</p>
              <p className="about-t-trust-stat-title">{copy.trust.statTitle}</p>
              <p className="about-t-trust-stat-body">{copy.trust.statBody}</p>
              <div className="about-t-trust-badges">
                {copy.trust.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-section about-t-section--lessons" aria-labelledby="about-lessons">
        <span className="about-t-lessons-blob about-t-lessons-blob--a" aria-hidden />
        <span className="about-t-lessons-blob about-t-lessons-blob--b" aria-hidden />
        <span className="about-t-lessons-blob about-t-lessons-blob--c" aria-hidden />
        <div className="about-t-container about-t-lessons-layout">
          <div className="about-t-lessons-main">
            <AboutReveal variant="left">
              <h2 id="about-lessons" className="about-t-display about-t-display--left">
                {copy.lessonsHeading}
              </h2>
            </AboutReveal>
            <AboutReveal className="about-t-stagger" delay={1}>
              <div className="about-t-lessons">
                {copy.lessons.map((item, index) => (
                  <article
                    key={item.title}
                    className="about-t-lesson about-t-stagger-item"
                  >
                    <div className="about-t-lesson-head">
                      <span className="about-t-lesson-index" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <AboutGlyph />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </AboutReveal>
          </div>
        </div>
      </section>

      <section className="about-t-section about-t-section--story" aria-labelledby="about-story">
        <div className="about-t-container">
          <AboutReveal variant="left">
            <h2 id="about-story" className="about-t-display about-t-display--left">
              {copy.originStoryHeading}
            </h2>
          </AboutReveal>
          <AboutReveal className="about-t-stagger" delay={1}>
            <div className="about-t-story-chapters">
              <article className="about-t-story-chapter about-t-story-chapter--then about-t-stagger-item">
                <figure className="about-t-story-chapter-media">
                  <Image
                    src={storyThenImage.src}
                    alt={storyThenImage.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="object-cover"
                  />
                </figure>
                <div className="about-t-story-chapter-body">
                  <p className="about-t-story-chapter-label">
                    <span aria-hidden>01</span> {copy.originStoryThen}
                  </p>
                  <p>{copy.originStoryColumns[0]}</p>
                </div>
              </article>
              <span className="about-t-story-join" aria-hidden>
                ✱
              </span>
              <article className="about-t-story-chapter about-t-story-chapter--now about-t-stagger-item">
                <figure className="about-t-story-chapter-media">
                  <Image
                    src={storyNowImage.src}
                    alt={storyNowImage.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="object-cover"
                  />
                </figure>
                <div className="about-t-story-chapter-body">
                  <p className="about-t-story-chapter-label">
                    <span aria-hidden>02</span> {copy.originStoryNow}
                  </p>
                  <p>{copy.originStoryColumns[1]}</p>
                </div>
              </article>
            </div>
          </AboutReveal>
          <AboutReveal className="about-t-stagger about-t-stagger-gallery" delay={2}>
            <div className="about-t-story-strip">
              {storyStripImages.map((img) => (
                <figure key={img.src} className="about-t-story-strip-item about-t-stagger-item">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-section about-t-section--line" aria-labelledby="about-line">
        <div className="about-t-line-grid" aria-hidden />
        <div className="about-t-container about-t-line-inner">
          <AboutReveal variant="fade">
            <h2 id="about-line" className="about-t-display about-t-display--center about-t-line-title">
              {copy.lineHeading}
            </h2>
          </AboutReveal>
          <div className="about-t-line-grid-content">
            <AboutReveal variant="left" delay={1}>
            <div className="about-t-line-copy">
              <blockquote className="about-t-line-quote">
                <p>{copy.lineQuote.text}</p>
                <footer>{copy.lineQuote.attribution}</footer>
              </blockquote>
              <p className="about-t-line-body">{copy.lineBody}</p>
            </div>
            </AboutReveal>
            <AboutReveal className="about-t-line-media-reveal" variant="scale" delay={2}>
            <figure className="about-t-line-media">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Team collaborating over technology plans"
                fill
                sizes="(max-width: 960px) 100vw, 44vw"
                className="object-cover"
              />
            </figure>
            </AboutReveal>
          </div>
        </div>
      </section>

      <section className="about-t-section about-t-section--values" aria-labelledby="about-values">
        <div className="about-t-container">
          <AboutReveal variant="scale">
            <h2 id="about-values" className="about-t-display about-t-display--center">
              {copy.valuesHeading}
            </h2>
          </AboutReveal>
          <AboutReveal className="about-t-stagger" delay={1}>
            <div className="about-t-lamps">
              {copy.values.map((value, index) => (
                <ValuesLamp key={value.title} value={value} index={index} />
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-section about-t-section--leadership" aria-labelledby="about-leadership">
        <AboutWaves className="about-t-leadership-waves" />
        <div className="about-t-container">
          <AboutReveal>
            <header className="about-t-leaders-intro">
              <h2 id="about-leadership" className="about-t-display about-t-display--left">
                {copy.leadership}
              </h2>
            </header>
          </AboutReveal>
          <AboutReveal className="about-t-stagger" delay={1}>
            {mentor ? (
              <article className="about-t-leader about-t-leader--mentor about-t-stagger-item">
                <div className="about-t-leader-identity">
                  <LeaderPortrait name={mentor.name} src={mentor.image} />
                  <div>
                    <h3>{mentor.name}</h3>
                    <p className="about-t-leader-role">{mentor.role}</p>
                  </div>
                </div>
                <p className="about-t-leader-bio">{mentor.bio}</p>
              </article>
            ) : null}
            <div className="about-t-leaders-grid">
              {founders.map((person) => (
                <article key={person.name} className="about-t-leader about-t-stagger-item">
                  <div className="about-t-leader-identity">
                    <LeaderPortrait name={person.name} src={person.image} />
                    <div>
                      <h3>{person.name}</h3>
                      <p className="about-t-leader-role">{person.role}</p>
                    </div>
                  </div>
                  <p className="about-t-leader-bio">{person.bio}</p>
                  {person.email ? (
                    <a className="about-t-leader-mail" href={`mailto:${person.email}`}>
                      {person.email}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-section about-t-section--tldr" aria-labelledby="about-work">
        <div className="about-t-container">
          <AboutReveal variant="blur">
            <div className="about-t-work-cta">
              <AboutWaves className="about-t-work-waves" />
              <h2 id="about-work" className="about-t-work-title">
                {copy.workCta.title}
              </h2>
              <p className="about-t-work-body">{copy.workCta.body}</p>
              <div className="about-t-work-actions">
                <Link href="/contact" className="about-t-btn about-t-btn--primary">
                  {copy.workCta.primary}
                </Link>
                <Link href="/why-us" className="about-t-link">
                  {copy.workCta.secondary}
                </Link>
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      <section className="about-t-engage" aria-label="Contact">
        <div className="about-t-container about-t-engage-inner">
          <AboutReveal variant="left">
          <div>
            <p className="about-t-engage-eyebrow">{copy.cta.eyebrow}</p>
            <h2 className="about-t-engage-title">{copy.cta.title}</h2>
            <p className="about-t-engage-meta">{about.intro.lead}</p>
          </div>
          </AboutReveal>
          <AboutReveal variant="right" delay={2}>
          <div className="about-t-work-actions">
            <Link href="/contact" className="about-t-btn about-t-btn--primary">
              {copy.cta.primary}
            </Link>
            <Link href="/services" className="about-t-btn about-t-btn--outline">
              View solutions
            </Link>
          </div>
          </AboutReveal>
        </div>
      </section>
    </div>
  );
}

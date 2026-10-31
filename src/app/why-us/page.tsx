import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageBand } from "@/components/ImageBand";
import { PageCta } from "@/components/PageCta";
import { PageHero } from "@/components/PageHero";
import { metrics, whyPoints } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Why enterprises choose Zenuino — steel industry heritage, proven playbooks, lifecycle expertise, and technology-led execution.",
};

export default function WhyUsPage() {
  const [featured, ...rest] = whyPoints;

  return (
    <>
      <PageHero
        eyebrow="Why Us"
        title="Why Zenuino"
        lead="A strategic transformation partner with steel industry heritage, proven playbooks, and technology-led execution across enterprises and MSMEs."
        imageSrc="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2200&q=80"
        imageAlt="Industrial steel operations"
      />

      <section className="page-split py-16 md:py-24">
        <div className="container-zen grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">The difference</p>
            <h2 className="section-title mt-3">
              Operators who understand industry — not slideware consulting.
            </h2>
            <p className="section-lead mt-5">
              Zenuino exists for buyers who need digital partners that understand industrial
              operations, capital intensity, and the realities of Indian enterprises and MSMEs.
            </p>
            {featured ? (
              <article className="mt-8 border-t border-[var(--line)] pt-6">
                <p className="font-display text-2xl text-accent">01</p>
                <h3 className="mt-2 text-xl font-semibold text-steel-950">{featured.title}</h3>
                <p className="mt-3 text-steel-600">{featured.body}</p>
              </article>
            ) : null}
          </div>
          <div className="relative aspect-[5/4] overflow-hidden bg-steel-900">
            <Image
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1400&q=80"
              alt="Manufacturing environment reflecting Zenuino’s industrial expertise"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-3xl text-steel-50">Steel industry heritage</p>
              <p className="mt-2 text-steel-200">Tata Steel and Usha Martin leadership DNA</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/90 py-16 md:py-24">
        <div className="container-zen">
          <div className="max-w-2xl">
            <p className="eyebrow">Why buyers choose us</p>
            <h2 className="section-title mt-3">Eight reasons that hold under scrutiny.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {rest.map((point, index) => (
              <article key={point.title} className="page-panel">
                <p className="font-display text-3xl text-accent">
                  {String(index + 2).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-steel-950">
                  {point.title}
                </h2>
                <p className="mt-3 text-steel-600">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-metric-band py-16">
        <div className="container-zen relative grid gap-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-display text-5xl text-steel-50">{metric.value}</p>
              <p className="mt-3 text-sm tracking-[0.08em] text-accent-soft uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ImageBand
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2200&q=80"
        alt="Team collaborating on enterprise digital programs"
        caption="More than a vendor — a transformation partner."
        support="Unlock efficiency, gain agility, and build long-term competitiveness."
      />

      <section className="py-20">
        <div className="container-zen flex flex-wrap gap-3">
          <Link href="/certification" className="btn btn-ghost">
            View certifications
          </Link>
          <Link href="/ecosystem" className="btn btn-ghost">
            Explore ecosystem
          </Link>
        </div>
      </section>

      <PageCta
        eyebrow="Partner with us"
        title="Ready to choose a partner who knows the plant floor?"
        lead="Talk to our team about strategy, deployment, analytics, infrastructure, or SaaS solutions."
        primaryLabel="Contact us"
        secondaryHref="/about"
        secondaryLabel="Meet the team"
      />
    </>
  );
}

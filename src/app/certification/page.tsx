import type { Metadata } from "next";
import Image from "next/image";
import { ImageBand } from "@/components/ImageBand";
import { PageCta } from "@/components/PageCta";
import { PageHero } from "@/components/PageHero";
import { certification, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certification",
  description:
    "DPIIT-recognised startup with leadership credentials in ISMS, TickIT, SAP, and executive education.",
};

export default function CertificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Certification"
        title="Recognized to build. Equipped to deliver."
        lead={`${site.dpiitFull}. Leadership experience from Tata Steel Group and Usha Martin, applied to industrial digital programmes.`}
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80"
        imageAlt="Enterprise leadership and credentials context"
      />

      <section className="page-split py-16 md:py-24">
        <div className="container-zen grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Credibility</p>
            <h2 className="section-title mt-3">A young company with deep industrial credentials.</h2>
            <p className="mt-6 text-lg leading-relaxed text-steel-700">{certification.intro}</p>
            <p className="mt-5 text-steel-600">{certification.note}</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-steel-900">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Enterprise environment representing recognized capability"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-950/80 via-steel-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-4xl text-steel-50">DPIIT</p>
              <p className="mt-2 text-sm tracking-[0.12em] text-accent-soft uppercase">
                Recognized start-up · {site.dpiit}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/90 py-16 md:py-24">
        <div className="container-zen">
          <div className="max-w-2xl">
            <p className="eyebrow">Individual certifications</p>
            <h2 className="section-title mt-3">Credentials carried by the leadership team.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {certification.items.map((item, index) => (
              <article key={item.title} className="page-panel">
                <p className="font-display text-3xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-steel-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-steel-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageBand
        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2200&q=80"
        alt="Professional leadership environment"
        caption="As the journey unfolds, company certifications will follow."
        support="Meanwhile, individual credentials and DPIIT recognition already signal delivery seriousness."
      />

      <PageCta
        eyebrow="Credentials"
        title="Need a credentials pack for your evaluation?"
        lead="We can share recognition details and leadership background for stakeholder review."
        primaryLabel="Request credentials"
        secondaryHref="/why-us"
        secondaryLabel="Why Zenuino"
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { ImageBand } from "@/components/ImageBand";
import { PageCta } from "@/components/PageCta";
import { PageHero } from "@/components/PageHero";
import { ecosystem, erpExpertise } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Zenuino’s collaborating partners, cloud service providers, and customer engagements across industrial programs.",
};

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Ecosystem"
        title="A network built for industrial outcomes."
        lead="Collaborating partners, cloud service providers, and customer engagements that support enterprise delivery."
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=80"
        imageAlt="Collaboration across enterprise teams"
      />

      <section className="page-split py-16 md:py-24">
        <div className="container-zen grid gap-5 md:grid-cols-2">
          <article className="page-panel relative overflow-hidden min-h-[16rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(63,111,143,0.25), transparent 55%)",
              }}
            />
            <div className="relative">
              <p className="font-display text-3xl text-accent">01</p>
              <h2 className="mt-4 text-2xl font-semibold text-steel-950">Collaborating partners</h2>
              <p className="mt-3 text-steel-600">{ecosystem.collaboratingPartnersNote}</p>
            </div>
          </article>
          <article className="page-panel relative overflow-hidden min-h-[16rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 0% 100%, rgba(42,81,107,0.2), transparent 55%)",
              }}
            />
            <div className="relative">
              <p className="font-display text-3xl text-accent">02</p>
              <h2 className="mt-4 text-2xl font-semibold text-steel-950">Cloud service providers</h2>
              <p className="mt-3 text-steel-600">{ecosystem.cloudProvidersNote}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/90 py-16 md:py-24">
        <div className="container-zen">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">Customer engagements</p>
            <h2 className="section-title mt-3">Organisations we work alongside.</h2>
            <p className="section-lead mt-5">
              From recognized industrial brands to specialized operators — our ecosystem
              reflects the breadth of Indian manufacturing and enterprise.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.customerEngagements.map((client, index) => (
              <li key={client} className="page-panel !p-6">
                <p className="font-display text-xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-2xl text-steel-950 md:text-3xl">{client}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ImageBand
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80"
        alt="Industrial operations connected through digital programs"
        caption="ERP footprint across India and global operations."
        support="Tata Steel Group, Usha Martin Group, and MSME programs."
      />

      <section className="py-16 md:py-24">
        <div className="container-zen grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">ERP footprint</p>
            <h2 className="section-title mt-3">Implementation experience at enterprise scale.</h2>
            <p className="section-lead mt-5">
              Programs spanning India operations, global Tata Steel entities, and growing MSMEs.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-steel-900">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
                alt="Enterprise systems and industrial delivery context"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {erpExpertise.organizations.map((org, index) => (
              <article key={org.group} className="page-panel">
                <p className="font-display text-2xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-semibold text-steel-950">{org.group}</p>
                <ul className="mt-3 space-y-1.5 text-steel-600">
                  {org.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Partnership"
        title="Interested in joining the ecosystem?"
        lead="We collaborate with technology vendors, system integrators, and industry specialists who share a delivery-first mindset."
        primaryLabel="Start a partnership conversation"
        secondaryHref="/services"
        secondaryLabel="View solutions"
      />
    </>
  );
}

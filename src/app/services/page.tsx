import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ErpExpertiseSection } from "@/components/ErpExpertiseSection";
import { ManagedItServicesSection } from "@/components/ManagedItServicesSection";
import { FeaturedHighlightCards } from "@/components/FeaturedHighlightCards";
import { PageCta } from "@/components/PageCta";
import { PageHero } from "@/components/PageHero";
import { ServiceJumpNav } from "@/components/ServiceJumpNav";
import {
  digitalFramework,
  plantFloorIntro,
  plantProjects,
  saasOfferings,
  services,
} from "@/lib/content";

const saasProjectHrefs: Record<string, string> = {
  "Smart Production Inventory Management System": "/services/projects#production-inventory",
  "Smart Approval and Document Management System": "/services/projects#smart-approval",
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital strategy, solution deployment, AI analytics, infrastructure security, SaaS offerings, and ERP expertise from Zenuino.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="What we offer"
        lead="Strategy & advisory, digital solutions deployment, AI-powered analytics & insights, and infrastructure & security services — with SaaS offerings and deep ERP expertise."
        imageSrc="/digital-solution.webp"
        imageAlt="Industrial digital systems and operations"
      />

      <ServiceJumpNav />

      <section aria-label="Core services">
        {services.map((service, index) => {
          const inverted = index % 2 === 1;
          return (
            <article
              key={service.id}
              id={service.id}
              className={`service-band scroll-mt-36 ${inverted ? "service-band-alt" : ""}`}
            >
              <div className="container-zen relative py-20 md:py-24">
                <div className="service-band-number" aria-hidden>
                  {service.number}
                </div>

                <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
                  <div>
                    <p className="eyebrow">{service.number}</p>
                    <h2 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.95rem)] leading-[1.1] tracking-[-0.02em] text-steel-950">
                      {service.label}
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-600">
                      {service.summary}
                    </p>
                    <Link href="/contact" className="btn btn-3d mt-8">
                      Discuss this capability
                    </Link>
                  </div>

                  <ol className="grid gap-4">
                    {service.offerings.map((item, offeringIndex) => (
                      <li key={item.title} className="service-offering">
                        <span className="service-offering-index">
                          {String(offeringIndex + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold tracking-[-0.015em] text-steel-950">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[0.98rem] leading-relaxed text-steel-600">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="relative overflow-hidden" aria-label="Industrial context">
        <div className="relative aspect-[16/9] min-h-[200px] w-full md:aspect-[21/8] md:min-h-[220px]">
          <Image
            src="/analytics-page.webp"
            alt="Industrial operations and digital control environment"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950/80 via-steel-950/45 to-steel-950/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-zen pb-10">
              <p className="max-w-xl font-display text-3xl text-steel-50 md:text-4xl">
                Built for plants, supply chains, and enterprise decision systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-36 bg-surface py-16 md:py-24"
        aria-label="Plant-floor projects"
      >
        <div className="container-zen">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{plantFloorIntro.eyebrow}</p>
              <h2 className="section-title mt-3">{plantFloorIntro.title}</h2>
              <p className="section-lead mt-4">{plantFloorIntro.lead}</p>
            </div>
            <Link href="/services/projects" className="btn btn-3d shrink-0">
              View all projects
            </Link>
          </div>

          <div className="project-preview-grid mt-10">
            {plantProjects.map((project) => (
              <article key={project.id} className="project-preview-card">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow">
                    {project.number} · {project.category}
                  </p>
                </div>
                <span className="project-status mt-3">{project.status}</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.02em] text-steel-950">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-snug text-steel-800">{project.fullName}</p>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-steel-600">{project.tagline}</p>
                <Link href={`/services/projects#${project.id}`} className="project-preview-link">
                  View project
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ManagedItServicesSection />

      <section
        className="scroll-mt-36 border-y border-[var(--line)] bg-mist/90 py-12 md:py-16"
        aria-label="Featured solutions"
      >
        <div className="container-zen">
          <div className="max-w-2xl">
            <p className="eyebrow">Where to start</p>
            <h2 className="section-title mt-3">Enterprise programs and operations depth</h2>
            <p className="section-lead mt-4">
              Two flagship paths—transformation architecture for leadership teams, and ERP execution for
              global operations.
            </p>
          </div>
          <div className="about-highlight-cards solutions-featured-highlights mt-10 !mb-0">
            <FeaturedHighlightCards className="about-highlight-cards-grid" />
          </div>
        </div>
      </section>

      <section
        id="framework"
        className="scroll-mt-36 relative overflow-hidden bg-steel-950 py-16 text-steel-50 md:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 85% 0%, rgba(93,138,171,0.22), transparent 55%), linear-gradient(180deg, #0d141c 0%, #121820 100%)",
          }}
        />
        <div className="container-zen relative">
          <p className="eyebrow !text-accent-soft">Framework</p>
          <h2 className="section-title mt-3 max-w-3xl !text-steel-50">
            {digitalFramework.title}
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {digitalFramework.domains.map((domain) => (
              <article key={domain.title} className="framework-tile">
                <h3 className="framework-tile-title">{domain.title}</h3>
                <p className="framework-tile-body">{domain.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-10">
            <h3 className="text-xl font-semibold">
              Key benefits of digital-led business transformation
            </h3>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {digitalFramework.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-steel-200"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="saas" className="scroll-mt-36 py-16 md:py-24">
        <div className="container-zen">
          <div className="max-w-2xl">
            <p className="eyebrow">Products</p>
            <h2 className="section-title mt-3">Our SaaS offerings</h2>
            <p className="section-lead mt-5">
              Ready platforms for genuinity, production, projects, assets, approvals, ERP, healthcare, and identity.
            </p>
          </div>

          <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {saasOfferings.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-3 py-7 transition hover:bg-surface/70 md:grid-cols-[4.5rem_1fr] md:gap-8"
              >
                <p className="font-display text-2xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-steel-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-steel-600">{item.body}</p>
                  {saasProjectHrefs[item.title] ? (
                    <Link href={saasProjectHrefs[item.title]} className="project-preview-link !mt-3">
                      View project
                      <span aria-hidden>→</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ErpExpertiseSection />

      <PageCta
        eyebrow="Engage us"
        title="Ready to scope your next digital program?"
        lead="Tell us about your operations and we’ll respond with a clear next step."
        primaryLabel="Request a scoping call"
        secondaryHref="/contact"
        secondaryLabel="Contact leadership"
      />
    </>
  );
}

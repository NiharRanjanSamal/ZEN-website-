import type { Metadata } from "next";
import Link from "next/link";
import { ManagedItServicesSection } from "@/components/ManagedItServicesSection";
import { PageCta } from "@/components/PageCta";
import { PageHero } from "@/components/PageHero";
import { ServiceJumpNav } from "@/components/ServiceJumpNav";
import {
  furtherEngagements,
  plantFloorIntro,
  plantFloorPrinciples,
  plantProjects,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Plant-floor platforms from Zenuino: SIPOMS, Smart Approval Workflow, and Smart Production Inventory, plus further systems across planning, orders and traceability.",
};

const projectNav = [
  { id: "sipoms", label: "01 SIPOMS" },
  { id: "smart-approval", label: "02 Approvals" },
  { id: "production-inventory", label: "03 Inventory" },
  { id: "further", label: "Further" },
  { id: "managed-it", label: "Managed IT" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={plantFloorIntro.eyebrow}
        title={plantFloorIntro.title}
        lead={plantFloorIntro.lead}
        imageSrc="/analytics-page.webp"
        imageAlt="Plant floor and industrial operations"
      />

      <section className="border-b border-[var(--line)] bg-surface" aria-label="How these platforms are built">
        <ul className="project-principles container-zen">
          {plantFloorPrinciples.map((principle, index) => (
            <li key={principle} className="project-principle">
              <span className="project-principle-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{principle}</p>
            </li>
          ))}
        </ul>
      </section>

      <ServiceJumpNav links={projectNav} label="Project sections" />

      {plantProjects.map((project, index) => {
        const inverted = index % 2 === 1;
        return (
          <article
            key={project.id}
            id={project.id}
            className={`service-band scroll-mt-36 ${inverted ? "service-band-alt" : ""}`}
          >
            <div className="container-zen relative py-16 md:py-24">
              <div className="service-band-number" aria-hidden>
                {project.number}
              </div>

              <div className="relative max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="eyebrow">
                    {project.number} · {project.category}
                  </p>
                  <span className="project-status">{project.status}</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] tracking-[-0.03em] text-steel-950">
                  {project.name}
                </h2>
                <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-steel-800">
                  {project.fullName}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-steel-700">{project.tagline}</p>
                <p className="mt-4 leading-relaxed text-steel-600">{project.summary}</p>
              </div>

              <div className="project-built-for relative mt-8 max-w-3xl">
                <p className="eyebrow">Built for</p>
                <p className="mt-2 leading-relaxed text-steel-700">{project.builtFor}</p>
              </div>

              <Link href="/contact" className="btn btn-3d relative mt-8">
                Discuss this solution
              </Link>

              <ol className="relative mt-12 grid gap-4 lg:grid-cols-2">
                {project.capabilities.map((item, capabilityIndex) => (
                  <li key={item.title} className="service-offering">
                    <span className="service-offering-index">
                      {String(capabilityIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.015em] text-steel-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-steel-600">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="project-outcomes relative mt-8">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}

      <section
        id="further"
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
          <p className="eyebrow !text-accent-soft">{furtherEngagements.eyebrow}</p>
          <h2 className="section-title mt-3 max-w-3xl !text-steel-50">{furtherEngagements.title}</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {furtherEngagements.items.map((item) => (
              <article key={item.title} className="framework-tile">
                <p className="project-engagement-domain">{item.domain}</p>
                <h3 className="framework-tile-title">{item.title}</h3>
                <p className="framework-tile-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ManagedItServicesSection variant="surface" showCta={false} />

      <PageCta
        eyebrow="Discuss a platform"
        title="See how these systems fit your plant."
        lead="Tell us about your order book, shop floor, or approval process and we’ll map the right starting point."
        primaryLabel="Discuss this solution"
        secondaryHref="/services"
        secondaryLabel="Back to solutions"
        imageSrc="/digital-solution.webp"
      />
    </>
  );
}

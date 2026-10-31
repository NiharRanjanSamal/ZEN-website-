"use client";

import Link from "next/link";
import { useContent } from "@/components/LocaleProvider";

type ManagedItServicesSectionProps = {
  variant?: "light" | "surface";
  showCta?: boolean;
};

export function ManagedItServicesSection({
  variant = "light",
  showCta = true,
}: ManagedItServicesSectionProps) {
  const { managedItServiceAreas, managedItServicesIntro, pages } = useContent();
  const bandClass =
    variant === "surface"
      ? "service-band service-band-alt"
      : "border-y border-[var(--line)] bg-mist/90";

  return (
    <section
      id="managed-it"
      className={`scroll-mt-36 py-16 md:py-24 ${bandClass}`}
      aria-label="Managed IT and security services"
    >
      <div className="container-zen">
        <div className="max-w-2xl">
          <p className="eyebrow">{managedItServicesIntro.eyebrow}</p>
          <h2 className="section-title mt-3">{managedItServicesIntro.title}</h2>
          <p className="section-lead mt-4">{managedItServicesIntro.lead}</p>
        </div>

        <div className="managed-it-grid mt-10">
          {managedItServiceAreas.map((area) => (
            <article key={area.id} id={area.id} className="managed-it-area scroll-mt-36">
              <p className="managed-it-area-code" aria-hidden>
                {area.code}
              </p>
              <h3 className="managed-it-area-title">{area.title}</h3>
              <ol className="managed-it-list">
                {area.items.map((item, index) => (
                  <li key={item}>
                    <span className="managed-it-list-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        {showCta ? (
          <Link href="/contact" className="btn btn-3d mt-10">
            {pages.managedIt.cta}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

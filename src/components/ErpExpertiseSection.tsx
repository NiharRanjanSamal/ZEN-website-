"use client";

import { useContent } from "@/components/LocaleProvider";

export function ErpExpertiseSection() {
  const { erpExpertise, pages } = useContent();
  const erp = pages.erpSection;
  return (
    <section
      id="erp"
      className="scroll-mt-36 relative overflow-hidden border-t border-[var(--line)] bg-[linear-gradient(180deg,var(--color-beige-100)_0%,var(--color-beige-200)_100%)] py-16 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 88% 0%, rgba(63,111,143,0.1), transparent 58%)",
        }}
      />

      <div className="container-zen relative">
        <div className="max-w-2xl">
          <p className="eyebrow">{erp.eyebrow}</p>
          <h2 className="section-title mt-3">{erp.title}</h2>
          <p className="section-lead mt-5">{erpExpertise.intro}</p>
        </div>

        <div className="erp-expertise-layout mt-12">
          <div className="erp-expertise-block">
            <p className="erp-expertise-label">{erp.capabilitiesLabel}</p>
            <div className="erp-capabilities-grid">
              {erpExpertise.capabilities.map((item) => (
                <article key={item} className="erp-capability-card">
                  <span aria-hidden className="erp-capability-marker" />
                  <p className="erp-capability-text">{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="erp-expertise-block">
            <p className="erp-expertise-label">{erp.organizationsLabel}</p>
            <div className="erp-organizations-grid">
              {erpExpertise.organizations.map((org) => (
                <article key={org.group} className="erp-org-card">
                  <h3 className="erp-org-card-title">{org.group}</h3>
                  <ul className="erp-org-card-list">
                    {org.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

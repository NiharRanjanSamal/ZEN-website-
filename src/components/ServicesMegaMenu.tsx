"use client";

import Link from "next/link";
import { useContent, useLocale } from "@/components/LocaleProvider";

const projectLinks = [
  { label: "Plant-floor platforms", href: "/services/projects" },
  { label: "SIPOMS", href: "/services/projects#sipoms" },
  { label: "Smart Approval", href: "/services/projects#smart-approval" },
  { label: "Production Inventory", href: "/services/projects#production-inventory" },
];

const platformLinks = [
  { label: "SaaS Offerings", href: "/services#saas" },
  { label: "Product Genuinity", href: "/services#saas" },
  { label: "Project Management", href: "/services#saas" },
  { label: "Asset Management", href: "/services#saas" },
  { label: "Hospital Management", href: "/services#saas" },
];

const enterpriseLinks = [
  { label: "Managed IT services", href: "/services#managed-it" },
  { label: "ERP Expertise", href: "/services#erp" },
  { label: "Digital Transformation Framework", href: "/services#framework" },
  { label: "Industry 4.0 Template", href: "/services#framework" },
];

type MegaMenuLinkProps = {
  href: string;
  label: string;
};

function MegaMenuLink({ href, label }: MegaMenuLinkProps) {
  return (
    <Link href={href} className="services-mega-menu-link">
      <span className="services-mega-menu-link-label">{label}</span>
      <span className="services-mega-menu-link-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}

type ServicesMegaMenuProps = {
  open: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function ServicesMegaMenu({ open, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) {
  const { services, featuredHighlights, focusAreas, ui } = useContent();
  const { t } = useLocale();
  const m = ui.megaMenu;
  const industryLinks = (focusAreas[0]?.items ?? ["Metals", "Mining", "Power"]).map(
    (label) => ({ label, href: "/about" as const }),
  );

  return (
    <div
      className={`services-mega-menu font-sans${open ? " is-open" : ""}`}
      aria-hidden={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="services-mega-menu-grid">
        <div className="services-mega-menu-col services-mega-menu-col-primary">
          <p className="services-mega-menu-label">{t.nav.solutions}</p>
          <ul className="services-mega-menu-links">
            {services.map((service) => (
              <li key={service.id}>
                <MegaMenuLink href={`/services#${service.id}`} label={service.label} />
              </li>
            ))}
          </ul>
          <Link href="/services" className="services-mega-menu-view-all">
            <span>{m.viewAll}</span>
            <span className="services-mega-menu-link-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <div className="services-mega-menu-col">
          <p className="services-mega-menu-label">{m.projects}</p>
          <ul className="services-mega-menu-links">
            {projectLinks.map((item) => (
              <li key={item.label}>
                <MegaMenuLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          <div className="services-mega-menu-subsection">
            <p className="services-mega-menu-label">{m.platforms}</p>
            <ul className="services-mega-menu-links">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <MegaMenuLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="services-mega-menu-col">
          <p className="services-mega-menu-label">{m.enterprise}</p>
          <ul className="services-mega-menu-links">
            {enterpriseLinks.map((item) => (
              <li key={item.label}>
                <MegaMenuLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          <div className="services-mega-menu-subsection">
            <p className="services-mega-menu-label">{m.industries}</p>
            <ul className="services-mega-menu-links">
              {industryLinks.map((item) => (
                <li key={item.label}>
                  <MegaMenuLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="services-mega-menu-col services-mega-menu-col-featured">
          {featuredHighlights.map((card) => (
            <div key={card.title} className="services-mega-menu-card-group">
              <p className="services-mega-menu-label">{card.group}</p>
              <Link href={card.href} className="services-mega-menu-card">
                <span className="services-mega-menu-card-title">{card.title}</span>
                <span className="services-mega-menu-card-body">{card.body}</span>
                <span className="services-mega-menu-link-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

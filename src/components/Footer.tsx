"use client";

import Link from "next/link";
import { useContent, useLocale } from "@/components/LocaleProvider";
import { navItems } from "@/lib/i18n/messages";

export function Footer() {
  const { t } = useLocale();
  const { contactPeople, focusAreas, services, site } = useContent();
  const footerIndustries = focusAreas[0]?.items ?? ["Metals", "Mining", "Power"];

  return (
    <footer className="footer mt-16 text-[0.8125rem] leading-relaxed md:mt-24">
      <div className="container-wide grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-[1.35fr_0.9fr_1fr_1.05fr] md:gap-10 md:py-12">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-display text-2xl tracking-[-0.02em] text-[#f5f8fa] md:text-[1.65rem]">
            {site.name}
          </p>
          <p className="mt-3 max-w-sm text-[0.8125rem] leading-relaxed text-steel-300">
            {site.tagline}
          </p>
          <p className="mt-3 max-w-sm text-[0.75rem] leading-relaxed text-steel-400">
            Strategy, enterprise platforms, ERP, analytics, and managed IT for
            organizations operating at scale across India.
          </p>
          <p className="footer-label mt-5">{t.footer.industries}</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.75rem] text-steel-400">
            {footerIndustries.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
          <p className="mt-4 text-[0.6875rem] leading-relaxed text-steel-500">
            {site.dpiit}
          </p>
          <p className="mt-1 text-[0.6875rem] leading-relaxed text-steel-500">
            {site.dpiitFull}
          </p>
        </div>

        <div>
          <p className="footer-label">{t.footer.company}</p>
          <ul className="footer-link-list mt-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t.nav[item.labelKey]}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-label">{t.footer.services}</p>
          <ul className="footer-link-list mt-3">
            <li>
              <Link href="/services/projects">{t.nav.projects}</Link>
            </li>
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services#${service.id}`}>{service.label}</Link>
              </li>
            ))}
          </ul>
          <p className="footer-label mt-6">{t.footer.capabilities}</p>
          <ul className="footer-link-list mt-3">
            <li>Digital transformation advisory</li>
            <li>ERP and cloud programs</li>
            <li>Industry 4.0 and analytics</li>
            <li>Infrastructure and security</li>
          </ul>
        </div>

        <div>
          <p className="footer-label">{t.footer.contact}</p>
          <ul className="footer-link-list mt-3">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {contactPeople.map((person) => (
              <li key={person.email}>
                <a href={`mailto:${person.email}`} className="footer-contact-link">
                  <span className="text-steel-200">{person.name}</span>
                  <span className="footer-contact-meta">{person.email}</span>
                  <span className="footer-contact-meta">{person.phone}</span>
                </a>
              </li>
            ))}
            <li className="pt-1 text-[0.75rem] text-steel-400">{site.location}</li>
          </ul>
          <p className="mt-5 text-[0.75rem] text-steel-400">
            <Link href="/contact" className="text-steel-300 underline-offset-2 hover:underline">
              {t.footer.startConversation}
            </Link>
            {" · "}
            {t.footer.engagements}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-2 py-4 text-[0.6875rem] text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legal}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">{t.footer.privacy}</Link>
            <Link href="/terms">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

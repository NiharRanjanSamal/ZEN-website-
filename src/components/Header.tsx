"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { HeaderUtilities } from "@/components/HeaderUtilities";
import { useLocale } from "@/components/LocaleProvider";
import { ServicesMegaMenu } from "@/components/ServicesMegaMenu";
import { navItems } from "@/lib/i18n/messages";
import { site } from "@/lib/content";
import { getLocomotiveScroll } from "@/lib/locomotiveScroll";

const primaryNav = navItems.filter((item) => item.href !== "/contact");

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const heroOverlayHeader = isHome || isAbout;
  const [atHeroTop, setAtHeroTop] = useState(heroOverlayHeader);

  useEffect(() => {
    if (!heroOverlayHeader) {
      setAtHeroTop(false);
      return;
    }
    const onScroll = () => setAtHeroTop(window.scrollY < 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroOverlayHeader, pathname]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    };
  }, []);

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header ${heroOverlayHeader && atHeroTop ? "is-top" : "is-scrolled"}${isHome ? " is-home" : ""}${isAbout ? " is-about" : ""}`}
    >
      <div className="header-inner">
        <Link href="/" className="brand-mark" aria-label={`${site.name} home`}>
          <Image
            src="/zenuino-logo.webp"
            alt=""
            width={44}
            height={44}
            className="brand-mark-logo"
            priority
          />
          <span className="brand-mark-text">{site.name}</span>
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          {primaryNav.map((item) => {
            const label = t.nav[item.labelKey];
            const active =
              item.href === "/services"
                ? servicesActive
                : pathname === item.href;

            if (item.href === "/services") {
              return (
                <div
                  key={item.href}
                  className="nav-item-dropdown"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={closeServicesMenu}
                  onFocus={openServicesMenu}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      closeServicesMenu();
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={`nav-link${active || servicesOpen ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                  >
                    {label}
                  </Link>
                  <ServicesMegaMenu
                    open={servicesOpen}
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={closeServicesMenu}
                  />
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <HeaderUtilities />
          <Link href="/contact" className="btn header-cta">
            {t.talkToUs}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className={`menu-toggle-bars${open ? " is-open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="mobile-nav-panel" aria-label="Mobile">
          {navItems.map((item) => {
            const label = t.nav[item.labelKey];
            const active =
              item.href === "/services" ? pathname === "/services" : pathname === item.href;
            const projectsActive = pathname.startsWith("/services/projects");
            return (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  className={`mobile-nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{label}</span>
                  <span aria-hidden>→</span>
                </Link>
                {item.href === "/services" ? (
                  <Link
                    href="/services/projects"
                    className={`mobile-nav-link mobile-nav-sublink${projectsActive ? " is-active" : ""}`}
                    aria-current={projectsActive ? "page" : undefined}
                  >
                    <span>{t.nav.projects}</span>
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </Fragment>
            );
          })}
          <Link href="/contact" className="btn btn-primary mobile-nav-cta">
            {t.talkToUs}
          </Link>
        </nav>
      </div>
    </header>
  );
}

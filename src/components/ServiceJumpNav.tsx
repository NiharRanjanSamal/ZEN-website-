"use client";

import { useEffect, useRef, useState } from "react";

export type ServiceJumpLink = {
  id: string;
  label: string;
  href?: string;
};

const defaultLinks: ServiceJumpLink[] = [
  { id: "strategy", label: "01 Strategy" },
  { id: "deployment", label: "02 Solutions" },
  { id: "analytics", label: "03 Analytics" },
  { id: "infrastructure", label: "04 Infrastructure" },
  { id: "projects", label: "Projects", href: "/services/projects" },
  { id: "managed-it", label: "Managed IT" },
  { id: "framework", label: "Framework" },
  { id: "saas", label: "SaaS" },
  { id: "erp", label: "ERP" },
];

type ServiceJumpNavProps = {
  links?: ServiceJumpLink[];
  label?: string;
};

export function ServiceJumpNav({
  links = defaultLinks,
  label = "Service sections",
}: ServiceJumpNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const update = () => {
      const stickyTop = window.matchMedia("(min-width: 768px)").matches
        ? 4.25 * 16
        : 3.85 * 16;
      setStuck(nav.getBoundingClientRect().top <= stickyTop + 1);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className={`service-jump-nav${stuck ? " is-stuck" : ""}`}
    >
      <div className="container-wide service-jump-nav-inner">
        {links.map((item) => (
          <a key={item.id} href={item.href ?? `#${item.id}`} className="service-jump-link">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

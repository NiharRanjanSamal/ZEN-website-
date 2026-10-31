"use client";

import Link from "next/link";
import { useContent } from "@/components/LocaleProvider";

type FeaturedHighlightCardsProps = {
  className?: string;
};

export function FeaturedHighlightCards({ className }: FeaturedHighlightCardsProps) {
  const { featuredHighlights } = useContent();
  return (
    <div className={className}>
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
  );
}

"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 py-3 text-left md:gap-5 md:py-3.5"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="text-base font-medium tracking-[-0.015em] text-steel-950 md:text-[1.05rem]">
                {item.q}
              </span>
              <span
                aria-hidden
                className="mt-1 text-xl leading-none text-accent"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="pb-3 pr-2 text-sm leading-snug text-steel-600 md:pr-8 md:pb-3.5 md:text-[0.9375rem]">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

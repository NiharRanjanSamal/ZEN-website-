"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { locales } from "@/lib/i18n/types";

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden
      className={`header-lang-chevron${open ? " is-open" : ""}`}
    >
      <path d="M2.5 7.5 6 4l3.5 3.5H2.5Z" />
    </svg>
  );
}

export function HeaderUtilities() {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useLocale();
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!langOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [langOpen]);

  return (
    <div className="header-utilities" ref={rootRef}>
      <div className="header-lang">
        <button
          type="button"
          className={`header-lang-toggle${langOpen ? " is-open" : ""}`}
          aria-expanded={langOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-label={`Language: ${locale === "en" ? t.languageEn : t.languageHi}`}
          onClick={() => setLangOpen((open) => !open)}
        >
          <GlobeIcon />
          <ChevronIcon open={langOpen} />
        </button>
        <ul
          id={listboxId}
          className={`header-lang-menu${langOpen ? " is-open" : ""}`}
          role="listbox"
          aria-label="Language"
          hidden={!langOpen}
        >
          {locales.map((language) => {
            const selected = locale === language.id;
            const label = t[language.labelKey];
            return (
              <li key={language.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`header-lang-option${selected ? " is-selected" : ""}`}
                  onClick={() => {
                    setLocale(language.id);
                    setLangOpen(false);
                  }}
                >
                  <span className="header-lang-option-icon">
                    {language.id === "en" ? (
                      <GlobeIcon />
                    ) : (
                      <span className="header-lang-hi-mark" aria-hidden>
                        हि
                      </span>
                    )}
                  </span>
                  <span className="header-lang-option-label">{label}</span>
                  {selected ? (
                    <span className="header-lang-option-check">
                      <CheckIcon />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

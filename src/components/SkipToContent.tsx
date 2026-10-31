"use client";

import { useLocale } from "@/components/LocaleProvider";

export function SkipToContent() {
  const { t } = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-steel-950 focus:px-4 focus:py-2 focus:text-steel-50"
    >
      {t.skipToContent}
    </a>
  );
}

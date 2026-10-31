import type { Locale } from "@/lib/i18n/types";
import * as en from "./en";
import * as hiRaw from "./hi";
import { applyHiOverrides } from "./hi-overrides";
import { sanitizeLocaleContent } from "./sanitize";

export type SiteContent = typeof en;

const hi = applyHiOverrides(sanitizeLocaleContent(en, hiRaw)) as SiteContent;

export const contentByLocale: Record<Locale, SiteContent> = {
  en,
  hi,
};

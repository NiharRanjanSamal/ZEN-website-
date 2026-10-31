export type Locale = "en" | "hi";

export const LOCALE_STORAGE_KEY = "zenuino-locale";

export const locales: { id: Locale; labelKey: "languageEn" | "languageHi" }[] = [
  { id: "en", labelKey: "languageEn" },
  { id: "hi", labelKey: "languageHi" },
];

export type Messages = {
  languageEn: string;
  languageHi: string;
  skipToContent: string;
  talkToUs: string;
  nav: {
    about: string;
    solutions: string;
    whyUs: string;
    certification: string;
    ecosystem: string;
    contact: string;
    projects: string;
  };
  footer: {
    company: string;
    services: string;
    capabilities: string;
    contact: string;
    industries: string;
    startConversation: string;
    engagements: string;
    privacy: string;
    terms: string;
  };
};

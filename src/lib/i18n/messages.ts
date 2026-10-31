import type { Locale, Messages } from "@/lib/i18n/types";

export const messages: Record<Locale, Messages> = {
  en: {
    languageEn: "English (Global)",
    languageHi: "Hindi (India)",
    skipToContent: "Skip to main content",
    talkToUs: "Talk to us",
    nav: {
      about: "About",
      solutions: "Solutions",
      whyUs: "Why Us",
      certification: "Certification",
      ecosystem: "Ecosystem",
      contact: "Contact",
      projects: "Projects",
    },
    footer: {
      company: "Company",
      services: "Services",
      capabilities: "Capabilities",
      contact: "Contact",
      industries: "Industries",
      startConversation: "Start a conversation",
      engagements: "Enterprise and MSME engagements",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  hi: {
    languageEn: "अंग्रेज़ी (वैश्विक)",
    languageHi: "हिंदी (भारत)",
    skipToContent: "मुख्य सामग्री पर जाएं",
    talkToUs: "हमसे बात करें",
    nav: {
      about: "हमारे बारे में",
      solutions: "समाधान",
      whyUs: "हमें क्यों चुनें",
      certification: "प्रमाणन",
      ecosystem: "इकोसिस्टम",
      contact: "संपर्क",
      projects: "परियोजनाएं",
    },
    footer: {
      company: "कंपनी",
      services: "सेवाएं",
      capabilities: "क्षमताएं",
      contact: "संपर्क",
      industries: "उद्योग",
      startConversation: "बातचीत शुरू करें",
      engagements: "एंटरप्राइज और MSME सहयोग",
      privacy: "गोपनीयता",
      terms: "नियम",
    },
  },
};

export const navItems = [
  { href: "/about", labelKey: "about" as const },
  { href: "/services", labelKey: "solutions" as const },
  { href: "/why-us", labelKey: "whyUs" as const },
  { href: "/certification", labelKey: "certification" as const },
  { href: "/ecosystem", labelKey: "ecosystem" as const },
  { href: "/contact", labelKey: "contact" as const },
];

import type { Metadata } from "next";
import { ContactPageContent } from "@/app/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Zenuino leadership for digital strategy, deployment, AI analytics, and infrastructure engagements.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}

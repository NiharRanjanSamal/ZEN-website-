import type { Metadata } from "next";
import { AboutPageContent } from "@/app/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zenuino is a Jamshedpur-based, DPIIT-recognised IT consulting firm founded by manufacturing and enterprise technology leaders.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}

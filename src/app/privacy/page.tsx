import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${site.legal} handles information shared through this website.`}
        imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80"
        imageAlt="Document review representing privacy policy"
      />
      <section className="page-split py-16 md:py-20">
        <div className="container-zen max-w-3xl">
          <div className="legal-shell space-y-5 text-steel-700">
            <p>
              We collect only the information you voluntarily provide through contact
              forms or direct email — typically name, company, email address, and
              project details.
            </p>
            <p>
              That information is used solely to respond to inquiries and discuss
              potential engagements. We do not sell personal data.
            </p>
            <p>
              For privacy questions, contact{" "}
              <a className="text-accent-deep" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
          <Link href="/contact" className="btn btn-ghost mt-8">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}

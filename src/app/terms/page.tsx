import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lead="Guidelines for using the Zenuino website and its published materials."
        imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80"
        imageAlt="Legal documents and business terms context"
      />
      <section className="page-split py-16 md:py-20">
        <div className="container-zen max-w-3xl">
          <div className="legal-shell space-y-5 text-steel-700">
            <p>
              Content on this website is provided for general information about{" "}
              {site.legal} and its services. It does not constitute a binding offer
              unless confirmed in a signed agreement.
            </p>
            <p>
              While we aim for accuracy, materials may change without notice.
              Engagements are governed by separate commercial terms.
            </p>
            <p>
              Questions:{" "}
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

import Image from "next/image";
import Link from "next/link";

type PageCtaProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc?: string;
};

export function PageCta({
  eyebrow = "Next step",
  title,
  lead,
  primaryHref = "/contact",
  primaryLabel = "Talk to us",
  secondaryHref = "/services",
  secondaryLabel = "View solutions",
  imageSrc = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80",
}: PageCtaProps) {
  return (
    <section className="page-cta-section pt-4 pb-12 md:pt-6 md:pb-16" aria-label="Call to action">
      <div className="container-wide">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[var(--line)] bg-steel-950 text-steel-50">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/88 to-steel-950/50" />
          <div className="page-cta-inner relative flex min-h-[260px] items-center px-5 py-10 md:min-h-[320px] md:px-14 md:py-14">
            <div className="max-w-2xl">
              <p className="eyebrow !text-accent-soft">{eyebrow}</p>
              <h2 className="section-title mt-3 !text-steel-50">{title}</h2>
              {lead ? <p className="mt-4 text-steel-300">{lead}</p> : null}
              <div className="cta-actions mt-8 flex flex-wrap gap-3">
                <Link
                  href={primaryHref}
                  className="btn btn-primary !border-steel-50 !bg-steel-50 !text-steel-950"
                >
                  {primaryLabel}
                </Link>
                <Link href={secondaryHref} className="btn btn-secondary">
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

type PageHeroProps = {
  title: string;
  lead?: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  tall?: boolean;
  details?: string[];
};

export function PageHero({
  title,
  lead,
  eyebrow,
  imageSrc,
  imageAlt = "",
  tall = false,
  details,
}: PageHeroProps) {
  return (
    <section
      className={`page-hero relative overflow-hidden bg-steel-950 pt-28 pb-12 text-steel-50 md:pt-32 md:pb-16${tall ? " page-hero-tall" : ""}`}
    >
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/86 to-steel-950/42" />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(63,111,143,0.35), transparent 55%), linear-gradient(135deg, #0a0f14 0%, #1c2834 55%, #2a516b 140%)",
          }}
        />
      )}
      <div className="container-zen relative">
        {eyebrow ? <p className="eyebrow !text-accent-soft">{eyebrow}</p> : null}
        <h1 className="section-title mt-3 max-w-4xl !text-steel-50">{title}</h1>
        {lead ? <p className="section-lead mt-5 max-w-2xl !text-steel-300">{lead}</p> : null}
        {details?.length ? (
          <ul className="page-hero-meta">
            {details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

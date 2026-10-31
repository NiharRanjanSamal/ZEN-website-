import Image from "next/image";

type ImageBandProps = {
  src: string;
  alt: string;
  caption?: string;
  support?: string;
};

export function ImageBand({ src, alt, caption, support }: ImageBandProps) {
  return (
    <section
      className="image-band-section py-12 md:py-16"
      aria-label={caption || "Visual"}
    >
      <div className="container-wide">
        <div className="relative aspect-[16/9] min-h-[200px] w-full overflow-hidden bg-steel-900 md:aspect-[21/9] md:min-h-[240px]">
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950/85 via-steel-950/45 to-steel-950/15" />
          {(caption || support) && (
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-2xl p-5 md:p-10">
                {caption ? (
                  <p className="font-display text-2xl text-steel-50 md:text-4xl">
                    {caption}
                  </p>
                ) : null}
                {support ? (
                  <p className="mt-3 max-w-lg text-steel-200">{support}</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

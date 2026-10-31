import { memo } from "react";

const SUN_IMAGE = "/planets/sun.jpg";
const SUN_RENDER_PX = 880;

/** Sun disc shared between What we offer (peek) and How we work (base). */
export const ProcessSun = memo(function ProcessSun({ className }: { className?: string }) {
  return (
    <div className={className ?? "home-process-sun"} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SUN_IMAGE}
        alt=""
        width={SUN_RENDER_PX}
        height={SUN_RENDER_PX}
        className="home-process-sun-img"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});

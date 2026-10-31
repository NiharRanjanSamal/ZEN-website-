"use client";

import {
  MAGNIFIER_GLASS,
  MAGNIFIER_RING,
  OUTCOMES_ART_SCALE,
  OUTCOMES_ICON_GLYPH_SCALE,
  OUTCOMES_LENS_SOURCE,
  OUTCOMES_MAGNIFIER_FLIP_CENTER_X,
  OUTCOMES_MAGNIFIER_VIEWBOX,
  getArcSegments,
  magnifierHandleEnds,
  magnifierRingPath,
  wedgePath,
} from "@/components/outcomesVisualMetrics";
import { OutcomeIconGlyph } from "@/components/outcomeIconGlyphs";

const BLOB_PATH =
  "M16,27.473958768778378C17.814294169041446,27.63089015769106,19.69157945902606,27.850909997675732,21.387044725382044,27.186313636547958C23.118368371409172,26.50766134097064,24.55472585663662,25.198168406319326,25.646375392582364,23.692727674754487C26.717943779925516,22.21497987764114,26.734048110643762,20.260052825417933,27.581773830209055,18.64346429860783C28.733706108488285,16.446762627596428,32.2565252742067,14.827791035440491,31.54039251025233,12.453006820073345C30.79598128109112,9.984447740339986,26.36565914059667,11.029790211036294,24.693882053313047,9.066860416400534C23.103471673083305,7.1994679603144816,24.53976796350645,3.7054295313826175,22.704403385442852,2.078162918875911C21.001256399511966,0.5681227559994932,18.260599407921227,1.0929645994019364,16.000000000000004,1.3587112194961968C13.860609670385148,1.6102090068376098,12.011411030937802,2.7633412706869853,10.01402314947298,3.5699909904939524C7.895558079513981,4.425538013163405,4.394316780038399,4.071358063827901,3.812390317090907,6.28070560379448C3.0848217194053515,9.042999456718224,6.467464486707735,11.263468075051001,7.265165262141267,14.006330971207346C7.641998871632558,15.302058589043234,7.1590621975032445,16.655626663586197,7.221728956600769,18.003583082083885C7.294831908331182,19.576021076568118,7.007600962953279,21.216042431489132,7.666802096083423,22.645503572664097C8.369338099381974,24.168935294061612,9.592247326370687,25.450586472518538,11.043801641094628,26.2916519379237C12.532013591686903,27.153957718802772,14.286414058096577,27.325738360824232,16,27.473958768778378";

type OutcomesMagnifierVisualProps = {
  className?: string;
  segmentCount: number;
};

/** Geometric magnifier + arc share MAGNIFIER_RING (exact flush alignment). */
export function OutcomesMagnifierVisual({
  className,
  segmentCount,
}: OutcomesMagnifierVisualProps) {
  const {
    cx,
    cy,
    rHole,
    outerR,
    handleAngleDeg,
    handleLength,
    handleWidth,
  } = MAGNIFIER_RING;
  const { rInner: arcRi, rOuter: arcRo, cx: arcCx, cy: arcCy } = OUTCOMES_LENS_SOURCE;
  const glyphScale = OUTCOMES_ICON_GLYPH_SCALE;

  const flipTransform = `translate(${OUTCOMES_MAGNIFIER_FLIP_CENTER_X} 0) scale(-1 1) translate(${-OUTCOMES_MAGNIFIER_FLIP_CENTER_X} 0)`;
  const artScaleTransform = `translate(${cx} ${cy}) scale(${OUTCOMES_ART_SCALE}) translate(${-cx} ${-cy})`;
  const glassTransform = `translate(${cx} ${cy + MAGNIFIER_GLASS.offsetY}) scale(${MAGNIFIER_GLASS.scale}) translate(${-cx} ${-cy})`;

  const ringPath = magnifierRingPath(cx, cy, outerR, rHole);
  const { root: handleRoot, tip: handleTip } = magnifierHandleEnds(
    cx,
    cy,
    outerR,
    handleAngleDeg,
    handleLength,
    handleWidth,
  );
  const segments = getArcSegments(segmentCount);

  return (
    <svg
      className={className}
      viewBox={OUTCOMES_MAGNIFIER_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      overflow="visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={artScaleTransform}>
        <g transform={flipTransform}>
          <g transform={glassTransform}>
            <g transform={`translate(${cx} ${cy}) scale(1.22) translate(-16 -16)`}>
              <path d={BLOB_PATH} fill="#7ed0ec" stroke="none" opacity={0.96} />
            </g>
            <line
              x1={handleRoot.x}
              y1={handleRoot.y}
              x2={handleTip.x}
              y2={handleTip.y}
              stroke="#6b7280"
              strokeWidth={handleWidth}
              strokeLinecap="round"
            />
            <path
              d={ringPath}
              fill="#6b7280"
              fillRule="evenodd"
              stroke="none"
            />
          </g>

          <g className="home-outcomes-benefit-arc">
            {segments.map(({ index, a0, a1, iconX, iconY }) => (
              <g key={index}>
                <path
                  className="home-outcomes-radial-wedge"
                  d={wedgePath(arcCx, arcCy, arcRi, arcRo, a0, a1)}
                  fill="var(--color-accent-deep, #1a3a52)"
                  stroke="#7ed0ec"
                  strokeWidth={0.06}
                  strokeLinejoin="round"
                />
                <g
                  className="home-outcomes-radial-arc-icon"
                  transform={`translate(${iconX} ${iconY}) scale(-1 1) scale(${glyphScale}) translate(-12 -12)`}
                >
                  <OutcomeIconGlyph index={index} />
                </g>
              </g>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

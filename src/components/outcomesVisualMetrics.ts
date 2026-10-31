/** Shared geometry: geometric magnifier ring + benefit arc (same hub). */
export const OUTCOMES_ART_SCALE = 1.5;

/**
 * Wide enough for 2× glass + arc + curved labels to the right of the wedges.
 * Aspect must match the visual-stage so label % anchors map 1:1.
 */
export const OUTCOMES_MAGNIFIER_VIEWBOX = "-28 -14 118 90";

/** viewBox width / height — keep CSS aspect-ratio in sync. */
export const OUTCOMES_MAGNIFIER_ASPECT =
  Number(OUTCOMES_MAGNIFIER_VIEWBOX.split(/\s+/)[2]) /
  Number(OUTCOMES_MAGNIFIER_VIEWBOX.split(/\s+/)[3]);

/**
 * Single hub for ring + arc.
 * Rim outer edge = outerR (arc flushes here after glass scale).
 * Classic search-icon proportions: thick band + short rounded handle.
 */
export const MAGNIFIER_RING = {
  cx: 14,
  cy: 15,
  /** Larger hole → thinner rim (less bold). Outer edge unchanged for arc flush. */
  rHole: 7.2,
  /** Outer edge of black rim (= arc inner edge before glass scale). */
  outerR: 8.55,
  /** Classic magnifier handle (SE before flip → SW after). */
  handleAngleDeg: 45,
  /** Stick-out past rim; ~0.9× diameter so it reads as a glass, not a “Q”. */
  handleLength: 15.2,
  /** Match the lighter rim weight. */
  handleWidth: 1.2,
} as const;

export const OUTCOMES_MAGNIFIER_FLIP_CENTER_X = MAGNIFIER_RING.cx;

/** Glass-only transform (blob + ring + handle). Arc uses matching hub/radii. */
export const MAGNIFIER_GLASS = {
  /** 2× prior 1.28 so the lens circle reads much larger. */
  scale: 2.56,
  /** Positive = downward in SVG coords. */
  offsetY: 6.8,
} as const;

/** Wider dark-blue wedges (deeper arc band). */
const GLASS_BAND = 5.4 * (MAGNIFIER_GLASS.scale / 1.28);

/**
 * Arc matches glass AFTER scale + offsetY.
 * rInner === outerR * scale → flush on black rim (reference alignment).
 */
export const OUTCOMES_LENS_SOURCE = {
  cx: MAGNIFIER_RING.cx,
  cy: MAGNIFIER_RING.cy + MAGNIFIER_GLASS.offsetY,
  rInner: MAGNIFIER_RING.outerR * MAGNIFIER_GLASS.scale,
  rOuter: MAGNIFIER_RING.outerR * MAGNIFIER_GLASS.scale + GLASS_BAND,
} as const;

/**
 * West-side arc → east after flip. Mid 180° = vertical center on right.
 */
export const OUTCOMES_ARC_SOURCE = {
  /**
   * Span tuned so 6 equal grid rows line up with icon midpoints
   * (after flip) while keeping wedges long enough.
   */
  start: 125,
  end: 235,
  /** Degrees of clear space between wedges. */
  segmentGap: 2.8,
} as const;

/** Smaller glyphs so they sit with padding inside the wider wedges. */
export const OUTCOMES_ICON_GLYPH_SCALE = 0.095 * (MAGNIFIER_GLASS.scale / 1.28);

export function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/**
 * Annular-sector wedge with rounded corners (SVG paths can't use CSS radius).
 */
export function wedgePath(
  cx: number,
  cy: number,
  ri: number,
  ro: number,
  a0: number,
  a1: number,
  cornerR = 0.75,
) {
  const span = a1 - a0;
  const cr = Math.min(
    cornerR,
    (ro - ri) * 0.32,
    ((span * Math.PI) / 180) * ri * 0.28,
  );

  if (cr < 0.08) {
    const p0 = polar(cx, cy, ro, a0);
    const p1 = polar(cx, cy, ro, a1);
    const p2 = polar(cx, cy, ri, a1);
    const p3 = polar(cx, cy, ri, a0);
    const large = span > 180 ? 1 : 0;
    return [
      `M ${p0.x} ${p0.y}`,
      `A ${ro} ${ro} 0 ${large} 1 ${p1.x} ${p1.y}`,
      `L ${p2.x} ${p2.y}`,
      `A ${ri} ${ri} 0 ${large} 0 ${p3.x} ${p3.y}`,
      "Z",
    ].join(" ");
  }

  const toDeg = (r: number) => (cr / r) * (180 / Math.PI);
  const dao = toDeg(ro);
  const dai = toDeg(ri);
  const large = span > 180 ? 1 : 0;

  const o0 = polar(cx, cy, ro, a0 + dao);
  const o1 = polar(cx, cy, ro, a1 - dao);
  const o1in = polar(cx, cy, ro - cr, a1);
  const i1in = polar(cx, cy, ri + cr, a1);
  const i1 = polar(cx, cy, ri, a1 - dai);
  const i0 = polar(cx, cy, ri, a0 + dai);
  const i0in = polar(cx, cy, ri + cr, a0);
  const o0in = polar(cx, cy, ro - cr, a0);

  return [
    `M ${o0.x} ${o0.y}`,
    `A ${ro} ${ro} 0 ${large} 1 ${o1.x} ${o1.y}`,
    `A ${cr} ${cr} 0 0 1 ${o1in.x} ${o1in.y}`,
    `L ${i1in.x} ${i1in.y}`,
    `A ${cr} ${cr} 0 0 1 ${i1.x} ${i1.y}`,
    `A ${ri} ${ri} 0 ${large} 0 ${i0.x} ${i0.y}`,
    `A ${cr} ${cr} 0 0 1 ${i0in.x} ${i0in.y}`,
    `L ${o0in.x} ${o0in.y}`,
    `A ${cr} ${cr} 0 0 1 ${o0.x} ${o0.y}`,
    "Z",
  ].join(" ");
}

/** Evenodd donut for the black magnifier rim. */
export function magnifierRingPath(
  cx: number,
  cy: number,
  rOuter: number,
  rHole: number,
) {
  return [
    `M ${cx + rOuter} ${cy}`,
    `A ${rOuter} ${rOuter} 0 1 1 ${cx - rOuter} ${cy}`,
    `A ${rOuter} ${rOuter} 0 1 1 ${cx + rOuter} ${cy}`,
    "Z",
    `M ${cx + rHole} ${cy}`,
    `A ${rHole} ${rHole} 0 1 0 ${cx - rHole} ${cy}`,
    `A ${rHole} ${rHole} 0 1 0 ${cx + rHole} ${cy}`,
    "Z",
  ].join(" ");
}

/** Handle stroke endpoints: root tucked under rim, tip past outer edge. */
export function magnifierHandleEnds(
  cx: number,
  cy: number,
  outerR: number,
  angleDeg: number,
  length: number,
  width: number,
) {
  const root = polar(cx, cy, outerR - width * 0.45, angleDeg);
  const tip = polar(cx, cy, outerR + length, angleDeg);
  return { root, tip };
}

export type OutcomesArcSegment = {
  index: number;
  a0: number;
  a1: number;
  mid: number;
  iconX: number;
  iconY: number;
};

/** Index 0 at top after horizontal flip. */
export function getArcSegments(count: number): OutcomesArcSegment[] {
  if (count <= 0) return [];

  const { cx, cy, rInner, rOuter } = OUTCOMES_LENS_SOURCE;
  const span = OUTCOMES_ARC_SOURCE.end - OUTCOMES_ARC_SOURCE.start;
  const step = span / count;
  const iconR = (rInner + rOuter) / 2;
  const gap = OUTCOMES_ARC_SOURCE.segmentGap;

  return Array.from({ length: count }, (_, index) => {
    const a0 = OUTCOMES_ARC_SOURCE.end - (index + 1) * step + gap / 2;
    const a1 = OUTCOMES_ARC_SOURCE.end - index * step - gap / 2;
    const mid = (a0 + a1) / 2;
    const icon = polar(cx, cy, iconR, mid);
    return {
      index,
      a0,
      a1,
      mid,
      iconX: icon.x,
      iconY: icon.y,
    };
  });
}

function parseViewBox(vb: string) {
  const [minX, minY, width, height] = vb.split(/\s+/).map(Number);
  return { minX, minY, width, height };
}

/** Map a point through the same flip + art-scale as the SVG tree. */
function toArtSpace(x: number, y: number) {
  const { cx, cy } = MAGNIFIER_RING;
  const flipCx = OUTCOMES_MAGNIFIER_FLIP_CENTER_X;
  const art = OUTCOMES_ART_SCALE;
  const fx = 2 * flipCx - x;
  const fy = y;
  return {
    x: cx + (fx - cx) * art,
    y: cy + (fy - cy) * art,
  };
}

export type ArcLabelAnchor = {
  /** % of stage width — left edge of copy, just past the wedge. */
  leftPct: number;
  /** % of stage height — vertically centered on the wedge. */
  topPct: number;
};

/**
 * Label anchors hug the outer arc edge (reference: curved text column).
 */
export function getArcLabelAnchors(count: number): ArcLabelAnchor[] {
  const segments = getArcSegments(count);
  if (segments.length === 0) return [];

  const vb = parseViewBox(OUTCOMES_MAGNIFIER_VIEWBOX);
  const { cx: hubX, cy: hubY, rOuter } = OUTCOMES_LENS_SOURCE;
  /** Small gap between wedge outer edge and copy. */
  const gutter = 1.35;

  return segments.map(({ mid }) => {
    const outer = polar(hubX, hubY, rOuter + gutter, mid);
    const art = toArtSpace(outer.x, outer.y);
    return {
      leftPct: ((art.x - vb.minX) / vb.width) * 100,
      topPct: ((art.y - vb.minY) / vb.height) * 100,
    };
  });
}

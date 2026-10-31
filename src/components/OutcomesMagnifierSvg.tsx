import { OutcomesMagnifierVisual } from "@/components/OutcomesMagnifierVisual";

type OutcomesMagnifierSvgProps = {
  className?: string;
};

/** Magnifier-only export (arc omitted). */
export function OutcomesMagnifierSvg({ className }: OutcomesMagnifierSvgProps) {
  return <OutcomesMagnifierVisual className={className} segmentCount={0} />;
}

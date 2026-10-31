/** Planet names and NASA mean diameters (km) for 2D size ratios in ProcessPlanetsStrip. */

export type SolarPlanetName =
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptun";

export const DIAMETER_KM: Record<SolarPlanetName | "Sun" | "Moon", number> = {
  Sun: 1_392_700,
  Mercury: 4879,
  Venus: 12_104,
  Earth: 12_756,
  Mars: 6792,
  Jupiter: 142_984,
  Saturn: 120_536,
  Uranus: 51_118,
  Neptun: 49_528,
  Moon: 3475,
};

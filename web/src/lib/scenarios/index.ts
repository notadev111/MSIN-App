import { kartikaSucesssion } from "./kartika-succession";
import { teamAuthority } from "./team-authority";
import { decliningProduct } from "./declining-product";
import type { ScenarioDefinition } from "@/lib/types";

export const scenarios: ScenarioDefinition[] = [
  kartikaSucesssion,
  teamAuthority,
  decliningProduct,
];

export function getScenario(id: string): ScenarioDefinition | undefined {
  return scenarios.find((s) => s.id === id);
}

export { kartikaSucesssion, teamAuthority, decliningProduct };

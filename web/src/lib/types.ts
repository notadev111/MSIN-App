// --- Leadership style output -------------------------------------------------
export type LeadershipStyleId =
  | "strategic_thinker"
  | "overconfident_executor"
  | "loyalty_driven"
  | "emotionally_reactive";

export interface LeadershipStyle {
  id: LeadershipStyleId;
  label: string;
  tagline: string;
  description: string;
  strengths: string[];
  watchOuts: string[];
}

// --- 5 core assessment dimensions (from academic frameworks) ----------------
export type DimensionId =
  | "strategicJudgment"    // Upper Echelons Theory
  | "ethicalReasoning"     // Rest's Four-Stage Model
  | "stakeholderManagement"// Vroom-Yetton
  | "decisiveness"         // Hersey-Blanchard
  | "adaptability";        // OODA Loop

// --- Vroom-Yetton decision styles --------------------------------------------
export type VroomStyle = "AI" | "AII" | "CI" | "CII" | "GII";

// --- Cognitive biases tracked across decisions -------------------------------
export type BiasType =
  | "loss_aversion"
  | "sunk_cost"
  | "overconfidence"
  | "authority_bias"
  | "moral_licensing"
  | "nepotism"
  | "status_quo"
  | "groupthink"
  | "ethnocentrism";

// --- Stakeholder document types (OODA: observe phase) ------------------------
export type StakeholderDocType = "financial" | "legal" | "employment" | "press";

// --- Scenario data types ------------------------------------------------------

export interface StakeholderDoc {
  id: string;
  type: StakeholderDocType;
  title: string;
  summary: string;           // shown in collapsed card
  content: string;           // revealed on expand
  relevanceScore: number;    // 0-100, shown as hint to player
}

export interface EthicalOption {
  id: string;
  text: string;
  score: number;             // 0-4 (hidden from player)
  bias?: BiasType;
}

export interface EthicalPrompt {
  id: string;
  question: string;
  context: string;
  options: EthicalOption[];
}

export interface MacroSignal {
  headline: string;
  detail: string;
  type: "risk" | "opportunity";
}

export interface RoundOption {
  id: string;
  title: string;
  description: string;
  vroomStyle: VroomStyle;    // decision style this choice represents
  scores: Record<DimensionId, number>; // 0-4 each (hidden)
  bias?: BiasType;           // bias this choice triggers (if any)
  consequence: string;       // brief outcome note (shown after confirming)
}

export interface SimulationRound {
  id: string;
  number: number;
  title: string;             // e.g. "Round 1 - The Announcement"
  situation: string;         // short scene-setter
  context: string;           // expanded background
  question: string;          // the actual decision prompt
  stakeholderDocs: StakeholderDoc[];
  macroSignal?: MacroSignal;
  options: RoundOption[];
  ethicalPrompt?: EthicalPrompt;
  twist?: string;            // revealed after decision (adaptability test)
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  company: string;
  companyContext: string;
  frameworks: string[];
  tags: DimensionId[];
  rounds: SimulationRound[];
}

// --- Run result types ---------------------------------------------------------

export interface BiasIncident {
  bias: BiasType;
  roundId: string;
  roundTitle: string;
  description: string;
}

export interface VroomProfile {
  dominant: VroomStyle;
  distribution: Record<VroomStyle, number>;
  label: string;
  description: string;
}

export interface SimulationResult {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  completedAt: string;
  totalScore: number;
  previousScore?: number;
  delta?: number;
  scores: Record<DimensionId, number>;
  biasProfile: BiasIncident[];
  vroomProfile: VroomProfile;
  leadershipStyle: LeadershipStyle;
  docsReadCount: number;
  totalDocs: number;
  summary: string;
  insight: string;
}

// --- User / App state ---------------------------------------------------------

export type RoleId = "founder" | "pm" | "consultant" | "finance" | "other";
export type SkillId = DimensionId | "negotiation" | "finance";

export interface UserProfile {
  name: string;
  university: string;
  role: RoleId;
  focusSkills: SkillId[];
}

export interface Peer {
  id: string;
  name: string;
  role: string;
  university: string;
  bio: string;
  skills: SkillId[];
  compatibility: number;
}

export interface AppState {
  hasOnboarded: boolean;
  user: UserProfile | null;
  results: SimulationResult[];
  connectedPeerIds: string[];
}

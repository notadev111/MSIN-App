import type {
  BiasIncident,
  BiasType,
  DimensionId,
  LeadershipStyle,
  LeadershipStyleId,
  ScenarioDefinition,
  SimulationResult,
  VroomProfile,
  VroomStyle,
} from "@/lib/types";

// --- Dimension metadata -------------------------------------------------------

export const dimensions: { id: DimensionId; label: string; shortLabel: string; framework: string }[] = [
  {
    id: "strategicJudgment",
    label: "Strategic Judgment",
    shortLabel: "Strategy",
    framework: "Upper Echelons Theory",
  },
  {
    id: "ethicalReasoning",
    label: "Ethical Reasoning",
    shortLabel: "Ethics",
    framework: "Rest's Four-Stage Model",
  },
  {
    id: "stakeholderManagement",
    label: "Stakeholder Management",
    shortLabel: "Stakeholders",
    framework: "Vroom-Yetton Model",
  },
  {
    id: "decisiveness",
    label: "Decisiveness",
    shortLabel: "Decision",
    framework: "Hersey-Blanchard",
  },
  {
    id: "adaptability",
    label: "Adaptability",
    shortLabel: "Adapt",
    framework: "OODA Loop",
  },
];

// --- Vroom-Yetton style metadata ----------------------------------------------

export const vroomStyles: Record<
  VroomStyle,
  { label: string; description: string; approach: string }
> = {
  AI: {
    label: "Autocratic I",
    description: "Decides alone using available information.",
    approach: "Independent",
  },
  AII: {
    label: "Autocratic II",
    description: "Gathers information from others, then decides alone.",
    approach: "Informed Independent",
  },
  CI: {
    label: "Consultative I",
    description: "Consults individuals separately, then decides.",
    approach: "Selective Consultation",
  },
  CII: {
    label: "Consultative II",
    description: "Consults the group together, then decides.",
    approach: "Collaborative",
  },
  GII: {
    label: "Group Consensus",
    description: "Facilitates group decision - leader accepts the outcome.",
    approach: "Consensus-Driven",
  },
};

// --- Profile labels (dominant Vroom style) ------------------------------------

const vroomProfileLabels: Record<VroomStyle, { label: string; description: string }> = {
  AI: {
    label: "Decisive Authority",
    description:
      "You lead with speed and individual conviction. Your strength is cutting through ambiguity without paralysis. Watch for blind spots when stakeholder buy-in matters more than speed.",
  },
  AII: {
    label: "Informed Strategist",
    description:
      "You gather what you need before you decide, but the decision is yours. This balances speed with evidence. Most effective when quality of information varies across your team.",
  },
  CI: {
    label: "Selective Consultant",
    description:
      "You seek perspectives selectively - bringing in the right voices rather than the full group. This preserves decision quality while managing information complexity.",
  },
  CII: {
    label: "Collaborative Leader",
    description:
      "You involve the group before deciding. This builds ownership and surfaces diverse perspectives. At its best, it produces durable decisions. Watch for decision fatigue in crisis moments.",
  },
  GII: {
    label: "Consensus Builder",
    description:
      "You build genuine consensus - the group owns the outcome, not just the process. This produces high-trust decisions with lasting legitimacy. Requires strong facilitation and tolerance for slower timelines.",
  },
};

// --- Bias metadata ------------------------------------------------------------

export const biasMetadata: Record<BiasType, { label: string; description: string }> = {
  loss_aversion: {
    label: "Loss Aversion",
    description:
      "You weighted potential losses more heavily than equivalent gains. Behavioural economics research shows this leads to overly conservative choices - cutting rather than investing during uncertainty.",
  },
  sunk_cost: {
    label: "Sunk Cost Fallacy",
    description:
      "A decision appeared influenced by prior investment rather than future value. Continuing a course of action because of past commitment, rather than future merit, is a common leadership failure.",
  },
  overconfidence: {
    label: "Overconfidence Bias",
    description:
      "You committed to a position with insufficient evidence to justify certainty. Overconfidence in leadership contexts often manifests as presenting assumptions as facts to external stakeholders.",
  },
  authority_bias: {
    label: "Authority Bias",
    description:
      "The decision appeared to defer to positional authority (seniority, title, family hierarchy) rather than evidence. Upper Echelons Theory identifies this as a key driver of poor strategic outcomes in family firms.",
  },
  moral_licensing: {
    label: "Moral Licensing",
    description:
      "A prior ethical choice appeared to create implicit 'permission' for a less ethical one. Rest's model identifies this as a failure of moral intention - knowing the right answer but allowing past good behaviour to justify deviation.",
  },
  nepotism: {
    label: "Nepotism Bias",
    description:
      "Family membership was weighted as a qualification for leadership. PwC's 2025 family business survey identifies this as the primary driver of underperformance in ASEAN family conglomerates at succession.",
  },
  status_quo: {
    label: "Status Quo Bias",
    description:
      "You preferred the existing arrangement even when evidence suggested change was more valuable. In volatile markets, status quo bias delays necessary adaptation.",
  },
  groupthink: {
    label: "Groupthink",
    description:
      "The decision favoured internal consensus and harmony over independent analysis. In family firm contexts, groupthink is amplified by loyalty norms and cultural deference to seniority.",
  },
  ethnocentrism: {
    label: "Ethnocentrism",
    description:
      "A cultural or national frame was applied to a situation requiring broader perspective. OODA Loop analysis identifies cultural framing as one of the most common 'orient' failures in cross-cultural business contexts.",
  },
};

// --- Leadership style metadata ------------------------------------------------

export const leadershipStyles: Record<LeadershipStyleId, LeadershipStyle> = {
  strategic_thinker: {
    id: "strategic_thinker",
    label: "Strategic Thinker",
    tagline: "Evidence-driven. Structured. Balanced.",
    description:
      "You approach decisions through a lens of rational analysis and structured information gathering. Cognitive biases are minimal in your pattern - you tend to orient before you decide, and you balance speed with rigor. You are most effective in complex, high-stakes environments where nuance matters.",
    strengths: [
      "Evidence-first decision-making",
      "Low susceptibility to sunk cost and loss aversion",
      "Balances stakeholder needs with strategic logic",
      "Comfortable with ambiguity - acts without paralysis",
    ],
    watchOuts: [
      "May over-index on process in genuine crisis moments",
      "Can appear detached when emotional intelligence is what stakeholders need",
      "Risk of under-communicating reasoning to non-analytical audiences",
    ],
  },
  overconfident_executor: {
    id: "overconfident_executor",
    label: "Overconfident Executor",
    tagline: "Fast-moving. Decisive. Under-calibrated.",
    description:
      "You act with conviction and move quickly - but your pattern shows a tendency to commit before gathering sufficient evidence. Overconfidence emerged in your decisions: you presented assumptions as facts, and speed was preferred over depth. In a high-growth environment this can look like leadership. In a governance-sensitive one, it creates risk.",
    strengths: [
      "Decisive under pressure - does not freeze",
      "High energy and forward momentum",
      "Ability to simplify complex situations",
      "Effective in execution-focused roles",
    ],
    watchOuts: [
      "Overconfidence bias: commits without sufficient evidence calibration",
      "Stakeholder management often secondary to outcome",
      "Ethical shortcuts emerge when speed is prioritised",
      "Susceptible to authority structures that reinforce confidence without challenge",
    ],
  },
  loyalty_driven: {
    id: "loyalty_driven",
    label: "Loyalty-Driven Leader",
    tagline: "Relational. Committed. Anchored to the past.",
    description:
      "Your decisions are shaped by a strong sense of obligation - to people, history, and inherited structures. This generates deep trust and long-term relationships. But it also introduces sunk cost thinking: decisions were influenced by prior investment rather than future value. In family business contexts, this is one of the most studied leadership patterns - and one of the most consequential.",
    strengths: [
      "High relational intelligence and stakeholder empathy",
      "Consistent - people know where they stand",
      "Builds enduring loyalty in teams",
      "Strong on governance culture and norms",
    ],
    watchOuts: [
      "Sunk cost and status quo biases: struggles to exit legacy positions",
      "Authority bias: defers to seniority over evidence",
      "Nepotism risk in succession and hiring decisions",
      "May resist necessary change until the cost is unavoidable",
    ],
  },
  emotionally_reactive: {
    id: "emotionally_reactive",
    label: "Emotionally Reactive Operator",
    tagline: "Sensitive. Relationship-aware. Avoidant under pressure.",
    description:
      "Loss aversion dominated your decision pattern: you weighted potential downside more heavily than upside, and this led to delay or inaction in critical moments. Your instincts are relational and careful - both genuine leadership strengths - but when pressure escalates, emotion tends to override analysis. The key growth lever is structured decision protocols that separate the emotional and rational inputs.",
    strengths: [
      "High empathy and awareness of human impact",
      "Careful - avoids reckless decisions",
      "Strong relational listening",
      "Stakeholder sensitivity in communication",
    ],
    watchOuts: [
      "Loss aversion: overweights downside, underweights opportunity",
      "Status quo bias: defaults to inaction under uncertainty",
      "Delays compound risk - avoidance rarely reduces it",
      "Emotional framing of decisions can cloud analytical judgment",
    ],
  },
};

// --- Leadership style derivation ---------------------------------------------

function deriveLeadershipStyle(
  totalScore: number,
  biases: BiasIncident[],
  normalizedScores: Record<DimensionId, number>,
): LeadershipStyle {
  // Count bias categories
  const biasTypes = biases.map((b) => b.bias);

  const hasOverconfidence = biasTypes.includes("overconfidence");
  const hasSunkCost = biasTypes.includes("sunk_cost");
  const hasStatusQuo = biasTypes.includes("status_quo");
  const hasLossAversion = biasTypes.includes("loss_aversion");
  const hasNepotism = biasTypes.includes("nepotism");
  const hasAuthorityBias = biasTypes.includes("authority_bias");
  const hasGroupthink = biasTypes.includes("groupthink");

  const loyaltyBiases = [hasSunkCost, hasStatusQuo, hasNepotism, hasAuthorityBias, hasGroupthink].filter(Boolean).length;
  const reactiveBiases = [hasLossAversion, hasStatusQuo].filter(Boolean).length;

  // Strategic Thinker: high score, few/no biases, balanced dimensions
  if (totalScore >= 70 && biases.length <= 1 && normalizedScores.strategicJudgment >= 65) {
    return leadershipStyles.strategic_thinker;
  }

  // Overconfident Executor: overconfidence bias OR high decisiveness with low ethics
  if (
    hasOverconfidence ||
    (normalizedScores.decisiveness >= 65 &&
      normalizedScores.ethicalReasoning < 55 &&
      normalizedScores.stakeholderManagement < 55)
  ) {
    return leadershipStyles.overconfident_executor;
  }

  // Loyalty-Driven: dominated by sunk cost / authority / nepotism / groupthink
  if (loyaltyBiases >= 2 || (hasSunkCost && hasAuthorityBias)) {
    return leadershipStyles.loyalty_driven;
  }

  // Emotionally Reactive: loss aversion + avoidance + low adaptability
  if (
    hasLossAversion ||
    (reactiveBiases >= 1 && normalizedScores.adaptability < 50) ||
    (normalizedScores.decisiveness < 45 && normalizedScores.adaptability < 45)
  ) {
    return leadershipStyles.emotionally_reactive;
  }

  // Default fallback by score
  if (totalScore >= 60) return leadershipStyles.strategic_thinker;
  if (loyaltyBiases >= 1) return leadershipStyles.loyalty_driven;
  return leadershipStyles.emotionally_reactive;
}

// --- Scoring ------------------------------------------------------------------

export function buildSimulationResult(
  scenario: ScenarioDefinition,
  roundChoices: Record<string, string>,       // roundId -> optionId
  ethicalChoices: Record<string, string>,     // roundId -> ethicalOptionId
  docsRead: string[],                          // documentIds opened
  previousScore?: number,
): SimulationResult {
  const rawTotals: Record<DimensionId, number> = {
    strategicJudgment: 0,
    ethicalReasoning: 0,
    stakeholderManagement: 0,
    decisiveness: 0,
    adaptability: 0,
  };

  const vroomCounts: Record<VroomStyle, number> = {
    AI: 0,
    AII: 0,
    CI: 0,
    CII: 0,
    GII: 0,
  };

  const biasProfile: BiasIncident[] = [];
  const totalDocs = scenario.rounds.reduce((sum, r) => sum + r.stakeholderDocs.length, 0);

  // Max possible: 4 per dimension xnumber of rounds (from main choices)
  // + up to 4 for ethicalReasoning per round with ethical prompt
  const mainRoundsCount = scenario.rounds.length;
  const ethicalRoundsCount = scenario.rounds.filter((r) => r.ethicalPrompt).length;
  const maxMain = 4 * mainRoundsCount;
  const maxEthical = 4 * ethicalRoundsCount;

  for (const round of scenario.rounds) {
    const chosenOptionId = roundChoices[round.id];
    const chosenOption = round.options.find((o) => o.id === chosenOptionId);

    if (chosenOption) {
      // Accumulate dimension scores
      for (const dim of Object.keys(rawTotals) as DimensionId[]) {
        rawTotals[dim] += chosenOption.scores[dim];
      }

      // Track Vroom style
      vroomCounts[chosenOption.vroomStyle]++;

      // Track biases
      if (chosenOption.bias) {
        biasProfile.push({
          bias: chosenOption.bias,
          roundId: round.id,
          roundTitle: round.title,
          description: biasMetadata[chosenOption.bias].description,
        });
      }
    }

    // Ethical choices contribute to ethical reasoning
    if (round.ethicalPrompt) {
      const chosenEthicalId = ethicalChoices[round.id];
      const chosenEthical = round.ethicalPrompt.options.find(
        (o) => o.id === chosenEthicalId,
      );
      if (chosenEthical) {
        rawTotals.ethicalReasoning += chosenEthical.score;
        if (chosenEthical.bias) {
          biasProfile.push({
            bias: chosenEthical.bias,
            roundId: round.id,
            roundTitle: `${round.title} (ethical)`,
            description: biasMetadata[chosenEthical.bias].description,
          });
        }
      }
    }
  }

  // Normalize scores to 0-100
  // ethicalReasoning max = maxMain/5 + maxEthical (ethical choices also contribute)
  const ethicalMax = maxMain / dimensions.length + maxEthical;
  const standardMax = maxMain / dimensions.length;

  const normalizedScores = Object.fromEntries(
    dimensions.map((dim) => {
      const max = dim.id === "ethicalReasoning" ? ethicalMax : standardMax;
      const pct = Math.round(clamp((rawTotals[dim.id] / max) * 100, 0, 100));
      return [dim.id, pct];
    }),
  ) as Record<DimensionId, number>;

  const totalScore = Math.round(
    dimensions.reduce((sum, dim) => sum + normalizedScores[dim.id], 0) /
      dimensions.length,
  );

  // Build Vroom profile
  const dominant = (Object.entries(vroomCounts) as [VroomStyle, number][]).reduce(
    (best, [style, count]) => (count > vroomCounts[best] ? style : best),
    "AI" as VroomStyle,
  );
  const profileInfo = vroomProfileLabels[dominant];
  const vroomProfile: VroomProfile = {
    dominant,
    distribution: vroomCounts,
    label: profileInfo.label,
    description: profileInfo.description,
  };

  // Generate summary, insight, and leadership style
  const { summary, insight } = generateNarrative(totalScore, biasProfile, vroomProfile);
  const leadershipStyle = deriveLeadershipStyle(totalScore, biasProfile, normalizedScores);
  const delta = previousScore !== undefined ? totalScore - previousScore : undefined;

  return {
    id: crypto.randomUUID(),
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    completedAt: new Date().toISOString(),
    totalScore,
    previousScore,
    delta,
    scores: normalizedScores,
    biasProfile,
    vroomProfile,
    leadershipStyle,
    docsReadCount: docsRead.length,
    totalDocs,
    summary,
    insight,
  };
}

// --- Narrative generation -----------------------------------------------------

function generateNarrative(
  score: number,
  biases: BiasIncident[],
  vroom: VroomProfile,
): { summary: string; insight: string } {
  if (score >= 78) {
    return {
      summary:
        "Consistently strong judgment across strategic, ethical, and stakeholder dimensions. Your decision pattern shows maturity under pressure.",
      insight: `Your ${vroomStyles[vroom.dominant].approach.toLowerCase()} decision style served you well here. ${biases.length === 0 ? "No significant cognitive biases were detected across your decisions - a marker of genuinely reflective leadership." : `One area to watch: ${biasMetadata[biases[0].bias].label.toLowerCase()} appeared in your pattern. Being aware of this tendency is the first step to managing it.`}`,
    };
  }

  if (score >= 58) {
    return {
      summary:
        "Solid foundations with some inconsistency - particularly in high-pressure ethical moments where the easy path was taken.",
      insight: `Your ${vroomStyles[vroom.dominant].approach.toLowerCase()} style shows real capability. ${biases.length > 0 ? `However, ${biases.map((b) => biasMetadata[b.bias].label.toLowerCase()).slice(0, 2).join(" and ")} emerged across your decisions - both are addressable with deliberate practice.` : "The next level of growth is consistency in your weakest dimension."}`,
    };
  }

  return {
    summary:
      "Several decisions prioritised short-term comfort or institutional loyalty over evidence-based judgment.",
    insight: `The key growth area is slowing down in high-pressure moments to test your assumptions. ${biases.length > 0 ? `Your pattern showed ${biases.slice(0, 2).map((b) => biasMetadata[b.bias].label.toLowerCase()).join(" and ")} - both deeply studied in leadership research and both very trainable.` : "Structure your decision process: evidence first, then options, then choice."}`,
  };
}

// --- Utilities ----------------------------------------------------------------

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function scoreColor(value: number): string {
  if (value >= 70) return "var(--green)";
  if (value >= 45) return "var(--amber)";
  return "var(--red)";
}

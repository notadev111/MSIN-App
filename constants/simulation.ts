import { Simulation } from '../types';

// The core simulation scenario: "The Pivot Decision"
// A realistic startup leadership challenge covering strategy, leadership, communication, and critical thinking.
export const MAIN_SIMULATION: Simulation = {
  id: 'sim_pivot_001',
  title: 'The Pivot Decision',
  subtitle: 'Strategic Leadership Under Pressure',
  duration: '3 min',
  difficulty: 'Intermediate',
  tags: ['Strategy', 'Leadership', 'Startups'],
  context: `You are co-founder and CEO of Meridian — a B2B SaaS startup that raised $2M eighteen months ago.

Your initial product, a project management tool for architecture firms, has 40 paying customers. But growth has stalled, churn is climbing, and you have 7 months of runway left.

Your lead engineer has spotted an adjacent opportunity: the same core tech could serve legal teams managing case documents. Three early conversations suggest strong demand and willingness to pay.

Your team of 8 is watching closely. Every decision you make now will shape the company's future — and your reputation as a leader.`,
  steps: [
    {
      id: 'step_resources',
      title: 'Resource Allocation',
      question: 'With 7 months of runway, how do you structure your team and resources?',
      context:
        'Current burn: £130K/month. Team: 3 engineers, 2 sales reps, 1 designer, 1 ops manager, and yourself.',
      choices: [
        {
          id: 'A',
          text: 'Make immediate cuts — reduce to 4 core people, extending runway to 14 months while you validate the new direction.',
          scores: { strategy: 18, leadership: 12, communication: 14, criticalThinking: 22 },
        },
        {
          id: 'B',
          text: 'Keep the full team but redirect 70% of engineering capacity to the legal product immediately.',
          scores: { strategy: 22, leadership: 14, communication: 10, criticalThinking: 18 },
        },
        {
          id: 'C',
          text: 'Run a focused 6-week validation sprint — half the team on legal, half maintaining current customers.',
          scores: { strategy: 28, leadership: 20, communication: 22, criticalThinking: 28 },
        },
      ],
    },
    {
      id: 'step_investor',
      title: 'Investor Communication',
      question: 'Your lead investor wants a call tomorrow. How do you approach it?',
      context:
        "Sarah Chen at Vertex Capital has been patient but you've missed two quarterly targets. She holds a board seat and her follow-on cheque matters.",
      choices: [
        {
          id: 'A',
          text: 'Share full metrics including churn rate, then present the pivot opportunity with a clear, data-backed thesis.',
          scores: { strategy: 20, leadership: 26, communication: 30, criticalThinking: 20 },
        },
        {
          id: 'B',
          text: 'Lead with the new market opportunity and address current metrics only if she asks.',
          scores: { strategy: 12, leadership: 10, communication: 12, criticalThinking: 10 },
        },
        {
          id: 'C',
          text: 'Request two weeks to prepare a thorough pivot deck before taking the call.',
          scores: { strategy: 10, leadership: 8, communication: 14, criticalThinking: 14 },
        },
      ],
    },
    {
      id: 'step_direction',
      title: 'Strategic Direction',
      question: 'After 6 weeks, legal demand is confirmed — but three architecture customers threaten to leave if you pivot.',
      context:
        'Those 3 customers represent 40% of MRR. The legal pilot has 5 companies ready to sign at £800/month each — nearly replacing that revenue.',
      choices: [
        {
          id: 'A',
          text: 'Full pivot to legal. Give architecture customers 60 days notice and help them migrate to alternatives.',
          scores: { strategy: 24, leadership: 20, communication: 20, criticalThinking: 22 },
        },
        {
          id: 'B',
          text: 'Negotiate a phased transition — honour architecture contracts for 6 months while fully building the legal product.',
          scores: { strategy: 30, leadership: 26, communication: 30, criticalThinking: 28 },
        },
        {
          id: 'C',
          text: 'Stay with architecture. Abandon the legal opportunity to protect existing customer relationships.',
          scores: { strategy: 8, leadership: 14, communication: 14, criticalThinking: 8 },
        },
      ],
    },
  ],
};

// Scoring helpers
export const MAX_SCORE_PER_SKILL = 88; // rough max across all 3 steps if best choices made

export function computeScores(
  choices: Record<string, string>
): import('../types').SkillScores {
  const totals = { strategy: 0, leadership: 0, communication: 0, criticalThinking: 0 };

  for (const step of MAIN_SIMULATION.steps) {
    const choiceId = choices[step.id];
    const choice = step.choices.find((c) => c.id === choiceId);
    if (choice) {
      totals.strategy += choice.scores.strategy;
      totals.leadership += choice.scores.leadership;
      totals.communication += choice.scores.communication;
      totals.criticalThinking += choice.scores.criticalThinking;
    }
  }

  // Normalise to 0–100
  return {
    strategy: Math.round((totals.strategy / MAX_SCORE_PER_SKILL) * 100),
    leadership: Math.round((totals.leadership / MAX_SCORE_PER_SKILL) * 100),
    communication: Math.round((totals.communication / MAX_SCORE_PER_SKILL) * 100),
    criticalThinking: Math.round((totals.criticalThinking / MAX_SCORE_PER_SKILL) * 100),
  };
}

// Generate mock AI-style feedback based on score range
export function generateFeedback(
  scores: import('../types').SkillScores
): import('../types').FeedbackItem[] {
  const insights: Record<
    keyof import('../types').SkillScores,
    { low: string; mid: string; high: string }
  > = {
    strategy: {
      low: 'Your decisions leaned towards short-term stability. Strong leaders balance caution with calculated bold moves.',
      mid: 'Solid strategic instincts. Consider stress-testing your assumptions more rigorously before committing.',
      high: 'You demonstrated clear strategic vision — balancing validation with decisive action under pressure.',
    },
    leadership: {
      low: 'Leadership under pressure means making hard calls transparently. Your approach may have eroded team trust.',
      mid: 'You showed leadership in key moments. Work on maintaining clarity and decisiveness when stakes are highest.',
      high: 'Strong leadership throughout — you balanced stakeholder needs, team morale, and honest communication.',
    },
    communication: {
      low: 'Avoiding difficult conversations with investors and customers tends to compound problems. Radical candour builds trust.',
      mid: 'Your communication was adequate but sometimes reactive. Proactive transparency signals confidence.',
      high: 'Excellent communicator — you led with honesty and framed difficult situations constructively.',
    },
    criticalThinking: {
      low: 'Some decisions lacked structured analysis. Use frameworks like trade-off matrices when options are complex.',
      mid: 'Good analytical instincts. Building structured decision frameworks will sharpen your edge further.',
      high: 'Rigorous thinking throughout — you identified trade-offs clearly and avoided binary thinking.',
    },
  };

  const getLabel = (score: number) => {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Developing';
    return 'Needs Focus';
  };

  const getTier = (score: number): 'low' | 'mid' | 'high' => {
    if (score >= 75) return 'high';
    if (score >= 45) return 'mid';
    return 'low';
  };

  return (Object.keys(scores) as (keyof import('../types').SkillScores)[]).map((skill) => ({
    skill,
    score: scores[skill],
    label: getLabel(scores[skill]),
    insight: insights[skill][getTier(scores[skill])],
  }));
}

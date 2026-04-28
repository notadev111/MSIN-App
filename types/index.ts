// Core domain types for the MSIN platform

export interface SkillScores {
  strategy: number;
  leadership: number;
  communication: number;
  criticalThinking: number;
}

export type SkillKey = keyof SkillScores;

export interface User {
  name: string;
  role: string;         // e.g. "Aspiring Founder"
  university: string;
  interests: string[];
  goals: string[];
  selectedSkills: string[];
  skills: SkillScores;
  completedSimulations: string[];
  isOnboarded: boolean;
}

export interface Choice {
  id: string;
  text: string;
  scores: SkillScores;
}

export interface SimulationStep {
  id: string;
  title: string;
  question: string;
  context: string;
  choices: Choice[];
}

export interface Simulation {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  context: string;
  steps: SimulationStep[];
}

export interface SimulationResult {
  simulationId: string;
  completedAt: string;
  choices: Record<string, string>; // stepId → choiceId
  scores: SkillScores;
  totalScore: number;
  feedback: FeedbackItem[];
}

export interface FeedbackItem {
  skill: keyof SkillScores;
  score: number;
  label: string;
  insight: string;
}

export interface Peer {
  id: string;
  name: string;
  role: string;
  university: string;
  interests: string[];
  skills: SkillScores;
  bio: string;
  connected: boolean;
}

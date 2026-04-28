import { Colors } from './theme';
import { Peer, SkillKey, SkillScores, User } from '../types';

export const SKILL_LABELS: Record<SkillKey, string> = {
  strategy: 'Strategy',
  leadership: 'Leadership',
  communication: 'Communication',
  criticalThinking: 'Critical Thinking',
};

export const SKILL_SHORT_LABELS: Record<SkillKey, string> = {
  strategy: 'Strategy',
  leadership: 'Leadership',
  communication: 'Comms',
  criticalThinking: 'Analysis',
};

export const SKILL_COLORS: Record<SkillKey, string> = {
  strategy: Colors.skillStrategy,
  leadership: Colors.skillLeadership,
  communication: Colors.skillCommunication,
  criticalThinking: Colors.skillCriticalThinking,
};

export function getAverageSkillScore(scores: SkillScores): number {
  return Math.round(
    (scores.strategy + scores.leadership + scores.communication + scores.criticalThinking) / 4
  );
}

export function getTopSkillKey(scores: SkillScores): SkillKey | null {
  const entries = Object.entries(scores) as [SkillKey, number][];
  const top = entries.sort(([, a], [, b]) => b - a)[0];
  if (!top || top[1] === 0) {
    return null;
  }

  return top[0];
}

export function getTopSkillLabel(scores: SkillScores, short = false): string {
  const topKey = getTopSkillKey(scores);
  if (!topKey) {
    return '-';
  }

  return short ? SKILL_SHORT_LABELS[topKey] : SKILL_LABELS[topKey];
}

export function getScoreTier(score: number): {
  label: string;
  tone: 'success' | 'warning' | 'danger';
  color: string;
  description: string;
} {
  if (score >= 75) {
    return {
      label: 'Strong',
      tone: 'success',
      color: Colors.success,
      description: 'You are making confident, high-quality decisions.',
    };
  }

  if (score >= 50) {
    return {
      label: 'Developing',
      tone: 'warning',
      color: Colors.warning,
      description: 'You have strong instincts and room to sharpen them.',
    };
  }

  return {
    label: 'Needs Focus',
    tone: 'danger',
    color: Colors.danger,
    description: 'More reps will help you build consistency under pressure.',
  };
}

export function getPeerCompatibility(
  user: User,
  peer: Peer
): { score: number; reasons: string[]; strongestSkill: SkillKey } {
  const peerSkillEntries = Object.entries(peer.skills) as [SkillKey, number][];
  const strongestSkill = peerSkillEntries.sort(([, a], [, b]) => b - a)[0][0];
  const focusSkills = user.selectedSkills as SkillKey[];
  const selectedSkillScores = focusSkills
    .map((skill) => peer.skills[skill] ?? 0)
    .filter((value) => value > 0);
  const selectedSkillAverage =
    selectedSkillScores.length > 0
      ? Math.round(
          selectedSkillScores.reduce((total, value) => total + value, 0) / selectedSkillScores.length
        )
      : getAverageSkillScore(peer.skills);

  const userTopSkill = getTopSkillKey(user.skills);
  const topSkillBonus = userTopSkill ? Math.round((peer.skills[userTopSkill] ?? 0) * 0.18) : 12;
  const focusBonus = Math.min(focusSkills.length * 6, 18);
  const connectedBonus = peer.connected ? 4 : 0;
  const score = Math.max(
    52,
    Math.min(98, Math.round(selectedSkillAverage * 0.65 + topSkillBonus + focusBonus + connectedBonus))
  );

  const reasons: string[] = [];

  if (focusSkills.length > 0) {
    const strongestFocus = focusSkills
      .map((skill) => [skill, peer.skills[skill] ?? 0] as [SkillKey, number])
      .sort(([, a], [, b]) => b - a)[0];

    if (strongestFocus && strongestFocus[1] > 0) {
      reasons.push(`Strong in ${SKILL_LABELS[strongestFocus[0]]}`);
    }
  }

  if (peer.skills.communication >= 80 && peer.skills.leadership >= 70) {
    reasons.push('Good stakeholder profile');
  } else if (peer.skills.strategy >= 80 || peer.skills.criticalThinking >= 80) {
    reasons.push('Strong strategic judgment');
  }

  if (peer.connected) {
    reasons.push('Already in your network');
  }

  if (reasons.length === 0) {
    reasons.push(`High overall fit in ${SKILL_LABELS[strongestSkill]}`);
  }

  return { score, reasons: reasons.slice(0, 3), strongestSkill };
}

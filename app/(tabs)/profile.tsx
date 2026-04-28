import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { MAIN_SIMULATION } from '../../constants/simulation';
import SkillBar from '../../components/ui/SkillBar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import {
  getAverageSkillScore,
  getScoreTier,
  getTopSkillKey,
  SKILL_LABELS,
} from '../../constants/skills';

const SKILL_DESCRIPTIONS: Record<string, string> = {
  strategy: 'Long-term vision, trade-off analysis, and resource allocation under uncertainty.',
  leadership: 'Team motivation, stakeholder management, and decision-making under pressure.',
  communication: 'Clarity of thought, persuasion, and transparent stakeholder engagement.',
  criticalThinking: 'Rigorous analysis, assumption testing, and avoiding cognitive biases.',
};

export default function ProfileScreen() {
  const { state } = useApp();
  const { user, lastResult, peers } = state;
  const hasSimulated = user.completedSimulations.length > 0;
  const overallScore = hasSimulated ? getAverageSkillScore(user.skills) : 0;
  const scoreTier = getScoreTier(overallScore);
  const topSkillKey = getTopSkillKey(user.skills);
  const connectedCount = peers.filter((peer) => peer.connected).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#FFF2EB', '#F6F0E7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>{(user.name || 'U').charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name || 'Your Name'}</Text>
              <Text style={styles.role}>{user.role}</Text>
              {user.university ? <Text style={styles.university}>{user.university}</Text> : null}
            </View>
          </View>

          <View style={styles.heroStats}>
            <HeroStat label="Overall" value={hasSimulated ? `${overallScore}` : '-'} />
            <HeroStat label="Simulations" value={`${user.completedSimulations.length}`} />
            <HeroStat label="Connections" value={`${connectedCount}`} />
          </View>

          <View style={styles.heroFoot}>
            <Badge label={hasSimulated ? scoreTier.label : 'Awaiting first result'} variant={hasSimulated ? scoreTier.tone : 'default'} />
            <Text style={styles.heroText}>
              {hasSimulated
                ? `Strongest signal: ${topSkillKey ? SKILL_LABELS[topSkillKey] : 'TBD'}.`
                : 'Complete your first simulation to build a performance profile.'}
            </Text>
          </View>
        </LinearGradient>

        {(user.interests.length > 0 || user.selectedSkills.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Signals</Text>
            <Card padded>
              <View style={styles.signalGroup}>
                {user.selectedSkills.length > 0 ? (
                  <View style={styles.signalBlock}>
                    <Text style={styles.signalLabel}>Focus areas</Text>
                    <View style={styles.tagsRow}>
                      {user.selectedSkills.map((skill) => (
                        <Badge key={skill} label={SKILL_LABELS[skill as keyof typeof SKILL_LABELS] ?? skill} variant="accent" />
                      ))}
                    </View>
                  </View>
                ) : null}
                {user.interests.length > 0 ? (
                  <View style={styles.signalBlock}>
                    <Text style={styles.signalLabel}>Interests</Text>
                    <View style={styles.tagsRow}>
                      {user.interests.map((tag) => (
                        <Badge key={tag} label={tag} variant="default" />
                      ))}
                    </View>
                  </View>
                ) : null}
              </View>
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Breakdown</Text>
          <Card padded>
            {!hasSimulated ? (
              <View style={styles.emptyState}>
                <Ionicons name="analytics-outline" size={20} color={Colors.textMuted} />
                <Text style={styles.emptyText}>
                  Complete your first simulation to unlock a full breakdown.
                </Text>
              </View>
            ) : (
              <View style={styles.skillList}>
                {(Object.keys(user.skills) as (keyof typeof user.skills)[]).map((skill, index) => (
                  <View
                    key={skill}
                    style={[
                      styles.skillItem,
                      index < Object.keys(user.skills).length - 1 && styles.skillItemBorder,
                    ]}
                  >
                    <SkillBar skill={skill} score={user.skills[skill]} animate showScore />
                    <Text style={styles.skillDesc}>{SKILL_DESCRIPTIONS[skill]}</Text>
                  </View>
                ))}
              </View>
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed Simulations</Text>
          {hasSimulated ? (
            <View style={styles.simEntry}>
              <View style={styles.simIcon}>
                <Ionicons name="checkmark" size={16} color={Colors.success} />
              </View>
              <View style={styles.simEntryBody}>
                <Text style={styles.simEntryTitle}>{MAIN_SIMULATION.title}</Text>
                <Text style={styles.simEntryMeta}>
                  {MAIN_SIMULATION.difficulty} • {MAIN_SIMULATION.duration}
                </Text>
                {lastResult ? (
                  <Text style={styles.simEntryScore}>Latest score: {lastResult.totalScore}/100</Text>
                ) : null}
              </View>
              <Badge label="Done" variant="success" />
            </View>
          ) : (
            <Card padded>
              <Text style={styles.emptyText}>No simulations completed yet.</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroStatValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  heroCard: {
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: 'rgba(242,107,91,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  profileInfo: { gap: 3, flex: 1 },
  name: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  role: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  university: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  heroStats: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  heroStat: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  heroStatValue: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  heroStatLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  heroFoot: {
    gap: Spacing.sm,
  },
  heroText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: { gap: Spacing.md },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.widest,
  },
  signalGroup: {
    gap: Spacing.base,
  },
  signalBlock: {
    gap: Spacing.sm,
  },
  signalLabel: {
    fontSize: Typography.size.sm,
    color: Colors.text,
    fontWeight: Typography.weight.semibold,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  skillList: { gap: Spacing.xl },
  skillItem: {
    gap: Spacing.xs,
    paddingBottom: Spacing.xl,
  },
  skillItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  skillDesc: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  emptyState: {
    paddingVertical: Spacing.base,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  simEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
  },
  simIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: Colors.successSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  simEntryBody: { flex: 1, gap: 2 },
  simEntryTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  simEntryMeta: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  simEntryScore: {
    fontSize: Typography.size.xs,
    color: Colors.accent,
    fontWeight: Typography.weight.medium,
  },
});

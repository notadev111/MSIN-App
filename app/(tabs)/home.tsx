import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { MAIN_SIMULATION } from '../../constants/simulation';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  getAverageSkillScore,
  getScoreTier,
  getTopSkillLabel,
} from '../../constants/skills';

export default function HomeScreen() {
  const { state } = useApp();
  const { user, lastResult, peers } = state;
  const hasCompleted = user.completedSimulations.includes(MAIN_SIMULATION.id);
  const overallScore = getAverageSkillScore(user.skills);
  const scoreTier = getScoreTier(overallScore);
  const connectedCount = peers.filter((peer) => peer.connected).length;
  const focusCount = user.selectedSkills.length;
  const topSkill = getTopSkillLabel(user.skills, true);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.greeting}>
              {greeting()}, {user.name || 'there'}
            </Text>
            <Text style={styles.headerSub}>Your decision-making studio is ready.</Text>
          </View>
          <Pressable style={styles.avatar} onPress={() => router.push('/(tabs)/profile')}>
            <Text style={styles.avatarText}>{(user.name || 'U').charAt(0).toUpperCase()}</Text>
          </Pressable>
        </View>

        <LinearGradient
          colors={['#FFF2EB', '#F6F0E7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles-outline" size={14} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>Leadership readiness</Text>
            </View>
            {hasCompleted ? <Badge label={scoreTier.label} variant={scoreTier.tone} /> : null}
          </View>

          <Text style={styles.heroTitle}>
            {hasCompleted ? `${overallScore}/100 overall` : 'Start your first simulation'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {hasCompleted
              ? `${scoreTier.description} Top signal: ${topSkill}.`
              : 'Build your profile with one focused scenario and get an instant skills readout.'}
          </Text>

          <View style={styles.heroStats}>
            <HeroStat label="Completed" value={String(user.completedSimulations.length)} />
            <HeroStat label="Connections" value={String(connectedCount)} />
            <HeroStat label="Focus areas" value={String(focusCount || 0)} />
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <SummaryCard
            icon="analytics-outline"
            label="Top skill"
            value={topSkill}
            hint={hasCompleted ? 'Based on your latest scores' : 'Unlock after first run'}
          />
          <SummaryCard
            icon="people-outline"
            label="Network"
            value={`${connectedCount}/${peers.length}`}
            hint="Peers connected"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Momentum</Text>
          <View style={styles.momentumCard}>
            <View style={styles.momentumRow}>
              <View style={styles.momentumIcon}>
                <Ionicons name="trending-up-outline" size={18} color={Colors.accent} />
              </View>
              <View style={styles.momentumBody}>
                <Text style={styles.momentumTitle}>
                  {lastResult ? 'Most recent result' : 'Your next milestone'}
                </Text>
                <Text style={styles.momentumText}>
                  {lastResult
                    ? `You scored ${lastResult.totalScore}/100 in The Pivot Decision. Run it again or explore peers who can help strengthen your weaker areas.`
                    : 'Complete The Pivot Decision to unlock your first feedback report and a richer profile.'}
                </Text>
              </View>
            </View>

            {user.selectedSkills.length > 0 ? (
              <View style={styles.focusWrap}>
                {user.selectedSkills.map((skill) => (
                  <Badge key={skill} label={skillLabel(skill)} variant="accent" />
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Simulation</Text>
          <Pressable
            onPress={() => router.push('/simulation')}
            style={({ pressed }) => [pressed && { opacity: 0.94 }]}
          >
            <View style={styles.simCard}>
              <LinearGradient
                colors={['#FFF5EF', '#FBF7F1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.simHeader}
              >
                <View style={styles.simTags}>
                  <Badge label={MAIN_SIMULATION.difficulty} variant="accent" />
                  <Badge label={MAIN_SIMULATION.duration} variant="default" />
                  <Badge label={`${MAIN_SIMULATION.steps.length} decisions`} variant="default" />
                </View>
                <Text style={styles.simTitle}>{MAIN_SIMULATION.title}</Text>
                <Text style={styles.simSubtitle}>{MAIN_SIMULATION.subtitle}</Text>
              </LinearGradient>

              <View style={styles.simBody}>
                <Text style={styles.simContext} numberOfLines={4}>
                  {MAIN_SIMULATION.context}
                </Text>

                <View style={styles.simSkillsRow}>
                  {MAIN_SIMULATION.tags.map((tag) => (
                    <View key={tag} style={styles.simSkillChip}>
                      <Text style={styles.simSkillText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.stepList}>
                  {MAIN_SIMULATION.steps.map((step, index) => (
                    <View key={step.id} style={styles.stepRow}>
                      <View style={styles.stepNum}>
                        <Text style={styles.stepNumText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  label={hasCompleted ? 'Run It Again' : 'Start Simulation'}
                  onPress={() => router.push('/simulation')}
                  variant="primary"
                  size="md"
                  fullWidth
                />
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickRow}>
            <QuickCard
              title="Profile"
              desc="See your evolving skill profile"
              icon="person-circle-outline"
              onPress={() => router.push('/(tabs)/profile')}
            />
            <QuickCard
              title="Network"
              desc="Find peers who complement your strengths"
              icon="people-outline"
              onPress={() => router.push('/(tabs)/network')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <Ionicons name={icon} size={18} color={Colors.accent} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryHint}>{hint}</Text>
    </View>
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

function QuickCard({
  title,
  desc,
  icon,
  onPress,
}: {
  title: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.quickCard, pressed && { opacity: 0.86 }]} onPress={onPress}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={20} color={Colors.accent} />
      </View>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickDesc}>{desc}</Text>
    </Pressable>
  );
}

function skillLabel(skill: string) {
  const labels: Record<string, string> = {
    strategy: 'Strategy',
    leadership: 'Leadership',
    communication: 'Communication',
    criticalThinking: 'Critical Thinking',
  };

  return labels[skill] ?? skill;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    paddingRight: Spacing.base,
  },
  greeting: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  headerSub: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: Colors.accentSubtle,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  heroCard: {
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    padding: Spacing.xl,
    gap: Spacing.base,
    ...Shadow.md,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
  },
  heroBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.tracking.wide,
  },
  heroTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  heroSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  heroStats: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
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
    fontSize: Typography.size.lg,
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
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: 4,
  },
  summaryLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.wider,
  },
  summaryValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
  },
  summaryHint: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  section: { gap: Spacing.md },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.widest,
  },
  momentumCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  momentumRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  momentumIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
  },
  momentumBody: {
    flex: 1,
    gap: 4,
  },
  momentumTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  momentumText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  focusWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  simCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  simHeader: {
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  simTags: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  simTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  simSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  simBody: {
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  simContext: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  simSkillsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  simSkillChip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
  },
  simSkillText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  stepList: {
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
  },
  stepTitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
  },
  quickTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  quickDesc: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});

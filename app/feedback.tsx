import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { MAIN_SIMULATION } from '../constants/simulation';
import SkillBar from '../components/ui/SkillBar';
import Button from '../components/ui/Button';
import { getScoreTier, SKILL_COLORS, SKILL_LABELS } from '../constants/skills';

export default function FeedbackScreen() {
  const { state } = useApp();
  const result = state.lastResult;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (!result) {
    router.replace('/(tabs)/home');
    return null;
  }

  const { scores, totalScore, feedback } = result;
  const topSkill = (Object.entries(scores) as [keyof typeof scores, number][])
    .sort(([, a], [, b]) => b - a)[0];
  const weakestSkill = (Object.entries(scores) as [keyof typeof scores, number][])
    .sort(([, a], [, b]) => a - b)[0];
  const overallTier = getScoreTier(totalScore);

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTag}>Simulation Complete</Text>
          <Text style={styles.headerTitle}>{MAIN_SIMULATION.title}</Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreTop}>
            <View>
              <Text style={styles.scoreLabel}>Overall Score</Text>
              <Text style={styles.scoreTier}>{overallTier.label}</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>{totalScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
          </View>

          <Text style={styles.scoreText}>{overallTier.description}</Text>

          <View style={styles.highlightRow}>
            <HighlightPill
              icon="trophy-outline"
              label="Strongest"
              value={SKILL_LABELS[topSkill[0]]}
              color={Colors.success}
            />
            <HighlightPill
              icon="build-outline"
              label="Focus area"
              value={SKILL_LABELS[weakestSkill[0]]}
              color={Colors.warning}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What This Run Says</Text>
          <View style={styles.summaryCard}>
            <SummaryRow
              title="Your advantage"
              text={`You looked strongest in ${SKILL_LABELS[topSkill[0]]}, which suggests you are comfortable weighing trade-offs and moving with intent in ambiguous situations.`}
            />
            <SummaryRow
              title="What to improve next"
              text={`Focus on ${SKILL_LABELS[weakestSkill[0]]}. The next jump in your score will likely come from making your reasoning and stakeholder handling more explicit.`}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Breakdown</Text>
          <View style={styles.skillsCard}>
            {(Object.keys(scores) as (keyof typeof scores)[]).map((skill, index) => {
              const tier = getScoreTier(scores[skill]);
              return (
                <View
                  key={skill}
                  style={[styles.skillRow, index < Object.keys(scores).length - 1 && styles.skillRowBorder]}
                >
                  <View style={styles.skillHeader}>
                    <SkillBar skill={skill} score={scores[skill]} animate showScore />
                    <View
                      style={[
                        styles.tierPill,
                        {
                          backgroundColor: `${tier.color}18`,
                          borderColor: `${tier.color}40`,
                        },
                      ]}
                    >
                      <Text style={[styles.tierText, { color: tier.color }]}>{tier.label}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI-style Feedback</Text>
          <View style={styles.feedbackList}>
            {feedback.map((item) => (
              <View key={item.skill} style={styles.feedbackItem}>
                <View
                  style={[
                    styles.feedbackAccent,
                    { backgroundColor: SKILL_COLORS[item.skill] ?? Colors.accent },
                  ]}
                />
                <View style={styles.feedbackBody}>
                  <Text style={styles.feedbackSkill}>{SKILL_LABELS[item.skill]}</Text>
                  <Text style={styles.feedbackText}>{item.insight}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            label="View My Profile"
            onPress={() => router.replace('/(tabs)/profile')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            label="Explore Network"
            onPress={() => router.replace('/(tabs)/network')}
            variant="secondary"
            size="lg"
            fullWidth
          />
          <Button
            label="Back to Home"
            onPress={() => router.replace('/(tabs)/home')}
            variant="ghost"
            size="md"
            fullWidth
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function HighlightPill({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[styles.highlightPill, { borderColor: `${color}40`, backgroundColor: `${color}12` }]}>
      <View style={styles.highlightTop}>
        <Ionicons name={icon} size={14} color={color} />
        <Text style={[styles.highlightLabel, { color }]}>{label}</Text>
      </View>
      <Text style={[styles.highlightValue, { color }]}>{value}</Text>
    </View>
  );
}

function SummaryRow({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryTitle}>{title}</Text>
      <Text style={styles.summaryText}>{text}</Text>
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
  header: { gap: Spacing.xs },
  headerTag: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.success,
    letterSpacing: Typography.tracking.widest,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  scoreCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  scoreTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    fontWeight: Typography.weight.medium,
  },
  scoreTier: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    marginTop: 4,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  scoreValue: {
    fontSize: 52,
    fontWeight: Typography.weight.extrabold,
    color: Colors.accent,
    lineHeight: 56,
    fontVariant: ['tabular-nums'],
  },
  scoreMax: {
    fontSize: Typography.size.base,
    color: Colors.textMuted,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  highlightPill: {
    flex: 1,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: 4,
  },
  highlightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  highlightLabel: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.wider,
  },
  highlightValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  section: { gap: Spacing.md },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.widest,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  summaryRow: {
    gap: 6,
  },
  summaryTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  summaryText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  skillsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  skillRow: {
    paddingBottom: Spacing.xl,
  },
  skillRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  skillHeader: {
    gap: Spacing.sm,
  },
  tierPill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
  },
  tierText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  feedbackList: {
    gap: Spacing.md,
  },
  feedbackItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  feedbackAccent: {
    width: 3,
    alignSelf: 'stretch',
  },
  feedbackBody: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.xs,
  },
  feedbackSkill: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  feedbackText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  actions: {
    gap: Spacing.sm,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import Button from '../../components/ui/Button';
import { SKILL_OPTIONS } from '../../constants/mockData';
import { useApp } from '../../context/AppContext';
import { SKILL_COLORS } from '../../constants/skills';
import { SkillKey } from '../../types';
import { notifySuccessAsync, notifyWarningAsync, selectionAsync } from '../../lib/haptics';

const MIN_SELECTIONS = 2;
const MAX_SELECTIONS = 4;

export default function SkillsScreen() {
  const { completeOnboarding, state } = useApp();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = async (key: string) => {
    const alreadySelected = selected.includes(key);

    if (!alreadySelected && selected.length >= MAX_SELECTIONS) {
      await notifyWarningAsync();
      return;
    }

    setSelected((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    await selectionAsync();
  };

  const handleFinish = async () => {
    await notifySuccessAsync();
    completeOnboarding({
      ...state.user,
      selectedSkills: selected,
    });
    router.replace('/(tabs)/home');
  };

  const canContinue = selected.length >= MIN_SELECTIONS && selected.length <= MAX_SELECTIONS;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progress}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <View style={styles.header}>
          <View style={styles.countBadge}>
            <Ionicons name="sparkles-outline" size={14} color={Colors.accent} />
            <Text style={styles.countBadgeText}>
              Choose {MIN_SELECTIONS}-{MAX_SELECTIONS} focus skills
            </Text>
          </View>
          <Text style={styles.title}>What do you want to get better at?</Text>
          <Text style={styles.subtitle}>
            We will tailor your feedback and profile around these areas, then track how your
            decisions improve over time.
          </Text>
        </View>

        <View style={styles.counterCard}>
          <Text style={styles.counterValue}>{selected.length}</Text>
          <Text style={styles.counterLabel}>selected so far</Text>
        </View>

        <View style={styles.cards}>
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = selected.includes(skill.key);
            const color = SKILL_COLORS[skill.key as SkillKey];

            return (
              <Pressable
                key={skill.key}
                style={({ pressed }) => [
                  styles.card,
                  isSelected && [styles.cardSelected, { borderColor: `${color}66` }],
                  pressed && { opacity: 0.9 },
                ]}
                onPress={() => toggle(skill.key)}
              >
                <View style={[styles.colorRail, { backgroundColor: color }]} />
                <View style={styles.cardBody}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardTitleWrap}>
                      <Text style={styles.skillName}>{skill.label}</Text>
                      <Text style={styles.skillDesc}>{skill.description}</Text>
                    </View>
                    <View
                      style={[
                        styles.checkmark,
                        isSelected && { backgroundColor: `${color}20`, borderColor: `${color}66` },
                      ]}
                    >
                      {isSelected ? (
                        <Ionicons name="checkmark" size={14} color={color} />
                      ) : (
                        <Ionicons name="add" size={14} color={Colors.textMuted} />
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            label="Start Learning"
            onPress={handleFinish}
            variant="primary"
            size="lg"
            fullWidth
            disabled={!canContinue}
          />
          <Text style={styles.helperText}>
            Select at least {MIN_SELECTIONS} skills to continue.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  progress: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  dot: {
    width: 24,
    height: 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.accent,
  },
  header: { gap: Spacing.sm },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: Colors.accentSubtle,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.18)',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
  },
  countBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  counterCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.extrabold,
    color: Colors.text,
  },
  counterLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  cards: {
    gap: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardSelected: {
    backgroundColor: Colors.surfaceElevated,
  },
  colorRail: {
    width: 4,
    alignSelf: 'stretch',
    opacity: 0.8,
  },
  cardBody: {
    flex: 1,
    padding: Spacing.base,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  cardTitleWrap: {
    flex: 1,
    gap: 4,
  },
  skillName: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  skillDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceElevated,
  },
  footer: {
    gap: Spacing.base,
    alignItems: 'center',
  },
  helperText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
});

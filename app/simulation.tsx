import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../constants/theme';
import { MAIN_SIMULATION, computeScores, generateFeedback } from '../constants/simulation';
import { useApp } from '../context/AppContext';
import { SimulationResult } from '../types';
import Button from '../components/ui/Button';
import { notifySuccessAsync, selectionAsync } from '../lib/haptics';

type Phase = 'context' | 'steps';

const STEP_GUIDANCE: Record<string, string> = {
  step_resources: 'The strongest answers balance runway protection with enough evidence gathering to avoid a blind pivot.',
  step_investor: 'This decision tests whether you can communicate hard truths clearly while keeping strategic credibility.',
  step_direction: 'Look for an option that protects trust without losing strategic momentum.',
};

export default function SimulationScreen() {
  const { saveResult } = useApp();
  const [phase, setPhase] = useState<Phase>('context');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const sim = MAIN_SIMULATION;
  const currentStep = sim.steps[currentStepIndex];
  const totalSteps = sim.steps.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleStartSim = async () => {
    await selectionAsync();
    setPhase('steps');
  };

  const handleSelectChoice = async (choiceId: string) => {
    setSelectedChoice(choiceId);
    await selectionAsync();
  };

  const handleNext = async () => {
    if (!selectedChoice) return;

    const updatedChoices = { ...choices, [currentStep.id]: selectedChoice };
    setChoices(updatedChoices);
    setSelectedChoice(null);

    if (isLastStep) {
      const scores = computeScores(updatedChoices);
      const totalScore = Math.round(
        (scores.strategy + scores.leadership + scores.communication + scores.criticalThinking) / 4
      );
      const result: SimulationResult = {
        simulationId: sim.id,
        completedAt: new Date().toISOString(),
        choices: updatedChoices,
        scores,
        totalScore,
        feedback: generateFeedback(scores),
      };

      await notifySuccessAsync();
      saveResult(result);
      router.replace('/feedback');
      return;
    }

    await selectionAsync();
    setCurrentStepIndex((index) => index + 1);
  };

  const handleExit = () => {
    Alert.alert('Exit Simulation', 'Your progress in this run will be lost. Exit anyway?', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Exit', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  if (phase === 'context') {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.nav}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>

          <LinearGradient
            colors={['#FFF2EB', '#F6F0E7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.contextHero}
          >
            <View style={styles.contextTag}>
              <Text style={styles.contextTagText}>Scenario Brief</Text>
            </View>
            <Text style={styles.contextTitle}>{sim.title}</Text>
            <Text style={styles.contextSubtitle}>{sim.subtitle}</Text>

            <View style={styles.metaRow}>
              <MetaBadge icon="speedometer-outline" label={sim.difficulty} />
              <MetaBadge icon="time-outline" label={sim.duration} />
              <MetaBadge icon="git-branch-outline" label={`${totalSteps} decisions`} />
            </View>
          </LinearGradient>

          <View style={styles.contextCard}>
            <Text style={styles.contextText}>{sim.context}</Text>
          </View>

          <View style={styles.stepsPreview}>
            <Text style={styles.stepsPreviewTitle}>What you will decide</Text>
            {sim.steps.map((step, index) => (
              <View key={step.id} style={styles.stepPreviewRow}>
                <View style={styles.stepPreviewNum}>
                  <Text style={styles.stepPreviewNumText}>{index + 1}</Text>
                </View>
                <View style={styles.stepPreviewBody}>
                  <Text style={styles.stepPreviewTitle}>{step.title}</Text>
                  <Text style={styles.stepPreviewQ} numberOfLines={2}>
                    {step.question}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Button
            label="Begin Simulation"
            onPress={handleStartSim}
            variant="primary"
            size="lg"
            fullWidth
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressRow}>
          <Pressable style={styles.closeBtn} onPress={handleExit}>
            <Ionicons name="close" size={18} color={Colors.textSecondary} />
          </Pressable>
          <View style={styles.progressTrack}>
            {sim.steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  index <= currentStepIndex && styles.progressSegmentActive,
                ]}
              />
            ))}
          </View>
          <Text style={styles.progressLabel}>
            {currentStepIndex + 1}/{totalSteps}
          </Text>
        </View>

        <View style={styles.stepHeader}>
          <Text style={styles.stepTag}>Decision {currentStepIndex + 1}</Text>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          <Text style={styles.stepQuestion}>{currentStep.question}</Text>
        </View>

        <View style={styles.contextCallout}>
          <Ionicons name="document-text-outline" size={18} color={Colors.textSecondary} />
          <Text style={styles.contextCalloutText}>{currentStep.context}</Text>
        </View>

        <View style={styles.guidanceCard}>
          <Text style={styles.guidanceLabel}>Decision lens</Text>
          <Text style={styles.guidanceText}>{STEP_GUIDANCE[currentStep.id]}</Text>
        </View>

        <View style={styles.choices}>
          {currentStep.choices.map((choice) => {
            const isSelected = selectedChoice === choice.id;

            return (
              <Pressable
                key={choice.id}
                style={({ pressed }) => [
                  styles.choiceCard,
                  isSelected && styles.choiceCardSelected,
                  pressed && !isSelected && { opacity: 0.88 },
                ]}
                onPress={() => handleSelectChoice(choice.id)}
              >
                <View style={[styles.choiceLetter, isSelected && styles.choiceLetterSelected]}>
                  <Text style={[styles.choiceLetterText, isSelected && styles.choiceLetterTextSelected]}>
                    {choice.id}
                  </Text>
                </View>
                <View style={styles.choiceBody}>
                  <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>
                    {choice.text}
                  </Text>
                  {isSelected ? (
                    <Text style={styles.choiceHint}>Selected for this decision</Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Button
          label={isLastStep ? 'Submit and View Results' : 'Next Decision'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedChoice}
        />

        {!selectedChoice ? <Text style={styles.hint}>Select one option to continue.</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function MetaBadge({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.metaBadge}>
      <Ionicons name={icon} size={12} color={Colors.textSecondary} />
      <Text style={styles.metaBadgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.base,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  nav: { flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  backText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  contextHero: {
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  contextTag: {
    backgroundColor: Colors.accentSubtle,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.18)',
  },
  contextTagText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
    letterSpacing: Typography.tracking.widest,
  },
  contextTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  contextSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
  },
  metaBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  contextCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    padding: Spacing.xl,
  },
  contextText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  stepsPreview: {
    gap: Spacing.md,
  },
  stepsPreviewTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.widest,
  },
  stepPreviewRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  stepPreviewNum: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepPreviewNumText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
  },
  stepPreviewBody: { flex: 1, gap: 4 },
  stepPreviewTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  stepPreviewQ: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressTrack: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
  },
  progressSegmentActive: {
    backgroundColor: Colors.accent,
  },
  progressLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    fontWeight: Typography.weight.semibold,
    fontVariant: ['tabular-nums'],
    minWidth: 28,
    textAlign: 'right',
  },
  stepHeader: { gap: Spacing.xs },
  stepTag: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
    letterSpacing: Typography.tracking.widest,
    textTransform: 'uppercase',
  },
  stepTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  stepQuestion: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  contextCallout: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  contextCalloutText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  guidanceCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: 6,
  },
  guidanceLabel: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.wider,
  },
  guidanceText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  choices: {
    gap: Spacing.md,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
  },
  choiceCardSelected: {
    backgroundColor: Colors.accentSubtle,
    borderColor: 'rgba(242,107,91,0.3)',
  },
  choiceLetter: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  choiceLetterSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  choiceLetterText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
  },
  choiceLetterTextSelected: {
    color: Colors.white,
  },
  choiceBody: {
    flex: 1,
    gap: 6,
    paddingTop: 2,
  },
  choiceText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  choiceTextSelected: {
    color: Colors.text,
  },
  choiceHint: {
    fontSize: Typography.size.xs,
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
  },
  hint: {
    textAlign: 'center',
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginTop: -Spacing.sm,
  },
});

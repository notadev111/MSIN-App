import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import Button from '../../components/ui/Button';
import { INTEREST_OPTIONS, GOAL_OPTIONS } from '../../constants/mockData';
import { useApp } from '../../context/AppContext';
import { notifySuccessAsync, selectionAsync } from '../../lib/haptics';

export default function SetupScreen() {
  const { updateUser } = useApp();
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleItem = async (
    item: string,
    list: string[],
    setter: (value: string[]) => void
  ) => {
    setter(list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]);
    await selectionAsync();
  };

  const canContinue = name.trim().length > 1 && selectedInterests.length >= 1;

  const handleContinue = async () => {
    await notifySuccessAsync();
    updateUser({
      name: name.trim(),
      university: university.trim(),
      interests: selectedInterests,
      goals: selectedGoals,
    });
    router.push('/(onboarding)/skills');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progress}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <View style={styles.header}>
            <View style={styles.badge}>
              <Ionicons name="person-outline" size={14} color={Colors.accent} />
              <Text style={styles.badgeText}>Step 1 of 2</Text>
            </View>
            <Text style={styles.title}>Tell us a little about you</Text>
            <Text style={styles.subtitle}>
              This shapes your recommendations, skill profile, and peer matching from the start.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Your name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex Johnson"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>University (optional)</Text>
            <TextInput
              style={styles.input}
              value={university}
              onChangeText={setUniversity}
              placeholder="e.g. University of Edinburgh"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Areas of interest</Text>
              <Text style={styles.countText}>{selectedInterests.length} selected</Text>
            </View>
            <Text style={styles.hint}>Select at least one</Text>
            <View style={styles.chips}>
              {INTEREST_OPTIONS.map((item) => {
                const selected = selectedInterests.includes(item);
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => toggleItem(item, selectedInterests, setSelectedInterests)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Your goals</Text>
              <Text style={styles.countText}>{selectedGoals.length} selected</Text>
            </View>
            <Text style={styles.hint}>Optional, but useful for matching</Text>
            <View style={styles.chips}>
              {GOAL_OPTIONS.map((item) => {
                const selected = selectedGoals.includes(item);
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => toggleItem(item, selectedGoals, setSelectedGoals)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={!canContinue}
            fullWidth
            size="lg"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
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
  header: {
    gap: Spacing.sm,
  },
  badge: {
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
  badgeText: {
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
  section: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  countText: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  hint: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginTop: -Spacing.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.size.base,
    color: Colors.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.accentSubtle,
    borderColor: 'rgba(242,107,91,0.3)',
  },
  chipText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  chipTextSelected: {
    color: Colors.accent,
  },
});

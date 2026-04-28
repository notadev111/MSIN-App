import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';

const SKILL_COLORS: Record<string, string> = {
  strategy: Colors.skillStrategy,
  leadership: Colors.skillLeadership,
  communication: Colors.skillCommunication,
  criticalThinking: Colors.skillCriticalThinking,
};

const SKILL_LABELS: Record<string, string> = {
  strategy: 'Strategy',
  leadership: 'Leadership',
  communication: 'Communication',
  criticalThinking: 'Critical Thinking',
};

interface SkillBarProps {
  skill: string;
  score: number;      // 0–100
  animate?: boolean;
  showScore?: boolean;
  compact?: boolean;
}

export default function SkillBar({
  skill,
  score,
  animate = true,
  showScore = true,
  compact = false,
}: SkillBarProps) {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(width, {
        toValue: score,
        duration: 800,
        delay: 100,
        useNativeDriver: false,
      }).start();
    } else {
      width.setValue(score);
    }
  }, [score]);

  const color = SKILL_COLORS[skill] ?? Colors.accent;
  const label = SKILL_LABELS[skill] ?? skill;

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View style={styles.header}>
        <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
        {showScore && (
          <Text style={[styles.score, { color }]}>
            {score}
          </Text>
        )}
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: color },
            {
              width: width.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  containerCompact: {
    gap: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.size.sm,
    color: Colors.text,
    fontWeight: Typography.weight.medium,
  },
  labelCompact: {
    fontSize: Typography.size.xs,
  },
  score: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    fontVariant: ['tabular-nums'],
  },
  track: {
    height: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});

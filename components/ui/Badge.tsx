import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.tracking.wide,
  },

  default: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  accent: {
    backgroundColor: Colors.accentSubtle,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.22)',
  },
  success: {
    backgroundColor: Colors.successSubtle,
    borderWidth: 1,
    borderColor: 'rgba(47,143,91,0.22)',
  },
  warning: {
    backgroundColor: Colors.warningSubtle,
    borderWidth: 1,
    borderColor: 'rgba(198,122,26,0.22)',
  },
  danger: {
    backgroundColor: Colors.dangerSubtle,
    borderWidth: 1,
    borderColor: 'rgba(198,80,70,0.22)',
  },

  text_default: { color: Colors.textSecondary },
  text_accent: { color: Colors.accent },
  text_success: { color: Colors.success },
  text_warning: { color: Colors.warning },
  text_danger: { color: Colors.danger },
});

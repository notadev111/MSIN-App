import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import Button from '../../components/ui/Button';

const FEATURES = [
  {
    icon: 'flash-outline' as const,
    title: 'Fast simulations',
    description: 'Practice high-stakes business decisions in minutes, not hours.',
  },
  {
    icon: 'analytics-outline' as const,
    title: 'AI-style feedback',
    description: 'See where your judgment is strong and where you should focus next.',
  },
  {
    icon: 'people-outline' as const,
    title: 'Peer network',
    description: 'Discover ambitious peers with complementary strengths.',
  },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <View style={styles.logoWrap}>
            <View style={styles.logoMark}>
              <Text style={styles.logoLetter}>M</Text>
            </View>
            <View>
              <Text style={styles.logoName}>MSIN</Text>
              <Text style={styles.logoTag}>Leadership simulation platform</Text>
            </View>
          </View>

          <LinearGradient
            colors={['#FFF2EB', '#F6F0E7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles-outline" size={14} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>Assessment-ready MVP</Text>
            </View>
            <Text style={styles.headline}>Build the judgment that defines great founders.</Text>
            <Text style={styles.subtext}>
              Run realistic business scenarios, get structured feedback, and build a profile that
              shows how you lead under pressure.
            </Text>

            <View style={styles.heroMetrics}>
              <Metric label="Sim length" value="3 min" />
              <Metric label="Skills tracked" value="4" />
              <Metric label="Peer matches" value="5" />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureIconWrap}>
                <Ionicons name={feature.icon} size={18} color={Colors.accent} />
              </View>
              <View style={styles.featureBody}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureLabel}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            label="Start Your Profile"
            onPress={() => router.push('/(onboarding)/setup')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Pressable onPress={() => router.push('/(onboarding)/setup')}>
            <Text style={styles.signinText}>Continue to setup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['2xl'],
    gap: Spacing.xl,
  },
  topSection: {
    gap: Spacing.xl,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.accent,
  },
  logoLetter: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extrabold,
    color: Colors.white,
    letterSpacing: -1,
  },
  logoName: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.wider,
  },
  logoTag: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  heroCard: {
    borderRadius: Radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.18)',
  },
  heroBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.accent,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.tracking.wide,
  },
  headline: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    lineHeight: 42,
    letterSpacing: Typography.tracking.tight,
  },
  subtext: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  heroMetrics: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  metricValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  features: {
    gap: Spacing.sm,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  featureIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentSubtle,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureBody: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: Typography.size.base,
    color: Colors.text,
    fontWeight: Typography.weight.semibold,
  },
  featureLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
    gap: Spacing.base,
    alignItems: 'center',
  },
  signinText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
});

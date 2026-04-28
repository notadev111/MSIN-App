import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Peer } from '../../types';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import SkillBar from './SkillBar';
import Badge from './Badge';
import { SKILL_LABELS, SKILL_COLORS } from '../../constants/skills';

interface PeerCardProps {
  peer: Peer;
  compatibility: number;
  reasons: string[];
  strongestSkill: keyof Peer['skills'];
  onConnect: () => void;
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

export default function PeerCard({
  peer,
  compatibility,
  reasons,
  strongestSkill,
  onConnect,
}: PeerCardProps) {
  const badgeVariant = compatibility >= 80 ? 'success' : compatibility >= 68 ? 'accent' : 'default';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar name={peer.name} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{peer.name}</Text>
            <Text style={styles.meta}>
              {peer.role} • {peer.university}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={onConnect}
          style={({ pressed }) => [
            styles.connectBtn,
            peer.connected && styles.connectBtnActive,
            pressed && { opacity: 0.76 },
          ]}
        >
          <Ionicons
            name={peer.connected ? 'checkmark-circle' : 'add-circle-outline'}
            size={16}
            color={peer.connected ? Colors.white : Colors.accent}
          />
          <Text style={[styles.connectLabel, peer.connected && styles.connectLabelActive]}>
            {peer.connected ? 'Connected' : 'Connect'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.badgeRow}>
        <Badge label={`${compatibility}% match`} variant={badgeVariant} />
        <Badge label={`Top strength: ${SKILL_LABELS[strongestSkill]}`} variant="default" />
      </View>

      <Text style={styles.bio} numberOfLines={3}>
        {peer.bio}
      </Text>

      <View style={styles.reasonRow}>
        {reasons.map((reason) => (
          <View key={reason} style={styles.reasonPill}>
            <Ionicons name="sparkles-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tags}>
        {peer.interests.slice(0, 3).map((tag) => (
          <Badge key={tag} label={tag} variant="default" />
        ))}
      </View>

      <View style={styles.skills}>
        <Text style={styles.skillsLabel}>Skill Profile</Text>
        {(Object.keys(peer.skills) as (keyof typeof peer.skills)[]).map((skill) => (
          <View key={skill} style={styles.skillRow}>
            <View style={[styles.skillAccent, { backgroundColor: SKILL_COLORS[skill] }]} />
            <View style={styles.skillBarWrap}>
              <SkillBar skill={skill} score={peer.skills[skill]} animate={false} compact />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: Radius.full,
    backgroundColor: Colors.accentSubtle,
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.accent,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  meta: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  connectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  connectBtnActive: {
    backgroundColor: Colors.accent,
  },
  connectLabel: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.accent,
  },
  connectLabelActive: {
    color: Colors.white,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  bio: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  reasonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  reasonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
  },
  reasonText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  skills: {
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  skillsLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    fontWeight: Typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: Typography.tracking.widest,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  skillAccent: {
    width: 4,
    height: 24,
    borderRadius: Radius.full,
  },
  skillBarWrap: {
    flex: 1,
  },
});

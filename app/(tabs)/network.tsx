import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import PeerCard from '../../components/ui/PeerCard';
import { getPeerCompatibility } from '../../constants/skills';
import { selectionAsync } from '../../lib/haptics';

type FilterMode = 'best' | 'connected' | 'all';

export default function NetworkScreen() {
  const { state, toggleConnect } = useApp();
  const { peers, user } = state;
  const [filter, setFilter] = useState<FilterMode>('best');

  const enrichedPeers = useMemo(
    () =>
      peers
        .map((peer) => ({
          peer,
          ...getPeerCompatibility(user, peer),
        }))
        .sort((a, b) => b.score - a.score),
    [peers, user]
  );

  const visiblePeers = enrichedPeers.filter((entry) => {
    if (filter === 'connected') {
      return entry.peer.connected;
    }

    if (filter === 'best') {
      return entry.score >= 70;
    }

    return true;
  });

  const connectedCount = peers.filter((peer) => peer.connected).length;

  const handleToggleConnect = async (peerId: string) => {
    await selectionAsync();
    toggleConnect(peerId);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Network</Text>
          <Text style={styles.subtitle}>
            Peers ranked by how well they complement your current focus.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="people-outline" size={18} color={Colors.accent} />
          </View>
          <View style={styles.summaryBody}>
            <Text style={styles.summaryTitle}>{connectedCount} active connections</Text>
            <Text style={styles.summaryText}>
              Best matches are based on your selected skills and each peer&apos;s strongest areas.
            </Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          <FilterChip
            label="Best matches"
            selected={filter === 'best'}
            onPress={() => setFilter('best')}
          />
          <FilterChip
            label="Connected"
            selected={filter === 'connected'}
            onPress={() => setFilter('connected')}
          />
          <FilterChip label="All peers" selected={filter === 'all'} onPress={() => setFilter('all')} />
        </View>

        <View style={styles.matchInfo}>
          <View style={styles.matchDot} />
          <Text style={styles.matchText}>
            Showing {visiblePeers.length} of {peers.length} peers
          </Text>
        </View>

        <View style={styles.cards}>
          {visiblePeers.map(({ peer, score, reasons, strongestSkill }) => (
            <PeerCard
              key={peer.id}
              peer={peer}
              compatibility={score}
              reasons={reasons}
              strongestSkill={strongestSkill}
              onConnect={() => handleToggleConnect(peer.id)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Complete more simulations to improve your match quality and unlock richer networking
            recommendations later.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.filterChip, selected && styles.filterChipSelected]} onPress={onPress}>
      <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing.base,
  },
  header: {
    gap: 4,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
    letterSpacing: Typography.tracking.tight,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242,107,91,0.16)',
  },
  summaryBody: {
    flex: 1,
    gap: 4,
  },
  summaryTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.text,
  },
  summaryText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipSelected: {
    backgroundColor: Colors.accentSubtle,
    borderColor: 'rgba(242,107,91,0.26)',
  },
  filterChipText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  filterChipTextSelected: {
    color: Colors.accent,
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  matchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  matchText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  cards: {
    gap: Spacing.md,
    paddingTop: Spacing.base,
  },
  footer: {
    paddingTop: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

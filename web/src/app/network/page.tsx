"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import { PeerCard } from "@/components/app/peer-card";
import { useAppState } from "@/components/providers/app-provider";
import { PageTransition } from "@/components/ui/page-transition";
import { peers } from "@/lib/demo-data";
import type { SkillId } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { label: string; value: "all" | SkillId }[] = [
  { label: "All", value: "all" },
  { label: "Strategy", value: "strategicJudgment" },
  { label: "Ethics", value: "ethicalReasoning" },
  { label: "Adaptability", value: "adaptability" },
];

export default function NetworkPage() {
  const router = useRouter();
  const { isHydrated, state, togglePeerConnection } = useAppState();
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["value"]>("all");

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) {
      router.replace("/");
    }
  }, [isHydrated, router, state.hasOnboarded]);

  const filteredPeers = useMemo(() => {
    if (activeFilter === "all") {
      return peers;
    }

    return peers.filter((peer) => peer.skills.includes(activeFilter));
  }, [activeFilter]);

  return (
    <AppShell title="Network" subtitle="Peers with adjacent strengths">
      <PageTransition>
        <div className="page-shell space-y-8">
          <section className="space-y-4">
            <div>
              <p className="section-label">Network</p>
              <h1 className="h1-text mt-2">Find someone relevant fast.</h1>
            </div>
            <div className="flex flex-wrap gap-4 border-b border-[var(--border-subtle)] pb-4">
              {filters.map((filter) => {
                const active = filter.value === activeFilter;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={cn(
                      "small-text border-b pb-2 transition",
                      active
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredPeers.map((peer) => (
              <PeerCard
                key={peer.id}
                peer={peer}
                connected={state.connectedPeerIds.includes(peer.id)}
                onToggle={() => togglePeerConnection(peer.id)}
                onMessage={() => router.push(`/messages?peer=${peer.id}`)}
              />
            ))}
          </section>
        </div>
      </PageTransition>
    </AppShell>
  );
}

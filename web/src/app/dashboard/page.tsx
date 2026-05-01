"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { AppShell } from "@/components/app/app-shell";
import { PeerCard } from "@/components/app/peer-card";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { SkillBar } from "@/components/ui/skill-bar";
import { peers } from "@/lib/demo-data";
import { dimensions } from "@/lib/scoring";
import { scenarios } from "@/lib/scenarios";

export default function DashboardPage() {
  const router = useRouter();
  const { isHydrated, latestResult, previousResult, state, togglePeerConnection } = useAppState();

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) {
      router.replace("/");
    }
  }, [isHydrated, router, state.hasOnboarded]);

  const topDimensions = useMemo(() => {
    if (!latestResult) {
      return dimensions.slice(0, 3).map((d) => ({ ...d, value: 0 }));
    }
    return [...dimensions]
      .map((d) => ({ ...d, value: latestResult.scores[d.id] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
  }, [latestResult]);

  const weakestDimension = useMemo(() => {
    if (!latestResult) return dimensions[0];
    return [...dimensions].sort(
      (a, b) => latestResult.scores[a.id] - latestResult.scores[b.id],
    )[0];
  }, [latestResult]);

  const suggestedPeers = peers.slice(0, 2);

  return (
    <AppShell title="Dashboard" subtitle="Progress at a glance">
      <PageTransition>
        <div className="page-shell space-y-8">

          {/* -- Overview header -------------------------------------------- */}
          <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="section-label">Overview</p>
              <h1 className="h1-text">
                Good morning, {state.user?.name ?? "there"}.
              </h1>
              <p className="body-text text-[var(--text-secondary)]">
                {latestResult
                  ? "Your latest run is in. Here is where your judgment looks strongest right now."
                  : "Complete your first simulation to start building a cognitive profile."}
              </p>
            </div>
            <p className="small-text text-[var(--text-secondary)]">
              {state.results.length} session
              {state.results.length === 1 ? "" : "s"}
            </p>
          </section>

          {/* -- Simulations ------------------------------------------------ */}
          <section className="space-y-4">
            <div>
              <p className="section-label">Simulations</p>
              <h2 className="h2-text mt-2">Choose a scenario</h2>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {scenarios.map((scenario, i) => {
                const completed = state.results.some((r) => r.scenarioId === scenario.id);
                return (
                  <div key={scenario.id} className="surface-card flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="section-label">{scenario.company}</p>
                        {completed && (
                          <span className="rounded-full bg-[var(--green)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--green)]">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-[15px] font-semibold text-[var(--text)] leading-snug">
                        {scenario.title}
                      </h3>
                      <p className="small-text text-[var(--text-secondary)]">
                        {scenario.subtitle}
                      </p>
                      <p className="small-text text-[var(--text-muted)]">
                        {scenario.rounds.length} rounds - {scenario.duration}
                      </p>
                    </div>
                    <Link href={`/simulation?id=${scenario.id}`}>
                      <Button variant={i === 0 ? "primary" : "secondary"} className="w-full">
                        {completed ? "Run again" : "Start"}
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* -- Skill profile + next focus ---------------------------------- */}
          <section className="grid gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="surface-card space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-label">Cognitive Profile</p>
                  <h2 className="h2-text mt-2">Top dimensions</h2>
                </div>
                <Link
                  href="/profile"
                  className="small-text inline-flex items-center gap-2 text-[var(--text-secondary)] transition hover:text-[var(--text)]"
                >
                  Full profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-5">
                {topDimensions.map((dim) => (
                  <SkillBar key={dim.id} label={dim.label} value={dim.value} />
                ))}
              </div>
            </div>

            <div className="surface-card flex flex-col justify-between gap-5">
              <div className="space-y-2">
                <p className="section-label">Next Focus</p>
                <h2 className="h2-text">Strengthen {weakestDimension.shortLabel}</h2>
                <p className="body-text text-[var(--text-secondary)]">
                  {latestResult
                    ? `Your pattern in the latest run suggests ${weakestDimension.label.toLowerCase()} is the most actionable area right now. Run the scenario again targeting this dimension.`
                    : "Complete your first simulation to get a personalised focus recommendation."}
                </p>
              </div>
              {latestResult && previousResult ? (
                <p className="small-text text-[var(--text-secondary)]">
                  Last delta:{" "}
                  {latestResult.delta !== undefined && latestResult.delta > 0 ? "+" : ""}
                  {latestResult.delta ?? "-"}
                </p>
              ) : null}
            </div>
          </section>

          {/* -- Suggested peers ---------------------------------------------- */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Suggested Peers</p>
                <h2 className="h2-text mt-2">People who match your profile</h2>
              </div>
              <Link
                href="/network"
                className="small-text inline-flex items-center gap-2 text-[var(--text-secondary)] transition hover:text-[var(--text)]"
              >
                Browse network
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {suggestedPeers.map((peer) => (
                <PeerCard
                  key={peer.id}
                  peer={peer}
                  compact
                  connected={state.connectedPeerIds.includes(peer.id)}
                  onToggle={() => togglePeerConnection(peer.id)}
                  onMessage={() => router.push(`/messages?peer=${peer.id}`)}
                />
              ))}
            </div>
          </section>

        </div>
      </PageTransition>
    </AppShell>
  );
}

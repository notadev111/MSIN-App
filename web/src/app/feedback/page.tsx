"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BookOpen, Eye, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

import { AppShell } from "@/components/app/app-shell";
import { ScoreCount } from "@/components/app/score-count";
import { DimensionBar } from "@/components/feedback/dimension-bar";
import { LeadershipStyleCard } from "@/components/feedback/leadership-style-card";
import { VroomCard } from "@/components/feedback/vroom-card";
import { BiasPanel } from "@/components/feedback/bias-panel";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { dimensions, scoreColor } from "@/lib/scoring";

export default function FeedbackPage() {
  const router = useRouter();
  const { isHydrated, latestResult, state } = useAppState();

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) { router.replace("/"); return; }
    if (!latestResult) { router.replace("/dashboard"); }
  }, [isHydrated, latestResult, router, state.hasOnboarded]);

  if (!isHydrated || !latestResult) return null;

  const deltaPositive = (latestResult.delta ?? 0) > 0;
  const deltaText = latestResult.delta !== undefined
    ? `${deltaPositive ? "+" : ""}${latestResult.delta} vs last session`
    : null;

  const topDimension = [...dimensions].sort(
    (a, b) => latestResult.scores[b.id] - latestResult.scores[a.id]
  )[0];

  const weakDimension = [...dimensions].sort(
    (a, b) => latestResult.scores[a.id] - latestResult.scores[b.id]
  )[0];

  return (
    <AppShell>
      <PageTransition>
        <div className="page-shell space-y-5">

          {/* -- Scenario label -------------------------------------------- */}
          <div className="space-y-1">
            <p className="section-label">Simulation complete</p>
            <h1 className="h1-text">{latestResult.scenarioTitle}</h1>
          </div>

          {/* -- Score + summary row --------------------------------------- */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Overall score */}
            <div className="surface-card flex flex-col justify-between gap-3">
              <p className="section-label">Overall Score</p>
              <div>
                <p
                  className="text-[64px] font-bold leading-none tracking-[-0.03em] tabular-nums"
                  style={{ color: scoreColor(latestResult.totalScore) }}
                >
                  <ScoreCount value={latestResult.totalScore} />
                </p>
                {deltaText && (
                  <span
                    className={clsx(
                      "mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      deltaPositive
                        ? "bg-[var(--green)]/10 text-[var(--green)]"
                        : "bg-[var(--red)]/10 text-[var(--red)]",
                    )}
                  >
                    {deltaText}
                  </span>
                )}
              </div>
            </div>

            {/* Strongest dimension */}
            <div className="surface-card space-y-2">
              <p className="section-label">Strongest</p>
              <p className="h2-text">{topDimension.shortLabel}</p>
              <p className="small-text text-[var(--text-secondary)]">
                {topDimension.framework}
              </p>
              <p
                className="text-[28px] font-bold tabular-nums"
                style={{ color: scoreColor(latestResult.scores[topDimension.id]) }}
              >
                {latestResult.scores[topDimension.id]}
              </p>
            </div>

            {/* Weakest dimension */}
            <div className="surface-card space-y-2">
              <p className="section-label">Develop Next</p>
              <p className="h2-text">{weakDimension.shortLabel}</p>
              <p className="small-text text-[var(--text-secondary)]">
                {weakDimension.framework}
              </p>
              <p
                className="text-[28px] font-bold tabular-nums"
                style={{ color: scoreColor(latestResult.scores[weakDimension.id]) }}
              >
                {latestResult.scores[weakDimension.id]}
              </p>
            </div>
          </div>

          {/* -- Summary insight ------------------------------------------- */}
          <div className="surface-card space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[var(--text-muted)]" />
              <p className="section-label">Assessment</p>
            </div>
            <p className="body-text text-[var(--text-secondary)]">
              {latestResult.summary}
            </p>
            <p className="body-text text-[var(--text-secondary)]">
              {latestResult.insight}
            </p>
          </div>

          {/* -- Two-col: dimensions + observational ----------------------- */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">

            {/* Dimension breakdown */}
            <div className="surface-card space-y-5">
              <div>
                <p className="section-label">Cognitive Profile</p>
                <h2 className="h2-text mt-1">5-Dimension Breakdown</h2>
              </div>
              <div className="space-y-5">
                {dimensions.map((dim) => (
                  <DimensionBar
                    key={dim.id}
                    label={dim.label}
                    framework={dim.framework}
                    value={latestResult.scores[dim.id]}
                  />
                ))}
              </div>
            </div>

            {/* Observational + docs */}
            <div className="surface-card space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[var(--text-muted)]" />
                <p className="section-label">Observational Intelligence</p>
              </div>

              {/* Docs read ring */}
              <div className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="var(--surface-raised)" strokeWidth="5" />
                    <circle
                      cx="28" cy="28" r="22" fill="none"
                      stroke="var(--accent)" strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * (1 - latestResult.docsReadCount / Math.max(latestResult.totalDocs, 1))}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[12px] font-bold text-[var(--text)]">
                    {latestResult.docsReadCount}/{latestResult.totalDocs}
                  </span>
                </div>
                <p className="small-text text-[var(--text-secondary)]">
                  documents reviewed before deciding
                </p>
              </div>

              <p className="small-text text-[var(--text-secondary)] leading-relaxed">
                {latestResult.docsReadCount >= latestResult.totalDocs * 0.75
                  ? "High observational depth. You gathered broad intelligence before committing - the OODA Loop's 'Observe' phase executed well."
                  : latestResult.docsReadCount >= latestResult.totalDocs * 0.4
                  ? "Selective observation. You filtered for expected relevance. Watch for confirmation bias in document selection."
                  : "Minimal intelligence gathering. Most decisions were made without reviewing available evidence. Speed or overconfidence may be the driver."}
              </p>

              <div className="border-t border-[var(--border-subtle)] pt-3">
                <p className="section-label mb-2">OODA Phase</p>
                {["Observe", "Orient", "Decide", "Act"].map((phase, i) => (
                  <div key={phase} className="flex items-center gap-2 py-1">
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full",
                        i < 2
                          ? latestResult.docsReadCount >= latestResult.totalDocs * 0.5
                            ? "bg-[var(--green)]"
                            : "bg-[var(--amber)]"
                          : "bg-[var(--accent)]",
                      )}
                    />
                    <span className="small-text text-[var(--text-secondary)]">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -- Leadership style ------------------------------------------- */}
          <div className="surface-card">
            <LeadershipStyleCard style={latestResult.leadershipStyle} />
          </div>

          {/* -- Vroom-Yetton ---------------------------------------------- */}
          <div className="surface-card">
            <VroomCard profile={latestResult.vroomProfile} />
          </div>

          {/* -- Bias analysis ---------------------------------------------- */}
          <div className="surface-card">
            <BiasPanel biases={latestResult.biasProfile} />
          </div>

          {/* -- Actions ---------------------------------------------------- */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/profile">
              <Button>
                <span>View full profile</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/network">
              <Button variant="secondary">Find matched peers</Button>
            </Link>
            <Link href="/simulation">
              <Button variant="ghost">Run again</Button>
            </Link>
          </div>

        </div>
      </PageTransition>
    </AppShell>
  );
}

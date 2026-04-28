"use client";

import { Suspense, useEffect, useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown, ChevronUp } from "lucide-react";

import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { StakeholderPanel } from "@/components/simulation/stakeholder-panel";
import { MacroSignalBanner } from "@/components/simulation/macro-signal";
import { EthicalPromptCard } from "@/components/simulation/ethical-prompt";
import { OptionCard } from "@/components/simulation/option-card";
import { getScenario, kartikaSucesssion } from "@/lib/scenarios";
import { cn } from "@/lib/utils";
import type { ScenarioDefinition } from "@/lib/types";

// ─── Phase state machine ──────────────────────────────────────────────────────
type Phase = "deciding" | "ethical" | "twist" | "complete";

interface SimState {
  roundIndex: number;
  phase: Phase;
  roundChoices: Record<string, string>;      // roundId → optionId
  ethicalChoices: Record<string, string>;    // roundId → ethicalOptionId
  docsRead: string[];
}

type SimAction =
  | { type: "select_option"; roundId: string; optionId: string }
  | { type: "confirm_option"; totalRounds: number; hasEthical: boolean; hasTwist: boolean }
  | { type: "confirm_ethical"; roundId: string; optionId: string; totalRounds: number; hasTwist: boolean }
  | { type: "confirm_twist"; totalRounds: number }
  | { type: "mark_doc_read"; docId: string };

function simReducer(state: SimState, action: SimAction): SimState {
  switch (action.type) {
    case "select_option":
      return {
        ...state,
        roundChoices: { ...state.roundChoices, [action.roundId]: action.optionId },
      };

    case "confirm_option": {
      if (action.hasEthical) return { ...state, phase: "ethical" };
      if (action.hasTwist) return { ...state, phase: "twist" };
      const isLast = state.roundIndex >= action.totalRounds - 1;
      if (isLast) return { ...state, phase: "complete" };
      return { ...state, roundIndex: state.roundIndex + 1, phase: "deciding" };
    }

    case "confirm_ethical": {
      const next = {
        ...state,
        ethicalChoices: { ...state.ethicalChoices, [action.roundId]: action.optionId },
      };
      if (action.hasTwist) return { ...next, phase: "twist" };
      const isLast = state.roundIndex >= action.totalRounds - 1;
      if (isLast) return { ...next, phase: "complete" };
      return { ...next, roundIndex: state.roundIndex + 1, phase: "deciding" };
    }

    case "confirm_twist": {
      const isLast = state.roundIndex >= action.totalRounds - 1;
      if (isLast) return { ...state, phase: "complete" };
      return { ...state, roundIndex: state.roundIndex + 1, phase: "deciding" };
    }

    case "mark_doc_read":
      if (state.docsRead.includes(action.docId)) return state;
      return { ...state, docsRead: [...state.docsRead, action.docId] };

    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SimulationPage() {
  return (
    <Suspense>
      <SimulationInner />
    </Suspense>
  );
}

function SimulationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isHydrated, state, completeSimulation } = useAppState();
  const [showContextMobile, setShowContextMobile] = useState(false);

  // Resolve scenario from ?id= param, fall back to Kartika
  const scenarioId = searchParams.get("id") ?? "";
  const scenario: ScenarioDefinition = getScenario(scenarioId) ?? kartikaSucesssion;

  const [sim, dispatch] = useReducer(simReducer, {
    roundIndex: 0,
    phase: "deciding",
    roundChoices: {},
    ethicalChoices: {},
    docsRead: [],
  });

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) router.replace("/");
  }, [isHydrated, router, state.hasOnboarded]);

  // When complete, save the result and navigate to feedback
  useEffect(() => {
    if (sim.phase !== "complete") return;

    const result = completeSimulation(
      scenario,
      sim.roundChoices,
      sim.ethicalChoices,
      sim.docsRead,
    );
    router.push(`/feedback?run=${result.id}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sim.phase]);

  const round = scenario.rounds[sim.roundIndex];
  if (!round) return null;

  const selectedOptionId = sim.roundChoices[round.id];
  const totalRounds = scenario.rounds.length;

  const docsReadSet = new Set(sim.docsRead);
  const handleDocRead = (docId: string) =>
    dispatch({ type: "mark_doc_read", docId });

  const handleSelectOption = (optionId: string) =>
    dispatch({ type: "select_option", roundId: round.id, optionId });

  const handleConfirm = () => {
    if (sim.phase === "deciding" && selectedOptionId) {
      dispatch({
        type: "confirm_option",
        totalRounds,
        hasEthical: !!round.ethicalPrompt,
        hasTwist: !!round.twist,
      });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--bg)]">
        {/* ── Top bar ────────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[rgba(247,243,238,0.92)] backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-8">
            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <p className="section-label">{scenario.company}</p>
                <p className="text-[13px] font-medium text-[var(--text)]">
                  {round.title}
                </p>
              </div>
              <div className="hidden items-center gap-1 sm:flex">
                {scenario.rounds.map((r, i) => (
                  <span
                    key={r.id}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i < sim.roundIndex && "w-4 bg-[var(--accent)]",
                      i === sim.roundIndex && "w-8 bg-[var(--accent)]",
                      i > sim.roundIndex && "w-1.5 bg-[var(--border)]",
                    )}
                  />
                ))}
              </div>
              <span className="section-label hidden sm:inline">
                {sim.roundIndex + 1} / {totalRounds}
              </span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[#c4b8ae] hover:text-[var(--text)]"
              aria-label="Exit simulation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Main layout ─────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-5 py-6 md:px-8 md:py-8">
          <div className="flex gap-8 lg:items-start">

            {/* ── Left: Context + Stakeholder docs ──────────────────────── */}
            <div className="w-full lg:sticky lg:top-[68px] lg:w-[42%] lg:max-h-[calc(100vh-84px)] lg:overflow-y-auto lg:pr-2 space-y-6">
              {/* Company context (collapsed on mobile by default) */}
              <div className="surface-card space-y-3">
                <button
                  type="button"
                  onClick={() => setShowContextMobile((v) => !v)}
                  className="flex w-full items-center justify-between gap-2 lg:cursor-default"
                >
                  <p className="section-label">Situation</p>
                  <span className="lg:hidden text-[var(--text-muted)]">
                    {showContextMobile ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <p className="body-text text-[var(--text)]">{round.situation}</p>

                {/* Context detail: always visible on desktop, toggle on mobile */}
                <div
                  className={cn(
                    "space-y-2 overflow-hidden transition-all",
                    showContextMobile || "hidden lg:block",
                  )}
                >
                  <p className="small-text text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {round.context}
                  </p>
                </div>
              </div>

              {/* Macro signal */}
              {round.macroSignal && (
                <MacroSignalBanner signal={round.macroSignal} />
              )}

              {/* Stakeholder documents */}
              <div className="surface-card">
                <StakeholderPanel
                  docs={round.stakeholderDocs}
                  docsRead={docsReadSet}
                  onDocRead={handleDocRead}
                />
              </div>
            </div>

            {/* ── Right: Decision interface ──────────────────────────────── */}
            <div className="w-full lg:w-[58%] space-y-6">

              {sim.phase === "deciding" && (
                <>
                  <div className="space-y-2">
                    <p className="section-label">Your Decision</p>
                    <h2 className="h2-text">{round.question}</h2>
                  </div>

                  <div className="space-y-3">
                    {round.options.map((option, i) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        index={i}
                        selected={selectedOptionId === option.id}
                        onSelect={() => handleSelectOption(option.id)}
                      />
                    ))}
                  </div>

                  <div className="border-t border-[var(--border-subtle)] pt-5">
                    {selectedOptionId ? (
                      <Button onClick={handleConfirm}>
                        Confirm decision
                      </Button>
                    ) : (
                      <p className="small-text text-[var(--text-muted)]">
                        Select an option to continue.
                      </p>
                    )}
                  </div>
                </>
              )}

              {sim.phase === "ethical" && round.ethicalPrompt && (
                <div className="surface-card">
                  <EthicalPromptCard
                    prompt={round.ethicalPrompt}
                    onConfirm={(optionId) =>
                      dispatch({
                        type: "confirm_ethical",
                        roundId: round.id,
                        optionId,
                        totalRounds,
                        hasTwist: !!round.twist,
                      })
                    }
                  />
                </div>
              )}

              {sim.phase === "twist" && round.twist && (
                <div className="surface-card space-y-5">
                  <div className="space-y-2">
                    <p className="section-label text-[var(--accent)]">
                      Situation Update
                    </p>
                    <h2 className="h2-text">The situation changes.</h2>
                  </div>
                  <p className="body-text text-[var(--text-secondary)] leading-relaxed">
                    {round.twist}
                  </p>
                  <p className="small-text text-[var(--text-muted)]">
                    Your decision has been recorded. This new information tests
                    your adaptability.
                  </p>
                  <Button
                    onClick={() => dispatch({ type: "confirm_twist", totalRounds })}
                  >
                    {sim.roundIndex < totalRounds - 1
                      ? `Continue to Round ${sim.roundIndex + 2}`
                      : "See your results"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

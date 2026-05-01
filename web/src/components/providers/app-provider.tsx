"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import { demoUser } from "@/lib/demo-data";
import { buildSimulationResult } from "@/lib/scoring";
import { STORAGE_KEY } from "@/lib/storage";
import type {
  AppState,
  PeerMessage,
  ScenarioDefinition,
  SimulationResult,
  SkillId,
  UserProfile,
} from "@/lib/types";

const initialState: AppState = {
  hasOnboarded: false,
  user: null,
  results: [],
  connectedPeerIds: [],
  messages: [],
};

type Action =
  | { type: "hydrate"; payload: AppState }
  | { type: "completeOnboarding"; payload: UserProfile }
  | { type: "addResult"; payload: SimulationResult }
  | { type: "togglePeer"; payload: string }
  | { type: "sendPeerMessage"; payload: PeerMessage }
  | { type: "seedReturningUser" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "hydrate":
      return {
        ...action.payload,
        results: action.payload.results ?? [],
        connectedPeerIds: action.payload.connectedPeerIds ?? [],
        messages: action.payload.messages ?? [],
      };
    case "completeOnboarding":
      return { ...state, hasOnboarded: true, user: action.payload };
    case "addResult":
      return { ...state, hasOnboarded: true, results: [...state.results, action.payload] };
    case "togglePeer":
      return {
        ...state,
        connectedPeerIds: state.connectedPeerIds.includes(action.payload)
          ? state.connectedPeerIds.filter((id) => id !== action.payload)
          : [...state.connectedPeerIds, action.payload],
      };
    case "sendPeerMessage":
      return {
        ...state,
        connectedPeerIds: state.connectedPeerIds.includes(action.payload.peerId)
          ? state.connectedPeerIds
          : [...state.connectedPeerIds, action.payload.peerId],
        messages: [...state.messages, action.payload],
      };
    case "seedReturningUser":
      return {
        hasOnboarded: true,
        user: {
          name: demoUser.name,
          university: demoUser.university,
          role: demoUser.role,
          focusSkills: [...demoUser.focusSkills],
        },
        results: [],
        connectedPeerIds: ["peer-1"],
        messages: [
          {
            id: "seed-message-1",
            peerId: "peer-1",
            sender: "peer",
            body: "Your succession scenario result was interesting. I took a more stakeholder-heavy path. Want to compare notes?",
            sentAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          },
        ],
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  isHydrated: boolean;
  latestResult: SimulationResult | null;
  previousResult: SimulationResult | null;
  completeOnboarding: (user: UserProfile) => void;
  completeSimulation: (
    scenario: ScenarioDefinition,
    roundChoices: Record<string, string>,
    ethicalChoices: Record<string, string>,
    docsRead: string[],
  ) => SimulationResult;
  togglePeerConnection: (peerId: string) => void;
  sendPeerMessage: (peerId: string, body: string) => void;
  seedReturningUser: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    try {
      if (stored) {
        dispatch({ type: "hydrate", payload: JSON.parse(stored) as AppState });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const completeSimulation = useCallback(
    (
      scenario: ScenarioDefinition,
      roundChoices: Record<string, string>,
      ethicalChoices: Record<string, string>,
      docsRead: string[],
    ): SimulationResult => {
      const latestScore = state.results.at(-1)?.totalScore;
      const result = buildSimulationResult(
        scenario,
        roundChoices,
        ethicalChoices,
        docsRead,
        latestScore,
      );
      dispatch({ type: "addResult", payload: result });
      return result;
    },
    [state.results],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      isHydrated,
      latestResult: state.results.at(-1) ?? null,
      previousResult: state.results.length > 1 ? (state.results.at(-2) ?? null) : null,
      completeOnboarding: (user) =>
        dispatch({
          type: "completeOnboarding",
          payload: { ...user, focusSkills: user.focusSkills.slice(0, 4) as SkillId[] },
        }),
      completeSimulation,
      togglePeerConnection: (peerId) =>
        dispatch({ type: "togglePeer", payload: peerId }),
      sendPeerMessage: (peerId, body) =>
        dispatch({
          type: "sendPeerMessage",
          payload: {
            id: `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            peerId,
            sender: "user",
            body,
            sentAt: new Date().toISOString(),
          },
        }),
      seedReturningUser: () => dispatch({ type: "seedReturningUser" }),
    }),
    [state, isHydrated, completeSimulation],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
}

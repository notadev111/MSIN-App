import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, SimulationResult, Peer, SkillScores } from '../types';
import { DEFAULT_USER, MOCK_PEERS } from '../constants/mockData';

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  user: User;
  lastResult: SimulationResult | null;
  peers: Peer[];
  isLoading: boolean;
}

const initialState: AppState = {
  user: DEFAULT_USER,
  lastResult: null,
  peers: MOCK_PEERS,
  isLoading: true,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'SET_USER'; payload: Partial<User> }
  | { type: 'COMPLETE_ONBOARDING'; payload: Partial<User> }
  | { type: 'SAVE_RESULT'; payload: SimulationResult }
  | { type: 'CONNECT_PEER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, isLoading: false };

    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload } };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: { ...state.user, ...action.payload, isOnboarded: true },
      };

    case 'SAVE_RESULT': {
      const result = action.payload;
      // Merge new scores into user's cumulative skills (simple average if already scored)
      const hasExisting = state.user.completedSimulations.length > 0;
      const newSkills: SkillScores = hasExisting
        ? {
            strategy: Math.round((state.user.skills.strategy + result.scores.strategy) / 2),
            leadership: Math.round((state.user.skills.leadership + result.scores.leadership) / 2),
            communication: Math.round(
              (state.user.skills.communication + result.scores.communication) / 2
            ),
            criticalThinking: Math.round(
              (state.user.skills.criticalThinking + result.scores.criticalThinking) / 2
            ),
          }
        : result.scores;

      return {
        ...state,
        lastResult: result,
        user: {
          ...state.user,
          skills: newSkills,
          completedSimulations: [
            ...new Set([...state.user.completedSimulations, result.simulationId]),
          ],
        },
      };
    }

    case 'CONNECT_PEER':
      return {
        ...state,
        peers: state.peers.map((p) =>
          p.id === action.payload ? { ...p, connected: !p.connected } : p
        ),
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Convenience actions
  updateUser: (data: Partial<User>) => void;
  completeOnboarding: (data: Partial<User>) => void;
  saveResult: (result: SimulationResult) => void;
  toggleConnect: (peerId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = '@msin_app_state';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'HYDRATE', payload: parsed });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  // Persist state changes (excluding isLoading and peers — peers are mock)
  useEffect(() => {
    if (!state.isLoading) {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user: state.user, lastResult: state.lastResult })
      ).catch(() => {});
    }
  }, [state.user, state.lastResult, state.isLoading]);

  const value: AppContextValue = {
    state,
    dispatch,
    updateUser: (data) => dispatch({ type: 'SET_USER', payload: data }),
    completeOnboarding: (data) => dispatch({ type: 'COMPLETE_ONBOARDING', payload: data }),
    saveResult: (result) => dispatch({ type: 'SAVE_RESULT', payload: result }),
    toggleConnect: (peerId) => dispatch({ type: 'CONNECT_PEER', payload: peerId }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

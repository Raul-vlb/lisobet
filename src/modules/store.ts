import type {
  AppState,
  AppUser,
  Prediction,
  MatchResult,
  StoreListener,
  StoreAction,
  GroupStanding,
  KnockoutMatch,
  BestThirdEntry,
  Team,
} from '../types/index.js';
import { GROUP_MATCHES } from '../data/groupMatches.js';
import { buildKnockoutMap } from '../data/knockoutBracket.js';

/**
 * Store Global — Lisobet
 *
 * Implementa o padrão Store (Observer) para gerenciamento de estado reativo.
 * Toda alteração de estado dispara atualização automática nos listeners.
 *
 * Estado imutável por referência — cada atualização produz novo estado.
 */

// Estado inicial
const initialState: AppState = {
  user: null,
  predictions: new Map(),
  matchResults: new Map(),
  groupMatches: GROUP_MATCHES,
  standings: new Map(),
  qualifiedTeams: new Map(),
  knockoutMatches: buildKnockoutMap(),
  bestThirds: [],
  champion: null,
  loading: true,
  initialized: false,
  error: null,
};

let state: AppState = { ...initialState };
const listeners = new Set<StoreListener>();

// ────────────────────────────────────────────────────────────
// SUBSCRIBE / NOTIFY
// ────────────────────────────────────────────────────────────

/**
 * Registra um listener para mudanças de estado.
 * Retorna função de cleanup.
 */
export function subscribe(listener: StoreListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(): void {
  const snapshot = getState();
  for (const listener of listeners) {
    listener(snapshot);
  }
}

// ────────────────────────────────────────────────────────────
// GETTERS
// ────────────────────────────────────────────────────────────

export function getState(): AppState {
  return state;
}

export function getUser(): AppUser | null {
  return state.user;
}

export function getPredictions(): Map<string, Prediction> {
  return state.predictions;
}

export function getStandings(): Map<string, GroupStanding[]> {
  return state.standings;
}

export function getKnockoutMatches(): Map<string, KnockoutMatch> {
  return state.knockoutMatches;
}

export function getBestThirds(): BestThirdEntry[] {
  return state.bestThirds;
}

export function getChampion(): Team | null {
  return state.champion;
}

// ────────────────────────────────────────────────────────────
// DISPATCH — única forma de mutar o estado
// ────────────────────────────────────────────────────────────

export function dispatch(action: StoreAction): void {
  state = reduce(state, action);

  // CORREÇÃO: Adicionado 'SET_MATCH_RESULTS' para forçar o recálculo da copa
  if (
    action.type === 'UPSERT_PREDICTION' || 
    action.type === 'SET_PREDICTIONS' || 
    action.type === 'SET_MATCH_RESULTS'
  ) {
    recalculate();
  } else {
    notify();
  }
}

function reduce(s: AppState, action: StoreAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...s, user: action.payload };

    case 'SET_PREDICTIONS':
      return { ...s, predictions: action.payload };
    
    case 'SET_MATCH_RESULTS':
      return { ...s, matchResults: action.payload };

    case 'UPSERT_PREDICTION': {
      const newPredictions = new Map(s.predictions);
      newPredictions.set(action.payload.matchId, action.payload);
      return { ...s, predictions: newPredictions };
    }

    case 'SET_LOADING':
      return { ...s, loading: action.payload };

    case 'SET_ERROR':
      return { ...s, error: action.payload };

    case 'SET_INITIALIZED':
      return { ...s, initialized: action.payload };

    case 'RECALCULATE':
      return s; // recalculate() aplica as mudanças

    default:
      return s;
  }
}

// ────────────────────────────────────────────────────────────
// RECALCULATE — orquestra o fluxo completo
// ────────────────────────────────────────────────────────────

/**
 * Recalcula standings, melhores terceiros e chaveamento.
 * Chamado automaticamente após qualquer alteração de palpite.
 */
export function recalculate(): void {
  // Import dinâmico para evitar ciclos
  import('../modules/worldCupResolver.js').then(({ resolveWorldCup }) => {
    const result = resolveWorldCup(state.predictions, state.matchResults, state.groupMatches);
    state = {
      ...state,
      standings: result.standings,
      bestThirds: result.bestThirds,
      qualifiedTeams: result.qualifiedTeams,
      knockoutMatches: result.knockoutMatches,
      champion: result.champion,
    };
    notify();
  });
}

// ────────────────────────────────────────────────────────────
// CONVENIENCE ACTIONS
// ────────────────────────────────────────────────────────────

export function setUser(user: AppUser | null): void {
  dispatch({ type: 'SET_USER', payload: user });
}

export function setPredictions(predictions: Map<string, Prediction>): void {
  dispatch({ type: 'SET_PREDICTIONS', payload: predictions });
}

export function upsertPrediction(prediction: Prediction): void {
  dispatch({ type: 'UPSERT_PREDICTION', payload: prediction });
}

export function setLoading(loading: boolean): void {
  dispatch({ type: 'SET_LOADING', payload: loading });
}

export function setError(error: string | null): void {
  dispatch({ type: 'SET_ERROR', payload: error });
}

export function setInitialized(initialized: boolean): void {
  dispatch({ type: 'SET_INITIALIZED', payload: initialized });
}

export function setMatchResults(results: Map<string, MatchResult>): void {
  dispatch({ type: 'SET_MATCH_RESULTS', payload: results });
}

import type { Prediction, DbPrediction } from '../types/index.js';
import { upsertPrediction, fetchPredictions } from './supabase.js';
import {
  loadPredictionsFromLocal,
  upsertLocalPrediction,
  mergePredictions,
} from './localStorage.js';

/**
 * Serviço de palpites — orquestra persistência local + Supabase.
 *
 * Fluxo de salvamento:
 *   1. Salva no localStorage (imediato, offline-first)
 *   2. Sincroniza com Supabase (se autenticado)
 *
 * Fluxo de carregamento:
 *   1. Carrega do localStorage
 *   2. Busca do Supabase
 *   3. Mescla (servidor prevalece em conflito)
 */

function dbToApp(db: DbPrediction): Prediction {
  return {
    id: db.id,
    userId: db.user_id,
    matchId: db.match_id,
    homeScore: db.home_score,
    awayScore: db.away_score,
    updatedAt: db.updated_at,
  };
}

/**
 * Salva um palpite localmente e tenta sincronizar com o servidor.
 */
export async function savePrediction(
  matchId: string,
  homeScore: number,
  awayScore: number,
  userId: string
): Promise<Prediction> {
  const prediction: Prediction = {
    userId,
    matchId,
    homeScore,
    awayScore,
    updatedAt: new Date().toISOString(),
  };

  // 1. Salva localmente (imediato)
  upsertLocalPrediction(prediction);

  // 2. Tenta sincronizar com Supabase
  try {
    const db = await upsertPrediction(matchId, homeScore, awayScore);
    const saved = dbToApp(db);
    upsertLocalPrediction(saved); // atualiza com o ID do banco
    return saved;
  } catch (err) {
    console.warn('[Predictions] Falha na sincronização remota:', err);
    return prediction;
  }
}

/**
 * Carrega palpites: mescla localStorage + Supabase.
 */
export async function loadPredictions(
  isAuthenticated: boolean
): Promise<Map<string, Prediction>> {
  const local = loadPredictionsFromLocal();

  if (!isAuthenticated) return local;

  try {
    const dbList = await fetchPredictions();
    const remote = new Map(
      dbList.map(db => [db.match_id, dbToApp(db)])
    );
    return mergePredictions(local, remote);
  } catch (err) {
    console.warn('[Predictions] Falha ao buscar do servidor:', err);
    return local;
  }
}

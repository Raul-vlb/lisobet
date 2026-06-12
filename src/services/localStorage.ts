import type { Prediction } from '../types/index.js';

const PREDICTIONS_KEY = 'lisobet:predictions:v1';

/**
 * Camada de persistência local (offline-first).
 * Mantém palpites no localStorage para funcionar sem conexão.
 */

export function loadPredictionsFromLocal(): Map<string, Prediction> {
  try {
    const raw = localStorage.getItem(PREDICTIONS_KEY);
    if (!raw) return new Map();
    const arr = JSON.parse(raw) as Prediction[];
    return new Map(arr.map(p => [p.matchId, p]));
  } catch {
    return new Map();
  }
}

export function savePredictionsToLocal(predictions: Map<string, Prediction>): void {
  try {
    const arr = [...predictions.values()];
    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(arr));
  } catch {
    // Ignora erros de quota ou privacidade
    console.warn('[LocalStorage] Falha ao salvar palpites');
  }
}

export function upsertLocalPrediction(prediction: Prediction): Map<string, Prediction> {
  const existing = loadPredictionsFromLocal();
  existing.set(prediction.matchId, prediction);
  savePredictionsToLocal(existing);
  return existing;
}

export function clearLocalPredictions(): void {
  localStorage.removeItem(PREDICTIONS_KEY);
}

/**
 * Mescla palpites do servidor com os locais.
 * Servidor tem prioridade (timestamp mais recente).
 */
export function mergePredictions(
  local: Map<string, Prediction>,
  remote: Map<string, Prediction>
): Map<string, Prediction> {
  const merged = new Map(local);
  for (const [matchId, remotePred] of remote) {
    const localPred = local.get(matchId);
    if (!localPred || !localPred.updatedAt || !remotePred.updatedAt) {
      merged.set(matchId, remotePred);
      continue;
    }
    const localTs = new Date(localPred.updatedAt).getTime();
    const remoteTs = new Date(remotePred.updatedAt).getTime();
    merged.set(matchId, remoteTs >= localTs ? remotePred : localPred);
  }
  return merged;
}

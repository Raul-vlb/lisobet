import type { Prediction, MatchResult } from '../types/index.js';

export interface UserScore {
  userId: string;
  name: string;
  score: number;
}

export function calculateUserScores(
  allPredictions: Map<string, Prediction>, // Assumindo que seu state.predictions é um Map
  matchResults: Map<string, MatchResult>,
  profiles: { id: string; name: string }[]
): UserScore[] {
  const scores = new Map<string, number>();

  // Iterar sobre todos os palpites do mapa
  for (const pred of allPredictions.values()) {
    const official = matchResults.get(pred.matchId);
    if (!official) continue;

    let points = 0;
    // Lógica: 3 pontos placar exato, 1 ponto vencedor
    if (pred.homeScore === official.homeScore && pred.awayScore === official.awayScore) {
      points = 3;
    } else if (Math.sign(pred.homeScore - pred.awayScore) === Math.sign(official.homeScore - official.awayScore)) {
      points = 1;
    }

    const current = scores.get(pred.userId) ?? 0;
    scores.set(pred.userId, current + points);
  }

  // Cria o mapa de nomes para busca rápida
  const nameMap = new Map(profiles.map(p => [p.id, p.name]));

  // Ordena
  return Array.from(scores.entries())
    .map(([userId, score]) => ({ 
      userId, 
      score, 
      name: nameMap.get(userId) || 'Usuário' 
    }))
    .sort((a, b) => b.score - a.score);

//   // Ordenar por pontuação (do maior para o menor)
//   return Array.from(scores.entries())
//     .map(([userId, score]) => ({ userId, score }))
//     .sort((a, b) => b.score - a.score);


}
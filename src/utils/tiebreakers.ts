import type { GroupStanding, Match, Prediction } from '../types/index.js';

/**
 * Critérios de desempate FIFA 2026 (Fase de Grupos)
 *
 * 1. Pontos
 * 2. Saldo de gols (geral)
 * 3. Gols marcados (geral)
 * 4. Pontos no confronto direto
 * 5. Saldo de gols no confronto direto
 * 6. Gols marcados no confronto direto
 * 7. Fair play (cartões amarelos = 1pt, vermelho direto = 3pt, amarelo+vermelho = 4pt)
 * 8. Sorteio
 */

export interface FairPlayScore {
  yellowCards: number;
  redCards: number;
  total: number; // menor = melhor
}

/**
 * Calcula o score de fair play (menor é melhor)
 */
export function calcFairPlay(standing: GroupStanding): number {
  return standing.yellowCards * 1 + standing.redCards * 3;
}

/**
 * Obtém resultados de confronto direto entre duas equipes específicas
 */
export function getHeadToHead(
  teamA: string,
  teamB: string,
  matches: Match[],
  predictions: Map<string, Prediction>
): { pointsA: number; goalDiffA: number; goalsForA: number } {
  let pointsA = 0;
  let goalDiffA = 0;
  let goalsForA = 0;

  for (const match of matches) {
    const prediction = predictions.get(match.id);
    if (!prediction) continue;

    const isAHome = match.homeTeam === teamA && match.awayTeam === teamB;
    const isAway  = match.homeTeam === teamB && match.awayTeam === teamA;

    if (!isAHome && !isAway) continue;

    const { homeScore, awayScore } = prediction;

    if (isAHome) {
      goalsForA  += homeScore;
      goalDiffA  += homeScore - awayScore;
      if (homeScore > awayScore) pointsA += 3;
      else if (homeScore === awayScore) pointsA += 1;
    } else {
      goalsForA  += awayScore;
      goalDiffA  += awayScore - homeScore;
      if (awayScore > homeScore) pointsA += 3;
      else if (awayScore === homeScore) pointsA += 1;
    }
  }

  return { pointsA, goalDiffA, goalsForA };
}

/**
 * Compara dois standings com todos os critérios de desempate.
 * Retorna negativo se A melhor, positivo se B melhor, 0 se igual.
 */
export function compareStandings(
  a: GroupStanding,
  b: GroupStanding,
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): number {
  // 1. Pontos
  if (b.points !== a.points) return b.points - a.points;

  // 2. Saldo de gols geral
  if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;

  // 3. Gols marcados geral
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

  // 4–6. Confronto direto
  const h2h = getHeadToHead(
    a.team.abbr,
    b.team.abbr,
    groupMatches,
    predictions
  );

  if (h2h.pointsA !== 0) return -h2h.pointsA; // A ganhou confronto direto
  if (h2h.goalDiffA !== 0) return -h2h.goalDiffA;
  if (h2h.goalsForA !== 0) return -h2h.goalsForA;

  // 7. Fair play (menor score = melhor)
  const fairPlayA = calcFairPlay(a);
  const fairPlayB = calcFairPlay(b);
  if (fairPlayA !== fairPlayB) return fairPlayA - fairPlayB;

  // 8. Sorteio (aleatorio, mas determinístico para a UI)
  return a.team.abbr.localeCompare(b.team.abbr);
}

/**
 * Ordena standings com todos os critérios de desempate.
 */
export function sortStandings(
  standings: GroupStanding[],
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): GroupStanding[] {
  return [...standings].sort((a, b) =>
    compareStandings(a, b, groupMatches, predictions)
  );
}

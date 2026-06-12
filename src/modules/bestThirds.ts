import type {
  GroupStanding,
  BestThirdEntry,
} from '../types/index.js';

/**
 * Módulo de Melhores Terceiros — FIFA 2026
 *
 * Identifica os terceiros colocados de cada grupo,
 * ordena pelos critérios FIFA e seleciona os 8 melhores
 * para o Round of 32.
 *
 * Critérios de desempate para melhores terceiros (FIFA):
 *   1. Pontos
 *   2. Saldo de gols
 *   3. Gols marcados
 *   4. Fair play (cartões)
 *   5. Ranking FIFA
 */

/**
 * Extrai o terceiro colocado de cada grupo a partir das standings.
 */
export function extractThirdPlaceTeams(
  standings: Map<string, GroupStanding[]>
): BestThirdEntry[] {
  const thirds: BestThirdEntry[] = [];

  for (const [group, groupStandings] of standings) {
    const third = groupStandings[2]; // índice 2 = 3° colocado
    if (!third) continue;

    thirds.push({
      team: third.team,
      group,
      points: third.points,
      goalDiff: third.goalDiff,
      goalsFor: third.goalsFor,
      goalsAgainst: third.goalsAgainst,
      yellowCards: third.yellowCards,
      redCards: third.redCards,
    });
  }

  return thirds;
}

/**
 * Ordena os melhores terceiros pelos critérios FIFA.
 * Retorna do melhor para o pior.
 */
export function rankThirdPlaceTeams(thirds: BestThirdEntry[]): BestThirdEntry[] {
  return [...thirds].sort((a, b) => {
    // 1. Pontos
    if (b.points !== a.points) return b.points - a.points;

    // 2. Saldo de gols
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;

    // 3. Gols marcados
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

    // 4. Fair play (menor = melhor)
    const fpA = a.yellowCards * 1 + a.redCards * 3;
    const fpB = b.yellowCards * 1 + b.redCards * 3;
    if (fpA !== fpB) return fpA - fpB;

    // 5. Ordem alfabética do grupo (desempate determinístico)
    return a.group.localeCompare(b.group);
  });
}

/**
 * Seleciona os 8 melhores terceiros do torneio.
 */
export function selectBestThirds(
  standings: Map<string, GroupStanding[]>
): BestThirdEntry[] {
  const allThirds = extractThirdPlaceTeams(standings);
  const ranked = rankThirdPlaceTeams(allThirds);
  return ranked.slice(0, 8);
}

/**
 * Verifica se todos os grupos têm pelo menos o 3° classificado
 * (ou seja, todos os grupos terminaram a fase de grupos).
 */
export function allGroupsHaveThirds(
  standings: Map<string, GroupStanding[]>
): boolean {
  for (const groupStandings of standings.values()) {
    if (groupStandings.length < 3) return false;
    const third = groupStandings[2];
    if (third.played === 0) return false; // grupo sem jogos
  }
  return true;
}

/**
 * Retorna label descritivo dos grupos dos melhores terceiros.
 * Exemplo: "A, B, C, D, F, G, H, I"
 */
export function getBestThirdsGroupLabel(thirds: BestThirdEntry[]): string {
  return thirds
    .map(t => t.group)
    .sort()
    .join(', ');
}

/**
 * Placeholder para estatísticas de corte dos melhores terceiros.
 */
export function getBestThirdsStats(): {
  cutoffPoints: number;
  cutoffGoalDiff: number;
} {
  return {
    cutoffPoints: 0,
    cutoffGoalDiff: 0,
  };
}

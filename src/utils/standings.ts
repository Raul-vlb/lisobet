import type { GroupStanding, Match, Prediction,MatchResult, Team } from '../types/index.js';
import { TEAMS, getTeamsByGroup, TEAM_BY_ABBR } from '../data/teams.js';
import { sortStandings } from './tiebreakers.js';


/**
 * Calcula os pontos que um usuário recebe em uma partida,
 * comparando o seu palpite (Prediction) com o placar real (MatchResult).
 * * Regras:
 * 3 Pontos = Acertou o placar exato (ex: apostou 2x1, jogo foi 2x1)
 * 1 Ponto  = Acertou o vencedor ou o empate, mas errou o placar
 * 0 Pontos = Errou o resultado da partida
 */
export function calculateUserPoints(prediction: Prediction | undefined, result: MatchResult | undefined): number {
  if (!prediction || !result) return 0;

  const { homeScore: ph, awayScore: pa } = prediction;
  const { homeScore: rh, awayScore: ra } = result;

  // Acertou o placar em cheio
  if (ph === rh && pa === ra) return 3;

  const predDiff = ph - pa;
  const resDiff = rh - ra;

  // Acertou a tendência (vitória mandante, vitória visitante ou empate)
  const homeWins = predDiff > 0 && resDiff > 0;
  const awayWins = predDiff < 0 && resDiff < 0;
  const drawMatch = predDiff === 0 && resDiff === 0;

  if (homeWins || awayWins || drawMatch) {
    return 1;
  }

  // Errou tudo
  return 0;
}

/**
 * Calcula a tabela de classificação de um grupo a partir dos palpites.
 */
export function calcGroupStandings(
  group: string,
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): GroupStanding[] {
  const teams = getTeamsByGroup(group);

  // Inicializa standings zerados
  const standingsMap = new Map<string, GroupStanding>(
    teams.map(team => [
      team.abbr,
      {
        team,
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDiff: 0,
        points: 0, yellowCards: 0, redCards: 0,
      },
    ])
  );

  // Processa cada jogo do grupo
  const matches = groupMatches.filter(m => m.group === group);
  for (const match of matches) {
    const prediction = predictions.get(match.id);
    if (!prediction) continue;

    const home = standingsMap.get(match.homeTeam);
    const away = standingsMap.get(match.awayTeam);
    if (!home || !away) continue;

    const { homeScore, awayScore } = prediction;

    // Gols
    home.goalsFor     += homeScore;
    home.goalsAgainst += awayScore;
    away.goalsFor     += awayScore;
    away.goalsAgainst += homeScore;

    // Jogos disputados
    home.played += 1;
    away.played += 1;

    // Resultado
    if (homeScore > awayScore) {
      home.won  += 1; home.points  += 3;
      away.lost += 1;
    } else if (homeScore < awayScore) {
      away.won  += 1; away.points  += 3;
      home.lost += 1;
    } else {
      home.drawn += 1; home.points += 1;
      away.drawn += 1; away.points += 1;
    }
  }

  // Calcula saldo de gols
  for (const standing of standingsMap.values()) {
    standing.goalDiff = standing.goalsFor - standing.goalsAgainst;
  }

  const raw = [...standingsMap.values()];
  const sorted = sortStandings(raw, matches, predictions);

  // Atribui posições
  return sorted.map((s, i) => ({ ...s, position: i + 1 }));
}

/**
 * Calcula standings de todos os grupos.
 */
export function calcAllStandings(
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): Map<string, GroupStanding[]> {
  const groups = [...new Set(TEAMS.map(t => t.group))].sort();
  const result = new Map<string, GroupStanding[]>();

  for (const group of groups) {
    result.set(group, calcGroupStandings(group, groupMatches, predictions));
  }

  return result;
}

/**
 * Retorna o vencedor e vice-líder de um grupo.
 */
export function getGroupQualifiers(standings: GroupStanding[]): {
  winner: Team | null;
  runnerUp: Team | null;
  third: Team | null;
} {
  return {
    winner:   standings[0]?.team ?? null,
    runnerUp: standings[1]?.team ?? null,
    third:    standings[2]?.team ?? null,
  };
}

/**
 * Verifica se todos os jogos de um grupo têm palpite.
 */
export function isGroupComplete(
  group: string,
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): boolean {
  return groupMatches
    .filter(m => m.group === group)
    .every(m => predictions.has(m.id));
}

/**
 * Conta quantos jogos de um grupo têm palpite.
 */
export function getGroupProgress(
  group: string,
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): { filled: number; total: number } {
  const matches = groupMatches.filter(m => m.group === group);
  const filled = matches.filter(m => predictions.has(m.id)).length;
  return { filled, total: matches.length };
}

/**
 * Retorna o time pelo abbr
 */
export function getTeamByAbbr(abbr: string): Team | undefined {
  return TEAM_BY_ABBR.get(abbr);
}

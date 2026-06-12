import { describe, it, expect } from 'vitest';
import { rankThirdPlaceTeams, selectBestThirds, extractThirdPlaceTeams } from '../modules/bestThirds.js';
import type { BestThirdEntry, GroupStanding } from '../types/index.js';
import { TEAM_BY_ABBR } from '../data/teams.js';

function makeThird(
  abbr: string,
  group: string,
  points: number,
  goalDiff = 0,
  goalsFor = 0,
  yellowCards = 0
): BestThirdEntry {
  return {
    team: TEAM_BY_ABBR.get(abbr)!,
    group,
    points,
    goalDiff,
    goalsFor,
    goalsAgainst: goalsFor - goalDiff,
    yellowCards,
    redCards: 0,
  };
}

function makeStandings(thirds: BestThirdEntry[]): Map<string, GroupStanding[]> {
  const map = new Map<string, GroupStanding[]>();
  for (const t of thirds) {
    const row: GroupStanding = {
      team: t.team,
      played: 3, won: 1, drawn: 0, lost: 2,
      goalsFor: t.goalsFor,
      goalsAgainst: t.goalsAgainst,
      goalDiff: t.goalDiff,
      points: t.points,
      yellowCards: t.yellowCards,
      redCards: t.redCards,
      position: 3,
    };
    // Stub: group has at least [1st, 2nd, 3rd]
    map.set(t.group, [
      { ...row, position: 1, points: row.points + 6, team: TEAM_BY_ABBR.get('ESP')! },
      { ...row, position: 2, points: row.points + 3, team: TEAM_BY_ABBR.get('URU')! },
      { ...row, position: 3 },
    ]);
  }
  return map;
}

describe('rankThirdPlaceTeams', () => {
  it('ordena por pontos decrescente', () => {
    const thirds = [
      makeThird('BRA', 'C', 4),
      makeThird('ARG', 'J', 7),
      makeThird('POR', 'K', 5),
    ];
    const ranked = rankThirdPlaceTeams(thirds);
    expect(ranked[0].team.abbr).toBe('ARG');
    expect(ranked[1].team.abbr).toBe('POR');
    expect(ranked[2].team.abbr).toBe('BRA');
  });

  it('desempata por saldo de gols', () => {
    const thirds = [
      makeThird('BRA', 'C', 4, 0),
      makeThird('ARG', 'J', 4, 3),
    ];
    const ranked = rankThirdPlaceTeams(thirds);
    expect(ranked[0].team.abbr).toBe('ARG');
  });

  it('desempata por gols marcados quando saldo igual', () => {
    const thirds = [
      makeThird('BRA', 'C', 4, 2, 4),
      makeThird('ARG', 'J', 4, 2, 6),
    ];
    const ranked = rankThirdPlaceTeams(thirds);
    expect(ranked[0].team.abbr).toBe('ARG');
  });

  it('desempata por fair play quando tudo igual', () => {
    const thirds = [
      makeThird('BRA', 'C', 4, 2, 4, 3), // 3 amarelos = 3pts fair play
      makeThird('ARG', 'J', 4, 2, 4, 1), // 1 amarelo  = 1pt
    ];
    const ranked = rankThirdPlaceTeams(thirds);
    expect(ranked[0].team.abbr).toBe('ARG'); // menos cartões = melhor
  });

  it('não muta o array original', () => {
    const thirds = [makeThird('BRA', 'C', 7), makeThird('ARG', 'J', 4)];
    const original = thirds[0];
    rankThirdPlaceTeams(thirds);
    expect(thirds[0]).toBe(original);
  });
});

describe('selectBestThirds', () => {
  it('seleciona exatamente 8 times quando há 12 terceiros', () => {
    const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    const teams  = ['MEX','CAN','BRA','USA','GER','NED','BEL','ESP','FRA','ARG','POR','ENG'];
    const thirds = groups.map((g, i) => makeThird(teams[i], g, i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 1));
    const standings = makeStandings(thirds);
    const best = selectBestThirds(standings);
    expect(best).toHaveLength(8);
  });

  it('retorna vazio quando não há palpites', () => {
    const map = new Map<string, GroupStanding[]>();
    const result = selectBestThirds(map);
    expect(result).toHaveLength(0);
  });

  it('os 8 selecionados têm os maiores pontos', () => {
    const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    const pts    = [7, 6, 5, 4, 3, 3, 2, 2, 1, 1, 0, 0];
    const teams  = ['MEX','CAN','BRA','USA','GER','NED','BEL','ESP','FRA','ARG','POR','ENG'];
    const thirds = groups.map((g, i) => makeThird(teams[i], g, pts[i]));
    const standings = makeStandings(thirds);
    const best = selectBestThirds(standings);

    const minPtsInBest = Math.min(...best.map(t => t.points));
    const maxPtsOut = thirds
      .filter(t => !best.find(b => b.team.abbr === t.team.abbr))
      .reduce((acc, t) => Math.max(acc, t.points), -Infinity);

    expect(minPtsInBest).toBeGreaterThanOrEqual(maxPtsOut);
  });
});

describe('extractThirdPlaceTeams', () => {
  it('extrai terceiro de cada grupo', () => {
    const thirds = [
      makeThird('BRA', 'C', 3),
      makeThird('ARG', 'J', 4),
    ];
    const standings = makeStandings(thirds);
    const extracted = extractThirdPlaceTeams(standings);
    expect(extracted.length).toBe(2);
    const abbrs = extracted.map(e => e.team.abbr);
    // Terceiros são os times nas posições 3 das fixtures
    expect(abbrs).toContain('BRA');
    expect(abbrs).toContain('ARG');
  });
});

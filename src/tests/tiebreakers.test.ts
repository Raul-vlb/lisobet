import { describe, it, expect } from 'vitest';
import { compareStandings, sortStandings } from '../utils/tiebreakers.js';
import type { GroupStanding, Match, Prediction } from '../types/index.js';
import { TEAM_BY_ABBR } from '../data/teams.js';

function makeStanding(abbr: string, overrides: Partial<GroupStanding> = {}): GroupStanding {
  const team = TEAM_BY_ABBR.get(abbr)!;
  return {
    team,
    played: 3, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDiff: 0,
    points: 0, yellowCards: 0, redCards: 0,
    ...overrides,
  };
}

const NO_MATCHES: Match[] = [];
const NO_PREDS = new Map<string, Prediction>();

describe('Critério 1 — Pontos', () => {
  it('time com mais pontos vem primeiro', () => {
    const a = makeStanding('BRA', { points: 9 });
    const b = makeStanding('ARG', { points: 6 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });

  it('mesmo pontos → passa para próximo critério', () => {
    const a = makeStanding('BRA', { points: 4, goalDiff: 3 });
    const b = makeStanding('ARG', { points: 4, goalDiff: 1 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });
});

describe('Critério 2 — Saldo de Gols', () => {
  it('maior saldo vem primeiro quando pontos iguais', () => {
    const a = makeStanding('BRA', { points: 4, goalDiff: 5 });
    const b = makeStanding('ARG', { points: 4, goalDiff: 2 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });

  it('saldo negativo piora a posição', () => {
    const a = makeStanding('BRA', { points: 3, goalDiff: -1 });
    const b = makeStanding('ARG', { points: 3, goalDiff: 2 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeGreaterThan(0);
  });
});

describe('Critério 3 — Gols Marcados', () => {
  it('mais gols marcados desempata quando saldo igual', () => {
    const a = makeStanding('BRA', { points: 4, goalDiff: 2, goalsFor: 5 });
    const b = makeStanding('ARG', { points: 4, goalDiff: 2, goalsFor: 3 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });
});

describe('Critério 7 — Fair Play', () => {
  it('menos cartões amarelos é melhor', () => {
    const a = makeStanding('BRA', { points: 4, goalDiff: 0, goalsFor: 3, yellowCards: 1 });
    const b = makeStanding('ARG', { points: 4, goalDiff: 0, goalsFor: 3, yellowCards: 3 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });

  it('cartão vermelho pesa mais que amarelo', () => {
    // A: 2 amarelos (2pts), B: 1 vermelho (3pts) — A é melhor
    const a = makeStanding('BRA', { points: 4, goalDiff: 0, goalsFor: 2, yellowCards: 2, redCards: 0 });
    const b = makeStanding('ARG', { points: 4, goalDiff: 0, goalsFor: 2, yellowCards: 0, redCards: 1 });
    expect(compareStandings(a, b, NO_MATCHES, NO_PREDS)).toBeLessThan(0);
  });
});

describe('sortStandings', () => {
  it('ordena array completo por todos critérios', () => {
    const standings = [
      makeStanding('BRA', { points: 4, goalDiff: 1 }),
      makeStanding('ARG', { points: 9, goalDiff: 6 }),
      makeStanding('POR', { points: 4, goalDiff: 3 }),
      makeStanding('GER', { points: 1, goalDiff: -5 }),
    ];

    const sorted = sortStandings(standings, NO_MATCHES, NO_PREDS);
    expect(sorted[0].team.abbr).toBe('ARG'); // 9 pts
    expect(sorted[1].team.abbr).toBe('POR'); // 4 pts, +3 sg
    expect(sorted[2].team.abbr).toBe('BRA'); // 4 pts, +1 sg
    expect(sorted[3].team.abbr).toBe('GER'); // 1 pt
  });

  it('não muta o array original', () => {
    const standings = [
      makeStanding('BRA', { points: 3 }),
      makeStanding('ARG', { points: 9 }),
    ];
    const original = [standings[0], standings[1]];
    sortStandings(standings, NO_MATCHES, NO_PREDS);
    expect(standings[0]).toBe(original[0]);
  });
});

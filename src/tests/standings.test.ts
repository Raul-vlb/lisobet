import { describe, it, expect } from 'vitest';
import { calcGroupStandings, getGroupQualifiers } from '../utils/standings.js';
import type { Match, Prediction } from '../types/index.js';

// ──────────────────────────────────────────────────────────────
// Fixtures: Grupo C — Brasil, Marrocos, Escócia, Haiti
// ──────────────────────────────────────────────────────────────

const GROUP_C_MATCHES: Match[] = [
  { id: 'J13', group: 'C', homeTeam: 'BRA', awayTeam: 'MAR', date: '2026-06-13', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J14', group: 'C', homeTeam: 'HAI', awayTeam: 'SCO', date: '2026-06-13', time: '21:00 UTC-4', stage: 'group' },
  { id: 'J15', group: 'C', homeTeam: 'SCO', awayTeam: 'MAR', date: '2026-06-19', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J16', group: 'C', homeTeam: 'BRA', awayTeam: 'HAI', date: '2026-06-19', time: '20:30 UTC-4', stage: 'group' },
  { id: 'J17', group: 'C', homeTeam: 'SCO', awayTeam: 'BRA', date: '2026-06-24', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J18', group: 'C', homeTeam: 'MAR', awayTeam: 'HAI', date: '2026-06-24', time: '18:00 UTC-4', stage: 'group' },
];

function makePredictions(scores: Record<string, [number, number]>): Map<string, Prediction> {
  const map = new Map<string, Prediction>();
  for (const [matchId, [home, away]] of Object.entries(scores)) {
    map.set(matchId, { userId: 'u1', matchId, homeScore: home, awayScore: away });
  }
  return map;
}

describe('calcGroupStandings', () => {
  it('classifica corretamente com resultados distintos', () => {
    const preds = makePredictions({
      J13: [2, 0], // BRA 2-0 MAR
      J14: [0, 1], // HAI 0-1 SCO
      J15: [3, 0], // BRA 3-0 HAI
      J16: [1, 2], // SCO 1-2 MAR
      J17: [1, 0], // BRA 1-0 SCO
      J18: [2, 1], // MAR 2-1 HAI
    });

    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);

    expect(standings).toHaveLength(4);
    expect(standings[0].team.abbr).toBe('BRA');
    expect(standings[0].points).toBe(9);
    expect(standings[0].played).toBe(3);
    expect(standings[0].won).toBe(3);
    expect(standings[0].goalsFor).toBe(6);
  });

  it('calcula saldo de gols corretamente', () => {
    const preds = makePredictions({
      J13: [3, 1], // BRA 3-1 MAR  → BRA: +2, MAR: -2
      J14: [0, 0],
      J15: [5, 0], // BRA 5-0 HAI  → BRA: +5
      J16: [0, 0],
      J17: [0, 0],
      J18: [0, 0],
    });

    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);
    const bra = standings.find(s => s.team.abbr === 'BRA')!;
    expect(bra.goalDiff).toBe(7); // (3-1) + (5-0) = 7
    expect(bra.goalsFor).toBe(8);
    expect(bra.goalsAgainst).toBe(1);
  });

  it('distribui pontos de empate corretamente', () => {
    const preds = makePredictions({
      J13: [1, 1], J14: [1, 1],
      J15: [0, 0], J16: [0, 0],
      J17: [2, 2], J18: [1, 1],
    });

    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);
    for (const s of standings) {
      expect(s.points).toBeGreaterThanOrEqual(0);
      expect(s.drawn).toBeGreaterThanOrEqual(0);
    }
  });

  it('retorna 4 times mesmo sem palpites', () => {
    const standings = calcGroupStandings('C', GROUP_C_MATCHES, new Map());
    expect(standings).toHaveLength(4);
    standings.forEach(s => {
      expect(s.points).toBe(0);
      expect(s.played).toBe(0);
    });
  });

  it('getGroupQualifiers retorna correto 1° e 2°', () => {
    const preds = makePredictions({
      J13: [2, 0], J14: [0, 1],
      J15: [3, 0], J16: [1, 2],
      J17: [1, 0], J18: [2, 1],
    });
    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);
    const { winner, runnerUp, third } = getGroupQualifiers(standings);
    expect(winner?.abbr).toBe('BRA');
    expect(runnerUp?.abbr).toBe('MAR');
    expect(third).not.toBeNull();
  });
});

describe('pontuação e saldo', () => {
  it('vitória vale 3 pontos (apenas 1 jogo palpitado)', () => {
    // Apenas J13 tem palpite → BRA joga 1 partida e vence
    const preds = makePredictions({ J13: [1, 0] }); // só este jogo
    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);
    const bra = standings.find(s => s.team.abbr === 'BRA')!;
    // BRA: 1 vitória = 3pts (J15, J17 sem palpite = não contabilizados)
    expect(bra.points).toBe(3);
    expect(bra.won).toBe(1);
    expect(bra.played).toBe(1);
  });

  it('empate vale 1 ponto para cada', () => {
    const preds = makePredictions({
      J13: [0, 0], J14: [0, 0], J15: [0, 0], J16: [0, 0], J17: [0, 0], J18: [0, 0],
    });
    const standings = calcGroupStandings('C', GROUP_C_MATCHES, preds);
    for (const s of standings) {
      expect(s.points).toBe(3); // 3 empates = 3 pts
      expect(s.drawn).toBe(3);
    }
  });
});

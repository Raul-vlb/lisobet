import { describe, it, expect } from 'vitest';
import { resolveWorldCup } from '../modules/worldCupResolver.js';
import { GROUP_MATCHES } from '../data/groupMatches.js';
import type { Prediction } from '../types/index.js';

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function pred(matchId: string, home: number, away: number): [string, Prediction] {
  return [matchId, { userId: 'test', matchId, homeScore: home, awayScore: away }];
}

function groupPreds(scores: Record<string, [number, number]>): Map<string, Prediction> {
  return new Map(Object.entries(scores).map(([id, [h, a]]) => pred(id, h, a)));
}

// Gera palpites de todos os 72 jogos da fase de grupos
// Mandante vence todos: 1-0
function allGroupPredictions(homeWinsAll = true): Map<string, Prediction> {
  const map = new Map<string, Prediction>();
  for (const m of GROUP_MATCHES) {
    map.set(m.id, {
      userId: 'test',
      matchId: m.id,
      homeScore: homeWinsAll ? 1 : 0,
      awayScore: 0,
    });
  }
  return map;
}

// ──────────────────────────────────────────────────────────────
// Testes de Classificação
// ──────────────────────────────────────────────────────────────

describe('resolveWorldCup — fase de grupos', () => {
  it('produz standings para todos os 12 grupos', () => {
    const preds = allGroupPredictions();
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    expect(result.standings.size).toBe(12);
  });

  it('cada grupo tem exatamente 4 times', () => {
    const preds = allGroupPredictions();
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    for (const [, gs] of result.standings) {
      expect(gs).toHaveLength(4);
    }
  });

  it('vencedor do grupo tem 9 pontos quando vence tudo', () => {
    const preds = allGroupPredictions(true); // mandante ganha todos
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    for (const [, gs] of result.standings) {
      expect(gs[0].points).toBe(9);
    }
  });

  it('classifica 12 vencedores e 12 vice-líderes', () => {
    const preds = allGroupPredictions();
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const winners   = [...result.qualifiedTeams.keys()].filter(k => k.startsWith('1'));
    const runnersUp = [...result.qualifiedTeams.keys()].filter(k => k.startsWith('2'));
    expect(winners).toHaveLength(12);
    expect(runnersUp).toHaveLength(12);
  });

  it('seleciona 8 melhores terceiros', () => {
    const preds = allGroupPredictions();
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    expect(result.bestThirds).toHaveLength(8);
  });
});

// ──────────────────────────────────────────────────────────────
// Testes do Mata-Mata
// ──────────────────────────────────────────────────────────────

describe('resolveWorldCup — mata-mata', () => {
  it('Round of 32 tem 16 partidas preenchidas com times', () => {
    const preds = allGroupPredictions();
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const r32 = [...result.knockoutMatches.values()].filter(m => m.stage === 'round32');
    expect(r32).toHaveLength(16);
    const filledHome = r32.filter(m => m.homeTeam !== null).length;
    const filledAway = r32.filter(m => m.awayTeam !== null).length;
    expect(filledHome).toBe(16);
    expect(filledAway).toBe(16);
  });

  it('propaga vencedores do R32 para o R16 após palpites', () => {
    const preds = allGroupPredictions();

    // Adicionar palpites do R32 (J73–J88): mandante sempre vence
    for (let i = 73; i <= 88; i++) {
      preds.set(`J${i}`, { userId: 'test', matchId: `J${i}`, homeScore: 2, awayScore: 0 });
    }

    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const r16 = [...result.knockoutMatches.values()].filter(m => m.stage === 'round16');

    // Ao menos parte dos R16 deve ter times preenchidos
    const filled = r16.filter(m => m.homeTeam !== null || m.awayTeam !== null);
    expect(filled.length).toBeGreaterThan(0);
  });

  it('define campeão quando todo o torneio tem palpites', () => {
    const preds = allGroupPredictions();
    // Todos mata-mata: mandante vence
    for (let i = 73; i <= 104; i++) {
      preds.set(`J${i}`, { userId: 'test', matchId: `J${i}`, homeScore: 1, awayScore: 0 });
    }

    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    expect(result.champion).not.toBeNull();
    expect(result.champion?.name).toBeTruthy();
  });

  it('campeão é o vencedor da final J104', () => {
    const preds = allGroupPredictions();
    for (let i = 73; i <= 104; i++) {
      preds.set(`J${i}`, { userId: 'test', matchId: `J${i}`, homeScore: 1, awayScore: 0 });
    }

    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const finalMatch = result.knockoutMatches.get('J104')!;
    expect(finalMatch.winner).not.toBeNull();
    expect(result.champion?.abbr).toBe(finalMatch.winner?.abbr);
  });

  it('sem palpites não há campeão', () => {
    const result = resolveWorldCup(new Map(), new Map(), GROUP_MATCHES);
    expect(result.champion).toBeNull();
  });

  it('vencedores de R32 não aparecem mais como perdedores', () => {
    const preds = allGroupPredictions();
    for (let i = 73; i <= 88; i++) {
      preds.set(`J${i}`, { userId: 'test', matchId: `J${i}`, homeScore: 3, awayScore: 1 });
    }
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const r32 = [...result.knockoutMatches.values()].filter(m => m.stage === 'round32');
    for (const m of r32) {
      if (m.winner) {
        expect(m.winner.abbr).not.toBe(m.loser?.abbr);
      }
    }
  });
});

// ──────────────────────────────────────────────────────────────
// Testes de Edge Cases
// ──────────────────────────────────────────────────────────────

describe('resolveWorldCup — edge cases', () => {
  it('palpites parciais não quebram a resolução', () => {
    const preds = groupPreds({ J1: [2, 1], J7: [0, 0] });
    expect(() => resolveWorldCup(preds, new Map(), GROUP_MATCHES)).not.toThrow();
  });

  it('placar 0-0 na fase de grupos é válido', () => {
    const preds = new Map<string, Prediction>();
    for (const m of GROUP_MATCHES) {
      preds.set(m.id, { userId: 'test', matchId: m.id, homeScore: 0, awayScore: 0 });
    }
    const result = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    // Com todos empates, pontuação igual → desempate por fair play / ordem alfabética
    expect(result.standings.size).toBe(12);
  });

  it('resultado idêntico em execuções consecutivas (determinismo)', () => {
    const preds = allGroupPredictions();
    const r1 = resolveWorldCup(preds, new Map(), GROUP_MATCHES);
    const r2 = resolveWorldCup(preds, new Map(), GROUP_MATCHES);

    const winner1 = r1.standings.get('A')?.[0].team.abbr;
    const winner2 = r2.standings.get('A')?.[0].team.abbr;
    expect(winner1).toBe(winner2);
  });
});

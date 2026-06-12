import { describe, it, expect } from 'vitest';
import {
  resolveSlotLabel,
  getTeamDisplayName,
  getTeamAbbr,
  isMatchAvailableForPrediction,
  getMatchesByStage,
  buildBracketColumns,
} from '../modules/bracketEngine.js';
import type { KnockoutMatch } from '../types/index.js';
import { buildKnockoutMap } from '../data/knockoutBracket.js';
import { TEAM_BY_ABBR } from '../data/teams.js';

const BRA = TEAM_BY_ABBR.get('BRA')!;
const ARG = TEAM_BY_ABBR.get('ARG')!;

function makeKnockout(overrides: Partial<KnockoutMatch> = {}): KnockoutMatch {
  return {
    id: 'J73', stage: 'round32',
    homeSlot: '2A', awaySlot: '2B',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J90', nextMatchSlot: 'home',
    loserMatchId: null,
    ...overrides,
  };
}

describe('resolveSlotLabel', () => {
  it('formata 1° de grupo corretamente', () => {
    expect(resolveSlotLabel('1A')).toBe('1° Grupo A');
    expect(resolveSlotLabel('1L')).toBe('1° Grupo L');
  });

  it('formata 2° de grupo corretamente', () => {
    expect(resolveSlotLabel('2C')).toBe('2° Grupo C');
  });

  it('formata melhor terceiro', () => {
    expect(resolveSlotLabel('3rd-ABCDF')).toContain('3°');
    expect(resolveSlotLabel('3rd-ABCDF')).toContain('A/B/C/D/F');
  });

  it('formata vencedor de partida', () => {
    expect(resolveSlotLabel('W73')).toBe('Venc. J73');
    expect(resolveSlotLabel('W104')).toBe('Venc. J104');
  });

  it('formata perdedor de partida', () => {
    expect(resolveSlotLabel('L101')).toContain('J101');
  });
});

describe('getTeamDisplayName', () => {
  it('retorna nome do time quando preenchido', () => {
    expect(getTeamDisplayName(BRA, '1C')).toBe('Brasil');
  });

  it('retorna label do slot quando não há time', () => {
    const label = getTeamDisplayName(null, '1A');
    expect(label).toBe('1° Grupo A');
  });
});

describe('getTeamAbbr', () => {
  it('retorna abbr do time quando preenchido', () => {
    expect(getTeamAbbr(BRA, '1C')).toBe('BRA');
  });

  it('retorna slot formatado quando sem time', () => {
    expect(getTeamAbbr(null, '1A')).toBe('1A');
    expect(getTeamAbbr(null, '3rd-ABCDF')).toBe('3rd');
    expect(getTeamAbbr(null, 'W73')).toBe('W73');
  });
});

describe('isMatchAvailableForPrediction', () => {
  it('disponível quando ambos os times definidos', () => {
    const match = makeKnockout({ homeTeam: BRA, awayTeam: ARG });
    expect(isMatchAvailableForPrediction(match)).toBe(true);
  });

  it('indisponível quando apenas um time', () => {
    expect(isMatchAvailableForPrediction(makeKnockout({ homeTeam: BRA }))).toBe(false);
    expect(isMatchAvailableForPrediction(makeKnockout({ awayTeam: ARG }))).toBe(false);
  });

  it('indisponível sem times', () => {
    expect(isMatchAvailableForPrediction(makeKnockout())).toBe(false);
  });
});

describe('getMatchesByStage', () => {
  it('filtra corretamente por estágio', () => {
    const map = buildKnockoutMap();
    const r32 = getMatchesByStage(map, 'round32');
    expect(r32).toHaveLength(16);

    const r16 = getMatchesByStage(map, 'round16');
    expect(r16).toHaveLength(8);

    const qf = getMatchesByStage(map, 'quarterfinal');
    expect(qf).toHaveLength(4);

    const sf = getMatchesByStage(map, 'semifinal');
    expect(sf).toHaveLength(2);

    const tp = getMatchesByStage(map, 'third_place');
    expect(tp).toHaveLength(1);

    const final = getMatchesByStage(map, 'final');
    expect(final).toHaveLength(1);
  });

  it('retorna partidas em ordem crescente de ID', () => {
    const map = buildKnockoutMap();
    const r32 = getMatchesByStage(map, 'round32');
    for (let i = 0; i < r32.length - 1; i++) {
      const a = parseInt(r32[i].id.slice(1));
      const b = parseInt(r32[i + 1].id.slice(1));
      expect(a).toBeLessThan(b);
    }
  });
});

describe('buildBracketColumns', () => {
  it('retorna 5 colunas (R32, R16, QF, SF, Final)', () => {
    const map = buildKnockoutMap();
    const cols = buildBracketColumns(map);
    expect(cols).toHaveLength(5);
  });

  it('cada coluna tem o label correto', () => {
    const map = buildKnockoutMap();
    const cols = buildBracketColumns(map);
    expect(cols[0].stage).toBe('round32');
    expect(cols[0].label).toBe('Oitavas');
    expect(cols[4].stage).toBe('final');
    expect(cols[4].label).toBe('Final');
  });

  it('total de partidas nas colunas é 31 (3° lugar é exibido separado)', () => {
    const map = buildKnockoutMap();
    const cols = buildBracketColumns(map);
    // Colunas: R32(16) + R16(8) + QF(4) + SF(2) + Final(1) = 31
    // J103 (3° lugar) é renderizado separado no knockout view
    const total = cols.reduce((acc, c) => acc + c.matches.length, 0);
    expect(total).toBe(31);
  });
});

describe('buildKnockoutMap — integridade dos dados', () => {
  it('possui exatamente 32 partidas (J73–J104)', () => {
    const map = buildKnockoutMap();
    expect(map.size).toBe(32);
  });

  it('todos os IDs estão no intervalo J73–J104', () => {
    const map = buildKnockoutMap();
    for (const id of map.keys()) {
      const n = parseInt(id.slice(1));
      expect(n).toBeGreaterThanOrEqual(73);
      expect(n).toBeLessThanOrEqual(104);
    }
  });

  it('nextMatchId aponta para partidas existentes', () => {
    const map = buildKnockoutMap();
    for (const match of map.values()) {
      if (match.nextMatchId) {
        expect(map.has(match.nextMatchId)).toBe(true);
      }
    }
  });
});

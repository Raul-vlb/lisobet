import type { KnockoutMatch } from '../types/index.js';

/**
 * Chaveamento oficial da Copa do Mundo FIFA 2026
 * Partidas J73 a J104 (32 jogos)
 *
 * Fonte: FIFA Official Competition Regulations / worldcupstats.football
 *
 * Estrutura:
 *   J73–J88  → Oitavas de final / Round of 32 (16 jogos)
 *   J89–J96  → Quartas-oitavas / Round of 16 (8 jogos)
 *   J97–J100 → Quartas de final (4 jogos)
 *   J101–J102 → Semifinais (2 jogos)
 *   J103     → Disputa do 3° lugar
 *   J104     → Final
 */
export const KNOCKOUT_BRACKET: KnockoutMatch[] = [
  // ════════════════════════════════════════════════════════
  // ROUND OF 32 — Oitavas de Final (J73–J88)
  // ════════════════════════════════════════════════════════

  {
    id: 'J73',
    stage: 'round32',
    homeSlot: '2A',
    awaySlot: '2B',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J90', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J74',
    stage: 'round32',
    homeSlot: '1E',
    awaySlot: '3rd-ABCDF',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J89', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J75',
    stage: 'round32',
    homeSlot: '1F',
    awaySlot: '2C',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J90', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J76',
    stage: 'round32',
    homeSlot: '1C',
    awaySlot: '2F',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J91', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J77',
    stage: 'round32',
    homeSlot: '1I',
    awaySlot: '3rd-CDFGH',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J89', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J78',
    stage: 'round32',
    homeSlot: '2E',
    awaySlot: '2I',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J91', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J79',
    stage: 'round32',
    homeSlot: '1A',
    awaySlot: '3rd-CEFHI',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J92', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J80',
    stage: 'round32',
    homeSlot: '1L',
    awaySlot: '3rd-EHIJK',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J92', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J81',
    stage: 'round32',
    homeSlot: '1D',
    awaySlot: '3rd-BEFIJ',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J94', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J82',
    stage: 'round32',
    homeSlot: '1G',
    awaySlot: '3rd-AEHIJ',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J94', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J83',
    stage: 'round32',
    homeSlot: '2K',
    awaySlot: '2L',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J93', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J84',
    stage: 'round32',
    homeSlot: '1H',
    awaySlot: '2J',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J93', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J85',
    stage: 'round32',
    homeSlot: '1B',
    awaySlot: '3rd-EFGIJ',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J96', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J86',
    stage: 'round32',
    homeSlot: '1J',
    awaySlot: '2H',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J95', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J87',
    stage: 'round32',
    homeSlot: '1K',
    awaySlot: '3rd-DEIJL',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J96', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J88',
    stage: 'round32',
    homeSlot: '2D',
    awaySlot: '2G',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J95', nextMatchSlot: 'away',
    loserMatchId: null,
  },

  // ════════════════════════════════════════════════════════
  // ROUND OF 16 — (J89–J96)
  // ════════════════════════════════════════════════════════

  {
    id: 'J89',
    stage: 'round16',
    homeSlot: 'W74',
    awaySlot: 'W77',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J97', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J90',
    stage: 'round16',
    homeSlot: 'W73',
    awaySlot: 'W75',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J97', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J91',
    stage: 'round16',
    homeSlot: 'W76',
    awaySlot: 'W78',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J99', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J92',
    stage: 'round16',
    homeSlot: 'W79',
    awaySlot: 'W80',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J99', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J93',
    stage: 'round16',
    homeSlot: 'W83',
    awaySlot: 'W84',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J98', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J94',
    stage: 'round16',
    homeSlot: 'W81',
    awaySlot: 'W82',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J98', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J95',
    stage: 'round16',
    homeSlot: 'W86',
    awaySlot: 'W88',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J100', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J96',
    stage: 'round16',
    homeSlot: 'W85',
    awaySlot: 'W87',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J100', nextMatchSlot: 'away',
    loserMatchId: null,
  },

  // ════════════════════════════════════════════════════════
  // QUARTAS DE FINAL (J97–J100)
  // ════════════════════════════════════════════════════════

  {
    id: 'J97',
    stage: 'quarterfinal',
    homeSlot: 'W89',
    awaySlot: 'W90',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J101', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J98',
    stage: 'quarterfinal',
    homeSlot: 'W93',
    awaySlot: 'W94',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J101', nextMatchSlot: 'away',
    loserMatchId: null,
  },
  {
    id: 'J99',
    stage: 'quarterfinal',
    homeSlot: 'W91',
    awaySlot: 'W92',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J102', nextMatchSlot: 'home',
    loserMatchId: null,
  },
  {
    id: 'J100',
    stage: 'quarterfinal',
    homeSlot: 'W95',
    awaySlot: 'W96',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J102', nextMatchSlot: 'away',
    loserMatchId: null,
  },

  // ════════════════════════════════════════════════════════
  // SEMIFINAIS (J101–J102)
  // ════════════════════════════════════════════════════════

  {
    id: 'J101',
    stage: 'semifinal',
    homeSlot: 'W97',
    awaySlot: 'W98',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J104', nextMatchSlot: 'home',
    loserMatchId: 'J103',
  },
  {
    id: 'J102',
    stage: 'semifinal',
    homeSlot: 'W99',
    awaySlot: 'W100',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: 'J104', nextMatchSlot: 'away',
    loserMatchId: 'J103',
  },

  // ════════════════════════════════════════════════════════
  // DISPUTA DO 3° LUGAR (J103)
  // ════════════════════════════════════════════════════════

  {
    id: 'J103',
    stage: 'third_place',
    homeSlot: 'L101',
    awaySlot: 'L102',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: null, nextMatchSlot: null,
    loserMatchId: null,
  },

  // ════════════════════════════════════════════════════════
  // FINAL (J104) — MetLife Stadium, East Rutherford, NJ
  // 19 de julho de 2026
  // ════════════════════════════════════════════════════════

  {
    id: 'J104',
    stage: 'final',
    homeSlot: 'W101',
    awaySlot: 'W102',
    homeTeam: null, awayTeam: null,
    homeScore: null, awayScore: null,
    winner: null, loser: null,
    nextMatchId: null, nextMatchSlot: null,
    loserMatchId: null,
  },
];

/** Mapa de id para KnockoutMatch */
export function buildKnockoutMap(): Map<string, KnockoutMatch> {
  return new Map(KNOCKOUT_BRACKET.map(m => [m.id, { ...m }]));
}

/** Retorna os slots de melhores terceiros e seus grupos elegíveis */
export const THIRD_PLACE_SLOTS = [
  { matchId: 'J74', eligibleGroups: ['A', 'B', 'C', 'D', 'F'] },
  { matchId: 'J77', eligibleGroups: ['C', 'D', 'F', 'G', 'H'] },
  { matchId: 'J79', eligibleGroups: ['C', 'E', 'F', 'H', 'I'] },
  { matchId: 'J80', eligibleGroups: ['E', 'H', 'I', 'J', 'K'] },
  { matchId: 'J81', eligibleGroups: ['B', 'E', 'F', 'I', 'J'] },
  { matchId: 'J82', eligibleGroups: ['A', 'E', 'H', 'I', 'J'] },
  { matchId: 'J85', eligibleGroups: ['E', 'F', 'G', 'I', 'J'] },
  { matchId: 'J87', eligibleGroups: ['D', 'E', 'I', 'J', 'L'] },
] as const;

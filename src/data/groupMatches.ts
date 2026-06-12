import type { Match } from '../types/index.js';

/**
 * 72 jogos da fase de grupos — Copa do Mundo FIFA 2026
 * Datas e confrontos conforme calendário oficial FIFA
 * Cada grupo possui 6 jogos (round-robin de 4 equipes)
 */
export const GROUP_MATCHES: Match[] = [
  // ── GRUPO A: México · Coreia do Sul · Rep. Tcheca · África do Sul ──
  { id: 'J1', group: 'A', homeTeam: 'MEX', awayTeam: 'RSA', date: '2026-06-11', time: '13:00 UTC-6', stage: 'group' },
  { id: 'J2', group: 'A', homeTeam: 'KOR', awayTeam: 'CZE', date: '2026-06-11', time: '20:00 UTC-6', stage: 'group' },
  { id: 'J3', group: 'A', homeTeam: 'CZE', awayTeam: 'RSA', date: '2026-06-18', time: '12:00 UTC-4', stage: 'group' },
  { id: 'J4', group: 'A', homeTeam: 'MEX', awayTeam: 'KOR', date: '2026-06-18', time: '19:00 UTC-6', stage: 'group' },
  { id: 'J5', group: 'A', homeTeam: 'CZE', awayTeam: 'MEX', date: '2026-06-24', time: '19:00 UTC-6', stage: 'group' },
  { id: 'J6', group: 'A', homeTeam: 'RSA', awayTeam: 'KOR', date: '2026-06-24', time: '19:00 UTC-6', stage: 'group' },
  
  // ── GRUPO B: Canadá · Bósnia · Qatar · Suíça ──────────────────────
  { id: 'J7', group: 'B', homeTeam: 'CAN', awayTeam: 'BIH', date: '2026-06-12', time: '15:00 UTC-4', stage: 'group' },
  { id: 'J8', group: 'B', homeTeam: 'QAT', awayTeam: 'SUI', date: '2026-06-13', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J9', group: 'B', homeTeam: 'SUI', awayTeam: 'BIH', date: '2026-06-18', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J10', group: 'B', homeTeam: 'CAN', awayTeam: 'QAT', date: '2026-06-18', time: '15:00 UTC-7', stage: 'group' },
  { id: 'J11', group: 'B', homeTeam: 'SUI', awayTeam: 'CAN', date: '2026-06-24', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J12', group: 'B', homeTeam: 'BIH', awayTeam: 'QAT', date: '2026-06-24', time: '12:00 UTC-7', stage: 'group' },
  
  // ── GRUPO C: Brasil · Marrocos · Escócia · Haiti ──────────────────
  { id: 'J13', group: 'C', homeTeam: 'BRA', awayTeam: 'MAR', date: '2026-06-13', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J14', group: 'C', homeTeam: 'HAI', awayTeam: 'SCO', date: '2026-06-13', time: '21:00 UTC-4', stage: 'group' },
  { id: 'J15', group: 'C', homeTeam: 'SCO', awayTeam: 'MAR', date: '2026-06-19', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J16', group: 'C', homeTeam: 'BRA', awayTeam: 'HAI', date: '2026-06-19', time: '20:30 UTC-4', stage: 'group' },
  { id: 'J17', group: 'C', homeTeam: 'SCO', awayTeam: 'BRA', date: '2026-06-24', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J18', group: 'C', homeTeam: 'MAR', awayTeam: 'HAI', date: '2026-06-24', time: '18:00 UTC-4', stage: 'group' },
  
  // ── GRUPO D: EUA · Paraguai · Austrália · Turquia ─────────────────
  { id: 'J19', group: 'D', homeTeam: 'USA', awayTeam: 'PAR', date: '2026-06-12', time: '18:00 UTC-7', stage: 'group' },
  { id: 'J20', group: 'D', homeTeam: 'AUS', awayTeam: 'TUR', date: '2026-06-13', time: '21:00 UTC-7', stage: 'group' },
  { id: 'J21', group: 'D', homeTeam: 'USA', awayTeam: 'AUS', date: '2026-06-19', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J22', group: 'D', homeTeam: 'TUR', awayTeam: 'PAR', date: '2026-06-19', time: '20:00 UTC-7', stage: 'group' },
  { id: 'J23', group: 'D', homeTeam: 'TUR', awayTeam: 'USA', date: '2026-06-25', time: '19:00 UTC-7', stage: 'group' },
  { id: 'J24', group: 'D', homeTeam: 'PAR', awayTeam: 'AUS', date: '2026-06-25', time: '19:00 UTC-7', stage: 'group' },
  
  // ── GRUPO E: Alemanha · Equador · C. Marfim · Curaçao ─────────────
  { id: 'J25', group: 'E', homeTeam: 'GER', awayTeam: 'CUW', date: '2026-06-14', time: '12:00 UTC-5', stage: 'group' },
  { id: 'J26', group: 'E', homeTeam: 'CIV', awayTeam: 'ECU', date: '2026-06-14', time: '19:00 UTC-4', stage: 'group' },
  { id: 'J27', group: 'E', homeTeam: 'GER', awayTeam: 'CIV', date: '2026-06-20', time: '16:00 UTC-4', stage: 'group' },
  { id: 'J28', group: 'E', homeTeam: 'ECU', awayTeam: 'CUW', date: '2026-06-20', time: '19:00 UTC-5', stage: 'group' },
  { id: 'J29', group: 'E', homeTeam: 'CUW', awayTeam: 'CIV', date: '2026-06-25', time: '16:00 UTC-4', stage: 'group' },
  { id: 'J30', group: 'E', homeTeam: 'ECU', awayTeam: 'GER', date: '2026-06-25', time: '16:00 UTC-4', stage: 'group' },
  
  // ── GRUPO F: Holanda · Japão · Tunísia · Suécia ───────────────────
  { id: 'J31', group: 'F', homeTeam: 'NED', awayTeam: 'JPN', date: '2026-06-14', time: '15:00 UTC-5', stage: 'group' },
  { id: 'J32', group: 'F', homeTeam: 'SWE', awayTeam: 'TUN', date: '2026-06-14', time: '20:00 UTC-6', stage: 'group' },
  { id: 'J33', group: 'F', homeTeam: 'NED', awayTeam: 'SWE', date: '2026-06-20', time: '12:00 UTC-5', stage: 'group' },
  { id: 'J34', group: 'F', homeTeam: 'TUN', awayTeam: 'JPN', date: '2026-06-20', time: '22:00 UTC-6', stage: 'group' },
  { id: 'J35', group: 'F', homeTeam: 'JPN', awayTeam: 'SWE', date: '2026-06-25', time: '18:00 UTC-5', stage: 'group' },
  { id: 'J36', group: 'F', homeTeam: 'TUN', awayTeam: 'NED', date: '2026-06-25', time: '18:00 UTC-5', stage: 'group' },
  
  // ── GRUPO G: Bélgica · Irã · Egito · Nova Zelândia ───────────────
  { id: 'J37', group: 'G', homeTeam: 'BEL', awayTeam: 'EGY', date: '2026-06-15', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J38', group: 'G', homeTeam: 'IRN', awayTeam: 'NZL', date: '2026-06-15', time: '18:00 UTC-7', stage: 'group' },
  { id: 'J39', group: 'G', homeTeam: 'BEL', awayTeam: 'IRN', date: '2026-06-21', time: '12:00 UTC-7', stage: 'group' },
  { id: 'J40', group: 'G', homeTeam: 'NZL', awayTeam: 'EGY', date: '2026-06-21', time: '18:00 UTC-7', stage: 'group' },
  { id: 'J41', group: 'G', homeTeam: 'EGY', awayTeam: 'IRN', date: '2026-06-26', time: '20:00 UTC-7', stage: 'group' },
  { id: 'J42', group: 'G', homeTeam: 'NZL', awayTeam: 'BEL', date: '2026-06-26', time: '20:00 UTC-7', stage: 'group' },
  
  // ── GRUPO H: Espanha · Uruguai · A. Saudita · Cabo Verde ──────────
  { id: 'J43', group: 'H', homeTeam: 'ESP', awayTeam: 'CPV', date: '2026-06-15', time: '12:00 UTC-4', stage: 'group' },
  { id: 'J44', group: 'H', homeTeam: 'KSA', awayTeam: 'URU', date: '2026-06-15', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J45', group: 'H', homeTeam: 'ESP', awayTeam: 'KSA', date: '2026-06-21', time: '12:00 UTC-4', stage: 'group' },
  { id: 'J46', group: 'H', homeTeam: 'URU', awayTeam: 'CPV', date: '2026-06-21', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J47', group: 'H', homeTeam: 'CPV', awayTeam: 'KSA', date: '2026-06-26', time: '19:00 UTC-5', stage: 'group' },
  { id: 'J48', group: 'H', homeTeam: 'URU', awayTeam: 'ESP', date: '2026-06-26', time: '18:00 UTC-6', stage: 'group' },
  
  // ── GRUPO I: França · Senegal · Noruega · Iraque ──────────────────
  { id: 'J49', group: 'I', homeTeam: 'FRA', awayTeam: 'SEN', date: '2026-06-16', time: '15:00 UTC-4', stage: 'group' },
  { id: 'J50', group: 'I', homeTeam: 'IRQ', awayTeam: 'NOR', date: '2026-06-16', time: '18:00 UTC-4', stage: 'group' },
  { id: 'J51', group: 'I', homeTeam: 'FRA', awayTeam: 'IRQ', date: '2026-06-22', time: '17:00 UTC-4', stage: 'group' },
  { id: 'J52', group: 'I', homeTeam: 'NOR', awayTeam: 'SEN', date: '2026-06-22', time: '20:00 UTC-4', stage: 'group' },
  { id: 'J53', group: 'I', homeTeam: 'NOR', awayTeam: 'FRA', date: '2026-06-26', time: '15:00 UTC-4', stage: 'group' },
  { id: 'J54', group: 'I', homeTeam: 'SEN', awayTeam: 'IRQ', date: '2026-06-26', time: '15:00 UTC-4', stage: 'group' },
  
  // ── GRUPO J: Argentina · Áustria · Argélia · Jordânia ─────────────
  { id: 'J55', group: 'J', homeTeam: 'ARG', awayTeam: 'ALG', date: '2026-06-16', time: '20:00 UTC-5', stage: 'group' },
  { id: 'J56', group: 'J', homeTeam: 'AUT', awayTeam: 'JOR', date: '2026-06-16', time: '21:00 UTC-7', stage: 'group' },
  { id: 'J57', group: 'J', homeTeam: 'ARG', awayTeam: 'AUT', date: '2026-06-22', time: '12:00 UTC-5', stage: 'group' },
  { id: 'J58', group: 'J', homeTeam: 'JOR', awayTeam: 'ALG', date: '2026-06-22', time: '20:00 UTC-7', stage: 'group' },
  { id: 'J59', group: 'J', homeTeam: 'ALG', awayTeam: 'AUT', date: '2026-06-27', time: '21:00 UTC-5', stage: 'group' },
  { id: 'J60', group: 'J', homeTeam: 'JOR', awayTeam: 'ARG', date: '2026-06-27', time: '21:00 UTC-5', stage: 'group' },
  
  // ── GRUPO K: Portugal · Colômbia · Uzbequistão · RD Congo ─────────
  { id: 'J61', group: 'K', homeTeam: 'POR', awayTeam: 'COD', date: '2026-06-17', time: '12:00 UTC-5', stage: 'group' },
  { id: 'J62', group: 'K', homeTeam: 'UZB', awayTeam: 'COL', date: '2026-06-17', time: '20:00 UTC-6', stage: 'group' },
  { id: 'J63', group: 'K', homeTeam: 'POR', awayTeam: 'UZB', date: '2026-06-23', time: '12:00 UTC-5', stage: 'group' },
  { id: 'J64', group: 'K', homeTeam: 'COL', awayTeam: 'COD', date: '2026-06-23', time: '20:00 UTC-6', stage: 'group' },
  { id: 'J65', group: 'K', homeTeam: 'COL', awayTeam: 'POR', date: '2026-06-27', time: '19:30 UTC-4', stage: 'group' },
  { id: 'J66', group: 'K', homeTeam: 'COD', awayTeam: 'UZB', date: '2026-06-27', time: '19:30 UTC-4', stage: 'group' },
  
  // ── GRUPO L: Inglaterra · Croácia · Gana · Panamá ─────────────────
  { id: 'J67', group: 'L', homeTeam: 'ENG', awayTeam: 'CRO', date: '2026-06-17', time: '15:00 UTC-5', stage: 'group' },
  { id: 'J68', group: 'L', homeTeam: 'GHA', awayTeam: 'PAN', date: '2026-06-17', time: '19:00 UTC-4', stage: 'group' },
  { id: 'J69', group: 'L', homeTeam: 'ENG', awayTeam: 'GHA', date: '2026-06-23', time: '16:00 UTC-4', stage: 'group' },
  { id: 'J70', group: 'L', homeTeam: 'PAN', awayTeam: 'CRO', date: '2026-06-23', time: '19:00 UTC-4', stage: 'group' },
  { id: 'J71', group: 'L', homeTeam: 'PAN', awayTeam: 'ENG', date: '2026-06-27', time: '17:00 UTC-4', stage: 'group' },
  { id: 'J72', group: 'L', homeTeam: 'CRO', awayTeam: 'GHA', date: '2026-06-27', time: '17:00 UTC-4', stage: 'group' },
];

/** Retorna os jogos de um grupo específico */
export function getMatchesByGroup(group: string): Match[] {
  return GROUP_MATCHES.filter(m => m.group === group);
}
import type { Team } from '../types/index.js';

/**
 * 48 seleções oficiais da Copa do Mundo FIFA 2026
 * Grupos determinados no sorteio de 5 de dezembro de 2025
 * Washington D.C., John F. Kennedy Center for the Performing Arts
 */
export const TEAMS: Team[] = [
  // ── GRUPO A ──────────────────────────────────────────────
  { id: 1,  name: 'México',       group: 'A', abbr: 'MEX', emoji: '🇲🇽' },
  { id: 2,  name: 'Coreia do Sul', group: 'A', abbr: 'KOR', emoji: '🇰🇷' },
  { id: 3,  name: 'República Tcheca', group: 'A', abbr: 'CZE', emoji: '🇨🇿' },
  { id: 4,  name: 'África do Sul', group: 'A', abbr: 'RSA', emoji: '🇿🇦' },

  // ── GRUPO B ──────────────────────────────────────────────
  { id: 5,  name: 'Canadá',       group: 'B', abbr: 'CAN', emoji: '🇨🇦' },
  { id: 6,  name: 'Bósnia e Herzegovina', group: 'B', abbr: 'BIH', emoji: '🇧🇦' },
  { id: 7,  name: 'Qatar',        group: 'B', abbr: 'QAT', emoji: '🇶🇦' },
  { id: 8,  name: 'Suíça',        group: 'B', abbr: 'SUI', emoji: '🇨🇭' },

  // ── GRUPO C ──────────────────────────────────────────────
  { id: 9,  name: 'Brasil',       group: 'C', abbr: 'BRA', emoji: '🇧🇷' },
  { id: 10, name: 'Marrocos',     group: 'C', abbr: 'MAR', emoji: '🇲🇦' },
  { id: 11, name: 'Escócia',      group: 'C', abbr: 'SCO', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 12, name: 'Haiti',        group: 'C', abbr: 'HAI', emoji: '🇭🇹' },

  // ── GRUPO D ──────────────────────────────────────────────
  { id: 13, name: 'Estados Unidos', group: 'D', abbr: 'USA', emoji: '🇺🇸' },
  { id: 14, name: 'Paraguai',     group: 'D', abbr: 'PAR', emoji: '🇵🇾' },
  { id: 15, name: 'Austrália',    group: 'D', abbr: 'AUS', emoji: '🇦🇺' },
  { id: 16, name: 'Turquia',      group: 'D', abbr: 'TUR', emoji: '🇹🇷' },

  // ── GRUPO E ──────────────────────────────────────────────
  { id: 17, name: 'Alemanha',     group: 'E', abbr: 'GER', emoji: '🇩🇪' },
  { id: 18, name: 'Equador',      group: 'E', abbr: 'ECU', emoji: '🇪🇨' },
  { id: 19, name: 'Costa do Marfim', group: 'E', abbr: 'CIV', emoji: '🇨🇮' },
  { id: 20, name: 'Curaçao',      group: 'E', abbr: 'CUW', emoji: '🇨🇼' },

  // ── GRUPO F ──────────────────────────────────────────────
  { id: 21, name: 'Holanda',      group: 'F', abbr: 'NED', emoji: '🇳🇱' },
  { id: 22, name: 'Japão',        group: 'F', abbr: 'JPN', emoji: '🇯🇵' },
  { id: 23, name: 'Tunísia',      group: 'F', abbr: 'TUN', emoji: '🇹🇳' },
  { id: 24, name: 'Suécia',       group: 'F', abbr: 'SWE', emoji: '🇸🇪' },

  // ── GRUPO G ──────────────────────────────────────────────
  { id: 25, name: 'Bélgica',      group: 'G', abbr: 'BEL', emoji: '🇧🇪' },
  { id: 26, name: 'Irã',          group: 'G', abbr: 'IRN', emoji: '🇮🇷' },
  { id: 27, name: 'Egito',        group: 'G', abbr: 'EGY', emoji: '🇪🇬' },
  { id: 28, name: 'Nova Zelândia', group: 'G', abbr: 'NZL', emoji: '🇳🇿' },

  // ── GRUPO H ──────────────────────────────────────────────
  { id: 29, name: 'Espanha',      group: 'H', abbr: 'ESP', emoji: '🇪🇸' },
  { id: 30, name: 'Uruguai',      group: 'H', abbr: 'URU', emoji: '🇺🇾' },
  { id: 31, name: 'Arábia Saudita', group: 'H', abbr: 'KSA', emoji: '🇸🇦' },
  { id: 32, name: 'Cabo Verde',   group: 'H', abbr: 'CPV', emoji: '🇨🇻' },

  // ── GRUPO I ──────────────────────────────────────────────
  { id: 33, name: 'França',       group: 'I', abbr: 'FRA', emoji: '🇫🇷' },
  { id: 34, name: 'Senegal',      group: 'I', abbr: 'SEN', emoji: '🇸🇳' },
  { id: 35, name: 'Noruega',      group: 'I', abbr: 'NOR', emoji: '🇳🇴' },
  { id: 36, name: 'Iraque',       group: 'I', abbr: 'IRQ', emoji: '🇮🇶' },

  // ── GRUPO J ──────────────────────────────────────────────
  { id: 37, name: 'Argentina',    group: 'J', abbr: 'ARG', emoji: '🇦🇷' },
  { id: 38, name: 'Áustria',      group: 'J', abbr: 'AUT', emoji: '🇦🇹' },
  { id: 39, name: 'Argélia',      group: 'J', abbr: 'ALG', emoji: '🇩🇿' },
  { id: 40, name: 'Jordânia',     group: 'J', abbr: 'JOR', emoji: '🇯🇴' },

  // ── GRUPO K ──────────────────────────────────────────────
  { id: 41, name: 'Portugal',     group: 'K', abbr: 'POR', emoji: '🇵🇹' },
  { id: 42, name: 'Colômbia',     group: 'K', abbr: 'COL', emoji: '🇨🇴' },
  { id: 43, name: 'Uzbequistão',  group: 'K', abbr: 'UZB', emoji: '🇺🇿' },
  { id: 44, name: 'Rep. Dem. do Congo', group: 'K', abbr: 'COD', emoji: '🇨🇩' },

  // ── GRUPO L ──────────────────────────────────────────────
  { id: 45, name: 'Inglaterra',   group: 'L', abbr: 'ENG', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 46, name: 'Croácia',      group: 'L', abbr: 'CRO', emoji: '🇭🇷' },
  { id: 47, name: 'Gana',         group: 'L', abbr: 'GHA', emoji: '🇬🇭' },
  { id: 48, name: 'Panamá',       group: 'L', abbr: 'PAN', emoji: '🇵🇦' },
];

/** Mapa de abbr para Team para acesso rápido O(1) */
export const TEAM_BY_ABBR = new Map<string, Team>(
  TEAMS.map(t => [t.abbr, t])
);

/** Mapa de id para Team */
export const TEAM_BY_ID = new Map<number, Team>(
  TEAMS.map(t => [t.id, t])
);

/** Grupos ordenados */
export const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'] as const;
export type GroupLetter = typeof GROUPS[number];

/** Retorna todas as seleções de um grupo */
export function getTeamsByGroup(group: string): Team[] {
  return TEAMS.filter(t => t.group === group);
}

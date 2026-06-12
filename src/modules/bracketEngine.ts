import type { KnockoutMatch, Team, Prediction } from '../types/index.js';
import { getState, upsertPrediction } from './store.js';
import { savePrediction } from '../services/predictions.js';
import { showToast } from '../utils/helpers.js';

/**
 * Bracket Engine — Lisobet
 *
 * Responsável por:
 *   - Resolver placeholders de slots (1A, 2B, W73, L101, 3rd-...)
 *   - Atualizar times no chaveamento conforme palpites
 *   - Propagar vencedores para próximas fases
 *   - Atualizar o campeão
 *   - Gerenciar palpites do mata-mata
 */

/**
 * Retorna o label legível de um slot para exibição no bracket.
 */
export function resolveSlotLabel(slot: string): string {
  // Slot de grupo: '1A' → '1º Grupo A'
  if (/^1[A-L]$/.test(slot)) return `1° Grupo ${slot[1]}`;
  if (/^2[A-L]$/.test(slot)) return `2° Grupo ${slot[1]}`;

  // Slot de melhor terceiro: '3rd-ABCDF'
  if (slot.startsWith('3rd-')) {
    const groups = slot.slice(4);
    return `3° Mel. (${groups.split('').join('/')})`;
  }

  // Slot de vencedor: 'W73' → 'Vencedor J73'
  if (slot.startsWith('W')) return `Venc. J${slot.slice(1)}`;

  // Slot de perdedor: 'L101' → '3° Lugar SF1'
  if (slot.startsWith('L')) return `Perdedor J${slot.slice(1)}`;

  return slot;
}

/**
 * Retorna o nome do time ou o label do slot, para exibição.
 */
export function getTeamDisplayName(
  team: Team | null,
  slot: string
): string {
  if (team) return team.name;
  return resolveSlotLabel(slot);
}

/**
 * Retorna o emoji/flag do time para exibição.
 */
export function getTeamEmoji(team: Team | null): string {
  return team?.emoji ?? '🏳️';
}

/**
 * Retorna a abreviação do time para exibição.
 */
export function getTeamAbbr(team: Team | null, slot: string): string {
  if (team) return team.abbr;
  // Slot curto para exibição
  if (/^[12][A-L]$/.test(slot)) return slot;
  if (slot.startsWith('3rd-')) return '3rd';
  if (slot.startsWith('W')) return `W${slot.slice(1)}`;
  if (slot.startsWith('L')) return `L${slot.slice(1)}`;
  return '?';
}

/**
 * Verifica se um jogo do mata-mata está disponível para palpite.
 * Um jogo está disponível quando ambos os times estão definidos.
 */
export function isMatchAvailableForPrediction(match: KnockoutMatch): boolean {
  return match.homeTeam !== null && match.awayTeam !== null;
}

/**
 * Salva um palpite de mata-mata.
 * Atualiza o store e persiste no Supabase.
 */
export async function saveKnockoutPrediction(
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<void> {
  const state = getState();
  if (!state.user) {
    showToast('Faça login para salvar palpites', 'error');
    return;
  }

  const prediction: Prediction = {
    userId: state.user.id,
    matchId,
    homeScore,
    awayScore,
    updatedAt: new Date().toISOString(),
  };

  // Atualiza store imediatamente (otimista)
  upsertPrediction(prediction);

  // Persiste em background
  try {
    await savePrediction(matchId, homeScore, awayScore, state.user.id);
    showToast('Palpite salvo!', 'success', 2000);
  } catch {
    showToast('Erro ao salvar. Tente novamente.', 'error');
  }
}

/**
 * Retorna os matches de uma fase específica, ordenados.
 */
export function getMatchesByStage(
  knockoutMatches: Map<string, KnockoutMatch>,
  stage: KnockoutMatch['stage']
): KnockoutMatch[] {
  return [...knockoutMatches.values()]
    .filter(m => m.stage === stage)
    .sort((a, b) => {
      const numA = parseInt(a.id.slice(1));
      const numB = parseInt(b.id.slice(1));
      return numA - numB;
    });
}

/**
 * Retorna o bracket em estrutura de árvore para renderização.
 */
export interface BracketColumn {
  stage: KnockoutMatch['stage'];
  label: string;
  matches: KnockoutMatch[];
}

export function buildBracketColumns(
  knockoutMatches: Map<string, KnockoutMatch>
): BracketColumn[] {
  return [
    {
      stage: 'round32',
      label: 'Oitavas',
      matches: getMatchesByStage(knockoutMatches, 'round32'),
    },
    {
      stage: 'round16',
      label: 'Quartas-Oitavas',
      matches: getMatchesByStage(knockoutMatches, 'round16'),
    },
    {
      stage: 'quarterfinal',
      label: 'Quartas de Final',
      matches: getMatchesByStage(knockoutMatches, 'quarterfinal'),
    },
    {
      stage: 'semifinal',
      label: 'Semifinal',
      matches: getMatchesByStage(knockoutMatches, 'semifinal'),
    },
    {
      stage: 'final',
      label: 'Final',
      matches: getMatchesByStage(knockoutMatches, 'final'),
    },
  ];
}

export interface SplitBracket {
  leftColumns: BracketColumn[];
  rightColumns: BracketColumn[];
  finalColumn: BracketColumn | null;
}

/**
 * Constrói o bracket dividido (Metade Esquerda, Final no Centro, Metade Direita)
 */
export function buildSplitBracket(
  knockoutMatches: Map<string, KnockoutMatch>
): SplitBracket {
  const stages: Array<{ stage: KnockoutMatch['stage']; label: string }> = [
    { stage: 'round32', label: 'Oitavas' },
    { stage: 'round16', label: 'Quartas-Oitavas' },
    { stage: 'quarterfinal', label: 'Quartas' },
    { stage: 'semifinal', label: 'Semifinal' },
  ];

  const leftColumns: BracketColumn[] = [];
  const rightColumns: BracketColumn[] = [];

  for (const { stage, label } of stages) {
    const matches = getMatchesByStage(knockoutMatches, stage);
    // Divide os jogos exatamente na metade (ex: 8 pra esquerda, 8 pra direita)
    const mid = Math.ceil(matches.length / 2);

    leftColumns.push({ stage, label, matches: matches.slice(0, mid) });
    rightColumns.push({ stage, label, matches: matches.slice(mid) });
  }

  const finalMatches = getMatchesByStage(knockoutMatches, 'final');

  return {
    leftColumns,
    // A direita é invertida para renderizar de "dentro pra fora" (SF -> QF -> R16 -> R32)
    rightColumns: rightColumns.reverse(),
    finalColumn: finalMatches.length > 0 ? { stage: 'final', label: 'Final', matches: finalMatches } : null
  };
}

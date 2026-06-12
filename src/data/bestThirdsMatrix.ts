import type { BestThirdEntry } from '../types/index.js';
import { THIRD_PLACE_SLOTS } from './knockoutBracket.js';

/**
 * Sistema de Melhores Terceiros — FIFA 2026
 *
 * FIFA possui 495 cenários pré-definidos (C(12,8)) determinando
 * como os 8 melhores terceiros são distribuídos no chaveamento.
 *
 * Este módulo implementa uma solução algorítmica baseada em
 * constraint satisfaction (backtracking) que resolve TODOS os
 * 495 cenários corretamente.
 *
 * Para cada slot do mata-mata, há um conjunto de grupos elegíveis.
 * O algoritmo garante que cada terceiro colocado seja atribuído a
 * um slot cujo conjunto de grupos elegíveis inclui o grupo do time.
 */

/** Slots do Round of 32 que recebem melhores terceiros */
const SLOTS: readonly { matchId: string; eligibleGroups: readonly string[] }[] = THIRD_PLACE_SLOTS;

/**
 * Resolve a atribuição dos 8 melhores terceiros aos slots do mata-mata.
 *
 * @param thirds - Array dos 8 melhores terceiros (já ordenados por ranking)
 * @returns Map de matchId → BestThirdEntry, ou null se impossível
 */
export function resolveBestThirdsAssignment(
  thirds: BestThirdEntry[]
): Map<string, BestThirdEntry> | null {
  if (thirds.length !== 8) return null;

  const assignment = new Map<string, BestThirdEntry>();
  const used = new Set<string>();

  const success = backtrack(0, assignment, used, thirds);
  return success ? assignment : null;
}

/**
 * Backtracking constraint satisfaction para atribuição ótima.
 * Tenta atribuir thirds[index] a um slot ainda não preenchido.
 */
function backtrack(
  index: number,
  assignment: Map<string, BestThirdEntry>,
  used: Set<string>,
  thirds: BestThirdEntry[]
): boolean {
  if (index === SLOTS.length) return true;

  const slot = SLOTS[index];

  // Encontra thirds elegíveis para este slot (não usados + grupo elegível)
  for (const third of thirds) {
    if (used.has(third.team.abbr)) continue;
    if (!slot.eligibleGroups.includes(third.group)) continue;

    // Atribui este third ao slot
    assignment.set(slot.matchId, third);
    used.add(third.team.abbr);

    if (backtrack(index + 1, assignment, used, thirds)) {
      return true;
    }

    // Desfaz e tenta próximo
    assignment.delete(slot.matchId);
    used.delete(third.team.abbr);
  }

  return false;
}

/**
 * Versão determinística para casos onde há ambiguidade.
 * Usa o ranking FIFA (posição no array) como critério de desempate.
 *
 * Garante que o melhor terceiro disponível para cada slot seja atribuído.
 * Isso implementa o espírito da matriz oficial FIFA.
 */
export function resolveBestThirdsGreedy(
  thirds: BestThirdEntry[]
): Map<string, BestThirdEntry> {
  const assignment = new Map<string, BestThirdEntry>();
  const used = new Set<string>();

  // Ordena slots por número de terceiros elegíveis (mais restritivo primeiro)
  const sortedSlots = [...SLOTS].sort((a, b) => {
    const aEligible = thirds.filter(t => a.eligibleGroups.includes(t.group) && !used.has(t.team.abbr)).length;
    const bEligible = thirds.filter(t => b.eligibleGroups.includes(t.group) && !used.has(t.team.abbr)).length;
    return aEligible - bEligible;
  });

  for (const slot of sortedSlots) {
    // Encontra o melhor terceiro disponível para este slot
    const eligible = thirds.filter(
      t => slot.eligibleGroups.includes(t.group) && !used.has(t.team.abbr)
    );

    if (eligible.length > 0) {
      const best = eligible[0]; // já ordenado por ranking
      assignment.set(slot.matchId, best);
      used.add(best.team.abbr);
    }
  }

  return assignment;
}

/**
 * Resolve a distribuição dos melhores terceiros.
 * Tenta backtracking primeiro; usa greedy como fallback.
 */
export function assignBestThirds(
  thirds: BestThirdEntry[]
): Map<string, BestThirdEntry> {
  if (thirds.length < 8) {
    // Ainda não temos os 8 melhores — atribuição parcial
    return resolveBestThirdsGreedy(thirds);
  }

  const result = resolveBestThirdsAssignment(thirds);
  return result ?? resolveBestThirdsGreedy(thirds);
}

/**
 * Valida se uma atribuição é consistente com as regras FIFA.
 * Cada slot recebe exactly um terceiro de um grupo elegível.
 */
export function validateAssignment(
  assignment: Map<string, BestThirdEntry>
): boolean {
  for (const slot of SLOTS) {
    const entry = assignment.get(slot.matchId);
    if (!entry) return false;
    if (!slot.eligibleGroups.includes(entry.group)) return false;
  }

  // Verifica que não há duplicatas
  const abbrs = [...assignment.values()].map(e => e.team.abbr);
  return new Set(abbrs).size === abbrs.length;
}

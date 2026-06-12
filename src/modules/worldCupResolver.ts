import type {
  AppState,
  Match,
  Prediction,
  MatchResult,
  GroupStanding,
  KnockoutMatch,
  BestThirdEntry,
  Team,
} from '../types/index.js';
import { calcAllStandings, getGroupQualifiers } from '../utils/standings.js';
import { selectBestThirds } from './bestThirds.js';
import { assignBestThirds } from '../data/bestThirdsMatrix.js';
import { buildKnockoutMap } from '../data/knockoutBracket.js';

/**
 * Módulo de Resolução do Torneio — Lisobet
 *
 * Fluxo completo estágio a estágio:
 *
 *   Palpites da fase de grupos
 *   → Classificação dos 12 grupos
 *   → 24 classificados diretos (1°/2° de cada grupo)
 *   → 8 melhores terceiros (algoritmo FIFA)
 *   → Round of 32: preenche times, resolve palpites
 *   → Round of 16: propaga vencedores, resolve palpites
 *   → Quartas de Final: propaga vencedores, resolve palpites
 *   → Semifinal: propaga, resolve; perdedores → 3° lugar
 *   → Final: propaga vencedores
 *   → Campeão
 */

export interface ResolveResult {
  standings: Map<string, GroupStanding[]>;
  bestThirds: BestThirdEntry[];
  qualifiedTeams: Map<string, Team>;
  knockoutMatches: Map<string, KnockoutMatch>;
  champion: Team | null;
}

// Estágios em ordem topológica
const STAGE_ORDER: Array<KnockoutMatch['stage']> = [
  'round32', 'round16', 'quarterfinal', 'semifinal', 'third_place', 'final',
];

// ──────────────────────────────────────────────────────────────
// ENTRY POINT
// ──────────────────────────────────────────────────────────────

export function resolveWorldCup(
  predictions: Map<string, Prediction>,
  matchResults: Map<string, MatchResult>, // Dados oficiais do DB
  groupMatches: Match[]
): ResolveResult {
  
  // 1. Criar um conjunto de palpites "híbrido" (Prioriza resultados oficiais)
  const effectivePredictions = new Map(predictions);
  for (const [matchId, result] of matchResults) {
    effectivePredictions.set(matchId, {
      userId: 'official',
      matchId: matchId,
      homeScore: result.homeScore,
      awayScore: result.awayScore
    });
  }

  // 2. Calcular standings baseados no estado híbrido
  const standings = calcAllStandings(groupMatches, effectivePredictions);

  // 3. Preencher classificados apenas de grupos COMPLETOS
  const qualifiedTeams = new Map<string, Team>();
  const groups = [...new Set(groupMatches.map(m => m.group))];

  for (const group of groups) {
    const matchesInGroup = groupMatches.filter(m => m.group === group);
    // Verifica se TODOS os jogos deste grupo específico estão no banco
    const isGroupFinished = matchesInGroup.every(m => matchResults.has(m.id));

    if (isGroupFinished) {
      const { winner, runnerUp } = getGroupQualifiers(standings.get(group)!);
      if (winner)   qualifiedTeams.set(`1${group}`, winner);
      if (runnerUp) qualifiedTeams.set(`2${group}`, runnerUp);
    }
  }

  // 4. Melhores terceiros (Só processa se TODOS os grupos terminarem)
  const allGroupsFinished = groupMatches
    .filter(m => m.stage === 'group')
    .every(m => matchResults.has(m.id));
  
  let bestThirds: BestThirdEntry[] = [];
  if (allGroupsFinished) {
    bestThirds = selectBestThirds(standings);
    const thirdAssignment = assignBestThirds(bestThirds);
    for (const [matchId, entry] of thirdAssignment) {
      qualifiedTeams.set(`3rd-${matchId}`, entry.team);
    }
  }

  // 5. Construir mapa de partidas (estado limpo)
  const knockoutMatches = buildKnockoutMap();

  // 6. Índice reverso para terceiros
  const thirdByMatchId = new Map<string, Team>();
  for (const [key, team] of qualifiedTeams) {
    if (key.startsWith('3rd-J')) thirdByMatchId.set(key.slice(4), team);
  }

  // 7. Preencher Round of 32 (apenas com os slots que já têm time)
  // O resolveSlot retornará null se o time ainda não estiver em qualifiedTeams
  for (const match of knockoutMatches.values()) {
    if (match.stage !== 'round32') continue;
    
    match.homeTeam = resolveSlot(match.id, match.homeSlot, qualifiedTeams, knockoutMatches, thirdByMatchId);
    match.awayTeam = resolveSlot(match.id, match.awaySlot, qualifiedTeams, knockoutMatches, thirdByMatchId);
  }

  // 8. Resolver estágios: Prioriza matchResults, depois palpites
  for (const stage of STAGE_ORDER) {
    resolveStage(stage, knockoutMatches, effectivePredictions);
    propagateStage(stage, knockoutMatches);
  }

  const champion = knockoutMatches.get('J104')?.winner ?? null;

  return { standings, bestThirds, qualifiedTeams, knockoutMatches, champion };
}

// ──────────────────────────────────────────────────────────────
// RESOLVER DE SLOTS
// ──────────────────────────────────────────────────────────────

function resolveSlot(
  matchId: string,
  slot: string,
  qualifiedTeams: Map<string, Team>,
  knockoutMatches: Map<string, KnockoutMatch>,
  thirdByMatchId: Map<string, Team>
): Team | null {

  // '1A', '2B' → classificado direto
  if (/^[12][A-L]$/.test(slot)) return qualifiedTeams.get(slot) ?? null;

  // '3rd-CDFGH' → terceiro atribuído ao matchId desta partida
  if (slot.startsWith('3rd-')) return thirdByMatchId.get(matchId) ?? null;

  // 'W73' → vencedor de J73
  if (slot.startsWith('W')) return knockoutMatches.get('J' + slot.slice(1))?.winner ?? null;

  // 'L101' → perdedor de J101 (semis → 3° lugar)
  if (slot.startsWith('L')) return knockoutMatches.get('J' + slot.slice(1))?.loser ?? null;

  return null;
}

// ──────────────────────────────────────────────────────────────
// RESOLVER DE ESTÁGIO
// ──────────────────────────────────────────────────────────────

/**
 * Aplica os palpites às partidas de um estágio específico.
 * Só determina vencedor se ambos os times estiverem preenchidos.
 */
function resolveStage(
  stage: KnockoutMatch['stage'],
  knockoutMatches: Map<string, KnockoutMatch>,
  predictions: Map<string, Prediction>
): void {
  for (const match of knockoutMatches.values()) {
    if (match.stage !== stage) continue;

    const pred = predictions.get(match.id);

    // Limpa estado anterior
    match.homeScore = pred?.homeScore ?? null;
    match.awayScore = pred?.awayScore ?? null;
    match.winner    = null;
    match.loser     = null;

    if (!pred || !match.homeTeam || !match.awayTeam) continue;

    if (pred.homeScore > pred.awayScore) {
      match.winner = match.homeTeam;
      match.loser  = match.awayTeam;
    } else if (pred.awayScore > pred.homeScore) {
      match.winner = match.awayTeam;
      match.loser  = match.homeTeam;
    } else {
      // Empate → mandante avança (placeholder pênaltis)
      match.winner = match.homeTeam;
      match.loser  = match.awayTeam;
    }
  }
}

// ──────────────────────────────────────────────────────────────
// PROPAGADOR DE VENCEDORES
// ──────────────────────────────────────────────────────────────

/**
 * Propaga vencedores de um estágio para as partidas do próximo.
 * Também propaga perdedores das semifinais para J103 (3° lugar).
 */
function propagateStage(
  stage: KnockoutMatch['stage'],
  knockoutMatches: Map<string, KnockoutMatch>
): void {
  for (const match of knockoutMatches.values()) {
    if (match.stage !== stage) continue;

    // Propagar vencedor
    if (match.winner && match.nextMatchId && match.nextMatchSlot) {
      const next = knockoutMatches.get(match.nextMatchId);
      if (next) {
        if (match.nextMatchSlot === 'home') next.homeTeam = match.winner;
        else                                next.awayTeam = match.winner;
      }
    }

    // Propagar perdedor das semis para a disputa do 3° lugar (J103)
    if (match.loser && match.loserMatchId) {
      const thirdPlace = knockoutMatches.get(match.loserMatchId);
      if (thirdPlace) {
        if (match.id === 'J101') thirdPlace.homeTeam = match.loser;
        if (match.id === 'J102') thirdPlace.awayTeam = match.loser;
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────
// DEBUG
// ──────────────────────────────────────────────────────────────

export function debugTournamentState(state: AppState): string {
  const lines: string[] = ['=== Estado do Torneio ==='];

  for (const [group, standings] of state.standings) {
    lines.push(`\nGrupo ${group}:`);
    for (const s of standings) {
      lines.push(`  ${s.position}. ${s.team.name} — ${s.points}pts`);
    }
  }

  lines.push('\nMelhores Terceiros:');
  for (const t of state.bestThirds) {
    lines.push(`  ${t.group}: ${t.team.name} — ${t.points}pts`);
  }

  if (state.champion) {
    lines.push(`\n🏆 Campeão: ${state.champion.name}`);
  }

  return lines.join('\n');
}

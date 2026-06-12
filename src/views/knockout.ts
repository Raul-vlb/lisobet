import type { AppState, KnockoutMatch } from '../types/index.js';
import { buildSplitBracket, getTeamDisplayName, getTeamEmoji, getTeamAbbr, isMatchAvailableForPrediction } from '../modules/bracketEngine.js';
import { openKnockoutMatchModal } from './modal.js';
import { formatScore } from '../utils/helpers.js';

/**
 * View do Chaveamento — Lisobet
 * Renderiza o bracket completo com scroll horizontal.
 */

export function renderBracketView(container: HTMLElement, state: AppState): void {
  const { knockoutMatches, user } = state;
  // const columns = buildBracketColumns(knockoutMatches);
  const { leftColumns, rightColumns, finalColumn } = buildSplitBracket(knockoutMatches);
  const thirdPlace = knockoutMatches.get('J103');

  container.innerHTML = `
    <div class="bracket-view">
      <!-- Top Bar -->
      <div class="bracket-top-bar">
        <span class="bracket-top-title">🏆 Mata-Mata · FIFA 2026</span>
        <span class="bracket-top-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Clique em qualquer jogo para palpitar
        </span>
      </div>

      <!-- Main Bracket Scroll -->
      <div class="bracket-scroll-container">
        <div class="bracket-canvas" id="bracket-canvas">
          
          <div class="bracket-side">
            ${leftColumns.map(col => renderBracketColumn(col.label, col.matches, col.stage, false, state)).join('')}
          </div>

          <div class="bracket-center">
            ${finalColumn ? renderBracketColumn(finalColumn.label, finalColumn.matches, finalColumn.stage, false, state) : ''}
          </div>

          <div class="bracket-side right-side">
            ${rightColumns.map(col => renderBracketColumn(col.label, col.matches, col.stage, true, state)).join('')}
          </div>

        </div>
      </div>

      <!-- Third Place -->
      ${thirdPlace ? `
        <div style="padding:16px 24px;border-top:1px solid var(--color-border);">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:12px;">
            🥉 Disputa do 3° Lugar
          </div>
          <div style="display:flex;justify-content:flex-start;">
            <div class="bracket-third-place">
              ${renderBracketMatch(thirdPlace)}
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Bind click events
  container.querySelectorAll<HTMLElement>('[data-knockout-id]').forEach(el => {
    el.addEventListener('click', () => {
      const matchId = el.dataset['knockoutId']!;
      const match = knockoutMatches.get(matchId);
      if (!match) return;
      openKnockoutMatchModal(match, user);
    });
  });

  // Keyboard support
  container.querySelectorAll<HTMLElement>('[data-knockout-id]').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

export function renderBracketColumn(
  label: string,
  matches: KnockoutMatch[],
  stage: string,
  isRightSide: boolean,
  state: AppState
): string {
  const isFinal = stage === 'final';
  const { champion } = state;

  // --- Caso Final (Mantido conforme seu código) ---
  if (isFinal) {
    const finalMatch = matches[0];
    return `
      <div class="bracket-col ${isRightSide ? 'right-side' : ''}">
        <div class="bracket-col-header">
          <div class="bracket-col-label">Final</div>
          <div class="bracket-col-count">MetLife Stadium · 19/07/2026</div>
        </div>
        <div class="bracket-matches">
          <div class="bracket-match-wrapper">${finalMatch ? renderBracketMatch(finalMatch, true) : ''}</div>
          <div style="margin-top: 24px; padding: 0 16px;">
            ${renderChampionDisplay(champion)}
          </div>
        </div>
      </div>
    `;
  }

  // --- Estrutura das Fases (Otimizada para conectores) ---
  // Agrupamos de 2 em 2 para criar o par que será unido pela "ponte"
  let pairsHtml = '';
  for (let i = 0; i < matches.length; i += 2) {
    const m1 = matches[i];
    const m2 = matches[i + 1];

    pairsHtml += `
      <div class="bracket-match-pair">
        <div class="bracket-match-wrapper">${renderBracketMatch(m1)}</div>
        ${m2 ? `<div class="bracket-match-wrapper">${renderBracketMatch(m2)}</div>` : ''}
        ${m2 ? `<div class="match-bridge"></div>` : ''}
      </div>
    `;
  }

  const colHtml = `
    <div class="bracket-col ${isRightSide ? 'right-side' : ''}">
      <div class="bracket-col-header">
        <div class="bracket-col-label">${label}</div>
        <div class="bracket-col-count">${matches.length} jogo${matches.length > 1 ? 's' : ''}</div>
      </div>
      <div class="bracket-matches">
        ${pairsHtml}
      </div>
    </div>
  `;

  return colHtml;
}

function renderBracketMatch(match: KnockoutMatch, isFinal = false): string {
  const available = isMatchAvailableForPrediction(match);
  const hasPred = match.homeScore !== null && match.awayScore !== null;
  const cssClass = [
    'bracket-match',
    available ? 'available' : '',
    hasPred ? 'has-prediction' : '',
    isFinal ? 'is-final' : '',
    match.stage === 'third_place' ? 'bracket-third' : '',
  ].filter(Boolean).join(' ');

  const stageLabels: Record<string, string> = {
    round32: 'R32', round16: 'R16', quarterfinal: 'QF',
    semifinal: 'SF', third_place: '3P', final: 'FIN',
  };

  return `
    <div
      class="${cssClass}"
      data-knockout-id="${match.id}"
      role="button"
      tabindex="0"
      aria-label="Palpite ${match.id}"
    >
      <div class="bracket-match-id">
        <span>${match.id}</span>
        <span class="bracket-match-stage-badge">${stageLabels[match.stage] ?? match.stage}</span>
      </div>
      ${renderBracketTeamRow(match, 'home', hasPred)}
      ${renderBracketTeamRow(match, 'away', hasPred)}
    </div>
  `;
}

function renderBracketTeamRow(
  match: KnockoutMatch,
  side: 'home' | 'away',
  hasPred: boolean
): string {
  const team = side === 'home' ? match.homeTeam : match.awayTeam;
  const slot = side === 'home' ? match.homeSlot : match.awaySlot;
  const score = side === 'home' ? match.homeScore : match.awayScore;
  const isWinner = match.winner && match.winner.id === team?.id;
  const rowClass = `bracket-team-row${isWinner ? ' winner' : ''}`;

  const emoji = getTeamEmoji(team);
  const abbr = getTeamAbbr(team, slot);
  const name = getTeamDisplayName(team, slot);
  const isPlaceholder = !team;
  const scoreDisplay = hasPred && score !== null ? formatScore(score) : '–';

  return `
    <div class="${rowClass}">
      <span class="bracket-team-flag">${emoji}</span>
      <div class="bracket-team-info">
        <span class="bracket-team-abbr${isPlaceholder ? ' placeholder' : ''}">${abbr}</span>
        <span class="bracket-team-name">${isPlaceholder ? name : ''}</span>
      </div>
      <span class="bracket-score${isWinner ? ' winner-score' : ''}">${scoreDisplay}</span>
      <span class="bracket-winner-icon">✓</span>
    </div>
  `;
}

function renderChampionDisplay(champion: AppState['champion']): string {
  if (!champion) {
    return `
      <div class="bracket-champion">
        <span class="bracket-champion-trophy">🏆</span>
        <span class="bracket-champion-label">Campeão</span>
        <span class="bracket-champion-empty">Aguardando...</span>
      </div>
    `;
  }

  return `
    <div class="bracket-champion">
      <span class="bracket-champion-trophy">🏆</span>
      <span class="bracket-champion-label">Campeão</span>
      <span class="bracket-champion-flag">${champion.emoji}</span>
      <span class="bracket-champion-name">${champion.name}</span>
    </div>
  `;
}
import type { AppState, Match, Prediction, GroupStanding } from '../types/index.js';
import { GROUPS } from '../data/teams.js';
import { getGroupProgress } from '../utils/standings.js';
import { formatDate, formatScore, showToast, getExactMatchDate } from '../utils/helpers.js';
import { openGroupMatchModal } from './modal.js';

/**
 * View da Fase de Grupos — Lisobet
 * Renderiza as 12 tabelas de classificação e os jogos de cada grupo.
 */

export function renderGroupsView(container: HTMLElement, state: AppState): void {
  const { predictions, groupMatches, user } = state;

  // Build header
  const header = `
    <div class="bracket-top-bar">
      <div>
          <h1 class="bracket-top-title">⚽ Fase de Grupos</h1>
          <p class="page-subtitle">Clique em qualquer jogo para inserir seu palpite</p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          ${renderOverallProgress(groupMatches, predictions)}
        </div>
    </div>
  `;

  // Build best thirds section if available
  const bestThirdsHtml = renderBestThirdsSection(state);

  // Build groups grid
  const groupsHtml = GROUPS.map(g => renderGroupCard(g, state)).join('');

  container.innerHTML = `
    ${header}
    <div class="main-content">
      ${bestThirdsHtml}
      <div class="groups-layout">${groupsHtml}</div>
    </div>
    ${renderMobileNav('groups')}
  `;

  // Bind click events
  container.querySelectorAll<HTMLElement>('[data-match-id]').forEach(el => {
    el.addEventListener('click', () => {
      const matchId = el.dataset['matchId']!;
      const match = groupMatches.find(m => m.id === matchId);
      if (!match) return;

      // Verificação de bloqueio
      const officialResult = state.matchResults?.get(matchId);
      const now = new Date();
      const matchDate = getExactMatchDate(match);
      
      if (now >= matchDate || officialResult !== undefined) {
        showToast('O tempo para palpites neste jogo já encerrou.', 'error');
        return;
      }

      openGroupMatchModal(match, user, () => {/* store already updated */});
    });
  });
}

function renderOverallProgress(
  groupMatches: Match[],
  predictions: Map<string, Prediction>
): string {
  const total = groupMatches.length;
  const filled = groupMatches.filter(m => predictions.has(m.id)).length;
  const pct = total > 0 ? Math.round((filled / total) * 100) : 0;

  return `
    <div style="text-align:right;">
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:6px;">
        ${filled} / ${total} palpites preenchidos
      </div>
      <div style="width:200px;height:6px;background:var(--color-bg-600);border-radius:99px;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:var(--gradient-brand);border-radius:99px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `;
}

function renderBestThirdsSection(state: AppState): string {
  const { bestThirds } = state;
  if (bestThirds.length === 0) return '';

  const items = bestThirds.map((t, i) => `
    <div class="best-third-item">
      <span class="best-third-rank">${i + 1}°</span>
      <span class="best-third-flag">${t.team.emoji}</span>
      <span class="best-third-name">${t.team.name}</span>
      <span style="font-size:11px;color:var(--color-text-muted);">Gr.${t.group}</span>
      <span class="best-third-pts">${t.points}pts</span>
    </div>
  `).join('');

  return `
    <div class="best-thirds-panel">
      <div class="best-thirds-title">
        🌟 Melhores Terceiros Classificados (${bestThirds.length}/8)
      </div>
      <div class="best-thirds-list">${items}</div>
    </div>
  `;
}

function renderGroupCard(group: string, state: AppState): string {
  const { groupMatches, predictions, standings, matchResults } = state;
  const groupStandings = standings.get(group) ?? [];
  const matches = groupMatches.filter(m => m.group === group);
  const { filled, total } = getGroupProgress(group, groupMatches, predictions);
  const pct = total > 0 ? Math.round((filled / total) * 100) : 0;

  return `
    <div class="group-card">
      <div class="group-header">
        <span class="group-title">GRUPO ${group}</span>
        <div class="group-progress">
          <span>${filled}/${total}</span>
          <div class="group-progress-bar">
            <div class="group-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </div>

      <!-- Standings -->
      ${renderStandingsTable(groupStandings)}

      <!-- Matches -->
      <div class="matches-list">
        ${matches.map(m => renderMatchCard(m, predictions, matchResults)).join('')} 
      </div>
    </div>
  `;
}

function renderStandingsTable(standings: GroupStanding[]): string {
  if (standings.length === 0) {
    return `<div style="padding:12px 20px;font-size:12px;color:var(--color-text-muted);">Sem palpites ainda</div>`;
  }

  const rows = standings.map((s, i) => {
    const rowClass = i === 0 ? 'row--qualifies-1st'
      : i === 1 ? 'row--qualifies-2nd'
      : i === 2 ? 'row--qualifies-3rd'
      : '';

    const posClass = i === 0 ? 'standings-pos--1'
      : i === 1 ? 'standings-pos--2'
      : i === 2 ? 'standings-pos--3'
      : 'standings-pos--4';

    return `
      <tr class="${rowClass}">
        <td>
          <div class="standings-team">
            <span class="standings-pos ${posClass}">${i + 1}</span>
            <span class="standings-flag">${s.team.emoji}</span>
            <span class="standings-name">${s.team.abbr}</span>
          </div>
        </td>
        <td>${s.played}</td>
        <td>${s.won}</td>
        <td>${s.drawn}</td>
        <td>${s.lost}</td>
        <td>${s.goalsFor}</td>
        <td>${s.goalsAgainst}</td>
        <td style="color:${s.goalDiff > 0 ? 'var(--color-success)' : s.goalDiff < 0 ? 'var(--color-error)' : 'inherit'}">
          ${s.goalDiff > 0 ? '+' : ''}${s.goalDiff}
        </td>
        <td class="standings-pts">${s.points}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="overflow-x:auto;">
      <table class="standings-table">
        <thead>
          <tr>
            <th>Seleção</th>
            <th title="Jogos">J</th>
            <th title="Vitórias">V</th>
            <th title="Empates">E</th>
            <th title="Derrotas">D</th>
            <th title="Gols Pró">GP</th>
            <th title="Gols Contra">GC</th>
            <th title="Saldo">SG</th>
            <th title="Pontos">Pts</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderMatchCard(
  match: Match,
  predictions: Map<string, { homeScore: number; awayScore: number } | undefined>,
  matchResults: Map<string, { homeScore: number; awayScore: number } | undefined>
): string {
  const pred = predictions.get(match.id);
  const officialResult = matchResults.get(match.id);
  
  const hasPred = pred !== undefined;
  const hasOfficial = officialResult !== undefined; // Verifica se o admin lançou o resultado

  const now = new Date();
  const matchDate = getExactMatchDate(match);

  // O jogo bloqueia se a data passou OU se o admin já cadastrou o placar final
  const isLocked = now >= matchDate || hasOfficial;

  // OS QUADRADOS GRANDES MOSTRAM APENAS O PALPITE (ou ? se não tiver)
  const homeScore = hasPred ? formatScore(pred!.homeScore) : '?';
  const awayScore = hasPred ? formatScore(pred!.awayScore) : '?';
  const scoreClass = hasPred ? '' : 'match-score-value--empty';

  return `
    <div
      class="match-card ${hasPred ? 'has-prediction' : ''} ${isLocked ? 'is-locked' : ''}"
      data-match-id="${match.id}"
      role="${isLocked ? 'presentation' : 'button'}"
      tabindex="${isLocked ? '-1' : '0'}"
      style="${isLocked ? 'opacity: 0.85; cursor: not-allowed;' : ''}"
    >
      <div class="match-team">
        <span class="match-team-flag">${getTeamEmoji(match.homeTeam)}</span>
        <div class="match-team-info">
          <div class="match-team-abbr">${match.homeTeam}</div>
          <div class="match-team-name">${getTeamName(match.homeTeam)}</div>
        </div>
      </div>

      <div class="match-score-area">
        <div class="match-score">
          <div class="match-score-value ${scoreClass}">${homeScore}</div>
          <div class="match-score-sep">–</div>
          <div class="match-score-value ${scoreClass}">${awayScore}</div>
        </div>
        <div class="match-date">${formatDate(match.date)}</div>
        
        ${hasOfficial 
          ? `<div style="margin-top:6px; font-size:11px; font-weight:bold; color:var(--color-success); background:var(--color-bg-900); padding:2px 6px; border-radius:4px;">⚽ Placar Oficial: ${officialResult.homeScore} x ${officialResult.awayScore}</div>`
          : isLocked 
            ? `<div class="match-hint" style="color:var(--color-text-muted);">🔒 Encerrado</div>`
            : `<div class="match-hint">✏️ clique para palpitar</div>`
        }
      </div>

      <div class="match-team match-team--away">
        <span class="match-team-flag">${getTeamEmoji(match.awayTeam)}</span>
        <div class="match-team-info" style="text-align:right;">
          <div class="match-team-abbr">${match.awayTeam}</div>
          <div class="match-team-name">${getTeamName(match.awayTeam)}</div>
        </div>
      </div>
    </div>
  `;
}

// Helpers for inline use
import { TEAM_BY_ABBR } from '../data/teams.js';

function getTeamEmoji(abbr: string): string {
  return TEAM_BY_ABBR.get(abbr)?.emoji ?? '🏳️';
}
function getTeamName(abbr: string): string {
  return TEAM_BY_ABBR.get(abbr)?.name ?? abbr;
}

function renderMobileNav(active: string): string {
  return `
    <nav class="mobile-nav" aria-label="Navegação">
      <button class="mobile-nav-btn ${active === 'groups' ? 'active' : ''}" data-view="groups">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span>Grupos</span>
      </button>
      <button class="mobile-nav-btn ${active === 'bracket' ? 'active' : ''}" data-view="bracket">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h4v4H4zM10 4h4v4h-4zM16 6h4v4h-4zM6 10v4M18 10v4M8 14h8M12 14v4"/>
        </svg>
        <span>Mata-Mata</span>
      </button>
      <button class="mobile-nav-btn ${active === 'admin' ? 'active' : ''}" data-view="admin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 1 0 0 14.14"/>
        </svg>
        <span>Admin</span>
      </button>
    </nav>
  `;
}

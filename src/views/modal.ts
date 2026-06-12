import type { Match, KnockoutMatch, AppUser, Team } from '../types/index.js';
import { savePrediction } from '../services/predictions.js';
import { upsertPrediction, getState } from '../modules/store.js';
import { getTeamDisplayName, getTeamEmoji, getTeamAbbr } from '../modules/bracketEngine.js';
import { TEAM_BY_ABBR } from '../data/teams.js';
import { formatDate, stageName, showToast, clamp } from '../utils/helpers.js';

/**
 * Modal de Palpite — Lisobet
 *
 * Abre ao clicar em qualquer jogo (fase de grupos ou mata-mata).
 * Permite inserir placar e salva no store + Supabase.
 */

interface ModalConfig {
  matchId: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeSlot: string;
  awaySlot: string;
  date: string;
  stage: string;
  existingHome?: number;
  existingAway?: number;
}

let activeModal: HTMLElement | null = null;

/**
 * Abre o modal de palpite para um jogo da fase de grupos.
 */
export function openGroupMatchModal(
  match: Match,
  user: AppUser | null,
  onSave?: () => void
): void {
  const homeTeam = TEAM_BY_ABBR.get(match.homeTeam) ?? null;
  const awayTeam = TEAM_BY_ABBR.get(match.awayTeam) ?? null;

  const state = getState();
  const existing = state.predictions.get(match.id);

  openModal({
    matchId: match.id,
    homeTeam,
    awayTeam,
    homeSlot: match.homeTeam,
    awaySlot: match.awayTeam,
    date: match.date,
    stage: stageName(match.stage),
    existingHome: existing?.homeScore,
    existingAway: existing?.awayScore,
  }, user, onSave);
}

/**
 * Abre o modal de palpite para um jogo do mata-mata.
 */
export function openKnockoutMatchModal(
  match: KnockoutMatch,
  user: AppUser | null,
  onSave?: () => void
): void {
  const state = getState();
  const existing = state.predictions.get(match.id);

  openModal({
    matchId: match.id,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeSlot: match.homeSlot,
    awaySlot: match.awaySlot,
    date: '2026-07-01',
    stage: stageName(match.stage),
    existingHome: existing?.homeScore,
    existingAway: existing?.awayScore,
  }, user, onSave);
}

function openModal(
  config: ModalConfig,
  user: AppUser | null,
  onSave?: () => void
): void {
  closeModal();

  let homeScore = config.existingHome ?? 0;
  let awayScore = config.existingAway ?? 0;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Palpite do jogo');

  const homeName = getTeamDisplayName(config.homeTeam, config.homeSlot);
  const awayName = getTeamDisplayName(config.awayTeam, config.awaySlot);
  const homeEmoji = getTeamEmoji(config.homeTeam);
  const awayEmoji = getTeamEmoji(config.awayTeam);
  const homeAbbr = getTeamAbbr(config.homeTeam, config.homeSlot);
  const awayAbbr = getTeamAbbr(config.awayTeam, config.awaySlot);
  const bothDefined = config.homeTeam && config.awayTeam;

  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">
          <span>⚽</span>
          <span>Seu Palpite — ${config.matchId}</span>
        </div>
        <button class="modal-close btn btn--ghost btn--icon" id="modal-close" aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Teams -->
        <div class="modal-matchup">
          <div class="modal-team">
            <span class="modal-team-flag">${homeEmoji}</span>
            <span class="modal-team-name">${homeName}</span>
            <span class="modal-team-abbr">${homeAbbr}</span>
          </div>
          <div class="modal-vs">VS</div>
          <div class="modal-team">
            <span class="modal-team-flag">${awayEmoji}</span>
            <span class="modal-team-name">${awayName}</span>
            <span class="modal-team-abbr">${awayAbbr}</span>
          </div>
        </div>

        ${!bothDefined ? `
          <div style="text-align:center;padding:var(--space-4);color:var(--color-text-muted);font-size:14px;background:var(--color-bg-700);border-radius:var(--radius-md);margin-bottom:var(--space-5);">
            ⏳ Aguardando definição dos times desta partida...
          </div>
        ` : ''}

        <!-- Score Input -->
        <div class="modal-score-input">
          <div class="score-input-wrap">
            <span class="score-input-label">${homeAbbr}</span>
            <div class="score-input-controls">
              <button class="score-btn" id="dec-home" aria-label="Diminuir gols mandante">−</button>
              <div class="score-display" id="score-home">${homeScore}</div>
              <button class="score-btn" id="inc-home" aria-label="Aumentar gols mandante">+</button>
            </div>
          </div>

          <span class="score-sep">×</span>

          <div class="score-input-wrap">
            <span class="score-input-label">${awayAbbr}</span>
            <div class="score-input-controls">
              <button class="score-btn" id="dec-away" aria-label="Diminuir gols visitante">−</button>
              <div class="score-display" id="score-away">${awayScore}</div>
              <button class="score-btn" id="inc-away" aria-label="Aumentar gols visitante">+</button>
            </div>
          </div>
        </div>

        <!-- Meta info -->
        <div class="modal-meta">
          <div class="modal-meta-item">📅 ${formatDate(config.date)}</div>
          <div class="modal-meta-item">🏆 ${config.stage}</div>
          ${!user ? '<div class="modal-meta-item" style="color:var(--color-warning)">⚠️ Faça login para salvar</div>' : ''}
        </div>

        ${!user ? `
          <div style="padding:var(--space-3);background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md);font-size:13px;color:var(--color-text-subtle);text-align:center;">
            Palpite salvo apenas localmente. Faça login para persistir na nuvem.
          </div>
        ` : ''}
      </div>

      <div class="modal-footer">
        <button class="btn btn--secondary" id="btn-cancel">Cancelar</button>
        <button class="btn btn--primary" id="btn-save" ${!bothDefined && user ? 'disabled title="Aguardando times"' : ''}>
          💾 Salvar Palpite
        </button>
      </div>
    </div>
  `;

  function updateDisplay(): void {
    const homeEl = overlay.querySelector('#score-home');
    const awayEl = overlay.querySelector('#score-away');
    if (homeEl) homeEl.textContent = String(homeScore);
    if (awayEl) awayEl.textContent = String(awayScore);
  }

  // Events
  overlay.querySelector('#modal-close')?.addEventListener('click', closeModal);
  overlay.querySelector('#btn-cancel')?.addEventListener('click', closeModal);

  overlay.querySelector('#inc-home')?.addEventListener('click', () => {
    homeScore = clamp(homeScore + 1, 0, 20);
    updateDisplay();
  });
  overlay.querySelector('#dec-home')?.addEventListener('click', () => {
    homeScore = clamp(homeScore - 1, 0, 20);
    updateDisplay();
  });
  overlay.querySelector('#inc-away')?.addEventListener('click', () => {
    awayScore = clamp(awayScore + 1, 0, 20);
    updateDisplay();
  });
  overlay.querySelector('#dec-away')?.addEventListener('click', () => {
    awayScore = clamp(awayScore - 1, 0, 20);
    updateDisplay();
  });

  overlay.querySelector('#btn-save')?.addEventListener('click', async () => {
    const btn = overlay.querySelector('#btn-save') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'Salvando...';

    const prediction = {
      userId: user?.id ?? 'anonymous',
      matchId: config.matchId,
      homeScore,
      awayScore,
      updatedAt: new Date().toISOString(),
    };

    // Atualiza store imediatamente
    upsertPrediction(prediction);

    // Persiste se autenticado
    if (user) {
      try {
        await savePrediction(config.matchId, homeScore, awayScore, user.id);
        showToast('✅ Palpite salvo!', 'success', 2000);
      } catch {
        showToast('⚠️ Erro ao salvar no servidor. Tente novamente.', 'error');
      }
    } else {
      showToast('💾 Palpite salvo localmente', 'info', 2000);
    }

    closeModal();
    onSave?.();
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', handleKeyDown);
  overlay.dataset['keyHandler'] = 'true';

  document.getElementById('modal-root')?.appendChild(overlay);
  activeModal = overlay;

  // Trap focus
  requestAnimationFrame(() => {
    (overlay.querySelector('#btn-save') as HTMLElement)?.focus();
  });
}

export function closeModal(): void {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
}

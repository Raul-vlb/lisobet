import './styles/main.css';
import './styles/components.css';
import './styles/bracket.css';

import { initAuth, logout } from './modules/auth.js';
import { subscribe, getState, setInitialized } from './modules/store.js';
import type { AppState, ViewName } from './types/index.js';
import { renderAuthView } from './views/auth.js';
import { renderGroupsView } from './views/groups.js';
import { renderBracketView } from './views/knockout.js';
import { renderAdminView } from './views/admin.js';
import { renderRankingView } from './views/ranking.js';
import { renderProfileDropdown, bindProfileDropdownEvents } from './views/profileDropdown.js';
// import { renderChampionSection } from './views/champion.js';
import { isAdmin } from './modules/auth.js';
import { fetchMatchResults } from './services/supabase.js';
import { setMatchResults } from './modules/store.js';
import { showToast } from './utils/helpers.js';

/**
 * Lisobet — Copa do Mundo FIFA 2026
 * Entry point da aplicação.
 */

// ────────────────────────────────────────────────────────────
// APP SHELL
// ────────────────────────────────────────────────────────────

const app = document.getElementById('app')!;
const loadingScreen = document.getElementById('loading-screen')!;
const splashAnimationTimer = new Promise(resolve => setTimeout(resolve, 2000));

let currentView: ViewName = 'groups';

const SVG_GROUPS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
const SVG_BRACKET = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 6h4v4H4zM16 6h4v4h-4zM10 4h4v4h-4zM6 10v4h12v-4M12 14v4"/></svg>`;
const SVG_ADMIN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-9 3-9 4h18c0-1-3-4-9-4z"/></svg>`;
const SVG_TROPHY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 9c0 5.25 3 8 6 9 3-1 6-3.75 6-9"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`;
const SVG_FINANCE_DOWN = `<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><defs><linearGradient id="financeGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a" /><stop offset="50%" stop-color="#3b82f6" /><stop offset="100%" stop-color="#06b6d4" /></linearGradient></defs><path d="M0 0h24v24H0z" fill="none" /><path fill="url(#financeGradient)" d="M16 18v-2h2.6l-5.2-5.15l-4 4L2 7.4L3.4 6l6 6l4-4l6.6 6.6V12h2v6z"/></svg>`;

// ────────────────────────────────────────────────────────────
// RENDER SHELL
// ────────────────────────────────────────────────────────────

function renderShell(state: AppState): void {
    const { user, champion } = state;
    const adminVisible = user && isAdmin(user.id);

    app.innerHTML = `
    <div class="app-layout">
      <!-- Navbar -->
      <nav class="navbar">
        <span class="navbar-brand"> ${SVG_FINANCE_DOWN} LISOBET</span>

        <!-- Desktop Nav -->
        <div class="navbar-nav" id="desktop-nav">
          <button class="nav-btn ${currentView === 'groups' ? 'active' : ''}" data-view="groups">
            ${SVG_GROUPS} Grupos
          </button>
          <button class="nav-btn ${currentView === 'bracket' ? 'active' : ''}" data-view="bracket">
            ${SVG_BRACKET} Mata-Mata
          </button>
          <button class="nav-btn ${currentView === 'champion' ? 'active' : ''}" data-view="champion">
            ${SVG_TROPHY} Ranking
          </button>
          ${adminVisible ? `
            <button class="nav-btn ${currentView === 'admin' ? 'active' : ''}" data-view="admin">
              ${SVG_ADMIN} Admin
            </button>
          ` : ''}
          ${champion ? `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:8px;font-size:13px;font-weight:600;color:var(--color-gold);">
              ${SVG_TROPHY} ${champion.emoji} ${champion.name}
            </div>
          ` : ''}
        </div>

        <!-- User Area -->
        <div class="navbar-user">
          ${user ? `
            <span class="user-name">${user.name ?? user.email ?? 'Usuário'}</span>
            ${renderProfileDropdown(user)}
          ` : `
            <button class="btn btn--primary btn--sm" id="btn-login">
              Entrar
            </button>
          `}
        </div>
      </nav>

      <!-- View Container -->
      <main id="view-container" aria-live="polite">
        <!-- View rendered below -->
      </main>

      <!-- Mobile Nav -->
      <nav class="mobile-nav" aria-label="Navegação principal">
        <button class="mobile-nav-btn ${currentView === 'groups' ? 'active' : ''}" data-view="groups">
          ${SVG_GROUPS}
          <span>Grupos</span>
        </button>
        <button class="mobile-nav-btn ${currentView === 'bracket' ? 'active' : ''}" data-view="bracket">
          ${SVG_BRACKET}
          <span>Mata-Mata</span>
        </button>
        <button class="mobile-nav-btn ${currentView === 'champion' ? 'active' : ''}" data-view="champion">
          ${SVG_TROPHY}
          <span>Ranking</span>
        </button>
      </nav>
    </div>
  `;

    bindShellEvents(state);
    renderCurrentView(state);
}

// ────────────────────────────────────────────────────────────
// VIEW ROUTING
// ────────────────────────────────────────────────────────────

function renderCurrentView(state: AppState): void {
    const viewContainer = document.getElementById('view-container');
    if (!viewContainer) return;

    switch (currentView) {
        case 'groups':
            renderGroupsView(viewContainer, state);
            break;
        case 'bracket':
            renderBracketView(viewContainer, state);
            break;
        case 'champion':
            renderRankingView(viewContainer, state);
            break;
        case 'admin':
            renderAdminView(viewContainer, state);
            break;
        default:
            renderGroupsView(viewContainer, state);
    }
}

function navigateTo(view: ViewName): void {
    currentView = view;
    const state = getState();
    // Re-render shell to update active nav, then view
    renderShell(state);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ────────────────────────────────────────────────────────────
// EVENT BINDING
// ────────────────────────────────────────────────────────────

function bindShellEvents(state: AppState): void {
    // Nav buttons (desktop + mobile)
    document.querySelectorAll<HTMLElement>('[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset['view'] as ViewName;
            if (view) navigateTo(view);
        });
    });

    // Profile dropdown (if user is logged in)
    if (state.user) {
        bindProfileDropdownEvents(state, logout, () => renderShell(getState()));
    }

    // Login button (when not logged in)
    document.getElementById('btn-login')?.addEventListener('click', () => {
        renderAuthScreen();
    });

    document.getElementById('mobile-login-btn')?.addEventListener('click', () => {
        if (!state.user) {
            renderAuthScreen();
        }
    });
}

function renderAuthScreen(): void {
    app.innerHTML = '<div id="auth-container"></div>';
    const authContainer = document.getElementById('auth-container')!;
    renderAuthView(authContainer);
}

// ────────────────────────────────────────────────────────────
// STORE SUBSCRIPTION
// ────────────────────────────────────────────────────────────

let prevUserId: string | null = null;
let isFirstRender = true;

subscribe((state: AppState) => {
    if (state.loading && !state.initialized) return;


    const newUserId = state.user?.id ?? null;
    const userChanged = newUserId !== prevUserId;
    
    // Se for o primeiro render após inicializar, ou se o usuário mudou, renderiza a shell completa
    if ((isFirstRender && state.initialized) || userChanged) {
        prevUserId = newUserId;
        isFirstRender = false;
        renderShell(state);
        return;
    }

    // Para atualizações subsequentes, se a shell já existir, apenas re-renderiza a view atual
    const viewContainer = document.getElementById('view-container');
    if (viewContainer) {
        renderCurrentView(state);
    }

    // Update champion in navbar if present
    updateNavChampion(state);
});

function updateNavChampion(_state: AppState): void {
    // Champion display updates handled by renderShell on major state changes
    // This is a lightweight update
}

// ────────────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────────────

async function carregarResultadosOficiais() {
  try {
    // 1. Busca os dados brutos do Supabase (Array)
    const dbResults = await fetchMatchResults();

    // 2. Converte o Array para o Map que o Store exige
    const resultadosMap = new Map();
    
    dbResults.forEach((res) => {
      resultadosMap.set(res.match_id, {
        matchId: res.match_id,
        homeScore: res.home_score,
        awayScore: res.away_score,
        updatedAt: res.updated_at
      });
    });

    // 3. Salva no Store (Isso agora vai disparar o recalculate() corrigido)
    setMatchResults(resultadosMap);
    
  } catch (error) {
    console.error("Falha ao sincronizar resultados do Supabase:", error);
  }
}

async function init(): Promise<void> {
    try {
        // 1. Inicializa auth
        await initAuth();
        
        // 2. Busca e salva os resultados no store CORRETAMENTE
        await carregarResultadosOficiais(); 

    } catch (err) {
        console.error('[App] Initialization error:', err);
        setInitialized(true);

        const state = getState();
        renderShell(state);
        showToast('Erro de conexão. Funcionando em modo offline.', 'error', 5000);
    } finally {
        await splashAnimationTimer;
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Boot
init();
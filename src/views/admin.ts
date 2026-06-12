import type { AppState } from '../types/index.js';
import { isAdmin } from '../modules/auth.js';
import { saveMatchResult } from '../services/supabase.js';
import { showToast } from '../utils/helpers.js';

/**
 * View de Administração — Lisobet
 * Disponível apenas para usuários admin definidos em VITE_ADMIN_IDS.
 */

export function renderAdminView(container: HTMLElement, state: AppState): void {
  const { user } = state;

  if (!user || !isAdmin(user.id)) {
    container.innerHTML = `
      <div class="main-content">
        <div class="empty-state">
          <div class="empty-state-icon">🔒</div>
          <div class="empty-state-title">Acesso Restrito</div>
          <p class="empty-state-text">Esta área é exclusiva para administradores.</p>
        </div>
      </div>
    `;
    return;
  }

  const totalPredictions = state.predictions.size;
  const totalMatches = state.groupMatches.length + state.knockoutMatches.size;
  const champion = state.champion;

  container.innerHTML = `
    <div class="main-content">
      <div class="page-header">
        <h1 class="page-title">⚙️ Painel Admin</h1>
        <p class="page-subtitle">Lisobet · Copa do Mundo FIFA 2026</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-bottom:32px;">
        ${renderStatCard('🎯', 'Palpites', String(totalPredictions), 'salvos localmente')}
        ${renderStatCard('⚽', 'Jogos', String(totalMatches), 'total do torneio')}
        ${renderStatCard('👥', 'Grupos', '12', 'A até L')}
        ${renderStatCard('🏆', 'Campeão', champion?.abbr ?? '—', champion?.name ?? 'não definido')}
      </div>

      <div class="admin-grid">
        
        <div class="admin-card" style="grid-column:1/-1;">
          <div class="admin-card-title">🏆 Definir Resultados Oficiais</div>
          <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px;">
            Insira o placar real das partidas. Isso atualizará a tabela de classificação oficial e os pontos dos usuários.
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;padding-right:8px;">
            ${renderMatchResultsForm(state)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">📊 Estado do Torneio (Simulado pelos seus palpites)</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${renderGroups(state)}
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">🔧 Configuração</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${renderConfigInfo()}
          </div>
        </div>
      </div>
    </div>
  `;

  // Salvar Placar Oficial
  document.querySelectorAll('.btn-save-result').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const matchId = (e.currentTarget as HTMLButtonElement).dataset.match;
      if (!matchId) return;

      const homeInput = document.getElementById(`home-res-${matchId}`) as HTMLInputElement;
      const awayInput = document.getElementById(`away-res-${matchId}`) as HTMLInputElement;

      if (!homeInput.value || !awayInput.value) {
        showToast('Preencha os dois placares!', 'error');
        return;
      }

      try {
        const button = e.currentTarget as HTMLButtonElement;
        const originalText = button.textContent;
        button.textContent = '...';
        button.disabled = true;

        await saveMatchResult(matchId, parseInt(homeInput.value, 10), parseInt(awayInput.value, 10));
        
        // Atualiza no estado local temporariamente (o ideal é o seu store dar um refetch)
        state.matchResults?.set(matchId, { matchId, homeScore: parseInt(homeInput.value), awayScore: parseInt(awayInput.value) });
        
        showToast('Placar oficial salvo!', 'success');
        button.textContent = originalText ?? 'Salvar';
        button.disabled = false;
      } catch (err) {
        console.error(err);
        showToast('Erro ao salvar no banco.', 'error');
      }
    });
  });
}

function renderMatchResultsForm(state: AppState): string {
  // Lista todos os jogos de grupo
  return state.groupMatches.map(m => {
    const result = state.matchResults?.get(m.id); // Pega se já houver resultado salvo
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--color-bg-800);padding:8px 12px;border-radius:6px;">
        <div style="font-size:12px;color:var(--color-text-muted);width:40px;font-weight:bold;">${m.id}</div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;gap:12px;">
          <span style="font-weight:600;width:40px;text-align:right;">${m.homeTeam}</span>
          <input type="number" id="home-res-${m.id}" value="${result?.homeScore ?? ''}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="color:var(--color-text-muted);">X</span>
          <input type="number" id="away-res-${m.id}" value="${result?.awayScore ?? ''}" min="0" max="30" style="width:50px;text-align:center;background:var(--color-bg-900);border:1px solid var(--color-border);color:white;border-radius:4px;padding:4px;">
          <span style="font-weight:600;width:40px;text-align:left;">${m.awayTeam}</span>
        </div>
        <button class="btn btn--primary btn--sm btn-save-result" data-match="${m.id}" style="padding:4px 12px;font-size:12px;">Salvar</button>
      </div>
    `;
  }).join('');
}

function renderStatCard(icon: string, label: string, value: string, sub: string): string {
  return `
    <div class="admin-card" style="text-align:center;padding:20px 16px;">
      <div style="font-size:28px;margin-bottom:8px;">${icon}</div>
      <div style="font-size:24px;font-weight:800;color:var(--color-text);">${value}</div>
      <div style="font-size:13px;font-weight:600;color:var(--color-text-subtle);">${label}</div>
      <div style="font-size:11px;color:var(--color-text-muted);margin-top:4px;">${sub}</div>
    </div>
  `;
}

function renderGroups(state: AppState): string {
  return [...state.standings.entries()].map(([group, standings]) => {
    const winner = standings[0];
    const runner = standings[1];
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
        <span style="color:var(--color-text-muted);font-weight:700;">Grupo ${group}</span>
        <span>${winner ? `${winner.team.emoji} ${winner.team.abbr}` : '—'}</span>
        <span style="color:var(--color-text-muted);">${runner ? `${runner.team.emoji} ${runner.team.abbr}` : '—'}</span>
      </div>
    `;
  }).join('') || '<span style="color:var(--color-text-muted);font-size:13px;">Nenhum palpite preenchido</span>';
}

function renderConfigInfo(): string {
  return `
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="color:var(--color-text-muted);">Supabase</span>
        <span class="badge badge--green">Ativo</span>
      </div>
    </div>`;
}

// function renderConfigInfo(): string {
//   const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder'));
//   const hasAdmins = !!(import.meta.env.VITE_ADMIN_IDS);

//   return `
//     <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
//       <div style="display:flex;align-items:center;justify-content:space-between;">
//         <span style="color:var(--color-text-muted);">Supabase URL</span>
//         <span class="badge ${hasSupabase ? 'badge--green' : 'badge--red'}">${hasSupabase ? '✓ OK' : '✗ Não configurado'}</span>
//       </div>
//       <div style="display:flex;align-items:center;justify-content:space-between;">
//         <span style="color:var(--color-text-muted);">Admin IDs</span>
//         <span class="badge ${hasAdmins ? 'badge--green' : 'badge--red'}">${hasAdmins ? '✓ Definidos' : '✗ Nenhum'}</span>
//       </div>
//       <div style="display:flex;align-items:center;justify-content:space-between;">
//         <span style="color:var(--color-text-muted);">Build</span>
//         <span class="badge badge--blue">Vite + TypeScript</span>
//       </div>
//     </div>
//     <div style="margin-top:12px;font-size:12px;color:var(--color-text-muted);">
//       Configure <code style="background:var(--color-bg-700);padding:1px 5px;border-radius:4px;">.env</code>
//       com suas credenciais Supabase.
//     </div>
//   `;
// }

// function renderBestThirdsDebug(state: AppState): string {
//   if (state.bestThirds.length === 0) {
//     return `<span style="font-size:13px;color:var(--color-text-muted);">Aguardando palpites da fase de grupos...</span>`;
//   }
//   return state.bestThirds.map((t, i) => `
//     <div style="display:flex;align-items:center;gap:10px;font-size:13px;padding:6px 0;border-bottom:1px solid var(--color-border);">
//       <span style="color:var(--color-text-muted);min-width:20px;">${i + 1}°</span>
//       <span>${t.team.emoji}</span>
//       <span style="flex:1;font-weight:600;">${t.team.name}</span>
//       <span style="color:var(--color-text-muted);">Gr.${t.group}</span>
//       <span style="color:var(--color-primary-400);font-weight:700;">${t.points}pts</span>
//       <span style="color:var(--color-text-muted);">${t.goalDiff >= 0 ? '+' : ''}${t.goalDiff}</span>
//     </div>
//   `).join('');
// }

// function escHtml(str: string): string {
//   return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// }

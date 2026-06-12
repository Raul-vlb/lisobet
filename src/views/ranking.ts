import { supabase } from '../services/supabase.js';
import { calculateUserScores } from '../modules/rankings.js';
import type { AppState } from '../types/index.js';
import { getInitials } from '../utils/helpers.js';

export async function renderRankingView(container: HTMLElement, state: AppState): Promise<void> {
  container.innerHTML = `
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div id="ranking-content" class="main-content">
      <p>Carregando ranking...</p>
    </div>
  `;

  // CORREÇÃO: Buscando 'display_name'
  const { data: profiles, error } = await supabase.from('profiles').select('id, display_name, avatar_url');
  
  if (error) {
    console.error("Erro ao buscar perfis:", error);
    return;
  }
  
  // Como o TypeScript pode estar esperando 'name', vamos mapear o retorno para garantir compatibilidade
  const profilesFormatted = (profiles || []).map(p => {
    let finalUrl = p.avatar_url;

    // Se existir uma URL e ela não começar com http, é um caminho de arquivo
    if (finalUrl && !finalUrl.startsWith('http')) {
      // SUBSTITUA 'avatars' pelo NOME EXATO do seu Bucket no Supabase
      const { data } = supabase.storage.from('avatars').getPublicUrl(finalUrl);
      finalUrl = data.publicUrl;
    }

    return {
      id: p.id,
      name: p.display_name,
      avatarUrl: finalUrl
    };
  });

  const rawScores = calculateUserScores(state.predictions, state.matchResults, profilesFormatted);

  // 2. Faz o "merge" (re-injeta) o avatarUrl usando o ID como chave
  const scores = rawScores.map(s => {
    // Busca o perfil original que tem o avatar
    const profile = profilesFormatted.find(p => p.id === s.userId);
    
    return {
      ...s,
      avatarUrl: profile?.avatarUrl || null // Adiciona o avatar de volta
    };
  });
  // Renderiza
  container.innerHTML = `
    <div class="bracket-top-bar">
      <span class="bracket-top-title">🏆 Ranking dos lisos</span>
    </div>
    <div class="main-content">
      <table class="ranking-table">
        <thead>
          <tr><th>Pos</th><th>Nome</th><th>Pontos</th></tr>
        </thead>
        <tbody>
          ${scores.map((s, i) => `
            <tr>
              <td>${i + 1}°</td>
              <td>
                <span class="user">
                  <span class="user-avatar user-avatar--sm">
                    ${s.avatarUrl
                      ? `<img src="${s.avatarUrl}" alt="Avatar" loading="lazy" />`
                      : `<span>${getInitials(s.name ?? '')}</span>`
                    }
                  </span>
                  ${s.name}
                </span>
              </td>
              <td class="score">${s.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
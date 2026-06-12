import type { AppState } from '../types/index.js';
import { getInitials, showToast } from '../utils/helpers.js';
import { updateUserProfile } from '../services/supabase.js';
import { setUser } from '../modules/store.js';

/**
 * Gerencia o dropdown de perfil do usuário
 * Inclui opções de editar perfil e sair
 */

const SVG_EDIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const SVG_LOGOUT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;
const SVG_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

/**
 * Abre o dropdown de perfil
 */
export function openProfileDropdown(state: AppState): void {
  const dropdownBtn = document.getElementById('profile-dropdown-btn');
  const dropdown = document.getElementById('profile-dropdown');

  if (!dropdown || !state.user) return;

  // Toggle dropdown
  dropdown.classList.toggle('visible');

  // Close on click outside
  if (dropdown.classList.contains('visible')) {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdown.contains(e.target as Node) && !dropdownBtn?.contains(e.target as Node)) {
        dropdown.classList.remove('visible');
        document.removeEventListener('click', handleClickOutside);
      }
    };
    document.addEventListener('click', handleClickOutside);
  }
}

/**
 * Abre o modal de editar perfil
 */
export function openEditProfileModal(state: AppState, onProfileUpdated: () => void): void {
  const { user } = state;
  if (!user) return;

  // Create modal
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content profile-modal">
      <div class="modal-header">
        <h2>Editar Perfil</h2>
        <button class="modal-close-btn" aria-label="Fechar" id="close-profile-modal">
          ${SVG_CLOSE}
        </button>
      </div>

      <form id="edit-profile-form" class="profile-form">
        <div class="form-group">
          <label for="display-name">Nome</label>
          <input
            type="text"
            id="display-name"
            name="display-name"
            value="${user.name ?? ''}"
            placeholder="Seu nome"
            maxlength="100"
            class="form-input"
          />
          <small>Máximo 100 caracteres</small>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            value="${user.email ?? ''}"
            disabled
            class="form-input"
          />
          <small>Email não pode ser alterado</small>
        </div>

        <div class="form-group">
          <label for="avatar-url">URL do Avatar</label>
          <input
            type="url"
            id="avatar-url"
            name="avatar-url"
            value="${user.avatarUrl ?? ''}"
            placeholder="https://example.com/avatar.jpg"
            class="form-input"
          />
          <small>Link para uma imagem (JPG, PNG). Se vazio, usa iniciais do nome.</small>
        </div>

        ${user.avatarUrl ? `
          <div class="form-group">
            <label>Pré-visualização do Avatar</label>
            <img src="${user.avatarUrl}" alt="Avatar preview" class="avatar-preview" />
          </div>
        ` : ''}

        <div class="form-actions">
          <button type="button" class="btn btn--ghost" id="cancel-profile-btn">
            Cancelar
          </button>
          <button type="submit" class="btn btn--primary">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  `;

  modalRoot.appendChild(modal);

  // Bind events
  const form = modal.querySelector('#edit-profile-form') as HTMLFormElement;
  const closeBtn = modal.querySelector('#close-profile-modal') as HTMLButtonElement;
  const cancelBtn = modal.querySelector('#cancel-profile-btn') as HTMLButtonElement;

  const handleClose = () => {
    modal.remove();
  };

  closeBtn?.addEventListener('click', handleClose);
  cancelBtn?.addEventListener('click', handleClose);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const displayName = (modal.querySelector('#display-name') as HTMLInputElement)?.value.trim() || null;
    const avatarUrl = (modal.querySelector('#avatar-url') as HTMLInputElement)?.value.trim() || null;

    if (!displayName) {
      showToast('Nome é obrigatório', 'error');
      return;
    }

    try {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) submitBtn.disabled = true;

      // Update on Supabase
      await updateUserProfile(displayName, avatarUrl || undefined);

      // Update local state
      if (state.user) {
        state.user.name = displayName;
        state.user.avatarUrl = avatarUrl;
        setUser(state.user);
      }

      showToast('Perfil atualizado com sucesso!', 'success');
      handleClose();
      onProfileUpdated();
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      showToast('Erro ao atualizar perfil. Tente novamente.', 'error');
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) handleClose();
  });
}

/**
 * Renderiza o dropdown de perfil (chamado do main.ts)
 */
export function renderProfileDropdown(user: any): string {
  return `
    <div class="profile-dropdown-wrapper">
      <button class="profile-dropdown-trigger" id="profile-dropdown-btn" aria-label="Menu de perfil" title="Perfil">
        <span class="user-avatar user-avatar--sm">
          ${user.avatarUrl
            ? `<img src="${user.avatarUrl}" alt="Avatar" loading="lazy" />`
            : `<span>${getInitials(user.name ?? user.email)}</span>`
          }
        </span>
      </button>

      <div class="profile-dropdown" id="profile-dropdown">
        <div class="profile-dropdown-header">
          <div class="profile-dropdown-avatar">
            ${user.avatarUrl
              ? `<img src="${user.avatarUrl}" alt="Avatar" loading="lazy" />`
              : `<span>${getInitials(user.name ?? user.email)}</span>`
            }
          </div>
          <div class="profile-dropdown-info">
            <div class="profile-dropdown-name">${user.name ?? 'Usuário'}</div>
            <div class="profile-dropdown-email">${user.email ?? ''}</div>
          </div>
        </div>

        <div class="profile-dropdown-divider"></div>

        <button class="profile-dropdown-item" id="edit-profile-btn">
          ${SVG_EDIT}
          <span>Editar Perfil</span>
        </button>

        <button class="profile-dropdown-item profile-dropdown-item--danger" id="profile-logout-btn">
          ${SVG_LOGOUT}
          <span>Sair</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Bind events para o dropdown (chamado após renderizar)
 */
export function bindProfileDropdownEvents(state: AppState, onLogout: () => void, onProfileUpdated: () => void): void {
  const dropdownBtn = document.getElementById('profile-dropdown-btn');
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const logoutBtn = document.getElementById('profile-logout-btn');

  dropdownBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openProfileDropdown(state);
  });

  editProfileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('profile-dropdown')?.classList.remove('visible');
    openEditProfileModal(state, onProfileUpdated);
  });

  logoutBtn?.addEventListener('click', async (e) => {
    e.stopPropagation();
    try {
      await onLogout();
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      showToast('Erro ao sair', 'error');
    }
  });
}
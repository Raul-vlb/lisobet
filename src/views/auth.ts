import { loginWithEmail, registerWithEmail } from '../modules/auth.js';
import { showToast } from '../utils/helpers.js';

/**
 * View de Autenticação — Lisobet
 * Renderiza o formulário de login/registro.
 */

type AuthMode = 'login' | 'register';

export function renderAuthView(container: HTMLElement): void {
  let mode: AuthMode = 'login';

  function render(): void {
    container.innerHTML = `
      <div class="auth-view">
        <div class="auth-container">
          <div class="auth-logo">
            <span class="auth-logo-text">LISOBET</span>
            <p class="auth-logo-sub">⚽ Bolão · Copa do Mundo 2026</p>
          </div>

          <div class="auth-card">
            <h2 class="auth-title">
              ${mode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
            </h2>

            <div class="auth-divider">com e-mail</div>

            <!-- Email Form -->
            <form class="auth-form" id="auth-form" novalidate>

              ${mode === 'register' ? `
                <div class="form-group">
                  <label class="form-label" for="name-input">
                    Nome
                  </label>
                  <input
                    class="form-input"
                    id="name-input"
                    type="text"
                    placeholder="Seu nome"
                    autocomplete="name"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="username-input">
                    Usuário
                  </label>
                  <input
                    class="form-input"
                    id="username-input"
                    type="text"
                    placeholder="@usuario"
                    autocomplete="username"
                    required
                  />
                </div>
              ` : ''}

              <div class="form-group">
                <label class="form-label" for="email-input">
                  E-mail
                </label>
                <input
                  class="form-input"
                  id="email-input"
                  type="email"
                  placeholder="seu@email.com"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="password-input">
                  Senha
                </label>
                <input
                  class="form-input"
                  id="password-input"
                  type="password"
                  placeholder="${mode === 'login'
                    ? '••••••••'
                    : 'Mínimo 6 caracteres'}"
                  autocomplete="${mode === 'login'
                    ? 'current-password'
                    : 'new-password'}"
                  required
                  minlength="6"
                />
              </div>

              <div id="form-error"
                  class="form-error"
                  style="display:none">
              </div>

              <button
                type="submit"
                class="btn btn--primary btn--full"
                id="submit-btn">
                ${mode === 'login'
                  ? 'Entrar'
                  : 'Criar conta'}
              </button>

            </form>

            <div class="auth-toggle">
              ${mode === 'login'
                ? 'Não tem conta? <button id="toggle-mode">Criar conta</button>'
                : 'Já tem conta? <button id="toggle-mode">Entrar</button>'
              }
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents(): void {

    // Toggle mode
    document.getElementById('toggle-mode')?.addEventListener('click', () => {
      mode = mode === 'login' ? 'register' : 'login';
      render();
    });

    // Email form
    document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('email-input') as HTMLInputElement)?.value?.trim();
      const password = (document.getElementById('password-input') as HTMLInputElement)?.value;
      const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
      const errorEl = document.getElementById('form-error') as HTMLElement;

      if (!email || !password) {
        return;
      }

      if (mode === 'register') {

        const displayName =
          (document.getElementById('name-input') as HTMLInputElement)
            ?.value
            ?.trim();

        const username =
          (document.getElementById('username-input') as HTMLInputElement)
            ?.value
            ?.trim()
            ?.toLowerCase();

        if (!displayName) {
          errorEl.textContent = 'Informe seu nome.';
          errorEl.style.display = 'block';
          return;
        }

        if (!username) {
          errorEl.textContent = 'Informe um nome de usuário.';
          errorEl.style.display = 'block';
          return;
        }

        if (username.length < 3) {
          errorEl.textContent =
            'O usuário deve possuir pelo menos 3 caracteres.';
          errorEl.style.display = 'block';
          return;
        }
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Aguarde...';
      errorEl.style.display = 'none';

      try {
        if (mode === 'login') {
          await loginWithEmail(email, password);
        } else {
          const displayName =
            (document.getElementById('name-input') as HTMLInputElement)
              .value
              .trim();

          const username =
            (document.getElementById('username-input') as HTMLInputElement)
              .value
              .trim()
              .toLowerCase()
              .replace(/^@/, '');

          await registerWithEmail(
            email,
            password,
            displayName,
            username
          );
          showToast('Conta criada! Verifique seu e-mail.', 'success', 5000);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido';
        errorEl.textContent = translateError(msg);
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = mode === 'login' ? 'Entrar' : 'Criar conta';
      }
    });
  }

  render();
}

function translateError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.';
  if (msg.includes('User already registered')) return 'Este e-mail já está cadastrado.';
  if (msg.includes('Password should be')) return 'Senha deve ter pelo menos 6 caracteres.';
  if (msg.includes('duplicate key')) { return 'Este usuário já está em uso.'; }
  if (msg.includes('username')) { return 'Nome de usuário já cadastrado.'; }
  return msg;
}

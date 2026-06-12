import { loginWithGoogle, loginWithGithub, loginWithEmail, registerWithEmail } from '../modules/auth.js';
import { showToast } from '../utils/helpers.js';

/**
 * View de Autenticação — Lisobet
 * Renderiza o formulário de login/registro.
 */

type AuthMode = 'login' | 'register';

const SVG_GOOGLE = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
</svg>`;

const SVG_GITHUB = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M12 0a12 12 0 0 0-3.795 23.4c.6.113.82-.26.82-.577l-.014-2.034c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.004-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222l-.015 3.293c0 .32.218.694.825.576A12 12 0 0 0 12 0z"/>
</svg>`;


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

            <!-- OAuth -->
            <div class="auth-oauth">
              <button class="btn-oauth" id="btn-google">
                ${SVG_GOOGLE}
                <span>Continuar com Google</span>
              </button>
              <button class="btn-oauth" id="btn-github">
                ${SVG_GITHUB}
                <span>Continuar com GitHub</span>
              </button>
            </div>

            <div class="auth-divider">ou com e-mail</div>

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
    // Google OAuth
    document.getElementById('btn-google')?.addEventListener('click', async () => {
      try {
        await loginWithGoogle();
      } catch (err) {
        showToast('Erro ao conectar com Google', 'error');
        console.error(err);
      }
    });

    // GitHub OAuth
    document.getElementById('btn-github')?.addEventListener('click', async () => {
      try {
        await loginWithGithub();
      } catch (err) {
        showToast('Erro ao conectar com GitHub', 'error');
        console.error(err);
      }
    });

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

import type { MatchStage } from '../types/index.js';

/**
 * Formata data ISO para exibição amigável em pt-BR.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

/**
 * Formata score para exibição. Retorna '?' se não definido.
 */
export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return '?';
  return String(score);
}

/**
 * Nome legível do estágio.
 */
export function stageName(stage: MatchStage): string {
  const names: Record<MatchStage, string> = {
    group: 'Fase de Grupos',
    round32: 'Oitavas de Final',
    round16: 'Quartas-Oitavas',
    quarterfinal: 'Quartas de Final',
    semifinal: 'Semifinal',
    third_place: '3° Lugar',
    final: 'Final',
  };
  return names[stage];
}

/**
 * Gera um ID de elemento DOM único.
 */
export function domId(prefix: string, id: string): string {
  return `${prefix}-${id.replace(/[^a-z0-9]/gi, '-')}`;
}

/**
 * Debounce simples.
 */
export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Cria um elemento DOM tipado com atributos opcionais.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Partial<Record<string, string>>,
  content?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) el.setAttribute(k, v);
    }
  }
  if (content !== undefined) el.innerHTML = content;
  return el;
}

/**
 * Retorna as iniciais de um nome.
 */
export function getInitials(name: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Mostra um toast de notificação.
 */
export function showToast(
  message: string,
  type: 'success' | 'error' | 'info' = 'info',
  duration = 3000
): void {
  const root = document.getElementById('toast-root');
  if (!root) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  root.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

/**
 * Clamp um número entre min e max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Retorna cor de badge baseada na posição do grupo.
 */
export function positionColor(pos: number): string {
  if (pos === 1) return 'var(--color-gold)';
  if (pos === 2) return 'var(--color-silver)';
  if (pos === 3) return 'var(--color-accent)';
  return 'var(--color-text-muted)';
}

/**
 * Escapa HTML para prevenir XSS.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

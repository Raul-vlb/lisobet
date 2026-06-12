import type { AppState } from '../types/index.js';

/**
 * View do Campeão — Lisobet
 * Exibe o campeão definido com animação de confete canvas.
 * Renderizado dentro do bracket-view quando J104 tem vencedor.
 */

export function renderChampionSection(
  container: HTMLElement,
  state: AppState
): void {
  const { champion, knockoutMatches } = state;
  const finalMatch = knockoutMatches.get('J104');
  const runnerUp   = finalMatch?.loser ?? null;
  const thirdPlace = knockoutMatches.get('J103')?.winner ?? null;

  container.innerHTML = `
    <div class="champion-view" id="champion-view">
      <canvas id="confetti-canvas" style="
        position:fixed;inset:0;pointer-events:none;z-index:50;
      "></canvas>

      ${champion ? `
        <!-- CAMPEÃO -->
        <div class="champion-hero">
          <div class="champion-hero-bg"></div>
          <div class="champion-hero-content">
            <div class="champion-trophy-anim">🏆</div>
            <div class="champion-tag">CAMPEÃO DO MUNDO</div>
            <div class="champion-flag-big">${champion.emoji}</div>
            <h1 class="champion-name-big">${champion.name.toUpperCase()}</h1>
            <div class="champion-abbr-big">${champion.abbr}</div>
          </div>
        </div>

        <!-- PÓDIO -->
        <div class="podium-section">
          <div class="podium-row">
            ${runnerUp ? `
              <div class="podium-card podium-card--2nd">
                <div class="podium-medal">🥈</div>
                <div class="podium-flag">${runnerUp.emoji}</div>
                <div class="podium-name">${runnerUp.name}</div>
                <div class="podium-pos">2° Lugar</div>
              </div>
            ` : ''}

            <div class="podium-card podium-card--1st">
              <div class="podium-medal">🥇</div>
              <div class="podium-flag" style="font-size:52px">${champion.emoji}</div>
              <div class="podium-name" style="font-size:18px;font-weight:800">${champion.name}</div>
              <div class="podium-pos">🏆 Campeão</div>
            </div>

            ${thirdPlace ? `
              <div class="podium-card podium-card--3rd">
                <div class="podium-medal">🥉</div>
                <div class="podium-flag">${thirdPlace.emoji}</div>
                <div class="podium-name">${thirdPlace.name}</div>
                <div class="podium-pos">3° Lugar</div>
              </div>
            ` : ''}
          </div>
        </div>
      ` : `
        <!-- SEM CAMPEÃO -->
        <div class="champion-empty">
          <div style="font-size:72px;margin-bottom:24px;">🏆</div>
          <h2 style="font-family:var(--font-display);font-size:32px;letter-spacing:3px;color:var(--color-gold);">
            AGUARDANDO O CAMPEÃO
          </h2>
          <p style="color:var(--color-text-muted);margin-top:12px;max-width:400px;text-align:center;">
            Preencha todos os palpites do mata-mata para descobrir
            seu campeão do bolão.
          </p>
        </div>
      `}
    </div>
  `;

  if (champion) {
    requestAnimationFrame(() => launchConfetti());
  }
}

// ──────────────────────────────────────────────────────────────
// CONFETTI ENGINE (canvas puro, sem dependências)
// ──────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = [
  '#fbbf24','#f59e0b','#3b82f6','#10b981',
  '#ef4444','#8b5cf6','#ec4899','#06b6d4',
];

function launchConfetti(): void {
  const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: Particle[] = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: Math.random() * 3 + 2,
    size: Math.random() * 10 + 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
    opacity: 1,
  }));

  let frame = 0;
  const maxFrames = 240;

  function draw(): void {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

    for (const p of particles) {
      ctx!.save();
      ctx!.globalAlpha = p.opacity;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx!.restore();

      p.x  += p.vx;
      p.y  += p.vy;
      p.rotation += p.rotationSpeed;

      if (frame > maxFrames * 0.6) {
        p.opacity = Math.max(0, p.opacity - 0.015);
      }

      if (p.y > canvas!.height) {
        p.y = -10;
        p.x = Math.random() * canvas!.width;
      }
    }

    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    }
  }

  draw();
}

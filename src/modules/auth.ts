import type { AppUser } from '../types/index.js';
import { supabase, signInWithEmail, signUpWithEmail, signOut as sbSignOut } from '../services/supabase.js';
import { setUser, setLoading, setPredictions, setInitialized, recalculate } from './store.js';
import { loadPredictions } from '../services/predictions.js';

/**
 * Módulo de Autenticação — Lisobet
 *
 * Gerencia:
 *   - Login por e-mail/senha
 *   - Registro
 *   - Logout
 *   - Sessão persistente via Supabase
 *   - Sincronização de palpites pós-login
 */

const ADMIN_IDS = (import.meta.env.VITE_ADMIN_IDS ?? '')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);

/**
 * Verifica se um user_id é admin.
 */
export function isAdmin(userId: string): boolean {
    return ADMIN_IDS.includes(userId);
}

/**
 * Converte usuário Supabase para AppUser.
 */
function toAppUser(supabaseUser: { id: string; email?: string; user_metadata?: Record<string, unknown> }): AppUser {
    const meta = supabaseUser.user_metadata ?? {};
    
    return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? null,
        name: (meta['display_name'] as string) ?? supabaseUser.email ?? null,
        avatarUrl: (meta['avatar_url'] as string) ?? (meta['picture'] as string) ?? null,
        isAdmin: isAdmin(supabaseUser.id),
    };
}

/**
 * Inicializa autenticação e escuta mudanças de sessão.
 * Deve ser chamado uma vez na inicialização da aplicação.
 */
export async function initAuth(): Promise<void> {
    setLoading(true);

    // Verifica sessão existente
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
        const user = toAppUser(session.user);
        setUser(user);
        await syncPredictions(true);
    } else {
        // Carrega palpites do localStorage (modo offline)
        const localPredictions = await loadPredictions(false);
        setPredictions(localPredictions);
        recalculate();
    }

    // Escuta mudanças de autenticação
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
            const user = toAppUser(session.user);
            setUser(user);

            if (event === 'SIGNED_IN') {
                setLoading(true);
                await syncPredictions(true);
                setLoading(false);
            }
        } else {
            setUser(null);
        }
    });

    setLoading(false);
    setInitialized(true);
}

/**
 * Sincroniza palpites: localStorage + Supabase → store.
 */
async function syncPredictions(isAuthenticated: boolean): Promise<void> {
    try {
        const predictions = await loadPredictions(isAuthenticated);
        setPredictions(predictions);
        recalculate();
    } catch (err) {
        console.error('[Auth] Erro ao sincronizar palpites:', err);
    }
}

// ────────────────────────────────────────────────────────────
// PUBLIC AUTH ACTIONS
// ────────────────────────────────────────────────────────────

export async function loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmail(email, password);
}

export async function registerWithEmail(email: string, password: string, displayName: string, username: string ): Promise<void> {
  await signUpWithEmail(email, password, displayName, username);
}

export async function logout(): Promise<void> {
    await sbSignOut();
    setUser(null);
    // Mantém palpites locais, apenas limpa o usuário
}

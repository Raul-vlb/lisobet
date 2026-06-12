import { createClient } from '@supabase/supabase-js';
import type { DbPrediction, DbMatchResult } from '../types/index.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Variáveis de ambiente não encontradas. ' +
    'Crie um arquivo .env baseado em .env.example'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// ────────────────────────────────────────────────────────────
// AUTH HELPERS
// ────────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/lisobet/`,
    },
  });
  if (error) throw error;
}

export async function signInWithGithub(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/lisobet/`,
    },
  });
  if (error) throw error;
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  username: string
) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        username
      }
    }
  });

  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ────────────────────────────────────────────────────────────
// PREDICTIONS CRUD
// ────────────────────────────────────────────────────────────

/**
 * Busca todos os palpites do usuário autenticado
 */
export async function fetchPredictions(): Promise<DbPrediction[]> {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as DbPrediction[];
}

/**
 * Insere ou atualiza um palpite (upsert baseado em user_id + match_id)
 */
export async function upsertPrediction(
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<DbPrediction> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user?.id;

  if (!userId) throw new Error('Usuário não autenticado');

  const { data, error } = await supabase
    .from('predictions')
    .upsert(
      {
        user_id: userId,
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,match_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as DbPrediction;
}

/**
 * Deleta um palpite
 */
export async function deletePrediction(matchId: string): Promise<void> {
  const { error } = await supabase
    .from('predictions')
    .delete()
    .eq('match_id', matchId);

  if (error) throw error;
}

/**
 * Busca todos os resultados oficiais cadastrados pelo admin
 */
export async function fetchMatchResults(): Promise<DbMatchResult[]> {
  const { data, error } = await supabase
    .from('match_results')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as DbMatchResult[];
}

/**
 * Insere ou atualiza um resultado oficial de uma partida
 */
export async function saveMatchResult(
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<DbMatchResult> {
  const { data, error } = await supabase
    .from('match_results')
    .upsert(
      {
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'match_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as DbMatchResult;
}


// ────────────────────────────────────────────────────────────
// USER PROFILE MANAGEMENT
// ────────────────────────────────────────────────────────────

/**
 * Atualiza o perfil do usuário autenticado
 */
export async function updateUserProfile(
  displayName?: string,
  avatarUrl?: string
): Promise<void> {

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Atualiza metadata do auth
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      ...(displayName !== undefined && { display_name: displayName }),
      ...(avatarUrl !== undefined && { avatar_url: avatarUrl })
    }
  });

  if (authError) throw authError;

  // Atualiza tabela profiles
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      ...(displayName !== undefined && { display_name: displayName }),
      ...(avatarUrl !== undefined && { avatar_url: avatarUrl })
    })
    .eq('id', user.id);

  if (profileError) {
    console.error("Erro ao salvar no banco:", profileError);
    throw profileError;
  }
}
-- ============================================================
-- LISOBET — Setup do Banco de Dados Supabase
-- Copa do Mundo FIFA 2026
-- Execute este arquivo no Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABELA PRINCIPAL: predictions
-- ────────────────────────────────────────────────────────────

create table if not exists public.predictions (
  id          uuid        default gen_random_uuid()             primary key,
  user_id     uuid        references auth.users on delete cascade not null,
  match_id    text        not null,
  home_score  int         not null check (home_score >= 0 and home_score <= 30),
  away_score  int         not null check (away_score >= 0 and away_score <= 30),
  updated_at  timestamptz default timezone('utc'::text, now())  not null,

  unique(user_id, match_id)
);

-- Índices para performance
create index if not exists idx_predictions_user_id   on public.predictions(user_id);
create index if not exists idx_predictions_match_id  on public.predictions(match_id);
create index if not exists idx_predictions_updated   on public.predictions(updated_at desc);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- Usuário SOMENTE acessa seus próprios palpites
-- ────────────────────────────────────────────────────────────

alter table public.predictions enable row level security;

CREATE POLICY "predictions_all_ops_own" ON public.predictions
FOR ALL -- Agrupa todas as operações (SELECT, INSERT, UPDATE, DELETE)
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.predictions 
ADD CONSTRAINT check_home_score CHECK (home_score >= 0 AND home_score <= 30),
ADD CONSTRAINT check_away_score CHECK (away_score >= 0 AND away_score <= 30);

-- ────────────────────────────────────────────────────────────
-- COMENTÁRIOS
-- ────────────────────────────────────────────────────────────

comment on table  public.predictions            is 'Palpites dos usuários — Lisobet Copa 2026';
comment on column public.predictions.user_id    is 'ID do usuário autenticado (auth.users)';
comment on column public.predictions.match_id   is 'ID do jogo (J1-J104)';
comment on column public.predictions.home_score is 'Gols do mandante (0-30)';
comment on column public.predictions.away_score is 'Gols do visitante (0-30)';



-- ────────────────────────────────────────────────────────────
-- TABELA: match_results (Resultados Oficiais)
-- ────────────────────────────────────────────────────────────

create table if not exists public.match_results (
  match_id    text        primary key,
  home_score  int         not null check (home_score >= 0 and home_score <= 30),
  away_score  int         not null check (away_score >= 0 and away_score <= 30),
  updated_at  timestamptz default timezone('utc'::text, now()) not null
);

-- Índice para performance
create index if not exists idx_match_results_updated on public.match_results(updated_at desc);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- Leitura para todos, Escrita apenas para o Administrador
-- ────────────────────────────────────────────────────────────

alter table public.match_results enable row level security;

-- Leitura pública para todos
CREATE POLICY "results_select_public" ON public.match_results
FOR SELECT
USING (true);

-- Escrita restrita ao Admin (Substitua pelo seu UUID real)
CREATE POLICY "results_admin_write" ON public.match_results
FOR ALL
TO authenticated
USING (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid)
WITH CHECK (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid);


-- ────────────────────────────────────────────────────────────
-- COMENTÁRIOS
-- ────────────────────────────────────────────────────────────

comment on table  public.match_results            is 'Resultados oficiais das partidas — Lisobet';
comment on column public.match_results.match_id   is 'ID do jogo (Ex: J1, J2) para fazer join com as predictions';
comment on column public.match_results.home_score is 'Gols reais do mandante';
comment on column public.match_results.away_score is 'Gols reais do visitante';


-- ────────────────────────────────────────────────────────────
-- TABELA: profiles
-- Perfil público dos usuários
-- Criada automaticamente ao registrar uma conta
-- ────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id uuid primary key
     references auth.users(id)
     on delete cascade,

  email text,
  display_name text not null,
  username text not null unique,
  avatar_url text,

  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

create index if not exists idx_profiles_email
  on public.profiles(email);

create index if not exists idx_profiles_created_at
  on public.profiles(created_at desc);



-- ────────────────────────────────────────────────────────────
-- TRIGGER: Escuta novos usuários do Auth
-- ────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    display_name,
    username,
    avatar_url
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'avatar_url'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();



-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- Usuário acessa e edita apenas seu próprio perfil
-- ────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;

-- Leitura pública (Permite que o ranking exiba nomes e avatares de todos)
CREATE POLICY "profiles_select_public" ON public.profiles
FOR SELECT
USING (true);

-- Escrita permitida apenas para o dono do perfil
CREATE POLICY "profiles_write_own" ON public.profiles
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);



-- ────────────────────────────────────────────────────────────
-- COMENTÁRIOS
-- ────────────────────────────────────────────────────────────

comment on table public.profiles
is 'Perfis dos usuários cadastrados no Lisobet';

comment on column public.profiles.id
is 'Mesmo ID do usuário em auth.users';

comment on column public.profiles.email
is 'E-mail do usuário';

comment on column public.profiles.display_name
is 'Nome exibido publicamente';

comment on column public.profiles.avatar_url
is 'URL da foto do usuário';

comment on column public.profiles.created_at
is 'Data de criação do perfil';

comment on column public.profiles.updated_at
is 'Data da última atualização do perfil';


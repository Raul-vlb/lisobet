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

-- SELECT: apenas seus palpites
create policy "users_select_own"
  on public.predictions
  for select
  using (auth.uid() = user_id);

-- INSERT: apenas para si mesmo
create policy "users_insert_own"
  on public.predictions
  for insert
  with check (auth.uid() = user_id);

-- UPDATE: apenas seus palpites
create policy "users_update_own"
  on public.predictions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: apenas seus palpites
create policy "users_delete_own"
  on public.predictions
  for delete
  using (auth.uid() = user_id);

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

-- SELECT: Todos os usuários autenticados precisam ler os resultados 
-- para que o sistema possa calcular os pontos e as classificações
create policy "results_select_all"
  on public.match_results
  for select
  using (true);

-- INSERT / UPDATE / DELETE: Apenas o Admin.
-- Substitua 'COLOQUE_SEU_UUID_AQUI' pelo ID real que está no seu VITE_ADMIN_IDS
create policy "results_insert_admin"
  on public.match_results
  for insert
  with check (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid);

create policy "results_update_admin"
  on public.match_results
  for update
  using (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid)
  with check (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid);

create policy "results_delete_admin"
  on public.match_results
  for delete
  using (auth.uid() = '0b113524-0f52-4a72-81f1-e7d1081cf5ab'::uuid);

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

create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles
  for delete
  using (auth.uid() = id);



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


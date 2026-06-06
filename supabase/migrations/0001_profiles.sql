-- Spotlights — student profiles.
-- Apply once: Supabase Dashboard → SQL → New query → paste → Run.
-- (Or `supabase db push` if you link the CLI.)
--
-- One row per auth user. Repeating sections are stored as JSONB so the whole
-- profile loads/saves in a single round-trip. RLS scopes every row to its owner.

create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  full_name     text,
  pronouns      text,
  headline      text,
  school        text,
  grad_year     text,
  location      text,
  about         text,
  links         jsonb not null default '[]'::jsonb,
  looking_for   jsonb not null default '{}'::jsonb,
  skills        jsonb not null default '[]'::jsonb,
  work          jsonb not null default '[]'::jsonb,
  education     jsonb not null default '[]'::jsonb,
  courses       jsonb not null default '[]'::jsonb,
  organizations jsonb not null default '[]'::jsonb,
  languages     jsonb not null default '[]'::jsonb,
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Owners can read / create / update their own profile. No delete policy
-- (the row is removed via the auth.users cascade).
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Keep updated_at fresh on every write.
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profiles_updated_at();

-- Auto-create a profile row when a new auth user signs up, seeding the name
-- from the signup metadata (full_name).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

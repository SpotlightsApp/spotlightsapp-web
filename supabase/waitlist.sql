-- Spotlights waitlist capture.
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- RLS is enabled with an INSERT-only policy for anonymous visitors, and NO
-- select policy — so the public anon key can add emails but can never read the
-- list back. Read it from the dashboard or with the service role.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  name       text,
  source     text,
  created_at timestamptz not null default now()
);

-- If you ran an earlier version of this file, apply these in the SQL editor:
--   alter table public.waitlist add column if not exists name text;
--   alter table public.waitlist drop column if exists role;

alter table public.waitlist enable row level security;

-- RLS policy permits the action; the table-level GRANT below makes it possible
-- in the first place. Without the GRANT, inserts fail with 42501 (permission
-- denied) even when a policy exists.
grant insert on public.waitlist to anon, authenticated;

-- Allow anyone (anon or logged-in) to add themselves to the waitlist.
create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

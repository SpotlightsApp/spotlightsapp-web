-- Spotlight waitlist capture.
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- RLS is enabled with an INSERT-only policy for anonymous visitors, and NO
-- select policy — so the public anon key can add emails but can never read the
-- list back. Read it from the dashboard or with the service role.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  role       text not null default 'student' check (role in ('student', 'employer')),
  source     text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow anyone (anon or logged-in) to add themselves to the waitlist.
create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

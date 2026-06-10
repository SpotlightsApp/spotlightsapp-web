-- Employer-side talent network: universities + candidates.
-- Mirrors src/lib/talent/types.ts (TalentUniversity / TalentCandidate) so the
-- console at /employers/talent reads these instead of the bundled seed module.
-- Idempotent + RLS. Applied via `supabase db push`.

create table if not exists public.talent_universities (
  id           text primary key,            -- e.g. 'berkeley'
  name         text not null,
  short_name   text not null,
  city         text,
  email_domain text,
  logo_url     text,
  created_at   timestamptz not null default now()
);

create table if not exists public.talent_candidates (
  id                  text primary key,     -- e.g. 'c01'
  name                text not null,
  university_id       text not null references public.talent_universities (id),
  degree              text,
  major               text,
  grad_year           int,
  gpa                 numeric(3, 2),
  location            text,
  headline            text,
  about               text,
  domain              text,                 -- focus area, e.g. 'Software'
  skills              jsonb not null default '[]',
  experience          jsonb not null default '[]',
  projects            jsonb not null default '[]',
  awards              jsonb not null default '[]',
  coursework          jsonb not null default '[]',
  score_overall       int not null,
  score_technical     int not null,
  score_execution     int not null,
  score_leadership    int not null,
  score_communication int not null,
  score_trajectory    int not null,
  signals             jsonb not null default '[]',
  watchouts           jsonb not null default '[]',
  status              text not null default 'new'
                      check (status in ('new', 'shortlisted', 'advanced')),
  applied_for         text,
  avatar_url          text,
  added_at            timestamptz not null default now(),
  created_at          timestamptz not null default now()
);

create index if not exists talent_candidates_score_idx
  on public.talent_candidates (score_overall desc);
create index if not exists talent_candidates_university_idx
  on public.talent_candidates (university_id);
create index if not exists talent_candidates_domain_idx
  on public.talent_candidates (domain);

-- Candidate data is for signed-in (allowlisted) users only — no anon read.
-- Writes go through the service role; clients have no write policies.
alter table public.talent_universities enable row level security;
alter table public.talent_candidates enable row level security;

drop policy if exists "talent_universities_read" on public.talent_universities;
create policy "talent_universities_read" on public.talent_universities
  for select to authenticated using (true);

drop policy if exists "talent_candidates_read" on public.talent_candidates;
create policy "talent_candidates_read" on public.talent_candidates
  for select to authenticated using (true);

-- RLS alone isn't enough — the roles also need table grants.
grant select on public.talent_universities to authenticated;
grant select on public.talent_candidates to authenticated;
grant all on public.talent_universities, public.talent_candidates to service_role;

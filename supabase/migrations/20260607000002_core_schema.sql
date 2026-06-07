-- Spotlights core schema: companies, jobs, events, applications, inbox.
-- Idempotent + RLS. Applied via `supabase db push`.

-- Profiles: add an avatar URL (uploaded to the avatars storage bucket).
alter table public.profiles add column if not exists avatar_url text;

-- Clean slate for content tables (pre-launch, no real data here; profiles and
-- waitlist are never touched). Makes this migration authoritative over any
-- earlier partial schema.
drop table if exists public.messages cascade;
drop table if exists public.conversation_participants cascade;
drop table if exists public.conversations cascade;
drop table if exists public.event_rsvps cascade;
drop table if exists public.saved_jobs cascade;
drop table if exists public.applications cascade;
drop table if exists public.jobs cascade;
drop table if exists public.events cascade;
drop table if exists public.company_members cascade;
drop table if exists public.companies cascade;

/* ----------------------------------------------------------------- */
/*  Companies                                                        */
/* ----------------------------------------------------------------- */
create table if not exists public.companies (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  tagline     text,
  about       text,
  industry    text,
  size        text,
  location    text,
  website     text,
  logo_url    text,
  founded     int,
  hiring      boolean not null default true,
  created_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Employer ↔ company membership (who may edit a company / post its jobs).
create table if not exists public.company_members (
  company_id uuid references public.companies (id) on delete cascade,
  user_id    uuid references auth.users (id) on delete cascade,
  role       text not null default 'admin',
  primary key (company_id, user_id)
);

create or replace function public.is_company_member(cid uuid, uid uuid)
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.company_members m
    where m.company_id = cid and m.user_id = uid
  );
$$;

/* ----------------------------------------------------------------- */
/*  Jobs                                                             */
/* ----------------------------------------------------------------- */
create table if not exists public.jobs (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  company_id    uuid not null references public.companies (id) on delete cascade,
  title         text not null,
  type          text,
  work_mode     text,
  location      text,
  industry      text,
  salary_min    int,
  salary_max    int,
  salary_period text default 'mo',
  description   text,
  responsibilities text[] not null default '{}',
  requirements  text[] not null default '{}',
  skills        text[] not null default '{}',
  featured      boolean not null default false,
  posted_at     timestamptz not null default now(),
  created_by    uuid references auth.users (id) on delete set null
);
create index if not exists jobs_company_idx on public.jobs (company_id);
create index if not exists jobs_posted_idx on public.jobs (posted_at desc);

/* ----------------------------------------------------------------- */
/*  Events                                                           */
/* ----------------------------------------------------------------- */
create table if not exists public.events (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  host          text,
  kind          text,
  mode          text,
  location      text,
  image_url     text,
  starts_at     timestamptz,
  duration_mins int,
  description   text,
  company_id    uuid references public.companies (id) on delete set null,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now()
);
create index if not exists events_starts_idx on public.events (starts_at);

/* ----------------------------------------------------------------- */
/*  Student activity: applications, saved jobs, RSVPs                */
/* ----------------------------------------------------------------- */
create table if not exists public.applications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  job_id     uuid not null references public.jobs (id) on delete cascade,
  status     text not null default 'applied',
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table if not exists public.saved_jobs (
  user_id    uuid not null references auth.users (id) on delete cascade,
  job_id     uuid not null references public.jobs (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create table if not exists public.event_rsvps (
  user_id    uuid not null references auth.users (id) on delete cascade,
  event_id   uuid not null references public.events (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

/* ----------------------------------------------------------------- */
/*  Inbox: conversations, participants, messages                    */
/* ----------------------------------------------------------------- */
create table if not exists public.conversations (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid references public.conversations (id) on delete cascade,
  user_id         uuid references auth.users (id) on delete cascade,
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id       uuid not null references auth.users (id) on delete cascade,
  body            text not null,
  created_at      timestamptz not null default now()
);
create index if not exists messages_conv_idx on public.messages (conversation_id, created_at);

create or replace function public.is_conversation_participant(conv uuid, uid uuid)
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.conversation_participants p
    where p.conversation_id = conv and p.user_id = uid
  );
$$;

-- Bump conversation.last_message_at on new message.
create or replace function public.bump_conversation()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.conversations set last_message_at = new.created_at where id = new.conversation_id;
  return new;
end;
$$;
drop trigger if exists messages_bump_conversation on public.messages;
create trigger messages_bump_conversation
  after insert on public.messages
  for each row execute function public.bump_conversation();

/* ----------------------------------------------------------------- */
/*  Grants (base privilege; RLS narrows below)                      */
/* ----------------------------------------------------------------- */
grant select on public.companies, public.jobs, public.events to anon, authenticated;
grant insert, update, delete on
  public.companies, public.company_members, public.jobs, public.events,
  public.applications, public.saved_jobs, public.event_rsvps,
  public.conversations, public.conversation_participants, public.messages
  to authenticated;
grant select on
  public.company_members, public.applications, public.saved_jobs,
  public.event_rsvps, public.conversations, public.conversation_participants,
  public.messages
  to authenticated;

/* ----------------------------------------------------------------- */
/*  RLS                                                              */
/* ----------------------------------------------------------------- */
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.jobs enable row level security;
alter table public.events enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

-- Companies: readable by everyone; writable by members; creatable by anyone.
drop policy if exists companies_read on public.companies;
create policy companies_read on public.companies for select using (true);
drop policy if exists companies_insert on public.companies;
create policy companies_insert on public.companies for insert to authenticated
  with check (created_by = auth.uid());
drop policy if exists companies_update on public.companies;
create policy companies_update on public.companies for update to authenticated
  using (public.is_company_member(id, auth.uid()))
  with check (public.is_company_member(id, auth.uid()));

-- Company members: a member can see their company's roster; you add yourself.
drop policy if exists company_members_read on public.company_members;
create policy company_members_read on public.company_members for select to authenticated
  using (public.is_company_member(company_id, auth.uid()));
drop policy if exists company_members_insert on public.company_members;
create policy company_members_insert on public.company_members for insert to authenticated
  with check (user_id = auth.uid());

-- Jobs: readable by everyone; writable by company members.
drop policy if exists jobs_read on public.jobs;
create policy jobs_read on public.jobs for select using (true);
drop policy if exists jobs_write on public.jobs;
create policy jobs_write on public.jobs for all to authenticated
  using (public.is_company_member(company_id, auth.uid()))
  with check (public.is_company_member(company_id, auth.uid()));

-- Events: readable by everyone; writable by creator.
drop policy if exists events_read on public.events;
create policy events_read on public.events for select using (true);
drop policy if exists events_insert on public.events;
create policy events_insert on public.events for insert to authenticated
  with check (created_by = auth.uid());
drop policy if exists events_update on public.events;
create policy events_update on public.events for update to authenticated
  using (created_by = auth.uid()) with check (created_by = auth.uid());

-- Applications / saved / RSVPs: each user owns their own rows.
drop policy if exists applications_own on public.applications;
create policy applications_own on public.applications for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists saved_jobs_own on public.saved_jobs;
create policy saved_jobs_own on public.saved_jobs for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists event_rsvps_own on public.event_rsvps;
create policy event_rsvps_own on public.event_rsvps for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Inbox: participants only (via security-definer helper to avoid recursion).
drop policy if exists conversations_read on public.conversations;
create policy conversations_read on public.conversations for select to authenticated
  using (public.is_conversation_participant(id, auth.uid()));
drop policy if exists conversations_insert on public.conversations;
create policy conversations_insert on public.conversations for insert to authenticated
  with check (true);

drop policy if exists cp_read on public.conversation_participants;
create policy cp_read on public.conversation_participants for select to authenticated
  using (public.is_conversation_participant(conversation_id, auth.uid()));
drop policy if exists cp_insert on public.conversation_participants;
create policy cp_insert on public.conversation_participants for insert to authenticated
  with check (true);

drop policy if exists messages_read on public.messages;
create policy messages_read on public.messages for select to authenticated
  using (public.is_conversation_participant(conversation_id, auth.uid()));
drop policy if exists messages_insert on public.messages;
create policy messages_insert on public.messages for insert to authenticated
  with check (
    sender_id = auth.uid()
    and public.is_conversation_participant(conversation_id, auth.uid())
  );

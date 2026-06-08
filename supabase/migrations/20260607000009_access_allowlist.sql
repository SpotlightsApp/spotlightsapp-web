-- Invite-only access for the private testing phase.
--
-- Only emails in public.access_allowlist may create an account or reach the app.
-- Manage the list from the Supabase dashboard / SQL editor:
--     insert into public.access_allowlist (email, note) values ('a@b.com','tester');
--     delete from public.access_allowlist where email = 'a@b.com';
--
-- Enforcement is server-side: a DB trigger blocks non-allowlisted signups (any
-- path), and the app proxy blocks non-allowlisted sessions from the product
-- (the proxy gate is enabled in prod via the ACCESS_RESTRICTED env var).

create table if not exists public.access_allowlist (
  email      text primary key,
  note       text,
  created_at timestamptz not null default now()
);

-- RLS on, no policies => not readable/writable by anon or authenticated clients.
-- The list is managed with the service role (dashboard) and read only through
-- the security-definer function below.
alter table public.access_allowlist enable row level security;

-- Case-insensitive membership check. Callable by the proxy (anon/authenticated).
create or replace function public.is_email_allowed(check_email text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.access_allowlist
    where lower(email) = lower(coalesce(check_email, ''))
  );
$$;
grant execute on function public.is_email_allowed(text) to anon, authenticated;

-- Hard backstop: reject new auth users whose email isn't allowlisted, no matter
-- how the signup is attempted (UI, API, etc.).
create or replace function public.enforce_access_allowlist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_email_allowed(new.email) then
    raise exception 'Signups are invite-only'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_access_allowlist on auth.users;
create trigger enforce_access_allowlist
  before insert on auth.users
  for each row execute function public.enforce_access_allowlist();

-- Keep the demo accounts working under the gate.
insert into public.access_allowlist (email, note) values
  ('demo.student@spotlightsapp.com', 'demo'),
  ('demo.recruiter@spotlightsapp.com', 'demo')
on conflict (email) do nothing;

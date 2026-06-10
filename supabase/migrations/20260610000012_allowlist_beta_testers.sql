-- Private beta: the invite-only gate is now always-on in code (src/lib/access.ts
-- + src/proxy.ts), with no env flag. Make sure every account that already
-- exists keeps working, and pin the owner's email explicitly.

-- Everyone who already has an account was invited by hand — allowlist them so
-- the now-permanent session gate doesn't lock them out.
insert into public.access_allowlist (email, note)
select u.email, 'pre-gate existing user'
from auth.users u
where u.email is not null
on conflict (email) do nothing;

insert into public.access_allowlist (email, note) values
  ('bzhou1018@berkeley.edu', 'owner')
on conflict (email) do nothing;

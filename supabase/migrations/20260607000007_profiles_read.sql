-- Profiles should be readable by any signed-in user (to show names/avatars in
-- the inbox, on companies/people, profile viewers, etc.). Writes stay own-only.
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_read_authenticated" on public.profiles;
create policy "profiles_read_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

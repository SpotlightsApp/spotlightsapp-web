-- Storage buckets for user/company uploads (avatars, company logos, event images).
-- Public read so URLs render anywhere; authenticated write.

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('company-logos', 'company-logos', true),
  ('event-images', 'event-images', true)
on conflict (id) do nothing;

-- Public read for all three buckets.
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select
  using (bucket_id in ('avatars', 'company-logos', 'event-images'));

-- Avatars: a user may write only inside their own folder (<uid>/...).
drop policy if exists "avatars write own" on storage.objects;
create policy "avatars write own" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
drop policy if exists "avatars update own" on storage.objects;
create policy "avatars update own" on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
drop policy if exists "avatars delete own" on storage.objects;
create policy "avatars delete own" on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Company logos + event images: any authenticated user may upload/manage.
-- (Finer per-company scoping can be layered on later; reads are public.)
drop policy if exists "brand media write" on storage.objects;
create policy "brand media write" on storage.objects for insert to authenticated
  with check (bucket_id in ('company-logos', 'event-images'));
drop policy if exists "brand media update" on storage.objects;
create policy "brand media update" on storage.objects for update to authenticated
  using (bucket_id in ('company-logos', 'event-images'));
drop policy if exists "brand media delete" on storage.objects;
create policy "brand media delete" on storage.objects for delete to authenticated
  using (bucket_id in ('company-logos', 'event-images'));

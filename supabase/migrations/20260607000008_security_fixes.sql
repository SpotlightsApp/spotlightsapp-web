-- Security hardening from the backend QA sweep.
--
-- 1) Inbox: the previous conversations_insert / cp_insert policies used
--    `with check (true)`, which let any authenticated user create a conversation
--    and then enroll themselves (or anyone) into an existing conversation_id,
--    defeating the participant-only read restriction on conversations/messages.
--    The app never creates conversations or participant rows from the client
--    (see src/app/(app)/inbox/actions.ts) -- those are provisioned via the
--    service role, which bypasses RLS. So we deny client-side inserts entirely.
--    When user-initiated conversations are built, add a security-definer RPC
--    that creates the conversation and both participant rows in one transaction.
drop policy if exists conversations_insert on public.conversations;
create policy conversations_insert on public.conversations for insert to authenticated
  with check (false);

drop policy if exists cp_insert on public.conversation_participants;
create policy cp_insert on public.conversation_participants for insert to authenticated
  with check (false);

-- 2) Storage: the brand-media (company-logos, event-images) write/update/delete
--    policies let ANY authenticated user overwrite or delete ANY company's logo
--    or event image (no ownership scoping, unlike avatars). No app path uploads
--    to these buckets yet (only the avatars bucket is wired up). Restrict writes
--    to members of the owning company, keyed by the first path segment being the
--    company id: uploads must use `<company_id>/<file>`.
drop policy if exists "brand media write" on storage.objects;
create policy "brand media write" on storage.objects for insert to authenticated
  with check (
    bucket_id in ('company-logos', 'event-images')
    and public.is_company_member(
      ((storage.foldername(name))[1])::uuid, auth.uid()
    )
  );
drop policy if exists "brand media update" on storage.objects;
create policy "brand media update" on storage.objects for update to authenticated
  using (
    bucket_id in ('company-logos', 'event-images')
    and public.is_company_member(
      ((storage.foldername(name))[1])::uuid, auth.uid()
    )
  );
drop policy if exists "brand media delete" on storage.objects;
create policy "brand media delete" on storage.objects for delete to authenticated
  using (
    bucket_id in ('company-logos', 'event-images')
    and public.is_company_member(
      ((storage.foldername(name))[1])::uuid, auth.uid()
    )
  );

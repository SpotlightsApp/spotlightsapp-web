-- Employer side of the marketplace, on the SAME tables the student side uses.
-- Employers are company_members; they post to public.jobs (write policy
-- already exists) and review public.applications joined with public.profiles
-- (any-authenticated read since 20260607000007). No employer-only copies.

/* Employers can see applications for their company's jobs. */
drop policy if exists applications_company_read on public.applications;
create policy applications_company_read on public.applications
  for select to authenticated
  using (
    exists (
      select 1 from public.jobs j
      where j.id = job_id
        and public.is_company_member(j.company_id, auth.uid())
    )
  );

/* Employers can move an application through the pipeline (status updates). */
drop policy if exists applications_company_update on public.applications;
create policy applications_company_update on public.applications
  for update to authenticated
  using (
    exists (
      select 1 from public.jobs j
      where j.id = job_id
        and public.is_company_member(j.company_id, auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.jobs j
      where j.id = job_id
        and public.is_company_member(j.company_id, auth.uid())
    )
  );

/* Consolidation: the employer registration flow now writes company_members
   (per the core schema). employer_profiles was created out-of-band, is empty,
   and nothing reads it — drop the duplicate. */
drop table if exists public.employer_profiles;

/* Beta convenience: attach the owner + demo recruiter to the seeded Google
   workspace so employer flows are immediately testable. */
insert into public.company_members (company_id, user_id, role)
select c.id, u.id, 'owner'
from public.companies c
join auth.users u
  on lower(u.email) in ('bzhou1018@berkeley.edu', 'demo.recruiter@spotlightsapp.com')
where c.slug = 'google'
on conflict do nothing;

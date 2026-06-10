-- Job lifecycle: employers can close (and reopen) roles from the console.
-- Closed jobs disappear from student lists, stop accepting applications, and
-- keep their application history (no hard delete needed).

alter table public.jobs
  add column if not exists status text not null default 'open'
  check (status in ('open', 'closed'));

create index if not exists jobs_status_idx on public.jobs (status);

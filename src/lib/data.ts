/**
 * Data access layer — Supabase reads (server-side).
 * Components import TYPES from "@/lib/types"; only server components/actions
 * call these functions (they use the cookie-bound server client).
 */
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  Company,
  Job,
  JobWithCompany,
  ApplicationItem,
  CareerEvent,
  Industry,
  JobType,
  WorkMode,
} from "@/lib/types";

/* ----------------------------- mappers ------------------------------ */

type CompanyRow = {
  id: string; slug: string; name: string; tagline: string | null;
  about: string | null; industry: string | null; size: string | null;
  location: string | null; website: string | null; logo_url: string | null;
  founded: number | null; hiring: boolean;
};
type JobRow = {
  id: string; slug: string; company_id: string; title: string;
  type: string | null; work_mode: string | null; location: string | null;
  industry: string | null; salary_min: number | null; salary_max: number | null;
  salary_period: string | null; description: string | null;
  responsibilities: string[] | null; requirements: string[] | null;
  skills: string[] | null; featured: boolean; posted_at: string;
};
type EventRow = {
  id: string; slug: string; title: string; host: string | null;
  kind: string | null; mode: string | null; location: string | null;
  image_url: string | null; starts_at: string | null; duration_mins: number | null;
  description: string | null;
};

const daysAgo = (iso: string) =>
  Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));

// Deterministic pseudo applicant count for display (10–80) until real apps land.
function pseudoApplicants(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return 10 + (Math.abs(h) % 71);
}

function toCompany(r: CompanyRow, openRoles = 0): Company {
  return {
    id: r.id, slug: r.slug, name: r.name, tagline: r.tagline ?? "",
    about: r.about ?? "", industry: (r.industry ?? "Software") as Industry,
    size: r.size ?? "", location: r.location ?? "", website: r.website ?? "",
    logoUrl: r.logo_url ?? undefined, hiring: r.hiring, openRoles,
    perks: [], founded: r.founded ?? 0,
  };
}
function toJob(r: JobRow): Job {
  return {
    id: r.id, slug: r.slug, title: r.title, companyId: r.company_id,
    type: (r.type ?? "Full-time") as JobType,
    workMode: (r.work_mode ?? "On-site") as WorkMode,
    location: r.location ?? "", industry: (r.industry ?? "Software") as Industry,
    salaryMin: r.salary_min ?? 0, salaryMax: r.salary_max ?? 0,
    salaryPeriod: (r.salary_period ?? "mo") as "mo" | "yr",
    postedDaysAgo: daysAgo(r.posted_at), applicants: pseudoApplicants(r.id),
    description: r.description ?? "", responsibilities: r.responsibilities ?? [],
    requirements: r.requirements ?? [], skills: r.skills ?? [],
    featured: r.featured,
  };
}
function toEvent(r: EventRow): CareerEvent {
  return {
    id: r.id, slug: r.slug, title: r.title, host: r.host ?? "",
    kind: (r.kind ?? "Networking") as CareerEvent["kind"],
    mode: (r.mode ?? "On-site") as WorkMode, location: r.location ?? "",
    imageUrl: r.image_url ?? undefined, date: r.starts_at ?? new Date().toISOString(),
    durationMins: r.duration_mins ?? 60, attendees: pseudoApplicants(r.id) * 8,
    description: r.description ?? "",
  };
}

/* ----------------------------- companies ---------------------------- */

export async function getCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const [{ data: companies }, { data: jobs }] = await Promise.all([
    supabase.from("companies").select("*").order("name"),
    supabase.from("jobs").select("company_id"),
  ]);
  const counts = new Map<string, number>();
  for (const j of jobs ?? []) counts.set(j.company_id, (counts.get(j.company_id) ?? 0) + 1);
  return (companies ?? []).map((c) => toCompany(c as CompanyRow, counts.get(c.id) ?? 0));
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("companies").select("*").eq("slug", slug).maybeSingle();
  if (!data) return null;
  const { count } = await supabase
    .from("jobs").select("*", { count: "exact", head: true }).eq("company_id", data.id);
  return toCompany(data as CompanyRow, count ?? 0);
}

export async function getFeaturedCompanies(limit = 8): Promise<Company[]> {
  return (await getCompanies()).sort((a, b) => b.openRoles - a.openRoles).slice(0, limit);
}

/* ------------------------------- jobs ------------------------------- */

export interface JobFilters {
  q?: string; types?: JobType[]; workModes?: WorkMode[];
  industries?: Industry[]; sort?: "recent" | "salary";
}

async function jobsWithCompanies(rows: JobRow[]): Promise<JobWithCompany[]> {
  if (rows.length === 0) return [];
  const supabase = await createClient();
  const ids = [...new Set(rows.map((r) => r.company_id))];
  const { data: companies } = await supabase.from("companies").select("*").in("id", ids);
  const byId = new Map((companies ?? []).map((c) => [c.id, toCompany(c as CompanyRow)]));
  return rows.map((r) => ({ ...toJob(r), company: byId.get(r.company_id)! }));
}

export async function getJobs(filters: JobFilters = {}): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false });
  let jobs = await jobsWithCompanies((data ?? []) as JobRow[]);
  const q = filters.q?.trim().toLowerCase();
  if (q)
    jobs = jobs.filter((j) =>
      [j.title, j.company.name, j.industry, ...j.skills].join(" ").toLowerCase().includes(q));
  if (filters.types?.length) jobs = jobs.filter((j) => filters.types!.includes(j.type));
  if (filters.workModes?.length) jobs = jobs.filter((j) => filters.workModes!.includes(j.workMode));
  if (filters.industries?.length) jobs = jobs.filter((j) => filters.industries!.includes(j.industry));
  if (filters.sort === "salary") jobs.sort((a, b) => b.salaryMax - a.salaryMax);
  return jobs;
}

export async function getJobBySlug(slug: string): Promise<JobWithCompany | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("jobs").select("*").eq("slug", slug).maybeSingle();
  if (!data) return null;
  const [job] = await jobsWithCompanies([data as JobRow]);
  return job ?? null;
}

export async function getFeaturedJobs(limit = 6): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs").select("*").eq("featured", true)
    .order("posted_at", { ascending: false }).limit(limit);
  return jobsWithCompanies((data ?? []) as JobRow[]);
}

export async function getJobsByCompany(companyId: string): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs").select("*").eq("company_id", companyId)
    .order("posted_at", { ascending: false });
  return jobsWithCompanies((data ?? []) as JobRow[]);
}

export async function getRelatedJobs(job: JobWithCompany, limit = 3): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs").select("*").eq("industry", job.industry).neq("id", job.id).limit(limit);
  return jobsWithCompanies((data ?? []) as JobRow[]);
}

/* ------------------------------ events ------------------------------ */

export async function getEvents(): Promise<CareerEvent[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("starts_at");
  return ((data ?? []) as EventRow[]).map(toEvent);
}

export async function getEventBySlug(slug: string): Promise<CareerEvent | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").eq("slug", slug).maybeSingle();
  return data ? toEvent(data as EventRow) : null;
}

export async function getUpcomingEvents(limit = 3): Promise<CareerEvent[]> {
  return (await getEvents()).slice(0, limit);
}

/* --------------------------- user activity -------------------------- */

/** Jobs the signed-in user has saved, most-recent first. */
export async function getSavedJobs(limit?: number): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  let q = supabase
    .from("saved_jobs")
    .select("job_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data: rows } = await q;

  const ids = (rows ?? []).map((r) => r.job_id);
  if (ids.length === 0) return [];
  const { data: jobs } = await supabase.from("jobs").select("*").in("id", ids);
  const list = await jobsWithCompanies((jobs ?? []) as JobRow[]);
  // Preserve saved-at ordering (the `in` query does not).
  const order = new Map(ids.map((id, i) => [id, i] as const));
  return list.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

/** Jobs the signed-in user has applied to, with status + date, newest first. */
export async function getApplications(limit?: number): Promise<ApplicationItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  let q = supabase
    .from("applications")
    .select("job_id, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data: rows } = await q;

  const items = rows ?? [];
  if (items.length === 0) return [];
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .in("id", items.map((r) => r.job_id));
  const byId = new Map(
    (await jobsWithCompanies((jobs ?? []) as JobRow[])).map((j) => [j.id, j]),
  );
  return items
    .map((r) => {
      const job = byId.get(r.job_id);
      return job
        ? { job, status: r.status ?? "applied", appliedAt: r.created_at }
        : null;
    })
    .filter((x): x is ApplicationItem => x !== null);
}

/* ---------------------------- aggregates ---------------------------- */

export async function getStats() {
  const supabase = await createClient();
  const [companies, jobs, events] = await Promise.all([
    supabase.from("companies").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
  ]);
  return {
    companies: companies.count ?? 0,
    jobs: jobs.count ?? 0,
    events: events.count ?? 0,
  };
}

/** Fallback display name used before a profile is filled in. */
export function getStudent() {
  return { name: "there" };
}

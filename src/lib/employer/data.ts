/**
 * Employer-side data access — same Supabase tables the student side uses
 * (companies, company_members, jobs, applications, profiles). The signed-in
 * employer's company comes from company_members; applicant visibility is
 * granted by the applications_company_* RLS policies (migration ...0013).
 */
import "server-only";
import { createClient } from "@/lib/supabase/server";
import { toCompany, type CompanyRow } from "@/lib/data";
import type { Company } from "@/lib/types";

export interface EmployerContext {
  company: Company;
  role: string;
}

/** The signed-in user's company workspace, or null if not linked to one. */
export async function getEmployerCompany(): Promise<EmployerContext | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: membership } = await supabase
    .from("company_members")
    .select("company_id, role")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!membership) return null;
  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", membership.company_id)
    .maybeSingle();
  if (!company) return null;
  return { company: toCompany(company as CompanyRow), role: membership.role };
}

/** Real applicant counts per job for the company (job_id → count). */
export async function getCompanyApplicationCounts(
  companyId: string,
): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("applications")
    .select("job_id, jobs!inner(company_id)")
    .eq("jobs.company_id", companyId);
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.job_id] = (counts[row.job_id] ?? 0) + 1;
  }
  return counts;
}

export interface ApplicantRow {
  id: string; // application id
  status: string;
  appliedDaysAgo: number;
  job: { id: string; slug: string; title: string };
  student: {
    id: string;
    name: string;
    headline: string;
    school: string;
    gradYear: string;
    location: string;
    avatarUrl?: string;
  };
}

type ApplicationJoinRow = {
  id: string;
  status: string;
  created_at: string;
  user_id: string;
  jobs: { id: string; slug: string; title: string; company_id: string };
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  headline: string | null;
  school: string | null;
  grad_year: string | null;
  location: string | null;
  avatar_url: string | null;
};

const daysAgo = (iso: string) =>
  Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));

/** Applications to the company's jobs, newest first, with student profiles. */
export async function getCompanyApplicants(
  companyId: string,
): Promise<ApplicantRow[]> {
  const supabase = await createClient();
  const { data: apps } = await supabase
    .from("applications")
    .select("id, status, created_at, user_id, jobs!inner(id, slug, title, company_id)")
    .eq("jobs.company_id", companyId)
    .order("created_at", { ascending: false });
  const rows = (apps ?? []) as unknown as ApplicationJoinRow[];
  if (rows.length === 0) return [];

  const userIds = [...new Set(rows.map((r) => r.user_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, headline, school, grad_year, location, avatar_url")
    .in("id", userIds);
  const byId = new Map(((profiles ?? []) as ProfileRow[]).map((p) => [p.id, p]));

  return rows.map((r) => {
    const p = byId.get(r.user_id);
    return {
      id: r.id,
      status: r.status,
      appliedDaysAgo: daysAgo(r.created_at),
      job: { id: r.jobs.id, slug: r.jobs.slug, title: r.jobs.title },
      student: {
        id: r.user_id,
        name: p?.full_name ?? "Student",
        headline: p?.headline ?? "",
        school: p?.school ?? "",
        gradYear: p?.grad_year ?? "",
        location: p?.location ?? "",
        avatarUrl: p?.avatar_url ?? undefined,
      },
    };
  });
}

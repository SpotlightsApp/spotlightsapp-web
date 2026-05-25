/**
 * Data access layer.
 *
 * The UI imports ONLY from here — never from `lib/mock/*` directly.
 * Today these are synchronous reads over in-memory mock data. When the
 * Supabase backend is wired up, swap each function body for a query
 * (and make them async) without changing a single component.
 */
import { companies } from "@/lib/mock/companies";
import { jobs } from "@/lib/mock/jobs";
import { events, universities } from "@/lib/mock/events";
import {
  demoStudent,
  demoSavedJobIds,
  demoAppliedJobIds,
} from "@/lib/mock/student";
import type {
  Company,
  Job,
  CareerEvent,
  Industry,
  JobType,
  WorkMode,
} from "@/lib/types";

export type JobWithCompany = Job & { company: Company };

function attachCompany(job: Job): JobWithCompany {
  const company = companies.find((c) => c.id === job.companyId)!;
  return { ...job, company };
}

/* ----------------------------- Companies ----------------------------- */

export function getCompanies(): Company[] {
  return companies;
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getFeaturedCompanies(limit = 8): Company[] {
  return [...companies].sort((a, b) => b.openRoles - a.openRoles).slice(0, limit);
}

/* ------------------------------- Jobs -------------------------------- */

export interface JobFilters {
  q?: string;
  types?: JobType[];
  workModes?: WorkMode[];
  industries?: Industry[];
  location?: string;
  sort?: "recent" | "salary";
}

export function getJobs(filters: JobFilters = {}): JobWithCompany[] {
  const q = filters.q?.trim().toLowerCase();
  let result = jobs.map(attachCompany);

  if (q) {
    result = result.filter((j) =>
      [j.title, j.company.name, j.industry, ...j.skills]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  if (filters.types?.length) {
    result = result.filter((j) => filters.types!.includes(j.type));
  }
  if (filters.workModes?.length) {
    result = result.filter((j) => filters.workModes!.includes(j.workMode));
  }
  if (filters.industries?.length) {
    result = result.filter((j) => filters.industries!.includes(j.industry));
  }
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((j) => j.location.toLowerCase().includes(loc));
  }

  result.sort((a, b) =>
    filters.sort === "salary"
      ? b.salaryMax - a.salaryMax
      : a.postedDaysAgo - b.postedDaysAgo,
  );
  return result;
}

export function getJobBySlug(slug: string): JobWithCompany | undefined {
  const job = jobs.find((j) => j.slug === slug);
  return job ? attachCompany(job) : undefined;
}

export function getFeaturedJobs(limit = 6): JobWithCompany[] {
  return jobs
    .filter((j) => j.featured)
    .map(attachCompany)
    .slice(0, limit);
}

export function getJobsByCompany(companyId: string): JobWithCompany[] {
  return jobs.filter((j) => j.companyId === companyId).map(attachCompany);
}

export function getRelatedJobs(job: JobWithCompany, limit = 3): JobWithCompany[] {
  return jobs
    .filter((j) => j.id !== job.id && j.industry === job.industry)
    .map(attachCompany)
    .slice(0, limit);
}

/* ------------------------------ Events ------------------------------- */

export function getEvents(): CareerEvent[] {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

export function getEventBySlug(slug: string): CareerEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(limit = 3): CareerEvent[] {
  return getEvents().slice(0, limit);
}

/* --------------------------- Universities ---------------------------- */

export function getUniversities() {
  return universities;
}

/* ------------------------------ Student ------------------------------ */

export function getStudent() {
  return demoStudent;
}

export function getSavedJobs(): JobWithCompany[] {
  return jobs.filter((j) => demoSavedJobIds.includes(j.id)).map(attachCompany);
}

export function getAppliedJobs(): JobWithCompany[] {
  return jobs.filter((j) => demoAppliedJobIds.includes(j.id)).map(attachCompany);
}

/* --------------------------- Aggregations ---------------------------- */

export function getIndustryCounts(): { industry: Industry; count: number }[] {
  const map = new Map<Industry, number>();
  for (const j of jobs) map.set(j.industry, (map.get(j.industry) ?? 0) + 1);
  return [...map.entries()]
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count);
}

export function getStats() {
  return {
    jobs: jobs.length,
    internships: jobs.filter((j) => j.type === "Internship").length,
    companies: companies.length,
    universities: universities.length,
    students: 12000,
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getEmployerCompany } from "@/lib/employer/data";

export type CreateJobInput = {
  title: string;
  type: string;
  workMode: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod: "mo" | "yr";
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
};

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "role"
  );
}

/** Insert into the SAME public.jobs table students browse — the jobs_write
 *  RLS policy enforces company membership. */
export async function createJob(
  input: CreateJobInput,
): Promise<{ ok: true; slug: string } | { error: string }> {
  const ctx = await getEmployerCompany();
  if (!ctx) return { error: "Your account isn't linked to a company." };

  const title = input.title.trim();
  if (!title) return { error: "Job title is required." };
  if (!input.location.trim()) return { error: "Location is required." };
  if (!input.description.trim()) return { error: "Description is required." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const slug = `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`;
  // created_by marks this as real (non-seed) data — seed-admin.mjs cleans
  // only rows where created_by is null.
  const { error } = await supabase.from("jobs").insert({
    slug,
    company_id: ctx.company.id,
    title,
    type: input.type,
    work_mode: input.workMode,
    location: input.location.trim(),
    industry: ctx.company.industry,
    salary_min: input.salaryMin ?? null,
    salary_max: input.salaryMax ?? null,
    salary_period: input.salaryPeriod,
    description: input.description.trim(),
    responsibilities: input.responsibilities.filter(Boolean),
    requirements: input.requirements.filter(Boolean),
    skills: input.skills.filter(Boolean),
    created_by: user?.id ?? null,
  });
  if (error) return { error: error.message };

  revalidatePath("/employers/talent/jobs");
  revalidatePath("/jobs");
  revalidatePath("/explore");
  return { ok: true, slug };
}

/** Edit an existing posting — jobs_write RLS scopes this to company members. */
export async function updateJob(
  jobId: string,
  input: CreateJobInput,
): Promise<{ ok: true; slug: string } | { error: string }> {
  const title = input.title.trim();
  if (!title) return { error: "Job title is required." };
  if (!input.location.trim()) return { error: "Location is required." };
  if (!input.description.trim()) return { error: "Description is required." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .update({
      title,
      type: input.type,
      work_mode: input.workMode,
      location: input.location.trim(),
      salary_min: input.salaryMin ?? null,
      salary_max: input.salaryMax ?? null,
      salary_period: input.salaryPeriod,
      description: input.description.trim(),
      responsibilities: input.responsibilities.filter(Boolean),
      requirements: input.requirements.filter(Boolean),
      skills: input.skills.filter(Boolean),
    })
    .eq("id", jobId)
    .select("slug");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "Job not found or not yours to edit." };

  revalidatePath("/employers/talent/jobs");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${data[0].slug}`);
  revalidatePath("/explore");
  return { ok: true, slug: data[0].slug };
}

/** Close (hide from students, keep applications) or reopen a posting. */
export async function setJobStatus(
  jobId: string,
  status: "open" | "closed",
): Promise<{ ok: true } | { error: string }> {
  if (status !== "open" && status !== "closed") return { error: "Invalid status." };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId)
    .select("slug");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "Job not found or not yours to update." };

  revalidatePath("/employers/talent/jobs");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${data[0].slug}`);
  revalidatePath("/explore");
  return { ok: true };
}

/** Permanently delete a posting — cascades its applications. */
export async function deleteJob(
  jobId: string,
): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .select("id");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "Job not found or not yours to delete." };

  revalidatePath("/employers/talent/jobs");
  revalidatePath("/employers/talent/applicants");
  revalidatePath("/jobs");
  revalidatePath("/explore");
  return { ok: true };
}

const APPLICATION_STATUSES = ["applied", "interview", "offer", "rejected"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Move an application through the pipeline — the applications_company_update
 *  RLS policy restricts this to the employer's own jobs. The student sees the
 *  same row update on their dashboard. */
export async function setApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
): Promise<{ ok: true } | { error: string }> {
  if (!APPLICATION_STATUSES.includes(status)) {
    return { error: "Invalid status." };
  }
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId)
    .select("id");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "Application not found or not yours to update." };

  revalidatePath("/employers/talent/applicants");
  revalidatePath("/jobs");
  return { ok: true };
}

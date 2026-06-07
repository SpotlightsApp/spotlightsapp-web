"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Apply to a job for the signed-in user. Inserts into `applications` with
 * status 'applied'. A duplicate (unique violation, code 23505) is treated as
 * success since the user has already applied.
 */
export async function applyToJob(jobId: string): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { error } = await supabase
    .from("applications")
    .insert({ user_id: user.id, job_id: jobId, status: "applied" });

  if (error && error.code !== "23505") {
    console.error("applyToJob failed:", error.message);
    return { ok: false };
  }
  return { ok: true };
}

/**
 * Toggle the saved state of a job for the signed-in user. Deletes the
 * `saved_jobs` row if it exists, otherwise inserts one.
 */
export async function toggleSaveJob(
  jobId: string
): Promise<{ saved: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  const { data: existing, error: selErr } = await supabase
    .from("saved_jobs")
    .select("job_id")
    .eq("user_id", user.id)
    .eq("job_id", jobId)
    .maybeSingle();

  if (selErr) {
    console.error("toggleSaveJob select failed:", selErr.message);
    return { saved: false };
  }

  if (existing) {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("user_id", user.id)
      .eq("job_id", jobId);
    if (error) {
      console.error("toggleSaveJob delete failed:", error.message);
      return { saved: true };
    }
    return { saved: false };
  }

  const { error } = await supabase
    .from("saved_jobs")
    .insert({ user_id: user.id, job_id: jobId });
  if (error && error.code !== "23505") {
    console.error("toggleSaveJob insert failed:", error.message);
    return { saved: false };
  }
  return { saved: true };
}

/**
 * Returns whether the signed-in user has applied to and/or saved a job.
 */
export async function getJobActivity(
  jobId: string
): Promise<{ applied: boolean; saved: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { applied: false, saved: false };

  const [application, saved] = await Promise.all([
    supabase
      .from("applications")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_id", jobId)
      .maybeSingle(),
    supabase
      .from("saved_jobs")
      .select("job_id")
      .eq("user_id", user.id)
      .eq("job_id", jobId)
      .maybeSingle(),
  ]);

  return { applied: !!application.data, saved: !!saved.data };
}

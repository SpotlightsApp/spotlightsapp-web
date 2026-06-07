import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/server";
import { getDisplayName } from "@/lib/user";
import { getFeaturedJobs } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { loadProfile } from "../profile/actions";
import { profileCompletion } from "../profile/profile-data";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = { title: "Jobs · Spotlights" };

export default async function JobsPage() {
  const [t, name, profile, featuredJobs] = await Promise.all([
    getDict(),
    getDisplayName(),
    loadProfile(),
    getFeaturedJobs(4),
  ]);
  const completion = profileCompletion(profile);

  // Real per-user activity counts.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let applications = 0;
  let saved = 0;
  if (user) {
    const [apps, sav] = await Promise.all([
      supabase.from("applications").select("*", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("saved_jobs").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    ]);
    applications = apps.count ?? 0;
    saved = sav.count ?? 0;
  }

  return (
    <DashboardClient
      name={name}
      completion={completion}
      d={t.dashboard}
      featuredJobs={featuredJobs}
      applications={applications}
      saved={saved}
    />
  );
}

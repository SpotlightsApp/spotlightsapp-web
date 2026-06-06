import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/server";
import { getDisplayName } from "@/lib/user";
import { loadProfile } from "../profile/actions";
import { profileCompletion } from "../profile/profile-data";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = { title: "Jobs — Spotlights" };

export default async function JobsPage() {
  const t = await getDict();
  const name = await getDisplayName();
  const profile = await loadProfile();
  const completion = profileCompletion(profile);

  return (
    <DashboardClient name={name} completion={completion} d={t.dashboard} />
  );
}

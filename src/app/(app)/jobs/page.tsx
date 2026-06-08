import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/server";
import { getDisplayName } from "@/lib/user";
import {
  getFeaturedJobs,
  getSavedJobs,
  getApplications,
  getUpcomingEvents,
} from "@/lib/data";
import { loadProfile } from "../profile/actions";
import { profileCompletion } from "../profile/profile-data";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = { title: "Jobs · Spotlights" };

export default async function JobsPage() {
  const [t, name, profile, featuredJobs, savedJobs, applications, events] =
    await Promise.all([
      getDict(),
      getDisplayName(),
      loadProfile(),
      getFeaturedJobs(4),
      getSavedJobs(),
      getApplications(),
      getUpcomingEvents(3),
    ]);
  const completion = profileCompletion(profile);

  return (
    <DashboardClient
      name={name}
      completion={completion}
      d={t.dashboard}
      featuredJobs={featuredJobs}
      savedJobs={savedJobs}
      applications={applications}
      events={events}
    />
  );
}

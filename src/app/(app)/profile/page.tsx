import type { Metadata } from "next";
import { ProfilePage } from "./profile-page";
import { loadProfile } from "./actions";

export const metadata: Metadata = { title: "My profile — Spotlights" };

export default async function Page() {
  const initial = await loadProfile();
  return <ProfilePage initial={initial} />;
}

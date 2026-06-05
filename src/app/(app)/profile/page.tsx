import type { Metadata } from "next";
import { getDisplayName } from "@/lib/user";
import { ProfilePage } from "./profile-page";

export const metadata: Metadata = { title: "My profile — Spotlights" };

export default async function Page() {
  const name = await getDisplayName();
  return <ProfilePage defaultName={name} />;
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { getDisplayName } from "@/lib/user";
import {
  emptyProfile,
  profileToRow,
  rowToProfile,
  type FullProfile,
} from "./profile-data";

/**
 * Load the signed-in user's profile. Falls back to an empty profile (seeded
 * with their display name) if there's no row yet or the table doesn't exist
 * (e.g. before the migration has been applied).
 */
export async function loadProfile(): Promise<FullProfile> {
  const name = await getDisplayName();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return emptyProfile(name);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("loadProfile failed:", error.message);
    return emptyProfile(name);
  }
  return data ? rowToProfile(data, name) : emptyProfile(name);
}

export type SaveResult = { ok: true } | { ok: false; error: string };

/** Upsert the signed-in user's profile. */
export async function saveProfile(profile: FullProfile): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { error } = await supabase
    .from("profiles")
    .upsert(profileToRow(profile, user.id), { onConflict: "id" });

  if (error) {
    console.error("saveProfile failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

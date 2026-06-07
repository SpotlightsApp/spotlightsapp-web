"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * RSVP the signed-in user to an event. Inserts into `event_rsvps`. A duplicate
 * (unique violation, code 23505) is treated as success since the user is
 * already registered.
 */
export async function rsvpEvent(
  eventId: string
): Promise<{ registered: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { registered: false };

  const { error } = await supabase
    .from("event_rsvps")
    .insert({ user_id: user.id, event_id: eventId });

  if (error && error.code !== "23505") {
    console.error("rsvpEvent failed:", error.message);
    return { registered: false };
  }
  return { registered: true };
}

/**
 * Returns whether the signed-in user is registered for an event.
 */
export async function getEventRsvp(
  eventId: string
): Promise<{ registered: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { registered: false };

  const { data } = await supabase
    .from("event_rsvps")
    .select("event_id")
    .eq("user_id", user.id)
    .eq("event_id", eventId)
    .maybeSingle();

  return { registered: !!data };
}

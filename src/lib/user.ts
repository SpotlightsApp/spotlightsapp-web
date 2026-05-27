import { createClient } from "@/lib/supabase/server";
import { getStudent } from "@/lib/data";

/**
 * Display name for the signed-in user, read from Supabase auth metadata
 * (full_name set at signup, else the email local-part). Falls back to the
 * mock student only when Supabase isn't configured / no session.
 */
export async function getDisplayName(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const full = (user.user_metadata?.full_name as string | undefined)?.trim();
      return full || user.email?.split("@")[0] || getStudent().name;
    }
  }
  return getStudent().name;
}

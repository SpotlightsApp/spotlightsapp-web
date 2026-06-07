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

/** Display name + avatar for the signed-in user (avatar from their profile). */
export async function getDisplayUser(): Promise<{
  name: string;
  avatarUrl?: string;
}> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const full = (user.user_metadata?.full_name as string | undefined)?.trim();
      const name = full || user.email?.split("@")[0] || getStudent().name;
      const { data: profile } = await supabase
        .from("profiles")
        .select("avatar_url, full_name")
        .eq("id", user.id)
        .maybeSingle();
      return {
        name: (profile?.full_name as string) || name,
        avatarUrl: (profile?.avatar_url as string | null) ?? undefined,
      };
    }
  }
  return { name: getStudent().name };
}

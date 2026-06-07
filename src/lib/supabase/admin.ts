// Server-only: never import from a client component. Uses the service-role key
// which is NOT prefixed NEXT_PUBLIC_ and therefore unavailable in the browser.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}
if (!serviceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
}

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

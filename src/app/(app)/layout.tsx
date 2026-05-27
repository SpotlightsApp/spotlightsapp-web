import { AppNavbar } from "@/components/app/app-navbar";
import { createClient } from "@/lib/supabase/server";
import { getStudent } from "@/lib/data";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Access is enforced by middleware; here we just read the user for display.
  let name = getStudent().name;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      name =
        (user.user_metadata?.full_name as string | undefined) ||
        user.email?.split("@")[0] ||
        name;
    }
  }

  return (
    <>
      <AppNavbar name={name} />
      <main className="flex-1 bg-surface">{children}</main>
    </>
  );
}

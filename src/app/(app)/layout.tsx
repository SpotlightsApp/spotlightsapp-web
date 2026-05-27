import { AppNavbar } from "@/components/app/app-navbar";
import { getDisplayName } from "@/lib/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Access is enforced by the proxy; here we just read the user for display.
  const name = await getDisplayName();
  return (
    <>
      <AppNavbar name={name} />
      <main className="flex-1 bg-surface">{children}</main>
    </>
  );
}

import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { getDisplayName } from "@/lib/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const name = await getDisplayName();
  return (
    <div className="flex min-h-full flex-1">
      <AppSidebar />
      <div className="flex flex-1 flex-col md:pl-[220px]">
        <AppTopbar name={name} />
        <main className="flex-1 bg-surface">{children}</main>
      </div>
    </div>
  );
}

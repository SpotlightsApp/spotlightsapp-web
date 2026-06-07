import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { getDisplayUser } from "@/lib/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { name, avatarUrl } = await getDisplayUser();
  return (
    <div className="flex min-h-full flex-1">
      <AppSidebar />
      <div className="flex flex-1 flex-col md:pl-[220px]">
        <AppTopbar name={name} avatarUrl={avatarUrl} />
        <main className="flex-1 bg-surface">{children}</main>
      </div>
    </div>
  );
}

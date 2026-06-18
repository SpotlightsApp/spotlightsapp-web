import type { Metadata } from "next";
import { TalentSidebar } from "@/components/employers/talent/talent-sidebar";
import { TalentTopbar } from "@/components/employers/talent/talent-topbar";
import { getEmployerCompany } from "@/lib/employer/data";
import { getDisplayUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Talent console — Spotlight for Employers",
  description:
    "Explore, rank, and review student talent across the Spotlight network.",
};

export default async function TalentConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ name, avatarUrl }, ctx] = await Promise.all([
    getDisplayUser(),
    getEmployerCompany(),
  ]);
  return (
    <div className="flex min-h-full flex-1">
      <TalentSidebar />
      <div className="flex min-w-0 flex-1 flex-col md:pl-[220px]">
        <TalentTopbar
          name={name}
          avatarUrl={avatarUrl}
          companyName={ctx?.company.name}
        />
        <main className="flex-1 bg-surface">{children}</main>
      </div>
    </div>
  );
}

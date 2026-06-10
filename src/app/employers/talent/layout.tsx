import type { Metadata } from "next";
import { TalentSidebar } from "@/components/employers/talent/talent-sidebar";
import { TalentTopbar } from "@/components/employers/talent/talent-topbar";

export const metadata: Metadata = {
  title: "Talent console — Spotlights for Employers",
  description:
    "Explore, rank, and review student talent across the Spotlights network.",
};

export default function TalentConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1">
      <TalentSidebar />
      <div className="flex min-w-0 flex-1 flex-col md:pl-[220px]">
        <TalentTopbar />
        <main className="flex-1 bg-surface">{children}</main>
      </div>
    </div>
  );
}

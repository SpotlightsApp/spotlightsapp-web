import { AppNavbar } from "@/components/app/app-navbar";
import { getStudent } from "@/lib/data";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = getStudent();
  return (
    <>
      <AppNavbar name={student.name} />
      <main className="flex-1 bg-surface">{children}</main>
    </>
  );
}

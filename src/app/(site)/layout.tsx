import { SiteNavbar } from "@/components/marketing/site-navbar";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNavbar />
      {/* Offset for the fixed navbar (h-16) on inner pages */}
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
    </>
  );
}

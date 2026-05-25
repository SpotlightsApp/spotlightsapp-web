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
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

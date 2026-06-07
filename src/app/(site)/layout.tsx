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
      {/* No top offset — pages let their hero fill behind the transparent
          navbar (each page adds its own top padding to clear it). */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

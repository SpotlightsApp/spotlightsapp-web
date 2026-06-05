import { SiteNavbar } from "@/components/marketing/site-navbar";
import { Hero } from "@/components/marketing/hero";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}

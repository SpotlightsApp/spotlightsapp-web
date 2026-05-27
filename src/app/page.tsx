import { SiteNavbar } from "@/components/marketing/site-navbar";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { ProductDemo } from "@/components/marketing/product-demo";
import { StatStrip } from "@/components/marketing/stat-strip";
import { Positioning } from "@/components/marketing/positioning";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Waitlist } from "@/components/marketing/waitlist";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <ProductDemo />
        <StatStrip />
        <Positioning />
        <HowItWorks />
        <Waitlist />
      </main>
      <SiteFooter />
    </>
  );
}

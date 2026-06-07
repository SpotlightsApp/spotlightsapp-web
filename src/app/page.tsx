import { SiteNavbar } from "@/components/marketing/site-navbar";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { ProductDemo } from "@/components/marketing/product-demo";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <ProductDemo />
      </main>
      <SiteFooter />
    </>
  );
}

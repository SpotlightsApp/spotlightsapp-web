import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Companies — Spotlights" };

export default function CompaniesPage() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-4xl text-foreground sm:text-5xl">Companies</h1>
    </Container>
  );
}

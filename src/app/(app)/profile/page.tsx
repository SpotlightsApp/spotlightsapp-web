import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "My profile — Spotlights" };

export default function ProfilePage() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-4xl text-foreground sm:text-5xl">My profile</h1>
    </Container>
  );
}

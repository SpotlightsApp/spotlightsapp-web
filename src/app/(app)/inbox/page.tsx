import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Inbox — Spotlights" };

export default function InboxPage() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-4xl text-foreground sm:text-5xl">Inbox</h1>
    </Container>
  );
}

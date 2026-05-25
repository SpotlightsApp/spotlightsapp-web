import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EventCard } from "@/components/cards/event-card";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Career events & fairs — Spotlight",
};

export default function EventsPage() {
  const events = getEvents();
  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          Career events & fairs
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Meet recruiters, learn from industry talks, and level up your job
          search — online and across Thailand.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </Container>
  );
}

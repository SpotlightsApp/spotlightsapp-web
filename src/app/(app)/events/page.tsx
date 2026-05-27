import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EventCard } from "@/components/cards/event-card";
import { getEvents } from "@/lib/data";
import { getDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Career events & fairs — Spotlight",
};

export default async function EventsPage() {
  const events = getEvents();
  const t = await getDict();
  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground sm:text-5xl">
          {t.eventsPage.heading}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t.eventsPage.sub}</p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </Container>
  );
}

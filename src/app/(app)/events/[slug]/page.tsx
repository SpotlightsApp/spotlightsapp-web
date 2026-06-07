import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Users, Clock, CalendarDays, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RegisterButton } from "@/components/events/register-button";
import { getEventBySlug } from "@/lib/data";
import { getDict, getLocale } from "@/lib/i18n/server";
import { fill } from "@/lib/i18n/dictionaries";
import { eventDateLong, eventTime } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEventBySlug(slug);
  return { title: e ? `${e.title} · Spotlights` : "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  const t = await getDict();
  const locale = await getLocale();

  const details = [
    { icon: CalendarDays, label: eventDateLong(event.date, locale) },
    {
      icon: Clock,
      label: `${eventTime(event.date, locale)} · ${Math.round(event.durationMins / 60)}h`,
    },
    { icon: MapPin, label: event.location },
    { icon: Users, label: fill(t.eventDetail.attending, { n: event.attendees }) },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t.eventDetail.back}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent" size="md">
              {t.enums.eventKind[event.kind]}
            </Badge>
            <Badge variant="outline" size="md">
              {t.enums.workMode[event.mode]}
            </Badge>
          </div>
          <h1 className="font-display mt-4 text-3xl text-foreground sm:text-4xl">
            {event.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {fill(t.eventDetail.hostedBy, { host: event.host })}
          </p>
          <section className="mt-8">
            <h2 className="text-lg font-semibold">{t.eventDetail.about}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <dl className="space-y-4">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-3 text-sm">
                  <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" />
                  <dd className="text-foreground">{d.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <RegisterButton />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t.eventDetail.free}
            </p>
          </Card>
        </aside>
      </div>
    </Container>
  );
}

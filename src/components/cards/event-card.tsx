"use client";

import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/provider";
import { fill } from "@/lib/i18n/dictionaries";
import type { CareerEvent } from "@/lib/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit", timeZone: "Asia/Bangkok" }),
    month: d
      .toLocaleDateString("en-GB", { month: "short", timeZone: "Asia/Bangkok" })
      .toUpperCase(),
    time: d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    }),
  };
}

export function EventCard({ event }: { event: CareerEvent }) {
  const { t } = useI18n();
  const { day, month, time } = formatDate(event.date);
  return (
    <Card interactive className="group relative flex gap-4 p-5">
      <Link
        href={`/events/${event.slug}`}
        className="absolute inset-0 z-10 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={event.title}
      />
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] bg-accent-soft text-accent-strong">
        <span className="text-xs font-semibold">{month}</span>
        <span className="text-2xl font-bold leading-none">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{t.enums.eventKind[event.kind]}</Badge>
          <Badge variant="neutral">{t.enums.workMode[event.mode]}</Badge>
        </div>
        <h3 className="mt-2 truncate font-semibold tracking-tight group-hover:text-accent-strong">
          {event.title}
        </h3>
        <p className="truncate text-sm text-muted-foreground">{event.host}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </span>
          <span>{time}</span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {fill(t.eventCard.going, { n: event.attendees })}
          </span>
        </div>
      </div>
    </Card>
  );
}

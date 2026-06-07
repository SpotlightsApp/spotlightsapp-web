"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Users, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/provider";
import { fill } from "@/lib/i18n/dictionaries";
import { eventDateBadge } from "@/lib/utils";
import type { CareerEvent } from "@/lib/types";

export function EventCard({ event }: { event: CareerEvent }) {
  const { t, locale } = useI18n();
  const { day, month, time } = eventDateBadge(event.date, locale);
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = event.imageUrl && !imgFailed;

  return (
    <Card interactive className="group relative flex flex-col overflow-hidden p-0">
      <Link
        href={`/events/${event.slug}`}
        className="absolute inset-0 z-10 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={event.title}
      />
      {/* Banner */}
      <div className="relative h-36 w-full overflow-hidden bg-accent-soft">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt=""
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-accent-strong">
            <CalendarDays className="h-10 w-10" />
          </div>
        )}
        {/* Date chip */}
        <div className="absolute left-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-[12px] bg-background/95 text-accent-strong shadow-sm backdrop-blur">
          <span className="text-[10px] font-semibold">{month}</span>
          <span className="text-xl font-bold leading-none">{day}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{t.enums.eventKind[event.kind]}</Badge>
          <Badge variant="neutral">{t.enums.workMode[event.mode]}</Badge>
        </div>
        <h3 className="mt-2 truncate font-semibold tracking-tight group-hover:text-accent-strong">
          {event.title}
        </h3>
        <p className="truncate text-sm text-muted-foreground">{event.host}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
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

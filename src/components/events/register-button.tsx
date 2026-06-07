"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { rsvpEvent } from "@/app/(app)/events/actions";

/** RSVP to an event. Persists to Supabase via server action (event_rsvps). */
export function RegisterButton({
  eventId,
  initialRegistered = false,
}: {
  eventId: string;
  initialRegistered?: boolean;
}) {
  const { t } = useI18n();
  const [registered, setRegistered] = useState(initialRegistered);
  const [isPending, startTransition] = useTransition();

  const handleRegister = () => {
    startTransition(async () => {
      const { registered: next } = await rsvpEvent(eventId);
      if (next) setRegistered(true);
    });
  };

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={registered || isPending}
      onClick={handleRegister}
    >
      {registered ? (
        <>
          <Check className="h-5 w-5" /> {t.eventDetail.registered}
        </>
      ) : (
        t.eventDetail.register
      )}
    </Button>
  );
}

"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";

/** Frontend-only RSVP. Wire to Supabase (event_rsvps) later. */
export function RegisterButton() {
  const { t } = useI18n();
  const [registered, setRegistered] = useState(false);
  return (
    <Button
      size="lg"
      className="w-full"
      disabled={registered}
      onClick={() => setRegistered(true)}
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

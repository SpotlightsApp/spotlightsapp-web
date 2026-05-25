"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Frontend-only RSVP. Wire to Supabase (event_rsvps) later. */
export function RegisterButton() {
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
          <Check className="h-5 w-5" /> You&apos;re registered
        </>
      ) : (
        "Register to attend"
      )}
    </Button>
  );
}

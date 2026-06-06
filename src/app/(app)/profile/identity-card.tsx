"use client";

import { useState } from "react";
import { GraduationCap, MapPin, Share2, Pencil, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuggestInput } from "@/components/ui/suggest-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { getSuggestions } from "./suggestions";
import { useI18n } from "@/lib/i18n/provider";
import type { Identity } from "./types";

type IdentityCardProps = {
  identity: Identity;
  onChange: (next: Identity) => void;
};

export function IdentityCard({ identity, onChange }: IdentityCardProps) {
  const { locale } = useI18n();
  const suggest = getSuggestions(locale);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Identity>(identity);
  const gradYears = Array.from({ length: 9 }, (_, i) => `${2024 + i}`);

  function openDialog() {
    setDraft(identity);
    setOpen(true);
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <Card className="overflow-hidden p-0">
      {/* Gradient cover */}
      <div className="relative h-20 bg-gradient-to-r from-accent via-[#3FB1F2] to-[#bde8fb]">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_120%,white,transparent_60%)]" />
      </div>

      <div className="px-6 pb-6">
        <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-surface-2 text-muted-foreground shadow-sm">
          <User className="h-12 w-12" />
        </div>

        <h1 className="mt-4 text-xl font-semibold leading-tight">
        {identity.name || "Your name"}{" "}
        {identity.pronouns ? (
          <span className="text-base font-normal text-muted-foreground">
            ({identity.pronouns})
          </span>
        ) : null}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">0 followers · 0 following</p>

      {identity.headline ? (
        <p className="mt-3 text-sm text-foreground">{identity.headline}</p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground italic">
          Add a headline
        </p>
      )}

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GraduationCap className="h-4 w-4 shrink-0" />
          <span>
            {identity.school || "Add school"}
            {identity.gradYear ? ` · ${identity.gradYear}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{identity.location || "Add location"}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={openDialog}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            <Field label="Pronouns">
              <SuggestInput
                value={draft.pronouns}
                onChange={(v) => setDraft({ ...draft, pronouns: v })}
                onSelect={(v) => setDraft({ ...draft, pronouns: v })}
                suggestions={suggest.pronouns}
                placeholder="e.g. he/him"
              />
            </Field>
            <Field label="Headline">
              <Input
                value={draft.headline}
                placeholder="e.g. Computer Science @ NYU"
                onChange={(e) =>
                  setDraft({ ...draft, headline: e.target.value })
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="School">
                <SuggestInput
                  value={draft.school}
                  onChange={(v) => setDraft({ ...draft, school: v })}
                  onSelect={(v) => setDraft({ ...draft, school: v })}
                  suggestions={suggest.schools}
                  placeholder="University"
                />
              </Field>
              <Field label="Grad year">
                <SuggestInput
                  value={draft.gradYear}
                  onChange={(v) => setDraft({ ...draft, gradYear: v })}
                  onSelect={(v) => setDraft({ ...draft, gradYear: v })}
                  suggestions={gradYears}
                  placeholder="2027"
                />
              </Field>
            </div>
            <Field label="Location">
              <SuggestInput
                value={draft.location}
                onChange={(v) => setDraft({ ...draft, location: v })}
                onSelect={(v) => setDraft({ ...draft, location: v })}
                suggestions={suggest.locations}
                placeholder="Bangkok, Thailand"
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

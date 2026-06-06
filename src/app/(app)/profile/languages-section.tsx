"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SectionCard } from "./section-card";
import { ChipInput } from "./chip-input";
import { getSuggestions } from "./suggestions";
import { useI18n } from "@/lib/i18n/provider";

type LanguagesSectionProps = {
  values: string[];
  onChange: (next: string[]) => void;
};

export function LanguagesSection({ values, onChange }: LanguagesSectionProps) {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(values);

  function openDialog() {
    setDraft(values);
    setOpen(true);
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <SectionCard title="Languages" onEdit={openDialog}>
      {values.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add languages you speak</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {values.map((l) => (
            <li
              key={l}
              className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
            >
              {l}
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Languages</DialogTitle>
          </DialogHeader>
          <ChipInput
            values={draft}
            onChange={setDraft}
            placeholder="e.g. English, Thai"
            suggestions={getSuggestions(locale).languages}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

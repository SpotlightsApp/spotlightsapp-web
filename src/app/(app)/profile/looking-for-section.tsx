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
import type { LookingFor } from "./types";

type LookingForSectionProps = {
  value: LookingFor;
  onChange: (next: LookingFor) => void;
};

export function LookingForSection({ value, onChange }: LookingForSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<LookingFor>(value);

  function openDialog() {
    setDraft(value);
    setOpen(true);
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  const groups: { label: string; key: keyof LookingFor }[] = [
    { label: "Job types", key: "jobTypes" },
    { label: "Roles", key: "roles" },
    { label: "Industries", key: "industries" },
    { label: "Locations", key: "locations" },
  ];

  const isEmpty = groups.every((g) => value[g.key].length === 0);

  return (
    <SectionCard title="Looking for" onEdit={openDialog}>
      {isEmpty ? (
        <p className="text-sm text-muted-foreground">
          Add what you&apos;re looking for so employers can match you.
        </p>
      ) : (
        <div className="space-y-4">
          {groups.map((g) =>
            value[g.key].length > 0 ? (
              <div key={g.key}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {g.label}
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {value[g.key].map((v) => (
                    <li
                      key={v}
                      className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null,
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What are you looking for?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5">
            {groups.map((g) => (
              <div key={g.key}>
                <h4 className="mb-2 text-sm font-medium">{g.label}</h4>
                <ChipInput
                  values={draft[g.key]}
                  onChange={(next) => setDraft({ ...draft, [g.key]: next })}
                  placeholder={`Add a ${g.label.toLowerCase().replace(/s$/, "")}`}
                />
              </div>
            ))}
          </div>
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

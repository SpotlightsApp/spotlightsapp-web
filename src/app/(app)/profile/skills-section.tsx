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

type SkillsSectionProps = {
  values: string[];
  onChange: (next: string[]) => void;
};

export function SkillsSection({ values, onChange }: SkillsSectionProps) {
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
    <SectionCard title="Skills" onEdit={openDialog}>
      {values.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add your skills</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {values.map((s) => (
            <li
              key={s}
              className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skills</DialogTitle>
          </DialogHeader>
          <ChipInput
            values={draft}
            onChange={setDraft}
            placeholder="e.g. Python, React"
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

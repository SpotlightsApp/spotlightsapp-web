"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SectionCard } from "./section-card";

type AboutSectionProps = {
  value: string;
  onChange: (next: string) => void;
};

export function AboutSection({ value, onChange }: AboutSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  function openDialog() {
    setDraft(value);
    setOpen(true);
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <SectionCard title="About" onEdit={openDialog}>
      {value ? (
        <p className="whitespace-pre-wrap text-sm text-foreground">{value}</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Add a short bio so others get a sense of who you are.
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About</DialogTitle>
          </DialogHeader>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Tell people about yourself..."
            rows={8}
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

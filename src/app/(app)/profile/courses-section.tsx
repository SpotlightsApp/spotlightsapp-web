"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SectionCard } from "./section-card";
import type { Course } from "./types";

type CoursesSectionProps = {
  entries: Course[];
  onChange: (next: Course[]) => void;
};

export function CoursesSection({ entries, onChange }: CoursesSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Course[]>(entries);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  function openDialog() {
    setDraft(entries);
    setNewName("");
    setNewCode("");
    setOpen(true);
  }

  function add() {
    const name = newName.trim();
    if (!name) return;
    setDraft([
      ...draft,
      { id: crypto.randomUUID(), name, code: newCode.trim() },
    ]);
    setNewName("");
    setNewCode("");
  }

  function removeDraft(id: string) {
    setDraft(draft.filter((c) => c.id !== id));
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <SectionCard title="Courses" onEdit={openDialog}>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add relevant coursework</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {entries.map((c) => (
            <li
              key={c.id}
              className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
            >
              {c.code ? `${c.code} · ` : ""}
              {c.name}
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Courses</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-[1fr_120px_auto] gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Course name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    add();
                  }
                }}
              />
              <Input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Code"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    add();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={add}>
                Add
              </Button>
            </div>
            {draft.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {draft.map((c) => (
                  <li
                    key={c.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
                  >
                    {c.code ? `${c.code} · ` : ""}
                    {c.name}
                    <button
                      type="button"
                      onClick={() => removeDraft(c.id)}
                      aria-label={`Remove ${c.name}`}
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-accent/20 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
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

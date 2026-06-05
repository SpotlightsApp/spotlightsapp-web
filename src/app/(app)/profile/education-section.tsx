"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
import type { Education } from "./types";

type EducationSectionProps = {
  entries: Education[];
  onChange: (next: Education[]) => void;
};

const empty = (): Education => ({
  id: crypto.randomUUID(),
  degree: "",
  school: "",
  field: "",
  startDate: "",
  endDate: "",
});

export function EducationSection({ entries, onChange }: EducationSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Education>(empty());
  const [editingId, setEditingId] = useState<string | null>(null);

  function openNew() {
    setDraft(empty());
    setEditingId(null);
    setOpen(true);
  }

  function openEdit(entry: Education) {
    setDraft(entry);
    setEditingId(entry.id);
    setOpen(true);
  }

  function save() {
    if (editingId) {
      onChange(entries.map((e) => (e.id === editingId ? draft : e)));
    } else {
      onChange([...entries, draft]);
    }
    setOpen(false);
  }

  function remove(id: string) {
    onChange(entries.filter((e) => e.id !== id));
  }

  return (
    <SectionCard title="Education" icon="plus" onEdit={openNew}>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add your education</p>
      ) : (
        <ul className="space-y-5">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex items-start justify-between gap-3 border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground">
                  {e.school || "Untitled school"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {[e.degree, e.field].filter(Boolean).join(", ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[e.startDate, e.endDate || "Present"]
                    .filter(Boolean)
                    .join(" – ")}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(e)}
                  aria-label="Edit"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2 hover:text-foreground cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(e.id)}
                  aria-label="Remove"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2 hover:text-foreground cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit education" : "Add education"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="School">
              <Input
                value={draft.school}
                onChange={(e) => setDraft({ ...draft, school: e.target.value })}
              />
            </Field>
            <Field label="Degree">
              <Input
                value={draft.degree}
                placeholder="e.g. B.S."
                onChange={(e) => setDraft({ ...draft, degree: e.target.value })}
              />
            </Field>
            <Field label="Field of study">
              <Input
                value={draft.field}
                onChange={(e) => setDraft({ ...draft, field: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start date">
                <Input
                  type="month"
                  value={draft.startDate}
                  onChange={(e) =>
                    setDraft({ ...draft, startDate: e.target.value })
                  }
                />
              </Field>
              <Field label="End date">
                <Input
                  type="month"
                  value={draft.endDate}
                  onChange={(e) =>
                    setDraft({ ...draft, endDate: e.target.value })
                  }
                />
              </Field>
            </div>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

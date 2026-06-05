"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { WorkExperience } from "./types";

type WorkExperienceSectionProps = {
  entries: WorkExperience[];
  onChange: (next: WorkExperience[]) => void;
};

const empty = (): WorkExperience => ({
  id: crypto.randomUUID(),
  title: "",
  company: "",
  type: "",
  startDate: "",
  endDate: "",
  location: "",
  description: "",
});

export function WorkExperienceSection({
  entries,
  onChange,
}: WorkExperienceSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<WorkExperience>(empty());
  const [editingId, setEditingId] = useState<string | null>(null);

  function openNew() {
    setDraft(empty());
    setEditingId(null);
    setOpen(true);
  }

  function openEdit(entry: WorkExperience) {
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
    <SectionCard title="Work experience" icon="plus" onEdit={openNew}>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add your work experience</p>
      ) : (
        <ul className="space-y-5">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex items-start justify-between gap-3 border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground">
                  {e.title || "Untitled role"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {[e.company, e.type].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[
                    [e.startDate, e.endDate || "Present"]
                      .filter(Boolean)
                      .join(" – "),
                    e.location,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {e.description ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                    {e.description}
                  </p>
                ) : null}
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
              {editingId ? "Edit experience" : "Add experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Title">
              <Input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <Field label="Company">
              <Input
                value={draft.company}
                onChange={(e) =>
                  setDraft({ ...draft, company: e.target.value })
                }
              />
            </Field>
            <Field label="Type">
              <Input
                value={draft.type}
                placeholder="e.g. Internship, Full-time"
                onChange={(e) => setDraft({ ...draft, type: e.target.value })}
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
            <Field label="Location">
              <Input
                value={draft.location}
                onChange={(e) =>
                  setDraft({ ...draft, location: e.target.value })
                }
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={draft.description}
                rows={5}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
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

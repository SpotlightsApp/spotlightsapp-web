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
import type { Organization } from "./types";

type OrganizationsSectionProps = {
  entries: Organization[];
  onChange: (next: Organization[]) => void;
};

const empty = (): Organization => ({
  id: crypto.randomUUID(),
  name: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
});

export function OrganizationsSection({
  entries,
  onChange,
}: OrganizationsSectionProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Organization>(empty());
  const [editingId, setEditingId] = useState<string | null>(null);

  function openNew() {
    setDraft(empty());
    setEditingId(null);
    setOpen(true);
  }

  function openEdit(entry: Organization) {
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
    <SectionCard title="Organizations" icon="plus" onEdit={openNew}>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Add clubs or organizations you&apos;re part of
        </p>
      ) : (
        <ul className="space-y-5">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex items-start justify-between gap-3 border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground">
                  {e.name || "Untitled organization"}
                </h3>
                {e.role ? (
                  <p className="text-sm text-muted-foreground">{e.role}</p>
                ) : null}
                <p className="mt-1 text-xs text-muted-foreground">
                  {[e.startDate, e.endDate || "Present"]
                    .filter(Boolean)
                    .join(" – ")}
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
              {editingId ? "Edit organization" : "Add organization"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            <Field label="Role">
              <Input
                value={draft.role}
                placeholder="e.g. Member, President"
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
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
            <Field label="Description">
              <Textarea
                value={draft.description}
                rows={4}
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

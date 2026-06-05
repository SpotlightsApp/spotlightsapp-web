"use client";

import { useState } from "react";
import { Link2, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfileLink } from "./types";

type LinksCardProps = {
  links: ProfileLink[];
  onChange: (next: ProfileLink[]) => void;
};

export function LinksCard({ links, onChange }: LinksCardProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  function add() {
    const v = draft.trim();
    if (!v) {
      setAdding(false);
      return;
    }
    onChange([...links, { id: crypto.randomUUID(), url: v }]);
    setDraft("");
    setAdding(false);
  }

  function remove(id: string) {
    onChange(links.filter((l) => l.id !== id));
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold">Add links to profile</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Portfolio, GitHub, LinkedIn, etc.
      </p>

      {links.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {links.map((l) => (
            <li
              key={l.id}
              className="flex items-center gap-2 rounded-md border border-border bg-surface-2/40 px-3 py-2 text-sm"
            >
              <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate text-foreground">{l.url}</span>
              <button
                type="button"
                onClick={() => remove(l.id)}
                aria-label="Remove link"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2 hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {adding ? (
        <div className="mt-4 space-y-2">
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
              if (e.key === "Escape") {
                setDraft("");
                setAdding(false);
              }
            }}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={add}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDraft("");
                setAdding(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={() => setAdding(true)}
        >
          <Plus className="h-4 w-4" />
          Add a link
        </Button>
      )}
    </Card>
  );
}

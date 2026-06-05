"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChipInputProps = {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export function ChipInput({ values, onChange, placeholder }: ChipInputProps) {
  const [draft, setDraft] = useState("");

  function add() {
    const v = draft.trim();
    if (!v || values.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...values, v]);
    setDraft("");
  }

  function remove(v: string) {
    onChange(values.filter((x) => x !== v));
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder ?? "Type and press Enter"}
        />
        <Button type="button" variant="outline" onClick={add}>
          Add
        </Button>
      </div>
      {values.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {values.map((v) => (
            <li
              key={v}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                aria-label={`Remove ${v}`}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-accent/20 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

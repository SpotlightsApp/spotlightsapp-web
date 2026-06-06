"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChipInputProps = {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** Optional autocomplete suggestions shown in a dropdown as the user types. */
  suggestions?: string[];
};

export function ChipInput({
  values,
  onChange,
  placeholder,
  suggestions,
}: ChipInputProps) {
  const [draft, setDraft] = useState("");
  const listId = useId();

  function addValue(raw: string) {
    const v = raw.trim();
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
      addValue(draft);
    }
  }

  // Suggestions not already chosen.
  const available = (suggestions ?? []).filter((s) => !values.includes(s));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          list={available.length ? listId : undefined}
          onChange={(e) => {
            const v = e.target.value;
            // Picking a suggestion from the datalist adds it instantly.
            if (available.includes(v)) {
              addValue(v);
            } else {
              setDraft(v);
            }
          }}
          onKeyDown={onKey}
          placeholder={placeholder ?? "Type and press Enter"}
        />
        {available.length > 0 && (
          <datalist id={listId}>
            {available.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
        <Button type="button" variant="outline" onClick={() => addValue(draft)}>
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

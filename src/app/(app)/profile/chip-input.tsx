"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuggestInput } from "@/components/ui/suggest-input";

type ChipInputProps = {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  /** Optional autocomplete suggestions shown in a styled dropdown. */
  suggestions?: string[];
};

export function ChipInput({
  values,
  onChange,
  placeholder,
  suggestions,
}: ChipInputProps) {
  const [draft, setDraft] = useState("");

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

  // Suggestions not already chosen.
  const available = (suggestions ?? []).filter((s) => !values.includes(s));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <SuggestInput
            value={draft}
            onChange={setDraft}
            onSelect={addValue}
            suggestions={available}
            clearOnSelect
            placeholder={placeholder ?? "Type and press Enter"}
          />
        </div>
        <Button type="button" variant="outline" onClick={() => addValue(draft)}>
          Add
        </Button>
      </div>

      {values.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          <AnimatePresence initial={false}>
            {values.map((v) => (
              <motion.li
                key={v}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-strong"
              >
                {v}
                <button
                  type="button"
                  onClick={() => remove(v)}
                  aria-label={`Remove ${v}`}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-accent/25 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : null}
    </div>
  );
}

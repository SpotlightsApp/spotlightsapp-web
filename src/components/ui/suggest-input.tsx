"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SuggestInputProps = {
  value: string;
  onChange: (v: string) => void;
  /** Commit a value (suggestion clicked, or Enter pressed). */
  onSelect: (v: string) => void;
  suggestions: string[];
  placeholder?: string;
  /** Clear the input after a commit (used by the chip input). */
  clearOnSelect?: boolean;
  /** Max items shown in the dropdown. */
  limit?: number;
};

export function SuggestInput({
  value,
  onChange,
  onSelect,
  suggestions,
  placeholder,
  clearOnSelect = false,
  limit = 8,
}: SuggestInputProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    const pool = q
      ? suggestions.filter((s) => s.toLowerCase().includes(q))
      : suggestions;
    return pool.slice(0, limit);
  }, [suggestions, value, limit]);

  const showList = open && matches.length > 0;

  function commit(v: string) {
    onSelect(v);
    if (clearOnSelect) onChange("");
    setOpen(false);
    setActive(0);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const pick = showList ? matches[active] : undefined;
      commit(pick ?? value);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          value={value}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          autoComplete="off"
          className="pl-9"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay so a click on an option registers before we close.
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKey}
        />
      </div>

      <AnimatePresence>
        {showList && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-border bg-background p-1.5 shadow-[0_12px_40px_-12px_rgb(0,0,0,0.25)]"
            onMouseDown={(e) => {
              // Keep focus so onBlur doesn't fire before the click commits.
              e.preventDefault();
              if (blurTimer.current) clearTimeout(blurTimer.current);
            }}
          >
            {matches.map((s, i) => {
              const selected = s === value;
              return (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => commit(s)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                      i === active
                        ? "bg-accent-soft text-accent-strong"
                        : "text-foreground hover:bg-surface-2",
                    )}
                  >
                    <span className="truncate">{s}</span>
                    {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

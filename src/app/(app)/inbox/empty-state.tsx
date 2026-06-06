"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex max-w-sm flex-col items-center text-center"
      >
        <div className="relative mb-5">
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-hover text-accent-foreground shadow-sm"
          >
            <Mail className="h-7 w-7" />
            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-background text-accent-strong">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </motion.div>
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Message anyone
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          DM peers, professionals, and recruiters to ask questions and build
          your network.
        </p>
      </motion.div>
    </div>
  );
}

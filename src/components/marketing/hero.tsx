"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft/60 via-background to-background">
      <Container className="relative pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-5xl text-foreground sm:text-6xl lg:text-7xl"
          >
            {t.hero.titlePre}
            <span className="text-shimmer-amber">{t.hero.titleHighlight}</span>
            {t.hero.titlePost}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
          >
            {t.hero.subhead}
          </motion.p>

          {/* Primary CTA — pre-launch we funnel to the waitlist */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 flex justify-center"
          >
            <Button asChild size="lg" pill>
              <Link href="/waitlist">
                {t.waitlist.submit}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

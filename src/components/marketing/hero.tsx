"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, GraduationCap, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroBackground } from "@/components/marketing/hero-background";
import { useI18n } from "@/lib/i18n/provider";

const CHIPS_TOP = [
  "Frontend Developer",
  "Data Analyst",
  "UX Designer",
  "Bangkok",
  "Product Manager",
  "Chulalongkorn",
  "Machine Learning",
  "Internship",
  "Fintech",
  "Backend Engineer",
];
const CHIPS_BOTTOM = [
  "Chiang Mai",
  "New Grad",
  "Marketing",
  "Thammasat",
  "Remote",
  "Data Scientist",
  "DevOps",
  "Mahidol",
  "Growth",
  "Full-Stack",
];

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

function ChipRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max gap-3" aria-hidden>
      <div
        className={`flex gap-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const router = useRouter();
  const [audience, setAudience] = useState("student");
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (audience === "employer") {
      router.push("/employers");
      return;
    }
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (loc) params.set("location", loc);
    router.push(`/jobs${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft/60 via-background to-background">
      <HeroBackground />
      <Container className="relative pt-28 pb-12 sm:pt-36 sm:pb-16">
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

          {/* Audience toggle */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex justify-center"
          >
            <Tabs value={audience} onValueChange={setAudience}>
              <TabsList>
                <TabsTrigger value="student">
                  <GraduationCap className="h-4 w-4" />
                  {t.hero.student}
                </TabsTrigger>
                <TabsTrigger value="employer">
                  <Building2 className="h-4 w-4" />
                  {t.hero.hiring}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Search bar */}
          <motion.form
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            onSubmit={onSearch}
            className="mx-auto mt-5 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={
                  audience === "student"
                    ? t.hero.searchStudent
                    : t.hero.searchEmployer
                }
                aria-label="Search query"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="hidden h-7 w-px bg-border sm:block" />
            <div className="flex flex-1 items-center gap-2 px-3">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder={t.hero.location}
                aria-label="Location"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <Button type="submit" pill size="lg" className="sm:px-7">
              {t.hero.search}
            </Button>
          </motion.form>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-sm text-muted-foreground"
          >
            {t.hero.popular}{" "}
            {t.hero.popularItems.map((item, i) => (
              <span key={item}>
                <span className="text-foreground">{item}</span>
                {i < t.hero.popularItems.length - 1 ? " · " : ""}
              </span>
            ))}
          </motion.p>
        </div>
      </Container>

      {/* Floating keyword chips — the signature motif */}
      <div className="marquee-pause relative mt-6 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ChipRow items={CHIPS_TOP} direction="left" />
        <ChipRow items={CHIPS_BOTTOM} direction="right" />
      </div>
    </section>
  );
}

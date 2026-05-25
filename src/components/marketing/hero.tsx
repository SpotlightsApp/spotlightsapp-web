"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, GraduationCap, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroBackground } from "@/components/marketing/hero-background";

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
      <Container className="relative pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Thailand&apos;s home for early-career talent
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-5xl text-foreground sm:text-6xl lg:text-7xl"
          >
            Find what&apos;s <span className="text-accent-strong">next</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Where Thailand&apos;s students and new grads connect with internships,
            jobs, and the companies building the region&apos;s future.
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
                  I&apos;m a student
                </TabsTrigger>
                <TabsTrigger value="employer">
                  <Building2 className="h-4 w-4" />
                  I&apos;m hiring
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
                    ? "Job title, skill, or company"
                    : "What role are you hiring for?"
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
                placeholder="Location (e.g. Bangkok)"
                aria-label="Location"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <Button type="submit" pill size="lg" className="sm:px-7">
              Search
            </Button>
          </motion.form>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-sm text-muted-foreground"
          >
            Popular:{" "}
            <span className="text-foreground">Software Internship</span> ·{" "}
            <span className="text-foreground">Data Analyst</span> ·{" "}
            <span className="text-foreground">New Grad</span>
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

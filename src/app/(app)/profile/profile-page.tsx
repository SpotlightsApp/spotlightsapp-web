"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { IdentityCard } from "./identity-card";
import { LinksCard } from "./links-card";
import { LookingForSection } from "./looking-for-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { WorkExperienceSection } from "./work-experience-section";
import { EducationSection } from "./education-section";
import { CoursesSection } from "./courses-section";
import { OrganizationsSection } from "./organizations-section";
import { LanguagesSection } from "./languages-section";
import { saveProfile } from "./actions";
import type { FullProfile } from "./profile-data";
import type {
  Course,
  Education,
  Identity,
  LookingFor,
  Organization,
  ProfileLink,
  WorkExperience,
} from "./types";

type SaveState = "idle" | "saving" | "saved" | "error";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function ProfilePage({ initial }: { initial: FullProfile }) {
  const [identity, setIdentity] = useState<Identity>(initial.identity);
  const [links, setLinks] = useState<ProfileLink[]>(initial.links);
  const [lookingFor, setLookingFor] = useState<LookingFor>(initial.lookingFor);
  const [about, setAbout] = useState(initial.about);
  const [skills, setSkills] = useState<string[]>(initial.skills);
  const [work, setWork] = useState<WorkExperience[]>(initial.work);
  const [education, setEducation] = useState<Education[]>(initial.education);
  const [courses, setCourses] = useState<Course[]>(initial.courses);
  const [organizations, setOrganizations] = useState<Organization[]>(
    initial.organizations,
  );
  const [languages, setLanguages] = useState<string[]>(initial.languages);

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, startTransition] = useTransition();

  const profile: FullProfile = {
    identity,
    links,
    lookingFor,
    about,
    skills,
    work,
    education,
    courses,
    organizations,
    languages,
  };

  async function persist(next: FullProfile) {
    setSaveState("saving");
    const res = await saveProfile(next);
    if (res.ok) {
      setSaveState("saved");
    } else {
      setErrorMsg(res.error);
      setSaveState("error");
    }
  }

  // Autosave: debounce any change and persist, so individual section edits stick
  // without needing the manual button. Skips the initial hydration render.
  const hydrated = useRef(false);
  const profileJson = JSON.stringify(profile);
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    const id = setTimeout(() => {
      persist(JSON.parse(profileJson) as FullProfile);
    }, 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileJson]);

  function onSave() {
    startTransition(() => {
      void persist(profile);
    });
  }

  return (
    <Container className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          Profile
        </h1>
        <div className="flex items-center gap-3">
          {saveState === "saving" && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </span>
          )}
          {saveState === "saved" && (
            <span className="flex items-center gap-1 text-sm text-success">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="max-w-[16rem] truncate text-sm text-destructive">
              {errorMsg}
            </span>
          )}
          <Button onClick={onSave} disabled={pending || saveState === "saving"}>
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        <motion.aside
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-4 lg:sticky lg:top-20 lg:self-start"
        >
          <motion.div variants={fadeUp}>
            <IdentityCard identity={identity} onChange={setIdentity} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <LinksCard links={links} onChange={setLinks} />
          </motion.div>
        </motion.aside>

        <div className="min-w-0">
          <Tabs defaultValue="resume">
            <TabsList>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="viewers">Profile viewers</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-6">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="space-y-5"
              >
                <motion.div variants={fadeUp}>
                  <LookingForSection value={lookingFor} onChange={setLookingFor} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <AboutSection value={about} onChange={setAbout} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <SkillsSection values={skills} onChange={setSkills} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <WorkExperienceSection entries={work} onChange={setWork} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <EducationSection entries={education} onChange={setEducation} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <CoursesSection entries={courses} onChange={setCourses} />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <OrganizationsSection
                    entries={organizations}
                    onChange={setOrganizations}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <LanguagesSection values={languages} onChange={setLanguages} />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="viewers" className="mt-6">
              <div className="rounded-[var(--radius)] border border-border bg-background p-10 text-center">
                <h2 className="text-lg font-semibold">No viewers yet</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Once people start viewing your profile, you&apos;ll see them
                  here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}

"use client";

import { useState, useTransition } from "react";
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

type SaveState = "idle" | "saved" | "error";

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

  function onSave() {
    setSaveState("idle");
    startTransition(async () => {
      const res = await saveProfile({
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
      });
      if (res.ok) {
        setSaveState("saved");
      } else {
        setErrorMsg(res.error);
        setSaveState("error");
      }
    });
  }

  return (
    <Container className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">
          Profile
        </h1>
        <div className="flex items-center gap-3">
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
          <Button onClick={onSave} disabled={pending}>
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <IdentityCard identity={identity} onChange={setIdentity} />
          <LinksCard links={links} onChange={setLinks} />
        </aside>

        <div className="min-w-0">
          <Tabs defaultValue="resume">
            <TabsList>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="viewers">Profile viewers</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-6 space-y-5">
              <LookingForSection value={lookingFor} onChange={setLookingFor} />
              <AboutSection value={about} onChange={setAbout} />
              <SkillsSection values={skills} onChange={setSkills} />
              <WorkExperienceSection entries={work} onChange={setWork} />
              <EducationSection entries={education} onChange={setEducation} />
              <CoursesSection entries={courses} onChange={setCourses} />
              <OrganizationsSection
                entries={organizations}
                onChange={setOrganizations}
              />
              <LanguagesSection values={languages} onChange={setLanguages} />
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

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
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
import type {
  Course,
  Education,
  Identity,
  LookingFor,
  Organization,
  ProfileLink,
  WorkExperience,
} from "./types";

export function ProfilePage({ defaultName }: { defaultName: string }) {
  const [identity, setIdentity] = useState<Identity>({
    name: defaultName,
    pronouns: "",
    headline: "",
    school: "",
    gradYear: "",
    location: "",
  });
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [lookingFor, setLookingFor] = useState<LookingFor>({
    jobTypes: [],
    roles: [],
    industries: [],
    locations: [],
  });
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [work, setWork] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">
        Profile
      </h1>

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

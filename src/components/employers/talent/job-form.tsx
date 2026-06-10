"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJob, updateJob } from "@/app/employers/talent/actions";
import type { JobWithCompany } from "@/lib/types";

const JOB_TYPES = ["Internship", "Full-time", "Part-time", "Contract", "New grad"];
const WORK_MODES = ["On-site", "Hybrid", "Remote"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

/** Create or edit a posting on the shared jobs table. */
export function JobForm({
  companyName,
  job,
  onClose,
  onSaved,
}: {
  companyName: string;
  job?: JobWithCompany; // present = edit mode
  onClose: () => void;
  onSaved: (slug: string) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(job?.title ?? "");
  const [type, setType] = useState(job?.type ?? "Internship");
  const [workMode, setWorkMode] = useState(job?.workMode ?? "On-site");
  const [location, setLocation] = useState(job?.location ?? "");
  const [salaryMin, setSalaryMin] = useState(job?.salaryMin ? String(job.salaryMin) : "");
  const [salaryMax, setSalaryMax] = useState(job?.salaryMax ? String(job.salaryMax) : "");
  const [salaryPeriod, setSalaryPeriod] = useState<"mo" | "yr">(job?.salaryPeriod ?? "yr");
  const [skills, setSkills] = useState(job?.skills.join(", ") ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [responsibilities, setResponsibilities] = useState(
    job?.responsibilities.join("\n") ?? "",
  );
  const [requirements, setRequirements] = useState(job?.requirements.join("\n") ?? "");

  function submit() {
    setError(null);
    startTransition(async () => {
      const input = {
        title,
        type,
        workMode,
        location,
        salaryMin: salaryMin ? Number(salaryMin) : undefined,
        salaryMax: salaryMax ? Number(salaryMax) : undefined,
        salaryPeriod,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        description,
        responsibilities: responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
        requirements: requirements.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      const result = job ? await updateJob(job.id, input) : await createJob(input);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      onSaved(result.slug);
    });
  }

  return (
    <Card className="mt-4 p-5">
      <h2 className="font-semibold leading-tight tracking-tight">
        {job ? `Edit role: ${job.title}` : `New role at ${companyName}`}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {job
          ? "Changes go live on the student job board immediately."
          : "Published instantly to the student job board."}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Job title">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Software Engineer Intern"
          />
        </Field>
        <Field label="Location">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Mountain View, CA"
          />
        </Field>
        <Field label="Job type">
          <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Work mode">
          <Select value={workMode} onValueChange={(v) => setWorkMode(v as typeof workMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WORK_MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3 sm:col-span-1">
          <Field label="Salary min (USD)">
            <Input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="120000"
            />
          </Field>
          <Field label="Salary max (USD)">
            <Input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="160000"
            />
          </Field>
        </div>
        <Field label="Salary period">
          <Select
            value={salaryPeriod}
            onValueChange={(v) => setSalaryPeriod(v as "mo" | "yr")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yr">per year</SelectItem>
              <SelectItem value="mo">per month</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Skills (comma-separated)">
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, React, SQL"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Description">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What the role is about, the team, and what success looks like."
            />
          </Field>
        </div>
        <Field label="Responsibilities (one per line)">
          <Textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            rows={3}
          />
        </Field>
        <Field label="Requirements (one per line)">
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={3}
          />
        </Field>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={submit} disabled={pending}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {job ? "Save changes" : "Publish job"}
        </Button>
      </div>
    </Card>
  );
}

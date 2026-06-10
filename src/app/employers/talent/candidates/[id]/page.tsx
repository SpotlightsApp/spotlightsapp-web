import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { CandidateActions } from "@/components/employers/talent/candidate-actions";
import { CvDocument } from "@/components/employers/talent/cv-document";
import { ScorePanel } from "@/components/employers/talent/score-panel";
import { UniversityLogo } from "@/components/employers/talent/university-logo";
import {
  getCandidate,
  getRankedCandidates,
  getUniversity,
} from "@/lib/talent";

export function generateStaticParams() {
  return getRankedCandidates().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCandidate(id);
  return { title: c ? `${c.name} — Spotlights for Employers` : "Candidate" };
}

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = getCandidate(id);
  if (!candidate) notFound();

  const ranked = getRankedCandidates();
  const idx = ranked.findIndex((c) => c.id === candidate.id);
  const prev = idx > 0 ? ranked[idx - 1] : null;
  const next = idx < ranked.length - 1 ? ranked[idx + 1] : null;
  const uni = getUniversity(candidate.universityId);
  const added =
    candidate.addedDaysAgo === 0
      ? "today"
      : candidate.addedDaysAgo === 1
        ? "yesterday"
        : `${candidate.addedDaysAgo} days ago`;

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between">
        <Link
          href="/employers/talent/candidates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All candidates
        </Link>
        <div className="flex items-center gap-1">
          {prev ? (
            <Link
              href={`/employers/talent/candidates/${prev.id}`}
              className="inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">#{prev.rank}</span>
            </Link>
          ) : null}
          <span className="px-1 text-xs tabular-nums text-muted-foreground">
            Rank {candidate.rank} of {ranked.length}
          </span>
          {next ? (
            <Link
              href={`/employers/talent/candidates/${next.id}`}
              className="inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <span className="hidden sm:inline">#{next.rank}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>

      <Card className="mt-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <h1 className="font-display text-2xl sm:text-3xl">
                {candidate.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {candidate.headline}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <UniversityLogo
                    name={uni.name}
                    src={uni.logoUrl}
                    className="h-[18px] w-[18px]"
                  />
                  {uni.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  {candidate.degree} {candidate.major}, ’
                  {String(candidate.gradYear).slice(2)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <CandidateActions initial={candidate.status} />
            <p className="text-xs text-muted-foreground">
              <Briefcase className="mr-1 inline h-3.5 w-3.5 align-[-2px]" />
              Applied for {candidate.appliedFor} · added {added}
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <CvDocument candidate={candidate} />
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <ScorePanel candidate={candidate} />
          </Card>

          <Card className="p-5">
            <h2 className="font-semibold leading-tight tracking-tight">
              Signals
            </h2>
            <ul className="mt-3 flex flex-col gap-2.5">
              {candidate.signals.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="text-foreground/90">{s}</span>
                </li>
              ))}
              {candidate.watchouts?.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF4DC] text-[#92400E]">
                    <AlertCircle className="h-3 w-3" />
                  </span>
                  <span className="text-foreground/90">{w}</span>
                </li>
              ))}
            </ul>
          </Card>

          {next ? (
            <Link
              href={`/employers/talent/candidates/${next.id}`}
              className="group flex items-center justify-between rounded-[var(--radius)] border border-dashed border-border px-5 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent-strong"
            >
              Next in queue: {next.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

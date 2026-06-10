import {
  candidateEmail,
  getUniversity,
  type RankedCandidate,
} from "@/lib/talent";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-accent-strong">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Renders the candidate's structured profile as a clean résumé document. */
export function CvDocument({ candidate }: { candidate: RankedCandidate }) {
  const uni = getUniversity(candidate.universityId);
  return (
    <div className="flex flex-col gap-7">
      <Section title="Summary">
        <p className="text-sm leading-relaxed text-foreground/90">
          {candidate.about}
        </p>
      </Section>

      <Section title="Experience">
        <ol className="relative flex flex-col gap-6 border-l border-border pl-5">
          {candidate.experience.map((e, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[26.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm font-semibold">
                  {e.title}
                  <span className="font-normal text-muted-foreground"> · {e.company}</span>
                </p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {e.start} – {e.end}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
              </div>
              <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-foreground/85 marker:text-border">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {candidate.projects.length > 0 && (
        <Section title="Projects">
          <ul className="flex flex-col gap-3">
            {candidate.projects.map((p) => (
              <li key={p.name} className="text-sm leading-relaxed">
                <span className="font-semibold">{p.name}</span>
                <span className="text-foreground/85"> — {p.description}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-sm font-semibold">
            {candidate.degree}, {candidate.major}
            <span className="font-normal text-muted-foreground"> · {uni.name}</span>
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">
            Class of {candidate.gradYear}
            {candidate.gpa ? ` · GPA ${candidate.gpa.toFixed(2)}` : ""}
          </p>
        </div>
        {candidate.coursework && candidate.coursework.length > 0 && (
          <p className="mt-1.5 text-sm text-muted-foreground">
            Coursework: {candidate.coursework.join(" · ")}
          </p>
        )}
      </Section>

      {candidate.awards && candidate.awards.length > 0 && (
        <Section title="Awards">
          <ul className="flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-foreground/85 marker:text-border">
            {candidate.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <div className="border-t border-border pt-4 text-xs text-muted-foreground">
        {candidateEmail(candidate)} · {candidate.location}
      </div>
    </div>
  );
}

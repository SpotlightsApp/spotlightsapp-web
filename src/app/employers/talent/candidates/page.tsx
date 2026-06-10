import { CandidatesBrowser } from "@/components/employers/talent/candidates-browser";
import { getTalentCandidates } from "@/lib/talent/data";

export const metadata = {
  title: "Candidates — Spotlights for Employers",
};

export default async function CandidatesPage() {
  return <CandidatesBrowser candidates={await getTalentCandidates()} />;
}

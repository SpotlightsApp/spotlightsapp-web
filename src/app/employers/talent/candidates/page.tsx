import { CandidatesBrowser } from "@/components/employers/talent/candidates-browser";
import { getRankedCandidates } from "@/lib/talent";

export const metadata = {
  title: "Candidates — Spotlights for Employers",
};

export default function CandidatesPage() {
  return <CandidatesBrowser candidates={getRankedCandidates()} />;
}

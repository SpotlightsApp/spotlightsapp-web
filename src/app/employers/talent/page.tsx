import { OverviewClient } from "@/components/employers/talent/overview-client";
import { getTalentCandidates } from "@/lib/talent/data";
import { domainCounts, talentStats } from "@/lib/talent";

export default async function TalentOverviewPage() {
  const candidates = await getTalentCandidates();
  return (
    <OverviewClient
      candidates={candidates}
      stats={talentStats(candidates)}
      domains={domainCounts(candidates)}
    />
  );
}

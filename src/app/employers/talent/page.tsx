import { OverviewClient } from "@/components/employers/talent/overview-client";
import { domainCounts, getRankedCandidates, talentStats } from "@/lib/talent";

export default function TalentOverviewPage() {
  return (
    <OverviewClient
      candidates={getRankedCandidates()}
      stats={talentStats()}
      domains={domainCounts()}
    />
  );
}

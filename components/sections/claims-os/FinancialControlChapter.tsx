import { claimsOs, storyAssets } from "@/content/claims-os";
import { ClaimsChapterScene } from "./ClaimsChapterScene";

export function FinancialControlChapter() {
  return (
    <ClaimsChapterScene
      id={claimsOs.financials.id}
      number={claimsOs.financials.number}
      label={claimsOs.financials.label}
      title={claimsOs.financials.title}
      description={claimsOs.financials.description}
      asset={storyAssets.resolution}
      scrub={true}
      pinned={false}
      light={false}
      features={claimsOs.financials.features}
    />
  );
}

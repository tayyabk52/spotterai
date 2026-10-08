import { claimsOs, storyAssets } from "@/content/claims-os";
import { ClaimsChapterScene } from "./ClaimsChapterScene";

export function ClaimTrackingChapter() {
  return (
    <ClaimsChapterScene
      id={claimsOs.tracking.id}
      number={claimsOs.tracking.number}
      label={claimsOs.tracking.label}
      title={claimsOs.tracking.title}
      description={claimsOs.tracking.description}
      asset={storyAssets.board}
      scrub={false}
      pinned={false}
      light={true}
      features={claimsOs.tracking.features}
    />
  );
}

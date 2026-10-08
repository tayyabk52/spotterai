import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelComplianceChapter() {
  const { complianceChapter } = sentinelContent;
  return (
    <ChapterScene
      id={complianceChapter.id}
      number={complianceChapter.chapterNumber}
      label={complianceChapter.tag}
      title={complianceChapter.heading}
      description={complianceChapter.description}
      asset={sentinelStoryAssets.compliance}
      features={complianceChapter.features}
      pinned={false}
    />
  );
}

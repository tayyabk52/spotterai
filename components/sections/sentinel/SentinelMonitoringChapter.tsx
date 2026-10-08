import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelMonitoringChapter() {
  const { monitoringChapter } = sentinelContent;
  return (
    <ChapterScene
      id={monitoringChapter.id}
      number={monitoringChapter.chapterNumber}
      label={monitoringChapter.tag}
      title={monitoringChapter.heading}
      description={monitoringChapter.description}
      asset={sentinelStoryAssets.monitoring}
      features={monitoringChapter.features}
      pinned={false}
      scrub={false}
      light
    />
  );
}

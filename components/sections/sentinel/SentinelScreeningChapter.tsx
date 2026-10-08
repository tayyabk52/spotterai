import { ChapterScene } from "@/components/story/ChapterScene";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";

export default function SentinelScreeningChapter() {
  const { screeningChapter } = sentinelContent;
  return (
    <ChapterScene
      id={screeningChapter.id}
      number={screeningChapter.chapterNumber}
      label={screeningChapter.tag}
      title={screeningChapter.heading}
      description={screeningChapter.description}
      asset={sentinelStoryAssets.screening}
      features={screeningChapter.features}
      pinned={false}
      scrub={false}
    />
  );
}

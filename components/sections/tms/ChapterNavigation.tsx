import { ChapterRail } from "@/components/story/ChapterRail";
import { storyChapters, tmsStory } from "@/content/tms";

export function ChapterNavigation() {
  return (
    <ChapterRail
      chapters={storyChapters}
      label={tmsStory.navigationLabel}
      pauseLabel={tmsStory.pause}
      resumeLabel={tmsStory.resume}
    />
  );
}

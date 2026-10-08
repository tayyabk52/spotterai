import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function ScoringChapter() {
  const { scoring } = driversApp;
  return (
    <ChapterScene
      id={scoring.id}
      number={scoring.number}
      label={scoring.label}
      title={scoring.title}
      description={scoring.description}
      asset={driverStoryAssets.matching}
      features={scoring.features}
      pinned
      scrub
    />
  );
}

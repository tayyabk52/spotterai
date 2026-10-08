import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function AutonomyChapter() {
  const { autonomy } = driversApp;
  return (
    <ChapterScene
      id={autonomy.id}
      number={autonomy.number}
      label={autonomy.label}
      title={autonomy.title}
      description={autonomy.description}
      asset={driverStoryAssets.autonomy}
      features={autonomy.features}
      pinned={false}
    />
  );
}

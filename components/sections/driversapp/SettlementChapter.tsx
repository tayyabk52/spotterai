import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function SettlementChapter() {
  const { settlement } = driversApp;
  return (
    <ChapterScene
      id={settlement.id}
      number={settlement.number}
      label={settlement.label}
      title={settlement.title}
      description={settlement.description}
      asset={driverStoryAssets.settlement}
      features={settlement.features}
      pinned={false}
      light
    />
  );
}

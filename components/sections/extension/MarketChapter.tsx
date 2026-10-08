import { extension, extensionAssets } from "@/content/extension";
import CapabilityChapter from "./CapabilityChapter";
export default function MarketChapter() {
  return (
    <CapabilityChapter
      chapter={extension.market}
      asset={extensionAssets.market}
      theme="market"
    />
  );
}

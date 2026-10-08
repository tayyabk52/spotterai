import { extension, extensionAssets } from "@/content/extension";
import CapabilityChapter from "./CapabilityChapter";
export default function SearchChapter() {
  return (
    <CapabilityChapter
      chapter={extension.filters}
      asset={extensionAssets.filters}
      theme="filters"
    />
  );
}

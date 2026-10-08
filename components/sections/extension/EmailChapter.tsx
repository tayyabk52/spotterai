import { extension, extensionAssets } from "@/content/extension";
import CapabilityChapter from "./CapabilityChapter";
export default function EmailChapter() {
  return (
    <CapabilityChapter
      chapter={extension.email}
      asset={extensionAssets.email}
    />
  );
}

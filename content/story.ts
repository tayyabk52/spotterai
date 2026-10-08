export type FeatureGroup = {
  title: string;
  description: string;
  details?: readonly string[];
};

export type StoryAsset = {
  kind?: "image";
  id: string;
  src: string;
  poster: string;
  sourceFile: string;
  sourceUrl: string;
  source: "client supplied" | "source page" | "generated";
  status?: "client asset" | "licensed stock" | "placeholder";
  license: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
  bytes: number;
};

export type StoryChapter = { id: string; number: string; label: string };

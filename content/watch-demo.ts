export type DemoVideo = {
  id: "sentinel" | "tms";
  product: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  captions: string;
  durationSeconds: number;
  width: number;
  height: number;
  productHref: string;
};

export const DEMO_VIDEOS: readonly DemoVideo[] = [
  {
    id: "sentinel",
    product: "Sentinel",
    title: "Driver screening",
    description:
      "See the MVR, PSP, and driver-review workflow inside Sentinel.",
    src: "/videos/watch-demo/sentinel.mp4",
    poster: "/images/watch-demo/sentinel.webp",
    captions: "/videos/watch-demo/sentinel.en.vtt",
    durationSeconds: 42.03,
    width: 1920,
    height: 1080,
    productHref: "/sentinel",
  },
  {
    id: "tms",
    product: "Spotter TMS",
    title: "Fuel planning",
    description:
      "Explore FuelSeek inside Spotter TMS, from route planning to fuel-stop comparisons.",
    src: "/videos/watch-demo/tms.mp4",
    poster: "/images/watch-demo/tms.webp",
    captions: "/videos/watch-demo/tms.en.vtt",
    durationSeconds: 60.76,
    width: 1920,
    height: 1080,
    productHref: "/tms",
  },
];

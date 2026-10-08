import Image from "next/image";
import type { InsightImage as ImageMetadata } from "@/content/insights";
import styles from "./Insights.module.css";

export function InsightImage({
  image,
  priority = false,
  sizes = "(min-width: 768px) 42vw, 100vw",
}: {
  image: ImageMetadata;
  priority?: boolean;
  sizes?: string;
}) {
  // Local source assets use optimization. Unrestricted CMS hosts are never
  // passed to Next's image proxy; an external CMS image loads directly.
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      preload={priority}
      unoptimized={!image.src.startsWith("/")}
      className={styles.image}
    />
  );
}

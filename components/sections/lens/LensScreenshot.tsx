import Image from "next/image";
import { lens, lensAssets } from "@/content/lens";
import styles from "./Lens.module.css";

export default function LensScreenshot({
  asset,
  priority = false,
}: {
  asset: (typeof lensAssets)[keyof typeof lensAssets];
  priority?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 85vw, 50vw"
          preload={priority}
        />
      </div>
      <figcaption>{lens.ui.snapshot}</figcaption>
    </figure>
  );
}

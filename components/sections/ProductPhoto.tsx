import Image from "next/image";
import type { ProductPhotoAsset } from "@/content/tms";
import styles from "./Tms.module.css";

export default function ProductPhoto({
  asset,
  hero = false,
}: {
  asset: ProductPhotoAsset;
  hero?: boolean;
}) {
  return (
    <div
      className={`${styles.photo} ${hero ? styles.heroPhoto : ""}`}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      {asset.status === "placeholder" || !asset.src ? (
        <p className={styles.placeholder}>{asset.placeholder}</p>
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          preload={hero}
          className={styles.image}
        />
      )}
    </div>
  );
}

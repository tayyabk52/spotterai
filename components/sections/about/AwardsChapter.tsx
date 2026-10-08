import type { CSSProperties } from "react";
import Image from "next/image";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function AwardsChapter() {
  const chapter = about.awards;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.awards}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </div>
        <ul className={styles.awardList}>
          {chapter.images.map((image) => (
            <li key={image.src}>
              <div
                className={styles.awardImage}
                style={
                  {
                    "--award-width": `${image.width}px`,
                    "--award-ratio": `${image.width} / ${image.height}`,
                  } as CSSProperties
                }
              >
                <Image
                  src={image.src}
                  fill
                  sizes={`${image.width}px`}
                  alt={image.alt}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

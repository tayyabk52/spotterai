"use client";
import { m, useTransform } from "motion/react";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { StoryAsset, FeatureGroup } from "@/content/story";
import { StoryFilm } from "./StoryFilm";
import { NarrativeBeats } from "./NarrativeBeats";
import { FeatureList } from "./FeatureList";
import Reveal from "@/components/Reveal";
import styles from "@/components/story/Story.module.css";

export function ChapterScene({
  id,
  number,
  label,
  title,
  description,
  paragraphs = [],
  className = "",
  asset,
  features,
  pinned = false,
  light = false,
  scrub = true,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  paragraphs?: readonly string[];
  className?: string;
  asset: StoryAsset;
  features: readonly FeatureGroup[];
  pinned?: boolean;
  light?: boolean;
  scrub?: boolean;
}) {
  const { enabled, cinematic } = useStoryMotion();
  const { ref, progress } = useChapterProgress(pinned && cinematic);
  const { ref: mediaRef, progress: mediaProgress } =
    useChapterProgress<HTMLDivElement>();
  const y = useTransform(mediaProgress, [0, 1], [20, -20]);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      data-tms-pin={pinned || undefined}
      className={`${styles.chapter} ${pinned ? styles.pinChapter : ""} ${light ? styles.light : styles.dark} ${className}`}
    >
      <div
        className={pinned ? styles.stickyScene : styles.scene}
        data-cinematic={(pinned && cinematic) || undefined}
      >
        <div className={styles.sceneLayout}>
          <Reveal className={styles.sceneCopy}>
            <div>
              <p className={styles.chapterLabel}>
                <span>{number}</span>
                {label}
              </p>
              <h2 id={`${id}-title`}>{title}</h2>
            </div>
            <div>
              <p className={styles.lead}>{description}</p>
              {paragraphs.map((paragraph) => (
                <p className={styles.lead} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <m.div
            ref={mediaRef}
            className={styles.sceneMedia}
            style={{ y: enabled && !pinned ? y : 0 }}
          >
            <StoryFilm
              asset={asset}
              scrub={scrub}
              progress={pinned && cinematic ? progress : mediaProgress}
            />
          </m.div>
          {features.length > 0 &&
            (pinned ? (
              <NarrativeBeats
                features={features}
                progress={progress}
                sectionId={id}
              />
            ) : (
              <FeatureList features={features} compact />
            ))}
        </div>
      </div>
    </section>
  );
}

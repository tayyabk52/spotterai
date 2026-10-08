"use client";
import React from "react";
import { m, useTransform } from "motion/react";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { StoryAsset, FeatureGroup } from "@/content/claims-os";
import { ClaimsFilm } from "./ClaimsFilm";
import Reveal from "@/components/Reveal";
import styles from "./Claims.module.css";

export function ClaimsChapterScene({
  id,
  number,
  label,
  title,
  description,
  asset,
  features,
  pinned = false,
  light = false,
  scrub = true,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  asset?: StoryAsset | null;
  features?: readonly FeatureGroup[];
  pinned?: boolean;
  light?: boolean;
  scrub?: boolean;
  children?: React.ReactNode;
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
      data-claims-pin={pinned || undefined}
      className={`${styles.chapter} ${pinned ? styles.pinChapter : ""} ${
        light ? styles.light : styles.dark
      }`}
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
            <p className={styles.lead}>{description}</p>
          </Reveal>

          {asset && (
            <m.div
              ref={mediaRef}
              className={styles.sceneMedia}
              style={{ y: enabled && !pinned ? y : 0 }}
            >
              <ClaimsFilm
                asset={asset}
                scrub={scrub}
                progress={pinned && cinematic ? progress : mediaProgress}
              />
            </m.div>
          )}

          {children}

          {features && features.length > 0 && (
            <ul className={`${styles.features} ${styles.compact}`}>
              {features.map((feature, index) => (
                <li key={feature.title}>
                  <span className={styles.featureNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    {feature.details && feature.details.length > 0 && (
                      <ul className={styles.details}>
                        {feature.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

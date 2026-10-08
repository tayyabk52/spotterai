"use client";
import { m, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { claimsOs, storyAssets } from "@/content/claims-os";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { ClaimsFilm } from "./ClaimsFilm";
import styles from "./Claims.module.css";

export function ClaimsHeroChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="claims-intro"
      aria-labelledby="claims-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-claims-pin>
        <div className={styles.heroStage}>
          <ClaimsFilm asset={storyAssets.triage} progress={progress} hero />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>{claimsOs.hero.eyebrow}</p>
            <h1 id="claims-title">{claimsOs.hero.title}</h1>
            <p className={styles.lead}>{claimsOs.hero.description}</p>
            <div className={styles.actions}>
              <ActionLink
                href={claimsOs.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {claimsOs.action.label}
              </ActionLink>
              <a
                href={claimsOs.hero.secondaryHref}
                className={styles.secondary}
              >
                {claimsOs.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {claimsOs.hero.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}

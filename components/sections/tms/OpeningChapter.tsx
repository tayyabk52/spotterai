"use client";
import { m, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { tms, tmsStory, storyAssets } from "@/content/tms";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import styles from "@/components/story/Story.module.css";

export default function OpeningChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);
  return (
    <section
      id="tms-intro"
      aria-labelledby="tms-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-tms-pin>
        <div className={styles.heroStage}>
          <StoryFilm asset={storyAssets.convergence} progress={progress} hero />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>{tmsStory.hero.eyebrow}</p>
            <h1 id="tms-title">{tmsStory.hero.title}</h1>
            <p className={styles.lead}>{tmsStory.hero.description}</p>
            <div className={styles.actions}>
              <ActionLink
                href={tms.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {tms.action.label}
              </ActionLink>
              <a href="#tms-capabilities" className={styles.secondary}>
                {tmsStory.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {tmsStory.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
      <div className={styles.coverage}>
        <a href={tms.source.url}>{tms.coverage.sourceLabel}</a>
        <ul>
          {tms.coverage.publishers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

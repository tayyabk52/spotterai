"use client";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { sentinelContent, sentinelStoryAssets } from "@/content/sentinel";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { StoryFilm } from "@/components/story/StoryFilm";
import styles from "./SentinelHero.module.css";

// A resolved film frame keeps the artwork visible in the static fallback.
const HERO_ASSET = {
  ...sentinelStoryAssets.shield,
  poster: "/images/sentinel/sentinel-shield-hero.webp",
};

export function SentinelHero() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>();

  return (
    <section
      id="sentinel-hero"
      aria-labelledby="sentinel-title"
      className={styles.hero}
    >
      <div ref={ref} className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{sentinelContent.hero.eyebrow}</p>
          <h1 id="sentinel-title">{sentinelContent.hero.title}</h1>
          <p className={styles.description}>
            {sentinelContent.hero.description}
          </p>

          <div className={styles.actions}>
            <ActionLink
              href={sentinelContent.hero.primaryHref}
              className={styles.primary}
              arrow={<ArrowUpRightIcon aria-hidden="true" />}
            >
              {sentinelContent.hero.primaryCta}
            </ActionLink>
            <a
              href={sentinelContent.hero.secondaryHref}
              className={styles.secondary}
            >
              {sentinelContent.hero.secondaryCta}
              <ArrowDownIcon aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.media}>
            <StoryFilm asset={HERO_ASSET} progress={progress} hero />
          </div>

          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {sentinelContent.hero.savingsStat}
              </span>
              <span className={styles.statLabel}>
                {sentinelContent.hero.savingsLabel}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {sentinelContent.hero.speedStat}
              </span>
              <span className={styles.statLabel}>
                {sentinelContent.hero.speedLabel}
              </span>
            </div>
          </div>

          <div className={styles.channels}>
            <span className={styles.channelDot} aria-hidden="true" />
            <span>{sentinelContent.hero.badgeChannels}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

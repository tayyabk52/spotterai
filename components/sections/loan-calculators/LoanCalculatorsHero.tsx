"use client";
import { m, useTransform } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import {
  loanCalculatorsContent,
  loanStoryAssets,
} from "@/content/loan-calculators";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { LoanCalculatorsFilm } from "./LoanCalculatorsFilm";
import styles from "./Calculators.module.css";

export function LoanCalculatorsHero() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="calculator-intro"
      aria-labelledby="calculator-title"
      className={styles.opening}
    >
      <div ref={ref} className={styles.heroTrack} data-calc-pin>
        <div className={styles.heroStage}>
          <LoanCalculatorsFilm
            asset={loanStoryAssets.hero}
            progress={progress}
            hero
          />
          <m.div className={styles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={styles.chapterLabel}>
              {loanCalculatorsContent.hero.eyebrow}
            </p>
            <h1 id="calculator-title">{loanCalculatorsContent.hero.title}</h1>
            <p className={styles.lead}>
              {loanCalculatorsContent.hero.description}
            </p>
            <div className={styles.actions}>
              <ActionLink
                href={loanCalculatorsContent.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {loanCalculatorsContent.action.label}
              </ActionLink>
              <a
                href={loanCalculatorsContent.hero.secondaryHref}
                className={styles.secondary}
              >
                {loanCalculatorsContent.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={styles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {loanCalculatorsContent.hero.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}

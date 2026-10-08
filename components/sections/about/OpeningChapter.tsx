"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import { about, aboutFilms } from "@/content/about";
import styles from "./About.module.css";

export function OpeningChapter() {
  const { cinematic } = useStoryMotion();
  const { ref, progress } = useChapterProgress(cinematic);
  const chapter = about.opening;
  return (
    <section
      ref={ref}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={styles.hero}
      data-about-pin
    >
      <div className={styles.heroStage} data-about-stage>
        <div className={styles.heroCopy}>
          <p className={styles.label}>{chapter.label}</p>
          <h1 id={`${chapter.id}-title`}>{chapter.title}</h1>
          <p className={styles.intro}>{chapter.description}</p>
          <div className={styles.actions}>
            {chapter.actions.map((action, index) => (
              <ActionLink
                key={action.label}
                href={action.href}
                secondary={index === 1}
                className={index === 0 ? styles.primary : styles.secondary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
        </div>
        <div className={styles.heroMedia} data-about-hero-media>
          <StoryFilm asset={aboutFilms.execution} progress={progress} hero />
        </div>
      </div>
    </section>
  );
}

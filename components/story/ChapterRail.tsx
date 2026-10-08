"use client";
import { useEffect, useMemo, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import type { StoryChapter } from "@/content/story";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";
export function ChapterRail({
  chapters,
  label,
  pauseLabel,
  resumeLabel,
  className = "",
}: {
  chapters: readonly StoryChapter[];
  label: string;
  pauseLabel: string;
  resumeLabel: string;
  className?: string;
}) {
  const ids = useMemo(() => chapters.map((chapter) => chapter.id), [chapters]);
  const navigation = useRef<HTMLElement>(null);
  const { active, visible } = useActiveChapter(ids);
  const { heroEligible, paused, toggle } = useStoryMotion();
  useEffect(() => {
    const list = navigation.current?.querySelector("ol");
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link || window.innerWidth >= 1024) return;
    list.scrollTo({
      left:
        link.offsetLeft -
        list.offsetLeft -
        list.clientWidth / 2 +
        link.offsetWidth / 2,
      behavior: "instant",
    });
  }, [active]);
  return (
    <nav
      ref={navigation}
      className={`${styles.chapterNav} ${className}`}
      data-opening={active === 0 || undefined}
      aria-label={label}
      hidden={!visible}
    >
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-label={`${chapter.number} ${chapter.label}`}
              title={chapter.label}
              aria-current={active === index ? "location" : undefined}
            >
              {chapter.number}
            </a>
          </li>
        ))}
      </ol>
      {heroEligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? resumeLabel : pauseLabel}
        >
          {paused ? (
            <PlayIcon aria-hidden="true" />
          ) : (
            <PauseIcon aria-hidden="true" />
          )}
        </button>
      )}
    </nav>
  );
}

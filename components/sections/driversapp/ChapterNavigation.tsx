"use client";
import { useEffect, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import { driverChapters, driversApp } from "@/content/driversapp";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";

const ids = driverChapters.map((chapter) => chapter.id);

export default function ChapterNavigation() {
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
      className={styles.chapterNav}
      aria-label={driversApp.story.navigationLabel}
      hidden={!visible}
    >
      <ol>
        {driverChapters.map((chapter, index) => (
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
          aria-label={paused ? driversApp.story.resume : driversApp.story.pause}
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

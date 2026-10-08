"use client";
import { useEffect, useRef } from "react";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import { sentinelContent } from "@/content/sentinel";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import useActiveChapter from "@/components/motion/useActiveChapter";
import styles from "@/components/story/Story.module.css";

const ids = sentinelContent.navigation.map((item) => item.id);

export default function SentinelNavigation() {
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
      aria-label="Sentinel chapter navigation"
      hidden={!visible}
    >
      <ol>
        {sentinelContent.navigation.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-label={item.label}
              title={item.label}
              aria-current={active === index ? "location" : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </a>
          </li>
        ))}
      </ol>
      {heroEligible && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Resume scrub motion" : "Pause scrub motion"}
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

"use client";
import { useState } from "react";
import { m, useMotionValueEvent, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import type { FeatureGroup } from "@/content/story";
import styles from "@/components/story/Story.module.css";

export function NarrativeBeats({
  features,
  progress,
  sectionId,
}: {
  features: readonly FeatureGroup[];
  progress: MotionValue<number>;
  sectionId: string;
}) {
  const { enabled, cinematic: eligible } = useStoryMotion();
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(progress, "change", (value) => {
    if (!enabled) return;
    const next = Math.min(
      features.length - 1,
      Math.floor(Math.max(0, value) * features.length),
    );
    setCurrent((previous) => (previous === next ? previous : next));
  });
  const jump = (index: number) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const header =
      document.querySelector("header")?.getBoundingClientRect().height ?? 88;
    const top = section.getBoundingClientRect().top + window.scrollY - header;
    const travel = section.offsetHeight - window.innerHeight + header;
    setCurrent(index);
    window.scrollTo({
      top: top + travel * ((index + 0.25) / features.length),
      behavior: enabled ? "smooth" : "instant",
    });
  };
  return (
    <div className={styles.beats} data-sequenced={eligible || undefined}>
      {eligible && (
        <div className={styles.beatIndex}>
          {features.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              onClick={() => jump(index)}
              aria-label={feature.title}
              aria-pressed={index === current}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
      <ol>
        {features.map((feature, index) => (
          <li key={feature.title} hidden={eligible && index !== current}>
            <m.div
              initial={false}
              animate={enabled && index === current ? { y: [12, 0] } : { y: 0 }}
              key={`${index}-${eligible && index === current}`}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </m.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

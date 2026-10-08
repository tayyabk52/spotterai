"use client";
import { useRef, useSyncExternalStore } from "react";
import { useScroll } from "motion/react";
const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const headerHeight = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 88;
export function useChapterProgress<T extends HTMLElement = HTMLElement>(
  pinned = false,
) {
  const ref = useRef<T>(null);
  const header = useSyncExternalStore(subscribe, headerHeight, () => 88);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned
      ? [`start ${header}px`, "end end"]
      : ["start end", `end ${header}px`],
  });
  return { ref, progress: scrollYProgress };
}

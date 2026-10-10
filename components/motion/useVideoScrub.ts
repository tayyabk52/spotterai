"use client";
import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

const SEEK_RETRY_DELAY_MS = 250;

export function useVideoScrub(
  ref: RefObject<HTMLVideoElement | null>,
  progress: MotionValue<number>,
  enabled: boolean,
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    let frame = 0;
    let retry = 0;
    let seekStartedAt = 0;
    let disposed = false;
    const seek = () => {
      frame = 0;
      if (
        disposed ||
        !Number.isFinite(video.duration) ||
        video.readyState < HTMLMediaElement.HAVE_METADATA
      )
        return;
      const time =
        Math.max(0, Math.min(1, progress.get())) *
        Math.max(0, video.duration - 1 / 24);
      // WebKit can delay seeked while scrolling. Coalesce normally, but don't
      // leave a newer scroll target waiting indefinitely for that event.
      if (
        video.seeking &&
        performance.now() - seekStartedAt < SEEK_RETRY_DELAY_MS
      ) {
        if (!retry) {
          retry = window.setTimeout(() => {
            retry = 0;
            schedule();
          }, SEEK_RETRY_DELAY_MS);
        }
        return;
      }
      // Mobile browsers may defer decoding until a seek requests a frame.
      if (Math.abs(video.currentTime - time) > 1 / 48) {
        seekStartedAt = performance.now();
        video.currentTime = time;
      }
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(seek);
    };
    video.pause();
    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("canplay", schedule);
    video.addEventListener("seeked", schedule);
    const unsubscribe = progress.on("change", schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      unsubscribe();
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("canplay", schedule);
      video.removeEventListener("seeked", schedule);
      video.pause();
    };
  }, [ref, progress, enabled]);
}

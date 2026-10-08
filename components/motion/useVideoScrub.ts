"use client";
import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

export function useVideoScrub(
  ref: RefObject<HTMLVideoElement | null>,
  progress: MotionValue<number>,
  enabled: boolean,
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    let frame = 0;
    let disposed = false;
    const seek = () => {
      frame = 0;
      if (
        disposed ||
        video.seeking ||
        !Number.isFinite(video.duration) ||
        video.readyState < HTMLMediaElement.HAVE_METADATA
      )
        return;
      const time =
        Math.max(0, Math.min(1, progress.get())) *
        Math.max(0, video.duration - 1 / 24);
      // Mobile browsers may defer decoding until a seek requests a frame.
      if (Math.abs(video.currentTime - time) > 1 / 48) video.currentTime = time;
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
      unsubscribe();
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("canplay", schedule);
      video.removeEventListener("seeked", schedule);
      video.pause();
    };
  }, [ref, progress, enabled]);
}

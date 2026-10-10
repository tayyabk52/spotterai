"use client";
import { useEffect, type RefObject } from "react";
import type { MotionValue } from "motion/react";

const SEEK_RETRY_DELAY_MS = 250;
const ACTIVATION_TIMEOUT_MS = 1500;
const ACTIVATED_VIDEOS = new WeakSet<HTMLVideoElement>();

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
    let priming = false;
    let activationTimeout = 0;
    let disposed = false;
    const seek = () => {
      frame = 0;
      if (
        disposed ||
        priming ||
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
    function finishActivation() {
      if (disposed) return;
      ACTIVATED_VIDEOS.add(video!);
      priming = false;
      clearTimeout(activationTimeout);
      video!.pause();
      schedule();
    }
    function activate() {
      if (disposed || priming || ACTIVATED_VIDEOS.has(video!)) return;
      // iOS may load metadata but not decode paused seeks until play() has
      // activated the decoder. Call directly from a gesture if autoplay fails.
      priming = true;
      video!.muted = true;
      video!.defaultMuted = true;
      video!.playsInline = true;
      activationTimeout = window.setTimeout(() => {
        priming = false;
        video!.pause();
        schedule();
      }, ACTIVATION_TIMEOUT_MS);
      void video!
        .play()
        .then(finishActivation)
        .catch(() => {
          if (disposed) return;
          priming = false;
          clearTimeout(activationTimeout);
          schedule();
        });
    }
    const needsActivation = window.matchMedia("(pointer: coarse)").matches;
    video.pause();
    if (needsActivation) {
      video.addEventListener("playing", finishActivation);
      video.addEventListener("loadedmetadata", activate);
      document.addEventListener("touchend", activate, { passive: true });
      document.addEventListener("pointerup", activate, { passive: true });
      activate();
    }
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
      clearTimeout(activationTimeout);
      unsubscribe();
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("canplay", schedule);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("playing", finishActivation);
      video.removeEventListener("loadedmetadata", activate);
      document.removeEventListener("touchend", activate);
      document.removeEventListener("pointerup", activate);
      video.pause();
    };
  }, [ref, progress, enabled]);
}

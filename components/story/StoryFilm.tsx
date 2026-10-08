"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { useVideoScrub } from "@/components/motion/useVideoScrub";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import type { StoryAsset } from "@/content/story";
import styles from "@/components/story/Story.module.css";

export function StoryFilm({
  asset,
  progress,
  hero = false,
  scrub = true,
}: {
  asset: StoryAsset;
  progress: MotionValue<number>;
  hero?: boolean;
  scrub?: boolean;
}) {
  const { ref: wrap, progress: ownProgress } =
    useChapterProgress<HTMLDivElement>();
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { enabled, eligible, heroEligible, cinematic, paused } =
    useStoryMotion();
  const scrubEligible = hero ? heroEligible : eligible;
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });
  const mounted =
    asset.kind !== "image" &&
    entered &&
    (scrub ? scrubEligible : true) &&
    !failed;
  const active =
    scrub && (hero ? heroEligible && !paused : enabled) && inView && mounted;
  useVideoScrub(video, hero && !cinematic ? ownProgress : progress, active);
  function showDecodedFrame() {
    // Data-saving browsers can omit loadeddata but still decode requested frames.
    if (
      video.current &&
      video.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    )
      setReady(true);
  }
  useEffect(() => {
    const element = video.current;
    if (scrub || !element) return;
    if (inView && !paused) void element.play().catch(() => {});
    else element.pause();
  }, [scrub, inView, paused, mounted]);
  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <Image
          src={asset.poster}
          fill
          alt={asset.alt}
          sizes="(min-width: 1440px) 1440px, 100vw"
          preload={hero}
          className={styles.poster}
        />
        {mounted && (
          <video
            ref={video}
            src={asset.src}
            width={asset.width}
            height={asset.height}
            muted
            loop={!scrub}
            controls={!scrub}
            playsInline
            preload="auto"
            aria-hidden={scrub ? true : undefined}
            aria-label={scrub ? undefined : asset.alt}
            tabIndex={scrub ? -1 : 0}
            className={`${styles.video} ${ready ? styles.videoReady : ""}`}
            onLoadStart={() => setReady(false)}
            onLoadedData={showDecodedFrame}
            onCanPlay={showDecodedFrame}
            onSeeked={showDecodedFrame}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

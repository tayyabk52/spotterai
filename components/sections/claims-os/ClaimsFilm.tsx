"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, type MotionValue } from "motion/react";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { useVideoScrub } from "@/components/motion/useVideoScrub";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import type { StoryAsset } from "@/content/claims-os";
import styles from "./Claims.module.css";

export function ClaimsFilm({
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

  // Once entered view, stay mounted to preserve buffer and readyState
  const inView = useInView(wrap, { margin: "150px 0px 150px 0px" });
  const entered = useInView(wrap, {
    margin: "450px 0px 450px 0px",
    once: true,
  });

  const isVideoAvailable =
    asset.kind === "video" &&
    asset.src !== null &&
    asset.status !== "placeholder";

  const mounted =
    isVideoAvailable && entered && (scrub ? scrubEligible : true) && !failed;

  const active =
    scrub && (hero ? heroEligible && !paused : enabled) && inView && mounted;

  useVideoScrub(video, hero && !cinematic ? ownProgress : progress, active);

  useEffect(() => {
    const element = video.current;
    if (scrub || !element) return;
    if (inView && !paused) void element.play().catch(() => {});
    else element.pause();
  }, [scrub, inView, paused, mounted]);

  return (
    <div ref={wrap} className={`${styles.film} ${hero ? styles.heroFilm : ""}`}>
      <div className={styles.filmLayer}>
        <div className={styles.posterContainer}>
          <Image
            src={asset.poster}
            alt={asset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority={hero}
            className={styles.poster}
          />
          {asset.status === "placeholder" && (
            <div className={styles.assetNeededBadge}>
              <span>ASSET NEEDED: {asset.id}</span>
            </div>
          )}
        </div>
        {mounted && (
          <video
            ref={video}
            src={asset.src ?? undefined}
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
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

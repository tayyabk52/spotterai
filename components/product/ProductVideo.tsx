"use client";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { ProductDemoAsset } from "@/content/product-media";
import styles from "./ProductVideo.module.css";

export default function ProductVideo({
  asset,
  label,
  playLabel,
  fallback,
  unavailable,
  paused = false,
  priority = false,
  autoPlay = true,
}: {
  asset: ProductDemoAsset;
  label: string;
  playLabel: string;
  fallback: string;
  unavailable: string;
  paused?: boolean;
  priority?: boolean;
  autoPlay?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const approached = useInView(wrap, { once: true, margin: "120px 0px" });
  const inView = useInView(wrap, { amount: 0.2 });
  const reduced = useReducedMotion();
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const mounted = (autoPlay && approached && reduced === false) || requested;
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (inView && !paused && (requested || (autoPlay && !reduced)))
      void element.play().catch(() => {});
    else element.pause();
  }, [inView, mounted, paused, reduced, requested, autoPlay]);
  return (
    <figure>
      <div
        ref={wrap}
        className={styles.media}
        style={{ aspectRatio: `${asset.width}/${asset.height}` }}
      >
        <Image
          src={asset.poster}
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          sizes="(min-width: 1200px) 900px, 100vw"
          preload={priority}
          className={styles.poster}
        />
        {mounted && !failed && (
          <video
            ref={video}
            src={asset.src}
            poster={asset.poster}
            width={asset.width}
            height={asset.height}
            muted
            playsInline
            loop
            controls
            preload="metadata"
            aria-label={asset.alt}
            className={`${styles.video} ${ready ? styles.ready : ""}`}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          >
            {unavailable}
          </video>
        )}
        {(!ready || (reduced && !requested)) && !failed && (
          <button
            className={styles.play}
            onClick={() => {
              setRequested(true);
              void video.current?.play().catch(() => {});
            }}
          >
            {playLabel}
            <ArrowUpRightIcon aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>
        {failed ? <a href={asset.sourceUrl}>{fallback}</a> : label}
      </figcaption>
    </figure>
  );
}

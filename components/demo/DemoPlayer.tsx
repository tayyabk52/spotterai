"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
import type { DemoVideo } from "@/content/watch-demo";
import styles from "./DemoPlayer.module.css";

export function DemoPlayer({ demo }: { demo: DemoVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
    };
  }, []);

  async function playDemo() {
    try {
      await videoRef.current?.play();
    } catch {
      setFailed(true);
    }
  }

  function retryDemo() {
    setFailed(false);
    setStarted(false);
    videoRef.current?.load();
  }

  return (
    <div className={styles.player}>
      <video
        ref={videoRef}
        src={demo.src}
        poster={demo.poster}
        width={demo.width}
        height={demo.height}
        controls
        playsInline
        preload="none"
        aria-label={`${demo.product} demo video`}
        onPlay={() => setStarted(true)}
        onError={() => setFailed(true)}
      >
        <track
          kind="captions"
          src={demo.captions}
          srcLang="en"
          label="English (auto-generated)"
        />
        <a href={demo.src}>Open the {demo.product} demo video</a>
      </video>
      {!started && !failed && (
        <button
          type="button"
          className={styles.playButton}
          aria-label={`Play ${demo.product} demo`}
          onClick={playDemo}
        >
          <PlayIcon size={28} weight="fill" aria-hidden="true" />
        </button>
      )}
      {failed && (
        <div className={styles.error} role="alert">
          <p>The demo couldn’t load.</p>
          <div>
            <button type="button" onClick={retryDemo}>
              Try again
            </button>
            <a href={demo.src}>Open video directly ↗</a>
          </div>
        </div>
      )}
      <noscript>
        <style>{`.${styles.playButton}{display:none}`}</style>
      </noscript>
    </div>
  );
}

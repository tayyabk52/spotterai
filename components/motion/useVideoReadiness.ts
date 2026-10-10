"use client";

import { useState, type RefObject } from "react";

export function useVideoReadiness(ref: RefObject<HTMLVideoElement | null>) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  function showDecodedFrame() {
    // Mobile data-saving modes can suppress loadeddata despite decoding a seek.
    if (
      ref.current &&
      ref.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      setReady(true);
    }
  }

  return {
    ready,
    failed,
    readinessEvents: {
      onLoadStart: () => setReady(false),
      onLoadedData: showDecodedFrame,
      onCanPlay: showDecodedFrame,
      onSeeked: showDecodedFrame,
      onError: () => setFailed(true),
    },
  };
}

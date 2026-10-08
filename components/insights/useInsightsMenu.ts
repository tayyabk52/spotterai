"use client";
import { useEffect, useState } from "react";
import type { InsightSummary } from "@/content/insights";

export function useInsightsMenu(enabled: boolean) {
  const [articles, setArticles] = useState<InsightSummary[]>([]);
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    fetch("/api/insights?menu=1", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Insights unavailable");
        const data = await response.json();
        if (!Array.isArray(data.articles))
          throw new Error("Invalid Insights menu");
        setArticles(data.articles);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [enabled]);
  return {
    articles,
    loading: enabled && status === "idle",
    error: status === "error",
  };
}

"use client";
import { useEffect, useState } from "react";
export default function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let next = 0;
      ids.forEach((id, index) => {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <=
          innerHeight * 0.45
        )
          next = index;
      });
      setActive(next);
      const main = document.getElementById("main-content");
      setVisible(
        (main?.getBoundingClientRect().bottom ?? 0) > innerHeight * 0.4,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);
  return { active, visible };
}

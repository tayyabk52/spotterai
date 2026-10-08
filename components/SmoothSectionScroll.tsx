"use client";

import { useEffect } from "react";
import { animate, useReducedMotion } from "framer-motion";

export default function SmoothSectionScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    let animation: ReturnType<typeof animate<number>> | undefined;
    const cancel = () => {
      animation?.stop();
      animation = undefined;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Escape",
        ].includes(event.key)
      )
        cancel();
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      cancel();
      const root = document.documentElement;
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const offset =
        id === "main-content" ? 0 : Math.max(headerHeight, margin) + padding;
      const destination = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top + window.scrollY - offset,
          root.scrollHeight - window.innerHeight,
        ),
      );
      if (location.hash !== url.hash)
        history.pushState(history.state, "", url.hash);
      const finish = () => {
        animation = undefined;
        const temporaryTabIndex = !target.hasAttribute("tabindex");
        if (temporaryTabIndex) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (temporaryTabIndex)
          target.addEventListener(
            "blur",
            () => target.removeAttribute("tabindex"),
            { once: true },
          );
      };
      if (
        reduced ||
        id === "main-content" ||
        Math.abs(destination - window.scrollY) < 2
      ) {
        window.scrollTo({ top: destination, behavior: "instant" });
        finish();
        return;
      }
      animation = animate(window.scrollY, destination, {
        duration: Math.min(
          0.8,
          0.48 + Math.abs(destination - window.scrollY) / 12000,
        ),
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (top) => window.scrollTo({ top, behavior: "instant" }),
        onComplete: finish,
      });
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancel();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [reduced]);
  return null;
}

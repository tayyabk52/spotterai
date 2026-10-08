"use client";
import type { ReactNode } from "react";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import styles from "./Results.module.css";
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
export default function ImpactMetric({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const reduced = useReducedMotion();
  const transition = {
    duration: 0.32,
    delay: reduced ? 0 : index * 0.05,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={styles.metric}
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
      >
        <m.span
          aria-hidden="true"
          className={styles.rule}
          initial={false}
          whileInView={reduced ? undefined : { scaleX: [0, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={transition}
        />
        {children}
      </m.div>
    </LazyMotion>
  );
}

"use client";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import styles from "./ClosingCTA.module.css";
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
export default function ClosingMotif() {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.svg
        viewBox="0 0 224 224"
        fill="none"
        className={styles.motif}
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="112" cy="112" r="104" className={styles.orbit} />
        <path
          d="M8 112H36M188 112H216M112 8V36M112 188V216"
          className={styles.orbit}
        />
        <m.g
          initial={false}
          whileInView={reduced ? undefined : { scale: [0.94, 1], y: [12, 0] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "112px 112px" }}
        >
          <circle cx="66" cy="66" r="24" className={styles.coral} />
          <circle cx="66" cy="122" r="24" className={styles.teal} />
          <circle cx="122" cy="122" r="24" className={styles.porcelain} />
          <circle cx="178" cy="122" r="24" className={styles.porcelain} />
        </m.g>
      </m.svg>
    </LazyMotion>
  );
}

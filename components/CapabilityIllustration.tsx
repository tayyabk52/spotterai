"use client";

import Image from "next/image";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { Product } from "@/content/home";
import styles from "./CapabilityOverview.module.css";

export type CapabilityVariant = Product["id"];
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);

export default function CapabilityIllustration({
  variant,
}: {
  variant: CapabilityVariant;
}) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={styles.artwork}
        aria-hidden="true"
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={`/images/capabilities/${variant}.webp`}
          alt=""
          width={1200}
          height={480}
          sizes="(max-width: 767px) calc(100vw - 88px), (max-width: 1199px) 44vw, 560px"
          className={styles.illustration}
        />
      </m.div>
    </LazyMotion>
  );
}

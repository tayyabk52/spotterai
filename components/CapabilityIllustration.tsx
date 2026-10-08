"use client";

import Image, { type StaticImageData } from "next/image";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { Product } from "@/content/home";
import lensMarketImage from "@/public/images/capabilities/lens-market-context.webp";
import crmRecruitingImage from "@/public/images/capabilities/crm-recruiting.webp";
import driverCabinImage from "@/public/images/capabilities/driver-app-cabin.webp";
import tmsOperationsImage from "@/public/images/capabilities/tms-operations.webp";
import sentinelInspectionImage from "@/public/images/capabilities/sentinel-inspection.webp";
import extensionWorkstationImage from "@/public/images/capabilities/extension-workstation.webp";
import styles from "./CapabilityOverview.module.css";

export type CapabilityVariant = Product["id"];
const CAPABILITY_PHOTOGRAPHS: Record<CapabilityVariant, StaticImageData> = {
  lens: lensMarketImage,
  crm: crmRecruitingImage,
  "driver-app": driverCabinImage,
  tms: tmsOperationsImage,
  sentinel: sentinelInspectionImage,
  extension: extensionWorkstationImage,
};
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);

export default function CapabilityIllustration({
  variant,
}: {
  variant: CapabilityVariant;
}) {
  const reduced = useReducedMotion();
  const photograph = CAPABILITY_PHOTOGRAPHS[variant];
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
          src={photograph}
          alt=""
          width={1200}
          height={photograph.height}
          sizes="(max-width: 767px) calc(100vw - 88px), (max-width: 1199px) 44vw, 560px"
          className={styles.illustration}
        />
      </m.div>
    </LazyMotion>
  );
}

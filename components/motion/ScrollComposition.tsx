"use client";
import { LazyMotion, m, useReducedMotion, useTransform } from "framer-motion";
import { useChapterProgress } from "./useChapterProgress";
const loadFeatures = () =>
  import("../motion-features").then((m) => m.motionFeatures);
export default function ScrollComposition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, progress } = useChapterProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0, 1], [16, -16]);
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}

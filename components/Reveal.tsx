"use client";
import { LazyMotion, m, useReducedMotion } from "framer-motion";
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);
export default function Reveal({
  children,
  className,
  entrance = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  entrance?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={className}
        initial={false}
        whileInView={reduced ? undefined : { y: [12, 0] }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: entrance ? 0.24 : 0.32,
          delay: reduced ? 0 : Math.min(Math.max(delay, 0), 0.16),
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

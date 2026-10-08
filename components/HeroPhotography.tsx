"use client";
import Image from "next/image";
import {
  LazyMotion,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroPhotos } from "./sections/hero-images";
import styles from "./sections/Hero.module.css";
const loadFeatures = () =>
  import("./motion-features").then((module) => module.motionFeatures);
export default function HeroPhotography() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const leftX = useTransform(scrollY, [0, 800], [0, -64]);
  const rightX = useTransform(scrollY, [0, 800], [0, 64]);
  const photoY = useTransform(scrollY, [0, 800], [0, -48]);
  return (
    <LazyMotion features={loadFeatures} strict>
      <div className={styles.photography}>
        {heroPhotos.map((image) => (
          <m.figure
            key={image.src}
            className={`${styles.photo} ${styles[image.position]}`}
            style={
              reduced
                ? undefined
                : { x: image.direction === "left" ? leftX : rightX, y: photoY }
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) 45vw, (max-width: 1199px) 150px, 240px"
              className={styles.photoImage}
            />
            <figcaption>{image.caption}</figcaption>
          </m.figure>
        ))}
      </div>
    </LazyMotion>
  );
}

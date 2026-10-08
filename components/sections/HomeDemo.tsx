import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Container from "@/components/layout/Container";
import { DemoPlayer } from "@/components/demo/DemoPlayer";
import { DEMO_VIDEOS } from "@/content/watch-demo";
import styles from "./HomeDemo.module.css";

const FEATURED_DEMO =
  DEMO_VIDEOS.find((demo) => demo.id === "tms") ?? DEMO_VIDEOS[0];

export function HomeDemo() {
  return (
    <section
      id="home-demo"
      className={styles.section}
      aria-labelledby="home-demo-title"
    >
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className="eyebrow">A closer look</p>
            <h2 id="home-demo-title">
              Spotter TMS.
              <br />
              <span>In action.</span>
            </h2>
            <p className={styles.description}>{FEATURED_DEMO.description}</p>
            <Link href="/watch-demo?demo=tms" className={styles.link}>
              Watch all demos
              <ArrowUpRightIcon size={20} aria-hidden="true" />
            </Link>
          </div>
          <figure className={styles.film}>
            <DemoPlayer demo={FEATURED_DEMO} />
            <figcaption className={styles.caption}>
              <span>FuelSeek walkthrough</span>
              <span>Spotter TMS</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { DemoPlayer } from "@/components/demo/DemoPlayer";
import { DEMO_VIDEOS } from "@/content/watch-demo";
import styles from "./WatchDemo.module.css";

export const metadata: Metadata = {
  title: "Watch a Demo",
  description:
    "Watch short product demos of Sentinel driver screening and FuelSeek inside Spotter TMS.",
  alternates: { canonical: "/watch-demo" },
  openGraph: {
    title: "Watch a Demo | Spotter.ai",
    description:
      "See Sentinel and Spotter TMS in action. Choose a short product walkthrough.",
    url: "https://spotter.ai/watch-demo",
    type: "website",
  },
};

function formatDuration(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export default async function WatchDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string | string[] }>;
}) {
  const { demo: demoId } = await searchParams;
  const selectedDemo =
    DEMO_VIDEOS.find((demo) => demo.id === demoId) ?? DEMO_VIDEOS[0];

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <h1>See Spotter in action.</h1>
            <p>Choose a product. Watch the workflow.</p>
          </div>
        </div>

        <div className={styles.demoLayout}>
          <nav className={styles.library} aria-labelledby="demo-library-title">
            <h2 id="demo-library-title">Choose your demo</h2>
            <div className={styles.demoOptions}>
              {DEMO_VIDEOS.map((demo) => (
                <Link
                  key={demo.id}
                  href={`/watch-demo?demo=${demo.id}`}
                  aria-current={
                    selectedDemo.id === demo.id ? "page" : undefined
                  }
                  className={styles.demoOption}
                  scroll={false}
                >
                  <span className={styles.optionHeading}>
                    <strong>{demo.product}</strong>
                    <span>{formatDuration(demo.durationSeconds)}</span>
                  </span>
                  <span className={styles.optionDescription}>
                    {demo.id === "sentinel"
                      ? "Driver screening"
                      : "FuelSeek & routing"}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <section className={styles.viewer} aria-labelledby="demo-title">
            <div className={styles.videoHeading}>
              <h2 id="demo-title">{selectedDemo.title}</h2>
              <Link
                href={selectedDemo.productHref}
                className={styles.productLink}
              >
                Explore {selectedDemo.product}
                <ArrowUpRightIcon size={20} aria-hidden="true" />
              </Link>
            </div>
            <DemoPlayer key={selectedDemo.id} demo={selectedDemo} />
            <div className={styles.videoFooter}>
              <p>{selectedDemo.description}</p>
              <a href={selectedDemo.src} className={styles.directLink}>
                Open video <ArrowUpRightIcon size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>

        <div className={styles.contact}>
          <p>Want a walkthrough with your team?</p>
          <Link href={`/request-quote?product=${selectedDemo.id}`}>
            Request a personalized demo
            <ArrowUpRightIcon size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}

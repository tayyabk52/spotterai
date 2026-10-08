import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { CAREERS_ORIGIN, careerJobHref } from "@/content/careers";
import { getCareerJob } from "@/lib/careers/repository";
import styles from "@/components/careers/Careers.module.css";

type JobPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = await getCareerJob(slug);
    if (!job) {
      return {
        title: "Role Not Found",
        robots: { index: false, follow: false },
      };
    }
    const title = `${job.title} | Careers at Spotter`;
    const description =
      job.introduction ||
      `Apply for the ${job.title} position at Spotter. Join our team building connected freight automation.`;
    const canonical = careerJobHref(slug);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "website",
        title,
        description,
        url: canonical,
        siteName: "Spotter.ai",
        images: [
          {
            url: "/images/hero/terminal-dawn.webp",
            width: 900,
            height: 600,
            alt: `Spotter Careers — ${job.title}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/hero/terminal-dawn.webp"],
      },
    };
  } catch {
    return { title: "Careers", robots: { index: false, follow: false } };
  }
}

export default async function CareerJobPage({ params }: JobPageProps) {
  const { slug } = await params;
  let job;
  try {
    job = await getCareerJob(slug);
  } catch (error) {
    console.error("Unable to load career job details", error);
    return (
      <main id="main-content" className={styles.jobPage}>
        <Container>
          <Link href="/careers#open-roles" className={styles.back}>
            ← All open roles
          </Link>
          <div className={styles.unavailable}>
            <h1>Role details are temporarily unavailable.</h1>
            <p>Read this role on our careers site or return to all openings.</p>
            <a
              className={styles.primary}
              href={`${CAREERS_ORIGIN}/jobs/${slug}`}
            >
              Visit careers site ↗
            </a>
          </div>
        </Container>
      </main>
    );
  }
  if (!job) notFound();
  return (
    <main id="main-content" className={styles.jobPage}>
      <Container>
        <Link href="/careers#open-roles" className={styles.back}>
          ← All open roles
        </Link>
        <header className={styles.jobHeader}>
          <p className="eyebrow">Careers at Spotter</p>
          {job.metadata && <p className={styles.jobMetadata}>{job.metadata}</p>}
          <h1>{job.title}</h1>
          {job.introduction && <p>{job.introduction}</p>}
        </header>
        <div className={styles.jobDetailLayout}>
          <article
            className={styles.jobDescription}
            aria-label="Role description"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
          <aside className={styles.application} aria-labelledby="apply-heading">
            <p className="eyebrow">Your next step</p>
            <h2 id="apply-heading">Apply for this role.</h2>
            <p>
              Continue to Spotter’s application form to share your details and
              résumé.
            </p>
            <a href={job.applicationUrl} className={styles.primary}>
              Apply for this job <span aria-hidden="true">↗</span>
            </a>
            <p className={styles.applicationNote}>
              Application hosted by Teamtailor.
            </p>
            <a
              href={`${CAREERS_ORIGIN}/data-privacy`}
              className={styles.textLink}
            >
              Candidate data &amp; privacy <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...job.schema,
            url: `https://spotter.ai${careerJobHref(slug)}`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}

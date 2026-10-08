import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Link from "next/link";
import { careerJobHref, type CareerJob } from "@/content/careers";
import styles from "./Careers.module.css";

export function CareerJobs({ jobs }: { jobs: CareerJob[] }) {
  if (!jobs.length)
    return (
      <div className={styles.empty}>
        <h3>No matching roles</h3>
        <p>Try another keyword or clear your filters to see all openings.</p>
      </div>
    );
  return (
    <ul className={styles.jobList}>
      {jobs.map((job) => (
        <li key={job.slug}>
          <Link href={careerJobHref(job.slug)} className={styles.jobRow}>
            <div>
              <p className={styles.jobMetadata}>{job.metadata}</p>
              <h3>{job.title}</h3>
            </div>
            <span className={styles.jobArrow} aria-hidden="true">
              <ArrowUpRightIcon size={18} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

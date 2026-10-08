import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { lens } from "@/content/lens";
import styles from "./Lens.module.css";

export default function LensContact() {
  return (
    <section className={styles.contact} aria-labelledby="lens-contact-title">
      <Reveal className={styles.contactPanel}>
        <div>
          <p className={styles.eyebrow}>{lens.contact.label}</p>
          <h2 id="lens-contact-title">{lens.contact.title}</h2>
          <p className={styles.description}>{lens.contact.description}</p>
        </div>
        <div className={styles.contactActions}>
          <ActionLink
            href={lens.actions.demo.href}
            className={styles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {lens.actions.demo.label}
          </ActionLink>
          <a
            className={styles.liveLink}
            href={lens.actions.live.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="lens-live-context"
          >
            {lens.actions.live.label}
            <ArrowUpRightIcon size={20} aria-hidden="true" />
          </a>
          <p id="lens-live-context" className={styles.liveContext}>
            {lens.ui.liveContext}
          </p>
        </div>
      </Reveal>
      <p className={styles.disclaimer}>{lens.ui.disclaimer}</p>
    </section>
  );
}

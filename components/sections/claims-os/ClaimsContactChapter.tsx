import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { claimsOs } from "@/content/claims-os";
import styles from "./Claims.module.css";

export function ClaimsContactChapter() {
  const { contact } = claimsOs;

  return (
    <section
      id={contact.id}
      aria-labelledby={`${contact.id}-title`}
      className={styles.contact}
    >
      <div className={styles.sceneLayout}>
        <Reveal>
          <p className={styles.chapterLabel}>
            <span>{contact.number}</span>
            {contact.eyebrow}
          </p>
          <h2 id={`${contact.id}-title`}>{contact.title}</h2>
        </Reveal>

        <div className={styles.contactBottom}>
          <p className={styles.lead}>{contact.description}</p>
          <ActionLink
            href={contact.action.href}
            className={styles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {contact.action.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

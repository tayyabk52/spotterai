import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function ContactChapter() {
  const chapter = about.contact;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.contact} ${styles.light}`}
    >
      <Reveal className={styles.container}>
        <p className={styles.label}>{chapter.label}</p>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p className={styles.intro}>{chapter.description}</p>
        <div className={styles.contactBottom}>
          <div className={styles.actions}>
            {chapter.actions.map((action, index) => (
              <ActionLink
                key={action.label}
                href={action.href}
                secondary={index === 1}
                className={index === 0 ? styles.primary : styles.secondary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
          <p>{chapter.note}</p>
        </div>
      </Reveal>
    </section>
  );
}

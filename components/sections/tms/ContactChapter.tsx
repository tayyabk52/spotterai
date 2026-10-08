import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { tms, tmsStory, storyChapters } from "@/content/tms";
import styles from "@/components/story/Story.module.css";
export default function ContactChapter() {
  const chapter = storyChapters[7];
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={styles.contact}
    >
      <Reveal>
        <p className={styles.chapterLabel}>
          <span>{chapter.number}</span>
          {tmsStory.contact.eyebrow}
        </p>
        <h2 id={`${chapter.id}-title`}>{tmsStory.contact.title}</h2>
      </Reveal>
      <div className={styles.contactBottom}>
        <p className={styles.lead}>{tmsStory.contact.description}</p>
        <ActionLink
          href={tms.action.href}
          className={styles.primary}
          arrow={<ArrowUpRightIcon aria-hidden="true" />}
        >
          {tms.action.label}
        </ActionLink>
      </div>
    </section>
  );
}

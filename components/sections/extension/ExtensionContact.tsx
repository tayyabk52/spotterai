import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { extension } from "@/content/extension";
import styles from "./Extension.module.css";
export default function ExtensionContact() {
  return (
    <section
      className={styles.contact}
      aria-labelledby="extension-contact-title"
    >
      <Reveal className={styles.contactPanel}>
        <p className={styles.eyebrow}>{extension.contact.label}</p>
        <h2 id="extension-contact-title">{extension.contact.title}</h2>
        <div className={styles.contactRow}>
          <p>{extension.contact.description}</p>
          <ActionLink
            className={styles.install}
            href={extension.install.href}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {extension.install.label}
          </ActionLink>
        </div>
        <p className={styles.attribution}>
          <a href={extension.source}>{extension.ui.source}</a>
        </p>
      </Reveal>
    </section>
  );
}

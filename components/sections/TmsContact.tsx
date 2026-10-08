import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { tms } from "@/content/tms";
import Container from "../layout/Container";
import ActionLink from "../ActionLink";
import Reveal from "../Reveal";
import styles from "./Tms.module.css";

export default function TmsContact() {
  return (
    <section aria-labelledby="tms-contact-title" className={styles.section}>
      <Container>
        <div className={styles.contact}>
          <Reveal>
            <p className={`eyebrow ${styles.contactEyebrow}`}>
              {tms.contact.eyebrow}
            </p>
            <h2 id="tms-contact-title">{tms.contact.title}</h2>
          </Reveal>
          <div className={styles.contactBottom}>
            <Reveal delay={0.08}>
              <p>{tms.contact.description}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <ActionLink
                href={tms.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {tms.action.label}
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

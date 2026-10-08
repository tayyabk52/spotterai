import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { driversApp } from "@/content/driversapp";
import tmsStyles from "@/components/story/Story.module.css";
import driverStyles from "./DriversApp.module.css";

export default function ContactChapter() {
  const { contact, appDownloads, quoteLink } = driversApp;
  return (
    <section
      id={contact.id}
      aria-labelledby={`${contact.id}-title`}
      className={tmsStyles.contact}
    >
      <Reveal>
        <p className={tmsStyles.chapterLabel}>
          <span>{contact.number}</span>
          {contact.eyebrow}
        </p>
        <h2 id={`${contact.id}-title`}>{contact.title}</h2>
      </Reveal>
      <div className={tmsStyles.contactBottom}>
        <p className={tmsStyles.lead}>{contact.description}</p>
        <div className={driverStyles.contactActions}>
          <div className={driverStyles.contactBadges}>
            <a
              href={appDownloads.ios.href}
              target="_blank"
              rel="noopener noreferrer"
              className={driverStyles.appBadgeLink}
              aria-label={appDownloads.ios.label}
            >
              <Image
                src={appDownloads.ios.icon}
                alt=""
                width={149}
                height={44}
                className={driverStyles.appBadgeImg}
                unoptimized
              />
            </a>
            <a
              href={appDownloads.android.href}
              target="_blank"
              rel="noopener noreferrer"
              className={driverStyles.appBadgeLink}
              aria-label={appDownloads.android.label}
            >
              <Image
                src={appDownloads.android.icon}
                alt=""
                width={147}
                height={44}
                className={driverStyles.appBadgeImg}
                unoptimized
              />
            </a>
          </div>
          <ActionLink
            href={quoteLink.href}
            className={tmsStyles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {quoteLink.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

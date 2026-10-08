"use client";
import React from "react";
import { ChatCircleDotsIcon } from "@phosphor-icons/react/dist/ssr/ChatCircleDots";
import { BellRingingIcon } from "@phosphor-icons/react/dist/ssr/BellRinging";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { claimsOs } from "@/content/claims-os";
import Reveal from "@/components/Reveal";
import styles from "./Claims.module.css";

export function SlackAutomationChapter() {
  const { slack } = claimsOs;

  return (
    <section
      id={slack.id}
      aria-labelledby={`${slack.id}-title`}
      className={`${styles.chapter} ${styles.dark} ${styles.scene}`}
    >
      <div className={styles.sceneLayout}>
        <Reveal className={styles.sceneCopy}>
          <div>
            <p className={styles.chapterLabel}>
              <span>{slack.number}</span>
              {slack.label}
            </p>
            <h2 id={`${slack.id}-title`}>{slack.title}</h2>
          </div>
          <p className={styles.lead}>{slack.description}</p>
        </Reveal>

        <div className={styles.slackContainer}>
          <div className={styles.slackFeatures}>
            <ul className={styles.features}>
              <li>
                <span className={styles.featureNumber}>
                  <BellRingingIcon
                    size={24}
                    weight="duotone"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3>{slack.features[0].title}</h3>
                  <p>{slack.features[0].description}</p>
                </div>
              </li>
              <li>
                <span className={styles.featureNumber}>
                  <FileTextIcon size={24} weight="duotone" aria-hidden="true" />
                </span>
                <div>
                  <h3>{slack.features[1].title}</h3>
                  <p>{slack.features[1].description}</p>
                </div>
              </li>
              <li>
                <span className={styles.featureNumber}>
                  <UsersThreeIcon
                    size={24}
                    weight="duotone"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3>{slack.features[2].title}</h3>
                  <p>{slack.features[2].description}</p>
                </div>
              </li>
            </ul>
          </div>

          <Reveal>
            <div
              className={styles.slackCard}
              role="region"
              aria-label="Slack integration example"
            >
              <div className={styles.slackHeader}>
                <div className={styles.slackChannel}>
                  <ChatCircleDotsIcon
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                  />
                  <span>{slack.feed.channel}</span>
                </div>
                <span className={styles.slackChannelMeta}>
                  INTEGRATED DISPATCH
                </span>
              </div>
              <div className={styles.slackBody}>
                <div className={styles.slackAvatar} aria-hidden="true">
                  SP
                </div>
                <div className={styles.slackMessageContent}>
                  <div className={styles.slackSenderRow}>
                    <span className={styles.slackSenderName}>
                      {slack.feed.sender}
                    </span>
                    <span className={styles.slackTimestamp}>
                      {slack.feed.timestamp}
                    </span>
                  </div>
                  <p className={styles.slackText}>{slack.feed.message}</p>
                  <div className={styles.slackActions}>
                    <span className={styles.slackBtnPrimary}>
                      {slack.feed.actions[0]}
                    </span>
                    <span className={styles.slackBtnSecondary}>
                      {slack.feed.actions[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

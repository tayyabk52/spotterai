"use client";
import Image from "next/image";
import { m, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { driversApp, driverStoryAssets } from "@/content/driversapp";
import { useChapterProgress } from "@/components/motion/useChapterProgress";
import { useStoryMotion } from "@/components/motion/StoryMotionProvider";
import { StoryFilm } from "@/components/story/StoryFilm";
import tmsStyles from "@/components/story/Story.module.css";
import driverStyles from "./DriversApp.module.css";

export default function OpeningChapter() {
  const { ref, progress } = useChapterProgress<HTMLDivElement>(true);
  const { enabled } = useStoryMotion();
  const y = useTransform(progress, [0, 1], [0, -18]);

  return (
    <section
      id="driver-intro"
      aria-labelledby="driver-title"
      className={tmsStyles.opening}
    >
      <div ref={ref} className={tmsStyles.heroTrack} data-tms-pin>
        <div className={tmsStyles.heroStage}>
          <StoryFilm
            asset={driverStoryAssets.opening}
            progress={progress}
            hero
          />
          <m.div className={tmsStyles.heroCopy} style={{ y: enabled ? y : 0 }}>
            <p className={tmsStyles.chapterLabel}>{driversApp.hero.eyebrow}</p>
            <h1 id="driver-title">{driversApp.hero.title}</h1>
            <p className={tmsStyles.lead}>{driversApp.hero.description}</p>
            <div className={driverStyles.appBadges}>
              <a
                href={driversApp.appDownloads.ios.href}
                target="_blank"
                rel="noopener noreferrer"
                className={driverStyles.appBadgeLink}
                aria-label={driversApp.appDownloads.ios.label}
              >
                <Image
                  src={driversApp.appDownloads.ios.icon}
                  alt=""
                  width={149}
                  height={44}
                  className={driverStyles.appBadgeImg}
                  unoptimized
                />
              </a>
              <a
                href={driversApp.appDownloads.android.href}
                target="_blank"
                rel="noopener noreferrer"
                className={driverStyles.appBadgeLink}
                aria-label={driversApp.appDownloads.android.label}
              >
                <Image
                  src={driversApp.appDownloads.android.icon}
                  alt=""
                  width={147}
                  height={44}
                  className={driverStyles.appBadgeImg}
                  unoptimized
                />
              </a>
            </div>
            <div className={tmsStyles.actions}>
              <ActionLink
                href={driversApp.quoteLink.href}
                className={tmsStyles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {driversApp.quoteLink.label}
              </ActionLink>
              <a
                href={driversApp.hero.secondaryHref}
                className={tmsStyles.secondary}
              >
                {driversApp.hero.secondaryCta}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </div>
            <p className={tmsStyles.scrollHint}>
              <ArrowDownIcon aria-hidden="true" />
              {driversApp.story.scrollHint}
            </p>
          </m.div>
        </div>
      </div>
      <div className={tmsStyles.coverage}>
        <p className={driverStyles.carrierNotice}>
          {driversApp.hero.carrierNote}
        </p>
      </div>
    </section>
  );
}

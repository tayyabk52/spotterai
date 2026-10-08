"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { navigation, quoteLink } from "@/content/home";
import { insightHref, insightsContent } from "@/content/insights";
import { useInsightsMenu } from "@/components/insights/useInsightsMenu";
import ActionLink from "../ActionLink";
import styles from "./MobileDrawer.module.css";

export default function MobileDrawer({
  onClose,
  trigger,
  descriptions,
}: {
  onClose: () => void;
  trigger: RefObject<HTMLButtonElement | null>;
  descriptions: Record<string, string>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const insightMenu = useInsightsMenu(expanded === "Resources");
  const reduced = useReducedMotion();
  const transition = {
    duration: reduced ? 0 : 0.32,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  useEffect(() => {
    const element = dialog.current!;
    const returnTarget = trigger.current;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const properties = [
      "position",
      "top",
      "left",
      "right",
      "width",
      "overflow",
      "padding-right",
    ];
    const previous = properties.map((property) => [
      property,
      body.style.getPropertyValue(property),
      body.style.getPropertyPriority(property),
    ]);
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.position = "fixed";
    body.style.top = `${-scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${padding + gutter}px`;
    element.showModal();
    closeButton.current?.focus();
    return () => {
      element.close();
      for (const [property, value, priority] of previous) {
        if (value) body.style.setProperty(property, value, priority);
        else body.style.removeProperty(property);
      }
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      const button = returnTarget;
      if (button?.getClientRects().length)
        button.focus({ preventScroll: true });
      else
        document
          .querySelector<HTMLAnchorElement>(
            'header a[aria-label="Spotter.ai home"]',
          )
          ?.focus({ preventScroll: true });
    };
  }, [trigger]);

  return createPortal(
    <dialog
      ref={dialog}
      id="mobile-navigation"
      className={styles.dialog}
      aria-label="Mobile navigation"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.frame}>
        <div className={styles.topbar}>
          <Link
            href="/"
            aria-label="Spotter.ai home"
            className={styles.logo}
            onClick={onClose}
          >
            <Image
              src="/brand/spotter-logo.png"
              width={640}
              height={158}
              alt="Spotter.ai"
              sizes="176px"
            />
          </Link>
          <button
            type="button"
            ref={closeButton}
            className={styles.close}
            aria-label="Close navigation"
            onClick={onClose}
          >
            <XIcon size={24} weight="light" aria-hidden="true" />
          </button>
        </div>
        <motion.nav
          className={styles.navigation}
          aria-label="Mobile main navigation"
          initial={false}
          exit={reduced ? undefined : { y: -8 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
        >
          <ul>
            {navigation.map((group, index) => {
              const open = expanded === group.label;
              const id = `mobile-${group.label.toLowerCase()}`;
              return (
                <motion.li
                  key={group.label}
                  className={styles.group}
                  initial={false}
                  animate={reduced ? undefined : { y: [-10, 0] }}
                  transition={{
                    ...transition,
                    delay: reduced ? 0 : index * 0.05,
                  }}
                >
                  <button
                    className={styles.groupButton}
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setExpanded(open ? null : group.label)}
                  >
                    <span>{group.label}</span>
                    <CaretDownIcon
                      size={20}
                      weight="light"
                      aria-hidden="true"
                      className={open ? styles.expandedIcon : undefined}
                    />
                  </button>
                  <ul id={id} className={styles.submenu} hidden={!open}>
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className={styles.link}
                        >
                          <span>{item.label}</span>
                          {(item.description || descriptions[item.label]) && (
                            <small>
                              {item.description || descriptions[item.label]}
                            </small>
                          )}
                        </a>
                      </li>
                    ))}
                    {group.label === "Resources" &&
                      insightMenu.articles.map((article) => (
                        <li key={article.slug}>
                          <a
                            href={insightHref(article.slug)}
                            onClick={onClose}
                            className={styles.link}
                          >
                            <span>{article.title}</span>
                            <small>{article.category}</small>
                          </a>
                        </li>
                      ))}
                    {group.label === "Resources" && insightMenu.error && (
                      <li role="status">
                        {insightsContent.interface.menuUnavailable}
                      </li>
                    )}
                    {group.label === "Resources" &&
                      insightMenu.loading &&
                      insightMenu.articles.length === 0 && (
                        <li role="status">
                          {insightsContent.interface.menuLoading}
                        </li>
                      )}
                  </ul>
                  <motion.span
                    className={styles.rule}
                    aria-hidden="true"
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      ...transition,
                      delay: reduced ? 0 : index * 0.05,
                    }}
                  />
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
        <div
          className={styles.footer}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a"))
              onClose();
          }}
        >
          <ActionLink
            href={quoteLink.href}
            className={styles.quote}
            arrow={<ArrowUpRightIcon size={20} />}
          >
            {quoteLink.label}
          </ActionLink>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

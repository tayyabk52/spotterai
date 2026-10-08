"use client";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Container from "@/components/layout/Container";
import { insightsContent as content } from "@/content/insights";
import styles from "./Insights.module.css";

function subscribeHydration() {
  return () => {};
}
function clientHydrated() {
  return true;
}
function serverHydrated() {
  return false;
}

export function InsightsNewsletter() {
  const copy = content.newsletter;
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    clientHydrated,
    serverHydrated,
  );

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (pending) return;
    setMessage("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      setMessage(copy.invalid);
      return;
    }
    setPending(true);
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          email,
          source: "insights",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || "",
          pageUrl: window.location.href,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmContent: params.get("utm_content") || "",
          utmTerm: params.get("utm_term") || "",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) throw new Error(copy.failure);
      setError(false);
      setMessage(copy.success);
      form.reset();
    } catch {
      setError(true);
      setMessage(copy.failure);
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      className={styles.newsletter}
      aria-labelledby="insights-newsletter-title"
    >
      <Container>
        <div className={styles.newsletterPanel}>
          <div>
            <h2 id="insights-newsletter-title">{copy.heading}</h2>
            <p>{copy.description}</p>
          </div>
          <form onSubmit={subscribe} noValidate>
            <label htmlFor="insights-email">{copy.label}</label>
            <div className={styles.signupControls}>
              <input
                id="insights-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder={copy.placeholder}
                disabled={!hydrated || pending}
                aria-describedby={
                  message ? "insights-subscription-status" : undefined
                }
              />
              <button
                type="submit"
                className={styles.button}
                disabled={!hydrated || pending}
              >
                {pending ? copy.pending : copy.submit}
                <ArrowUpRightIcon size={20} aria-hidden="true" />
              </button>
            </div>
            <p
              id="insights-subscription-status"
              className={error ? styles.errorMessage : styles.successMessage}
              role={error ? "alert" : "status"}
              aria-live="polite"
            >
              {message}
            </p>
            <noscript>
              <p>{content.interface.newsletterRequiresJavaScript}</p>
            </noscript>
          </form>
        </div>
      </Container>
    </section>
  );
}

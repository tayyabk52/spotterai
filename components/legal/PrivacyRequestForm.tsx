"use client";

import { useEffect, useRef, useState } from "react";
import {
  PRIVACY_CONTACT,
  PRIVACY_REQUEST_OPTIONS,
  PRIVACY_REQUEST_STATES,
} from "@/content/legal/privacy-request";
import styles from "./PrivacyRequestForm.module.css";

const INPUT_FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autocomplete: "given-name",
    required: false,
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
    autocomplete: "family-name",
    required: false,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autocomplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    autocomplete: "tel-national",
    required: false,
  },
] as const;

export function PrivacyRequestForm() {
  const [draft, setDraft] = useState<{ body: string; href: string } | null>(
    null,
  );
  const [phoneError, setPhoneError] = useState("");
  const draftTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (draft) draftTitle.current?.focus();
  }, [draft]);

  function prepareRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    function value(name: string) {
      return String(data.get(name) ?? "").trim();
    }
    const phone = value("phone").replace(/\D/g, "");
    const nationalPhone =
      phone.length === 11 && phone.startsWith("1") ? phone.slice(1) : phone;
    if (phone && !/^[2-9]\d{2}[2-9]\d{6}$/.test(nationalPhone)) {
      setPhoneError("Please enter a valid US phone number.");
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    setPhoneError("");
    const request =
      PRIVACY_REQUEST_OPTIONS.find(
        (option) => option.value === value("request"),
      )?.label || "CCPA privacy request";
    const state =
      PRIVACY_REQUEST_STATES.find((option) => option.value === value("state"))
        ?.label || value("state");
    const body = [
      "CCPA Privacy Request",
      "",
      `Request: ${request}`,
      "",
      `Name: ${value("name")}`,
      `Surname: ${value("surname")}`,
      `Email address: ${value("email")}`,
      `Phone number: ${value("phone")}`,
      `State: ${state}`,
      `Zip code: ${value("zipcode")}`,
      "",
      "Additional Message:",
      value("message"),
    ].join("\r\n");
    setDraft({
      body,
      href: `mailto:${PRIVACY_CONTACT}?subject=${encodeURIComponent("CCPA Privacy Request")}&body=${encodeURIComponent(body)}`,
    });
  }

  return (
    <section
      id="privacy-request"
      className={styles.section}
      aria-labelledby="privacy-request-title"
    >
      <h2 id="privacy-request-title">Make a privacy request</h2>
      <p>
        Complete the fields below to prepare an email to{" "}
        <a href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</a>. Review and
        send it from your email app.
      </p>
      <form
        className={styles.form}
        onSubmit={prepareRequest}
        onChange={() => {
          setDraft(null);
          setPhoneError("");
        }}
      >
        <p className={styles.requiredNote}>
          Email address and state are required.
        </p>
        <div className={styles.fields}>
          {INPUT_FIELDS.map((field) => (
            <div className={styles.field} key={field.name}>
              <label htmlFor={`privacy-${field.name}`}>
                {field.label}
                {field.required && <span> *</span>}
              </label>
              <input
                id={`privacy-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autocomplete}
                required={field.required}
                maxLength={field.name === "phone" ? 24 : 254}
                aria-invalid={
                  field.name === "phone" && phoneError ? true : undefined
                }
                aria-describedby={
                  field.name === "phone" && phoneError
                    ? "privacy-phone-error"
                    : undefined
                }
              />
              {field.name === "phone" && phoneError && (
                <span
                  id="privacy-phone-error"
                  className={styles.error}
                  role="alert"
                >
                  {phoneError}
                </span>
              )}
            </div>
          ))}
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="privacy-request-choice">Request</label>
            <select id="privacy-request-choice" name="request" defaultValue="">
              <option value="">Selection</option>
              {PRIVACY_REQUEST_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="privacy-state">
              State<span> *</span>
            </label>
            <select
              id="privacy-state"
              name="state"
              defaultValue=""
              required
              autoComplete="address-level1"
            >
              <option value="">Please select the state</option>
              {PRIVACY_REQUEST_STATES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="privacy-zipcode">Zip code</label>
            <input
              id="privacy-zipcode"
              name="zipcode"
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              autoComplete="postal-code"
              title="Enter a 5-digit ZIP code"
            />
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="privacy-message">Additional Message</label>
            <textarea
              id="privacy-message"
              name="message"
              rows={5}
              maxLength={2000}
            />
          </div>
        </div>
        <button type="submit" className={styles.primary}>
          Prepare email request<span aria-hidden="true">→</span>
        </button>
      </form>
      {draft && (
        <div className={styles.draft}>
          <h3 ref={draftTitle} tabIndex={-1}>
            Review your request
          </h3>
          <p>
            Open the email draft, or copy the text below into an email to{" "}
            {PRIVACY_CONTACT}.
          </p>
          <textarea
            value={draft.body}
            readOnly
            rows={10}
            aria-label="Prepared privacy request"
          />
          <a href={draft.href} className={styles.primary}>
            Open email draft<span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
      <noscript>
        <style>{`.${styles.form}{display:none}`}</style>
        <p>
          Email <a href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</a> with
          your request, email address and state.
        </p>
      </noscript>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { Phone } from "@phosphor-icons/react/dist/ssr/Phone";
import { Hash } from "@phosphor-icons/react/dist/ssr/Hash";
import { ChatText } from "@phosphor-icons/react/dist/ssr/ChatText";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import {
  type QuoteRequestPayload,
  validateQuoteForm,
  submitQuoteRequest,
} from "@/lib/api/quote";
import { ProductInterestCards } from "./ProductInterestCards";
import styles from "./QuoteForm.module.css";

interface QuoteFormProps {
  initialProduct?: string | null;
}

const FLEET_SIZE_OPTIONS = [
  "1 - 5 trucks",
  "6 - 15 trucks",
  "16 - 50 trucks",
  "51 - 100 trucks",
  "100+ trucks",
];

/**
 * Maps query param aliases to canonical product identifiers.
 */
function resolveInitialProduct(param?: string | null): string[] {
  if (!param) return [];
  const normalized = param.toLowerCase().trim();
  if (normalized === "tms" || normalized === "fuelseek") return ["tms"];
  if (normalized === "sentinel") return ["sentinel"];
  if (
    normalized === "driverapp" ||
    normalized === "driversapp" ||
    normalized === "driver-app"
  ) {
    return ["driver-app"];
  }
  if (normalized === "lens") return ["lens"];
  if (normalized === "crm") return ["crm"];
  if (normalized === "extension" || normalized === "load-board-extension") {
    return ["extension"];
  }
  return [];
}

// Preserve inquiry context for services outside the six product selections.
function resolveInitialNotes(param?: string | null): string {
  switch (param?.toLowerCase().trim()) {
    case "claims-os":
      return "I’m interested in Claims OS.";
    case "financing":
      return "I’m interested in equipment financing.";
    default:
      return "";
  }
}

export function QuoteForm({ initialProduct }: QuoteFormProps) {
  const successRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState<QuoteRequestPayload>({
    fullName: "",
    email: "",
    phone: "",
    mcNumber: "",
    notes: resolveInitialNotes(initialProduct),
    fleetSize: "",
    productInterests: resolveInitialProduct(initialProduct),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error once user starts correcting it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleBlur(
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name } = e.target;
    const validation = validateQuoteForm(formData);
    if (validation.errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validation.errors[name] }));
    }
  }

  function handleProductSelection(newSelection: string[]) {
    setFormData((prev) => ({ ...prev, productInterests: newSelection }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstInvalidField = Object.keys(validation.errors)[0];
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
        ?.focus();
      return;
    }

    setIsSubmitting(true);
    setServerMessage("");

    try {
      const response = await submitQuoteRequest(formData);
      setIsSubmitted(true);
      setServerMessage(response.message);
      if (response.referenceId) {
        setReferenceId(response.referenceId);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit quote request";
      setServerMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      mcNumber: "",
      notes: "",
      fleetSize: "",
      productInterests: [],
    });
    setErrors({});
    setIsSubmitted(false);
    setServerMessage("");
    setReferenceId("");
  }

  if (isSubmitted) {
    return (
      <div className={styles.formCard} data-testid="quote-success-banner">
        <div className={styles.successContainer}>
          <div className={styles.successIconWrap}>
            <CheckCircle size={56} weight="duotone" aria-hidden="true" />
          </div>
          <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            Request Submitted
          </h2>
          <p className={styles.successDesc}>
            {serverMessage ||
              "Thank you for contacting Spotter. An operations specialist will review your details and reach out within 1 business day."}
          </p>
          {referenceId && (
            <div className={styles.referenceBadge}>
              Reference ID: <strong>{referenceId}</strong>
            </div>
          )}
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        aria-busy={isSubmitting}
      >
        <div className={styles.formHeading}>
          <h2>Your details</h2>
          <p>Name, email and phone are required.</p>
        </div>
        {/* Row 1: Full name & Email address */}
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="fullName" className={styles.fieldLabel}>
              Full name
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.fullName ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <User size={18} weight="regular" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                className={styles.input}
                data-testid="input-fullname"
                required
              />
            </div>
            {errors.fullName && (
              <span
                id="fullName-error"
                className={styles.errorMessage}
                data-testid="error-fullname"
              >
                {errors.fullName}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email address
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <EnvelopeSimple size={18} weight="regular" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={styles.input}
                data-testid="input-email"
                required
              />
            </div>
            {errors.email && (
              <span id="email-error" className={styles.errorMessage}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Phone number & MC number (optional) */}
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label htmlFor="phone" className={styles.fieldLabel}>
              Phone number
            </label>
            <div
              className={`${styles.inputWrapper} ${
                errors.phone ? styles.inputError : ""
              }`}
            >
              <div className={styles.inputIcon} aria-hidden="true">
                <Phone size={18} weight="regular" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={styles.input}
                data-testid="input-phone"
                required
              />
            </div>
            {errors.phone && (
              <span id="phone-error" className={styles.errorMessage}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="mcNumber" className={styles.fieldLabel}>
              MC number <span>Optional</span>
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon} aria-hidden="true">
                <Hash size={18} weight="regular" />
              </div>
              <input
                id="mcNumber"
                name="mcNumber"
                type="text"
                placeholder="MC number (optional)"
                value={formData.mcNumber}
                onChange={handleChange}
                className={styles.input}
                data-testid="input-mcNumber"
              />
            </div>
          </div>
        </div>

        <div className={styles.fleetRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="notes" className={styles.fieldLabel}>
              Needs or questions <span>Optional</span>
            </label>
            <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
              <div className={styles.textareaIcon} aria-hidden="true">
                <ChatText size={18} weight="regular" />
              </div>
              <textarea
                id="notes"
                name="notes"
                placeholder="Tell us about your specific needs or questions..."
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className={styles.textarea}
                data-testid="input-notes"
              />
            </div>
          </div>

          {/* Row 4: Fleet Size Dropdown */}
          <div className={styles.fleetGroup}>
            <label htmlFor="fleetSize" className={styles.fieldLabel}>
              How many trucks do you run?
            </label>
            <div className={styles.selectWrapper}>
              <div className={styles.inputIcon} aria-hidden="true">
                <Truck size={18} weight="regular" />
              </div>
              <select
                id="fleetSize"
                name="fleetSize"
                value={formData.fleetSize}
                onChange={handleChange}
                className={styles.select}
                data-testid="select-fleet-size"
              >
                <option value="">Select number of trucks</option>
                {FLEET_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className={styles.selectCaret} aria-hidden="true">
                <CaretDown size={14} weight="bold" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Product Interest Multi-Select Cards */}
        <div className={styles.productSection}>
          <div className={styles.productHeading}>
            <h3 id="product-interest-label">Product interest</h3>
            <p>Select any that interest you.</p>
          </div>
          <ProductInterestCards
            selectedProducts={formData.productInterests}
            onChange={handleProductSelection}
          />
        </div>

        {/* Server error if any */}
        {serverMessage && !isSubmitted && (
          <div className={styles.serverAlert} role="alert">
            {serverMessage}
          </div>
        )}

        {/* Row 6: Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
          data-testid="submit-quote-btn"
        >
          {isSubmitting ? (
            <span className={styles.submittingState}>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Submitting...</span>
            </span>
          ) : (
            <span className={styles.submitContent}>
              <span>Request Quote</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

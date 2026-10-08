"use client";
import { useState, useId, useMemo } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import { calculateAffordability, formatCurrency } from "@/lib/loan-math";
import styles from "./Calculators.module.css";

export function AffordabilityCalculator() {
  const content = loanCalculatorsContent.affordability;
  const paymentInputId = useId();
  const rateInputId = useId();
  const termInputId = useId();
  const downInputId = useId();

  // State
  const [desiredPayment, setDesiredPayment] = useState<number>(content.defaults.desiredPayment);
  const [interestRate, setInterestRate] = useState<number>(content.defaults.interestRate);
  const [termMonths, setTermMonths] = useState<number>(content.defaults.termMonths);
  const [downPayment, setDownPayment] = useState<number>(content.defaults.downPayment);

  // Real-time calculation
  const result = useMemo(() => {
    return calculateAffordability({
      desiredPayment,
      interestRate,
      termMonths,
      downPayment,
    });
  }, [desiredPayment, interestRate, termMonths, downPayment]);

  return (
    <div
      role="tabpanel"
      id="panel-affordability"
      aria-labelledby="tab-affordability"
    >
      <div className={styles.calcGrid}>
        {/* Left Form Panel */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </div>

          <div className={styles.formFields}>
            {/* Desired Monthly Payment */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={paymentInputId}>{content.labels.desiredPayment}</label>
                <span>{formatCurrency(desiredPayment)}/mo</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={paymentInputId}
                  type="number"
                  min="200"
                  max="25000"
                  step="100"
                  value={desiredPayment}
                  onChange={(e) => setDesiredPayment(Math.max(1, Number(e.target.value) || 1))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={Math.min(10000, Math.max(500, desiredPayment))}
                onChange={(e) => setDesiredPayment(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Desired payment slider"
              />
            </div>

            {/* Interest Rate */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={rateInputId}>{content.labels.interestRate}</label>
                <span>{interestRate.toFixed(2)}%</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={rateInputId}
                  type="number"
                  min="0.1"
                  max="35"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="0.1"
                value={Math.min(25, Math.max(3, interestRate))}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Interest rate slider"
              />
            </div>

            {/* Loan Term */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={termInputId}>{content.labels.termMonths}</label>
                <span>{termMonths} mo ({(termMonths / 12).toFixed(1)} yr)</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={termInputId}
                  type="number"
                  min="12"
                  max="120"
                  step="1"
                  value={termMonths}
                  onChange={(e) => setTermMonths(Math.max(1, Number(e.target.value) || 1))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="12"
                max="84"
                step="12"
                value={Math.min(84, Math.max(12, termMonths))}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Loan term slider"
              />
            </div>

            {/* Down Payment */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={downInputId}>{content.labels.downPayment}</label>
                <span>{formatCurrency(downPayment)}</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={downInputId}
                  type="number"
                  min="0"
                  max="100000"
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="1000"
                value={Math.min(60000, downPayment)}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Down payment slider"
              />
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className={styles.resultsCard}>
          <div className={styles.cardHeader}>
            <h3>{content.subtitle}</h3>
            <p>Borrowing capacity calculated from target cash flow constraints.</p>
          </div>

          <div className={styles.resultsSummary}>
            {/* Primary Maximum Loan Amount Metric */}
            <div className={styles.primaryMetricCard}>
              <div className={styles.primaryMetricLabel}>
                {content.results.maxLoanAmount}
              </div>
              <div className={styles.primaryMetricValue}>
                {formatCurrency(result.maxLoanAmount)}
              </div>
            </div>

            {/* Secondary Total Purchase Price Metric */}
            <div className={styles.metricsGrid}>
              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  {content.results.totalPurchasePrice}
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(result.totalPurchasePrice)}
                </div>
              </div>

              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  Down Payment Equity
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(downPayment)}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className={styles.resultsCta}>
              <ActionLink
                href={loanCalculatorsContent.action.href}
                className={styles.quoteBtn}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {loanCalculatorsContent.action.label}
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

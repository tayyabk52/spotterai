"use client";
import { useState, useId, useMemo } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import { calculateImpliedRate, formatCurrency, formatPercent } from "@/lib/loan-math";
import styles from "./Calculators.module.css";

export function InterestRateCalculator() {
  const content = loanCalculatorsContent.interestRate;
  const loanInputId = useId();
  const paymentInputId = useId();
  const termInputId = useId();
  const balloonInputId = useId();

  // State
  const [loanAmount, setLoanAmount] = useState<number>(content.defaults.loanAmount);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(content.defaults.monthlyPayment);
  const [termMonths, setTermMonths] = useState<number>(content.defaults.termMonths);
  const [balloonPayment, setBalloonPayment] = useState<number>(content.defaults.balloonPayment);

  // Real-time calculation
  const impliedRate = useMemo(() => {
    return calculateImpliedRate({
      loanAmount,
      monthlyPayment,
      termMonths,
      balloonPayment,
    });
  }, [loanAmount, monthlyPayment, termMonths, balloonPayment]);

  const minMonthlyPayment = termMonths > 0 ? (loanAmount - balloonPayment) / termMonths : 0;

  return (
    <div
      role="tabpanel"
      id="panel-interest-rate"
      aria-labelledby="tab-interest-rate"
    >
      <div className={styles.calcGrid}>
        {/* Left Form Panel */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </div>

          <div className={styles.formFields}>
            {/* Loan Amount */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={loanInputId}>{content.labels.loanAmount}</label>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={loanInputId}
                  type="number"
                  min="5000"
                  max="600000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(1, Number(e.target.value) || 1))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="10000"
                max="400000"
                step="5000"
                value={Math.min(400000, Math.max(10000, loanAmount))}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Loan amount slider"
              />
            </div>

            {/* Monthly Payment */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={paymentInputId}>{content.labels.monthlyPayment}</label>
                <span>{formatCurrency(monthlyPayment)}/mo</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={paymentInputId}
                  type="number"
                  min="100"
                  max="30000"
                  step="50"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Math.max(1, Number(e.target.value) || 1))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="50"
                value={Math.min(10000, Math.max(500, monthlyPayment))}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Monthly payment slider"
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

            {/* Balloon Payment */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={balloonInputId}>{content.labels.balloonPayment}</label>
                <span>{formatCurrency(balloonPayment)}</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={balloonInputId}
                  type="number"
                  min="0"
                  max={loanAmount}
                  step="1000"
                  value={balloonPayment}
                  onChange={(e) => setBalloonPayment(Math.max(0, Number(e.target.value) || 0))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(10000, loanAmount / 2)}
                step="1000"
                value={Math.min(loanAmount / 2, balloonPayment)}
                onChange={(e) => setBalloonPayment(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Balloon payment slider"
              />
            </div>
          </div>
        </div>

        {/* Right Results Panel */}
        <div className={styles.resultsCard}>
          <div className={styles.cardHeader}>
            <h3>{content.subtitle}</h3>
            <p>Annual percentage rate (APR) implied by quoted repayment structure.</p>
          </div>

          <div className={styles.resultsSummary}>
            {/* Primary Implied Rate Metric */}
            <div className={styles.primaryMetricCard}>
              <div className={styles.primaryMetricLabel}>
                {content.results.annualRate}
              </div>
              <div className={styles.primaryMetricValue}>
                {impliedRate !== null ? (
                  formatPercent(impliedRate)
                ) : (
                  <span style={{ fontSize: "1.25rem", color: "var(--calc-pale)" }}>
                    Payment too low for positive interest
                  </span>
                )}
              </div>
            </div>

            {/* Secondary Context Metric */}
            <div className={styles.metricsGrid}>
              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  Total Financing Cost
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(monthlyPayment * termMonths + balloonPayment)}
                </div>
              </div>

              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  Base Principal per Month
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(minMonthlyPayment)}
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

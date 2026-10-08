"use client";
import { useState, useId, useMemo } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import ActionLink from "@/components/ActionLink";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import { calculateAmortization, formatCurrency } from "@/lib/loan-math";
import { AmortizationScheduleTable } from "./AmortizationScheduleTable";
import styles from "./Calculators.module.css";

export function AmortizationCalculator() {
  const content = loanCalculatorsContent.amortization;
  const priceInputId = useId();
  const downInputId = useId();
  const rateInputId = useId();
  const termInputId = useId();
  const balloonInputId = useId();
  const extraMonthlyInputId = useId();
  const oneTimeAmountInputId = useId();
  const oneTimeMonthInputId = useId();

  // State
  const [purchasePrice, setPurchasePrice] = useState<number>(content.defaults.purchasePrice);
  const [downPayment, setDownPayment] = useState<number>(content.defaults.downPayment);
  const [interestRate, setInterestRate] = useState<number>(content.defaults.interestRate);
  const [termMonths, setTermMonths] = useState<number>(content.defaults.termMonths);
  const [balloonPayment, setBalloonPayment] = useState<number>(content.defaults.balloonPayment);
  const [extraMonthly, setExtraMonthly] = useState<number>(content.defaults.extraMonthly);
  const [oneTimeAmount, setOneTimeAmount] = useState<number>(content.defaults.oneTimeAmount);
  const [oneTimeMonth, setOneTimeMonth] = useState<number>(content.defaults.oneTimeMonth);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  // Real-time calculation
  const result = useMemo(() => {
    return calculateAmortization({
      purchasePrice,
      downPayment,
      interestRate,
      termMonths,
      balloonPayment,
      extraMonthly,
      oneTimeAmount,
      oneTimeMonth,
    });
  }, [
    purchasePrice,
    downPayment,
    interestRate,
    termMonths,
    balloonPayment,
    extraMonthly,
    oneTimeAmount,
    oneTimeMonth,
  ]);

  return (
    <div
      role="tabpanel"
      id="panel-amortization"
      aria-labelledby="tab-amortization"
    >
      <div className={styles.calcGrid}>
        {/* Left Form Panel */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3>{content.title}</h3>
            <p>Input vehicle capital cost, down payment, and lender financing terms.</p>
          </div>

          <div className={styles.formFields}>
            {/* Purchase Price */}
            <div className={styles.fieldGroup}>
              <div className={styles.fieldLabelRow}>
                <label htmlFor={priceInputId}>{content.labels.purchasePrice}</label>
                <span>{formatCurrency(purchasePrice)}</span>
              </div>
              <div className={styles.fieldInputWrapper}>
                <input
                  id={priceInputId}
                  type="number"
                  min="5000"
                  max="600000"
                  step="1000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="10000"
                max="400000"
                step="5000"
                value={Math.min(400000, Math.max(10000, purchasePrice))}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Purchase price slider"
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
                  max={purchasePrice}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
                  className={styles.fieldInput}
                />
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(10000, Math.min(100000, purchasePrice))}
                step="1000"
                value={Math.min(purchasePrice, downPayment)}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className={styles.fieldSlider}
                aria-label="Down payment slider"
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

            {/* More Options Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowMoreOptions((prev) => !prev)}
                className={styles.optionsToggle}
                aria-expanded={showMoreOptions}
              >
                <span>{content.labels.moreOptions}</span>
                {showMoreOptions ? (
                  <CaretUpIcon aria-hidden="true" />
                ) : (
                  <CaretDownIcon aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Collapsible Options */}
            {showMoreOptions && (
              <div className={styles.moreOptionsArea}>
                <div className={styles.fieldGroup}>
                  <label htmlFor={balloonInputId}>{content.labels.balloonPayment}</label>
                  <input
                    id={balloonInputId}
                    type="number"
                    min="0"
                    max={purchasePrice}
                    step="1000"
                    value={balloonPayment}
                    onChange={(e) => setBalloonPayment(Number(e.target.value) || 0)}
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor={extraMonthlyInputId}>{content.labels.extraMonthly}</label>
                  <input
                    id={extraMonthlyInputId}
                    type="number"
                    min="0"
                    max="10000"
                    step="50"
                    value={extraMonthly}
                    onChange={(e) => setExtraMonthly(Number(e.target.value) || 0)}
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor={oneTimeAmountInputId}>{content.labels.oneTimeAmount}</label>
                  <input
                    id={oneTimeAmountInputId}
                    type="number"
                    min="0"
                    max="100000"
                    step="500"
                    value={oneTimeAmount}
                    onChange={(e) => setOneTimeAmount(Number(e.target.value) || 0)}
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor={oneTimeMonthInputId}>{content.labels.oneTimeMonth}</label>
                  <input
                    id={oneTimeMonthInputId}
                    type="number"
                    min="1"
                    max={termMonths}
                    step="1"
                    value={oneTimeMonth}
                    onChange={(e) => setOneTimeMonth(Number(e.target.value) || 1)}
                    className={styles.fieldInput}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Results Panel */}
        <div className={styles.resultsCard}>
          <div className={styles.cardHeader}>
            <h3>Monthly Payment Breakdown</h3>
            <p>Computed financial liability and repayment schedule.</p>
          </div>

          <div className={styles.resultsSummary}>
            {/* Primary Monthly Payment Metric */}
            <div className={styles.primaryMetricCard}>
              <div className={styles.primaryMetricLabel}>
                {content.summaryLabels.monthlyPayment}
              </div>
              <div className={styles.primaryMetricValue}>
                {formatCurrency(result.monthlyPayment)}
              </div>
            </div>

            {/* Secondary Metrics Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  {content.summaryLabels.totalPayments}
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(result.totalPayments)}
                </div>
              </div>

              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  {content.summaryLabels.totalInterest}
                </div>
                <div className={styles.secondaryMetricValue}>
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>

              <div className={styles.secondaryMetricCard}>
                <div className={styles.secondaryMetricLabel}>
                  {content.summaryLabels.newPayoffDate}
                </div>
                <div className={styles.secondaryMetricValue}>
                  {result.newPayoffMonths} Months
                </div>
              </div>

              {result.interestSaved > 0 && (
                <div className={styles.secondaryMetricCard}>
                  <div className={styles.secondaryMetricLabel}>
                    {content.summaryLabels.interestSaved}
                  </div>
                  <div className={styles.secondaryMetricValue} style={{ color: "var(--calc-pale)" }}>
                    {formatCurrency(result.interestSaved)}
                  </div>
                </div>
              )}
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

      {/* Amortization Schedule Table */}
      <AmortizationScheduleTable
        schedule={result.schedule}
        columns={content.scheduleColumns}
        title={content.scheduleTitle}
      />
    </div>
  );
}

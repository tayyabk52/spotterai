"use client";
import { useState } from "react";
import { CalculatorTabs, type CalculatorTabId } from "./CalculatorTabs";
import { AmortizationCalculator } from "./AmortizationCalculator";
import { AffordabilityCalculator } from "./AffordabilityCalculator";
import { InterestRateCalculator } from "./InterestRateCalculator";
import styles from "./Calculators.module.css";

export function CalculatorSuiteChapter() {
  const [activeTab, setActiveTab] = useState<CalculatorTabId>("amortization");

  return (
    <section
      id="calculator-suite"
      aria-labelledby="calculator-suite-heading"
      className={`${styles.chapterWrapper} ${styles.dark}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.chapterLabel}>FINANCING ENGINE</p>
          <h2 id="calculator-suite-heading">Truck Financing Calculation Suite</h2>
          <p className={styles.lead}>
            Toggle between amortization schedules, maximum borrowing capacity, and implied interest rate analysis tailored for commercial trucking.
          </p>
        </div>

        {/* Tab navigation */}
        <CalculatorTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Dynamic Calculator Panels */}
        {activeTab === "amortization" && <AmortizationCalculator />}
        {activeTab === "affordability" && <AffordabilityCalculator />}
        {activeTab === "interest-rate" && <InterestRateCalculator />}
      </div>
    </section>
  );
}

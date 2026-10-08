"use client";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import styles from "./Calculators.module.css";

export type CalculatorTabId = "amortization" | "affordability" | "interest-rate";

interface CalculatorTabsProps {
  activeTab: CalculatorTabId;
  onTabChange: (tab: CalculatorTabId) => void;
}

export function CalculatorTabs({ activeTab, onTabChange }: CalculatorTabsProps) {
  const tabs = loanCalculatorsContent.tabs;

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let targetIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      targetIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== null) {
      e.preventDefault();
      const nextTab = tabs[targetIndex];
      onTabChange(nextTab.id as CalculatorTabId);
      const targetBtn = document.getElementById(`tab-${nextTab.id}`);
      targetBtn?.focus();
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Loan Calculator Modes"
      className={styles.tabsNav}
    >
      {tabs.map((tab, index) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isSelected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onTabChange(tab.id as CalculatorTabId)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={styles.tabButton}
          >
            <span>{tab.label}</span>
            <span className={styles.tabDescription}>{tab.description}</span>
          </button>
        );
      })}
    </div>
  );
}

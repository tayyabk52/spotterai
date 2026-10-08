"use client";
import { useState, useMemo } from "react";
import type { AmortizationRow } from "@/lib/loan-math";
import { formatCurrency } from "@/lib/loan-math";
import styles from "./Calculators.module.css";

interface AmortizationScheduleTableProps {
  schedule: AmortizationRow[];
  columns: readonly string[];
  title: string;
}

const PAGE_SIZE = 12;

export function AmortizationScheduleTable({
  schedule,
  columns,
  title,
}: AmortizationScheduleTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Exclude month 0 (initial balance) from the payment schedule list
  const activeSchedule = useMemo(() => {
    return schedule.filter((row) => row.month > 0);
  }, [schedule]);

  const totalPages = Math.max(1, Math.ceil(activeSchedule.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const displayedRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return activeSchedule.slice(start, start + PAGE_SIZE);
  }, [activeSchedule, safePage]);

  return (
    <div className={styles.scheduleSection}>
      <div className={styles.scheduleHeader}>
        <h3>{title}</h3>
        <span>
          Showing Page {safePage} of {totalPages} ({activeSchedule.length} total monthly cycles)
        </span>
      </div>

      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label="Amortization payment schedule"
      >
        <table className={styles.scheduleTable}>
          <caption className="sr-only">Amortization schedule month-by-month payments</caption>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row.month}>
                <td>Month {row.month}</td>
                <td>{formatCurrency(row.payment)}</td>
                <td>{formatCurrency(row.interest)}</td>
                <td>{formatCurrency(row.principal)}</td>
                <td>{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.tablePagination}>
          <span>
            Months {(safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, activeSchedule.length)} of {activeSchedule.length}
          </span>
          <div className={styles.paginationButtons}>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className={styles.paginationBtn}
              aria-label="Previous schedule page"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className={styles.paginationBtn}
              aria-label="Next schedule page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

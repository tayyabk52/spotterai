export interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface AmortizationResult {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  newPayoffMonths: number;
  interestSaved: number;
  schedule: AmortizationRow[];
}

export interface AffordabilityResult {
  maxLoanAmount: number;
  totalPurchasePrice: number;
}

export function formatCurrency(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "0.00%";
  return `${value.toFixed(2)}%`;
}

/**
 * Calculates standard loan amortization with optional balloon and prepayment options.
 */
export function calculateAmortization({
  purchasePrice,
  downPayment,
  interestRate,
  termMonths,
  balloonPayment = 0,
  extraMonthly = 0,
  oneTimeAmount = 0,
  oneTimeMonth = 1,
}: {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  termMonths: number;
  balloonPayment?: number;
  extraMonthly?: number;
  oneTimeAmount?: number;
  oneTimeMonth?: number;
}): AmortizationResult {
  const principal = Math.max(0, purchasePrice - downPayment);
  if (principal === 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalPayments: 0,
      totalInterest: 0,
      newPayoffMonths: 0,
      interestSaved: 0,
      schedule: [],
    };
  }

  const monthlyRate = interestRate / 100 / 12;

  // Base monthly payment calculation (incorporating balloon payment if present)
  let baseMonthlyPayment = 0;
  if (monthlyRate === 0) {
    baseMonthlyPayment = (principal - balloonPayment) / termMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, termMonths);
    baseMonthlyPayment =
      ((principal * factor - balloonPayment) * monthlyRate) / (factor - 1);
  }

  // Base schedule without extra payments to determine original interest
  let originalTotalInterest = 0;
  let tempBal = principal;
  for (let m = 1; m <= termMonths; m++) {
    const interest = tempBal * monthlyRate;
    originalTotalInterest += interest;
    const princPaid = baseMonthlyPayment - interest;
    tempBal -= princPaid;
  }

  // Actual schedule with prepayments
  const schedule: AmortizationRow[] = [
    {
      month: 0,
      payment: 0,
      interest: 0,
      principal: 0,
      balance: principal,
    },
  ];

  let currentBalance = principal;
  let actualTotalPayments = 0;
  let actualTotalInterest = 0;
  let payoffMonth = termMonths;

  for (let m = 1; m <= termMonths && currentBalance > 0.01; m++) {
    const interest = currentBalance * monthlyRate;
    const payment = baseMonthlyPayment;
    let extra = extraMonthly;

    if (m === oneTimeMonth && oneTimeAmount > 0) {
      extra += oneTimeAmount;
    }

    let totalPaidThisMonth = payment + extra;

    // Check if loan is paid off this month or last month with balloon
    if (m === termMonths && balloonPayment > 0) {
      totalPaidThisMonth += balloonPayment;
    }

    if (totalPaidThisMonth > currentBalance + interest) {
      totalPaidThisMonth = currentBalance + interest;
    }

    const principalPaid = Math.max(0, totalPaidThisMonth - interest);
    currentBalance = Math.max(0, currentBalance - principalPaid);

    actualTotalPayments += totalPaidThisMonth;
    actualTotalInterest += interest;

    schedule.push({
      month: m,
      payment: totalPaidThisMonth,
      interest,
      principal: principalPaid,
      balance: currentBalance,
    });

    if (currentBalance <= 0.01) {
      payoffMonth = m;
      break;
    }
  }

  const interestSaved = Math.max(0, originalTotalInterest - actualTotalInterest);

  return {
    monthlyPayment: Math.max(0, baseMonthlyPayment),
    totalPayments: actualTotalPayments,
    totalInterest: actualTotalInterest,
    newPayoffMonths: payoffMonth,
    interestSaved,
    schedule,
  };
}

/**
 * Calculates maximum loan amount based on target monthly payment.
 */
export function calculateAffordability({
  desiredPayment,
  interestRate,
  termMonths,
  downPayment,
}: {
  desiredPayment: number;
  interestRate: number;
  termMonths: number;
  downPayment: number;
}): AffordabilityResult {
  if (desiredPayment <= 0 || termMonths <= 0) {
    return { maxLoanAmount: 0, totalPurchasePrice: downPayment };
  }

  const monthlyRate = interestRate / 100 / 12;
  let maxLoan = 0;

  if (monthlyRate === 0) {
    maxLoan = desiredPayment * termMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, termMonths);
    maxLoan = (desiredPayment * (factor - 1)) / (monthlyRate * factor);
  }

  return {
    maxLoanAmount: Math.max(0, maxLoan),
    totalPurchasePrice: Math.max(0, maxLoan + downPayment),
  };
}

/**
 * Solves for implied annual interest rate using Newton-Raphson iteration.
 */
export function calculateImpliedRate({
  loanAmount,
  monthlyPayment,
  termMonths,
  balloonPayment = 0,
}: {
  loanAmount: number;
  monthlyPayment: number;
  termMonths: number;
  balloonPayment?: number;
}): number {
  if (loanAmount <= 0 || monthlyPayment <= 0 || termMonths <= 0) {
    return 0;
  }

  const totalPaid = monthlyPayment * termMonths + balloonPayment;
  if (totalPaid <= loanAmount) {
    return 0;
  }

  // Initial estimate: r = (totalInterest / termMonths) / loanAmount
  let r = 0.01;
  const tolerance = 1e-7;
  const maxIterations = 50;

  for (let i = 0; i < maxIterations; i++) {
    const pow = Math.pow(1 + r, termMonths);
    const powMinus1 = Math.pow(1 + r, termMonths - 1);

    // f(r) = PMT * (1 - (1+r)^-n) / r + B * (1+r)^-n - P = 0
    // Equivalently: P * r * (1+r)^n - PMT * ((1+r)^n - 1) - B * r = 0
    const f =
      loanAmount * r * pow -
      monthlyPayment * (pow - 1) -
      balloonPayment * r;

    // Derivative f'(r)
    const df =
      loanAmount * (pow + r * termMonths * powMinus1) -
      monthlyPayment * termMonths * powMinus1 -
      balloonPayment;

    if (Math.abs(df) < 1e-12) break;

    const nextR = r - f / df;
    if (Math.abs(nextR - r) < tolerance) {
      r = nextR;
      break;
    }
    r = nextR > 0 ? nextR : r / 2;
  }

  const annualRate = r * 12 * 100;
  return isFinite(annualRate) && annualRate >= 0 ? annualRate : 0;
}

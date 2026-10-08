export interface BenchmarkItem {
  category: string;
  priceRange: string;
  typicalDown: string;
  termRange: string;
  estMonthly: string;
  notes: string;
}

export const loanCalculatorsContent = {
  metadata: {
    title: "Truck Loan Calculators | Spotter.ai",
    description:
      "Calculate commercial truck financing payments, amortization schedules, equipment affordability, and implied interest rates for freight operations.",
    url: "https://spotter.ai/loan-calculators",
    siteName: "Spotter.ai",
  },
  action: {
    label: "Request Financing Quote",
    href: "/request-quote?product=financing",
  },
  hero: {
    eyebrow: "COMMERCIAL FLEET FINANCING",
    title: "Commercial Truck Loan Calculators",
    description:
      "Calculate monthly debt service, generate full amortization schedules, and evaluate fleet equipment affordability with precision freight financing tools.",
    secondary: "Launch Calculators",
    secondaryHref: "#calculator-suite",
    scrollHint: "Scroll to explore loan tools",
  },
  tabs: [
    {
      id: "amortization",
      label: "Amortization Calculator",
      description: "Payment schedules & loan breakdown",
    },
    {
      id: "affordability",
      label: "Affordability Calculator",
      description: "Maximum loan based on budget",
    },
    {
      id: "interest-rate",
      label: "Interest Rate Calculator",
      description: "Find the implied interest rate",
    },
  ] as const,
  amortization: {
    title: "Loan Parameters",
    labels: {
      purchasePrice: "Purchase Price ($)",
      downPayment: "Down Payment ($)",
      interestRate: "Interest Rate (%)",
      termMonths: "Loan Term (months)",
      moreOptions: "More Options",
      balloonPayment: "Balloon Payment ($)",
      extraMonthly: "Extra Monthly Payment ($)",
      oneTimeAmount: "One-Time Payment Amount ($)",
      oneTimeMonth: "One-Time Payment Month",
    },
    defaults: {
      purchasePrice: 175000,
      downPayment: 0,
      interestRate: 11.9,
      termMonths: 60,
      balloonPayment: 0,
      extraMonthly: 0,
      oneTimeAmount: 0,
      oneTimeMonth: 12,
    },
    summaryLabels: {
      monthlyPayment: "Monthly Payment",
      totalPayments: "Total Payments",
      totalInterest: "Total Interest",
      newPayoffDate: "Estimated Payoff",
      interestSaved: "Interest Saved",
    },
    scheduleTitle: "Payment Schedule",
    scheduleColumns: [
      "Month",
      "Payment",
      "Interest",
      "Principal",
      "Balance",
    ] as const,
  },
  affordability: {
    title: "Loan Parameters",
    subtitle: "Affordability Analysis",
    description: "Based on your desired monthly payment",
    labels: {
      desiredPayment: "Desired Payment ($/mo)",
      interestRate: "Interest Rate (%)",
      termMonths: "Loan Term (months)",
      downPayment: "Down Payment ($)",
    },
    defaults: {
      desiredPayment: 2500,
      interestRate: 11.9,
      termMonths: 60,
      downPayment: 0,
    },
    results: {
      maxLoanAmount: "Maximum Loan Amount",
      totalPurchasePrice: "Total Purchase Price",
    },
  },
  interestRate: {
    title: "Loan Parameters",
    subtitle: "Interest Rate Analysis",
    description: "Calculated based on your loan parameters",
    labels: {
      loanAmount: "Loan Amount ($)",
      monthlyPayment: "Monthly Payment ($)",
      termMonths: "Loan Term (months)",
      balloonPayment: "Balloon Payment ($)",
    },
    defaults: {
      loanAmount: 150000,
      monthlyPayment: 2500,
      termMonths: 60,
      balloonPayment: 0,
    },
    results: {
      annualRate: "Annual Interest Rate (APR)",
    },
  },
  benchmarks: {
    id: "equipment-benchmarks",
    eyebrow: "MARKET INTELLIGENCE",
    title: "Commercial Freight Equipment Financing Benchmarks",
    description:
      "Market-rate reference points across new and late-model commercial transportation assets to help evaluate lender proposals.",
    items: [
      {
        category: "Class 8 Sleeper Cab",
        priceRange: "$165,000 – $215,000",
        typicalDown: "10% – 20%",
        termRange: "48 – 72 months",
        estMonthly: "$3,600 – $4,600",
        notes: "Long-haul linehaul standard with high residual value.",
      },
      {
        category: "Class 8 Day Cab",
        priceRange: "$130,000 – $165,000",
        typicalDown: "10% – 15%",
        termRange: "36 – 60 months",
        estMonthly: "$2,800 – $3,600",
        notes:
          "Regional and port drayage routes with lower initial capital cost.",
      },
      {
        category: "53' Dry Van Trailer",
        priceRange: "$40,000 – $55,000",
        typicalDown: "0% – 10%",
        termRange: "60 – 84 months",
        estMonthly: "$700 – $1,100",
        notes: "Extended useful asset life with predictable depreciation.",
      },
      {
        category: "53' Refrigerated Reefer",
        priceRange: "$75,000 – $105,000",
        typicalDown: "10% – 20%",
        termRange: "48 – 72 months",
        estMonthly: "$1,600 – $2,300",
        notes: "High-yield temperature-controlled freight with telematics.",
      },
    ] as BenchmarkItem[],
  },
  economics: {
    id: "fleet-economics",
    eyebrow: "OPERATING REALITY",
    title: "How Debt Service Translates to Cost-Per-Mile",
    description:
      "A truck payment isn't just a balance sheet line item — it directly dictates your minimum viable rate per mile on active freight lanes.",
    pillars: [
      {
        title: "Fixed Cost per Mile Allocation",
        description:
          "At 10,000 miles per month, a $3,800 monthly payment represents $0.38 per mile in fixed financing overhead before fuel, insurance, and maintenance.",
      },
      {
        title: "Real-Time Breakeven on Spotter TMS",
        description:
          "Spotter TMS automatically factors equipment debt service into every load recommendation so dispatchers never accept a load below profitable margins.",
      },
      {
        title: "Salvage & Capital Recovery",
        description:
          "Track equipment depreciation curves directly within Spotter ClaimsOS and Accounting to protect equity when cycling trade-ins.",
      },
    ],
  },
  contact: {
    id: "calculator-contact",
    eyebrow: "GET STARTED",
    title: "Equip your fleet with confident capital planning.",
    description:
      "Explore how Spotter unites dispatch, operating analytics, and financial visibility into a unified transportation platform.",
    action: {
      label: "Request Fleet Demo",
      href: "/request-quote",
    },
  },
  chapters: [
    { id: "calculator-intro", number: "01", label: "Overview" },
    { id: "calculator-suite", number: "02", label: "Calculators" },
    { id: "equipment-benchmarks", number: "03", label: "Benchmarks" },
    { id: "fleet-economics", number: "04", label: "Cost Per Mile" },
    { id: "calculator-contact", number: "05", label: "Get Started" },
  ] as const,
  navLabel: "Loan Calculators Navigation",
};

export type StoryAsset = {
  kind: "image" | "video";
  id: string;
  status: "client asset" | "licensed stock" | "placeholder";
  src: string | null;
  poster: string;
  sourceFile: string;
  sourceUrl: string | null;
  source: "client supplied" | "source page" | "generated";
  license: string | null;
  alt: string;
  width: number;
  height: number;
  duration?: number;
  bytes?: number;
};

export const loanStoryAssets: Record<"hero", StoryAsset> = {
  hero: {
    kind: "video",
    id: "loan-hero-video",
    status: "client asset",
    src: "/brand/claimsOS-videos/scrub/liability-resolution.mp4",
    poster: "/brand/claimsOS-videos/scrub/liability-resolution.webp",
    sourceFile: "liability-resolution.mp4",
    sourceUrl: "/brand/claimsOS-videos/scrub/liability-resolution.mp4",
    source: "client supplied",
    license:
      "Supplied by owner for commercial platform; encoded keyint=1 for smooth scrub",
    alt: "Abstract visualization of freight debt amortization and financial flow balancing",
    width: 1920,
    height: 1080,
    duration: 6,
    bytes: 6192526,
  },
};

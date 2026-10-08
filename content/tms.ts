export type ProductPhotoAsset = {
  id: string;
  status: "client asset" | "licensed stock" | "placeholder";
  src: string | null;
  sourceUrl: string | null;
  license: string | null;
  width: number;
  height: number;
  alt: string;
  placeholder: string;
};
import type { FeatureGroup, StoryAsset } from "./story";
export type { FeatureGroup, StoryAsset } from "./story";
export type ProductSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  copyStatus: "reuse" | "rewrite";
  image: ProductPhotoAsset;
  features: readonly FeatureGroup[];
};

export const tmsImages: Record<string, ProductPhotoAsset> = {
  hero: {
    id: "tms-hero",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "trucking fleet photograph",
    placeholder: "ASSET NEEDED: trucking fleet photograph",
  },
  visibility: {
    id: "tms-visibility",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet operations team photograph",
    placeholder: "ASSET NEEDED: fleet operations team photograph",
  },
  loads: {
    id: "tms-loads",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck loading at a freight terminal photograph",
    placeholder: "ASSET NEEDED: truck loading at a freight terminal photograph",
  },
  maintenance: {
    id: "tms-maintenance",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck maintenance workshop photograph",
    placeholder: "ASSET NEEDED: truck maintenance workshop photograph",
  },
  financials: {
    id: "tms-financials",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet office financial workflow photograph",
    placeholder: "ASSET NEEDED: fleet office financial workflow photograph",
  },
};

export const tms = {
  source: {
    url: "https://spotter.ai/tms",
    observed: "October 8, 2026",
  },
  copyStatus: "reuse",
  metadata: {
    title: "Spotter TMS: Fleet Operations",
    description:
      "Explore Spotter TMS for fleet visibility, dispatch, maintenance and financial workflows. Request a demo or quote for your operation.",
    url: "https://spotter.ai/tms",
    siteName: "Spotter.ai",
  },
  action: {
    label: "Book a Demo",
    href: "/request-quote?product=tms",
    copyStatus: "reuse",
  },
  hero: {
    eyebrow: "Spotter TMS",
    title: "Finally, TMS Built For Dispatchers",
    description: "Automated AI Fuel Savings. Only TMS that pays for itself.",
    secondary: "Essential Fleet Management Tools",
    secondaryHref: "#tms-capabilities",
    image: {
      id: "tms-hero",
      status: "placeholder" as const,
      src: null,
      sourceUrl: null,
      license: null,
      width: 1200,
      height: 900,
      alt: "trucking fleet photograph",
      placeholder: "ASSET NEEDED: trucking fleet photograph",
    },
  },
  coverage: {
    title: "BUILT FOR THE INDUSTRY. FEATURED BY THE BEST.",
    publishers: [
      "Transport Dive",
      "Medium",
      "Fusable",
      "Fleet Owner",
      "Fleet News Daily",
      "Heavy Duty Trucking",
    ],
    sourceLabel: "BUILT FOR THE INDUSTRY. FEATURED BY THE BEST.",
    namesStatus: "reuse",
  },
  results: {
    eyebrow: "Reported outcomes",
    title: "Proven Performance Results",
    description: "Trusted by 500+ fleets across North America",
    supporting: "4.8/5 Rating",
    attribution:
      "Source: Spotter TMS page, observed October 8, 2026. These figures have not been independently verified.",
    metrics: [
      {
        value: "18%",
        label: "Average RPG Improvement",
      },
      {
        value: "12%",
        label: "Fuel Efficiency Gains",
      },
      {
        value: "89%",
        label: "Driver Retention Rate",
      },
      {
        value: "25%",
        label: "Maintenance Savings",
      },
    ],
    figuresStatus: "reuse",
  },
  capabilities: {
    id: "tms-capabilities",
    eyebrow: "Essential Fleet Management Tools",
    title: "Essential Fleet Management Tools",
    description:
      "Everything you need to manage drivers, monitor performance, and optimize your fleet operations in one powerful platform",
    items: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
  },
  contact: {
    eyebrow: "Get Started Today",
    title: "Ready to Transform Your Fleet Operations?",
    description:
      "Join thousands of fleet managers using Spotter TMS to optimize their operations",
  },
};

export const tmsVisibility: ProductSectionContent = {
  id: "tms-visibility",
  eyebrow: "Live Analytics Engine",
  title: "Real-Time Fleet Dashboard & Performance Intelligence",
  description:
    "Monitor your entire fleet operation from a single, intelligent dashboard. Track driver performance, vehicle status, load progress, and financial metrics in real-time with AI-powered insights and predictive analytics.",
  copyStatus: "reuse",
  image: {
    id: "tms-visibility",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet operations team photograph",
    placeholder: "ASSET NEEDED: fleet operations team photograph",
  },
  features: [
    {
      title: "Performance Analytics",
      description:
        "Real-time RPG, MPG, and gross revenue tracking with predictive insights",
    },
    {
      title: "Live Fleet Tracking",
      description:
        "GPS integration with ELD and intelligent route optimization",
    },
    {
      title: "Safety Monitoring",
      description:
        "HOS compliance, driver wellness alerts, and safety score tracking",
    },
    {
      title: "AI Insights",
      description:
        "Machine learning powered recommendations for fleet decision making",
    },
  ],
};

export const tmsLoadOperations: ProductSectionContent = {
  id: "tms-load-operations",
  eyebrow: "Load Operations Engine",
  title: "Advanced Load Management & Intelligent Dispatching",
  description:
    "From dispatch to delivery, manage every aspect of your loads with our comprehensive load management system featuring AI-powered routing, automated billing, and real-time tracking with predictive analytics.",
  copyStatus: "reuse",
  image: {
    id: "tms-loads",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck loading at a freight terminal photograph",
    placeholder: "ASSET NEEDED: truck loading at a freight terminal photograph",
  },
  features: [
    {
      title: "Smart Dispatching",
      description:
        "AI-powered load assignment based on driver location, preferences, equipment compatibility, and historical performance data for optimal routing.",
      details: [
        "Automated load-driver matching with ML algorithms",
        "Dynamic route optimization with traffic analysis",
        "Real-time availability tracking and preferences",
      ],
    },
    {
      title: "Automated Billing",
      description:
        "Generate invoices, rate confirmations, and settlements automatically with customizable templates and integrated payment processing.",
      details: [
        "Instant invoice generation with custom templates",
        "Automated rate confirmation distribution",
        "Integrated settlement and payment processing",
      ],
    },
    {
      title: "Live Tracking & Analytics",
      description:
        "Monitor load progress in real-time with GPS integration, delivery confirmations, customer updates, and predictive arrival times.",
      details: [
        "GPS-based tracking with ETA predictions",
        "Automated delivery confirmations and PODs",
        "Proactive customer notifications and updates",
      ],
    },
    {
      title: "Advanced Analytics",
      description:
        "Comprehensive reporting on load profitability, on-time performance, customer metrics, and predictive insights for business optimization.",
      details: [
        "Profitability analysis by route and customer",
        "Performance metrics and benchmarking",
        "Customer scorecards and relationship insights",
      ],
    },
  ],
};

export const tmsMaintenance: ProductSectionContent = {
  id: "tms-maintenance",
  eyebrow: "Equipment Care",
  title: "Smart Maintenance System",
  description:
    "Stay ahead of repairs, maximize uptime, and extend your fleet's lifespan with our cutting-edge maintenance system that watches your vehicles 24/7. Never let maintenance issues slow you down again.",
  copyStatus: "reuse",
  image: {
    id: "tms-maintenance",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "truck maintenance workshop photograph",
    placeholder: "ASSET NEEDED: truck maintenance workshop photograph",
  },
  features: [
    {
      title: "Preventive Maintenance",
      description:
        "Automated PM scheduling based on mileage, engine hours, and time intervals",
    },
    {
      title: "Pre-Trip Inspections",
      description:
        "Digital PTI forms with photo documentation and automatic reporting",
    },
    {
      title: "Vehicle Health Monitoring",
      description:
        "Real-time diagnostics, fault code alerts, and performance tracking",
    },
    {
      title: "Complete Service History",
      description:
        "Detailed maintenance records, cost tracking, and vendor management",
    },
  ],
};

export const tmsFinancials: ProductSectionContent = {
  id: "tms-financials",
  eyebrow: "Financial Management",
  title: "Complete Financial Control Center",
  description:
    "Streamline your financial operations with automated payroll processing, multi-account management, expense tracking, and comprehensive financial reporting.",
  copyStatus: "reuse",
  image: {
    id: "tms-financials",
    status: "placeholder" as const,
    src: null,
    sourceUrl: null,
    license: null,
    width: 1200,
    height: 900,
    alt: "fleet office financial workflow photograph",
    placeholder: "ASSET NEEDED: fleet office financial workflow photograph",
  },
  features: [
    {
      title: "Advanced Payroll System",
      description:
        "Automated weekly payroll calculations with support for multiple pay structures, deductions, bonuses, and settlement processing.",
      details: [
        "Multi-account payroll processing",
        "Automated tax calculations",
        "Direct deposit integration",
        "Driver settlement summaries",
      ],
    },
    {
      title: "Expense Management",
      description:
        "Track fuel, maintenance, tolls, and operational expenses with automated categorization.",
    },
    {
      title: "Financial Analytics",
      description:
        "Comprehensive P&L reports, cost per mile analysis, and profitability tracking.",
    },
    {
      title: "Multi-Entity Support",
      description:
        "Manage multiple companies, franchises, and business entities from one platform.",
    },
  ],
};

export const tmsAudit = {
  omitted: [
    "Unexplained comparison percentages",
    "Simulated dashboard data",
    "Unsubstantiated load and maintenance outcome figures",
    "Fuel savings calculator and conflicting eligibility",
    "Uncleared publisher logos and fleet portraits",
  ],
  notFound: [
    "FAQs",
    "Attributed testimonial quotations",
    "Certifications",
    "Published pricing table",
  ],
};

export const storyAssets: Record<
  | "convergence"
  | "journey"
  | "resolution"
  | "dashboard"
  | "fuel"
  | "maintenancePhoto",
  StoryAsset
> = {
  maintenancePhoto: {
    kind: "image",
    id: "maintenance-workshop",
    src: "/images/tms/maintenance-workshop.webp",
    poster: "/images/tms/maintenance-workshop.webp",
    sourceFile: "exec-241dc090-1cf1-4c0e-8e32-80e7ad689b15.png",
    sourceUrl: "docs/tms-maintenance-art-direction.md",
    source: "generated",
    license:
      "Generated with built-in imagegen at the owner's request. Illustrative fictional workshop; not a customer photograph.",
    alt: "Teal semi-truck parked in a spacious maintenance workshop with service equipment and organized tools",
    width: 1672,
    height: 941,
    duration: 0,
    bytes: 260818,
  },
  convergence: {
    id: "convergence",
    sourceFile: "Circular_modules_connecting_into.mp4",
    sourceUrl: "/brand/videos-tms/Circular_modules_connecting_into.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/convergence.mp4",
    poster: "/brand/videos-tms/scrub/convergence.webp",
    alt: "Teal circular modules connecting into a coordinated assembly",
    width: 1280,
    height: 720,
    duration: 7.96,
    bytes: 3272919,
  },
  journey: {
    id: "journey",
    sourceFile: "Marker_moving_along.mp4",
    sourceUrl: "/brand/videos-tms/Marker_moving_along.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/journey.mp4",
    poster: "/brand/videos-tms/scrub/journey.webp",
    alt: "A coral marker following a sculpted route between connected modules",
    width: 1280,
    height: 720,
    duration: 7.96,
    bytes: 4867716,
  },
  resolution: {
    id: "resolution",
    sourceFile: "Abstract_film_resolving_into_orde.mp4",
    sourceUrl: "/brand/videos-tms/Abstract_film_resolving_into_orde.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    src: "/brand/videos-tms/scrub/resolution.mp4",
    poster: "/brand/videos-tms/scrub/resolution.webp",
    alt: "Pale planes and teal blocks moving into an orderly assembly",
    width: 1280,
    height: 720,
    duration: 5.96,
    bytes: 1863971,
  },
  dashboard: {
    id: "spotter-tms2",
    src: "/videos/spotter-tms2.mp4",
    poster: "/videos/spotter-tms2.png",
    sourceFile: "spotter-tms2.mp4",
    sourceUrl: "https://spotter.ai/videos/spotter-tms2.mp4",
    source: "source page",
    license:
      "Downloaded from the original Spotter TMS page at the owner’s explicit request; no separate license supplied.",
    alt: "Spotter TMS product demonstration",
    width: 1920,
    height: 1080,
    duration: 45.766667,
    bytes: 6464661,
  },
  fuel: {
    id: "tms-fuel-seek-hero",
    src: "/videos/tms-fuel-seek-hero.mp4",
    poster: "/videos/tms-fuel-seek-hero.png",
    sourceFile: "tms-fuel-seek-hero.mp4",
    sourceUrl: "https://spotter.ai/videos/tms-fuel-seek-hero.mp4",
    source: "source page",
    license:
      "Downloaded from the original Spotter TMS page at the owner’s explicit request; no separate license supplied.",
    alt: "Spotter TMS fuel savings product demonstration",
    width: 1920,
    height: 1080,
    duration: 15.7,
    bytes: 5975805,
  },
};

export const storyChapters = [
  {
    id: "tms-intro",
    label: "Spotter TMS",
    number: "01",
    motion: "pin",
    asset: "convergence",
  },
  {
    id: "tms-results",
    label: "Proven Performance Results",
    number: "02",
    motion: "reveal",
    asset: null,
  },
  {
    id: "tms-capabilities",
    label: "Essential Fleet Management Tools",
    number: "03",
    motion: "pin",
    asset: "fuel",
  },
  {
    id: "tms-visibility",
    label: "Live Analytics Engine",
    number: "04",
    motion: "parallax",
    asset: "dashboard",
  },
  {
    id: "tms-load-operations",
    label: "Load Operations Engine",
    number: "05",
    motion: "parallax",
    asset: "journey",
  },
  {
    id: "tms-maintenance",
    label: "Equipment Care",
    number: "06",
    motion: "pin",
    asset: "maintenancePhoto",
  },
  {
    id: "tms-financials",
    label: "Financial Management",
    number: "07",
    motion: "parallax",
    asset: "resolution",
  },
  {
    id: "tms-contact",
    label: "Get Started Today",
    number: "08",
    motion: "static",
    asset: null,
  },
] as const;

export const tmsStory = {
  copyStatus: "reuse",
  navigationLabel: "TMS story chapters",
  pause: "Pause motion",
  resume: "Enable motion",
  scrollHint: "Scroll to follow the story",
  hero: {
    eyebrow: "Spotter TMS",
    title: "Finally, TMS Built For Dispatchers",
    description: "Automated AI Fuel Savings. Only TMS that pays for itself.",
    secondary: "Explore the operation",
  },
  overview: {
    id: "tms-capabilities",
    eyebrow: "Essential Fleet Management Tools",
    title: "Essential Fleet Management Tools",
    description:
      "Everything you need to manage drivers, monitor performance, and optimize your fleet operations in one powerful platform",
    items: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
    features: [
      {
        title: "Metrics Monitoring",
        description:
          "Monitor key performance indicators including gross revenue, revenue per gallon, and miles per gallon with real-time dashboards and automated reporting.",
      },
      {
        title: "Driver Week Management",
        description:
          "Comprehensive driver week overview showing gross earnings, load assignments, performance metrics, and weekly summaries for optimal driver management.",
      },
      {
        title: "ELD & Wellness Monitoring",
        description:
          "Advanced ELD integration with wellness monitoring, disconnect alerts, and compliance tracking to ensure driver safety and regulatory adherence.",
      },
      {
        title: "Maintenance Management",
        description:
          "Complete maintenance oversight with preventive maintenance scheduling, pre-trip inspections, truck condition tracking, and detailed maintenance notes.",
      },
      {
        title: "Multi-Account Payroll",
        description:
          "Manage different account payrolls with automated calculations, driver settlements, expense tracking, and integrated accounting workflows.",
      },
      {
        title: "Fleet Optimization",
        description:
          "Integrated fleet management combining all core functions for maximum efficiency, cost control, and operational visibility across your entire operation.",
      },
    ],
  },
  visibility: {
    eyebrow: "Live Analytics Engine",
    title: "Real-Time Fleet Dashboard & Performance Intelligence",
    description:
      "Monitor your entire fleet operation from a single, intelligent dashboard. Track driver performance, vehicle status, load progress, and financial metrics in real-time with AI-powered insights and predictive analytics.",
  },
  loads: {
    eyebrow: "Load Operations Engine",
    title: "Advanced Load Management & Intelligent Dispatching",
    description:
      "From dispatch to delivery, manage every aspect of your loads with our comprehensive load management system featuring AI-powered routing, automated billing, and real-time tracking with predictive analytics.",
  },
  maintenance: {
    eyebrow: "Equipment Care",
    title: "Smart Maintenance System",
    description:
      "Stay ahead of repairs, maximize uptime, and extend your fleet's lifespan with our cutting-edge maintenance system that watches your vehicles 24/7. Never let maintenance issues slow you down again.",
  },
  financials: {
    eyebrow: "Financial Management",
    title: "Complete Financial Control Center",
    description:
      "Streamline your financial operations with automated payroll processing, multi-account management, expense tracking, and comprehensive financial reporting.",
  },
  contact: {
    eyebrow: "Get Started Today",
    title: "Ready to Transform Your Fleet Operations?",
    description:
      "Join thousands of fleet managers using Spotter TMS to optimize their operations",
  },
};

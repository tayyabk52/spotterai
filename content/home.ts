export type SiteLink = { label: string; href: string; description?: string };
export type Product = {
  id: "lens" | "crm" | "driver-app" | "tms" | "sentinel" | "extension";
  name: string;
  category: string;
  title: string;
  description: string;
  href: string;
  steps: readonly string[];
  copyStatus: "rewrite";
};
export const quoteLink = {
  label: "Request a demo or quote",
  href: "https://spotter.ai/request-quote",
};
export const navigation: { label: string; items: SiteLink[] }[] = [
  {
    label: "Products",
    items: [
      {
        label: "Spotter TMS",
        href: "/tms",
        description: "Bring your operations into view.",
      },
      {
        label: "Sentinel",
        href: "/sentinel",
        description: "Make safety part of the workflow.",
      },
      {
        label: "Spotter Lens",
        href: "/lens",
        description: "Understand the freight market.",
      },
      {
        label: "Driver App",
        href: "/driversapp",
        description: "Find a better fit for the next load.",
      },
      {
        label: "Claims OS",
        href: "/claims-os",
        description: "Keep claims moving toward resolution.",
      },
      {
        label: "Load Spotter",
        href: "/extension",
        description: "Simplify the load-board search.",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Fleet Management", href: "/tms" },
      { label: "Safety & Compliance", href: "/sentinel" },
      { label: "Market Intelligence", href: "/lens" },
      { label: "Owner-Operators", href: "/driversapp" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "Watch a Demo", href: "/watch-demo" },
      { label: "Chrome Extension", href: "/extension" },
      { label: "Loan Calculators", href: "/loan-calculators" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Spotter", href: "/about" },
      { label: "Contact Sales", href: quoteLink.href },
      { label: "Careers", href: "/careers" },
    ],
  },
];
export const products: Product[] = [
  {
    id: "lens",
    name: "Spotter Lens",
    category: "Market intelligence",
    title: "See the market before you make your move.",
    description:
      "Explore freight rankings and pricing insights in real time. Put market context behind your next operational decision.",
    href: "/lens",
    steps: ["Market signals", "Rankings & pricing", "An informed decision"],
    copyStatus: "rewrite",
  },
  {
    id: "crm",
    name: "Spotter CRM",
    category: "Recruiting",
    title: "Keep recruiting progress in sight.",
    description:
      "Follow engagement and recruiting performance in one place, so your team can see where the process stands.",
    href: `${quoteLink.href}?product=crm`,
    steps: [
      "Recruiting activity",
      "Engagement tracking",
      "Performance visibility",
    ],
    copyStatus: "rewrite",
  },
  {
    id: "driver-app",
    name: "Driver App",
    category: "Load selection",
    title: "Make the next load a better fit.",
    description:
      "Use AI-assisted load scoring and matching to evaluate your options, with performance information available as you go.",
    href: "/driversapp",
    steps: ["Available loads", "Scoring & matching", "Your next move"],
    copyStatus: "rewrite",
  },
  {
    id: "tms",
    name: "Spotter TMS",
    category: "Fleet operations",
    title: "Bring the moving parts together.",
    description:
      "Manage transportation workflows with clearer operational visibility and automated data handling.",
    href: "/tms",
    steps: ["Operational data", "Workflow automation", "A clearer fleet view"],
    copyStatus: "rewrite",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    category: "Safety & compliance",
    title: "Put safety into the everyday workflow.",
    description:
      "Bring driver scoring, safety automation, and compliance monitoring into the way your team works.",
    href: "/sentinel",
    steps: ["Driver information", "Scoring & monitoring", "Safety visibility"],
    copyStatus: "rewrite",
  },
  {
    id: "extension",
    name: "Load Board Extension",
    category: "Browser automation",
    title: "Spend less effort on the search.",
    description:
      "Simplify load-board workflows with filtering and browser automation for Chrome and Firefox.",
    href: "/extension",
    steps: [
      "Load-board listings",
      "Filtering & automation",
      "A focused search",
    ],
    copyStatus: "rewrite",
  },
];
export const home = {
  hero: {
    eyebrow: "Trucking automation, connected",
    title: "trucking automation that works for you",
    lines: ["trucking automation", "that works for you"],
    description:
      "From the freight market to the people behind the wheel, give your team the tools to see more clearly and keep operations moving.",
    secondary: "Explore the suite",
    copyStatus: "rewrite",
  },
  capabilities: {
    eyebrow: "Built around your operation",
    title: "The right tool.\nThe bigger picture.",
    description:
      "Six focused products for the decisions, workflows, and people that keep freight moving.",
    copyStatus: "rewrite",
  },
  results: {
    eyebrow: "The impact in view",
    title: "Built for work.\nMeasured in outcomes.",
    description: "A snapshot of the platform’s reach, as reported by Spotter.",
    source:
      "Platform figures published on spotter.ai, observed October 8, 2026.",
    copyStatus: "rewrite",
  },
  metrics: [
    { value: "10K+", label: "Fleet managers active daily" },
    { value: "2.8M+", label: "Load matches processed monthly" },
    { value: "$50M+", label: "Savings reported across customers" },
    { value: "96.7%", label: "Reported market prediction accuracy" },
  ],
  customer: {
    eyebrow: "A customer’s perspective",
    title: "More clarity. Less operational friction.",
    summary:
      "Road King Express owner Marius Stašauskas reports a 40% reduction in operational costs and 60% faster load matching, with AI insights helping the team make decisions.",
    name: "Marius Stašauskas",
    role: "Owner, Road King Express",
    note: "Summary of a customer testimonial published by Spotter.",
    copyStatus: "rewrite",
  },
  awardsTitle: "Recognition for the people behind the platform",
  closing: {
    eyebrow: "Your next move",
    title: "Let’s talk about your operation.",
    description:
      "Tell us where you want a clearer view, from dispatch and recruiting to safety. We’ll help you explore the Spotter tools that fit.",
    partnersTitle: "Alongside teams across freight",
    copyStatus: "rewrite",
  },
  footerDescription:
    "Tools for the people who move freight: brokers, carriers, and drivers.",
};
export const awards = [
  {
    src: "/brand/awards/workplace-2025.webp",
    alt: "2025 Top Workplaces recognition, CareerBuilder and Monster",
    width: 121,
    height: 200,
  },
  {
    src: "/brand/awards/workplace-2026.webp",
    alt: "2026 USA Today Top Workplaces recognition",
    width: 122,
    height: 200,
  },
  {
    src: "/brand/awards/development.webp",
    alt: "2025 Top Workplaces professional development award",
    width: 168,
    height: 200,
  },
  {
    src: "/brand/awards/wellbeing.webp",
    alt: "2025 Top Workplaces employee well-being award",
    width: 135,
    height: 200,
  },
  {
    src: "/brand/awards/appreciation.webp",
    alt: "2025 Top Workplaces appreciation award by Nectar",
    width: 123,
    height: 200,
  },
];
export const partners = [
  {
    src: "/brand/partners/king-express.png",
    alt: "King Express",
    width: 180,
    height: 183,
  },
  { src: "/brand/partners/mm.webp", alt: "M&M", width: 400, height: 223 },
  {
    src: "/brand/partners/qwtrucks.png",
    alt: "QW Trucks",
    width: 147,
    height: 74,
  },
  { src: "/brand/partners/ampro.png", alt: "Ampro", width: 179, height: 78 },
];
export const footerGroups = [
  {
    label: "Products",
    links: [
      { label: "Spotter App", href: "/driversapp" },
      { label: "Extension", href: "/extension" },
      { label: "TMS", href: "/tms" },
      { label: "Lens", href: "/lens" },
      { label: "Sentinel", href: "/sentinel" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: quoteLink.href },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-and-services" },
      { label: "CCPA", href: "/ccpa" },
    ],
  },
];
export const downloads = [
  {
    label: "App Store",
    href: "https://apps.apple.com/us/app/spotter-ai/id1670506993",
  },
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.spotter.ai&pcampaignid=web_share",
  },
];
export const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Spotter-Sentinel/61577984011373/",
  },
  { label: "Instagram", href: "https://www.instagram.com/sentinel.safety/" },
];

export const heroImages = [
  {
    src: "/images/hero/fleet-dawn.webp",
    alt: "Teal semi truck and dry-van trailer at a freight terminal in early daylight",
    caption: "The fleet on the road.",
  },
  {
    src: "/images/hero/dispatch-daylight.webp",
    alt: "Fleet operations manager working at a laptop beside a window overlooking a freight yard",
    caption: "The team behind it.",
  },
] as const;

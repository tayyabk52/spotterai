export type FeatureGroup = {
  title: string;
  description: string;
  details?: readonly string[];
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

export const storyAssets: Record<
  "triage" | "board" | "resolution",
  StoryAsset
> = {
  triage: {
    kind: "video",
    id: "claims-triage",
    status: "client asset",
    src: "/brand/claimsOS-videos/scrub/claims-triage.mp4",
    poster: "/brand/claimsOS-videos/scrub/claims-triage.webp",
    sourceFile: "Laser_lines_aligning_freight_data_20261008175814.mp4",
    sourceUrl:
      "/brand/claimsOS-videos/Laser_lines_aligning_freight_data_20261008175814.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    alt: "Abstract kinetic freight claims triage and data vector alignment",
    width: 1920,
    height: 1080,
    duration: 6,
    bytes: 9970815,
  },
  board: {
    kind: "image",
    id: "claimos-board-hero",
    status: "client asset",
    src: "/images/claims-os/claimos-board.webp",
    poster: "/images/claims-os/claimos-board.webp",
    sourceFile: "claimos-board.webp",
    sourceUrl:
      "https://spotter.ai/static/media/claimos-board.0ee8047bade8e616909a.webp",
    source: "source page",
    license:
      "Downloaded authentic client product screenshot from spotter.ai/claims-os",
    alt: "Spotter ClaimsOS board interface showing active freight claims and resolution stages",
    width: 1692,
    height: 930,
  },
  resolution: {
    kind: "video",
    id: "liability-resolution",
    status: "client asset",
    src: "/brand/claimsOS-videos/scrub/liability-resolution.mp4",
    poster: "/brand/claimsOS-videos/scrub/liability-resolution.webp",
    sourceFile: "Kinetic_sculpture_rotating_into_…_20261008175745.mp4",
    sourceUrl:
      "/brand/claimsOS-videos/Kinetic_sculpture_rotating_into_…_20261008175745.mp4",
    source: "client supplied",
    license:
      "Supplied by the owner for this page; no separate third-party license supplied.",
    alt: "Abstract kinetic sculpture representing cargo liability balance and financial recovery",
    width: 1920,
    height: 1080,
    duration: 6,
    bytes: 6192526,
  },
};

export const storyChapters = [
  {
    id: "claims-intro",
    label: "Overview",
    number: "01",
    motion: "pin",
  },
  {
    id: "claims-tracking",
    label: "Claim Tracking",
    number: "02",
    motion: "reveal",
  },
  {
    id: "claims-financials",
    label: "Financial Control",
    number: "03",
    motion: "parallax",
  },
  {
    id: "claims-slack",
    label: "Slack Automation",
    number: "04",
    motion: "reveal",
  },
  {
    id: "claims-operations",
    label: "Fleet Operations",
    number: "05",
    motion: "reveal",
  },
  {
    id: "claims-contact",
    label: "Get Started",
    number: "06",
    motion: "static",
  },
] as const;

export const claimsOs = {
  metadata: {
    title: "ClaimsOS: Freight Claims Management Software | Spotter",
    description:
      "Track every freight claim, automate carrier follow-ups, and keep logistics operations connected directly through Slack with Spotter ClaimsOS.",
    url: "https://spotter.ai/claims-os",
    siteName: "Spotter.ai",
  },
  action: {
    label: "I'm Interested",
    href: "/request-quote?product=claims-os",
  },
  hero: {
    eyebrow: "SPOTTER CLAIMSOS",
    title: "The Centralized Claims Operating System for Transportation Teams.",
    description:
      "Track every freight claim, automate carrier and driver follow-ups, and keep your logistics operations connected directly through Slack.",
    secondary: "Explore Features",
    secondaryHref: "#claims-tracking",
    scrollHint: "Scroll to explore ClaimsOS",
  },
  tracking: {
    id: "claims-tracking",
    number: "02",
    label: "Claim Tracking",
    title: "Centralize and monitor every active transportation claim",
    description:
      "From incident report to final resolution, manage multi-unit fleets, cross-dock incidents, and active claims from a single pane of glass.",
    features: [
      {
        title: "Centralized Dashboard",
        description:
          "Manage multi-unit fleets and cross-dock incidents from a single pane of glass.",
        details: [
          "Real-time claim status tracking",
          "Automated carrier correspondence",
          "Multi-unit fleet oversight",
          "Incident-to-resolution timeline",
        ],
      },
      {
        title: "Document Storage",
        description:
          "Instantly link BOLs, PODs, and photos directly to the specific claim file.",
      },
      {
        title: "Driver Integration",
        description:
          "Log driver statements and historical incident data to improve overall fleet safety.",
      },
      {
        title: "Activity Monitoring",
        description:
          "Get total visibility into team bottlenecks, open cycle times, and recurring transit issues.",
      },
    ],
  },
  financials: {
    id: "claims-financials",
    number: "03",
    label: "Financial Control",
    title: "Track cargo liabilities, salvage values, and payout statuses",
    description:
      "Seamless financial control designed to eliminate cargo deductions, reconcile salvage recoveries, and match claim settlements directly.",
    features: [
      {
        title: "Financial Control",
        description:
          "Track cargo liabilities, salvage values, and payout statuses seamlessly in one system.",
        details: [
          "Cargo liability accounting",
          "Salvage recovery tracking",
          "Claim payout status updates",
          "Deduction reconciliation",
        ],
      },
      {
        title: "Freight Accounting Alignment",
        description:
          "Streamline cargo deductions, track open liabilities, and match payouts perfectly.",
      },
      {
        title: "Recovery Analytics",
        description:
          "Access high-level analytics on claim recovery rates, net losses, and operational disputes.",
      },
    ],
  },
  slack: {
    id: "claims-slack",
    number: "04",
    label: "Slack Automation",
    title: "Never let a claim stall out.",
    description:
      "Logistics moves fast, and communication gaps cost money. Spotter automatically pushes real-time updates where your team already works.",
    features: [
      {
        title: "Instant Notifications",
        description:
          "Alerts the right dispatchers or managers the second a claim status changes.",
      },
      {
        title: "Audit Trail",
        description:
          "Every Slack update maps directly back to the claim history log.",
      },
      {
        title: "Team Collaboration",
        description:
          "Tag teammates and resolve disputes without ever leaving your workflow.",
      },
    ],
    feed: {
      channel: "#claims-ops",
      sender: "Spotter",
      timestamp: "2:41 PM",
      message:
        "Claim #4821 status changed to In Review - carrier response due in 24h.",
      actions: ["View Claim", "Assign"],
    },
  },
  operations: {
    id: "claims-operations",
    number: "05",
    label: "Fleet Operations",
    title: "Designed for your entire operation",
    description:
      "Tailored operational views empower frontline handlers, accounting, safety teams, and executives from a unified data layer.",
    roles: [
      {
        role: "Claims Team",
        description:
          "Speed up cycle times, reduce manual data entry, and easily manage carrier disputes.",
      },
      {
        role: "Freight Accounting",
        description:
          "Streamline cargo deductions, track open liabilities, and match payouts perfectly.",
      },
      {
        role: "Fleet Safety",
        description:
          "Monitor high-risk lanes, track recurring driver incidents, and implement preventive training.",
      },
      {
        role: "Operations Management",
        description:
          "Access high-level analytics on claim costs, recovery rates, and operational bottlenecks.",
      },
    ],
  },
  contact: {
    id: "claims-contact",
    number: "06",
    eyebrow: "Get Started",
    title: "Take control of your logistics claims.",
    description:
      "See how Spotter ClaimsOS can protect your bottom line and keep your operations moving.",
    action: {
      label: "I'm Interested",
      href: "/request-quote?product=claims-os",
    },
  },
  navigationLabel: "ClaimsOS story chapters",
  pause: "Pause motion",
  resume: "Enable motion",
};

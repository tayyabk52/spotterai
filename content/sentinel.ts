export type FeatureGroup = {
  title: string;
  description: string;
  tag?: string;
  details?: readonly string[];
};

export type StoryAsset = {
  kind?: "image";
  id: string;
  src: string;
  poster: string;
  sourceFile: string;
  sourceUrl: string;
  source: "client supplied" | "source page" | "generated";
  license: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
  bytes: number;
};

export const sentinelStoryAssets: Record<
  "shield" | "screening" | "monitoring" | "compliance",
  StoryAsset
> = {
  shield: {
    id: "sentinel-shield",
    src: "/videos/sentinel/sentinel-shield.mp4",
    poster: "/images/sentinel/sentinel-shield.webp",
    sourceFile: "convergence.mp4",
    sourceUrl: "/brand/videos-tms/scrub/convergence.mp4",
    source: "generated",
    license:
      "All-intra H.264 derivative encoded with GOP=1 for scroll scrubbing.",
    alt: "Abstract kinetic safety perimeter with luminous telemetry lattice and vector filtration",
    width: 1280,
    height: 720,
    duration: 6.0,
    bytes: 3272919,
  },
  screening: {
    id: "sentinel-screening",
    src: "/videos/sentinel/sentinel-C.mp4",
    poster: "/images/sentinel/how-it-works-poster.webp",
    sourceFile: "sentinel-C.mp4",
    sourceUrl: "https://spotter.ai/videos/sentinel-C.mp4",
    source: "source page",
    license:
      "Authentic client software walkthrough from spotter.ai/sentinel demonstrating CDL upload and AI safety grading.",
    alt: "Sentinel driver screening workflow showing CDL upload, optical character recognition, and instant A-F safety score calculation",
    width: 1280,
    height: 720,
    duration: 31.2,
    bytes: 2232920,
  },
  monitoring: {
    id: "sentinel-monitoring",
    src: "/videos/sentinel/slack-demo-2.mp4",
    poster: "/images/sentinel/slack-demo-poster.webp",
    sourceFile: "slack-demo-2.mp4",
    sourceUrl: "https://spotter.ai/videos/slack-demo-2.mp4",
    source: "source page",
    license:
      "Authentic client software walkthrough from spotter.ai/sentinel demonstrating real-time Slack notification updates.",
    alt: "Sentinel real-time driver alert integration pushing MVR record updates directly into Slack and Google Chat",
    width: 1280,
    height: 698,
    duration: 41.8,
    bytes: 6628063,
  },
  compliance: {
    id: "sentinel-compliance",
    src: "/videos/sentinel/sentinel-compliance.mp4",
    poster: "/images/sentinel/sentinel-compliance.webp",
    sourceFile: "resolution.mp4",
    sourceUrl: "/brand/videos-tms/scrub/resolution.mp4",
    source: "generated",
    license:
      "All-intra H.264 derivative encoded with GOP=1 for scroll scrubbing.",
    alt: "Abstract optical verification lattice resolving compliance records into validated state rings",
    width: 1280,
    height: 720,
    duration: 6.0,
    bytes: 1863971,
  },
};

export const sentinelContent = {
  metadata: {
    title:
      "Sentinel — AI Driver Hiring, MVR Monitoring & Fleet Compliance | Spotter",
    description:
      "Centralized driver screening, continuous 24/7 MVR monitoring, and automated DOT compliance tracking. Clear candidates in 60 seconds at up to 75% lower screening costs.",
    url: "https://spotter.ai/sentinel",
    siteName: "Spotter",
  },
  hero: {
    eyebrow: "Continuous Driver Risk Management",
    title: "Autonomous Fleet Safety & Driver Qualification",
    description:
      "Screen candidates with instant CDL extraction and predictive A–F scoring, monitor MVR records 24/7 with zero extra dashboard logins, and maintain audit-ready DOT compliance files across your entire carrier network.",
    primaryCta: "Request Sentinel Demo",
    primaryHref: "/request-quote?product=sentinel",
    secondaryCta: "Explore Capabilities",
    secondaryHref: "#sentinel-screening",
    savingsStat: "Up to 75%",
    savingsLabel:
      "Lower MVR and PSP screening costs compared to legacy providers",
    speedStat: "< 60s",
    speedLabel:
      "Average turnaround for comprehensive MVR, PSP, and CDLIS records",
    badgeChannels: "Direct Webhook Sync: Slack · Google Chat · TMS API",
  },
  screeningChapter: {
    id: "sentinel-screening",
    chapterNumber: "01",
    tag: "Track A · AI Driver Screening",
    heading: "Sub-60s Driver Qualification with Predictive Risk Scoring",
    description:
      "Eliminate manual recruiter data entry. Upload or snap a commercial driver's license to instantly extract credentials, pull complete MVR, PSP, and CDLIS histories, and generate a validated A–F safety score before candidate intake calls.",
    metrics: [
      {
        value: "A–F",
        label: "Predictive Grade",
        detail:
          "Synthesized from complete multi-state MVR and PSP violation logs.",
      },
      {
        value: "60s",
        label: "Report Turnaround",
        detail:
          "Clean, audit-ready background dossiers delivered before dispatch decisions.",
      },
      {
        value: "100%",
        label: "OCR Accuracy",
        detail:
          "Automatic field extraction covering Class, Endorsements, and Expirations.",
      },
    ],
    features: [
      {
        title: "Optical CDL Extraction",
        description:
          "Mobile scan or document upload automatically extracts name, license number, state, expiration, and CDL endorsements without manual typing.",
      },
      {
        title: "Instant Multi-Bureau Dossier",
        description:
          "Synchronous pull across state MVR repositories, FMCSA PSP crash/inspection histories, and nationwide CDLIS records in one unified file.",
      },
      {
        title: "Predictive Risk Scoring",
        description:
          "Standardized scoring algorithms translate disparate violation histories into actionable compliance grades for consistent hiring standards.",
      },
    ],
  },
  monitoringChapter: {
    id: "sentinel-monitoring",
    chapterNumber: "02",
    tag: "Track B · Continuous MVR Guard",
    heading: "24/7 Fleet Surveillance Delivered Directly to Operations Chat",
    description:
      "Annual MVR pulls leave 364 days of blind spots. Sentinel connects directly to state licensing databases, alerting your dispatch and safety teams the moment a citation, suspension, or medical expiration occurs — right inside Slack and Google Chat.",
    metrics: [
      {
        value: "24/7",
        label: "Continuous Surveillance",
        detail:
          "Real-time state database webhooks detecting moving violations and suspensions.",
      },
      {
        value: "0",
        label: "Extra Dashboards",
        detail:
          "Notifications push directly into active operational chat channels.",
      },
      {
        value: "Immediate",
        label: "Dispatch Interception",
        detail:
          "Halt high-risk dispatches before non-compliant vehicles depart the terminal.",
      },
    ],
    features: [
      {
        title: "Real-Time Citation Alerts",
        description:
          "Automatic notifications fire when an active driver receives a moving violation, DUI, or logbook infraction in any jurisdiction.",
      },
      {
        title: "Native Slack & Chat Integration",
        description:
          "Safety cards format directly into your team's existing channels, providing driver identity, offense type, and recommended resolution.",
      },
      {
        title: "Discrepancy Cross-Checking",
        description:
          "Automated verification reconciles stated employment timelines against recorded roadside inspections to uncover unlisted employers.",
      },
    ],
  },
  complianceChapter: {
    id: "sentinel-compliance",
    chapterNumber: "03",
    tag: "Track C · DOT Compliance & Testing",
    heading: "Audit-Ready DOT Records & 10-Panel Testing Chain of Custody",
    description:
      "Protect your fleet's Safety Measurement System (SMS) and Inspection Selection System (ISS) scores. Sentinel orchestrates full electronic DOT drug screening workflows while automatically monitoring upcoming medical certification and CDL deadlines.",
    metrics: [
      {
        value: "10-Panel",
        label: "DOT Drug Screen",
        detail:
          "Electronic custody and control forms (eCCF) with nationwide clinic integration.",
      },
      {
        value: "30-Day",
        label: "Early Warning",
        detail:
          "Automated alerts for driver medical card and CDL expiration horizons.",
      },
      {
        value: "Audit-Ready",
        label: "Digital File Cabinets",
        detail:
          "One-click export of complete Driver Qualification Files (DQF) for DOT audits.",
      },
    ],
    features: [
      {
        title: "Integrated Electronic Drug Testing",
        description:
          "Order pre-employment, random, or post-incident DOT 10-panel screenings with digital chains of custody across certified collection networks.",
      },
      {
        title: "Medical & Certification Tracking",
        description:
          "Automated deadline schedules prevent unintentional lapse of DOT physical cards, hazmat endorsements, and state driving privileges.",
      },
      {
        title: "ISS & Insurance Risk Containment",
        description:
          "Prevent non-compliant dispatches to defend your carrier safety rating and qualify for preferential fleet insurance underwriting tiers.",
      },
    ],
  },
  economicsChapter: {
    id: "sentinel-economics",
    chapterNumber: "04",
    tag: "Market Economics & Unit Pricing",
    heading: "Up to 75% Lower Screening Costs With Zero Hidden Markups",
    description:
      "Legacy background screening services bill inflated fees and state-access surcharges. Sentinel provides transparent, unbundled rates on MVR, PSP, and CDLIS reports to drastically lower fleet onboarding overhead.",
    comparisonTable: {
      columns: [
        "Service Provider",
        "MVR Unit Rate",
        "PSP Report",
        "CDLIS Query",
        "Driver Reviews",
      ],
      providers: [
        {
          name: "MVRcheck.com",
          mvr: "$9.95 + state fees",
          psp: "$19.95",
          cdlis: "$12.95",
          reviews: "Not included",
          isSentinel: false,
        },
        {
          name: "SuperVision (Solera)",
          mvr: "$2.00+ + state fees",
          psp: "$12.00",
          cdlis: "$8.00+",
          reviews: "Not included",
          isSentinel: false,
        },
        {
          name: "SambaSafety",
          mvr: "$1.50 - $2.00 + state fees",
          psp: "$12.00",
          cdlis: "$6.00",
          reviews: "Not included",
          isSentinel: false,
        },
        {
          name: "Checkr",
          mvr: "$9.50",
          psp: "$11.00+",
          cdlis: "$9.50+",
          reviews: "Not included",
          isSentinel: false,
        },
        {
          name: "Sentinel (Spotter)",
          mvr: "$10.00 flat",
          psp: "$4.50",
          cdlis: "$3.00",
          reviews: "Included in suite",
          isSentinel: true,
          highlight: "Save up to 75%",
        },
      ],
      footnote:
        "Source rates observed from published competitor tariffs as of Q1 2026. Sentinel pricing provides direct unbundled access with state-by-state lookup at spotter.ai/mvr-pricing.",
    },
  },
  talentChapter: {
    id: "sentinel-talent",
    chapterNumber: "05",
    tag: "Track A · Verified Driver Marketplace",
    heading: "On-Demand Access to Pre-Vetted Commercial Driver Talent",
    description:
      "Recruiters can immediately search verified commercial driver profiles categorized by verified safety scores, endorsement certifications, and multi-year experience records.",
    steps: [
      {
        number: "01",
        title: "Filter by Safety Score & Geography",
        description:
          "Browse commercial drivers filtered by certified grade (A–B), equipment endorsements, and regional operational radius.",
      },
      {
        number: "02",
        title: "Unlock Complete Verified Profiles",
        description:
          "Instantly access contact info, authenticated MVR files, and PSP roadside inspection history without re-ordering legacy checks.",
      },
      {
        number: "03",
        title: "Accelerate Onboarding",
        description:
          "Connect directly with verified candidates to complete pre-employment drug screening and seat empty trucks in under 48 hours.",
      },
    ],
    drivers: [
      {
        name: "Billy Graham",
        location: "TX",
        ageGroup: "35–44 yrs",
        experience: "10 yrs",
        score: 100,
        grade: "A",
        status: "Clean Inspection History · Class A CDL",
      },
      {
        name: "Rory Rice",
        location: "CA",
        ageGroup: "25–34 yrs",
        experience: "8 yrs",
        score: 95,
        grade: "A",
        status: "Zero Violations · Hazmat Endorsed",
      },
      {
        name: "Caesar Morton",
        location: "NY",
        ageGroup: "25–34 yrs",
        experience: "7 yrs",
        score: 85,
        grade: "B",
        status: "Verified Employment History · Clean CDLIS",
      },
      {
        name: "Dannie Brown",
        location: "FL",
        ageGroup: "35–44 yrs",
        experience: "6 yrs",
        score: 83,
        grade: "B",
        status: "Current DOT Medical Card · Tanker Certified",
      },
      {
        name: "Mark Childs",
        location: "WA",
        ageGroup: "45–54 yrs",
        experience: "5 yrs",
        score: 62,
        grade: "D",
        status: "2 Non-Serious Speeding Infractions (Flagged)",
      },
      {
        name: "Jesse Watt",
        location: "CO",
        ageGroup: "25–34 yrs",
        experience: "3 yrs",
        score: 49,
        grade: "F",
        status: "Administrative Suspension On File (Rejected)",
      },
    ],
  },
  closingCta: {
    eyebrow: "Zero-Overhead Safety Architecture",
    heading: "Start Screening Safer Commercial Drivers in Under 60 Seconds",
    description:
      "Join forward-thinking motor carriers and safety directors who rely on Sentinel to eliminate blind spots, lower screening overhead, and protect their safety rating.",
    primaryCta: "Request Sentinel Demo",
    primaryHref: "/request-quote?product=sentinel",
    secondaryCta: "View MVR Pricing Matrix",
    secondaryHref: "https://spotter.ai/mvr-pricing",
    guarantees: [
      {
        label: "No Credit Card Required",
        detail:
          "Test live OCR extraction and safety grading without commitment.",
      },
      {
        label: "Setup in 60 Seconds",
        detail:
          "Direct webhook connection to Slack, Google Chat, and your TMS.",
      },
      {
        label: "First Driver Screen Free",
        detail: "Verify an active applicant's MVR and PSP record on us.",
      },
    ],
  },
  navigation: [
    { id: "sentinel-hero", label: "01 Risk Shield" },
    { id: "sentinel-screening", label: "02 AI Screening" },
    { id: "sentinel-monitoring", label: "03 24/7 Monitor" },
    { id: "sentinel-compliance", label: "04 DOT Compliance" },
    { id: "sentinel-economics", label: "05 Economics" },
    { id: "sentinel-talent", label: "06 Talent Board" },
    { id: "sentinel-cta", label: "07 Get Started" },
  ],
};

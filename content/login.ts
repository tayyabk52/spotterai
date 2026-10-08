/**
 * Login & Portal Directory Content.
 * 
 * Separates all marketing copy, system tags, capability lists, and external portal
 * destinations from UI components for clean maintainability.
 */

export interface PortalFeature {
  label: string;
  iconName: "analytics" | "fleet" | "routing" | "safety" | "compliance" | "risk";
}

export interface LoginPortal {
  id: "tms" | "sentinel";
  title: string;
  systemType: string;
  accentColor: "teal" | "coral";
  description: string;
  features: PortalFeature[];
  ctaLabel: string;
  ctaHref: string;
}

export interface LoginContent {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  portals: LoginPortal[];
  support: {
    prompt: string;
    contactLabel: string;
    contactHref: string;
    emailLabel: string;
    emailHref: string;
  };
  driverAppPrompt: {
    text: string;
    linkText: string;
    href: string;
  };
}

export const loginContent: LoginContent = {
  eyebrow: "PORTAL ACCESS",
  heading: "Select Your",
  headingAccent: "Workspace",
  subheading:
    "Sign in to your dedicated Spotter operational environment to manage fleet movements, dispatch, or automated driver safety compliance.",
  portals: [
    {
      id: "tms",
      title: "Spotter TMS",
      systemType: "TRANSPORTATION MANAGEMENT SYSTEM",
      accentColor: "teal",
      description:
        "Streamline your logistics operations with our comprehensive TMS platform. Manage routes, track shipments, and optimize your fleet efficiency.",
      features: [
        { label: "Real-time Analytics", iconName: "analytics" },
        { label: "Fleet Management", iconName: "fleet" },
        { label: "Route Optimization", iconName: "routing" },
      ],
      ctaLabel: "Access TMS Platform",
      ctaHref: "https://tms.spotter.ai/login",
    },
    {
      id: "sentinel",
      title: "Sentinel",
      systemType: "SAFETY MANAGEMENT SYSTEM",
      accentColor: "coral",
      description:
        "Enhance safety compliance and risk management with our advanced monitoring system. Track driver behavior and ensure regulatory compliance.",
      features: [
        { label: "Safety Monitoring", iconName: "safety" },
        { label: "Compliance Tracking", iconName: "compliance" },
        { label: "Risk Assessment", iconName: "risk" },
      ],
      ctaLabel: "Access Sentinel Platform",
      ctaHref: "https://sentinel-app.spotter.ai/login",
    },
  ],
  support: {
    prompt: "Need help?",
    contactLabel: "Contact our support team",
    contactHref: "/request-quote",
    emailLabel: "support@spotter.ai",
    emailHref: "mailto:support@spotter.ai",
  },
  driverAppPrompt: {
    text: "Looking for independent driver dispatch?",
    linkText: "Explore Driver App",
    href: "/driversapp",
  },
};

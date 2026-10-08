export type LegalBlock =
  | { kind: "paragraph" | "heading"; text: string }
  | { kind: "list"; ordered: boolean; items: readonly string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  path: string;
  title: string;
  navigationLabel: string;
  description: string;
  effectiveDate?: string;
  introduction: readonly LegalBlock[];
  sections: readonly LegalSection[];
};

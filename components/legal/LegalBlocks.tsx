import type { LegalBlock } from "@/content/legal/types";

const LINK_TARGETS: Record<string, string> = {
  "https://spotter.ai/": "/",
  "https://adr.org/": "https://adr.org/",
  "support@spotter.ai": "mailto:support@spotter.ai",
  "sales@spotter.ai": "mailto:sales@spotter.ai",
  "6309080917": "tel:+16309080917",
};

function LegalText({ text }: { text: string }) {
  const parts = text.split(
    /(https:\/\/spotter\.ai\/|https:\/\/adr\.org\/|support@spotter\.ai|sales@spotter\.ai|6309080917)/g,
  );
  return parts.map((part, index) =>
    LINK_TARGETS[part] ? (
      <a key={index} href={LINK_TARGETS[part]}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function LegalBlocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return blocks.map((block, index) => {
    if (block.kind === "heading") return <h3 key={index}>{block.text}</h3>;
    if (block.kind === "list") {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List key={index}>
          {block.items.map((text, item) => (
            <li key={item}>
              <LegalText text={text} />
            </li>
          ))}
        </List>
      );
    }
    return (
      <p key={index}>
        <LegalText text={block.text} />
      </p>
    );
  });
}

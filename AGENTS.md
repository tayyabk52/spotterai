# Project context
Read PRODUCT.md and DESIGN.md at the start of every session. Preserve the approved homepage design system on future pages. Amend the documents intentionally when the owner approves a change. Read docs/content-audit.md before changing marketing claims.


# graphify
- **graphify** (`~/.Codex/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.

## Code quality rules

These rules replace vague "write good code" instructions with specific, checkable criteria.

### Component and function boundaries

- Split a component or function when it does more than one distinct thing, when
  part of it would be reusable elsewhere, or when its tests would span unrelated
  behavior. If you cannot describe what it does in one short phrase without
  "and," split it. This is the test — not line count. A long component that does
  one thing stays as one component. (react.dev, "Extracting a Component";
  kentcdodds.com)
- When a piece of UI or logic is needed in more than one place, extract it once
  the second use appears. Don't pre-extract speculative "reusable" components
  before a second real usage exists — that creates indirection without value.
- Prefer function declarations for named functions; use arrow functions for
  callbacks and short, inline expressions. (Google TypeScript Style Guide)
- Keep each module to a single responsibility. As a guide, not a hard limit:
  most files stay in the 200–300 line range before you should look for a
  natural split. (Angular Components coding standards, following Google's
  JavaScript/TypeScript style guide)

### Naming and style

- Names describe what the code does, not how or where it's called from.
- Use UpperCamelCase for components, types, and interfaces; lowerCamelCase for
  variables, functions, and props; CONSTANT_CASE for module-level constants.
  (Google TypeScript Style Guide)
- Use named exports. Avoid default exports for anything except Next.js page
  and layout files, where the framework requires them.

### Comments

- Comment why code exists or why it takes a non-obvious approach, not what it
  does — the code itself should show what it does. (Angular Components coding
  standards)

### Production-practice checklist

Before reporting a task done, confirm:

- `npm run lint` and `npm run build` pass with no new errors.
- No dead code: no unused exports, unused props, or data defined but never
  read (check for this explicitly — it's easy to add a field and never wire
  it up).
- No duplicated logic across two or more files; shared logic goes in one
  place and is imported.
- Every component takes typed props; no implicit `any`.
- Follow the component/function split rule above rather than mechanically
  wrapping every piece of markup in its own file.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

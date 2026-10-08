# Spotter homepage

TypeScript, Next.js App Router, CSS Modules, and Framer Motion. Homepage only. Other-page links retain their public destinations.

Read PRODUCT.md and DESIGN.md before changing this project. Marketing-copy changes are tracked in docs/content-audit.md.

## Run
`npm ci`, then `npm run dev`. Open http://localhost:3000.

## Verify
`npm run typecheck`, `npm run lint`, `npm run build`, `npx playwright install chromium`, then `npm test`.
For production tests, start the built server and set PLAYWRIGHT_BASE_URL to its URL before running Playwright.

## Structure
app/ owns routes and metadata. components/layout/ owns shared chrome. components/sections/ owns homepage sections. content/home.ts contains copy and destinations. tokens.css contains canonical visual tokens; CSS Modules consume them. public/brand/ contains original brand and source recognition assets.

## Adding pages
Add a route under app/, export page metadata, and reuse layout components and tokens. Adopt the approved design reference rather than choosing a new visual identity. Replace absolute destination links only when their local routes exist.

## Vercel deployment

Import `tayyabk52/spotterai` through Vercel's GitHub integration. Set Root Directory to `./`, Framework Preset to Next.js, and Production Branch to `main`. Leave Output Directory at the framework default. `vercel.json` supplies the install command (`npm ci`) and build command (`npm run build`); Next.js manages pages, API routes, and assets without custom routing rules.

With the repository connected, pushes to `main` trigger production deployments and pull requests receive preview deployments. These Git integration settings live in the Vercel project, not this repository.

The app builds without environment variables. Configure `DJANGO_API_URL` and, if required by that backend, `DJANGO_API_TOKEN` in Vercel for quote requests to reach the real backend. `INSIGHTS_API_URL` and `NEWSLETTER_API_URL` can configure their respective integrations. Backend credentials must remain server-only.

## Evidence
Source figures remain explicitly attributed. No unverified comparison percentages or static pretend-live status. No form, authentication, analytics integration, or deployment in this phase.

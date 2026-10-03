# VedTech Project Report

Generated from the current repository state on 2026-10-02. This report intentionally contains no passwords, secret values, or local `.env` contents.

## 1. Overview

VedTech is a dark-first, responsive custom software development company website built as a standard Next.js App Router application. The current implementation is a single-page experience with server-side quote handling and MySQL persistence.

### Current status

- Standard Next.js application; the earlier Vinext/Cloudflare build layer has been removed.
- Responsive visual foundation, interactions, scroll experiences, animated SVG hero, and quote workflow are implemented.
- Quote submissions are validated on the client and server, stored in MySQL, and optionally forwarded by email through Resend.
- Local MySQL is configured outside source control and the initial migration has been applied locally.
- Lint and production build passed after the latest database integration.
- Railway deployment is documented but not configured or verified yet.
- Three.js was explicitly skipped.

### Implemented page and sections

Only the `/` page exists as a real content page. It contains:

1. Responsive site header and navigation.
2. Hero with VedTech positioning, CTAs, and interactive workflow SVG.
3. Services section with four cards.
4. Industries section with three cards.
5. Selected case studies section with two placeholder case studies.
6. Feature/ownership section with three cards.
7. Data Control animated flow section.
8. "How VedTech Works" ten-step process section.
9. Multi-step quote/contact form.
10. Site footer.

Separate Services, Industries, Case Studies, How We Work, About, and Contact routes have not been created.

## 2. Technology Stack and Dependencies

Versions below come from `package.json`.

### Runtime dependencies

| Package | Version | Purpose |
| --- | --- | --- |
| `next` | `16.2.6` | App Router framework, server rendering, Server Actions, production build and server. |
| `react` | `19.2.6` | Component and client-state runtime. |
| `react-dom` | `19.2.6` | Browser/server React rendering integration. |
| `typescript` | `5.9.3` (dev) | Static typing for application and configuration code. |
| `tailwindcss` | `4.2.1` (dev) | Responsive utility styling and design token integration. |
| `@tailwindcss/postcss` | `4.2.1` (dev) | Tailwind PostCSS build integration. |
| `tw-animate-css` | `^1.4.0` (dev) | Additional animation utility definitions imported globally. |
| `framer-motion` | `^13.5.0` | Hero, card, reveal, SVG, scroll, and reduced-motion-aware animations. |
| `lucide-react` | `^1.31.0` | UI and visual-system icons. |
| `zod` | `^3.25.76` | Shared client/server quote form validation. |
| `drizzle-orm` | `^0.45.3` | Typed MySQL schema and insert/query layer. |
| `mysql2` | `^3.24.5` | MySQL connection pool and Drizzle driver. |
| `drizzle-kit` | `^0.31.11` (dev) | SQL migration generation and application. |
| `class-variance-authority` | `0.7.1` | Button variant and size definitions. |
| `clsx` | `2.1.1` | Conditional class composition through `cn()`. |
| `tailwind-merge` | `3.6.0` | Resolves conflicting Tailwind classes in `cn()`. |
| `radix-ui` | `^1.6.7` | Slot primitive used by the shared Button component. |
| `@base-ui/react` | `^1.7.0` | Installed UI primitive dependency; no direct application import found. |
| `@shadcn/react` | `^0.3.0` | Installed shadcn support package; no direct application import found. |

### Tooling dependencies

| Package | Version | Purpose |
| --- | --- | --- |
| `eslint` | `9.39.4` | Static linting. |
| `eslint-config-next` | `16.2.6` | Next.js, React, accessibility, and TypeScript lint rules. |
| `@types/node` | `22.19.19` | Node.js TypeScript declarations. |
| `@types/react` | `19.2.14` | React TypeScript declarations. |
| `@types/react-dom` | `19.2.3` | React DOM TypeScript declarations. |

Node.js `>=22.13.0` is declared in `package.json`.

## 3. Folder and File Structure

```text
app/
  actions/quote.ts       Server Action for quote submission
  globals.css            global tokens, layout helpers, reduced motion
  layout.tsx             root metadata, header, footer
  page.tsx               single-page homepage composition and content
  chatgpt-auth.ts        unused legacy authentication helper
components/
  ui/button.tsx          shared Button primitive and variants
  site-header.tsx        desktop nav, Services dropdown, mobile drawer
  site-footer.tsx        footer brand and placeholder links
  hero.tsx               responsive animated SVG hero
  interactive-card.tsx   shared service/industry/case-study/feature card
  card-variants.tsx      CaseStudyCard and FeatureCard wrappers
  data-control.tsx       animated data ownership SVG and mobile fallback
  how-vedtech-works.tsx  ten-step sticky/timeline process section
  quote-form.tsx         multi-step client form and submission states
  section-reveal.tsx     shared while-in-view reveal wrapper
  motion.tsx             reduced-motion-aware generic MotionDiv
  loading.tsx            Skeleton and PageLoading primitives
lib/
  motion.ts              shared motion variants and transitions
  quote-schema.ts        shared Zod form schema
  utils.ts               clsx + tailwind-merge helper
hooks/
  use-reduced-motion.ts  Framer Motion reduced-motion wrapper
  use-mobile.ts          768px mobile media-query hook; currently unused
db/
  schema.ts              MySQL quote_requests schema
  index.ts               server-only pooled MySQL/Drizzle connection
drizzle/
  0000_*.sql             generated initial MySQL migration
  meta/                   Drizzle migration metadata/snapshot
public/                   favicon plus unused starter SVG assets
vendor/                   vendored shadcn Tailwind stylesheet/license
```

### Important root files

- `package.json`: dependency versions and npm scripts.
- `drizzle.config.ts`: MySQL dialect, schema source, and migration output configuration.
- `.env.example`: placeholder-only environment variable documentation.
- `.gitignore`: ignores `.env*`, build output, dependencies, and local tooling state.
- `next.config.ts`: standard Next.js config, currently with no custom options.
- `postcss.config.mjs`: Tailwind PostCSS plugin.
- `tsconfig.json`: strict TypeScript and `@/*` root alias.
- `eslint.config.mjs`: Next core-web-vitals and TypeScript lint configuration.
- `components.json`: shadcn component aliases and Tailwind integration.
- `README.md`: local setup, MySQL/Railway, migrations, and deployment guidance.

## 4. Design System

The primary design definitions are in `app/globals.css`, with section-specific Tailwind classes in components.

### Core colors

- Background: `#020617` (near-black slate/navy).
- Foreground: `#e2e8f0` (soft slate white).
- Border: `rgb(255 255 255 / 10%)`.
- Primary accent: Tailwind `cyan-300`, visually `#67e8f9` in SVG/text usage.
- Secondary accent: indigo (`indigo-300`, `indigo-500`).
- Surfaces: `slate-950` with translucent white overlays.
- Error state: `rose-300`.

### Global tokens and helpers

- CSS custom properties: `--background`, `--foreground`, `--border`.
- Tailwind theme mapping: background, foreground, border, and sans font.
- `.shell-grid`: responsive centered content width capped at `80rem`.
- `.eyebrow`: cyan uppercase label with `0.18em` letter spacing.
- `.section-title`: responsive `clamp(2rem, 5vw, 4rem)` section heading.
- `overflow-x: clip` is set on `html` and `body` to preserve sticky behavior.

### Typography

- Current global font: `Arial, Helvetica, sans-serif`.
- Original brief requested Space Grotesk headings and Inter body, but those fonts are not implemented.
- Hero and section titles use explicit weight, line-height, and tracking utilities.

### Breakpoints

The site uses Tailwind defaults through `sm`, `md`, and `lg` responsive classes:

- `sm`: 640px.
- `md`: 768px.
- `lg`: 1024px.
- `useIsMobile()` also defines mobile as below 768px.

The hero, grids, navigation, process section, data visualization, footer, and form layouts adapt across these breakpoints.

## 5. Motion System

`lib/motion.ts` defines:

- `motionTransition`: 0.45-second transition using `[0.22, 1, 0.36, 1]` easing.
- `fadeUp`: opacity 0/y 16 to opacity 1/y 0.
- `fadeIn`: opacity 0 to opacity 1.
- `cardHover`: card rises 5px.
- `iconHover`: icon moves 4px right and 3px up.

Shared consumers:

- `SectionReveal` uses `fadeUp` with one-time viewport activation.
- `InteractiveCard` uses `cardHover` and `iconHover` plus pointer tilt springs.
- Process steps use `fadeUp` while entering the viewport.
- `MotionDiv` provides a generic reduced-motion-aware wrapper.

### Reduced motion

- Components call Framer Motion's `useReducedMotion()`.
- `hooks/use-reduced-motion.ts` normalizes its nullable result to boolean.
- Hero pointer transforms and scroll transitions become static.
- Card hover/icon motion is disabled or reduced.
- Section reveals use `initial={false}` and no active animation.
- Data Control and process transitions use zero-duration/static behavior.
- Global CSS applies near-zero animation and transition durations and disables smooth scrolling under `prefers-reduced-motion: reduce`.

## 6. Component Inventory

### Header/navigation

`components/site-header.tsx` includes:

- VedTech wordmark.
- Desktop navigation.
- Keyboard-focusable Services dropdown.
- `aria-expanded` and `aria-haspopup` state.
- Escape-key dropdown closing.
- Animated nav underline and hardcoded current-page indicator.
- Mobile menu toggle with accessible label.
- Mobile Services accordion and responsive drawer transition.

### InteractiveCard

`components/interactive-card.tsx` is the common pattern for:

- Service cards on the homepage.
- Industry cards on the homepage.
- `CaseStudyCard` wrappers.
- `FeatureCard` wrappers.

It provides pointer-driven 3D tilt, spring response, animated border/gradient, icon motion, tap state, keyboard focus, reduced-motion handling, and always-visible information.

### Hero

`components/hero.tsx` contains:

- Required VedTech label/headline/supporting text/data-control promise/CTAs.
- Inline SVG business-requirements-to-products workflow.
- VedTech engineering core, Custom Application, ERP, CRM, Mobile App, Web Platform outputs.
- Database, server, and cloud visual cues.
- Desktop pointer parallax.
- Scroll-linked opacity/vertical transition.
- Responsive composition and static reduced-motion state.

### Process section

`components/how-vedtech-works.tsx` implements the ten steps:

Requirement, Discovery, Analysis, Scope, Quotation, Agreement, Development, Testing, Deployment, Support.

- Desktop: sticky left navigation and scrolling right content.
- Active step calculated from element position on normal page scroll.
- Mobile: non-sticky vertical timeline.
- No scroll hijacking; clicking a desktop step uses native `scrollIntoView`.

### Data Control

`components/data-control.tsx` implements:

Business -> Infrastructure -> Application -> Database.

- Desktop/tablet SVG has sequential line and node animation.
- Database node includes a lock icon.
- Mobile uses a lightweight static textual flow.
- SVG has an accessible label.

### Quote form

`components/quote-form.tsx` implements a three-step form, validation states, progress, back/continue controls, pending spinner, success/error messages, and privacy copy.

### Footer

`components/site-footer.tsx` provides the wordmark, short descriptor, and placeholder LinkedIn/email links.

## 7. Quote Form Flow

### Steps

1. **About you:** name and optional phone.
2. **Your project:** project type and message.
3. **Next steps:** email and hidden honeypot field.

### Validation

`lib/quote-schema.ts` is shared by client and server:

- Name: trimmed, 2-100 characters.
- Email: valid email, max 254 characters.
- Phone: optional/empty, max 30 characters.
- Project type: 2-80 characters.
- Message: 10-4000 characters.
- Honeypot `website`: must be empty.

Client validation is scoped to the current form step. The final Server Action validates the full payload again.

### Spam controls

- Hidden `website` honeypot silently accepts and discards bot-like submissions.
- In-memory rate limit allows five attempts per IP per ten minutes.
- IP is derived from `x-forwarded-for`, then `x-real-ip`, then `unknown`.

### Submission order

1. Honeypot check.
2. IP rate-limit check.
3. Server-side Zod validation.
4. Insert into MySQL `quote_requests`.
5. If save succeeds, attempt Resend email notification.

### Error handling

- Database failure: logs the reason server-side, returns an error, sends no email, and preserves client form state.
- Database success/email configuration missing: lead remains saved, server logs the skipped email, and the user receives success.
- Database success/Resend failure: lead remains saved, server logs status/error, and the user receives success.
- Complete success: user receives saved-and-sent confirmation.

## 8. Database

### MySQL schema

`quote_requests` contains:

| Column | Type/behavior |
| --- | --- |
| `id` | Auto-increment integer primary key. |
| `name` | `varchar(100)`, required. |
| `email` | `varchar(254)`, required. |
| `phone` | `varchar(30)`, nullable. |
| `project_type` | `varchar(80)`, required. |
| `message` | `text`, required. |
| `status` | `varchar(32)`, required, defaults to `new`. |
| `created_at` | Timestamp, required, defaults to current time. |

### Connection setup

`db/index.ts`:

- Is guarded by `server-only`.
- Reads only `DATABASE_URL` from the server environment.
- Uses `mysql2/promise` connection pooling.
- Pool settings include connection limit 10, max idle 10, 60-second idle timeout, and keepalive.
- Reuses the pool through `globalThis` during development hot reload.
- Exposes a typed Drizzle instance with the project schema.

### Migrations

- Dialect: MySQL.
- Schema source: `db/schema.ts`.
- Migration output: `drizzle/`.
- Current initial migration creates `quote_requests`.
- Drizzle tracks applied migrations in `__drizzle_migrations`.

## 9. Environment Variables

Only names and purposes are listed:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Server-only MySQL connection URL used by the app and Drizzle migrations. |
| `RESEND_API_KEY` | Server-only credential for Resend email delivery. |
| `QUOTE_TO_EMAIL` | Destination inbox for quote notifications. |
| `QUOTE_FROM_EMAIL` | Verified sender identity used by Resend. |

`.env.example` contains placeholders. Local `.env` is ignored by Git and must never be committed.

## 10. Scripts and Local Run Steps

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `next dev` | Runs frontend and backend Server Actions together. |
| `build` | `next build` | Creates the production `.next` build. |
| `start` | `next start` | Runs the production build. |
| `lint` | `eslint .` | Runs repository lint checks. |
| `db:generate` | `drizzle-kit generate` | Generates migration SQL from schema changes. |
| `db:migrate` | `drizzle-kit migrate` | Applies pending migrations to `DATABASE_URL`. |

### Normal local development

```powershell
cd D:\VedaTech
npm run dev
```

Open `http://localhost:3000`. MySQL must be running separately as a local Windows service.

### First setup or schema change only

```powershell
npm run db:generate
npm run db:migrate
```

Migrations are not a daily startup command. The local environment currently uses a separate local database; its credentials remain only in the ignored `.env` file.

## 11. Short Changelog

### Phase 1

- Initialized Next/TypeScript/Tailwind project foundation.
- Added VedTech tokens, responsive shell, header, mobile drawer, footer, grids, loading components, and motion utilities.

### Phase 2

- Added reusable InteractiveCard behavior for services, industries, case studies, and features.
- Added button/nav/link interactions, desktop Services dropdown, mobile Services accordion, and form micro-interactions.
- Replaced horizontal overflow hiding with `overflow-x: clip`.

### Phase 3

- Added ten-step scroll-aware process section.
- Added animated Data Control SVG and mobile fallback.
- Added shared section reveal behavior.

### Phase 4

- Added responsive interactive SVG hero with pointer and scroll response.
- Added static/reduced-motion behavior and no Three.js dependency.

### Phase 5 and cleanup

- Ran lint/build and static QA scans.
- Removed unused starter dependencies/components.
- Migrated from Vinext/Cloudflare tooling to standard Next.js.
- Documented standard Vercel/Azure/VPS deployment.

### Backend/database work

- Added shared Zod validation, honeypot, rate limiting, Server Action, Resend delivery, and clear form states.
- Added MySQL, Drizzle schema, migration scripts, connection pooling, and DB-first submission semantics.
- Generated and applied the initial local migration.
- Established a local database separate from the existing unrelated local project database.

## 12. Known Issues, Risks, and TODOs

### Content and routing

- Navigation and footer links mostly use `href="#"`; they do not navigate to real routes/sections.
- Current-page navigation state is hardcoded rather than derived from pathname/section.
- Get a Quote and hero CTA buttons do not currently navigate or scroll to the form.
- Separate requested pages are missing.
- Case studies, industries, service descriptions, and social/contact links are placeholder content.
- Some source text previously showed encoding artifacts such as `·`, `→`, or `↗`; these have been normalized.

### Design and frontend

- Space Grotesk and Inter are not implemented; Arial is used globally.
- `app/page.tsx` is a Client Component because icon components are passed into client cards. This increases client-side JavaScript compared with a server-composed page.
- `@base-ui/react` and `@shadcn/react` appear installed but unused directly.
- `hooks/use-mobile.ts`, `components/motion.tsx`, `components/loading.tsx`, `app/chatgpt-auth.ts`, and several default public SVGs appear unused.
- Browser-based visual QA across all requested viewports has not been completed in a stable automated browser session.
- Color contrast was reviewed structurally but has not been measured with an automated contrast/a11y audit.

### Interaction/accessibility

- Desktop dropdown closes on Escape but does not implement full menu arrow-key navigation, focus return, click-outside close, or focus trapping.
- Interactive cards are focusable articles but their “Learn more” labels are not real links/actions.
- Process scroll tracking attaches a raw window scroll listener and recalculates all step positions on every scroll event.
- Touch-card `onPointerEnter` logic should be reviewed for intended state behavior.

### Backend/security/operations

- Rate limiting is process-memory-only. It resets on restart and is not shared across Railway replicas; a durable limiter is required for production-grade abuse protection.
- The honeypot intentionally returns success without saving, which is correct for bots but not independently observable.
- No CSRF/origin enforcement beyond Server Action framework behavior has been added.
- Email delivery has no retry queue; a saved lead with failed email relies on database review and server logs.
- No admin interface exists for reading/updating quote status.
- No automated form, Server Action, database, or migration tests exist.
- `drizzle.config.ts` contains a non-secret placeholder fallback URL. Safer operational behavior would be to fail immediately when `DATABASE_URL` is absent.
- No database backup/restore scripts or pre-migration production checklist are implemented yet.
- Railway database isolation has been planned/documented but not configured or tested.
- No uploads feature or environment-specific upload directory exists.
- No admin creation/seeding logic exists; therefore no current account-reset risk exists.

## 13. Original Requirements Status

| Area | Status | Notes |
| --- | --- | --- |
| Responsive layout | Mostly complete | Responsive hero, grids, nav, cards, process, data flow, form, and footer exist. Automated browser QA remains outstanding. |
| Dark premium VedTech visual direction | Complete foundation | Near-black slate, cyan/indigo accents, restrained rectangular surfaces. Requested fonts are missing. |
| Homepage content order | Partially complete | Core sections exist, but order differs from the original brief and full final CTA/footer detail is minimal. |
| Multi-page site | Incomplete | Only `/` and framework `/_not-found` exist. |
| Hover/card interaction | Complete foundation | Shared tilt, glow, border, icon, tap, focus, and reduced-motion behavior. Some card actions are placeholders. |
| Navigation interactions | Mostly complete | Dropdown, mobile accordion, transitions, underline, and Escape support exist. Full menu keyboard model and real destinations are missing. |
| Form interactions | Complete foundation | Three steps, progress, validation, pending/success/error states, privacy promise. |
| Form backend | Implemented | Zod, honeypot, rate limit, MySQL-first persistence, Resend-after-save semantics. Production hardening remains. |
| Scroll experiences | Implemented | Process active state/sticky layout and data-flow activation use normal scrolling with no hijack. |
| Section reveals/stagger | Partially complete | Shared reveal exists and process steps reveal; card grids do not currently use a true shared parent stagger variant. |
| Interactive SVG hero | Implemented | Desktop pointer and scroll response, responsive SVG, reduced-motion fallback. Tablet/mobile simplification is primarily layout/SVG scaling rather than a separate mobile graphic. |
| 3D/Three.js | Intentionally not implemented | User explicitly requested Three.js be skipped. CSS/Framer perspective provides subtle depth. |
| Reduced motion | Implemented | Component-level Framer checks plus global CSS fallback. |
| Performance | Partially addressed | Inline SVG avoids external hero media and build passes; no current Lighthouse, Web Vitals, or route bundle optimization report. Client-only homepage is a known cost. |
| Accessibility | Partially addressed | Semantic headings, labels, focus states, ARIA, Escape support, and reduced motion exist. Automated screen-reader/axe/contrast testing remains. |
| Horizontal overflow | Addressed structurally | Bounded shell, responsive grids, min-width guards, and `overflow-x: clip`; full live viewport sweep remains to be rerun after later changes. |
| Loading states | Implemented primitives | Skeleton/PageLoading exist but are not wired to a route-level `loading.tsx`. |
| Environment isolation | Local complete, Railway pending | Local MySQL has a separate database/user. Railway must receive its own database and environment variables and then be verified. |

## Recommended Next Work

1. Finish and verify local quote submission end to end.
2. Add real section IDs/routes and wire every navigation/CTA/footer destination.
3. Fix source encoding artifacts and implement Space Grotesk/Inter.
4. Add automated tests for validation, DB-first semantics, and email-failure success behavior.
5. Replace in-memory rate limiting before public production use.
6. Run automated browser, accessibility, contrast, and performance audits across requested widths.
7. Configure Railway with a separate MySQL service and verify host/database isolation without logging credentials.

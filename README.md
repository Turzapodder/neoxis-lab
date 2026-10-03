# neoxis® — Creative Design Agency

A bold, animation-heavy agency site built with **Next.js 16 (App Router + Turbopack)**, React 19
and Tailwind CSS v4. Originally a Vite SPA, now fully migrated with real routes and dynamic,
per-page SEO.

## ✨ Features

- **Landing page** — hero with project slider, studio section with scroll-driven flying cards,
  selected work 3D deck, services accordion, team showcase, process, testimonials, pricing,
  FAQ, and contact form
- **Case study pages** — `/project/[id]`, rendered from CMS data
- **Legal pages** — `/terms-and-conditions` and `/privacy-policy` with search, a live table of
  contents, print and share (short links `/terms` and `/privacy` redirect)
- **Shared site chrome** — one fixed navbar on every public page that turns into a frosted
  glass bar on scroll, plus a shared footer and menu drawer
- **Admin CMS** — secure login, CRM-style dashboard with sidebar, per-section editors; every
  landing section's content is editable without touching code
- **MongoDB store** — content and admin users persist to MongoDB, with an automatic JSON-file
  fallback when the database is unreachable
- **Image uploads** — reusable Cloudinary uploader with automatic local fallback in dev
- **Dynamic SEO** — per-page metadata, JSON-LD structured data, dynamic OG images, sitemap, robots
- **AI assistant** — floating "Ask AI" copilot grounded in the site's own data (services, pricing,
  projects, team, FAQs), powered by Groq with a zero-key local fallback
- **Cookie consent** — first-visit modal, choice persisted in localStorage
- **Polish layer** — Lenis smooth scrolling, GSAP scroll animations, custom cursor and click
  ripples (all reduced-motion aware)

## 🔐 Admin CMS

| Route | Purpose |
| ----- | ------- |
| `/admin/login` | Sign-in (session cookie, 7-day expiry) |
| `/admin` | Dashboard: jump into any content section |
| `/admin/sections/[key]` | Edit items: reorder, add, remove, upload images |
| `/admin/password` | Change the admin password |

**Sections managed:** Hero slider, Stats bar, Selected Work projects, Services (incl. showcase
slides), Team, Testimonials, Pricing plans, FAQs.

Edits persist to **MongoDB** (`MONGO_URL`; database defaults to `neoxis`, collections
`cms_sections` / `cms_users` / `cms_meta`) and appear on the public site immediately. If the
database is unreachable, the store transparently falls back to `data/cms.json` so the admin
panel and site keep working offline. Initial admin credentials come from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` env vars — set them before first launch, then change the password from the
dashboard.

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `MONGO_URL` | recommended | MongoDB connection string for the CMS store; JSON fallback used when unreachable |
| `MONGODB_DB` | optional | Database name (defaults to `neoxis`) |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical URL for SEO; defaults to `https://neoxis.design` |
| `AUTH_SECRET` | **production** | Signs admin session cookies — generate a strong random value |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | first run | Seeds the initial admin account |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | optional | Image uploads; without them uploads save to `public/uploads` (dev only) |
| `GROQ_API_KEY` | optional | Enables the LLM-powered AI copilot; without it a smart local fallback answers from site data |

Create a `.env.local` file to set them.

## 📜 Scripts

| Command         | Action                                    |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start dev server (Turbopack)              |
| `npm run build` | Production build (Turbopack)              |
| `npm start`     | Serve the production build                |
| `npm run lint`  | Oxlint                                    |

## 🗺 Routes

| Route | Type | Description |
| ----- | ---- | ----------- |
| `/` | Dynamic | Landing page — all content from the CMS |
| `/project/[id]` | Dynamic | Case studies rendered from CMS projects |
| `/terms-and-conditions` | Static | Terms & Conditions (`/terms` redirects here) |
| `/privacy-policy` | Static | Privacy Policy (`/privacy` redirects here) |
| `/admin/**` | Guarded | Admin CMS (redirects to login without a session) |
| `/sitemap.xml` | Dynamic | Generated from CMS + template projects |
| `/robots.txt` | Static | Points crawlers at the sitemap |
| `/api/og` | Dynamic | Branded OG image cards (`?title=&subtitle=&tag=`) |
| `/api/ai-chat` | Dynamic | AI copilot endpoint (Groq cascade → local fallback) |
| `/api/content` | Dynamic | Public read-only JSON of all CMS content |
| `/api/admin/**` | Guarded | Auth + sections CRUD + image upload (401 without session) |

**Security:** `src/proxy.ts` (Next.js 16's middleware convention) intercepts every `/admin` page
and `/api/admin` request, verifying the HMAC-signed session cookie before anything renders —
login/logout endpoints excepted. Passwords are scrypt-hashed; sessions are `httpOnly`,
`sameSite=lax`, and `secure` in production.

## 🔍 Dynamic SEO

- Per-page `generateMetadata` with canonicals, Open Graph and Twitter cards
- Project pages statically pre-rendered; per-project metadata and OG images derived from data
- JSON-LD structured data: `Organization`, `WebSite`, per-project `CreativeWork`, `FAQPage`
- Dynamic OG images rendered on demand at `/api/og`
- `sitemap.xml` and `robots.txt` derived from the same project data

Set `NEXT_PUBLIC_SITE_URL` in production so canonicals, sitemap and OG URLs resolve to your domain.

## 🧱 Project structure

```
src/
├── proxy.ts              # Route guard for /admin + /api/admin (Next 16 middleware)
├── app/                  # Next.js App Router (routes, metadata, API endpoints)
│   ├── layout.tsx        # Root layout: fonts, JSON-LD, global overlays
│   ├── (site)/           # Public pages; layout.tsx adds the shared navbar, footer and menu
│   │   ├── page.tsx      # Home route (loads CMS content)
│   │   ├── project/[id]/ # Case study route (CMS tile over the bundled narrative)
│   │   ├── terms-and-conditions/ & privacy-policy/
│   ├── admin/            # CMS: login, dashboard, section editors, password
│   ├── api/admin/        # Auth, sections CRUD, upload (Express-style handlers)
│   ├── api/og/           # Dynamic OG image generation
│   ├── api/ai-chat/      # AI copilot backend (Groq)
│   ├── api/content/      # Public read-only content JSON
│   ├── sitemap.ts        # robots/sitemap generation
│   └── robots.ts
├── server/               # CMS core: auth, MongoDB store (JSON fallback), section registry,
│                         #   validation, content getters, Cloudinary upload
├── views/                # Page compositions (LandingPage, ProjectDetails, legal pages)
├── components/
│   ├── content/          # ContentProvider — CMS data bridge for all sections
│   ├── sections/         # Page sections (landing, ProjectDetails, Legal)
│   ├── layout/           # SiteLayout, Navbar, Footer
│   ├── modals/           # Menu, Connect, Cookie consent
│   └── icons/ & ui/      # Shared primitives
├── layout/               # Global overlays: custom cursor, click ripples, AI copilot
├── config/site.ts        # Brand identity + SEO defaults (single source of truth)
├── data/                 # Static fallback content (bundled seed)
├── hooks/                # Scroll, carousel, accordion, clipboard, media queries…
├── lib/                  # gsap/lenis setup, SEO builders, JSON-LD, image barrel
├── types/                # Shared content types
└── utils/                # Formatting & scroll helpers

data/cms.json             # Runtime CMS store (git-ignored; seeded on first run)
public/images/            # Seed images the CMS references
```

Editing content in `/admin` updates the landing sections, contact-form chips, case-study pages,
sitemap, and the AI assistant's knowledge in one place. `src/data/*` remains as the bundled
fallback so the site renders even before the CMS is seeded.

## 🛠 Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4, custom CSS variables and keyframes
- **Animation:** GSAP (ScrollTrigger), Lenis smooth scroll, Framer Motion (AI widget)
- **AI:** Vercel AI SDK + Groq (`openai/gpt-oss-120b` → `gpt-oss-20b` → `compound-mini` cascade)
- **Quality:** Oxlint, strict TypeScript

## 🚢 Deployment

Any Next.js-capable host (Vercel, Netlify, self-hosted) works out of the box:

```bash
npm run build
npm start
```

Remember to set `NEXT_PUBLIC_SITE_URL` and `GROQ_API_KEY` in the host's environment settings.

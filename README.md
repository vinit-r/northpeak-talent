# Northpeak Talent — marketing website

React 18 + TypeScript + Vite site for Northpeak Talent, an India-based IT recruitment, staffing and payroll company (Indore, India).

**Stack:** Tailwind CSS (CSS-variable tokens) · React Router (code-split routes) · react-hook-form + zod · react-helmet-async · framer-motion (respects reduced motion) · lucide-react · ESLint + Prettier · Google Apps Script backend for forms.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional in development
npm run dev                    # http://localhost:5173
```

Without `VITE_FORM_ENDPOINT`, form submissions are logged to the browser console in development (nothing is sent).

| Script                            | What it does                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`                     | Dev server                                                                           |
| `npm run build`                   | Typecheck + production build to `dist/` (**fails if sample mode is on**)             |
| `npm run build:staging`           | Build in `staging` mode, for previews that may show sample content (robots: noindex) |
| `npm run preview`                 | Serve the last build locally                                                         |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                                    |
| `npm run assets`                  | Regenerate the self-hosted Inter font, PNG icons and `og-image.png` in `public/`     |

## Environment variables

| Variable                   | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `VITE_FORM_ENDPOINT`       | Google Apps Script Web App URL (ends in `/exec`)                 |
| `VITE_TURNSTILE_SITE_KEY`  | Optional Cloudflare Turnstile site key. Leave empty to disable   |
| `VITE_SHOW_SAMPLE_CONTENT` | `true` loads `src/content/sample/*` and shows a "Preview" ribbon |

### Sample content mode (beta preview)

- `VITE_SHOW_SAMPLE_CONTENT=true` → testimonials, client tiles and stats come from `src/content/sample/*.sample.ts`, a yellow **Preview** ribbon appears in the header and every page gets `noindex`.
- Otherwise only entries with `approved: true` in `src/content/testimonials.ts`, `clients.ts` and `stats.ts` render. Sections with no approved entries are hidden automatically.
- `npm run build` (mode `production`) **throws a clear error** if sample mode is on, so preview content can never be deployed live. Use `npm run build:staging` for preview deploys.

---

## Project structure

```
src/
  config/      site.ts (company facts), navigation.ts, routes.ts, forms.ts
  content/     all business copy: services, process, markets, techStacks, industries, faqs,
               founders, placements, testimonials, clients, stats, caseStudies, copy (page text),
               legal (Privacy / Terms / Fraud notice), showcase.ts (sample vs approved switch)
    sample/    *.sample.ts — preview-only content
  components/
    layout/    Header, Footer, ThemeToggle, MobileNav, CookieBanner, Seo, Layout, Logo
    ui/        Button, Card, Section, Badge, Input, Textarea, Select, FileInput, Checkbox,
               Accordion, Toast, Reveal, Flag, Avatar, Icon
    sections/  Hero, ServicesGrid, ProcessSteps, MarketsServed, TechStacks, WhyUs, PricingApproach,
               FoundersTeaser, PlacementsStrip, Testimonials, StatsBar, CTA, MapEmbed, FAQ, PageHeader
    forms/     EnquiryForm, ResumeForm, zod schemas, Turnstile
  pages/       Home, About, Services, ServiceDetail, Industries, ForCandidates, Contact,
               Privacy, Terms, FraudNotice, NotFound
  hooks/       useTheme, useConsent, useSubmitForm
  lib/         utils, seo (JSON-LD builders), submitForm, icons
apps-script/   Code.gs + appsscript.json (form backend)
public/        logos, icons, og-image.png, fonts/, logos/ (client logos)
```

`sitemap.xml` and `robots.txt` are generated at build time from `src/config/routes.ts` and `src/content/services.ts`. You don't need to edit them by hand.

---

## How to edit content

Components contain layout only. To change wording or data, edit these files:

| To change…                                                                                                          | Edit                                                                                            |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Company name, emails, phone, WhatsApp, social links, address, map, registrations (CIN/GST/MSME/MEA), business hours | `src/config/site.ts`                                                                            |
| Header / footer links                                                                                               | `src/config/navigation.ts`                                                                      |
| Hero, Why us, pricing approach, About story, page intros, SEO titles/descriptions                                   | `src/content/copy.ts`                                                                           |
| Services (and their detail pages)                                                                                   | `src/content/services.ts`. Add an entry and a page plus a sitemap URL are created automatically |
| Process steps, markets, tech stacks, industries, FAQs                                                               | the matching file in `src/content/`                                                             |
| Founders' bios / photos                                                                                             | `src/content/founders.ts` (add a WebP photo to `public/` and set `photo`)                       |
| Testimonials, client tiles, stats                                                                                   | `src/content/testimonials.ts`, `clients.ts`, `stats.ts`. Set `approved: true` to publish        |
| Privacy Policy, Terms, Fraud Notice                                                                                 | `src/content/legal.ts` (have a lawyer review before launch)                                     |
| Form dropdown options (experience, notice period)                                                                   | `src/config/forms.ts`                                                                           |

Empty strings in `site.ts` (phone, WhatsApp, social links, registrations) are hidden in the UI and in JSON-LD.

**Client tiles:** entries without a `logo` render as styled text tiles. Set `logo: '/logos/<file>.svg'` (file in `public/logos/`) to show an image instead. Only use brand logos where you are comfortable doing so; trademark guidelines vary by company.

**Before launch, check:** `site.url`, `legalName`, `office.streetAddress`/`postalCode`, `mapEmbedUrl`, phone/WhatsApp, the `approved` flags, and the legal text.

---

## Google Apps Script setup (forms → Sheet + Drive + email)

1. **Create a Google Sheet** (e.g. "Northpeak Website Leads") and copy its ID from the URL: `docs.google.com/spreadsheets/d/<SHEET_ID>/edit`.
2. **Create a private Drive folder** for resumes and copy its ID: `drive.google.com/drive/folders/<DRIVE_FOLDER_ID>`.
3. Open the Sheet → **Extensions → Apps Script**. Replace `Code.gs` with `apps-script/Code.gs`. In **Project Settings**, tick "Show appsscript.json" and paste `apps-script/appsscript.json`.
4. **Project Settings → Script Properties**, add:
   - `SHEET_ID`, `DRIVE_FOLDER_ID`
   - `NOTIFY_EMAIL` (team address, comma-separate several)
   - `TURNSTILE_SECRET` (only if using Turnstile)
5. In the editor, select the `setup` function → **Run**. Approve the permissions. This creates the **Enquiries** and **Candidates** tabs.
6. **Deploy → New deployment → Web app**: _Execute as_ **Me**, _Who has access_ **Anyone**. Copy the `/exec` URL into `VITE_FORM_ENDPOINT`.
7. Open the `/exec` URL in a browser. It should return `{"ok":true,...}`.
8. After code changes: **Deploy → Manage deployments → Edit → New version**. The URL stays the same.

The script checks the honeypot, minimum fill time, optional Turnstile and a per-email hourly rate limit. It validates required fields, then re-validates the resume server-side (extension, MIME type, ≤5 MB, file signature). It guards against spreadsheet formula injection and emails the team with Reply-To set to the submitter. MailApp's daily quota is 100 emails on free accounts and 1,500 on Workspace.

### Optional: Cloudflare Turnstile

Create a Turnstile widget for your domain. Set `VITE_TURNSTILE_SITE_KEY` in the site's env, and the secret as `TURNSTILE_SECRET` in Script Properties.

---

## Deploy

### Vercel

1. Import the repo. Framework preset **Vite**. Build `npm run build`, output `dist`.
2. Add env vars (`VITE_FORM_ENDPOINT`, optional `VITE_TURNSTILE_SITE_KEY`) for **Production**. Keep `VITE_SHOW_SAMPLE_CONTENT` unset or `false`.
3. For preview deployments that should show sample content, set the **Preview** environment's build command to `npm run build:staging` and `VITE_SHOW_SAMPLE_CONTENT=true`.
4. `vercel.json` already handles SPA rewrites, caching and security headers.

### Netlify

`netlify.toml` is included: production runs `npm run build`, while deploy previews and branch deploys run `npm run build:staging`. Add the env vars under **Site settings → Environment variables**. `public/_redirects` handles SPA routing.

---

## Quality notes

- **Performance:** routes are lazy-loaded; vendor code is split into react / motion / forms chunks; the Inter variable font is self-hosted and preloaded; images are lazy; Google Maps loads only on consent or click. Use WebP for any photos you add.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, labelled form fields with `aria-invalid`/`aria-describedby`, live-region toasts, keyboard-trappable mobile menu (Esc closes), and colours meeting WCAG AA (a darker teal `accent-fg` is used for text in light mode).
- **Theme:** follows the system by default. The toggle choice is saved in `localStorage` (wrapped in try/catch), and an inline script in `index.html` applies it before first paint, so there's no flash.
- **SEO:** per-page title/description/canonical/Open Graph via `<Seo>`; Organization + EmploymentAgency (LocalBusiness) JSON-LD from `site.ts`; FAQPage, Service and Breadcrumb JSON-LD where relevant.
- **Privacy:** essential-only storage by default; cookie banner offers "Essential only" or "Allow embeds".
#   N o r t h p e a k - T a l e n t  
 
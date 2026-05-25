# Spotlights

A careers platform connecting Thailand's university students and new grads with
internships, jobs, and employers — **Handshake-style functionality with a
[Wellfound](https://wellfound.com)-inspired, amber-themed UI.**

This is the **frontend-only v1**: all data is mock data, there is no backend or
auth yet. It is structured so a Supabase backend can be dropped in without
touching the UI (see [Backend](#backend-supabase-later)).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **shadcn-style primitives** built on **Radix UI** + `class-variance-authority`
- **Framer Motion** for entrance/scroll animations
- **lucide-react** icons, **Inter** + **JetBrains Mono** via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checked)
npm start        # serve the production build
```

## Design system

Wellfound-referenced layout/feel with a **Spotlight amber** brand. Tokens live in
`src/app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--accent` | `#F5A623` | brand fills (always with dark text on top) |
| `--accent-strong` | `#B45309` | amber **text/links** on white (WCAG AA safe) |
| `--accent-soft` | `#FFF7EC` | tinted backgrounds |
| `--foreground` | `#1A1A1A` | text |
| `--surface` / `--background` | `#FAFAFA` / `#FFF` | sections |

> Accessibility rule: `#F5A623` only passes contrast as a **fill** (dark text on
> top) or for large/graphical elements. For amber **text** on white, use
> `text-accent-strong`.

## Project structure

```
src/
  app/
    page.tsx              # landing page (hero + sections)
    (site)/               # public app: jobs, companies, events, employers
    (app)/                # signed-in shell: dashboard, profile
    (auth)/               # login, signup (split-screen)
  components/
    ui/                   # primitives: button, card, badge, input, tabs, select, avatar…
    marketing/            # hero, navbar, footer, sections, reveal
    cards/                # job-card, company-card, event-card
    jobs/ companies/ events/ auth/ app/   # feature components
  lib/
    types.ts              # domain types (mirror future Supabase tables)
    data.ts               # ← THE DATA ACCESS LAYER (only seam the UI talks to)
    mock/                 # in-memory mock data (companies, jobs, events, student)
    utils.ts              # cn(), formatTHB()
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero, featured jobs, categories, testimonials) |
| `/jobs`, `/jobs/[slug]` | Job feed with filters + job detail |
| `/companies`, `/companies/[slug]` | Company directory + profile |
| `/events`, `/events/[slug]` | Career events + detail |
| `/employers` | Employer marketing page |
| `/login`, `/signup` | Auth UI (no real auth) |
| `/dashboard`, `/profile` | Signed-in student views |

## Backend (Supabase, later)

The UI imports data **only** from `src/lib/data.ts` — never from `lib/mock/*`
directly. To go live:

1. Create Supabase tables mirroring `src/lib/types.ts`.
2. Add a Supabase client and swap each function body in `lib/data.ts` for a query
   (make them `async`; pages already `await` where needed).
3. Replace the local-state actions (`JobActions`, `RegisterButton`, `AuthForm`)
   with real mutations / Supabase Auth.

`.env.example` lists the env vars you'll add then. No Supabase keys are required
to run this build.

## Notes

- `playwright` is a **devDependency** used only for screenshot verification
  (`shot.mjs` is git-ignored). Remove if unwanted.
- UI is in English with Thai context in mock content (Bangkok, Thai universities,
  THB salaries).

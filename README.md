# Éconofitness Gym QR Guide (unofficial demo)

**QR machine-instruction app skinned for an Éconofitness club demo.** Members scan a QR on a machine → bilingual (EN/FR) how-to guide. Staff manage machines, download QRs, and print floor sheets.

> **Unofficial demo mockup for pitching only.** Not affiliated with Éconofitness / Énergie Cardio. Does **not** use official logo image assets — text wordmark only. Brand yellow (`#EEAF00`) approximated from public CSS on [econofitness.ca](https://econofitness.ca).

Seeded demo gym: **Éconofitness Montréal — Salaberry**.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- SQLite via Prisma
- `qrcode` for QR generation
- `html5-qrcode` camera scan + manual token/URL fallback
- Cookie JWT auth (`jose` + `bcryptjs`)
- Member **Workout** tracker (client-side `localStorage`, keyed by gym slug — no login)

## Quick start

```bash
cd econofitness-gym-qr-guide
cp .env.example .env
npm install
npx prisma db push
npm run seed
npm run dev
```

Or one-shot setup:

```bash
npm install && npm run setup && npm run dev
```

Production build check:

```bash
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000) — you land **inside the member gym home** for Éconofitness Montréal — Salaberry (Machines / Workout / Progress / Scan). No marketing / SaaS pitch landing page.

### Environment

Copy `.env.example` → `.env`:

| Variable       | Purpose                                      |
|----------------|----------------------------------------------|
| `DATABASE_URL` | SQLite path, default `file:./dev.db`         |
| `AUTH_SECRET`  | JWT signing secret                           |
| `APP_URL`      | Base URL used in QR codes (default localhost)|

> **QR tip:** Set `APP_URL` to your public URL before printing QRs for a real gym floor.

## Demo login

| Field    | Value                         |
|----------|-------------------------------|
| Email    | `admin@econofitness.demo`     |
| Password | `demo1234`                    |
| Gym      | Éconofitness Montréal — Salaberry |

Seed creates **10 bilingual machines** (Lat Pulldown, Seated Row, Leg Press, Chest Press, Shoulder Press, Triceps Pushdown, Leg Curl, Cable Crossover, Smith Squat, Treadmill).

## Branding notes

- Black `#000000` surfaces with brand yellow primary **`#EEAF00`** (from public CSS on econofitness.ca)
- Sparing pink accent `#DA1984`; secondary gray `#353535`; light `#EFEFEF`; white `#FFFFFF`
- Yellow CTAs with black button text
- Subtle bilingual home taglines: EN “Super nice gyms, very low prices” / FR “Super beaux gyms, très bas prix”
- Text wordmark **Éconofitness** (accent on É) — no trademarked logo files


## Demo machine photos

Demo photos under `public/machines/` are from Unsplash (free license) — see [CREDITS.md](./CREDITS.md). Not official Éconofitness assets.

## Machine media & ROI insights

- **Machine.imageUrls** — optional JSON array of up to 3 HTTPS or relative image URLs. Staff paste them in create/edit; member guides show a horizontal media strip (or a pitch-ready “Add photos in admin” empty state).
- **`/admin/insights`** — owner ROI dashboard: total views, open vs resolved issues, top machines by views, and zero-view content gaps. Uses real Prisma data only.

## Key routes

| Route | Who | Description |
|-------|-----|-------------|
| `/` | Members | **Gym member home** — tabs: Machines · Workout · Progress · Scan (+ enter code) |
| `/?tab=workout` | Members | Log sets/reps (strength) or duration (cardio); in-progress persists in localStorage |
| `/?tab=progress` | Members | Per-machine progress from **saved** workouts (localStorage history) |
| `/scan` | Members | Dedicated camera QR scan + manual entry |
| `/q/[token]` | Members | Machine guide (opaque QR target) |
| `/m/[gymSlug]/[machineSlug]` | Members | Friendly slug URL (e.g. `/m/econofitness-montreal/lat-pulldown`) |
| `/admin/login` | Staff | Admin login (subtle Staff link on member home) |
| `/admin` | Staff | Machine list, views, QR download |
| `/admin/machines/new` | Staff | Create machine |
| `/admin/machines/[id]/edit` | Staff | Edit machine |
| `/admin/print` | Staff | Printable QR sheet (browser print / PDF) |
| `/admin/insights` | Staff | Owner ROI dashboard (views, issues, content gaps) |
| `/admin/issues` | Staff | Member-reported issues |

### APIs (selected)

- `POST /api/auth/login` · `POST /api/auth/logout`
- `POST /api/machines` · `PUT/DELETE /api/machines/[id]`
- `GET /api/machines/[id]/qr` · issues CRUD

## Workout tracker & progress (members)

On the home tabs, **Workout** lets members log a session from the same active machines as the QR list:

- **Strength** (`category !== "Cardio"`): multiple sets with required reps + optional weight (kg).
- **Cardio** (e.g. treadmill): minutes + seconds, optional distance (km).
- In-progress workout survives refresh via `localStorage` key `econofitness-workout:v1:<gymSlug>`.
- **Save** stores a completed workout (timestamp + exercises) in history key `econofitness-workout-history:v1:<gymSlug>`, then opens **Progress**. Finish/Clear still discard the in-progress session without saving.
- **Progress** dashboard: per machine used at least once — times used, last used, strength volume hints (last sets, heaviest weight, total sets) or cardio durations (last / best / total), plus a short recent history. Empty state when nothing is saved yet. No member login (demo localStorage only).
- Machine guides also offer **Add to workout**.

## Pitch walkthrough

1. Open `/` — member is “at” Éconofitness Montréal — Salaberry.
2. Browse a machine, open **Workout** to log sets, **Save** when done, check **Progress**, or use Scan / Enter code.
3. Staff → `/admin/login` with demo credentials.
4. Admin: edit machines, download QR PNGs, print floor sheet, triage issues.

## License / affiliation

This repository is an **unofficial product demo mockup** for pitch purposes. Éconofitness® and related marks belong to their respective owners. Do not represent this app as an official Éconofitness product.

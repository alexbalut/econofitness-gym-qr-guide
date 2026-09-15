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

Open [http://localhost:3000](http://localhost:3000) — you land **inside the member gym home** for Éconofitness Montréal — Salaberry (scan / enter code / browse machines). No marketing / SaaS pitch landing page.

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

## Key routes

| Route | Who | Description |
|-------|-----|-------------|
| `/` | Members | **Gym member home** — branding, scan / enter code, browsable machine list |
| `/scan` | Members | Dedicated camera QR scan + manual entry |
| `/q/[token]` | Members | Machine guide (opaque QR target) |
| `/m/[gymSlug]/[machineSlug]` | Members | Friendly slug URL (e.g. `/m/econofitness-montreal/lat-pulldown`) |
| `/admin/login` | Staff | Admin login (subtle Staff link on member home) |
| `/admin` | Staff | Machine list, views, QR download |
| `/admin/machines/new` | Staff | Create machine |
| `/admin/machines/[id]/edit` | Staff | Edit machine |
| `/admin/print` | Staff | Printable QR sheet (browser print / PDF) |
| `/admin/issues` | Staff | Member-reported issues |

### APIs (selected)

- `POST /api/auth/login` · `POST /api/auth/logout`
- `POST /api/machines` · `PUT/DELETE /api/machines/[id]`
- `GET /api/machines/[id]/qr` · issues CRUD

## Pitch walkthrough

1. Open `/` — member is “at” Éconofitness Montréal — Salaberry.
2. Browse a machine or use Scan / Enter code.
3. Staff → `/admin/login` with demo credentials.
4. Admin: edit machines, download QR PNGs, print floor sheet, triage issues.

## License / affiliation

This repository is an **unofficial product demo mockup** for pitch purposes. Éconofitness® and related marks belong to their respective owners. Do not represent this app as an official Éconofitness product.

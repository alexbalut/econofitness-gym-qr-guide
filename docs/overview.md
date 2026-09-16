# Overview

> **Unofficial demo.** Not affiliated with Éconofitness / Énergie Cardio. Text wordmark and approximate brand yellow only — no official logos.

## What it is

**Éconofitness Gym QR Guide** is the same B2B QR machine-instruction product as [GymQR Guide](https://github.com/alexbalut/gym-machine-qr-guide), skinned for a pitch conversation about an Éconofitness-style Montréal club.

Members scan a QR → bilingual (EN/FR) how-to guide. Staff manage content, print QR sheets, triage issues, and view a simple ROI dashboard.

The home route `/` is the **member product UI** for **Éconofitness Montréal — Salaberry** — browse machines, workout, progress, scan. There is **no marketing / SaaS landing page**.

## Problem it solves

- Members unsure how to use machines safely
- Staff repeating the same floor explanations
- Stale paper posters that aren’t bilingual by default
- Owners lacking a lightweight signal of guide usage and maintenance reports

## Audiences

| Audience | What they get |
|----------|----------------|
| **Members** | Scan QR → guide; Machines / Workout / Progress / Scan tabs; EN/FR |
| **Staff / gym admins** | Login → CRUD, image URLs, QR print, issues, insights |
| **Sellers / founders** | Club-branded live walkthrough (see [pitch-demo.md](./pitch-demo.md)) without claiming official affiliation |

## Multi-tenant shape

Same as the generic sibling: `Gym` → `User` / `Machine` / `IssueReport`. Demo seeds one gym (`econofitness-montreal`) with yellow/black branding fields.

## Montreal pitch context

Seeded as **Éconofitness Montréal — Salaberry** (`Montréal, QC`) with bilingual guides and the public tagline style (“Super beaux gyms, très bas prix”). Useful when pitching to Québec operators who care about EN/FR floor UX — while keeping the **unofficial** disclaimer prominent.

## Out of scope (demo)

- No member accounts or cloud workout sync
- No official brand logo files
- No payment / CRM / class booking
- SQLite + simple JWT cookie auth

See [architecture.md](./architecture.md) and [deployment.md](./deployment.md).

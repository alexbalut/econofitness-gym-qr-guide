# Architecture

## Stack

- **Next.js** App Router (v16) + **React** 19 + **TypeScript**
- **Tailwind CSS** v4 (Écono yellow/black theme tokens in UI)
- **SQLite** via **Prisma** 5
- **qrcode** — PNG/SVG generation
- **html5-qrcode** — camera scan
- **jose** + **bcryptjs** — JWT cookie + password hashes

## Prisma models (sketch)

Same shape as the generic sibling:

```
Gym
  id, name, slug (unique), tagline?, primaryColor, secondaryColor,
  logoUrl?, city?, users[], machines[]

User
  id, email (unique), passwordHash, name, role (default ADMIN), gymId → Gym

Machine
  id, gymId → Gym, nameEn, nameFr, slug, token (unique),
  category, descriptionEn/Fr?, stepsEn/Fr (JSON arrays as strings),
  tipsEn/Fr?, warningsEn/Fr?, muscleGroups?,
  imageUrls? (JSON, max 3), active, viewCount, sortOrder
  @@unique([gymId, slug])

IssueReport
  id, machineId → Machine, note, status (OPEN | RESOLVED), createdAt
```

Seed gym: `econofitness-montreal`, `primaryColor: #EEAF00`, `secondaryColor: #000000`.

## Multi-tenant gym

Admin session carries `gymId`. APIs scope mutations to that gym. Member home loads slug `econofitness-montreal` (fallback: first gym).

## Auth

- Cookie: `gym_qr_session`
- JWT HS256 with `AUTH_SECRET`
- 7-day expiry; middleware guards `/admin/*` except login
- Member routes public

## Where state lives

| Concern | Where |
|---------|--------|
| Gyms, users, machines, issues, views | SQLite / Prisma |
| Admin session | JWT cookie |
| Workout + history | localStorage keys `econofitness-workout:v1:<slug>` and `econofitness-workout-history:v1:<slug>` |
| EN/FR UI | React state |
| QR URL | `APP_URL` + `/q/{token}` |

## App structure

```
src/app/           # /, /scan, /q/[token], /m/..., /admin/..., /api/...
src/components/    # GymHome (4 tabs), MachineGuide, Workout*, admin/*
src/lib/           # prisma, auth, workout, utils
prisma/            # schema, seed, local dev.db
public/machines/   # Unsplash demo photos
```

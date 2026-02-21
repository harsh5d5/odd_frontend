# FleetFlow — Frontend

> Next.js 15 frontend for the FleetFlow Fleet & Logistics Management System.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Page |
|-------|------|
| `/` | Landing page (Hero, Features, Footer) |
| `/login` | Login & Sign-up form |
| `/dashboard` | Main Dashboard (KPIs, Quick Actions) |
| `/dashboard/vehicles` | Vehicle Registry (CRUD, Filters, Pagination) |
| `/dashboard/trips` | Trip Dispatcher (Pipeline, Kanban, Validation) |
| `/dashboard/maintenance` | Maintenance & Service Logs |
| `/dashboard/expenses` | Expense & Fuel Logging |
| `/dashboard/drivers` | Driver Performance & Safety |
| `/dashboard/analytics` | Operational Analytics |
| `/dashboard/reports` | Report Generation |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Dependencies

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **GSAP** — Navigation animations
- **Framer Motion** — Page transitions
- **Lucide React** — Icon library

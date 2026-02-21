# 🚛 FleetFlow — Modular Fleet & Logistics Management System

> **Odoo Hackathon Project** — A comprehensive fleet management dashboard built with Next.js, featuring vehicle registry, trip dispatching, maintenance tracking, expense logging, driver management, operational analytics, and reporting.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Module Breakdown](#-module-breakdown)
- [Screenshots](#-screenshots)

---

## 🧭 Overview

**FleetFlow** is a full-featured fleet and logistics management system designed to streamline operations for transport companies. It provides a modular dashboard where fleet managers can:

- Register and track vehicles across their lifecycle
- Dispatch trips with load validation and driver safety checks
- Log maintenance and service records
- Track fuel and miscellaneous expenses
- Monitor driver performance and license compliance
- Analyze operational data with visual charts and KPIs
- Generate downloadable reports

The system is built as a **single-page application** with a professional dark sidebar layout, orange accent theme, and responsive design.

---

## ✨ Features

### 🏠 Landing Page
- Animated hero section with stat counters
- GSAP-powered floating navigation bar (CardNav)
- Scroll-stacking feature cards
- Professional footer

### 📊 Dashboard (8 Modules)

| # | Module | Route | Key Features |
|---|--------|-------|-------------|
| 1 | **Main Dashboard** | `/dashboard` | 4 KPI cards, quick actions, trip overview table |
| 2 | **Vehicle Registry** | `/dashboard/vehicles` | CRUD, edit modal, detail panel, status toggle, search/filter/sort, pagination |
| 3 | **Trip Dispatcher** | `/dashboard/trips` | Route visualization, status pipeline, load validation, driver/vehicle validation, edit/cancel, kanban view, pagination |
| 4 | **Maintenance Logs** | `/dashboard/maintenance` | Service log table, new entry form, "In Shop" banner, mark-complete |
| 5 | **Expense & Fuel** | `/dashboard/expenses` | Summary cards, expense table, new expense form, auto-totals |
| 6 | **Driver Profiles** | `/dashboard/drivers` | Safety Lock banner, safety scores, duty status, license expiry warnings |
| 7 | **Analytics** | `/dashboard/analytics` | KPI cards, fuel trend chart, costliest vehicles ranking, financial summary |
| 8 | **Reports** | `/dashboard/reports` | Filterable report cards, download/print actions |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | GSAP, Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Python (FastAPI) — *scaffolded* |
| **State** | React Hooks (useState, useMemo) |
| **Routing** | Next.js App Router (file-based) |

---

## 📁 Folder Structure

```
oddo_hacls/
├── README.md                              # ← You are here
├── FleetFlow_ Modular Fleet & ...pdf      # Odoo wireframe / problem statement
├── screen_shot_odd/                       # Reference screenshots
│
├── backend/                               # Python backend (FastAPI)
│   ├── main.py                            # API entry point
│   ├── requirements.txt                   # Python dependencies
│   └── .env                               # Environment variables
│
└── frontend/                              # Next.js 15 frontend
    ├── package.json                        # Node dependencies & scripts
    ├── tsconfig.json                       # TypeScript config
    ├── next.config.ts                      # Next.js config
    ├── postcss.config.mjs                  # PostCSS (Tailwind)
    ├── eslint.config.mjs                   # ESLint config
    ├── public/                             # Static assets
    │
    └── src/
        ├── app/                            # Next.js App Router pages
        │   ├── layout.tsx                  # Root layout (fonts, metadata)
        │   ├── globals.css                 # Global styles & Tailwind directives
        │   ├── page.tsx                    # Landing page (Hero + Features)
        │   ├── favicon.ico
        │   │
        │   ├── login/
        │   │   └── page.tsx               # Login & signup form
        │   │
        │   └── dashboard/                 # Dashboard section (nested layout)
        │       ├── layout.tsx             # Dashboard shell (sidebar + topbar)
        │       ├── page.tsx               # Main dashboard (KPIs, quick actions)
        │       │
        │       ├── vehicles/
        │       │   └── page.tsx           # Vehicle Registry (CRUD, filters, pagination)
        │       │
        │       ├── trips/
        │       │   └── page.tsx           # Trip Dispatcher (pipeline, kanban, validation)
        │       │
        │       ├── maintenance/
        │       │   └── page.tsx           # Maintenance & Service Logs
        │       │
        │       ├── expenses/
        │       │   └── page.tsx           # Expense & Fuel Logging
        │       │
        │       ├── drivers/
        │       │   └── page.tsx           # Driver Performance & Safety
        │       │
        │       ├── analytics/
        │       │   └── page.tsx           # Operational Analytics (charts, KPIs)
        │       │
        │       └── reports/
        │           └── page.tsx           # Report Generation & Downloads
        │
        ├── components/                    # Reusable UI components
        │   ├── Navigation.tsx             # Top floating nav (uses CardNav)
        │   ├── Hero.tsx                   # Landing page hero section
        │   ├── Footer.tsx                 # Site footer
        │   │
        │   ├── dashboard/                 # Dashboard-specific components
        │   │   ├── Sidebar.tsx            # Collapsible dark sidebar with nav links
        │   │   └── TopBar.tsx             # Sticky top bar (search, filters, notifications)
        │   │
        │   └── ui/                        # Generic UI primitives
        │       ├── CardNav.tsx            # GSAP-animated floating navigation
        │       ├── ScrollStack.tsx        # Scroll-stacking card container
        │       └── Aurora.tsx             # Aurora background effect
        │
        └── lib/                           # Utility functions
            └── utils.ts                   # Helper utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Python** ≥ 3.10 *(for backend, optional)*

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/oddo_hacls.git
cd oddo_hacls
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the Backend *(optional)*

```bash
cd backend
pip install -r requirements.txt
python main.py
```

---

## 📦 Module Breakdown

### 1. 🏠 Landing Page (`/`)
- Animated **Hero section** with FleetFlow branding and stat counters
- **Scroll-stacking feature cards** showcasing system capabilities
- **Floating navigation** with GSAP animations for smooth card expansion
- Professional footer with quick links

### 2. 📊 Main Dashboard (`/dashboard`)
- **4 KPI cards**: Active Vehicles, Trips Today, Fuel Cost, Maintenance Alerts
- **Quick Action** buttons for common operations
- **Trip Overview** table with recent trip summaries

### 3. 🚛 Vehicle Registry (`/dashboard/vehicles`)
- Full **CRUD** operations (Create, Read, Update, Delete)
- **Edit Modal** with pre-filled form for existing vehicles
- **Detail Panel** — click any row to see specs, costs, assigned driver
- **Status Toggle** — dropdown to switch between Idle / On Trip / In Shop
- **Search** by plate number or model name
- **Filter** by Status and Vehicle Type
- **Sort** by plate, odometer, or capacity (ascending/descending)
- **Pagination** — 5 per page with "Showing X–Y of Z" and page buttons

### 4. 🗺️ Trip Dispatcher (`/dashboard/trips`)
- **Status Pipeline** — visual dot progress bar: Scheduled → On Way → Delivered → Done
- **Trip Detail Panel** — vehicle, driver, cargo, fuel estimate, timeline
- **Driver Validation** — only drivers with valid (non-expired) licenses shown
- **Vehicle Validation** — only Idle vehicles available for dispatch
- **Load Validation** — overload warning with vehicle max capacity check
- **Advance Status** — one-click to move trips through the pipeline
- **Edit & Cancel** — edit only Scheduled trips, cancel with confirmation
- **Kanban View** — toggle between table and 4-column board view
- **Search, Filter, Sort, Pagination** — same patterns as Vehicle Registry

### 5. 🔧 Maintenance Logs (`/dashboard/maintenance`)
- Service log table with color-coded statuses (New / In Progress / Completed)
- **New Service** form modal (Vehicle, Issue, Date)
- **"In Shop" banner** — auto-hides vehicles from trip dispatcher
- **Mark Complete** button to close out service entries

### 6. ⛽ Expense & Fuel (`/dashboard/expenses`)
- **3 Summary Cards**: Total Fuel, Misc Expenses, Grand Total
- Expense table with Trip ID, Driver, Distance, Fuel, Misc, Total, Status
- **New Expense** form with auto-calculated totals
- Color-coded status badges

### 7. 👤 Driver Profiles (`/dashboard/drivers`)
- **Safety Lock Banner** — warns about drivers with expired licenses
- **4 Summary Cards**: Total Drivers, On Duty, Avg Safety Score, Expired Licenses
- Driver table with **progress bars** for completion rates
- **Color-coded safety scores** (green/amber/red)
- Duty status badges and license expiry warnings per row

### 8. 📈 Analytics (`/dashboard/analytics`)
- **3 KPI Cards**: Total Fuel Cost, Fleet ROI, Utilization Rate
- **Fuel Efficiency Trend** — CSS bar chart (no charting library needed)
- **Top 5 Costliest Vehicles** — horizontal bar ranking
- **Financial Summary** table with monthly Revenue / Fuel / Maintenance / Net Profit

### 9. 📄 Reports (`/dashboard/reports`)
- Filterable report cards by category: Operations / Financial / Compliance
- Each card shows title, description, type badge, generation date
- **Download** and **Print** action buttons

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary** | `#F06522` (FleetFlow Orange) |
| **Background** | `#f8f8f8` (Light Gray) |
| **Sidebar** | `#111827` (Dark Gray) |
| **Cards** | `#ffffff` with subtle borders |
| **Font** | System default / Geist |
| **Border Radius** | `rounded-xl` / `rounded-2xl` |
| **Shadows** | Soft `shadow-md` with orange tints |

---

## 📸 Screenshots

Screenshots are available in the `screen_shot_odd/` directory.

---

## 👥 Team

Built for the **Odoo Hackathon** — 8-hour challenge.

---

## 📜 License

This project was built for educational and hackathon purposes.
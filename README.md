<div align="center">

# DF STRANG BUILDINGS

### Engineering Legacy Since 1984. Scaling Asset Value for Generations.

**High-end interactive web platform prototype** transforming KwaZulu-Natal's legacy
construction firm into a modern multi-generational asset engine.

*Designed & deployed by **Business Hustle** — Digital Infrastructure Frameworks*

</div>

---

## About The Platform

Built for [DF Strang Buildings (Pty) Ltd](https://dfstrangbuildings.co.za/) — a bespoke
construction and property development company building landmarks across KwaZulu-Natal
since 1984. This prototype moves the business beyond a static portfolio by activating
**three value drivers**:

| # | Value Driver | Platform Feature |
|---|--------------|------------------|
| 01 | **JV / Equity Deal Sourcing** | Landowner & Investor Partnerships portal with a live Dynamic Yield Estimator (GDV, developable bulk, residual land value, indicative land-equity stake) |
| 02 | **Recurring Revenue** | DF Strang Estate Care & Facilities Management — tiered subscription retainers with custom quote capture |
| 03 | **High-Intent Lead Generation** | Real-Time Feasibility & Budget Calculator with instant cost envelope, programme timeline, and feasibility report capture |

## Key Features

- **Hero** — "Engineering Legacy Since 1984. Scaling Asset Value for Generations." with dual CTAs
- **JV Portal** — location (Umhlanga, Ballito, Westville, Durban North + more), plot size (m²/ha), zoning & ownership inputs driving a live GDV estimator calibrated to 2024/25 KZN corridor benchmarks
- **Estate Care tiers** — Estate Care Essential, Estate Care Retainer, and 24/7 Commercial Facilities Management with a Request Custom Retainer Quote modal
- **Feasibility Calculator** — development type, footprint slider (200–5,000 m²+), Standard vs Ultra-Luxury tiers, Solar / Rainwater / Smart Automation add-ons, cost breakdown visualisation, and Download Full Feasibility Report lead capture
- **Proven Track Record** — filterable showcase of real projects (20 On Tree, Glenmore Gardens, Aquila Zinkwazi, Martinique, Essenwood Road, Gleneagles Office Park, Island Business Park, Springfield Industrial Park…) with the 40+ Years · 83+ Residential · 62+ Commercial · R2B+ Delivered metrics bar
- **Legacy** — real company history and management team (Simon Strang, Dave Strang, Faisha Shaik, Pamela Naicker)
- **Lead persistence** — all three lead flows persist to SQLite via Prisma (`JVLead`, `RetainerLead`, `FeasibilityLead`)

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui (New York) + Lucide icons
- **Framer Motion** micro-interactions
- **Prisma ORM** + SQLite for lead capture
- **Playfair Display** (serif headings) + **Inter** (body)

## Brand System

| Token | Value |
|-------|-------|
| Deep Slate Gray | `#1E293B` |
| Warm Sand Gold | `#C5A059` / `#D4AF37` |
| Charcoal | `#0F172A` |
| Crisp White | `#FAFAFA` |

## Getting Started

```bash
bun install
bun run db:push     # sync Prisma schema to SQLite
bun run dev         # http://localhost:3000
```

## Contact

**DF Strang Buildings (Pty) Ltd**
Gleneagles Park, 10 Flanders Drive, Mount Edgecombe, Durban, KwaZulu-Natal
- Phone: 082 902 4538
- Email: simon@stranggroup.co.za · hr@stranggroup.co.za

---

*Powered by **Business Hustle** Digital Infrastructure Frameworks*

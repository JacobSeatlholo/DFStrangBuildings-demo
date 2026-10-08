"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Building2, Warehouse, Paintbrush, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "All" | "Residential" | "Commercial" | "Industrial" | "Renovations";

interface Project {
  title: string;
  location: string;
  category: Exclude<Category, "All">;
  image: string;
  description: string;
  units?: string;
}

const PROJECTS: Project[] = [
  {
    title: "20 On Tree",
    location: "Mount Edgecombe",
    category: "Residential",
    image: "/images/luxury-home-1.jpg",
    description:
      "5 units in the heart of Mount Edgecombe offering modernity and refinement at its best.",
    units: "5 Units",
  },
  {
    title: "Glenmore Gardens",
    location: "Westville, Durban",
    category: "Residential",
    image: "/images/luxury-home-2.jpg",
    description:
      "18 units situated in Westville, Durban, built on 10 acres of beautiful scenery.",
    units: "18 Units",
  },
  {
    title: "Aquila Zinkwazi",
    location: "Zinkwazi, KZN North Coast",
    category: "Residential",
    image: "/images/simbithi-eco-estate.jpg",
    description:
      "8 top-tier units built in a townhouse complex, nestled near the beaches of Zinkwazi.",
    units: "8 Units",
  },
  {
    title: "Martinique",
    location: "Shaka's Rock, Main Beach",
    category: "Residential",
    image: "/images/luxury-home-3.jpg",
    description:
      "36 spacious beachfront units situated on Shakas Rock, Main Beach.",
    units: "36 Units",
  },
  {
    title: "Essenwood Road Restoration",
    location: "Essenwood, KZN",
    category: "Renovations",
    image: "/images/luxury-home-4.jpg",
    description:
      "A 1901 home hydraulically slid 15 metres onto new foundations, unlocking the plot for 4 luxury townhouses.",
    units: "4 Townhouses",
  },
  {
    title: "Umhlanga Residential Estate",
    location: "Umhlanga, KZN",
    category: "Residential",
    image: "/images/residential-developments.jpg",
    description:
      "16+ residential homes completed, plus contributions to the golf course and main club facilities in Mount Edgecombe Estate since 1990.",
    units: "16+ Homes",
  },
  {
    title: "Gleneagles Office Park",
    location: "Mount Edgecombe",
    category: "Commercial",
    image: "/images/gleneagles-office.jpg",
    description:
      "6-block office development established in 1997 — and current home of DF Strang Buildings.",
    units: "6 Blocks",
  },
  {
    title: "Island Business Park",
    location: "Gateway, Umhlanga",
    category: "Commercial",
    image: "/images/commercial-park-1.jpg",
    description:
      "Premium dealership precinct — Jaguar Range Rover Gateway, Mini BMW, FIAT and Ford Mount Edgecombe.",
  },
  {
    title: "Vehicle Dealerships",
    location: "KZN Portfolio",
    category: "Commercial",
    image: "/images/commercial-park-2.jpg",
    description:
      "From Jaguar Land Rover and Mini BMW to FIAT and Ford — numerous dealerships built across the province.",
  },
  {
    title: "Springfield Industrial Park",
    location: "Springfield Park, Durban",
    category: "Industrial",
    image: "/images/industrial-park-1.jpg",
    description:
      "A series of commercial factory spaces totalling over 5,000 square metres in Springfield Park.",
    units: "5,000 m²+",
  },
  {
    title: "North Coast Spec Homes",
    location: "KZN North Coast",
    category: "Residential",
    image: "/images/kitchen-island.jpg",
    description:
      "5 spec homes completed in 2016, with provision for the next stage of developments including yards, offices and local skilled staff employment.",
    units: "5 Homes",
  },
  {
    title: "Turnkey Alterations Division",
    location: "KZN Wide",
    category: "Renovations",
    image: "/images/outdoor-fountain.jpg",
    description:
      "Turnkey maintenance division delivering minor and major alterations with renowned high-quality finishes.",
  },
];

const FILTERS: { key: Category; icon: React.ElementType }[] = [
  { key: "All", icon: ArrowUpRight },
  { key: "Residential", icon: Home },
  { key: "Commercial", icon: Building2 },
  { key: "Industrial", icon: Warehouse },
  { key: "Renovations", icon: Paintbrush },
];

const METRICS = [
  { value: "40+", label: "Years of Excellence" },
  { value: "83+", label: "Residential Projects" },
  { value: "62+", label: "Commercial Developments" },
  { value: "R2B+", label: "Assets Delivered" },
];

export function TrackRecord() {
  const [filter, setFilter] = useState<Category>("All");

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="track-record" className="relative bg-crisp-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 gold-line" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-gold">
              Proven Track Record
            </p>
            <span className="h-px w-10 gold-line" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Landmarks Delivered Across <span className="text-gradient-gold">KZN</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-ink/80 sm:text-lg">
            From bespoke homes to office parks and industrial facilities — every
            project below carries the DF Strang standard: on time, on budget,
            built to last generations.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={cn(
                "inline-flex items-center gap-2 border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all sm:text-[13px]",
                filter === key
                  ? "border-charcoal bg-charcoal text-sand-gold"
                  : "border-border bg-white text-slate-ink hover:border-sand-gold/50 hover:bg-sand-gold/5"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {key}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card-prestige card-prestige-hover group overflow-hidden border border-border bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.description}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 border border-white/20 bg-charcoal/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand-gold backdrop-blur-sm">
                  {project.category}
                </span>
                {project.units && (
                  <span className="absolute bottom-4 right-4 bg-sand-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-charcoal">
                    {project.units}
                  </span>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-sand-gold" />
                  {project.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-ink/75">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Metrics bar */}
        <div className="mt-16 overflow-hidden border-y-2 border-sand-gold/40 bg-charcoal">
          <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="px-4 py-8 text-center sm:py-10"
              >
                <p className="font-display text-3xl font-semibold text-sand-gold sm:text-4xl lg:text-[2.6rem]">
                  {m.value}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-xs">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

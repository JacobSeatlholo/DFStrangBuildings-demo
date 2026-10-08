"use client";

import { motion } from "framer-motion";
import { Handshake, RefreshCcw, Gauge } from "lucide-react";
import Link from "next/link";

const ENGINES = [
  {
    icon: Handshake,
    number: "01",
    title: "JV & Equity Deal Sourcing",
    text: "Landowners and co-developers unlock gross development value — equity structured around your asset.",
    href: "#partnerships",
    cta: "Explore the JV Portal",
  },
  {
    icon: RefreshCcw,
    number: "02",
    title: "Recurring Estate Care Revenue",
    text: "Retainers that protect and service completed estates and commercial assets for the long term.",
    href: "#estate-care",
    cta: "See Care Tiers",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Instant Feasibility & ROI",
    text: "Model budgets and timelines in seconds — serious clients get a full feasibility pack.",
    href: "#calculator",
    cta: "Run the Numbers",
  },
];

export function ValueEngines() {
  return (
    <section className="relative border-b border-border bg-crisp-white" aria-label="Our three engines of value">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {ENGINES.map((engine, i) => (
            <motion.div
              key={engine.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative border border-border bg-white p-7 card-prestige card-prestige-hover sm:p-8"
            >
              <span className="font-display text-5xl font-semibold text-sand-gold/25 transition-colors group-hover:text-sand-gold/45">
                {engine.number}
              </span>
              <engine.icon className="mt-4 h-7 w-7 text-charcoal" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                {engine.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-ink/75">{engine.text}</p>
              <Link
                href={engine.href}
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand-gold transition-colors hover:text-charcoal"
              >
                {engine.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

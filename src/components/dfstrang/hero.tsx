"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, ShieldCheck, Award, MapPin } from "lucide-react";

const STATS = [
  { value: "40+", label: "Years of Excellence" },
  { value: "83+", label: "Residential Projects" },
  { value: "62+", label: "Commercial Developments" },
  { value: "R2B+", label: "Assets Delivered" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <Image
          src="/images/residential-developments.jpg"
          alt="Luxury residential development built by DF Strang Buildings in KwaZulu-Natal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal" />
        <div className="absolute inset-0 architect-grid opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-36 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="h-px w-12 bg-sand-gold" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sand-gold sm:text-sm">
              Residential · Renovation · Commercial · Industrial
            </p>
          </div>

          <h1 className="font-display text-4xl leading-[1.12] font-medium text-white sm:text-5xl lg:text-[3.6rem]">
            Engineering Legacy Since 1984.
            <br />
            <span className="text-gradient-gold">Scaling Asset Value</span> for Generations.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Bespoke construction, joint-venture property developments, and long-term
            asset management across KwaZulu-Natal — turning land and capital into
            multi-generational enterprise.
          </p>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href="#partnerships"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-3 bg-sand-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-sand-gold-bright"
            >
              Explore JV Partner Portal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#calculator"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-sand-gold hover:text-sand-gold"
            >
              <Calculator className="h-4 w-4" />
              Calculate Project Feasibility
            </motion.a>
          </div>

          {/* Trust chips */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/55 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sand-gold" />
              NHBRC Registered Builder
            </span>
            <span className="inline-flex items-center gap-2">
              <Award className="h-4 w-4 text-sand-gold" />
              3 Generations of Building Excellence
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sand-gold" />
              Mount Edgecombe, KZN
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative border-t border-white/10 bg-charcoal/60 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center sm:px-6">
              <p className="font-display text-2xl font-semibold text-sand-gold sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

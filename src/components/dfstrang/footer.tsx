"use client";

import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "JV Partnerships", href: "#partnerships" },
  { label: "Estate Care & FM", href: "#estate-care" },
  { label: "Feasibility Calculator", href: "#calculator" },
  { label: "Track Record", href: "#track-record" },
  { label: "Our Legacy", href: "#legacy" },
];

const SERVICES = [
  "Bespoke Residential Construction",
  "Commercial Developments",
  "Industrial & Warehousing",
  "Alterations & Renovations",
  "Estate Care Retainers",
  "Facilities Management",
];

export function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-sand-gold/20 bg-charcoal text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Let&apos;s Talk About <span className="text-gradient-gold">Your Project.</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
              Whether it&apos;s land to co-develop, a bespoke build, or a long-term
              care retainer — the DF Strang desk responds within one business day.
            </p>
          </div>
          <a
            href="tel:+27829024538"
            className="inline-flex shrink-0 items-center gap-3 bg-sand-gold px-7 py-4 text-sm font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-sand-gold-bright"
          >
            <Phone className="h-4 w-4" />
            082 902 4538
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-sand-gold/60">
              <span className="font-display text-lg font-bold text-sand-gold">DF</span>
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-wide">
                DF STRANG <span className="text-sand-gold">BUILDINGS</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.26em] text-white/45">
                Est. 1984 · KwaZulu-Natal
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            A bespoke construction and property development company building
            landmarks since 1984 — and your partner in multi-generational
            asset value.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={`DF Strang Buildings on ${label}`}
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-all hover:border-sand-gold hover:text-sand-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-gold">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-sand-gold"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-gold">
            Services
          </h3>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s} className="text-sm text-white/60">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-gold">
            Head Office
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3 text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-gold" />
              <span>
                Gleneagles Park, 10 Flanders Drive,
                <br />
                Mount Edgecombe, Durban,
                <br />
                KwaZulu-Natal, South Africa
              </span>
            </li>
            <li>
              <a href="tel:+27829024538" className="flex items-center gap-3 text-white/60 transition-colors hover:text-sand-gold">
                <Phone className="h-4 w-4 shrink-0 text-sand-gold" />
                082 902 4538
              </a>
            </li>
            <li>
              <a href="mailto:simon@stranggroup.co.za" className="flex items-center gap-3 text-white/60 transition-colors hover:text-sand-gold">
                <Mail className="h-4 w-4 shrink-0 text-sand-gold" />
                simon@stranggroup.co.za
              </a>
            </li>
            <li>
              <a href="mailto:hr@stranggroup.co.za" className="flex items-center gap-3 text-white/60 transition-colors hover:text-sand-gold">
                <Mail className="h-4 w-4 shrink-0 text-sand-gold" />
                hr@stranggroup.co.za
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} DF Strang Buildings (Pty) Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Powered by{" "}
            <a
              href="#top"
              className="font-semibold text-sand-gold transition-colors hover:text-white"
            >
              Business Hustle
            </a>{" "}
            Digital Infrastructure Frameworks
          </p>
        </div>
      </div>
    </footer>
  );
}

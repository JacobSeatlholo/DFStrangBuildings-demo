"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "JV Partnerships", href: "#partnerships" },
  { label: "Estate Care", href: "#estate-care" },
  { label: "Feasibility", href: "#calculator" },
  { label: "Track Record", href: "#track-record" },
  { label: "Legacy", href: "#legacy" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md border-b border-sand-gold/20 shadow-lg shadow-charcoal/20"
          : "bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 group" aria-label="DF Strang Buildings home">
          <span className="flex h-10 w-10 items-center justify-center border border-sand-gold/60 bg-charcoal/40 transition-colors group-hover:bg-sand-gold/15">
            <span className="font-display text-lg font-bold text-sand-gold">DF</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base sm:text-lg font-semibold tracking-wide text-white">
              DF STRANG <span className="text-sand-gold">BUILDINGS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">
              Est. 1984 · KwaZulu-Natal
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-sand-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-2 border border-sand-gold bg-sand-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-transparent hover:text-sand-gold"
          >
            <Phone className="h-3.5 w-3.5" />
            Start a Project
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-sand-gold/20 bg-charcoal/98 backdrop-blur-md lg:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-sm font-medium uppercase tracking-wider text-white/80 transition-colors hover:bg-white/5 hover:text-sand-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block bg-sand-gold px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider text-charcoal"
            >
              Start a Project
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

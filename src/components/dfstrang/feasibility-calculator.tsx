"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Warehouse,
  Hammer,
  Sun,
  Droplets,
  Cpu,
  Clock,
  TrendingUp,
  FileDown,
  Loader2,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  estimateFeasibility,
  formatRand,
  formatNumber,
  type DevelopmentType,
} from "@/lib/calculators";
import { cn } from "@/lib/utils";

const DEV_TYPES: { value: DevelopmentType; label: string; desc: string; icon: React.ElementType }[] = [
  { value: "bespoke-residential", label: "High-End Bespoke Residential", desc: "Custom homes & architectural builds", icon: Home },
  { value: "commercial-office-park", label: "Commercial Office Park", desc: "Office blocks, retail & mixed parks", icon: Building2 },
  { value: "industrial-warehousing", label: "Industrial / Warehousing", desc: "Factories, logistics & distribution", icon: Warehouse },
  { value: "major-renovation", label: "Major Renovation / Alteration", desc: "Structural upgrades & modernisation", icon: Hammer },
];

const ADDONS = [
  { key: "solar" as const, label: "Solar & Off-Grid Battery", icon: Sun },
  { key: "rainwater" as const, label: "Rainwater Harvesting", icon: Droplets },
  { key: "automation" as const, label: "Smart Automation", icon: Cpu },
];

interface Snapshot {
  devType: DevelopmentType;
  area: number;
  tier: "standard" | "ultra";
  addOns: { solar: boolean; rainwater: boolean; automation: boolean };
}

function ReportModal({
  open,
  onOpenChange,
  snapshot,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  snapshot: Snapshot;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Missing details",
        description: "Please complete all three contact fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          developmentType: snapshot.devType,
          footprintSqm: snapshot.area,
          qualityTier: snapshot.tier,
          addOns: snapshot.addOns,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setDone(true);
      toast({
        title: "Report request received",
        description: "A full DF Strang feasibility pack will reach your inbox shortly.",
      });
    } catch (err) {
      toast({
        title: "Request failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white p-6 sm:max-w-md sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-charcoal">
            Download Full Feasibility Report
          </DialogTitle>
          <DialogDescription>
            Get a detailed cost breakdown, programme timeline and specification
            guidance — prepared by the DF Strang estimating desk.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-sand-gold" />
            <p className="font-display text-xl text-charcoal">You&apos;re on the list.</p>
            <p className="text-sm text-muted-foreground">
              Our estimating desk will email your feasibility pack within one
              business day — usually much sooner.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <div>
              <Label htmlFor="fr-name" className="mb-1.5 text-xs text-muted-foreground">Full Name *</Label>
              <Input id="fr-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="e.g. Priya Naidoo" />
            </div>
            <div>
              <Label htmlFor="fr-email" className="mb-1.5 text-xs text-muted-foreground">Email *</Label>
              <Input id="fr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.co.za" />
            </div>
            <div>
              <Label htmlFor="fr-phone" className="mb-1.5 text-xs text-muted-foreground">Phone *</Label>
              <Input id="fr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+27 82 000 0000" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full bg-charcoal text-sm font-semibold uppercase tracking-wider text-sand-gold hover:bg-deep-slate disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing…
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" /> Send Me the Report
                </>
              )}
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              No spam. Your details are used only to prepare and deliver your
              feasibility report.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function FeasibilityCalculator() {
  const [devType, setDevType] = useState<DevelopmentType>("bespoke-residential");
  const [area, setArea] = useState(350);
  const [tier, setTier] = useState<"standard" | "ultra">("standard");
  const [addOns, setAddOns] = useState({ solar: true, rainwater: false, automation: false });
  const [reportOpen, setReportOpen] = useState(false);

  const estimate = useMemo(
    () => estimateFeasibility({ developmentType: devType, footprintSqm: area, qualityTier: tier, addOns }),
    [devType, area, tier, addOns]
  );

  const snapshot: Snapshot = { devType, area, tier, addOns };

  return (
    <section id="calculator" className="relative bg-crisp-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 gold-line" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-gold">
              Instant Feasibility · High-Intent Desk
            </p>
            <span className="h-px w-10 gold-line" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Real-Time Feasibility &amp; <span className="text-gradient-gold">Budget Calculator</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-ink/80 sm:text-lg">
            Model your project&apos;s budget band and programme timeline in seconds —
            calibrated to DF Strang&apos;s 40 years of KZN build data.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* ---- INPUTS ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="card-prestige border border-border bg-white p-6 sm:p-9"
          >
            {/* Development type */}
            <div>
              <p className="mb-3 text-sm font-semibold text-charcoal">1. Development Type</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {DEV_TYPES.map(({ value, label, desc, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDevType(value)}
                    aria-pressed={devType === value}
                    className={cn(
                      "flex items-start gap-3 border p-4 text-left transition-all",
                      devType === value
                        ? "border-sand-gold bg-charcoal shadow-md"
                        : "border-border bg-white hover:border-sand-gold/50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0",
                        devType === value ? "text-sand-gold" : "text-slate-ink"
                      )}
                    />
                    <span>
                      <span
                        className={cn(
                          "block text-[13px] font-semibold leading-tight",
                          devType === value ? "text-white" : "text-charcoal"
                        )}
                      >
                        {label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs",
                          devType === value ? "text-white/60" : "text-muted-foreground"
                        )}
                      >
                        {desc}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-charcoal">2. Estimated Footprint Area</p>
                <p className="font-display text-xl font-semibold text-sand-gold">
                  {formatNumber(area)} m²
                </p>
              </div>
              <Slider
                value={[area]}
                onValueChange={(v) => setArea(v[0])}
                min={200}
                max={5000}
                step={50}
                aria-label="Estimated footprint area in square metres"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>200 m²</span>
                <span>5,000 m²+</span>
              </div>
            </div>

            {/* Quality tier */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-charcoal">3. Specification Tier</p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { key: "standard", title: "Standard", desc: "Premium contractor-grade finishes" },
                    { key: "ultra", title: "Ultra-Luxury", desc: "Architectural signature specification" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTier(t.key)}
                    aria-pressed={tier === t.key}
                    className={cn(
                      "border p-4 text-left transition-all",
                      tier === t.key
                        ? "border-sand-gold bg-charcoal shadow-md"
                        : "border-border bg-white hover:border-sand-gold/50"
                    )}
                  >
                    <p
                      className={cn(
                        "font-display text-base font-semibold",
                        tier === t.key ? "text-sand-gold" : "text-charcoal"
                      )}
                    >
                      {t.title}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        tier === t.key ? "text-white/60" : "text-muted-foreground"
                      )}
                    >
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mt-8">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                <Sparkles className="h-4 w-4 text-sand-gold" />
                4. Tech &amp; Green Add-ons
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {ADDONS.map(({ key, label, icon: Icon }) => {
                  const active = addOns[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAddOns((a) => ({ ...a, [key]: !a[key] }))}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-center gap-2 border p-4 text-center transition-all",
                        active
                          ? "border-sand-gold bg-sand-gold/10"
                          : "border-border bg-white hover:border-sand-gold/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          active ? "text-sand-gold" : "text-slate-ink"
                        )}
                      />
                      <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-charcoal">
                        {label}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium uppercase tracking-wider",
                          active ? "text-sand-gold" : "text-muted-foreground"
                        )}
                      >
                        {active ? "Included" : "Tap to add"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ---- OUTPUT ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="overflow-hidden border border-sand-gold/30 bg-charcoal" aria-live="polite">
              <div className="border-b border-white/10 bg-deep-slate/60 px-6 py-4 sm:px-8">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sand-gold">
                  <TrendingUp className="h-4 w-4" />
                  Projected Build Envelope
                </p>
                <p className="mt-1 text-xs text-white/50">{estimate.devTypeLabel}</p>
              </div>

              <div className="space-y-7 px-6 py-7 sm:px-8">
                {/* Cost range */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    Estimated Project Cost
                  </p>
                  <motion.p
                    key={estimate.costLow + estimate.costHigh}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 font-display text-3xl font-semibold text-white sm:text-4xl"
                  >
                    {formatRand(estimate.costLow, true)} – {formatRand(estimate.costHigh, true)}
                  </motion.p>
                  <p className="mt-1.5 text-xs text-white/45">
                    ≈ {formatRand(estimate.costPerSqm)}/m² all-in ·{" "}
                    {tier === "ultra" ? "Ultra-Luxury" : "Standard"} specification
                  </p>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-sand-gold/15">
                    <Clock className="h-5 w-5 text-sand-gold" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/45">
                      Estimated Completion Timeline
                    </p>
                    <p className="font-display text-lg font-semibold text-white">
                      {estimate.timelineWeeks} weeks · {estimate.timelineLabel}
                    </p>
                  </div>
                </div>

                {/* Breakdown bar */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-wider text-white/50">
                    Indicative Cost Breakdown
                  </p>
                  <div className="flex h-4 w-full overflow-hidden">
                    {estimate.breakdown.map((b) => (
                      <motion.div
                        key={b.label}
                        className="h-full"
                        style={{ backgroundColor: b.color }}
                        animate={{ width: `${b.pct * 100}%` }}
                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {estimate.breakdown.map((b) => (
                      <p key={b.label} className="flex items-center gap-2 text-[11px] text-white/60">
                        <span className="h-2 w-2 shrink-0" style={{ backgroundColor: b.color }} />
                        {b.label} · {Math.round(b.pct * 100)}%
                        <span className="ml-auto text-white/40">{formatRand(b.amount, true)}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Add-ons note */}
                {estimate.addOnLabels.length > 0 && (
                  <p className="flex items-start gap-2 border border-sand-gold/25 bg-sand-gold/5 p-3 text-xs leading-relaxed text-white/65">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-gold" />
                    <span>
                      Includes {estimate.addOnLabels.join(", ")} —{" "}
                      <span className="text-sand-gold">
                        {formatRand(estimate.addOnTotal, true)}
                      </span>{" "}
                      of the envelope.
                    </span>
                  </p>
                )}

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="group flex h-13 w-full items-center justify-center gap-2.5 bg-sand-gold text-sm font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-sand-gold-bright sm:h-14"
                >
                  <FileDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                  Download Full Feasibility Report
                </button>

                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-white/40">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Desktop estimate for planning purposes. Final pricing follows a
                  site assessment and design briefing with our estimating desk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        snapshot={snapshot}
      />
    </section>
  );
}

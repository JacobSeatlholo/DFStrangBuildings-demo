"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Ruler,
  Building2,
  Landmark,
  TrendingUp,
  Handshake,
  Loader2,
  CheckCircle2,
  Info,
  KeyRound,
  PieChart,
  Building,
  Warehouse,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  estimateJVYield,
  formatRand,
  formatNumber,
  type ZoningType,
} from "@/lib/calculators";
import { cn } from "@/lib/utils";

const LOCATIONS = [
  "Umhlanga",
  "Ballito",
  "Mount Edgecombe",
  "Durban North",
  "Westville",
  "La Lucia",
  "uMhlanga Ridge",
  "Zimbali",
  "Springfield Park",
  "River Horse Valley",
  "Other KZN",
];

const ZONINGS: { value: ZoningType; label: string; icon: React.ElementType }[] = [
  { value: "Residential", label: "Residential", icon: Building },
  { value: "Commercial", label: "Commercial", icon: Building2 },
  { value: "Industrial", label: "Industrial", icon: Warehouse },
  { value: "Mixed-Use", label: "Mixed-Use", icon: Layers },
];

const OWNERSHIP_TYPES = [
  "Freehold (Registered Owner)",
  "Sectional Title",
  "Leasehold",
  "Family Trust",
  "Company / CC Owned",
  "Other / Inherited",
];

export function JvPortal() {
  const [location, setLocation] = useState("Umhlanga");
  const [plotSize, setPlotSize] = useState(2500);
  const [unit, setUnit] = useState<"sqm" | "hectares">("sqm");
  const [zoningType, setZoningType] = useState<ZoningType>("Residential");
  const [ownershipType, setOwnershipType] = useState(OWNERSHIP_TYPES[0]);

  // Contact
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sizeUnit = unit === "hectares" ? "hectares" : "sqm";
  const estimate = useMemo(
    () => estimateJVYield({ location, plotSize, sizeUnit, zoningType }),
    [location, plotSize, sizeUnit, zoningType]
  );

  const sqmDisplay =
    unit === "hectares"
      ? `${formatNumber(plotSize)} ha (${formatNumber(plotSize * 10000)} m²)`
      : `${formatNumber(plotSize)} m² (${(plotSize / 10000).toFixed(2)} ha)`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Missing details",
        description: "Please add your name, email and phone so our JV desk can reach you.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please agree to be contacted by the DF Strang JV desk.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/jv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          location,
          plotSize,
          sizeUnit,
          zoningType,
          ownershipType,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      toast({
        title: "Land submission received",
        description: "Our JV acquisitions desk will contact you within 48 hours.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="partnerships" className="relative bg-crisp-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 gold-line" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-gold">
              Joint Ventures · Deal Sourcing
            </p>
            <span className="h-px w-10 gold-line" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Landowner &amp; Investor <span className="text-gradient-gold">Partnerships</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-ink/80 sm:text-lg">
            Own land with untapped potential? Partner your asset with our 40-year
            construction engine. Submit your land for co-development and unlock its
            gross development value — without selling your legacy.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
          {/* ---- FORM ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="card-prestige border border-border bg-white p-6 sm:p-10"
          >
            <div className="mb-8 flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-charcoal">
                <Landmark className="h-6 w-6 text-sand-gold" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-charcoal sm:text-2xl">
                  Submit Your Land / Asset for Co-Development
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live yield estimation updates as you complete the form.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Location */}
              <div>
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <MapPin className="h-4 w-4 text-sand-gold" />
                  Location / Precinct
                </Label>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className={cn(
                        "border px-3.5 py-2 text-xs font-medium uppercase tracking-wide transition-all sm:text-[13px]",
                        location === loc
                          ? "border-sand-gold bg-charcoal text-sand-gold"
                          : "border-border bg-white text-slate-ink hover:border-sand-gold/50 hover:bg-sand-gold/5"
                      )}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot size */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                    <Ruler className="h-4 w-4 text-sand-gold" />
                    Plot Size
                  </Label>
                  <div className="flex border border-border text-xs font-semibold uppercase tracking-wide">
                    {(["sqm", "hectares"] as const).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => {
                          if (u === unit) return;
                          setUnit(u);
                          setPlotSize(
                            u === "hectares"
                              ? Math.max(0.05, Math.round((plotSize / 10000) * 100) / 100)
                              : Math.min(50000, Math.round(plotSize * 10000))
                          );
                        }}
                        className={cn(
                          "px-3 py-1.5 transition-colors",
                          unit === u
                            ? "bg-charcoal text-sand-gold"
                            : "bg-white text-muted-foreground hover:text-charcoal"
                        )}
                      >
                        {u === "sqm" ? "m²" : "ha"}
                      </button>
                    ))}
                  </div>
                </div>
                <Slider
                  value={[plotSize]}
                  onValueChange={(v) => setPlotSize(v[0])}
                  min={unit === "hectares" ? 0.05 : 500}
                  max={unit === "hectares" ? 5 : 50000}
                  step={unit === "hectares" ? 0.05 : 100}
                  className="[&_[data-slot=slider-range]]:bg-sand-gold [&_[data-slot=slider-thumb]]:border-sand-gold"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{sqmDisplay}</span>
                  <span>
                    {unit === "hectares" ? "0.05 – 5 ha" : "500 – 50,000 m²"}
                  </span>
                </div>
              </div>

              {/* Zoning */}
              <div>
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <Building2 className="h-4 w-4 text-sand-gold" />
                  Zoning Type
                </Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ZONINGS.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setZoningType(value)}
                      className={cn(
                        "flex flex-col items-center gap-2 border px-3 py-4 text-xs font-semibold uppercase tracking-wide transition-all",
                        zoningType === value
                          ? "border-sand-gold bg-charcoal text-sand-gold shadow-md"
                          : "border-border bg-white text-slate-ink hover:border-sand-gold/50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ownership */}
              <div>
                <Label className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <KeyRound className="h-4 w-4 text-sand-gold" />
                  Ownership Type
                </Label>
                <select
                  value={ownershipType}
                  onChange={(e) => setOwnershipType(e.target.value)}
                  className="h-11 w-full border border-input bg-white px-3 text-sm text-charcoal outline-none transition-colors focus:border-sand-gold"
                >
                  {OWNERSHIP_TYPES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="border-border" />

              {/* Contact details */}
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Your Details
                </h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="jv-name" className="mb-1.5 text-xs text-muted-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="jv-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Thandi Mkhize"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jv-email" className="mb-1.5 text-xs text-muted-foreground">
                      Email *
                    </Label>
                    <Input
                      id="jv-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.za"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jv-phone" className="mb-1.5 text-xs text-muted-foreground">
                      Phone *
                    </Label>
                    <Input
                      id="jv-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27 82 000 0000"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="jv-notes" className="mb-1.5 text-xs text-muted-foreground">
                    Anything we should know about the land?
                  </Label>
                  <Textarea
                    id="jv-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Existing structures, views, access roads, services available…"
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                  <Switch checked={consent} onCheckedChange={setConsent} aria-label="Consent to be contacted" />
                  <span>
                    I consent to DF Strang Buildings contacting me about
                    co-development opportunities on this asset.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-13 w-full bg-charcoal text-sm font-semibold uppercase tracking-wider text-sand-gold transition-colors hover:bg-deep-slate disabled:opacity-60 sm:h-14 sm:text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Handshake className="h-5 w-5" />
                    Request JV Evaluation
                  </>
                )}
              </Button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 border border-sand-gold/40 bg-sand-gold/10 p-4 text-sm text-charcoal"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sand-gold" />
                  <p>
                    <strong>Received.</strong> Reference logged — our acquisitions desk
                    will call within 48 hours with a preliminary land assessment.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ---- LIVE YIELD ESTIMATOR ---- */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:sticky lg:top-24 lg:self-start"
            aria-live="polite"
          >
            <div className="overflow-hidden border border-sand-gold/30 bg-charcoal">
              <div className="border-b border-white/10 bg-deep-slate/60 px-6 py-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sand-gold">
                  <TrendingUp className="h-4 w-4" />
                  Dynamic Yield Estimator
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Updates live as the land details are completed
                </p>
              </div>

              <div className="architect-grid space-y-6 px-6 py-7">
                {/* GDV headline */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    Estimated Gross Development Value
                  </p>
                  <motion.p
                    key={estimate.estimatedGDV}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl font-semibold text-sand-gold sm:text-[2.6rem]"
                  >
                    {formatRand(estimate.estimatedGDV, true)}
                  </motion.p>
                  <p className="mt-1 text-xs text-white/45">
                    Precise: {formatRand(estimate.estimatedGDV)}
                  </p>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                  <div className="bg-deep-slate px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Developable Bulk</p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      {formatNumber(estimate.developableBulkSqm)} m²
                    </p>
                  </div>
                  <div className="bg-deep-slate px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">
                      {zoningType === "Residential" ? "Indicative Units" : "Indicative Spaces"}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      {estimate.indicativeUnits > 0 ? `~${estimate.indicativeUnits}` : "—"}
                    </p>
                  </div>
                  <div className="bg-deep-slate px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Est. Build Cost</p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      {formatRand(estimate.estConstructionCost, true)}
                    </p>
                  </div>
                  <div className="bg-deep-slate px-4 py-3.5">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Residual Land Value</p>
                    <p className="mt-1 font-display text-lg font-semibold text-sand-gold">
                      {formatRand(estimate.residualLandValue, true)}
                    </p>
                  </div>
                </div>

                {/* JV structure bar */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <p className="flex items-center gap-1.5 uppercase tracking-wider text-white/55">
                      <PieChart className="h-3.5 w-3.5 text-sand-gold" />
                      Indicative Land-Equity Stake
                    </p>
                    <p className="font-display text-base font-semibold text-sand-gold">
                      ~{estimate.jvEquityShare}%
                    </p>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sand-gold to-sand-gold-bright"
                      animate={{ width: `${estimate.jvEquityShare}%` }}
                      transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/40">
                    Indicative share of completed development value attributable to land
                    equity — final structure negotiated per deal.
                  </p>
                </div>

                {/* Profile note */}
                <div className="border border-white/10 bg-white/5 p-4">
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-white/60">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-gold" />
                    {estimate.profile.label} in {location} — market demand rated{" "}
                    <strong className="text-sand-gold">{estimate.landRate.demand}</strong>.
                    Rates benchmarked to the KZN north coast corridor.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 bg-deep-slate/40 px-6 py-4">
                <a
                  href="#calculator"
                  className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand-gold transition-colors hover:text-white"
                >
                  Next: model construction feasibility →
                </a>
              </div>
            </div>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Estimates are indicative desktop figures, not a formal valuation.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Sun,
  Droplets,
  ClipboardCheck,
  Wrench,
  PhoneCall,
  CalendarClock,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Leaf,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  tagline: string;
  monthly: string;
  target: string;
  features: string[];
  icon: React.ElementType;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Estate Care Essential",
    tagline: "Post-handover preventative maintenance for private homes",
    monthly: "R2 450",
    target: "Private residences & new handovers",
    icon: ShieldCheck,
    features: [
      "Bi-annual structural & envelope inspections",
      "Preventative maintenance schedule & reporting",
      "Solar / inverter / grid system upkeep checks",
      "Plumbing, roofing & waterproofing health checks",
      "Priority booking window for minor alterations",
      "Handover defects management (12-month NHBRC window)",
    ],
  },
  {
    name: "Estate Care Retainer",
    tagline: "Full-spectrum care for premium estates and complexes",
    monthly: "R6 900",
    target: "Luxury estates, lifestyle complexes & Body Corporates",
    icon: CalendarClock,
    featured: true,
    features: [
      "Monthly preventative maintenance visits",
      "Dedicated account supervisor & 24h emergency line",
      "Structural inspections with engineered reporting",
      "Solar, battery & micro-grid performance upkeep",
      "Garden infrastructure, pools & outdoor systems",
      "Annual dilapidation & insurance condition survey",
      "Guaranteed 4-hour emergency response, KZN corridor",
    ],
  },
  {
    name: "Commercial Facilities Management",
    tagline: "24/7 compliance-driven management for commercial assets",
    monthly: "Custom",
    target: "Office parks, retail & industrial facilities",
    icon: Building2,
    features: [
      "24/7 priority compliance & escalation desk",
      "HVAC, water & electrical micro-grid maintenance",
      "Tenant fit-out servicing & alterations management",
      "OHS Act, fire & insurance compliance auditing",
      "Planned preventative maintenance (PPM) programme",
      "Live asset register & monthly performance reporting",
      "Dedicated on-site or on-call engineering cover",
    ],
  },
];

const VALUE_STATS = [
  { icon: Wrench, label: "40+ yrs in-house trades & subcontractor network" },
  { icon: Leaf, label: "Solar, water & micro-grid specialists on retainer" },
  { icon: PhoneCall, label: "One accountable partner — no fragmented vendors" },
];

function RetainerQuoteModal({
  open,
  onOpenChange,
  preselectedTier,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  preselectedTier: string;
}) {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Estate / Residential");
  const [propertySize, setPropertySize] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Missing details",
        description: "Please complete your name, email and phone number.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/retainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          propertyType,
          serviceTier: preselectedTier,
          propertySize: propertySize ? Number(propertySize) : null,
          frequency,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setDone(true);
      toast({
        title: "Retainer enquiry received",
        description: "Our Estate Care team will respond within one business day.",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-white p-6 sm:max-w-lg sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-charcoal">
            Request Custom Retainer Quote
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            Tell us about your property and we&apos;ll tailor an Estate Care plan.
            Currently enquiring about:{" "}
            <span className="font-semibold text-sand-gold">{preselectedTier}</span>
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-sand-gold" />
            <p className="font-display text-xl text-charcoal">Thank you.</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Your retainer enquiry is logged. A DF Strang Estate Care supervisor will
              contact you within one business day to arrange a site assessment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="rq-name" className="mb-1.5 text-xs text-muted-foreground">
                  Full Name *
                </Label>
                <Input id="rq-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="e.g. Sipho Ndlovu" />
              </div>
              <div>
                <Label htmlFor="rq-company" className="mb-1.5 text-xs text-muted-foreground">
                  Estate / Company
                </Label>
                <Input id="rq-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Zimbali Estate" />
              </div>
              <div>
                <Label htmlFor="rq-email" className="mb-1.5 text-xs text-muted-foreground">
                  Email *
                </Label>
                <Input id="rq-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.co.za" />
              </div>
              <div>
                <Label htmlFor="rq-phone" className="mb-1.5 text-xs text-muted-foreground">
                  Phone *
                </Label>
                <Input id="rq-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+27 82 000 0000" />
              </div>
              <div>
                <Label htmlFor="rq-type" className="mb-1.5 text-xs text-muted-foreground">
                  Property Type
                </Label>
                <select
                  id="rq-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="h-10 w-full border border-input bg-white px-3 text-sm outline-none focus:border-sand-gold"
                >
                  <option>Estate / Residential</option>
                  <option>Commercial Office</option>
                  <option>Retail</option>
                  <option>Industrial</option>
                  <option>Body Corporate / HOA Portfolio</option>
                </select>
              </div>
              <div>
                <Label htmlFor="rq-size" className="mb-1.5 text-xs text-muted-foreground">
                  Approx. Size (m²)
                </Label>
                <Input id="rq-size" type="number" min={0} value={propertySize} onChange={(e) => setPropertySize(e.target.value)} placeholder="e.g. 450" />
              </div>
            </div>
            <div>
              <Label htmlFor="rq-freq" className="mb-1.5 text-xs text-muted-foreground">
                Preferred Service Frequency
              </Label>
              <select
                id="rq-freq"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="h-10 w-full border border-input bg-white px-3 text-sm outline-none focus:border-sand-gold"
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
                <option>24/7 Full Management</option>
              </select>
            </div>
            <div>
              <Label htmlFor="rq-notes" className="mb-1.5 text-xs text-muted-foreground">
                Scope Notes
              </Label>
              <Textarea
                id="rq-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Solar systems, pools, HVAC, number of units, specific concerns…"
                className="resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full bg-charcoal text-sm font-semibold uppercase tracking-wider text-sand-gold hover:bg-deep-slate disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" /> Submit Retainer Enquiry
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function EstateCare() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Estate Care Retainer");

  function openQuote(tier: string) {
    setSelectedTier(tier);
    setQuoteOpen(true);
  }

  return (
    <section id="estate-care" className="relative overflow-hidden bg-deep-slate py-20 sm:py-28">
      <div className="absolute inset-0 architect-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 gold-line" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-gold">
              Recurring Revenue · Lifetime Asset Care
            </p>
            <span className="h-px w-10 gold-line" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-medium text-white sm:text-4xl lg:text-[2.75rem]">
            DF Strang Estate Care &amp;{" "}
            <span className="text-gradient-gold">Facilities Management</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
            A building is not a once-off transaction — it&apos;s a 50-year asset.
            Our care retainers protect your investment&apos;s value, compliance and
            performance long after handover, backed by the team that built it.
          </p>
        </div>

        {/* Value stats */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {VALUE_STATS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-3"
            >
              <Icon className="h-5 w-5 shrink-0 text-sand-gold" />
              <p className="text-xs leading-snug text-white/70">{label}</p>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={cn(
                "relative flex flex-col border bg-charcoal/80 backdrop-blur-sm",
                tier.featured
                  ? "border-sand-gold shadow-[0_0_50px_-12px_rgba(197,160,89,0.45)] lg:-translate-y-3"
                  : "border-white/10"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sand-gold px-4 py-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal">
                    Most Popular
                  </p>
                </div>
              )}

              <div className="border-b border-white/10 p-6 sm:p-7">
                <tier.icon className="h-8 w-8 text-sand-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{tier.tagline}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-semibold text-sand-gold">
                    {tier.monthly}
                  </span>
                  {tier.monthly !== "Custom" && (
                    <span className="text-xs uppercase tracking-wider text-white/45">
                      / month, excl. VAT
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide text-white/40">
                  Ideal for: {tier.target}
                </p>
              </div>

              <div className="flex-1 space-y-3 p-6 sm:p-7">
                {tier.features.map((f) => (
                  <p key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sand-gold" />
                    {f}
                  </p>
                ))}
              </div>

              <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                <button
                  type="button"
                  onClick={() => openQuote(tier.name)}
                  className={cn(
                    "flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all",
                    tier.featured
                      ? "bg-sand-gold text-charcoal hover:bg-sand-gold-bright"
                      : "border border-sand-gold/60 text-sand-gold hover:bg-sand-gold hover:text-charcoal"
                  )}
                >
                  {tier.monthly === "Custom" ? "Request 24/7 FM Proposal" : "Request Custom Retainer Quote"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline CTA strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border border-sand-gold/25 bg-charcoal/70 px-6 py-6 backdrop-blur-sm sm:px-10 lg:flex-row">
          <div className="flex items-center gap-4">
            <Sparkles className="h-8 w-8 shrink-0 text-sand-gold" aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-medium text-white">
                Completed a build with us? Your first 3 months of Estate Care Essential are on the house.
              </p>
              <p className="text-sm text-white/55">
                Handover-to-lifetime care — the same trusted team, for the life of your asset.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openQuote("Estate Care Essential (Post-Handover Offer)")}
            className="shrink-0 border border-sand-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-sand-gold transition-colors hover:bg-sand-gold hover:text-charcoal"
          >
            Claim Offer
          </button>
        </div>
      </div>

      <RetainerQuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        preselectedTier={selectedTier}
      />
    </section>
  );
}

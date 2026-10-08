/**
 * DF Strang Buildings — Estimation Engine
 * Powers the JV Dynamic Yield Estimator and the Real-Time Feasibility Calculator.
 * Rates are calibrated to 2024/25 KwaZulu-Natal construction market benchmarks.
 */

export type ZoningType = "Residential" | "Commercial" | "Industrial" | "Mixed-Use";
export type SizeUnit = "sqm" | "hectares";
export type DevelopmentType =
  | "bespoke-residential"
  | "commercial-office-park"
  | "industrial-warehousing"
  | "major-renovation";
export type QualityTier = "standard" | "ultra";

/* ------------------------------------------------------------------ */
/* JV — LANDOWNER & INVESTOR PARTNERSHIP YIELD ESTIMATOR               */
/* ------------------------------------------------------------------ */

export interface JVInput {
  location: string;
  plotSize: number;
  sizeUnit: SizeUnit;
  zoningType: ZoningType;
}

export interface JVOutput {
  plotSqm: number;
  developableBulkSqm: number;
  estimatedGDV: number;
  gdvPerHectare: number;
  indicativeUnits: number;
  estConstructionCost: number;
  residualLandValue: number;
  landValuePerSqm: number;
  jvEquityShare: number; // indicative land-equity stake %
  profile: ZoningProfile;
  landRate: LandRate;
}

interface LandRate {
  landValuePerSqm: number;
  demand: "Prime" | "Strong" | "Growing" | "Established";
}

interface ZoningProfile {
  bulkFactor: number; // FAR — floor area ratio
  coverage: number; // % of plot that may be built on
  saleRatePerSqm: number; // completed GDV rate
  avgUnitSize: number;
  buildCostPerSqm: number;
  label: string;
}

/** Indicative land values — KZN corridor (Durban North to Ballito), 2024/25 */
export const LOCATION_RATES: Record<string, LandRate> = {
  Umhlanga: { landValuePerSqm: 4800, demand: "Prime" },
  Ballito: { landValuePerSqm: 3100, demand: "Prime" },
  "Mount Edgecombe": { landValuePerSqm: 3400, demand: "Strong" },
  "Durban North": { landValuePerSqm: 2900, demand: "Strong" },
  Westville: { landValuePerSqm: 2400, demand: "Established" },
  "La Lucia": { landValuePerSqm: 3200, demand: "Strong" },
  "uMhlanga Ridge": { landValuePerSqm: 4600, demand: "Prime" },
  Zimbali: { landValuePerSqm: 4200, demand: "Prime" },
  "Springfield Park": { landValuePerSqm: 1900, demand: "Growing" },
  "River Horse Valley": { landValuePerSqm: 1700, demand: "Growing" },
  "Other KZN": { landValuePerSqm: 1400, demand: "Growing" },
};

/** Zoning development profiles — calibrated to eThekwini municipal scheme norms */
export const ZONING_PROFILES: Record<ZoningType, ZoningProfile> = {
  Residential: {
    bulkFactor: 1.1,
    coverage: 0.5,
    saleRatePerSqm: 19500,
    avgUnitSize: 180,
    buildCostPerSqm: 13500,
    label: "Residential / Townhouse Development",
  },
  Commercial: {
    bulkFactor: 1.5,
    coverage: 0.55,
    saleRatePerSqm: 16500,
    avgUnitSize: 250,
    buildCostPerSqm: 11800,
    label: "Commercial / Office Development",
  },
  Industrial: {
    bulkFactor: 1.0,
    coverage: 0.6,
    saleRatePerSqm: 9500,
    avgUnitSize: 800,
    buildCostPerSqm: 7200,
    label: "Industrial / Warehousing Development",
  },
  "Mixed-Use": {
    bulkFactor: 1.6,
    coverage: 0.6,
    saleRatePerSqm: 17500,
    avgUnitSize: 220,
    buildCostPerSqm: 12800,
    label: "Mixed-Use Precinct Development",
  },
};

export function estimateJVYield(input: JVInput): JVOutput {
  const plotSqm =
    input.sizeUnit === "hectares" ? input.plotSize * 10000 : input.plotSize;
  const profile = ZONING_PROFILES[input.zoningType];
  const landRate =
    LOCATION_RATES[input.location] ?? LOCATION_RATES["Other KZN"];

  const developableBulkSqm = Math.round(plotSqm * profile.bulkFactor);
  const estimatedGDV = developableBulkSqm * profile.saleRatePerSqm;
  const estConstructionCost = developableBulkSqm * profile.buildCostPerSqm;
  const indicativeUnits =
    Math.floor(developableBulkSqm / profile.avgUnitSize) || 0;

  // Residual land value: GDV minus build, professional fees & contingency
  const residualLandValue = Math.round(
    (estimatedGDV - estConstructionCost) * 0.82
  );

  // Land-equity JV share: land value as % of total project capital
  const projectCapital = residualLandValue + estConstructionCost;
  const jvEquityShare = Math.min(
    45,
    Math.max(15, Math.round((residualLandValue / projectCapital) * 100))
  );

  return {
    plotSqm,
    developableBulkSqm,
    estimatedGDV,
    gdvPerHectare: plotSqm > 0 ? Math.round((estimatedGDV / plotSqm) * 10000) : 0,
    indicativeUnits,
    estConstructionCost,
    residualLandValue,
    landValuePerSqm: landRate.landValuePerSqm,
    jvEquityShare,
    profile,
    landRate,
  };
}

/* ------------------------------------------------------------------ */
/* FEASIBILITY & BUDGET CALCULATOR                                     */
/* ------------------------------------------------------------------ */

export interface FeasibilityInput {
  developmentType: DevelopmentType;
  footprintSqm: number;
  qualityTier: QualityTier;
  addOns: {
    solar: boolean;
    rainwater: boolean;
    automation: boolean;
  };
}

export interface FeasibilityOutput {
  devTypeLabel: string;
  areaSqm: number;
  costLow: number;
  costHigh: number;
  costPerSqm: number;
  timelineWeeks: number;
  timelineLabel: string;
  breakdown: { label: string; pct: number; amount: number; color: string }[];
  addOnTotal: number;
  addOnLabels: string[];
  buildRate: number;
}

interface DevTypeProfile {
  label: string;
  standard: number; // build rate R/sqm
  ultra: number;
  baseWeeks: number;
  weeksPerSqm: number;
  minWeeks: number;
}

export const DEV_TYPE_PROFILES: Record<DevelopmentType, DevTypeProfile> = {
  "bespoke-residential": {
    label: "High-End Bespoke Residential",
    standard: 16500,
    ultra: 28000,
    baseWeeks: 26,
    weeksPerSqm: 0.024,
    minWeeks: 22,
  },
  "commercial-office-park": {
    label: "Commercial Office Park",
    standard: 12800,
    ultra: 18200,
    baseWeeks: 32,
    weeksPerSqm: 0.028,
    minWeeks: 30,
  },
  "industrial-warehousing": {
    label: "Industrial / Warehousing",
    standard: 8200,
    ultra: 12000,
    baseWeeks: 24,
    weeksPerSqm: 0.018,
    minWeeks: 20,
  },
  "major-renovation": {
    label: "Major Renovation / Alteration",
    standard: 8800,
    ultra: 15500,
    baseWeeks: 14,
    weeksPerSqm: 0.03,
    minWeeks: 10,
  },
};

export const ADDON_RATES = {
  solar: { label: "Solar & Off-Grid Battery Systems", ratePerSqm: 2150 },
  rainwater: { label: "Rainwater Harvesting", ratePerSqm: 420 },
  automation: { label: "Smart Home / Building Automation", ratePerSqm: 780 },
} as const;

export function estimateFeasibility(input: FeasibilityInput): FeasibilityOutput {
  const profile = DEV_TYPE_PROFILES[input.developmentType];
  const area = input.footprintSqm;
  const buildRate = input.qualityTier === "ultra" ? profile.ultra : profile.standard;

  const baseCost = area * buildRate;

  const addOnLabels: string[] = [];
  let addOnTotal = 0;
  if (input.addOns.solar) {
    addOnTotal += area * ADDON_RATES.solar.ratePerSqm;
    addOnLabels.push(ADDON_RATES.solar.label);
  }
  if (input.addOns.rainwater) {
    addOnTotal += area * ADDON_RATES.rainwater.ratePerSqm;
    addOnLabels.push(ADDON_RATES.rainwater.label);
  }
  if (input.addOns.automation) {
    addOnTotal += area * ADDON_RATES.automation.ratePerSqm;
    addOnLabels.push(ADDON_RATES.automation.label);
  }

  // ±12% planning range around base + add-ons
  const mid = baseCost + addOnTotal;
  const costLow = Math.round(mid * 0.9);
  const costHigh = Math.round(mid * 1.14);
  const costPerSqm = Math.round(mid / area);

  // Timeline scales with area & complexity
  const rawWeeks = profile.baseWeeks + area * profile.weeksPerSqm * (input.qualityTier === "ultra" ? 1.12 : 1);
  const timelineWeeks = Math.max(profile.minWeeks, Math.round(rawWeeks / 2) * 2);

  // Cost breakdown (construction share shrinks as add-ons grow)
  const construction = baseCost;
  const professional = mid * 0.11;
  const siteworks = mid * 0.08;
  const contingency = mid * 0.09;
  const totalBase = construction + professional + siteworks + contingency + addOnTotal;

  const breakdown = [
    {
      label: "Construction",
      pct: construction / totalBase,
      amount: construction,
      color: "#1E293B",
    },
    {
      label: "Professional Fees",
      pct: professional / totalBase,
      amount: professional,
      color: "#334155",
    },
    {
      label: "Site Works & Services",
      pct: siteworks / totalBase,
      amount: siteworks,
      color: "#64748B",
    },
    {
      label: "Contingency",
      pct: contingency / totalBase,
      amount: contingency,
      color: "#94A3B8",
    },
    {
      label: "Green Tech & Smart Systems",
      pct: addOnTotal / totalBase,
      amount: addOnTotal,
      color: "#C5A059",
    },
  ].filter((b) => b.amount > 0);

  return {
    devTypeLabel: profile.label,
    areaSqm: area,
    costLow,
    costHigh,
    costPerSqm,
    timelineWeeks,
    timelineLabel: formatTimeline(timelineWeeks),
    breakdown,
    addOnTotal,
    addOnLabels,
    buildRate,
  };
}

export function formatTimeline(weeks: number): string {
  const months = weeks / 4.33;
  if (months < 6) return `${Math.round(months)} months`;
  const m = Math.round(months * 10) / 10;
  return `${m} months`;
}

/* ------------------------------------------------------------------ */
/* FORMATTERS                                                          */
/* ------------------------------------------------------------------ */

export function formatRand(value: number, compact = false): string {
  if (compact) {
    if (Math.abs(value) >= 1_000_000_000) return `R${(value / 1_000_000_000).toFixed(2)}B`;
    if (Math.abs(value) >= 1_000_000) return `R${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1_000) return `R${(value / 1_000).toFixed(0)}K`;
  }
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-ZA");
}

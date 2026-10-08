import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  estimateFeasibility,
  type DevelopmentType,
  type QualityTier,
} from "@/lib/calculators";

const VALID_TYPES: DevelopmentType[] = [
  "bespoke-residential",
  "commercial-office-park",
  "industrial-warehousing",
  "major-renovation",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, developmentType, footprintSqm, qualityTier, addOns } =
      body ?? {};

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please complete all contact fields." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    const area = Number(footprintSqm);
    if (!Number.isFinite(area) || area < 50) {
      return NextResponse.json(
        { error: "Invalid footprint area." },
        { status: 400 }
      );
    }
    const devType = VALID_TYPES.includes(developmentType)
      ? developmentType
      : "bespoke-residential";
    const tier: QualityTier = qualityTier === "ultra" ? "ultra" : "standard";

    const addons = {
      solar: Boolean(addOns?.solar),
      rainwater: Boolean(addOns?.rainwater),
      automation: Boolean(addOns?.automation),
    };

    const estimate = estimateFeasibility({
      developmentType: devType,
      footprintSqm: area,
      qualityTier: tier,
      addOns: addons,
    });

    const lead = await db.feasibilityLead.create({
      data: {
        fullName: String(fullName).slice(0, 200),
        email: String(email).slice(0, 320),
        phone: String(phone).slice(0, 40),
        developmentType: devType,
        footprintSqm: area,
        qualityTier: tier,
        addOns: JSON.stringify(addons),
        estCostLow: estimate.costLow,
        estCostHigh: estimate.costHigh,
        estTimelineWeeks: estimate.timelineWeeks,
      },
    });

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("Feasibility lead error:", err);
    return NextResponse.json(
      { error: "Unable to generate your report right now. Please try again." },
      { status: 500 }
    );
  }
}

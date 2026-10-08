import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { estimateJVYield, type JVInput } from "@/lib/calculators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, phone, location, plotSize, sizeUnit, zoningType, ownershipType, notes } =
      body ?? {};

    // Server-side validation
    if (!fullName || !email || !phone || !location || !plotSize || !zoningType || !ownershipType) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    const size = Number(plotSize);
    if (!Number.isFinite(size) || size <= 0) {
      return NextResponse.json(
        { error: "Plot size must be a positive number." },
        { status: 400 }
      );
    }

    const input: JVInput = {
      location,
      plotSize: size,
      sizeUnit: sizeUnit === "hectares" ? "hectares" : "sqm",
      zoningType,
    };
    const estimate = estimateJVYield(input);

    const lead = await db.jVLead.create({
      data: {
        fullName: String(fullName).slice(0, 200),
        email: String(email).slice(0, 320),
        phone: String(phone).slice(0, 40),
        location: String(location).slice(0, 120),
        plotSize: size,
        sizeUnit: input.sizeUnit,
        zoningType: String(zoningType).slice(0, 60),
        ownershipType: String(ownershipType).slice(0, 80),
        gdvEstimate: estimate.estimatedGDV,
        notes: notes ? String(notes).slice(0, 2000) : null,
      },
    });

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      estimate: {
        gdv: estimate.estimatedGDV,
        bulk: estimate.developableBulkSqm,
        units: estimate.indicativeUnits,
        jvEquityShare: estimate.jvEquityShare,
      },
    });
  } catch (err) {
    console.error("JV lead error:", err);
    return NextResponse.json(
      { error: "Unable to submit your enquiry right now. Please try again." },
      { status: 500 }
    );
  }
}

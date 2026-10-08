import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, company, email, phone, propertyType, serviceTier, propertySize, frequency, notes } =
      body ?? {};

    if (!fullName || !email || !phone || !propertyType || !serviceTier) {
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

    const lead = await db.retainerLead.create({
      data: {
        fullName: String(fullName).slice(0, 200),
        company: company ? String(company).slice(0, 200) : null,
        email: String(email).slice(0, 320),
        phone: String(phone).slice(0, 40),
        propertyType: String(propertyType).slice(0, 80),
        serviceTier: String(serviceTier).slice(0, 120),
        propertySize:
          propertySize && Number.isFinite(Number(propertySize))
            ? Number(propertySize)
            : null,
        frequency: frequency ? String(frequency).slice(0, 40) : null,
        notes: notes ? String(notes).slice(0, 2000) : null,
      },
    });

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("Retainer lead error:", err);
    return NextResponse.json(
      { error: "Unable to submit your enquiry right now. Please try again." },
      { status: 500 }
    );
  }
}

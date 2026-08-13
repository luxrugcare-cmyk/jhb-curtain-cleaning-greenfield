import { NextResponse } from "next/server";
import { acceptLead } from "@/lib/lead-service";
import { LeadProcessingError, LeadValidationError } from "@/lib/errors";
import type { LeadPayload } from "@/types/lead";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const result = await acceptLead(payload);
    return NextResponse.json({ ok: true, ...result }, { status: 201 });
  } catch (error) {
    const status = error instanceof LeadValidationError ? 400 : error instanceof LeadProcessingError ? 503 : 500;
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unable to accept lead." }, { status });
  }
}

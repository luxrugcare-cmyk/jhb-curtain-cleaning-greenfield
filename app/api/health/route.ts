import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "jhb-curtain-cleaning-greenfield",
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown",
  });
}

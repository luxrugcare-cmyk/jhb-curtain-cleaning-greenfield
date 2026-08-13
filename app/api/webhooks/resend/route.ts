import { NextResponse } from "next/server";
import { verifyResendWebhook } from "@/integrations/resend/webhook";

const ALLOWED_EVENTS = new Set([
  "email.delivered",
  "email.bounced",
  "email.failed",
  "email.suppressed",
]);

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 503 });
  }

  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");
  if (!id || !timestamp || !signature) {
    return NextResponse.json({ ok: false, error: "Missing webhook signature headers." }, { status: 400 });
  }

  const payload = await request.text();
  try {
    const event = verifyResendWebhook({ payload, id, timestamp, signature, secret });
    if (ALLOWED_EVENTS.has(event.type)) {
      console.info("resend_webhook_event", {
        type: event.type,
        emailId: event.data?.email_id || null,
        templateId: event.data?.template_id || null,
        createdAt: event.created_at || null,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid webhook signature." }, { status: 401 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Verify event structure
    const eventType = payload.event || payload.type || "message.received";
    const data = payload.data || payload;

    const sender = data.from || data.sender;
    const recipient = data.to;
    const subject = data.subject || "(No subject)";
    const messageText = data.text || data.body || "";
    const threadId = data.thread_id || data.threadId;

    console.log(`[AgentMail Webhook] Received ${eventType} from ${sender}: "${subject}" (Thread: ${threadId})`);

    // Parse customer intent
    const lowerText = messageText.toLowerCase();
    const isQuoteApproval =
      lowerText.includes("accept") ||
      lowerText.includes("approved") ||
      lowerText.includes("go ahead") ||
      lowerText.includes("please proceed");

    const isDateBooking =
      lowerText.includes("available on") ||
      lowerText.includes("book for") ||
      lowerText.includes("schedule") ||
      lowerText.includes("tomorrow") ||
      lowerText.includes("friday");

    const intent = isQuoteApproval
      ? "quote_accepted"
      : isDateBooking
      ? "booking_requested"
      : "general_inquiry";

    return NextResponse.json(
      {
        ok: true,
        processed: true,
        eventType,
        intent,
        threadId,
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AgentMail Webhook] Error processing event:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid AgentMail webhook payload",
      },
      { status: 400 }
    );
  }
}

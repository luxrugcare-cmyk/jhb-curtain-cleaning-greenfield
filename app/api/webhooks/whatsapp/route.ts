import { NextRequest, NextResponse } from "next/server";
import { metaWhatsApp, WhatsAppWebhookPayload } from "@/lib/meta-whatsapp";
import { dispatchAgentMailLeadNotification } from "@/integrations/agentmail/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verified = metaWhatsApp.verifyWebhook(mode, token, challenge);
  if (verified) {
    return new NextResponse(verified, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const payload: WhatsAppWebhookPayload = await req.json();

    if (payload.object !== "whatsapp_business_account") {
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0]?.value;
    const messages = change?.messages;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: "no_messages" }, { status: 200 });
    }

    for (const msg of messages) {
      const fromNumber = msg.from;
      const contactName = change?.contacts?.[0]?.profile?.name || "WhatsApp Inquirer";

      let messageContent = "";
      if (msg.type === "text" && msg.text) {
        messageContent = msg.text.body;
      } else if (msg.type === "image") {
        messageContent = `[Sent Photo of Curtains/Fabric]: ${msg.image?.caption || "No caption"}`;
      } else if (msg.type === "interactive" && msg.interactive) {
        messageContent = `[Selected Option]: ${msg.interactive.button_reply?.title || msg.interactive.list_reply?.title}`;
      } else {
        messageContent = `[${msg.type.toUpperCase()} message]`;
      }

      // Notify Stephen via AgentMail immediately
      try {
        await dispatchAgentMailLeadNotification({
          kind: "residential",
          name: contactName,
          email: `${fromNumber}@c.us`,
          mobile: fromNumber,
          location: "Gauteng (WhatsApp)",
          scope: messageContent,
        });
      } catch (err) {
        console.error("AgentMail WhatsApp lead notification error:", err);
      }

      // Send automated smart response menu back to customer
      const greeting = `Hi ${contactName.split(" ")[0]}! Thanks for contacting JHB Curtain Cleaning.`;
      const body = `We specialize in on-site curtain and drapery restoration with zero fabric shrinkage. How can Stephen and the team assist you today?`;

      await metaWhatsApp.sendInteractiveMenu(fromNumber, greeting, body, [
        { id: "opt_residential", title: "Residential Clean" },
        { id: "opt_commercial", title: "Commercial / Hotel" },
        { id: "opt_trade", title: "10% Trade Partner" },
      ]);
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    console.error("WhatsApp webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

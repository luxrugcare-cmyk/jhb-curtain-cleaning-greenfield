import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_WEBHOOK_AGE_SECONDS = 5 * 60;

export type ResendWebhookEvent = {
  type: string;
  created_at?: string;
  data?: {
    email_id?: string;
    template_id?: string | null;
    [key: string]: unknown;
  };
};

function decodeSecret(secret: string) {
  const encoded = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  return Buffer.from(encoded, "base64");
}

function signaturesFromHeader(header: string) {
  return header
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.split(",", 2))
    .filter(([version, signature]) => version === "v1" && Boolean(signature))
    .map(([, signature]) => signature);
}

export function verifyResendWebhook(input: {
  payload: string;
  id: string;
  timestamp: string;
  signature: string;
  secret: string;
  nowMs?: number;
}): ResendWebhookEvent {
  const timestampNumber = Number(input.timestamp);
  if (!Number.isFinite(timestampNumber)) throw new Error("Invalid webhook timestamp.");

  const nowSeconds = Math.floor((input.nowMs ?? Date.now()) / 1000);
  if (Math.abs(nowSeconds - timestampNumber) > MAX_WEBHOOK_AGE_SECONDS) {
    throw new Error("Webhook timestamp outside allowed window.");
  }

  const signedPayload = `${input.id}.${input.timestamp}.${input.payload}`;
  const expected = createHmac("sha256", decodeSecret(input.secret)).update(signedPayload).digest();
  const candidates = signaturesFromHeader(input.signature);

  const verified = candidates.some((candidate) => {
    let actual: Buffer;
    try {
      actual = Buffer.from(candidate, "base64");
    } catch {
      return false;
    }
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });

  if (!verified) throw new Error("Invalid webhook signature.");

  const parsed = JSON.parse(input.payload) as ResendWebhookEvent;
  if (!parsed || typeof parsed.type !== "string") throw new Error("Invalid webhook payload.");
  return parsed;
}

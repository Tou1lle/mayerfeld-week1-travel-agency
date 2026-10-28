import { createHmac, timingSafeEqual } from "node:crypto";

// Stripe's HTTPS API is called directly with Node's built-in fetch.
// This avoids an extra runtime dependency; no card data touches our server.
export async function createCheckoutSession(fields) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith("sk_test_"))
    throw new Error("STRIPE_SECRET_KEY must be a Stripe test secret key");

  const body = new URLSearchParams();

  for (const [name, value] of Object.entries(fields)) {
    body.set(name, String(value));
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": "2025-02-24.acacia",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Stripe Checkout error:", data.error?.message);
    throw new Error("Unable to start Stripe Checkout");
  }
  return data;
}

export function verifyStripeWebhook(payload, signatureHeader) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !signatureHeader)
    throw new Error("Missing Stripe webhook secret or signature");

  const parts = signatureHeader.split(",").map((s) => s.trim().split("="));
  const timestamp = parts.find(([k]) => k === "t")?.[1];
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);

  if (!timestamp || !/^\d+$/.test(timestamp) || signatures.length === 0)
    throw new Error("Malformed Stripe signature");
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > 300)
    throw new Error("Stripe webhook timestamp outside tolerance");

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload.toString("utf8")}`)
    .digest();

  const valid = signatures.some((hex) => {
    if (!/^[a-f0-9]{64}$/i.test(hex)) return false;
    return timingSafeEqual(expected, Buffer.from(hex, "hex"));
  });

  if (!valid) throw new Error("Invalid Stripe webhook signature");

  return JSON.parse(payload.toString("utf8"));
}

import { Router } from "express";
import { pool } from "../db/pool.js";
import { verifyStripeWebhook } from "../lib/stripe.js";

const router = Router();
// Must be mounted before express.json() to retain the exact signed raw bytes.
router.post("/", async (req, res) => {
  let event;
  
  try {
    event = verifyStripeWebhook(req.body, req.get("stripe-signature"));
  } catch (error) {
    return res.status(400).send(`Webhook signature error: ${error.message}`);
  }
  
  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      if (session.payment_status === "paid" && session.mode === "payment") {
        // Stripe-signed session ID, expected total and currency must all match.
        // Repeated webhook deliveries are safe: the update is idempotent.
        await pool.query(
          `UPDATE orders SET status = 'paid', paid_at = COALESCE(paid_at, NOW()),
                  stripe_payment_intent_id = $1
            WHERE stripe_session_id = $2 AND total_cents = $3 AND currency = $4
              AND status = 'pending'`,
          [
            session.payment_intent ?? null,
            session.id,
            session.amount_total,
            session.currency,
          ],
        );
      }
    } else if (event.type === "checkout.session.expired") {
      await pool.query(
        "UPDATE orders SET status = 'expired' WHERE stripe_session_id = $1 AND status = 'pending'",
        [event.data.object.id],
      );
    }
    res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});
export default router;

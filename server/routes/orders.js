import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { createCheckoutSession } from "../lib/stripe.js";

const router = Router();
router.use(requireAuth);

router.post("/checkout", async (req, res, next) => {
  const tourId = req.body?.tourId;
  if (!Number.isSafeInteger(tourId) || tourId <= 0)
    return res.status(400).json({ error: "Valid tourId required" });
  const client = await pool.connect().catch(next);
  if (!client) return;
  let orderId;
  
  try {
    // Price is converted to cents in PostgreSQL (no JS floating point rounding).
    const { rows } = await client.query(
      "SELECT id, title, (price * 100)::integer AS price_cents FROM tours WHERE id = $1",
      [tourId],
    );
    if (!rows.length) return res.status(404).json({ error: "Tour not found" });
    
    const tour = rows[0];
    
    if (tour.price_cents < 50)
      return res
        .status(400)
        .json({ error: "Tour price is below Stripe's minimum" });
    
    await client.query("BEGIN");
    
    const inserted = await client.query(
      "INSERT INTO orders (user_id, total_cents) VALUES ($1, $2) RETURNING id",
      [req.user.id, tour.price_cents],
    );
    
    orderId = inserted.rows[0].id;
    
    await client.query(
      "INSERT INTO order_items (order_id, tour_id, title_snapshot, unit_price_cents, quantity) VALUES ($1,$2,$3,$4,1)",
      [orderId, tour.id, tour.title, tour.price_cents],
    );
    
    await client.query("COMMIT");
    
    const frontend = process.env.CLIENT_ORIGIN.replace(/\/$/, "");
    
    const session = await createCheckoutSession({
      mode: "payment",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][product_data][name]": tour.title,
      "line_items[0][price_data][unit_amount]": tour.price_cents,
      "line_items[0][quantity]": 1,
      success_url: `${frontend}/checkout/success?order_id=${orderId}`,
      cancel_url: `${frontend}/#tours`,
      "metadata[order_id]": orderId,
      client_reference_id: orderId,
    });
    
    await client.query(
      "UPDATE orders SET stripe_session_id = $1 WHERE id = $2",
      [session.id, orderId],
    );
    
    res.json({ url: session.url, orderId });
  } catch (error) {
    // In case of a DB failure before COMMIT, roll back; after COMMIT,
    // a Stripe failure leaves a pending order (never falsely paid).
    await client.query("ROLLBACK").catch(() => {});
    next(error);
  } finally {
    client.release();
  }
});

router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  
  if (!Number.isSafeInteger(id) || id <= 0)
    return res.status(400).json({ error: "Invalid order ID" });
  
  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.status, o.currency, o.total_cents, o.created_at, o.paid_at,
              COALESCE(json_agg(json_build_object('title', i.title_snapshot,
                'quantity', i.quantity, 'unit_price_cents', i.unit_price_cents))
                FILTER (WHERE i.id IS NOT NULL), '[]'::json) AS items
         FROM orders o LEFT JOIN order_items i ON i.order_id = o.id
        WHERE o.id = $1 AND o.user_id = $2
        GROUP BY o.id`,
      [id, req.user.id],
    );
    
    if (!rows.length) return res.status(404).json({ error: "Order not found" });
    res.json({ order: rows[0] });
  } catch (error) {
    next(error);
  }
});

export default router;

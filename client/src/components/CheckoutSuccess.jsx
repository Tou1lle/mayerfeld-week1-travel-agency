import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function CheckoutSuccess() {
  const orderId = new URLSearchParams(window.location.search).get("order_id");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!/^\d+$/.test(orderId || "")) {
      setError("Invalid order link");
      return;
    }

    let cancelled = false;
    let timeout;
    let count = 0;
    
    async function check() {
      try {
        const result = await api(`/orders/${orderId}`);
        if (cancelled) return;
        setOrder(result.order);
        count++;
        setAttempts(count);
        if (result.order.status === "pending" && count < 12)
          timeout = setTimeout(check, 2000);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    check();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [orderId]);

  return (
    <main className="min-h-screen bg-sand px-5 py-32 text-ink">
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <a href="/" className="font-bold text-ocean hover:underline">
          ← Wayfarer
        </a>
        <h1 className="mt-6 text-3xl font-bold">Your booking</h1>
        {error && (
          <p role="alert" className="mt-5 text-red-700">
            {error === "Request failed (401)"
              ? "Please sign in to view your order."
              : error}
          </p>
        )}
        {!error && !order && (
          <p className="mt-5" role="status">
            Checking your order…
          </p>
        )}
        {order && (
          <>
            <p className="mt-5">Order #{order.id}</p>
            <p className="mt-2 text-lg font-semibold" role="status">
              {order.status === "paid"
                ? "Payment confirmed! Thank you for your booking."
                : order.status === "expired"
                  ? "This checkout session expired."
                  : "Waiting for Stripe to confirm payment…"}
            </p>
            <ul className="mt-4 list-disc pl-5">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.title} × {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">
              Total: $
              {(order.total_cents / 100).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
            {order.status === "pending" && attempts >= 12 && (
              <button
                className="mt-5 rounded bg-ocean px-5 py-2 text-white"
                onClick={() => window.location.reload()}
              >
                Check again
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}

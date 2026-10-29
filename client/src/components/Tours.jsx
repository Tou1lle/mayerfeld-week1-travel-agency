import { useEffect, useState } from "react";
import { api } from "../lib/api";
import TourCard from "./TourCard";

export default function Tours({ user, onOpenAuth }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    api("/tours", { signal: controller.signal })
      .then(setTours)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const [checkoutId, setCheckoutId] = useState(null);
  async function checkout(tourId) {
    if (!user) return onOpenAuth();
    setError("");
    setCheckoutId(tourId);
    try {
      const result = await api("/orders/checkout", {
        method: "POST",
        body: JSON.stringify({ tourId }),
      });
      if (!result.url?.startsWith("https://checkout.stripe.com/"))
        throw new Error("Invalid checkout URL");
      window.location.assign(result.url);
    } catch (e) {
      setError(e.message);
      setCheckoutId(null);
    }
  }

  return (
    <section
      id="tours"
      className="mx-auto max-w-page scroll-mt-20 px-[15px] py-12"
    >
      <h2 className="mb-2 text-3xl font-bold text-ocean">Our tour packages</h2>
      <p>
        Six ways to go. Every price covers stays, guides and local transport.
      </p>
      {loading && (
        <p className="mt-6" role="status">
          Loading tours…
        </p>
      )}
      {error && (
        <p className="mt-6 text-red-700" role="alert">
          Could not load tours: {error}
        </p>
      )}
      <div className="grid grid-cols-1 gap-6 py-[25px] sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => (
          <TourCard key={t.id} tour={t} onCheckout={() => checkout(t.id)} checkoutLoading={checkoutId === t.id} />
        ))}
      </div>
    </section>
  );
}

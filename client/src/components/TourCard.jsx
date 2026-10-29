export default function TourCard({ tour, onCheckout, checkoutLoading }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[15px] bg-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={`/assets/${tour.image_file}`}
        alt={tour.image_alt}
        className="h-64 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-semibold">{tour.title}</h3>
        <div className="flex justify-between gap-2">
          <span>{tour.duration_days} days</span>
          <span className="font-semibold text-ocean">
            from ${Number(tour.price).toLocaleString("en-US")}
          </span>
        </div>
        <button type="button" onClick={onCheckout} disabled={checkoutLoading}
          className="cursor-pointer rounded-lg bg-ocean px-4 py-3 font-semibold text-white hover:bg-ink disabled:opacity-60">
          {checkoutLoading ? "Starting checkout…" : "Book now"}
        </button>
      </div>
    </article>
  );
}

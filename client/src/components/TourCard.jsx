export default function TourCard({ image, alt, title, duration, price }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[15px] bg-white transition-all duration-100 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(36,26,20,0.08)]">
      <img
        src={image}
        alt={alt}
        className="w-full object-cover"
      />

      <div className="flex flex-col gap-4 p-6">
        <h3>{title}</h3>

        <div className="flex justify-between">
          <p>{duration}</p>
          <p className="font-semibold text-ocean">{price}</p>
        </div>
      </div>
    </article>
  );
}

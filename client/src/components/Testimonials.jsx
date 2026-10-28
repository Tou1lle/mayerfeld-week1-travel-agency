const reviews = [
  ["John Doe", "Santorini Sunset Escape"],
  ["Jane Doe", "Kyoto Temples & Tea"],
  ["John Doe", "Patagonia Trail Week"],
];

const placeholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-page px-[15px] py-12">
        <h2 className="text-3xl font-bold text-ocean">What travellers say</h2>
        <div className="grid grid-cols-1 gap-6 pt-[25px] sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(([name, tour]) => (
            <article key={tour} className="rounded-[15px] bg-sand p-4">
              <p className="pb-5">{placeholder}</p>
              <h3 className="font-semibold">{name}</h3>
              <p>{tour}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

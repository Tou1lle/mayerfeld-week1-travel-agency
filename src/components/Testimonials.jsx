import TestimonialCard from "./TestimonialCard"

const testimonials = [
  {
    name: "John Doe",
    tour: "Santorini Sunset Escape",
  },
  {
    name: "Jane Doe",
    tour: "Kyoto Temples & Tea",
  },
  {
    name: "John Doe",
    tour: "Patagonia Trail Week",
  },
];

const testimonialText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white"
    >
      <div className="mx-auto max-w-page px-[15px] pb-10">
        <h2 className="pt-10 text-2xl text-ocean">
          What travellers say
        </h2>

        <div className="grid grid-cols-2 gap-6 pt-[25px] min-[641px]:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} text={testimonialText}></TestimonialCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import TourCard from "./TourCard";

import santorini from "../assets/destination-santorini.jpg";
import kyoto from "../assets/destination-kyoto.jpg";
import patagonia from "../assets/destination-patagonia.jpg";
import morocco from "../assets/destination-morocco.jpg";
import iceland from "../assets/destination-iceland.jpg";
import bali from "../assets/destination-bali.jpg";

const tours = [
  {
    image: santorini,
    alt: "View of Santorini",
    title: "Santorini Sunset Escape",
    duration: "7 days",
    price: "from $1,890",
  },
  {
    image: kyoto,
    alt: "Kyoto temple near a lake",
    title: "Kyoto Temples & Tea",
    duration: "9 days",
    price: "from $2,900",
  },
  {
    image: patagonia,
    alt: "Patagonia mountains and lake",
    title: "Patagonia Trail Week",
    duration: "8 days",
    price: "from $2,100",
  },
  {
    image: morocco,
    alt: "Morocco by the ocean",
    title: "Morocco Medina & Desert",
    duration: "6 days",
    price: "from $1,350",
  },
  {
    image: iceland,
    alt: "Iceland Ring Road",
    title: "Iceland Ring Road",
    duration: "10 days",
    price: "from $2,900",
  },
  {
    image: bali,
    alt: "Bali beach",
    title: "Bali Slow Travel",
    duration: "12 days",
    price: "from $1,980",
  },
];

export default function Tours() {
  return (
    <section
      id="tours"
      className="mx-auto max-w-page px-[15px] pb-0 pt-10"
    >
      <h2 className="pt-10 text-2xl text-ocean">
        Our tour packages
      </h2>

      <p>
        Six ways to go. Every price covers stays, guides and local transport.
      </p>

      <div className="grid grid-cols-1 gap-6 py-[25px] min-[641px]:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.title} {...tour} />
        ))}
      </div>
    </section>
  );
}

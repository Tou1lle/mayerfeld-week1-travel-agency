export default function Footer() {
  return (
    <footer id="plan" className="bg-sunset">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-[15px] py-6 text-center min-[641px]:flex-row min-[641px]:text-left">
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Ready to go somewhere?
          </h2>

          <p>
            Tell us when, where and with whom. We will reply with a draft
            itinerary within two working days.
          </p>
        </div>

        <a
          href="mailto:hello@wayfarer.example"
          className="shrink-0 cursor-pointer rounded-[15px] bg-ink px-6 py-4 text-sand transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand hover:text-ink hover:shadow-[0_8px_24px_rgba(36,26,20,0.08)]"
        >
          Plan your trip
        </a>
      </div>

      <div className="bg-ink px-[15px] py-6">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 text-sand min-[641px]:flex-row">
          <a href="#" className="font-bold">
            Wayfarer
          </a>

          <p>hello@wayfarer.example - 123 45 67</p>

          <p>© 2026 Wayfarer Travel</p>
        </div>
      </div>
    </footer>
  );
}

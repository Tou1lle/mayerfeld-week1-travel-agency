import mountain from "../assets/mountain-dark.jpg";

export default function Hero() {
  return (
    <section
      className="flex h-screen items-center bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className="mx-auto flex w-full max-w-page flex-col gap-6 px-[15px]">
        <h1 className="max-w-[700px] text-[3.5rem] min-[641px]:text-[5rem]">
          Travel slower. See further.
        </h1>

        <p>
          Small-group trips led by people who live where you are going.
        </p>

        <div className="flex gap-4">
          <a
            href="#plan"
            className="inline-block rounded-[10px] bg-sunset px-6 py-4 font-semibold text-ink transition-colors duration-100 hover:text-white"
          >
            Plan your trip
          </a>

          <a
            href="#tours"
            className="inline-block rounded-[10px] border border-white px-6 py-4 font-semibold text-white transition-colors duration-100 hover:border-sunset hover:text-sunset"
          >
            Browse tours
          </a>
        </div>
      </div>
    </section>
  );
}

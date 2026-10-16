export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-transparent">
      <nav className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-[15px] py-6 min-[641px]:flex-row">
        <a
          href="#"
          className="text-2xl font-bold text-ocean transition-colors duration-100 hover:text-white"
        >
          Wayfarer
        </a>

        <ul className="flex gap-6 text-ink">
          <li>
            <a
              href="#tours"
              className="transition-colors duration-100 hover:text-white"
            >
              Tours
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="transition-colors duration-100 hover:text-white"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#plan"
              className="transition-colors duration-100 hover:text-white"
            >
              Plan your trip
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

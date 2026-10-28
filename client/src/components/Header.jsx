import { useEffect, useState } from "react";

export default function Header({ user, onOpenAuth, onLogout }) {
  const [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    const update = () => setScroll(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  
  const progress = Math.min(scroll / 400, 1);
  const bg = `rgba(29,42,51,${progress})`;
  const text = progress > 0.5 ? "#f6efe4" : "#1d2a33";
  
  return (
    <header
      className="fixed inset-x-0 top-0 z-20"
      style={{ backgroundColor: bg }}
    >
      <nav className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-[15px] py-4 sm:py-6">
        <a
          href="#top"
          className="text-2xl font-bold text-[var(--nav-color)] hover:!text-sunset"
          style={{ "--nav-color": text }}
        >
          Wayfarer
        </a>
        <ul
          className="flex flex-wrap items-center gap-4 text-sm sm:gap-6 sm:text-base"
          style={{ color: text }}
        >
          <li>
            <a className="hover:underline underline-offset-4" href="#tours">
              Tours
            </a>
          </li>
          <li>
            <a
              className="hover:underline underline-offset-4"
              href="#testimonials"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a className="hover:underline underline-offset-4" href="#plan">
              Plan your trip
            </a>
          </li>
          <li>
            {user ? (
              <button
                className="cursor-pointer hover:underline"
                onClick={onLogout}
              >
                Sign out
              </button>
            ) : (
              <button
                className="cursor-pointer hover:underline"
                onClick={onOpenAuth}
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

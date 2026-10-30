import { useEffect, useState } from "react";
import { api } from "./lib/api";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tours from "./components/Tours";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import CheckoutSuccess from "./components/CheckoutSuccess";

export default function App() {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api("/auth/me")
      .then((d) => {
        if (active) setUser(d.user);
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    setError("");
    try {
      await api("/auth/logout", { method: "POST" });
      setUser(null);
    } catch (e) {
      setError(e.message);
    }
  }

  if (window.location.pathname === "/checkout/success")
    return <CheckoutSuccess />;

  return (
    <>
      <Header
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={logout}
      />
      {error && (
        <p
          role="alert"
          className="fixed bottom-4 right-4 z-30 rounded-lg bg-white p-4 text-red-700 shadow-lg"
        >
          {error}
        </p>
      )}
      <Hero />
      <main className="bg-sand">
        <Tours user={user} onOpenAuth={() => setAuthOpen(true)} />
        <Testimonials />
      </main>
      <Footer />
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setAuthOpen(false);
          }}
        />
      )}
    </>
  );
}

import { useState } from "react";
import { api } from "../lib/api";

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await api(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onSuccess(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-heading"
        className="w-full max-w-md rounded-2xl bg-sand p-7 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="auth-heading" className="text-2xl font-bold text-ocean">
            {mode === "login" ? "Sign in" : "Create account"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white p-3"
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              required
              minLength={mode === "signup" ? 8 : undefined}
              maxLength={128}
              type="password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white p-3"
            />
          </label>
          {error && (
            <p role="alert" className="text-red-700">
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className="cursor-pointer rounded-lg bg-ocean p-3 font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          className="mt-5 cursor-pointer text-ocean underline underline-offset-4"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
          }}
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already registered? Sign in"}
        </button>
      </div>
    </div>
  );
}

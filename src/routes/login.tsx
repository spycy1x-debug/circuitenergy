import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin login — Seralie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/analytics" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/analytics` },
        });
        if (err) throw err;
        setInfo("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        navigate({ to: "/admin/analytics" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] grid place-items-center bg-[oklch(0.13_0.03_245)] text-white px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-8">
        <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.2em]">
          <Lock className="h-3.5 w-3.5" />
          Admin access
        </div>
        <h1 className="mt-3 text-3xl font-semibold">
          {mode === "signin" ? "Sign in" : "Create admin account"}
        </h1>

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-white/55 font-semibold">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-white/40"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-white/55 font-semibold">
              Password
            </span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-white/40"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink font-semibold px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>

          {error && (
            <p className="text-sm text-[oklch(0.78_0.16_30)] text-center">{error}</p>
          )}
          {info && (
            <p className="text-sm text-[oklch(0.85_0.15_150)] text-center">{info}</p>
          )}

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setInfo("");
            }}
            className="text-xs text-white/60 hover:text-white underline underline-offset-4 mt-2"
          >
            {mode === "signin"
              ? "Need to create the admin account?"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Stethoscope, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const AUTH_BASE = `${API_BASE}/auth`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${AUTH_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Login failed");
      }

      if (payload.accessToken) {
        localStorage.setItem("gart_access_token", payload.accessToken);
      }
      if (payload.refreshToken) {
        localStorage.setItem("gart_refresh_token", payload.refreshToken);
      }
      if (payload.sessionId) {
        localStorage.setItem("gart_session_id", payload.sessionId);
      }
      if (payload.user) {
        localStorage.setItem("gart_user", JSON.stringify(payload.user));
      }
      window.dispatchEvent(new Event("auth:changed"));

      toast({
        title: "Login successful",
        description: "Welcome back to GART.",
      });
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(7,89,133,0.08),transparent_55%)]" />
        </div>

        <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Shield className="h-4 w-4" />
              Secure member access
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Welcome back to the global hub for radiation professionals.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Sign in to manage your membership, track events, and access continuing education
              resources tailored for radiotherapy and allied health specialists.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Verified member space",
                  body: "Protected access to certification and policy updates.",
                  icon: Lock,
                },
                {
                  title: "Clinical community",
                  body: "Stay connected with global radiation science peers.",
                  icon: Stethoscope,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card/90 p-6 shadow-lg sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Member Login</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">Continue your journey</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground">Email address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 text-xs text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="mt-2 text-right text-xs text-primary">Forgot password?</div>
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
                  Keep me signed in
                </label>
                <span className="text-xs">Secure login</span>
              </div>
              <Button
                className="w-full rounded-xl bg-primary text-white hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 border-t border-border/70 pt-5 text-center text-sm text-muted-foreground">
              New to GART?{" "}
              <a href="/register" className="font-semibold text-primary hover:underline">
                Create an account
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

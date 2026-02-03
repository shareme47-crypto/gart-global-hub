import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, GraduationCap, HeartHandshake, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const AUTH_BASE = `${API_BASE}/auth`;

  const handleRequestOtp = async () => {
    setError("");
    if (!email) {
      setError("Enter your email to receive the OTP.");
      return;
    }

    try {
      setOtpLoading(true);
      const response = await fetch(`${AUTH_BASE}/signup/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        const message = payload?.message || "Failed to send OTP";
        if (response.status === 409 || message.toLowerCase().includes("already")) {
          toast({
            title: "Already registered",
            description: "Redirecting to login...",
          });
          setTimeout(() => navigate("/login"), 2000);
          return;
        }
        throw new Error(message);
      }
      setOtpSent(true);
      setOtpVerified(false);
      toast({
        title: "OTP sent",
        description: "Check your email for the verification code.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send OTP";
      setError(message);
      toast({
        title: "OTP request failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!email || !otpCode) {
      setError("Enter the OTP sent to your email.");
      return;
    }

    try {
      setOtpLoading(true);
      const response = await fetch(`${AUTH_BASE}/signup/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "OTP verification failed");
      }
      setOtpVerified(true);
      toast({
        title: "OTP verified",
        description: "You can now create your account.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "OTP verification failed";
      setError(message);
      toast({
        title: "OTP verification failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!otpVerified) {
      setError("Please verify the OTP sent to your email.");
      return;
    }
    try {
      setSignupLoading(true);
      const response = await fetch(`${AUTH_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, phone, firstName, lastName }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Signup failed");
      }

      toast({
        title: "Account created",
        description: "Please log in to continue.",
      });
      localStorage.removeItem("gart_access_token");
      localStorage.removeItem("gart_refresh_token");
      localStorage.removeItem("gart_session_id");
      localStorage.removeItem("gart_user");
      window.dispatchEvent(new Event("auth:changed"));
      navigate("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      toast({
        title: "Signup failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-28 right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_55%)]" />
        </div>

        <section className="mx-auto grid min-h-[calc(100vh-140px)] max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary-foreground">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Create your GART profile
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Join a global network advancing radiation therapy excellence.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Sign up to access membership resources, conference updates, and collaborative learning
              tailored for students, clinicians, and allied health professionals.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Student", note: "Education resources & mentorship", icon: GraduationCap },
                { title: "Professional", note: "Certification & policy updates", icon: ShieldCheck },
                { title: "Volunteer", note: "Community outreach initiatives", icon: HeartHandshake },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card/90 p-6 shadow-lg sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Sign Up</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">Create your account</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground">Work email</label>
                <input
                  type="email"
                  placeholder="you@hospital.org"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={otpVerified}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              {!otpVerified ? (
                <>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={handleRequestOtp}
                      disabled={otpLoading}
                    >
                      {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                    <span className="flex items-center text-sm text-muted-foreground">
                      Verify your email to continue
                    </span>
                  </div>
                  {otpSent ? (
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                      <div>
                        <label className="text-sm font-medium text-foreground">OTP code</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="6-digit code"
                          value={otpCode}
                          onChange={(event) => setOtpCode(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <Button
                        type="button"
                        className="rounded-xl"
                        onClick={handleVerifyOtp}
                        disabled={otpLoading}
                      >
                        {otpLoading ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="text-sm text-primary font-semibold">Email verified</p>
              )}
              {otpVerified ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">First name</label>
                      <input
                        type="text"
                        placeholder="Aisha"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last name</label>
                      <input
                        type="text"
                        placeholder="Khan"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone (optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98XXXXXXXX"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Create password</label>
                    <div className="relative mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
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
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Confirm password</label>
                    <div className="relative mt-2">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 text-xs text-muted-foreground"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Verify your email to unlock the rest of the form.
                </p>
              )}
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-border text-primary"
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms" className="text-primary underline">
                    Terms & Conditions
                  </a>{" "}
                  and accept the GART membership guidelines.
                </span>
              </label>
              <Button
                className="w-full rounded-xl bg-primary text-white hover:bg-primary/90"
                disabled={signupLoading || !otpVerified}
              >
                {signupLoading ? "Creating account..." : "Create account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 border-t border-border/70 pt-5 text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <a href="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

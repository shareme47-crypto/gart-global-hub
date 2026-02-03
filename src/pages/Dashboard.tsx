import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type UserProfile = {
  email: string;
  phone?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    nationality?: string;
  };
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  roles?: string[];
  createdAt?: string;
};

type MembershipApplication = {
  _id: string;
  status: string;
  membershipType?: { name: string; code: string };
  payment?: { status: string; rejectionReason?: string; transactionId?: string };
  submittedAt?: string;
};

type CurrentMembership = {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  membershipType?: { name: string; code: string };
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("gart_access_token");
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
};

const Dashboard = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [application, setApplication] = useState<MembershipApplication | null>(null);
  const [membership, setMembership] = useState<CurrentMembership | null>(null);
  const [saving, setSaving] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    nationality: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const loadData = async () => {
    const meResponse = await fetch(`${API_BASE}/auth/me`, { headers: { ...getAuthHeaders() } });
    const mePayload = await meResponse.json();
    if (meResponse.ok && mePayload?.success) {
      setUser(mePayload.user);
      setFormState({
        email: mePayload.user?.email || "",
        firstName: mePayload.user?.profile?.firstName || "",
        lastName: mePayload.user?.profile?.lastName || "",
        dob: mePayload.user?.profile?.dob || "",
        gender: mePayload.user?.profile?.gender || "",
        nationality: mePayload.user?.profile?.nationality || "",
        phone: mePayload.user?.phone || "",
        line1: mePayload.user?.address?.line1 || "",
        line2: mePayload.user?.address?.line2 || "",
        city: mePayload.user?.address?.city || "",
        state: mePayload.user?.address?.state || "",
        postalCode: mePayload.user?.address?.postalCode || "",
        country: mePayload.user?.address?.country || "",
      });
    }

    const appResponse = await fetch(`${API_BASE}/memberships/me/latest`, {
      headers: { ...getAuthHeaders() },
    });
    const appPayload = await appResponse.json();
    if (appResponse.ok && appPayload?.success) {
      setApplication(appPayload.application);
    }

    const membershipResponse = await fetch(`${API_BASE}/memberships/me/current`, {
      headers: { ...getAuthHeaders() },
    });
    const membershipPayload = await membershipResponse.json();
    if (membershipResponse.ok && membershipPayload?.success) {
      setMembership(membershipPayload.membership);
    }
  };

  useEffect(() => {
    loadData().catch((err) => {
      toast({ title: "Failed to load dashboard", description: String(err), variant: "destructive" });
    });
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          phone: formState.phone,
          profile: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            dob: formState.dob,
            gender: formState.gender,
            nationality: formState.nationality,
          },
          address: {
            line1: formState.line1,
            line2: formState.line2,
            city: formState.city,
            state: formState.state,
            postalCode: formState.postalCode,
            country: formState.country,
          },
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Update failed");
      }
      setUser(payload.user);
      toast({ title: "Profile updated" });
    } catch (err) {
      toast({ title: "Update failed", description: String(err), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your profile and membership status.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-card/90 p-6 space-y-4">
            <h2 className="text-xl font-semibold">Profile Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Email</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.email}
                  readOnly
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>First Name</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.firstName}
                  onChange={(e) => setFormState((p) => ({ ...p, firstName: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Last Name</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.lastName}
                  onChange={(e) => setFormState((p) => ({ ...p, lastName: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Date of Birth</span>
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.dob}
                  onChange={(e) => setFormState((p) => ({ ...p, dob: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Gender</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.gender}
                  onChange={(e) => setFormState((p) => ({ ...p, gender: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Nationality</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.nationality}
                  onChange={(e) => setFormState((p) => ({ ...p, nationality: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Phone</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.phone}
                  onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
                />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Address Line 1</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.line1}
                  onChange={(e) => setFormState((p) => ({ ...p, line1: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Address Line 2</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.line2}
                  onChange={(e) => setFormState((p) => ({ ...p, line2: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>City</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.city}
                  onChange={(e) => setFormState((p) => ({ ...p, city: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>State</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.state}
                  onChange={(e) => setFormState((p) => ({ ...p, state: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Postal Code</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.postalCode}
                  onChange={(e) => setFormState((p) => ({ ...p, postalCode: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-sm text-muted-foreground">
                <span>Country</span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={formState.country}
                  onChange={(e) => setFormState((p) => ({ ...p, country: e.target.value }))}
                />
              </label>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Update Profile"}
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card/90 p-6 space-y-4">
            <h2 className="text-xl font-semibold">Membership Status</h2>
            {application ? (
              <div className="space-y-2 text-sm">
                {membership ? (
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                    <p>
                      <span className="font-semibold">Membership ID:</span> {membership.id}
                    </p>
                    <p>
                      <span className="font-semibold">Membership Type:</span>{" "}
                      {membership.membershipType?.name || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Valid Until:</span>{" "}
                      {membership.endDate ? new Date(membership.endDate).toLocaleDateString() : "-"}
                    </p>
                  </div>
                ) : null}
                <p>
                  <span className="font-semibold">Application ID:</span> {application._id}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {application.membershipType?.name}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {application.status}
                </p>
                <p>
                  <span className="font-semibold">Payment Status:</span> {application.payment?.status || "-"}
                </p>
                {application.payment?.rejectionReason ? (
                  <p className="text-destructive">
                    <span className="font-semibold">Rejection Reason:</span>{" "}
                    {application.payment.rejectionReason}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No membership applications yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

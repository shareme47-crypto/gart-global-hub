import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AdminMembershipsPanel } from "@/pages/AdminMemberships";

type AdminUser = {
  _id?: string;
  email: string;
  profile?: { firstName?: string; lastName?: string };
  phone?: string;
  isActive?: boolean;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("gart_access_token");
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
};

const AdminDashboard = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    setError("");
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/auth/admins`, {
        headers: { ...getAuthHeaders() },
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to load admins");
      }
      setAdmins(payload.admins || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage admin users and membership approvals.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchAdmins} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button asChild>
              <a href="/admin/memberships">Review Memberships</a>
            </Button>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

        <div className="mt-8 rounded-2xl border border-border bg-card/90">
          <div className="grid grid-cols-[1.5fr_1fr_0.7fr] gap-4 border-b border-border px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
            <span>Admin User</span>
            <span>Phone</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border">
            {admins.map((admin) => (
              <div key={admin.email} className="grid grid-cols-[1.5fr_1fr_0.7fr] gap-4 px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">
                    {admin.profile?.firstName || ""} {admin.profile?.lastName || ""}
                  </p>
                  <p className="text-xs text-muted-foreground">{admin.email}</p>
                </div>
                <div className="text-xs text-muted-foreground">{admin.phone || "-"}</div>
                <div className="text-xs font-semibold text-primary">{admin.isActive ? "Active" : "Inactive"}</div>
              </div>
            ))}
            {!admins.length && !loading ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No admin users found.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card/90 p-6">
          <AdminMembershipsPanel />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

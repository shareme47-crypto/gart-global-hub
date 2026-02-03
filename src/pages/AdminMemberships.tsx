import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Payment = {
  amount: number;
  currency: string;
  transactionId: string;
  paidAt: string;
  payerName?: string;
  screenshotUrl?: string;
  status: "submitted" | "verified" | "rejected";
  rejectionReason?: string;
};

type Application = {
  _id: string;
  status: string;
  submittedAt: string;
  membershipType?: { name: string; code: string; tier: number };
  user?: { email: string; profile?: { firstName?: string; lastName?: string } };
  payment?: Payment;
  formData?: Record<string, unknown> & {
    attachments?: Record<string, string | null>;
  };
};

type PagedResponse = {
  success: boolean;
  applications: Application[];
  page: number;
  pageSize: number;
  total: number;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const MEMBERSHIP_API = `${API_BASE}/memberships`;
const toAbsoluteUrl = (value: string) =>
  value.startsWith("http") ? value : `${API_BASE}${value.startsWith("/") ? "" : "/"}${value}`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("gart_access_token");
  if (!token) {
    throw new Error("Missing access token");
  }
  return { Authorization: `Bearer ${token}` };
};

export const AdminMembershipsPanel = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const fetchApplications = async () => {
    setError("");
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (statusFilter) query.set("status", statusFilter);
      if (typeFilter) query.set("membershipType", typeFilter);
      query.set("page", String(page));
      query.set("pageSize", String(pageSize));
      const response = await fetch(`${MEMBERSHIP_API}?${query.toString()}`, {
        headers: { ...getAuthHeaders() },
      });
      const payload: PagedResponse = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error("Failed to load applications");
      }
      const nextApps = payload.applications || [];
      setApplications(nextApps);
      setTotal(payload.total || 0);
      if (!nextApps.length) {
        setSelectedId(null);
        setSelected(null);
      } else if (selectedId && !nextApps.some((app) => app._id === selectedId)) {
        setSelectedId(null);
        setSelected(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load applications";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationDetail = async (id: string) => {
    setError("");
    try {
      setDetailLoading(true);
      const response = await fetch(`${MEMBERSHIP_API}/${id}`, {
        headers: { ...getAuthHeaders() },
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error("Failed to load application");
      }
      setSelected(payload.application);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load application";
      setError(message);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setError("");
    try {
      setLoading(true);
      const response = await fetch(`${MEMBERSHIP_API}/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Approval failed");
      }
      await fetchApplications();
      if (selectedId === id) {
        await fetchApplicationDetail(id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Approval failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setError("");
    try {
      if (!rejectReason.trim()) {
        setError("Rejection reason is required");
        return;
      }
      setLoading(true);
      const response = await fetch(`${MEMBERSHIP_API}/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ reason: rejectReason }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Rejection failed");
      }
      setRejectReason("");
      await fetchApplications();
      if (selectedId === id) {
        await fetchApplicationDetail(id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Rejection failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, typeFilter, page]);

  useEffect(() => {
    if (selectedId) {
      fetchApplicationDetail(selectedId);
    } else {
      setSelected(null);
    }
  }, [selectedId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Membership Reviews</h2>
          <p className="text-sm text-muted-foreground">Verify payments and approve memberships.</p>
        </div>
        <Button variant="outline" onClick={fetchApplications} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <select
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(event) => {
                  setPage(1);
                  setStatusFilter(event.target.value);
                }}
              >
                <option value="">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={typeFilter}
                onChange={(event) => {
                  setPage(1);
                  setTypeFilter(event.target.value);
                }}
              >
                <option value="">All Types</option>
                <option value="student">Student</option>
                <option value="therapist">Therapist</option>
                <option value="allied">Allied</option>
                <option value="volunteer">Volunteer</option>
              </select>
              <span className="text-sm text-muted-foreground">
                {total} applications
              </span>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="rounded-2xl border border-border bg-card/90">
              <div className="grid grid-cols-[1.2fr_1fr_0.7fr_0.7fr] gap-4 border-b border-border px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
                <span>Applicant</span>
                <span>Type</span>
                <span>Status</span>
                <span>Payment</span>
              </div>
              <div className="divide-y divide-border">
                {applications.map((app) => (
                  <button
                    key={app._id}
                    className={`grid w-full grid-cols-[1.2fr_1fr_0.7fr_0.7fr] items-center gap-4 px-4 py-3 text-left text-sm hover:bg-muted/30 ${
                      selectedId === app._id ? "bg-muted/30" : ""
                    }`}
                    onClick={() => setSelectedId(app._id)}
                  >
                    <div>
                      <p className="font-semibold text-foreground">
                        {app.user?.profile?.firstName || ""} {app.user?.profile?.lastName || ""}
                      </p>
                      <p className="text-xs text-muted-foreground">{app.user?.email}</p>
                    </div>
                    <div className="text-sm">{app.membershipType?.name || "-"}</div>
                    <div className="text-xs font-semibold text-primary">{app.status}</div>
                    <div className="text-xs text-muted-foreground">
                      {app.payment?.currency} {app.payment?.amount}
                    </div>
                  </button>
                ))}
                {!applications.length && !loading ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No applications found.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/90 p-6">
            {detailLoading ? (
              <p className="text-sm text-muted-foreground">Loading application...</p>
            ) : selected ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Application Detail</h2>
                  <p className="text-sm text-muted-foreground">
                    Submitted {new Date(selected.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Applicant:</span>{" "}
                    {selected.user?.profile?.firstName || ""} {selected.user?.profile?.lastName || ""} (
                    {selected.user?.email})
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {selected.membershipType?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> {selected.status}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background p-4 text-sm">
                  <p className="font-semibold text-foreground">Payment</p>
                  <p className="text-muted-foreground">
                    {selected.payment?.currency} {selected.payment?.amount}
                  </p>
                  <p className="text-muted-foreground">
                    Transaction: {selected.payment?.transactionId}
                  </p>
                  <p className="text-muted-foreground">
                    Paid At: {selected.payment?.paidAt ? new Date(selected.payment.paidAt).toLocaleDateString() : "-"}
                  </p>
                  {selected.payment?.payerName ? (
                    <p className="text-muted-foreground">Payer: {selected.payment.payerName}</p>
                  ) : null}
                  {selected.payment?.screenshotUrl ? (
                    <a
                      className="text-primary underline"
                      href={toAbsoluteUrl(selected.payment.screenshotUrl)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Screenshot
                    </a>
                  ) : null}
                </div>
                {selected.formData ? (
                  <div className="rounded-xl border border-border/60 bg-background p-4 text-sm space-y-2">
                    <p className="font-semibold text-foreground">Form Details</p>
                    {Object.entries(selected.formData)
                      .filter(([key]) => key !== "attachments")
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className="text-foreground text-right break-words">
                            {typeof value === "boolean"
                              ? value ? "Yes" : "No"
                              : typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : null}
                {selected.formData?.attachments ? (
                  <div className="rounded-xl border border-border/60 bg-background p-4 text-sm space-y-2">
                    <p className="font-semibold text-foreground">Attachments</p>
                    {Object.entries(selected.formData.attachments)
                      .filter(([, value]) => value)
                      .map(([key, value]) => (
                        <a
                          key={key}
                          className="block text-primary underline"
                          href={value ? toAbsoluteUrl(value) : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {key}
                        </a>
                      ))}
                  </div>
                ) : null}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Reject Reason</label>
                  <textarea
                    className="min-h-[90px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    value={rejectReason}
                    onChange={(event) => setRejectReason(event.target.value)}
                    placeholder="Explain why this payment is rejected..."
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {selected.status === "approved" || selected.status === "rejected" ? (
                    <p className="text-sm text-muted-foreground">
                      Action already taken for this application.
                    </p>
                  ) : (
                    <>
                      <Button onClick={() => handleApprove(selected._id)} disabled={loading}>
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(selected._id)}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select an application to review.</p>
            )}
          </div>
        </div>
    </div>
  );
};

const AdminMemberships = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AdminMembershipsPanel />
      </main>
    </div>
  );
};

export default AdminMemberships;

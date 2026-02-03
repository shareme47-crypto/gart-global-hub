import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground">Effective date: {new Date().toLocaleDateString()}</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Eligibility</h2>
            <p className="text-muted-foreground">
              Membership is open to eligible radiation therapy professionals, allied health professionals,
              students, and volunteers who meet the criteria described on the membership page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Accurate Information</h2>
            <p className="text-muted-foreground">
              You agree to provide accurate, complete, and up-to-date information when registering or
              updating your profile. Submissions with incorrect or misleading information may be rejected.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Verification & Approval</h2>
            <p className="text-muted-foreground">
              Membership activation is subject to payment verification and document review. GART reserves
              the right to approve, reject, or request changes to applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Payments</h2>
            <p className="text-muted-foreground">
              Fees are determined by membership category and region. Membership fees are non-refundable once
              verification is completed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Member Conduct</h2>
            <p className="text-muted-foreground">
              Members are expected to uphold ethical standards, professional integrity, and respectful conduct
              in all GART activities and communications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Communications</h2>
            <p className="text-muted-foreground">
              By registering, you consent to receive communications related to membership updates, events,
              educational resources, and professional opportunities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Updates to These Terms</h2>
            <p className="text-muted-foreground">
              GART may update these terms periodically. Continued use of the platform indicates acceptance
              of the revised terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

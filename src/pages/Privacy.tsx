import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Effective date: {new Date().toLocaleDateString()}</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide during registration, membership applications, and contact
              submissions, including name, email, phone number, and supporting documents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-muted-foreground">
              We use your information to process membership applications, verify payments, communicate updates,
              and improve our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell your data. We may share information with service providers only as needed to
              deliver core services (e.g., email notifications).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p className="text-muted-foreground">
              We apply reasonable security measures to protect your data. However, no system is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You may request access, corrections, or deletion of your personal information by contacting us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Updates</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. Continued use of the platform indicates acceptance
              of the revised policy.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

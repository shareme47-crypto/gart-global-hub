import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

const MemberBenefits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default MemberBenefits;

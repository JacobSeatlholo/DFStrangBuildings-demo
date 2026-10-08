import { Navbar } from "@/components/dfstrang/navbar";
import { Hero } from "@/components/dfstrang/hero";
import { ValueEngines } from "@/components/dfstrang/value-engines";
import { JvPortal } from "@/components/dfstrang/jv-portal";
import { EstateCare } from "@/components/dfstrang/estate-care";
import { FeasibilityCalculator } from "@/components/dfstrang/feasibility-calculator";
import { TrackRecord } from "@/components/dfstrang/track-record";
import { Legacy } from "@/components/dfstrang/legacy";
import { Footer } from "@/components/dfstrang/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-crisp-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ValueEngines />
        <JvPortal />
        <EstateCare />
        <FeasibilityCalculator />
        <TrackRecord />
        <Legacy />
      </main>
      <Footer />
    </div>
  );
}

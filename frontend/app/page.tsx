import { GalaxyBackground } from "@/components/galaxy-background"
import { HeroSection } from "@/components/hero-section"
import { EmailSection } from "@/components/email-section"
import { TasksSection } from "@/components/tasks-section"
import { PlannerSection } from "@/components/planner-section"
import { ToolsSection } from "@/components/tools-section"
import { OumiSection } from "@/components/oumi-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function DigitalLifeCommander() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <GalaxyBackground />
      <main className="relative z-10">
        <HeroSection />
        <EmailSection />
        <TasksSection />
        <PlannerSection />
        <ToolsSection />
        <OumiSection />
        <HowItWorksSection />
        <Footer />
      </main>
    </div>
  );
}


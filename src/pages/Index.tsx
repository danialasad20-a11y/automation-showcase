import HeroSection from "@/components/HeroSection";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import AutomationsWeBuild from "@/components/AutomationsWeBuild";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import ReachOut from "@/components/ReachOut";
import CaseStudySection from "@/components/CaseStudySection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <WhoThisIsFor />
    <AutomationsWeBuild />
    <HowItWorks />
    <Calculator />
    <ReachOut />
    <CaseStudySection />
    <FinalCTA />
    <Footer />
    <ChatWidget />
  </div>
);

export default Index;

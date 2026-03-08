import HeroSection from "@/components/HeroSection";
import IntegrationMarquee from "@/components/IntegrationMarquee";
import WorkflowShowcase from "@/components/WorkflowShowcase";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import CaseStudySection from "@/components/CaseStudySection";
import Calculator from "@/components/Calculator";
import ReachOut from "@/components/ReachOut";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <IntegrationMarquee />
    <WorkflowShowcase />
    <Capabilities />
    <HowItWorks />
    <CaseStudySection />
    <Calculator />
    <ReachOut />
    <CallToAction />
    <Footer />
    <ChatWidget />
  </div>
);

export default Index;

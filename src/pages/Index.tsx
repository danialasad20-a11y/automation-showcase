import HeroSection from "@/components/HeroSection";
import WorkflowVisualizer from "@/components/WorkflowVisualizer";
import IntegrationCloud from "@/components/IntegrationCloud";
import Calculator from "@/components/Calculator";
import CaseStudies from "@/components/CaseStudies";
import ReachOut from "@/components/ReachOut";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="grid-bg">
    <div className="noise-overlay" />
    <HeroSection />
    <WorkflowVisualizer />
    <IntegrationCloud />
    <Calculator />
    <ReachOut />
    <CaseStudies />
    <CallToAction />
    <Footer />
  </div>
);

export default Index;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Zap } from "lucide-react";
import N8nWorkflowDiagram from "./N8nWorkflowDiagram";

const roles = [
  "AI Agents",
  "CRM Automations",
  "Voice Agents",
  "Chatbots",
  "E-commerce Workflows",
  "Data Pipelines",
  "Social Media Bots",
  "Invoice Systems",
  "RAG Pipelines",
  "Dashboard Automations",
  "Helpdesk Bots",
  "Content Generators",
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("#hero-badge", { opacity: 0, y: 20, duration: 0.6 })
      .from("#hero-headline", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
      .from("#hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from("#hero-ctas", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
      .from(".hero-workflow-node", { opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.08 }, "-=0.3");
  }, []);

  useEffect(() => {
    if (!roleRef.current) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % roles.length;
      gsap.to(roleRef.current, {
        opacity: 0, y: -10, duration: 0.3,
        onComplete: () => {
          if (roleRef.current) {
            roleRef.current.textContent = roles[idx];
            gsap.fromTo(roleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
          }
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(8 85% 62% / 0.4), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(32 100% 55% / 0.3), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div id="hero-badge" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Workflow Automation Expert</span>
            </div>

            <h1 id="hero-headline" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Your Business on{" "}
              <span className="gradient-text">Autopilot</span>
              <br />
              <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl font-medium">
                Building{" "}
                <span ref={roleRef} className="gradient-text inline-block min-w-[200px]">
                  AI Agents
                </span>
              </span>
            </h1>

            <p id="hero-sub" className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              From CRMs and chatbots to voice agents, RAG pipelines, e-commerce flows, 
              and custom integrations — I build production-ready automation systems 
              that connect any software to any workflow.
            </p>

            <div id="hero-ctas" className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/danialasad20/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-primary-foreground rounded-xl font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#workflows"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-xl font-semibold text-base text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>

          {/* Right — Interactive workflow diagram */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[560px]">
            <N8nWorkflowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

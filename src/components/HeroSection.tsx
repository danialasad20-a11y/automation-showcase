import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Play, CheckCircle2, Bot, UserCheck, BookOpen, Calendar } from "lucide-react";

const workflowSteps = [
  { icon: UserCheck, label: "Lead Captured", color: "from-blue-500 to-cyan-500" },
  { icon: Bot, label: "AI Chatbot", color: "from-purple-500 to-violet-500" },
  { icon: CheckCircle2, label: "Qualification", color: "from-pink-500 to-rose-500" },
  { icon: BookOpen, label: "CRM Updated", color: "from-amber-500 to-orange-500" },
  { icon: Calendar, label: "Booking Made", color: "from-emerald-500 to-green-500" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("#hero-badge", { opacity: 0, y: 20, duration: 0.6 })
      .from("#hero-headline", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
      .from("#hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from("#hero-bullets li", { opacity: 0, x: -20, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from("#hero-ctas", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
      .from(".workflow-node", { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.12 }, "-=0.4")
      .from(".workflow-arrow", { opacity: 0, scaleX: 0, duration: 0.3, stagger: 0.1 }, "-=0.3");
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(262 83% 58% / 0.3), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(199 89% 48% / 0.3), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <div id="hero-badge" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">AI-Powered Automation Agency</span>
            </div>

            <h1 id="hero-headline" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Turn Your Business Into a{" "}
              <span className="gradient-text">24/7 AI Sales Machine</span>
            </h1>

            <p id="hero-sub" className="text-lg text-muted-foreground mb-8 max-w-lg">
              I build AI automation systems that capture leads, respond to customers instantly, and close sales automatically — and much more.
            </p>

            <ul id="hero-bullets" className="space-y-3 mb-10">
              {[
                "Capture leads automatically",
                "Instant responses on WhatsApp, email & website",
                "Automated follow-ups that convert more sales",
                "Save 20+ hours per week with custom automations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div id="hero-ctas" className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/923061110200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-primary-foreground rounded-xl font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Free Automation Audit
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#automations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-xl font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Play className="w-5 h-5 text-primary" />
                See Demo Automations
              </a>
            </div>
          </div>

          {/* Right - Workflow Diagram */}
          <div className="relative">
            <div className="bg-secondary/50 rounded-2xl border border-border p-8 lg:p-10 glow-shadow">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 text-center">Live Workflow Preview</p>
              <div className="flex flex-col items-center gap-3">
                {workflowSteps.map((step, i) => (
                  <div key={step.label} className="w-full">
                    <div className="workflow-node flex items-center gap-4 p-4 bg-background rounded-xl border border-border card-hover cursor-default">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.label}</p>
                        <p className="text-xs text-muted-foreground">Step {i + 1}</p>
                      </div>
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <div className="workflow-arrow flex justify-center py-1">
                        <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Automating 24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

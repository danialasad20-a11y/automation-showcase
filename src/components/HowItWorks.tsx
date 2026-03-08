import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Cog, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Free Automation Audit",
    description: "We analyze your business workflows and identify the highest-impact areas to automate.",
  },
  {
    icon: Cog,
    number: "02",
    title: "Automation Build",
    description: "We create AI workflows tailored to your business using n8n and cutting-edge AI tools.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Scale Automatically",
    description: "Your business runs smoother with automated processes that grow with you.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".step-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 0.7, stagger: 0.2, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">
            From audit to automation in just a few weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[72px] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          
          {steps.map((s) => (
            <div key={s.number} className="step-card text-center relative">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-glow">
                  <s.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">
                  {s.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

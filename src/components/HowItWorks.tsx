import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Wrench, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Discovery Call",
    desc: "We analyze your current workflows, tech stack, and bottlenecks. I map out exactly what can be automated.",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Build & Test",
    desc: "I design and build your automation systems using n8n, connect all your tools, and test extensively.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Deploy & Scale",
    desc: "Your workflows go live in production. I monitor, optimize, and scale as your business grows.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".step-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power2.out",
    });
  }, []);

  return (
    <section id="process" className="section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">From idea to production in days, not months.</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="step-card bg-card rounded-xl border border-border p-8 text-center card-hover">
              <span className="text-xs font-mono text-primary mb-4 block">{step.num}</span>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

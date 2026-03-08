import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone, Map, ClipboardList, KeyRound,
  Code2, FlaskConical, Presentation, Handshake,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Phone, label: "Discovery Call", desc: "Understand your business & goals", color: "#6366f1" },
  { icon: Map, label: "Planning & Strategy", desc: "Map the automation architecture", color: "#7c3aed" },
  { icon: ClipboardList, label: "Scope Overview", desc: "Define deliverables & timeline", color: "#8b5cf6" },
  { icon: KeyRound, label: "Access & Credentials", desc: "Gather API keys & tool access", color: "#a855f7" },
  { icon: Code2, label: "Development & Build", desc: "Build & wire up all workflows", color: "#6366f1" },
  { icon: FlaskConical, label: "Testing & QA", desc: "Stress-test every scenario", color: "#7c3aed" },
  { icon: Presentation, label: "Live Demo", desc: "Walk through the finished system", color: "#8b5cf6" },
  { icon: Handshake, label: "Handover & Support", desc: "Docs, training & ongoing support", color: "#a855f7" },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".step-item"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: "power2.out",
    });
  }, []);

  return (
    <section id="process" className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">
            A proven 8-step process from first call to full handover.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connection line running through the middle */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.label}
                  className={`step-item flex items-center gap-4 md:gap-0 ${
                    i > 0 ? "md:mt-[-1px]" : ""
                  }`}
                >
                  {/* Mobile: always left-aligned */}
                  {/* Desktop: alternating left/right */}
                  <div className={`md:flex md:items-center md:w-full ${isLeft ? "" : "md:flex-row-reverse"}`}>
                    {/* Card side */}
                    <div className={`md:w-[calc(50%-24px)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                      <div
                        className={`inline-flex items-start gap-4 bg-card border border-border rounded-xl p-4 shadow-soft hover:border-primary/40 hover:shadow-glow transition-all duration-200 max-w-sm ${
                          isLeft ? "md:ml-auto" : "md:mr-auto"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: step.color + "18" }}
                        >
                          <step.icon className="w-5 h-5" style={{ color: step.color }} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-foreground">{step.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex w-12 justify-center shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10"
                        style={{ backgroundColor: step.color }}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className="hidden md:block md:w-[calc(50%-24px)]" />
                  </div>

                  {/* Mobile number badge */}
                  <div className="md:hidden shrink-0 order-first">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

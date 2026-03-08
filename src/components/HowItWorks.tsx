import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Map,
  ClipboardList,
  KeyRound,
  Code2,
  FlaskConical,
  Presentation,
  Handshake,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Phone, label: "Discovery Call", desc: "Understand your business, pain points & goals", color: "#6366f1" },
  { icon: Map, label: "Planning & Strategy", desc: "Map out the automation architecture", color: "#7c3aed" },
  { icon: ClipboardList, label: "Scope Overview", desc: "Define deliverables, timeline & milestones", color: "#8b5cf6" },
  { icon: KeyRound, label: "Access & Credentials", desc: "Securely gather API keys & tool access", color: "#a855f7" },
  { icon: Code2, label: "Development & Build", desc: "Build & wire up all automation workflows", color: "#6366f1" },
  { icon: FlaskConical, label: "Testing & QA", desc: "Stress-test every edge case & scenario", color: "#7c3aed" },
  { icon: Presentation, label: "Live Demo", desc: "Walk you through the finished system", color: "#8b5cf6" },
  { icon: Handshake, label: "Handover & Support", desc: "Documentation, training & ongoing support", color: "#a855f7" },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const nodes = sectionRef.current.querySelectorAll(".hw-node");
    gsap.from(nodes, {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
    });
  }, []);

  // Split into 2 rows: row1 left→right (0-3), row2 right→left (7,6,5,4)
  const row1 = steps.slice(0, 4);
  const row2 = [steps[7], steps[6], steps[5], steps[4]];

  return (
    <section id="process" ref={sectionRef} className="section-padding border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">
            A proven 8-step process from first call to full handover.
          </p>
        </div>

        {/* Desktop: 2-row snake layout */}
        <div className="hidden md:block">
          {/* Row 1 */}
          <div className="flex items-center justify-center">
            {row1.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <Node step={step} index={i} />
                {i < row1.length - 1 && (
                  <div className="flex items-center mx-1">
                    <div className="w-8 lg:w-14 h-[2px] bg-gradient-to-r from-primary/40 to-primary/20" />
                    <ArrowRight className="w-3 h-3 text-primary/40 -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Vertical connector on the right */}
          <div className="flex justify-end mr-[72px] lg:mr-[88px]">
            <div className="flex flex-col items-center py-1">
              <div className="h-8 w-[2px] bg-gradient-to-b from-primary/40 to-primary/20" />
              <ArrowDown className="w-3 h-3 text-primary/40 -mt-1" />
            </div>
          </div>

          {/* Row 2 (reversed: right to left) */}
          <div className="flex items-center justify-center">
            {row2.map((step, i) => {
              const realIndex = [7, 6, 5, 4][i];
              return (
                <div key={step.label} className="flex items-center">
                  <Node step={step} index={realIndex} />
                  {i < row2.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className="w-8 lg:w-14 h-[2px] bg-gradient-to-r from-primary/20 to-primary/40" />
                      <ArrowRight className="w-3 h-3 text-primary/40 -ml-1 rotate-180" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden flex flex-col items-center gap-3">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <Node step={step} index={i} />
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center mt-2">
                  <div className="h-6 w-[2px] bg-gradient-to-b from-primary/40 to-primary/20" />
                  <ArrowDown className="w-3 h-3 text-primary/30 -mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Node = ({ step, index }: { step: (typeof steps)[number]; index: number }) => (
  <div
    className="hw-node relative bg-card border border-border rounded-xl p-4 w-[140px] lg:w-[160px] text-center shadow-soft hover:border-primary/40 hover:shadow-glow transition-all duration-200"
  >
    {/* Step number */}
    <span
      className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white z-10"
      style={{ backgroundColor: step.color }}
    >
      {index + 1}
    </span>

    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
      style={{ backgroundColor: step.color + "18" }}
    >
      <step.icon className="w-5 h-5" style={{ color: step.color }} />
    </div>
    <p className="text-xs font-semibold text-foreground mb-1">{step.label}</p>
    <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>

    {/* Ports */}
    <span className="hidden md:block absolute top-1/2 -left-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-card -translate-y-1/2" />
    <span className="hidden md:block absolute top-1/2 -right-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-card -translate-y-1/2" />
  </div>
);

export default HowItWorks;

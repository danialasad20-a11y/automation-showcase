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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Phone, label: "Discovery Call", desc: "Understand your business & goals", color: "#6366f1" },
  { icon: Map, label: "Planning", desc: "Map the automation architecture", color: "#7c3aed" },
  { icon: ClipboardList, label: "Scope", desc: "Define deliverables & timeline", color: "#8b5cf6" },
  { icon: KeyRound, label: "Credentials", desc: "Gather API keys & access", color: "#a855f7" },
  { icon: Code2, label: "Development", desc: "Build all workflows", color: "#6366f1" },
  { icon: FlaskConical, label: "Testing", desc: "Stress-test every scenario", color: "#7c3aed" },
  { icon: Presentation, label: "Live Demo", desc: "Walk through the system", color: "#8b5cf6" },
  { icon: Handshake, label: "Handover", desc: "Docs, training & support", color: "#a855f7" },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".hw-node"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: "power2.out",
    });
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-padding border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">
            A proven 8-step process from first call to full handover.
          </p>
        </div>

        {/* Desktop snake layout */}
        <div className="hidden md:block">
          {/* Row 1: steps 1-4 left to right */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0 mb-2">
            <NodeCard step={steps[0]} index={0} />
            <Arrow direction="right" />
            <NodeCard step={steps[1]} index={1} />
            <Arrow direction="right" />
            <NodeCard step={steps[2]} index={2} />
            <Arrow direction="right" />
            <NodeCard step={steps[3]} index={3} />
          </div>

          {/* Down connector on right side */}
          <div className="flex justify-end pr-[calc(12.5%-4px)]">
            <div className="h-10 w-[2px] rounded-full bg-primary/30 relative">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-primary/40 text-[10px]">▼</span>
            </div>
          </div>

          {/* Row 2: steps 5-8 right to left */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0 mt-2">
            <NodeCard step={steps[7]} index={7} />
            <Arrow direction="left" />
            <NodeCard step={steps[6]} index={6} />
            <Arrow direction="left" />
            <NodeCard step={steps[5]} index={5} />
            <Arrow direction="left" />
            <NodeCard step={steps[4]} index={4} />
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-3">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <NodeCard step={step} index={i} />
              {i < steps.length - 1 && (
                <div className="h-6 w-[2px] bg-primary/30 mt-2 relative">
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-primary/40 text-[10px]">▼</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NodeCard = ({ step, index }: { step: (typeof steps)[number]; index: number }) => (
  <div className="hw-node relative bg-card border border-border rounded-xl p-3 lg:p-4 text-center shadow-soft hover:border-primary/40 hover:shadow-glow transition-all duration-200 mx-auto w-full max-w-[160px]">
    <span
      className="absolute -top-2 -left-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white z-10"
      style={{ backgroundColor: step.color }}
    >
      {index + 1}
    </span>

    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1.5"
      style={{ backgroundColor: step.color + "18" }}
    >
      <step.icon className="w-4 h-4" style={{ color: step.color }} />
    </div>
    <p className="text-[11px] font-semibold text-foreground mb-0.5 leading-tight">{step.label}</p>
    <p className="text-[9px] text-muted-foreground leading-tight">{step.desc}</p>

    {/* Ports */}
    <span className="hidden md:block absolute top-1/2 -left-1 w-2 h-2 rounded-full border border-border bg-card -translate-y-1/2" />
    <span className="hidden md:block absolute top-1/2 -right-1 w-2 h-2 rounded-full border border-border bg-card -translate-y-1/2" />
  </div>
);

const Arrow = ({ direction }: { direction: "left" | "right" }) => (
  <div className="flex items-center justify-center px-1">
    <div className="relative flex items-center">
      <div className="w-6 lg:w-10 h-[2px] bg-primary/30 rounded-full" />
      <span
        className={`text-primary/50 text-[8px] absolute ${
          direction === "right" ? "-right-1" : "-left-1"
        }`}
      >
        {direction === "right" ? "▶" : "◀"}
      </span>
    </div>
  </div>
);

export default HowItWorks;

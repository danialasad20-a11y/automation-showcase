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
  { icon: Phone, label: "Discovery Call", color: "#6366f1" },
  { icon: Map, label: "Planning & Strategy", color: "#8b5cf6" },
  { icon: ClipboardList, label: "Scope Overview", color: "#a855f7" },
  { icon: KeyRound, label: "Access & Credentials", color: "#c084fc" },
  { icon: Code2, label: "Development & Build", color: "#6366f1" },
  { icon: FlaskConical, label: "Testing & QA", color: "#8b5cf6" },
  { icon: Presentation, label: "Live Demo", color: "#a855f7" },
  { icon: Handshake, label: "Handover & Support", color: "#c084fc" },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const nodes = sectionRef.current.querySelectorAll(".process-node");
    const connectors = sectionRef.current.querySelectorAll(".connector-line");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });

    tl.from(nodes, {
      opacity: 0,
      scale: 0.7,
      duration: 0.35,
      stagger: 0.08,
      ease: "back.out(1.4)",
    });

    tl.from(
      connectors,
      { scaleX: 0, opacity: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  // Row 1: steps 0-3 (left to right), Row 2: steps 4-7 (right to left)
  const row1 = steps.slice(0, 4);
  const row2 = [...steps.slice(4, 8)].reverse(); // reversed for right-to-left display

  return (
    <section id="process" ref={sectionRef} className="section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subheading">
            A proven 8-step process from first call to full handover.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="relative px-2">
          {/* Row 1: Left to Right */}
          <div className="flex items-center justify-center gap-0">
            {row1.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <WorkflowNode step={step} index={i} />
                {i < row1.length - 1 && <Connector />}
              </div>
            ))}
          </div>

          {/* Vertical connector from row1 end to row2 start (right side) */}
          <div className="flex justify-end pr-[calc(12.5%-10px)] md:pr-[calc(12.5%-20px)]">
            <div className="connector-line w-0.5 h-10 bg-primary/30 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50" />
            </div>
          </div>

          {/* Row 2: Right to Left (items reversed) */}
          <div className="flex items-center justify-center gap-0">
            {row2.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <WorkflowNode step={step} index={i + 4} />
                {i < row2.length - 1 && <Connector />}
              </div>
            ))}
          </div>
        </div>

        {/* Step list below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <span
                className="inline-flex items-center justify-center text-xs font-bold rounded-full w-7 h-7 text-primary-foreground mb-2"
                style={{ backgroundColor: step.color }}
              >
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-foreground">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkflowNode = ({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) => (
  <div className="process-node relative flex flex-col items-center justify-center w-[100px] h-[72px] md:w-[130px] md:h-[80px] rounded-xl border border-border bg-card shadow-soft shrink-0 hover:border-primary/50 hover:shadow-glow transition-all duration-200">
    {/* Number badge */}
    <span
      className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-primary-foreground z-10"
      style={{ backgroundColor: step.color }}
    >
      {index + 1}
    </span>

    <div
      className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center mb-1"
      style={{ backgroundColor: step.color + "20" }}
    >
      <step.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: step.color }} />
    </div>
    <span className="text-[9px] md:text-[10px] font-medium text-foreground text-center leading-tight px-1">
      {step.label}
    </span>

    {/* Ports */}
    <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-border -translate-y-1/2" />
    <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-border -translate-y-1/2" />
  </div>
);

const Connector = () => (
  <div className="connector-line flex items-center w-6 md:w-10 h-0.5 bg-primary/30 relative origin-left shrink-0">
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50" />
  </div>
);

export default HowItWorks;

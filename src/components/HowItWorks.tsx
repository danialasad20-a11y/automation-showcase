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
  { icon: Phone, label: "Discovery\nCall", color: "#6366f1" },
  { icon: Map, label: "Planning &\nStrategy", color: "#8b5cf6" },
  { icon: ClipboardList, label: "Scope\nOverview", color: "#a855f7" },
  { icon: KeyRound, label: "Access &\nCredentials", color: "#c084fc" },
  { icon: Code2, label: "Development\n& Build", color: "#6366f1" },
  { icon: FlaskConical, label: "Testing &\nQA", color: "#8b5cf6" },
  { icon: Presentation, label: "Live\nDemo", color: "#a855f7" },
  { icon: Handshake, label: "Handover &\nSupport", color: "#c084fc" },
];

const NODE_W = 110;
const NODE_H = 80;
const GAP_X = 40;
const GAP_Y = 50;

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Build responsive grid: 4 cols on desktop, 2 on mobile
  const getPositions = (cols: number) => {
    const rows = Math.ceil(steps.length / cols);
    const positions: { x: number; y: number }[] = [];
    for (let r = 0; r < rows; r++) {
      const rowItems = Math.min(cols, steps.length - r * cols);
      for (let c = 0; c < rowItems; c++) {
        // Alternate row direction for snake layout
        const col = r % 2 === 0 ? c : rowItems - 1 - c;
        positions.push({
          x: col * (NODE_W + GAP_X),
          y: r * (NODE_H + GAP_Y),
        });
      }
    }
    return positions;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const nodes = sectionRef.current.querySelectorAll(".process-node");
    const lines = sectionRef.current.querySelectorAll(".process-line");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });

    tl.from(nodes, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.4)",
    });

    tl.from(
      lines,
      {
        strokeDashoffset: 200,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }, []);

  const cols = 4;
  const positions = getPositions(cols);
  const totalW = (Math.min(cols, steps.length) - 1) * (NODE_W + GAP_X) + NODE_W;
  const rows = Math.ceil(steps.length / cols);
  const totalH = (rows - 1) * (NODE_H + GAP_Y) + NODE_H;

  // Build connection paths
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i];
    const b = positions[i + 1];
    connections.push({
      x1: a.x + NODE_W / 2,
      y1: a.y + NODE_H / 2,
      x2: b.x + NODE_W / 2,
      y2: b.y + NODE_H / 2,
    });
  }

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

        {/* Workflow diagram */}
        <div className="flex justify-center overflow-x-auto pb-4">
          <div
            className="relative"
            style={{
              width: totalW + 40,
              height: totalH + 40,
            }}
          >
            {/* SVG connections */}
            <svg
              ref={svgRef}
              className="absolute inset-0 pointer-events-none"
              width={totalW + 40}
              height={totalH + 40}
              style={{ overflow: "visible" }}
            >
              {connections.map((c, i) => {
                const sx = c.x1 + 20;
                const sy = c.y1 + 20;
                const ex = c.x2 + 20;
                const ey = c.y2 + 20;

                const dx = ex - sx;
                const dy = ey - sy;

                let path: string;
                if (Math.abs(dy) < 10) {
                  // Horizontal
                  const mx = sx + dx / 2;
                  path = `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
                } else if (Math.abs(dx) < 10) {
                  // Vertical
                  const my = sy + dy / 2;
                  path = `M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`;
                } else {
                  // Diagonal (row transition)
                  path = `M ${sx} ${sy} C ${sx} ${sy + dy * 0.6}, ${ex} ${ey - dy * 0.6}, ${ex} ${ey}`;
                }

                return (
                  <path
                    key={i}
                    d={path}
                    className="process-line"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.3)"
                    strokeWidth={2}
                    strokeDasharray="200"
                    strokeDashoffset="0"
                  />
                );
              })}

              {/* Arrow dots at connection midpoints */}
              {connections.map((c, i) => {
                const mx = (c.x1 + c.x2) / 2 + 20;
                const my = (c.y1 + c.y2) / 2 + 20;
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={mx}
                    cy={my}
                    r={3}
                    fill="hsl(var(--primary))"
                    className="process-line"
                    opacity={0.5}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {steps.map((step, i) => {
              const pos = positions[i];
              return (
                <div
                  key={step.label}
                  className="process-node absolute flex flex-col items-center justify-center rounded-xl border border-border bg-card shadow-soft cursor-default transition-all duration-200 hover:border-primary/50 hover:shadow-glow"
                  style={{
                    left: pos.x + 20,
                    top: pos.y + 20,
                    width: NODE_W,
                    height: NODE_H,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
                    style={{ backgroundColor: step.color + "20" }}
                  >
                    <step.icon className="w-4 h-4" style={{ color: step.color }} />
                  </div>
                  <span className="text-[10px] font-medium text-foreground text-center leading-tight whitespace-pre-line">
                    {step.label}
                  </span>

                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -left-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-primary-foreground"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </span>

                  {/* Connection ports */}
                  <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-border -translate-y-1/2" />
                  <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-border -translate-y-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Step details below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <span
                className="inline-block text-xs font-bold rounded-full w-6 h-6 leading-6 text-primary-foreground mb-2"
                style={{ backgroundColor: step.color }}
              >
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-foreground mb-1">
                {step.label.replace("\n", " ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

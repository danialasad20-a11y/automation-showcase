import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Clock, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    title: "Real Estate Lead Automation",
    problem: "Leads were responding slowly and many were lost due to delayed follow-ups.",
    solution: "AI WhatsApp agent + automated CRM pipeline + instant follow-up sequences.",
    results: [
      { icon: TrendingUp, value: "3x", label: "More booked appointments" },
      { icon: Clock, value: "<10s", label: "Average response time" },
      { icon: Target, value: "40%", label: "Increase in conversions" },
    ],
    nodes: ["WhatsApp", "AI Agent", "HubSpot", "Google Calendar"],
  },
  {
    title: "E-commerce Order Pipeline",
    problem: "Manual order processing, invoicing, and shipping label creation taking 4+ hours daily.",
    solution: "End-to-end Shopify automation with inventory sync, auto-invoicing, and shipping integration.",
    results: [
      { icon: TrendingUp, value: "200+", label: "Hours saved monthly" },
      { icon: Clock, value: "0", label: "Manual order processing" },
      { icon: Target, value: "99.8%", label: "Order accuracy" },
    ],
    nodes: ["Shopify", "QuickBooks", "ShipStation", "Slack"],
  },
  {
    title: "AI Customer Support Bot",
    problem: "Support team overwhelmed with repetitive queries. 2-hour average response time.",
    solution: "RAG-powered chatbot trained on company docs, with smart escalation to humans.",
    results: [
      { icon: TrendingUp, value: "90%", label: "Queries auto-resolved" },
      { icon: Clock, value: "<30s", label: "Response time" },
      { icon: Target, value: "4.8/5", label: "Customer satisfaction" },
    ],
    nodes: ["Chat Widget", "AI Agent", "Pinecone", "Zendesk"],
  },
];

const CaseStudySection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".case-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power2.out",
    });
  }, []);

  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="section-subheading">Real results from real automation projects.</p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-6">
          {cases.map((cs) => (
            <div key={cs.title} className="case-card bg-card rounded-xl border border-border p-6 card-hover">
              <h3 className="text-lg font-semibold text-foreground mb-3">{cs.title}</h3>

              <div className="mb-4">
                <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Problem</p>
                <p className="text-sm text-muted-foreground">{cs.problem}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Solution</p>
                <p className="text-sm text-muted-foreground">{cs.solution}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1 mb-5">
                {cs.nodes.map((n, i) => (
                  <span key={n} className="flex items-center gap-1">
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded font-mono text-secondary-foreground">{n}</span>
                    {i < cs.nodes.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                {cs.results.map((r) => (
                  <div key={r.label} className="text-center">
                    <r.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold gradient-text">{r.value}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;

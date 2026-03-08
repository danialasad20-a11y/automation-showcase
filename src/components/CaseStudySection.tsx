import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Clock, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const results = [
  { icon: TrendingUp, value: "3x", label: "More Booked Appointments" },
  { icon: Clock, value: "Seconds", label: "Response Time (was hours)" },
  { icon: Target, value: "+40%", label: "Increase in Conversions" },
];

const CaseStudySection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelector(".case-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 50, duration: 0.8, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Real <span className="gradient-text">Results</span>
          </h2>
          <p className="section-subheading">See what AI automation does for real businesses.</p>
        </div>

        <div className="case-card bg-card rounded-2xl border border-border overflow-hidden">
          <div className="gradient-bg p-8 md:p-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-foreground/80 bg-white/20 px-3 py-1 rounded-full mb-3">
              Case Study
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Real Estate Lead Automation
            </h3>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-destructive mb-3">The Problem</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Leads were responding slowly and many were lost. The sales team spent hours manually following up, resulting in missed appointments and low conversion rates.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">The Solution</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We built an AI WhatsApp assistant that instantly responds to every lead, qualifies them with smart questions, and books property viewings automatically.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {results.map((r) => (
                <div key={r.label} className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                  <r.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">{r.value}</p>
                  <p className="text-sm text-muted-foreground">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    tag: "Invoicing",
    tagColor: "text-primary",
    gradient: "from-primary/10",
    name: "Sarah Chen",
    role: "Operations Director",
    company: "DTC apparel brand, ~$2M annual revenue",
    pain: "4 team members spending 6 hours/week each on manual invoice processing from multiple sales channels. Monthly close consistently delayed.",
    automation: "Order webhooks → OCR parsing → validation → auto-posting to accounting software. Exceptions routed to Slack with context.",
    results: [
      { highlight: "24 hours/week saved", detail: " ($62,400 annual value)" },
      { highlight: "5 days → 1.5 days", prefix: "Monthly close: " },
      { highlight: "Zero data entry errors" },
    ],
    timeline: "2-week build",
  },
  {
    tag: "Support Tickets",
    tagColor: "text-purple-400",
    gradient: "from-purple-500/10",
    name: "Marcus Johnson",
    role: "CTO",
    company: "B2B workflow tool, 800 paying customers",
    pain: "340 tickets/day overwhelming 3-person team. 12-hour response times causing churn. No visibility into trends.",
    automation: "AI triage → auto-routing → draft responses. Sentiment detection triggers instant escalation. Daily digest to product team.",
    results: [
      { prefix: "Response time: ", highlight: "12 hours → 47 minutes" },
      { highlight: "60% auto-resolved" },
      { prefix: "Scaled to ", highlight: "2,400 customers/person", detail: " without hiring" },
      { prefix: "CSAT: ", highlight: "3.2 → 4.6" },
    ],
    timeline: "3-week build",
  },
  {
    tag: "Content",
    tagColor: "text-green-400",
    gradient: "from-green-500/10",
    name: "Priya Patel",
    role: "Marketing Lead",
    company: "Performance marketing agency, 12 clients",
    pain: "15 hours/week manually repurposing content across platforms. Inconsistent posting, missed opportunities.",
    automation: "RSS triggers → AI summarization → platform-specific formatting → auto-scheduling. Performance data auto-reported.",
    results: [
      { highlight: "15 hrs/week → 30 mins", detail: " oversight" },
      { highlight: "4x content output" },
      { highlight: "+280% engagement" },
      { highlight: "+40% client retention" },
    ],
    timeline: "10-day MVP",
  },
];

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".case-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted-foreground">Real automation. Real results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.tag} className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} to-transparent`} />
              <div className="relative p-8 h-full flex flex-col">
                <div className="mb-6">
                  <span className={`text-xs ${c.tagColor} uppercase tracking-widest`}>{c.tag}</span>
                </div>
                <div className="mb-6">
                  <p className="text-foreground font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.role}</p>
                  <p className="text-xs text-muted-foreground/70">{c.company}</p>
                </div>
                <div className="flex-1 space-y-5">
                  <div>
                    <p className="text-xs text-red-400 uppercase tracking-wider mb-2">The Pain</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.pain}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary uppercase tracking-wider mb-2">The Automation</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.automation}</p>
                  </div>
                  <div className="pt-4 border-t border-foreground/10">
                    <p className="text-xs text-green-400 uppercase tracking-wider mb-2">The Result</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {c.results.map((r, i) => (
                        <li key={i}>
                          {r.prefix}
                          <span className="text-foreground">{r.highlight}</span>
                          {r.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <span className="text-xs text-muted-foreground/50">Timeline: {c.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

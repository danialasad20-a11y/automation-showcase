import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Clock, Target } from "lucide-react";
import contentEngineImg from "@/assets/workflows/content-engine.png";
import shopifyOrderImg from "@/assets/workflows/shopify-order-automation.png";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    title: "Social Media Content Engine",
    image: contentEngineImg,
    problem:
      "Client spent 10+ hours weekly on social media — researching trends, writing posts, and manual publishing across 5 platforms.",
    solution:
      "Built an automation that scrapes Google News via SerpAPI, generates platform-specific captions with ChatGPT, creates custom images via API, and auto-posts to LinkedIn, Instagram, Twitter, Facebook, and TikTok. Integrated Airtable for content approval and n8n error handling with retry logic.",
    results: [
      { icon: Clock, value: "80%", label: "Less time on content" },
      { icon: TrendingUp, value: "4x", label: "Posting frequency" },
      { icon: Target, value: "5 brands", label: "Scaled with zero effort" },
    ],
    tools: ["n8n", "OpenAI API", "SerpAPI", "Airtable", "Sora"],
  },
  {
    title: "Shopify Order Automation",
    image: shopifyOrderImg,
    problem:
      "Client was manually processing 200+ Shopify orders daily, spending 6 hours on data entry, inventory updates, and supplier notifications.",
    solution:
      "Built an end-to-end n8n automation that triggers on new orders, validates stock levels, updates Airtable inventory, sends WhatsApp alerts to suppliers, and posts shipping updates to Slack.",
    results: [
      { icon: Clock, value: "6h → 15m", label: "Daily processing" },
      { icon: TrendingUp, value: "4x", label: "Order capacity" },
      { icon: Target, value: "0", label: "Human errors" },
    ],
    tools: ["n8n", "Shopify", "Airtable", "WhatsApp", "Slack"],
  },
];

const CaseStudySection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".case-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="section-subheading">Real projects. Real results. Real screenshots.</p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-6">
          {cases.map((cs) => (
            <div
              key={cs.title}
              className="case-card bg-card rounded-xl border border-border overflow-hidden card-hover"
            >
              {/* Workflow screenshot */}
              <div className="aspect-[16/9] overflow-hidden bg-secondary">
                <img
                  src={cs.image}
                  alt={`${cs.title} workflow screenshot`}
                  className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{cs.title}</h3>

                <div className="mb-4">
                  <p className="text-xs font-mono text-destructive uppercase tracking-wider mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.problem}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cs.tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Results */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;

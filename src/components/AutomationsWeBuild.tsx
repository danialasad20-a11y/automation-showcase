import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, MessageSquare, MailCheck, PhoneCall, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const automations = [
  {
    icon: BrainCircuit,
    title: "AI Lead Qualification System",
    description: "AI chats with leads and books appointments automatically. No more missed opportunities.",
    workflow: ["New Lead", "AI Chat", "Qualify", "Book Call"],
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp AI Customer Support",
    description: "Respond instantly to customer questions and collect contact information 24/7.",
    workflow: ["Message In", "AI Response", "Collect Info", "CRM Sync"],
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: MailCheck,
    title: "Automated Sales Follow-ups",
    description: "AI sends personalized follow-ups that increase conversions by up to 40%.",
    workflow: ["Lead Activity", "AI Drafts", "Send Follow-up", "Track Opens"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agent",
    description: "AI answers phone calls and books appointments automatically — no receptionist needed.",
    workflow: ["Incoming Call", "AI Answers", "Qualify Caller", "Schedule"],
    color: "from-orange-500 to-amber-600",
  },
];

const AutomationsWeBuild = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".auto-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} id="automations" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            AI Automations <span className="gradient-text">We Build</span>
          </h2>
          <p className="section-subheading">
            Powerful AI systems that work around the clock so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {automations.map((a) => (
            <div key={a.title} className="auto-card bg-card rounded-2xl border border-border p-8 card-hover group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300`}>
                <a.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{a.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{a.description}</p>
              
              {/* Mini workflow */}
              <div className="flex items-center gap-1 flex-wrap">
                {a.workflow.map((step, i) => (
                  <div key={step} className="flex items-center gap-1">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground">
                      {step}
                    </span>
                    {i < a.workflow.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                    )}
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

export default AutomationsWeBuild;

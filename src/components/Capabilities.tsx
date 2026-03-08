import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot, MessageSquare, Phone, Mail, Database, BarChart3,
  ShoppingCart, Globe, Headphones, FileText, Workflow, Brain,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: Bot, title: "AI Agents & Chatbots", desc: "Custom AI assistants for any platform — web, WhatsApp, Telegram, Slack." },
  { icon: Phone, title: "Voice Agents", desc: "AI phone agents that handle calls, qualify leads, and book appointments 24/7." },
  { icon: Brain, title: "RAG & LLM Pipelines", desc: "Document Q&A, knowledge bases, and AI-powered data extraction." },
  { icon: Workflow, title: "Workflow Automation", desc: "Connect any SaaS to any SaaS. If it has an API, I can automate it." },
  { icon: ShoppingCart, title: "E-commerce Automation", desc: "Order processing, inventory sync, invoicing, shipping, and returns." },
  { icon: Mail, title: "Email & Communication", desc: "Automated sequences, newsletters, transactional emails, and follow-ups." },
  { icon: Database, title: "Database & Data Pipelines", desc: "ETL workflows, data warehousing, real-time sync, and transformations." },
  { icon: BarChart3, title: "Dashboards & Reporting", desc: "Auto-generated reports and live dashboards from your business data." },
  { icon: Headphones, title: "Helpdesk & Support", desc: "Ticket routing, AI triage, auto-responses, and escalation workflows." },
  { icon: Globe, title: "Social Media & Content", desc: "AI content generation, scheduling, cross-posting, and analytics." },
  { icon: FileText, title: "Document Processing", desc: "Invoice parsing, contract extraction, PDF generation, and OCR." },
  { icon: MessageSquare, title: "CRM & Sales Automation", desc: "Lead scoring, pipeline management, follow-ups, and deal tracking." },
];

const Capabilities = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.from(gridRef.current.querySelectorAll(".cap-card"), {
      scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      opacity: 0, y: 20, duration: 0.4, stagger: 0.05, ease: "power2.out",
    });
  }, []);

  return (
    <section id="capabilities" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            What I <span className="gradient-text">Automate</span>
          </h2>
          <p className="section-subheading">
            From AI agents to warehouse management — if your business runs on software, I can make it run itself.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="cap-card bg-card rounded-xl border border-border p-5 card-hover group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <cap.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{cap.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

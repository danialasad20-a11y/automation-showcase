import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot, ShoppingCart, Mail, Database, BarChart3,
  Headphones, FileText, Workflow, DollarSign, Users,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    color: "#6366f1",
    desc: "Custom AI assistants deployed on web, WhatsApp, Telegram, Slack, and voice channels. From RAG-powered knowledge bots to lead qualification agents.",
    examples: ["Customer support chatbot", "WhatsApp lead qualifier", "Voice appointment booker", "Internal knowledge assistant"],
    tools: ["OpenAI", "Pinecone", "WhatsApp API", "Twilio", "n8n"],
  },
  {
    icon: Headphones,
    title: "Sales & CRM",
    color: "#ec4899",
    desc: "Automate your entire sales pipeline — from lead capture and qualification to follow-ups, deal tracking, and handoff sequences.",
    examples: ["Lead scoring automation", "Follow-up sequences", "Pipeline management", "Outreach campaigns"],
    tools: ["HubSpot", "Salesforce", "Lemlist", "Gmail", "n8n"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Orders",
    color: "#f59e0b",
    desc: "End-to-end Shopify/WooCommerce automation — order processing, inventory sync, supplier alerts, shipping labels, and returns handling.",
    examples: ["Order fulfillment pipeline", "Inventory sync across warehouses", "Auto-invoicing", "Shipping automation"],
    tools: ["Shopify", "WooCommerce", "QuickBooks", "ShipStation", "n8n"],
  },
  {
    icon: Mail,
    title: "Content & Marketing",
    color: "#10b981",
    desc: "AI-powered content creation, social media scheduling, cross-platform posting, email campaigns, and performance reporting.",
    examples: ["Social media auto-posting", "Newsletter automation", "Content repurposing pipeline", "Trend-based content"],
    tools: ["ChatGPT", "Buffer", "Mailchimp", "Airtable", "n8n"],
  },
  {
    icon: DollarSign,
    title: "Finance & Accounting",
    color: "#8b5cf6",
    desc: "Automate invoice processing, expense tracking, payment reminders, reconciliation, and financial reporting across your tools.",
    examples: ["Invoice OCR & auto-posting", "Payment reminder sequences", "Expense categorization", "Monthly financial reports"],
    tools: ["QuickBooks", "Xero", "Stripe", "Google Sheets", "n8n"],
  },
  {
    icon: Users,
    title: "HR & Recruiting",
    color: "#f43f5e",
    desc: "Streamline candidate screening, interview scheduling, onboarding workflows, document collection, and employee management.",
    examples: ["Resume screening pipeline", "Interview scheduling bot", "Onboarding automation", "Document collection flow"],
    tools: ["Greenhouse", "BambooHR", "Google Calendar", "DocuSign", "n8n"],
  },
  {
    icon: Workflow,
    title: "Operations & Workflow",
    color: "#0ea5e9",
    desc: "Internal process automation — task routing, approval chains, project tracking, workflow orchestration, and team notifications.",
    examples: ["Approval workflows", "Task auto-assignment", "Project status updates", "Cross-team notifications"],
    tools: ["Slack", "Notion", "Jira", "Asana", "n8n"],
  },
  {
    icon: Database,
    title: "Data & Reporting",
    color: "#14b8a6",
    desc: "Automated dashboards, real-time data syncing, analytics reports, ETL pipelines, and business intelligence workflows.",
    examples: ["Auto-generated dashboards", "Multi-source data sync", "Weekly KPI reports", "Data warehouse pipelines"],
    tools: ["Google Sheets", "Airtable", "BigQuery", "Looker", "n8n"],
  },
  {
    icon: FileText,
    title: "Document & Admin",
    color: "#a855f7",
    desc: "Contract generation, document processing, form handling, digital signatures, PDF generation, and OCR extraction.",
    examples: ["Contract auto-generation", "Invoice parsing (OCR)", "Form submission workflows", "E-signature automation"],
    tools: ["DocuSign", "Google Docs", "Typeform", "AWS Textract", "n8n"],
  },
];

const Capabilities = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".cap-inner"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 0.6, ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [active]);

  const cat = categories[active];

  return (
    <section id="capabilities" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            What I <span className="gradient-text">Automate</span>
          </h2>
          <p className="section-subheading">
            From AI agents to warehouse management — if your business runs on software, I can make it run itself.
          </p>
        </div>

        <div className="cap-inner flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-[320px] shrink-0 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((c, i) => (
              <button
                key={c.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-200 shrink-0 ${
                  active === i
                    ? "bg-card border border-primary/40 shadow-glow"
                    : "border border-transparent hover:bg-card/50 hover:border-border"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: active === i ? c.color + "20" : "transparent",
                  }}
                >
                  <c.icon
                    className="w-4 h-4"
                    style={{ color: active === i ? c.color : "hsl(var(--muted-foreground))" }}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    active === i ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 bg-card border border-border rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: cat.color + "18" }}
              >
                <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {cat.desc}
            </p>

            {/* Example use cases */}
            <div className="mb-6">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                Example Use Cases
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {cat.examples.map((ex) => (
                  <div
                    key={ex}
                    className="flex items-center gap-2 text-sm text-foreground bg-secondary rounded-lg px-3 py-2"
                  >
                    <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                    {ex}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools used */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                Tools & Integrations
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono bg-secondary text-secondary-foreground px-3 py-1 rounded-lg border border-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "AI & LLMs", "Sales & CRM", "E-commerce", "Support", "Content", "IT Ops", "Data"];

const workflows = [
  {
    title: "AI Lead Qualification Agent",
    category: "Sales & CRM",
    description: "AI chatbot qualifies inbound leads via WhatsApp, scores them, updates CRM, and books meetings automatically.",
    nodes: ["Webhook", "AI Agent (GPT-4)", "HubSpot", "Google Calendar", "Slack"],
    tags: ["WhatsApp", "HubSpot", "GPT-4"],
    result: "3x more qualified meetings booked",
  },
  {
    title: "RAG Document Chatbot",
    category: "AI & LLMs",
    description: "Company knowledge base chatbot using Retrieval Augmented Generation with vector embeddings.",
    nodes: ["Google Drive", "Text Splitter", "Pinecone Embeddings", "AI Agent", "Chat Widget"],
    tags: ["Pinecone", "OpenAI", "RAG"],
    result: "90% fewer support tickets",
  },
  {
    title: "E-commerce Order Automation",
    category: "E-commerce",
    description: "Shopify order triggers inventory check, invoice generation, shipping label creation, and customer notification.",
    nodes: ["Shopify Trigger", "Inventory Check", "QuickBooks Invoice", "ShipStation", "Email"],
    tags: ["Shopify", "QuickBooks", "ShipStation"],
    result: "200+ hrs/month saved",
  },
  {
    title: "AI Voice Agent for Bookings",
    category: "AI & LLMs",
    description: "AI-powered voice agent answers phone calls, understands intent, and books appointments in real-time.",
    nodes: ["Twilio Voice", "Speech-to-Text", "AI Agent", "Calendly", "CRM Update"],
    tags: ["Twilio", "ElevenLabs", "Calendly"],
    result: "24/7 phone answering",
  },
  {
    title: "Social Media Content Pipeline",
    category: "Content",
    description: "AI generates, reviews, and schedules content across Instagram, TikTok, LinkedIn, and Twitter from a single brief.",
    nodes: ["Airtable Brief", "GPT-4 Writer", "DALL-E Image", "Buffer Schedule", "Analytics"],
    tags: ["GPT-4", "DALL-E", "Buffer"],
    result: "30 posts/week automated",
  },
  {
    title: "Multi-Channel Customer Support",
    category: "Support",
    description: "Unified inbox pulling from email, chat, WhatsApp, and social — AI triages and responds to common queries.",
    nodes: ["Email Trigger", "WhatsApp", "AI Classifier", "Zendesk Ticket", "Slack Alert"],
    tags: ["Zendesk", "WhatsApp", "AI"],
    result: "< 30s response time",
  },
  {
    title: "Automated Invoice & Payment Flow",
    category: "IT Ops",
    description: "Generates invoices from project completion, sends to clients, tracks payments, and updates accounting.",
    nodes: ["Project Trigger", "PDF Generator", "Stripe Invoice", "Xero Sync", "Reminder Bot"],
    tags: ["Stripe", "Xero", "PDF"],
    result: "Zero manual invoicing",
  },
  {
    title: "Data Warehouse ETL Pipeline",
    category: "Data",
    description: "Extracts data from multiple SaaS tools, transforms it, and loads into a data warehouse for dashboards.",
    nodes: ["API Pulls", "Data Transform", "PostgreSQL Load", "dbt Trigger", "Metabase Refresh"],
    tags: ["PostgreSQL", "dbt", "Metabase"],
    result: "Real-time dashboards",
  },
  {
    title: "Employee Onboarding Automation",
    category: "IT Ops",
    description: "New hire triggers account creation across all tools, sends welcome kit, schedules training, assigns buddy.",
    nodes: ["HR Trigger", "Google Workspace", "Slack Invite", "Notion Page", "Calendar Events"],
    tags: ["Google", "Slack", "Notion"],
    result: "Onboarding in minutes",
  },
  {
    title: "AI Sales Email Sequences",
    category: "Sales & CRM",
    description: "Personalized AI-written email sequences based on lead behavior, with automatic follow-ups and A/B testing.",
    nodes: ["CRM Trigger", "AI Writer", "SendGrid", "Open Tracker", "Slack Notify"],
    tags: ["SendGrid", "GPT-4", "HubSpot"],
    result: "40% higher open rates",
  },
  {
    title: "Warehouse Management Sync",
    category: "E-commerce",
    description: "Real-time sync between WMS, e-commerce platforms, and accounting. Auto-reorder when stock is low.",
    nodes: ["WMS Webhook", "Shopify Sync", "Low Stock Alert", "PO Generator", "Slack"],
    tags: ["WMS", "Shopify", "Slack"],
    result: "Zero stockouts",
  },
  {
    title: "AI Meeting Summarizer",
    category: "AI & LLMs",
    description: "Records meetings, transcribes with Whisper, summarizes with GPT-4, creates action items in project management tools.",
    nodes: ["Zoom Recording", "Whisper STT", "GPT-4 Summary", "Asana Tasks", "Slack Post"],
    tags: ["Whisper", "GPT-4", "Asana"],
    result: "Never miss an action item",
  },
];

const WorkflowShowcase = () => {
  const [active, setActive] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.from(gridRef.current.querySelectorAll(".wf-card"), {
      scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      opacity: 0, y: 30, duration: 0.5, stagger: 0.06, ease: "power2.out",
    });
  }, []);

  const filtered = active === "All" ? workflows : workflows.filter(w => w.category === active);

  return (
    <section id="workflows" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">
            Workflows I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subheading">
            Real automation systems running in production for businesses across industries.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workflow grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((wf) => (
            <div key={wf.title} className="wf-card bg-card rounded-xl border border-border p-6 card-hover group">
              {/* Category label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{wf.category}</span>
                <span className="text-xs text-muted-foreground font-mono">{wf.nodes.length} nodes</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{wf.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{wf.description}</p>

              {/* Visual node chain */}
              <div className="flex flex-wrap items-center gap-1 mb-4">
                {wf.nodes.map((node, i) => (
                  <span key={node} className="flex items-center gap-1">
                    <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground font-mono">{node}</span>
                    {i < wf.nodes.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {wf.tags.map(tag => (
                  <span key={tag} className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5">{tag}</span>
                ))}
              </div>

              {/* Result */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold gradient-text">{wf.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowShowcase;

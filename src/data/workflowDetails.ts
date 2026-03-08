import aiMeetingImg from "@/assets/workflows/ai-meeting-processor.png";
import onboardingImg from "@/assets/workflows/employee-onboarding.png";
import warehouseImg from "@/assets/workflows/warehouse-inventory.png";
import salesOutreachImg from "@/assets/workflows/sales-outreach.png";
import invoiceImg from "@/assets/workflows/invoice-automation.png";
import supportImg from "@/assets/workflows/omnichannel-support.png";
import socialImg from "@/assets/workflows/social-media-factory.png";
import dentalImg from "@/assets/workflows/dental-receptionist.png";
import shopifyImg from "@/assets/workflows/shopify-product-gen.png";
import leadQualImg from "@/assets/workflows/lead-qualification.png";

export interface WorkflowDetail {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  nodeCount: number;
  image: string;
  description: string;
  valueMetric: string;
  tools: string[];
  workflowSteps: string;
  simplifiedFlow: string;
  keyFeatures: string[];
  dataFlow: string;
  detailsTable: { label: string; value: string }[];
}

export const workflowDetails: WorkflowDetail[] = [
  {
    slug: "ai-meeting-processor",
    title: "AI Meeting Minutes Processor",
    category: "AI & Productivity",
    categoryColor: "hsl(30, 90%, 55%)",
    nodeCount: 11,
    image: aiMeetingImg,
    description:
      "Automatically processes meeting recordings and transcripts from Google Drive, extracts action items and decisions using GPT-4, and sends formatted HTML summaries to attendees.",
    valueMetric: "80% faster meeting recap",
    tools: ["Google Drive", "OpenAI GPT-4", "Gmail", "n8n"],
    workflowSteps:
      "Google Drive Trigger → If (PDF?) → Download → Extract Text → Merge → AI Agent → Data Validation → Data Preparation → Gmail",
    simplifiedFlow:
      "Google Drive → AI Extract → Validate → HTML Email",
    keyFeatures: [
      "Watches Google Drive folder for new files automatically",
      "Conditional split for PDF vs Text file handling",
      "GPT-4.1-mini extracts summary, decisions, notes, sentiment, tasks with owners & deadlines",
      "JavaScript validation + HTML email generation",
      "Rich HTML email sent to file modifier with categorized tasks",
      "Sentiment analysis: positive / neutral / negative classification",
    ],
    dataFlow:
      "Google Drive file → Conditional branch (PDF/Text) → Text extraction → Merge → AI Agent processing → Data validation → HTML template → Gmail delivery",
    detailsTable: [
      { label: "Trigger", value: "Watches Google Drive folder for new files" },
      { label: "Logic Branch", value: "Conditional split for PDF vs Text file handling" },
      { label: "AI Processing", value: "GPT-4.1-mini extracts: summary, decisions, notes, sentiment, tasks with owners/deadlines" },
      { label: "Data Transform", value: "JavaScript validation + HTML email generation" },
      { label: "Output", value: "Rich HTML email with categorized tasks (positive/neutral/negative)" },
    ],
  },
  {
    slug: "employee-onboarding",
    title: "Automated Employee Onboarding",
    category: "HR & Operations",
    categoryColor: "hsl(230, 70%, 60%)",
    nodeCount: 30,
    image: onboardingImg,
    description:
      "End-to-end onboarding automation triggered by Google Sheets or Slack. Creates Jira epics with subtasks, provisions Google Drive folders, sends welcome emails, and notifies team via Slack—completely hands-free from hire to first day.",
    valueMetric: "Zero-touch onboarding",
    tools: ["Google Sheets", "Jira", "Google Drive", "Slack", "Gmail", "n8n"],
    workflowSteps:
      "Sheets Trigger → If → Extract Data → Jira Epic → Subtask Setup → Split → Create Subtasks → Aggregate → Drive Folder → Copy Files → Share → Log\nSlack Trigger → Extract → Get Jira ID → Set Tasks → Split → Create Subtasks → Merge → DM Slack + Welcome Email",
    simplifiedFlow:
      "Sheets/Slack → Extract → Jira Epic → Subtasks → Drive Folder → Share → Slack DM + Gmail",
    keyFeatures: [
      "Dual trigger: Google Sheets (HR input) OR Slack (new user joined)",
      "3 parallel tracks: Manager tasks, New hire tasks, Drive provisioning",
      "Auto-creates Jira epic + 7 manager subtasks + 5 new hire subtasks",
      "Provisions personalized Drive folder with template docs",
      "Sends Slack DM with task links",
      "Sends HTML welcome email via Gmail",
      "Aggregates multiple subtask creations and merges data streams",
    ],
    dataFlow:
      "Sheets/Slack → Extract hire data → Jira epic creation → Parallel subtask generation → Drive folder provisioning → File copy & share → Slack DM + Gmail welcome → Sheets logging",
    detailsTable: [
      { label: "Triggers", value: "Dual: Google Sheets (HR input) OR Slack (new user joined)" },
      { label: "Logic Branches", value: "3 parallel tracks: Manager tasks, New hire tasks, Drive provisioning" },
      { label: "Key Outputs", value: "Jira epic + 12 subtasks, Drive folder, Slack DM, Welcome email" },
      { label: "Data Flow", value: "Aggregates multiple subtask creations, merges Slack + Sheets data" },
    ],
  },
  {
    slug: "warehouse-inventory",
    title: "Voice-Powered Warehouse Inventory Counter",
    category: "Logistics & Operations",
    categoryColor: "hsl(145, 65%, 45%)",
    nodeCount: 25,
    image: warehouseImg,
    description:
      "Hands-free inventory cycle counting via Telegram voice messages. Warehouse operators speak location codes and quantities; GPT-4 transcribes, validates against location scope, updates Google Sheets in real-time, and guides operators through remaining locations step-by-step.",
    valueMetric: "50% faster cycle counts",
    tools: ["Telegram", "OpenAI GPT-4", "Google Sheets", "n8n"],
    workflowSteps:
      "Telegram Trigger → Is Audio? → Command → Help/Start → Collect Locations → Extract IDs → Count → Merge → Last Location? → Send Next/Last Instruction → Wait\nAudio → Transcribe → AI Extract → Validate → Update Sheets/Error",
    simplifiedFlow:
      "Telegram Voice → Transcribe → AI Parse → Validate → Update Sheets → Next Location",
    keyFeatures: [
      "Voice-to-text transcription via Telegram",
      "AI extraction of location codes and quantities (supports English/French)",
      "Real-time Google Sheets updates",
      "Progressive location guidance through remaining locations",
      "Command routing (/help, /start, wrong command)",
      "Error handling for unclear audio or invalid locations",
      "Location scope validation before updating inventory",
    ],
    dataFlow:
      "Telegram message → Audio detection → Transcription → AI parsing → Location validation → Sheets update → Next location prompt → Iteration until complete",
    detailsTable: [
      { label: "Trigger", value: "Telegram messages (text commands or voice)" },
      { label: "Logic Branches", value: "Audio vs Text, Command routing, Location validation, Last location detection" },
      { label: "AI Processing", value: "Voice-to-text + structured extraction (location, quantity)" },
      { label: "Language Support", value: "English and French" },
      { label: "Output", value: "Real-time Google Sheets inventory updates" },
    ],
  },
  {
    slug: "sales-outreach",
    title: "AI-Powered Sales Outreach Generator",
    category: "Sales & AI",
    categoryColor: "hsl(270, 65%, 55%)",
    nodeCount: 20,
    image: salesOutreachImg,
    description:
      "Chat-triggered sales automation that researches prospects using MadKudu intelligence, generates hyper-personalized email angles with GPT-4, and auto-provisions contacts in Outreach.io with sequence enrollment—turning a simple email input into a complete outbound campaign.",
    valueMetric: "5x faster personalized outreach",
    tools: ["OpenAI GPT-4", "MadKudu", "Outreach.io", "n8n"],
    workflowSteps:
      "Chat Trigger → Extract Email → MadKudu Account Brief → Generate 5 Email Angles → Check Existing Contact → Create/Update Prospect → Set ID → Submit to Sequence → Wait → Confirm → Complete",
    simplifiedFlow:
      "Chat Input → AI Extract → MadKudu Research → Generate Emails → Outreach CRUD → Sequence Enroll",
    keyFeatures: [
      "AI extracts email from natural language chat input",
      "MadKudu MCP generates account intelligence briefs",
      "GPT-4 researches 5 personalized angles (company news, shared interests, product usage, tech stack, role-specific value)",
      "Auto-creates/updates Outreach.io prospects",
      "Enrolls in sequences with mailbox assignment",
      "Polling confirmation for batch completion",
    ],
    dataFlow:
      "Email input → Account research (MadKudu) → 5 draft emails (GPT-4) → Prospect CRUD (Outreach) → Sequence enrollment → Status confirmation",
    detailsTable: [
      { label: "Trigger", value: "Chat message (email address input)" },
      { label: "Research", value: "MadKudu MCP generates account intelligence briefs" },
      { label: "AI Output", value: "5 personalized email angles per prospect" },
      { label: "CRM", value: "Auto create/update Outreach.io prospects + sequence enrollment" },
    ],
  },
  {
    slug: "invoice-automation",
    title: "Smart Invoice Automation with AI Reminders",
    category: "Finance & Accounting",
    categoryColor: "hsl(145, 65%, 45%)",
    nodeCount: 28,
    image: invoiceImg,
    description:
      "End-to-end invoice lifecycle management: form submissions auto-create QuickBooks customers and invoices, while an intelligent reminder system tracks unpaid invoices, sends escalating payment reminders on custom schedules (2, 3, 5-day intervals), and auto-removes paid invoices—complete with AI-generated daily summary reports.",
    valueMetric: "Get paid 40% faster",
    tools: ["QuickBooks", "Gmail", "OpenAI GPT-4", "n8n", "JotForm"],
    workflowSteps:
      "Form Submission → Format Data → Customer Check → Create/Update → Get Product → Create Invoice → Send → Track in DB\nSchedule Trigger → Get Invoices → Loop → Check Balance → Switch → Send Reminder → Update Counter → Delete\nGet Today's Sent → AI Summary → Email Report",
    simplifiedFlow:
      "Form → QuickBooks Invoice → Send → Track → Scheduled Reminders → AI Daily Report",
    keyFeatures: [
      "Auto-parses JotForm billing addresses",
      "Upserts QuickBooks customers (create or update)",
      "Creates and sends invoices immediately",
      "Smart reminder scheduling with configurable intervals (2, 3, 5 days)",
      "Payment status detection and auto-cleanup",
      "Escalating reminder counter with max threshold",
      "AI-generated HTML summary emails of daily activity",
    ],
    dataFlow:
      "Form → Customer CRUD → Product → Invoice → Send → DB Tracking → Scheduled Loop → Balance Check → Conditional Email → Counter Update → Max Check → Cleanup + AI Reporting",
    detailsTable: [
      { label: "Triggers", value: "Webhook (form submission) + Schedule (daily 8am reminders)" },
      { label: "Logic Branches", value: "Customer exists?, Payment status switch (Send Now/Already Paid/Send Later), Max reminders reached?" },
      { label: "Reminder Schedule", value: "Configurable intervals: 2, 3, 5 days between escalations" },
      { label: "AI Reporting", value: "Daily HTML summary of all invoicing activity" },
    ],
  },
  {
    slug: "omnichannel-support",
    title: "Omnichannel AI Customer Support",
    category: "Customer Support",
    categoryColor: "hsl(210, 70%, 55%)",
    nodeCount: 18,
    image: supportImg,
    description:
      "Unified AI support across Gmail and Telegram with shared knowledge base, conversation memory, and intelligent escalation. Handles customer inquiries 24/7, logs all interactions for analysis, and alerts admins on errors—delivering consistent, contextual support across channels.",
    valueMetric: "24/7 instant support",
    tools: ["Gmail", "Telegram", "OpenAI GPT-4", "Google Sheets", "Slack"],
    workflowSteps:
      "Gmail Trigger → Process → AI Agent → Send Reply → Mark Read → Log\nTelegram Trigger → Process → AI Agent → Send Reply → Log\nError Trigger → Notify Admin (Slack)",
    simplifiedFlow:
      "Gmail/Telegram → AI Agent (KB + Memory) → Reply → Log → Slack Alerts",
    keyFeatures: [
      "Omnichannel: Handles both email and chat in one workflow",
      "Shared Knowledge Base: Google Sheets-based FAQ accessible to both agents",
      "Conversation Memory: Per-customer session memory (gmail_ + email, telegram_ + ID)",
      "Separate AI agents for each channel with professional support personas",
      "Escalation Logging: Tracks when AI cannot resolve issues",
      "Full Audit Trail: Logs all interactions to Sheets with timestamps and response times",
      "Error Handling: Automatic Slack alerts for workflow failures",
    ],
    dataFlow:
      "Trigger → Normalize data → AI Agent (with KB + Memory tools) → Send response → Log interaction → Mark complete",
    detailsTable: [
      { label: "Triggers", value: "Gmail (unread emails) + Telegram (messages) + Error handling" },
      { label: "AI Infrastructure", value: "Shared knowledge base + per-customer conversation memory" },
      { label: "Channels", value: "Gmail and Telegram with unified AI backend" },
      { label: "Monitoring", value: "Escalation logging + Slack alerts for failures" },
    ],
  },
  {
    slug: "social-media-factory",
    title: "AI Social Media Content Factory",
    category: "Marketing & Content",
    categoryColor: "hsl(330, 70%, 55%)",
    nodeCount: 32,
    image: socialImg,
    description:
      "End-to-end social media automation: submit a topic via form, AI researches and generates platform-optimized content for 7 networks (LinkedIn, Instagram, Facebook, X, TikTok, Threads, YouTube Shorts), sends for human approval, then auto-publishes with AI-generated images—complete with results reporting via email and Telegram.",
    valueMetric: "One click, 7 platforms",
    tools: ["OpenAI GPT-4", "SerpAPI", "Gmail", "Instagram", "X/Twitter", "Facebook", "LinkedIn", "Telegram", "ImgBB"],
    workflowSteps:
      "Form → AI Content Factory (SerpAPI + GPT-4) → Structured Output → Review Email → Gmail Approval → Is Approved? → Generate Image → Upload → Parallel Post to 4 Platforms → Aggregate Results → AI Report → Email + Telegram",
    simplifiedFlow:
      "Form → AI Factory → Approval → Image Gen → 4 Platforms → Results → Email/Telegram",
    keyFeatures: [
      "AI Research: SerpAPI for real-time topic research",
      "Multi-Platform Generation: Single input creates 7 platform-specific posts",
      "Structured Output: JSON schema ensures consistent formatting",
      "Human Approval: 45-minute Gmail approval window with double-opt-in",
      "AI Image Generation: DALL-E creates platform-specific visuals",
      "Parallel Publishing: Simultaneous posts to Instagram, X, Facebook, LinkedIn",
      "Comprehensive Reporting: AI-generated HTML tables + summaries via Email and Telegram",
    ],
    dataFlow:
      "Form → AI Agent (research + generate) → Structured parser → Review email → Approval check → Image gen → Hosting → Platform posts → Result collection → Aggregation → AI formatting → Multi-channel delivery",
    detailsTable: [
      { label: "Trigger", value: "Form submission (topic, keywords, optional link)" },
      { label: "Platforms", value: "LinkedIn, Instagram, Facebook, X, TikTok, Threads, YouTube Shorts" },
      { label: "Approval", value: "45-minute Gmail approval window with human-in-the-loop" },
      { label: "Image Gen", value: "DALL-E creates platform-specific visuals, hosted on ImgBB" },
      { label: "Reporting", value: "AI-generated results via Email + Telegram" },
    ],
  },
  {
    slug: "dental-receptionist",
    title: "AI Dental Office Receptionist",
    category: "Healthcare & Scheduling",
    categoryColor: "hsl(175, 60%, 45%)",
    nodeCount: 12,
    image: dentalImg,
    description:
      "Autonomous AI agent for dental practices that handles appointment scheduling via webhook. Checks Google Calendar availability (finding 2+ slots), books 1-hour appointments, logs patient details to Sheets, and sends confirmations via SMS and Gmail—all with conversational memory and reasoning.",
    valueMetric: "24/7 appointment booking",
    tools: ["Google Gemini 2.5 Flash", "Google Calendar", "Google Sheets", "Twilio SMS", "Gmail", "n8n"],
    workflowSteps:
      "Webhook Trigger → Dental AI Agent (Gemini 2.5 Flash) → Tool Selection → [Think → Get Availability / Create Appointment / Log Details / Send SMS / Send Gmail] → Webhook Response",
    simplifiedFlow:
      "Webhook → AI Agent → Calendar/Sheets/SMS/Gmail → Response",
    keyFeatures: [
      "Multi-Tool AI Agent: Single agent orchestrates 6 tools with reasoning",
      "Smart Availability: Automatically finds 2+ available slots",
      "Constraint Guardrails: System prompts enforce business rules (max 1 booking per request)",
      "Conversational Memory: 10-turn context window per session",
      "Multi-Channel Confirmations: SMS + Email confirmations",
      "Comprehensive Logging: Patient details, insurance, concerns to Sheets",
    ],
    dataFlow:
      "Webhook → AI Agent → Think → Tool Execution (Calendar/Sheets/SMS/Gmail) → Webhook Response",
    detailsTable: [
      { label: "Trigger", value: "Webhook (POST requests from any frontend)" },
      { label: "AI Model", value: "Google Gemini 2.5 Flash with 6 tool integrations" },
      { label: "Guardrails", value: "Max 1 booking per request, constraint enforcement" },
      { label: "Memory", value: "10-turn conversational context window" },
      { label: "Confirmations", value: "SMS (Twilio) + Email (Gmail)" },
    ],
  },
  {
    slug: "shopify-product-gen",
    title: "AI-Powered Shopify Product Generator",
    category: "E-commerce & AI",
    categoryColor: "hsl(145, 65%, 45%)",
    nodeCount: 26,
    image: shopifyImg,
    description:
      "Automated digital product creation pipeline: scans Google Drive for poster images, uses GPT-4 Vision to analyze content (character, series, text, style), generates SEO-optimized product listings with AI, and auto-publishes to Shopify—complete with collections, descriptions, and metadata.",
    valueMetric: "Zero-touch product listings",
    tools: ["Google Drive", "OpenAI GPT-4 Vision", "Google Gemini", "Airtable", "Shopify", "n8n"],
    workflowSteps:
      "Manual Trigger → Airtable (Unused Images) → Filter → Loop → Download from Drive → GPT-4 Vision Analysis → Update Airtable → Get Collections → LLM Chain → Structured Parser → Update Product Table → Create Shopify Product → Update Status",
    simplifiedFlow:
      "Drive Images → Vision AI → Structured Data → LLM → Shopify Product → Live",
    keyFeatures: [
      "Computer Vision: GPT-4 analyzes poster images extracting character names, series, text, style",
      "Smart Categorization: AI matches products to existing Shopify collections",
      "SEO Automation: Auto-generates page titles, meta descriptions, URL handles",
      "Structured Output: JSON schema enforcement with auto-fixing parser",
      "State Management: Airtable tracks image status (Unused → Used → Generated → Posted)",
      "Batch Processing: Handles multiple images in sequence with wait states",
    ],
    dataFlow:
      "Drive Images → Vision Analysis → Structured Data → LLM Enhancement → Product Generation → Shopify Publishing → Status Tracking",
    detailsTable: [
      { label: "Trigger", value: "Manual trigger (batch processing)" },
      { label: "Vision AI", value: "GPT-4 analyzes images: character, series, text, style" },
      { label: "SEO", value: "Auto-generates titles, meta descriptions, URL handles" },
      { label: "State Tracking", value: "Airtable: Unused → Used → Generated → Posted" },
      { label: "Output", value: "Live Shopify products with collections and metadata" },
    ],
  },
  {
    slug: "lead-qualification",
    title: "AI Lead Qualification & Outreach System",
    category: "Sales & CRM",
    categoryColor: "hsl(15, 80%, 55%)",
    nodeCount: 22,
    image: leadQualImg,
    description:
      "Intelligent lead processing: form submissions are analyzed by AI to classify leads (HOT/WARM/COLD), generate personalized outreach emails with human approval workflow, and sync everything to Notion—complete with revision loops for sales team feedback.",
    valueMetric: "70% faster lead response",
    tools: ["Google Gemini", "OpenAI GPT-4", "Gmail", "Telegram", "Notion", "n8n"],
    workflowSteps:
      "Form Trigger → Classification Agent (Gemini + GPT-4) → Router (HOT/WARM/COLD) → Email Notifier → Outreach Email Generator → Set Email → Telegram Approval → Decision Router → [Send → Notion] OR [Revision Agent → Loop]",
    simplifiedFlow:
      "Form → AI Classify → Route → Generate Email → Telegram Approval → Send/Revise → Notion",
    keyFeatures: [
      "Dual AI Classification: Gemini + OpenAI for robust lead scoring",
      "Structured Output: JSON schema for consistent classification data",
      "Tiered Response Strategy: HOT (priority), WARM (standard), COLD (polite rejection)",
      "Human-in-the-Loop: Telegram approval with revision capability",
      "AI Email Generation: Context-aware outreach with personalization",
      "Revision Agent: Dedicated AI for incorporating human feedback",
      "CRM Integration: Full lead data sync to Notion database",
    ],
    dataFlow:
      "Form → AI Classification → Routing → Email Generation → Human Review → [Send + CRM] or [Revise + Re-review]",
    detailsTable: [
      { label: "Trigger", value: "Form submission (client intake)" },
      { label: "Classification", value: "Dual AI (Gemini + GPT-4) → HOT / WARM / COLD routing" },
      { label: "Approval", value: "Telegram human-in-the-loop with revision capability" },
      { label: "CRM", value: "Full lead data sync to Notion database" },
    ],
  },
];

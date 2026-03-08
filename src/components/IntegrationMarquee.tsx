const integrations = [
  "n8n", "OpenAI", "Slack", "Google Sheets", "WhatsApp", "HubSpot", "Salesforce",
  "Shopify", "Stripe", "Airtable", "Notion", "Supabase", "PostgreSQL", "MongoDB",
  "Zapier", "Make.com", "Discord", "Telegram", "Twilio", "SendGrid", "Mailchimp",
  "WooCommerce", "WordPress", "GitHub", "Jira", "Asana", "Trello", "Zendesk",
  "Freshdesk", "Intercom", "Calendly", "Google Drive", "Dropbox", "AWS S3",
  "Firebase", "Pinecone", "Weaviate", "ElevenLabs", "Anthropic", "Gemini",
  "Microsoft Teams", "Outlook", "QuickBooks", "Xero", "Zoho", "ClickUp",
];

const IntegrationMarquee = () => (
  <section className="py-16 border-y border-border overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
        I integrate & automate 500+ platforms
      </p>
    </div>
    <div className="marquee">
      <div className="marquee-content gap-3">
        {[...integrations, ...integrations].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground font-medium whitespace-nowrap hover:text-foreground hover:border-primary/30 transition-colors"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationMarquee;

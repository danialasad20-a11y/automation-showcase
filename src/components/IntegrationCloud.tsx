import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  "Shopify", "Amazon", "eBay", "WooCommerce", "Etsy",
  "Gmail", "Slack", "Discord", "Telegram", "WhatsApp",
  "Google Sheets", "PostgreSQL", "Supabase", "Airtable", "Notion",
  "OpenAI", "Claude", "Gemini", "ElevenLabs", "HuggingFace",
  "n8n", "Zapier", "Make", "GitHub", "Vercel",
  "Facebook", "Instagram", "X/Twitter", "LinkedIn", "TikTok",
  "Google Analytics", "HubSpot", "Salesforce", "Mailchimp", "Klaviyo",
  "Stripe", "PayPal", "QuickBooks", "Xero", "Plaid",
  "Figma", "Webflow", "WordPress", "Obsidian", "Canva",
];

const IntegrationCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(".integration-node");
    gsap.from(nodes, {
      scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.03, ease: "back.out(1.7)",
    });
  }, []);

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Integration Cloud</h2>
          <p className="text-muted-foreground text-sm">50+ platforms. One automation layer.</p>
        </div>
        <div ref={containerRef} className="relative flex flex-wrap justify-center gap-3">
          {integrations.map((name, i) => (
            <span
              key={name}
              className={`integration-node${Math.random() > 0.7 ? " pulse" : ""}`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationCloud;

import { useEffect, useRef, useCallback } from "react";

const integrations = [
  "Shopify", "Amazon", "eBay", "WooCommerce", "Etsy", "BigCommerce",
  "Gmail", "Slack", "Discord", "Telegram", "WhatsApp", "Outlook",
  "Google Sheets", "PostgreSQL", "Supabase", "Airtable", "Notion", "MongoDB",
  "OpenAI", "Claude", "Gemini", "ElevenLabs", "HuggingFace", "Midjourney",
  "n8n", "Zapier", "Make", "GitHub", "Vercel", "Netlify",
  "Facebook", "Instagram", "X/Twitter", "LinkedIn", "TikTok", "YouTube",
  "Google Analytics", "HubSpot", "Salesforce", "Mailchimp", "Klaviyo", "Intercom",
  "Stripe", "PayPal", "QuickBooks", "Xero", "Plaid", "Square",
  "Figma", "Webflow", "WordPress", "Canva",
];

interface FloatingNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  name: string;
  width: number;
  height: number;
  pulsePhase: number;
}

const IntegrationCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<FloatingNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  const initNodes = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Grid-based initial placement to avoid overlap
    const cols = Math.ceil(Math.sqrt(integrations.length * (w / h)));
    const rows = Math.ceil(integrations.length / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    nodesRef.current = integrations.map((name, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cellW * col + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
      const y = cellH * row + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.3;

      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseX: x,
        baseY: y,
        name,
        width: name.length * 8 + 36,
        height: 36,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (nodesRef.current.length === 0) initNodes();
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const ctx = canvas.getContext("2d")!;
    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 8;
    const FRICTION = 0.92;
    const RETURN_FORCE = 0.01;
    const PADDING = 20;

    function animate(time: number) {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const nodes = nodesRef.current;

      // Physics pass
      nodes.forEach((node) => {
        // Mouse repulsion
        const dx = node.x + node.width / 2 - mx;
        const dy = node.y + node.height / 2 - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Return to base
        node.vx += (node.baseX - node.x) * RETURN_FORCE;
        node.vy += (node.baseY - node.y) * RETURN_FORCE;

        // Friction
        node.vx *= FRICTION;
        node.vy *= FRICTION;

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Clamp to bounds
        node.x = Math.max(PADDING, Math.min(w - node.width - PADDING, node.x));
        node.y = Math.max(PADDING, Math.min(h - node.height - PADDING, node.y));
      });

      // Node-to-node separation to prevent overlap
      const SEPARATION_PADDING = 6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const acx = a.x + a.width / 2;
          const acy = a.y + a.height / 2;
          const bcx = b.x + b.width / 2;
          const bcy = b.y + b.height / 2;
          const overlapX = (a.width / 2 + b.width / 2 + SEPARATION_PADDING) - Math.abs(acx - bcx);
          const overlapY = (a.height / 2 + b.height / 2 + SEPARATION_PADDING) - Math.abs(acy - bcy);
          if (overlapX > 0 && overlapY > 0) {
            // Push apart along the axis of least overlap
            if (overlapX < overlapY) {
              const push = overlapX / 2;
              const sign = acx < bcx ? -1 : 1;
              a.x += sign * push;
              b.x -= sign * push;
              a.vx += sign * 0.5;
              b.vx -= sign * 0.5;
            } else {
              const push = overlapY / 2;
              const sign = acy < bcy ? -1 : 1;
              a.y += sign * push;
              b.y -= sign * push;
              a.vy += sign * 0.5;
              b.vy -= sign * 0.5;
            }
          }
        }
      }

      // Re-clamp after separation
      nodes.forEach((node) => {
        node.x = Math.max(PADDING, Math.min(w - node.width - PADDING, node.x));
        node.y = Math.max(PADDING, Math.min(h - node.height - PADDING, node.y));

        // Draw
        const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.5 + 0.5;
        const mdx = node.x + node.width / 2 - mx;
        const mdy = node.y + node.height / 2 - my;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const isNearMouse = mouseDist < REPEL_RADIUS * 1.5;
        const alpha = isNearMouse ? 0.9 + pulse * 0.1 : 0.5 + pulse * 0.2;
        const borderAlpha = isNearMouse ? 0.8 : 0.25 + pulse * 0.15;
        const glowSize = isNearMouse ? 15 : 0;

        // Glow
        if (glowSize > 0) {
          ctx.shadowColor = "rgba(0, 217, 255, 0.4)";
          ctx.shadowBlur = glowSize;
        }

        // Pill background
        const r = node.height / 2;
        ctx.beginPath();
        ctx.roundRect(node.x, node.y, node.width, node.height, r);
        ctx.fillStyle = `rgba(0, 217, 255, ${isNearMouse ? 0.12 : 0.04})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 217, 255, ${borderAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Text
        ctx.font = "500 12px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(${isNearMouse ? "0, 217, 255" : "255, 255, 255"}, ${alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, node.x + node.width / 2, node.y + node.height / 2);
      });

      // Draw faint connection lines between nearby nodes
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const a = nodesRef.current[i];
          const b = nodesRef.current[j];
          const dx = (a.x + a.width / 2) - (b.x + b.width / 2);
          const dy = (a.y + a.height / 2) - (b.y + b.height / 2);
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - d / 150) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x + a.width / 2, a.y + a.height / 2);
            ctx.lineTo(b.x + b.width / 2, b.y + b.height / 2);
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNodes]);

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Integration Cloud</h2>
          <p className="text-muted-foreground text-sm">50+ platforms. One automation layer.</p>
        </div>
        <div ref={containerRef} className="relative" style={{ height: "500px" }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
        </div>
      </div>
    </section>
  );
};

export default IntegrationCloud;

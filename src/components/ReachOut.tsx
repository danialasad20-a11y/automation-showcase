import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ReachOut = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".reach-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 50, duration: 0.8, ease: "power2.out",
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://n8n.businessautomate.online/webhook/6775936d-2691-4901-a5ec-98dc145b5aec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, automation_request: message, timestamp: new Date().toISOString(), source: "businessautomate.online" }),
      });
      if (res.ok) setStatus("success");
      else throw new Error();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-4">
            Let's Build <span className="gradient-text">Your System</span>
          </h2>
          <p className="section-subheading">Tell me what you'd like automated. I'll respond within 24 hours.</p>
        </div>

        <div className="reach-card bg-card rounded-2xl border border-border p-8 md:p-12 shadow-soft">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-xl font-semibold mb-2">Message received!</p>
              <p className="text-muted-foreground">I'll get back to you within 24 hours with a plan.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What would you like automated?</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your workflow..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 gradient-bg text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-60"
              >
                {status === "loading" ? <div className="spinner" /> : "Send Message"}
              </button>
              {status === "error" && (
                <p className="text-destructive text-sm text-center">Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReachOut;

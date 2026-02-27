import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ReachOut = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".glass-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
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
    <section ref={sectionRef} className="py-20 md:py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Your System</h2>
          <p className="text-muted-foreground">Tell me what you'd like automated. I'll respond within 24 hours.</p>
        </div>
        <div className="glass-card rounded-2xl p-8 md:p-12">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-primary font-medium mb-2">Message received.</p>
              <p className="text-sm text-muted-foreground">I'll get back to you within 24 hours with a plan.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-primary mb-2 font-mono">
                  <span className="text-muted-foreground">&gt;</span> Your email:
                </label>
                <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="cyber-input w-full px-4 py-3 rounded font-mono" />
              </div>
              <div>
                <label className="block text-sm text-primary mb-2 font-mono">
                  <span className="text-muted-foreground">&gt;</span> What would you like automated?
                </label>
                <textarea required rows={4} placeholder="Describe your workflow..." value={message} onChange={(e) => setMessage(e.target.value)} className="cyber-input w-full px-4 py-3 rounded font-mono resize-none" />
              </div>
              <button type="submit" disabled={status === "loading"} className="btn-cyan w-full py-4 border border-primary text-primary rounded font-mono text-sm uppercase tracking-widest">
                {status === "loading" ? <div className="spinner" /> : "[ SEND MESSAGE ]"}
              </button>
              {status === "error" && <p className="text-destructive text-sm text-center">Something went wrong. Please try again or email directly.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReachOut;

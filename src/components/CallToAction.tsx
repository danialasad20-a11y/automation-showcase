import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-36 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          <span className="text-foreground">Ready to </span>
          <span className="text-primary text-glow">Automate</span>
          <span className="text-foreground">?</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Stop doing repetitive work. Let systems handle the boring stuff while you focus on growing your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:danialasad20@gmail.com"
            className="px-8 py-4 bg-primary text-primary-foreground rounded font-mono text-sm uppercase tracking-widest hover:shadow-cyan-glow transition-all duration-300"
          >
            [ LET'S AUTOMATE ]
          </a>
          <a
            href="https://wa.me/923061110200"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-primary/50 text-primary rounded font-mono text-sm uppercase tracking-widest hover:border-primary hover:shadow-cyan-glow transition-all duration-300"
          >
            [ WHATSAPP ME ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

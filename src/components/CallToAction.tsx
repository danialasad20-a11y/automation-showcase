import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

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
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Ready to <span className="gradient-text">Automate</span>?
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a free automation strategy call and discover how I can save you hours every week 
          with custom workflow automation.
        </p>
        <div className="flex justify-center">
          <a
            href="https://calendly.com/danialasad20/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 gradient-bg text-primary-foreground rounded-xl font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Book Free Consultation
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

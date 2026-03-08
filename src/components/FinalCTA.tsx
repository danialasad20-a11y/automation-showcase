import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelector(".cta-inner"), {
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="cta-inner gradient-bg rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <Calendar className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-4">
              Ready To Automate Your Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Book a free automation strategy call and discover how AI can save you hours every week.
            </p>
            <a
              href="https://wa.me/923061110200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-foreground rounded-xl font-semibold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Automation Audit
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

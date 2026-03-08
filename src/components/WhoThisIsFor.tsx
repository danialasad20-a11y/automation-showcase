import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Megaphone, Building2, ShoppingCart, Wrench, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: Megaphone,
    title: "Marketing Agencies",
    description: "Automate client reporting, lead gen, and campaign management across all your accounts.",
  },
  {
    icon: Building2,
    title: "Real Estate Companies",
    description: "Qualify leads instantly, automate follow-ups, and book property viewings on autopilot.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Businesses",
    description: "Automate order processing, customer support, and abandoned cart recovery.",
  },
  {
    icon: Wrench,
    title: "Local Service Businesses",
    description: "Handle bookings, customer inquiries, and invoicing without lifting a finger.",
  },
  {
    icon: Users,
    title: "Companies With High Lead Volume",
    description: "Never miss a lead again. AI qualifies and routes every inquiry in seconds.",
  },
];

const WhoThisIsFor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".audience-card"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Who This Is <span className="gradient-text">For</span>
          </h2>
          <p className="section-subheading">
            We help businesses that are ready to scale with intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="audience-card p-6 rounded-2xl border border-border bg-card card-hover group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-300">
                <a.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsFor;

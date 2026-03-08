import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Play, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const textReviews = [
  {
    name: "James Rodriguez",
    role: "Founder",
    company: "AutoFlow Logistics",
    text: "The automation completely transformed how we handle orders. What used to take my team 6 hours now runs in the background. Honestly the best investment we've made this year.",
    stars: 5,
  },
  {
    name: "Amira Hassan",
    role: "Marketing Director",
    company: "Bloom Digital Agency",
    text: "Our content pipeline went from chaotic to fully automated. We're posting 4x more across every platform and haven't missed a trending topic in months. Absolute game-changer.",
    stars: 5,
  },
  {
    name: "David Park",
    role: "Operations Manager",
    company: "TechServe Solutions",
    text: "I was skeptical about automation at first, but the ROI spoke for itself within the first week. Our support tickets are handled instantly now and customer satisfaction is through the roof.",
    stars: 5,
  },
  {
    name: "Rachel Thompson",
    role: "CEO",
    company: "Greenline Real Estate",
    text: "Leads that used to fall through the cracks are now followed up within seconds. We've tripled our booked appointments and our agents can focus on closing instead of chasing.",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    role: "E-commerce Director",
    company: "UrbanThread Co.",
    text: "Scaled from 200 to 800 orders per day without hiring a single person. The Shopify automation handles everything from inventory to supplier notifications flawlessly.",
    stars: 5,
  },
  {
    name: "Sofia Petrov",
    role: "Practice Manager",
    company: "Bright Smile Dental NYC",
    text: "Patients get instant replies, appointments book themselves, and we send reminders automatically. Our no-show rate dropped by 60%. I wish we'd done this sooner.",
    stars: 5,
  },
];

const videoReviews = [
  {
    name: "Tony Marchetti",
    company: "Marchetti Auto Repair, Brooklyn NY",
    thumbnail: null,
    placeholder: true,
  },
  {
    name: "Lisa Chen",
    company: "Chen & Associates Real Estate",
    thumbnail: null,
    placeholder: true,
  },
  {
    name: "Derek Okafor",
    company: "Swift Fulfillment Co.",
    thumbnail: null,
    placeholder: true,
  },
];

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".review-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power2.out",
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subheading">
            Real feedback from businesses running my automations in production.
          </p>
        </div>

        {/* Text Reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {textReviews.map((r) => (
            <div
              key={r.name}
              className="review-card bg-card rounded-xl border border-border p-6 card-hover relative"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                "{r.text}"
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.role}, {r.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Reviews */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">Video Testimonials</h3>
          <p className="text-sm text-muted-foreground">Hear directly from clients about their experience.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {videoReviews.map((v) => (
            <div
              key={v.name}
              className="review-card bg-card rounded-xl border border-border overflow-hidden card-hover group"
            >
              {/* Video placeholder */}
              <div className="aspect-video bg-secondary flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Play className="w-6 h-6 text-primary ml-0.5" />
                </div>
                <span className="absolute bottom-3 left-3 text-xs font-mono text-muted-foreground bg-card/80 px-2 py-1 rounded">
                  Coming Soon
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-foreground">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

import { Star, Play, Quote } from "lucide-react";

const reviews = [
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
  {
    name: "Tony Marchetti",
    role: "Owner",
    company: "Marchetti Auto Repair, Brooklyn",
    text: "I used to lose half my leads because we couldn't answer the phone fast enough. Now every inquiry gets a reply in under 10 seconds — WhatsApp, website, Facebook, doesn't matter. Bookings are up 3x.",
    stars: 5,
  },
  {
    name: "Lisa Chen",
    role: "Broker",
    company: "Chen & Associates Real Estate",
    text: "The lead follow-up system is insane. Every new lead gets qualified by AI, booked into our calendar, and our agents get a full brief before the call. We close 40% more deals now.",
    stars: 5,
  },
];

const videoReviews = [
  { name: "Tony Marchetti", company: "Marchetti Auto Repair, Brooklyn NY" },
  { name: "Lisa Chen", company: "Chen & Associates Real Estate" },
  { name: "Derek Okafor", company: "Swift Fulfillment Co." },
];

const ReviewCard = ({ r }: { r: (typeof reviews)[number] }) => (
  <div className="w-[340px] shrink-0 bg-card rounded-xl border border-border p-5 relative">
    <Quote className="w-7 h-7 text-primary/10 absolute top-4 right-4" />
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: r.stars }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{r.text}"</p>
    <div className="pt-3 border-t border-border">
      <p className="text-sm font-semibold text-foreground">{r.name}</p>
      <p className="text-xs text-muted-foreground">{r.role}, {r.company}</p>
    </div>
  </div>
);

const Reviews = () => {
  // Duplicate for seamless loop
  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4, 8);

  return (
    <section className="section-padding border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subheading">
            Real feedback from businesses running my automations in production.
          </p>
        </div>
      </div>

      {/* Row 1 - scrolls left */}
      <div className="mb-5 relative">
        <div className="flex gap-5 animate-marquee-left">
          {[...row1, ...row1, ...row1].map((r, i) => (
            <ReviewCard key={`r1-${i}`} r={r} />
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="mb-14 relative">
        <div className="flex gap-5 animate-marquee-right">
          {[...row2, ...row2, ...row2].map((r, i) => (
            <ReviewCard key={`r2-${i}`} r={r} />
          ))}
        </div>
      </div>

      {/* Video Reviews */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">Video Testimonials</h3>
          <p className="text-sm text-muted-foreground">Hear directly from clients about their experience.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {videoReviews.map((v) => (
            <div key={v.name} className="bg-card rounded-xl border border-border overflow-hidden card-hover group">
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

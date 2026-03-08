import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowDetails } from "@/data/workflowDetails";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", ...Array.from(new Set(workflowDetails.map((w) => w.category)))];

const WorkflowShowcase = () => {
  const [active, setActive] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".wf-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
      }
    );
  }, [active]);

  const filtered = active === "All" ? workflowDetails : workflowDetails.filter((w) => w.category === active);

  return (
    <section id="workflows" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">
            Workflows I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subheading">
            Real automation systems running in production for businesses across industries.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workflow grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((wf) => (
            <Link
              key={wf.slug}
              to={`/workflows/${wf.slug}`}
              className="wf-card bg-card rounded-xl border border-border p-6 card-hover group block"
            >
              {/* Category label */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono px-2 py-1 rounded font-semibold"
                  style={{ backgroundColor: wf.categoryColor + "22", color: wf.categoryColor }}
                >
                  {wf.category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{wf.nodeCount} nodes</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{wf.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{wf.description}</p>

              {/* Simplified flow */}
              <div className="flex flex-wrap items-center gap-1 mb-4">
                {wf.simplifiedFlow.split(" → ").slice(0, 4).map((node, i, arr) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground font-mono">{node}</span>
                    {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                  </span>
                ))}
                {wf.simplifiedFlow.split(" → ").length > 4 && (
                  <span className="text-xs text-muted-foreground">+{wf.simplifiedFlow.split(" → ").length - 4}</span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {wf.tools.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5">{tag}</span>
                ))}
                {wf.tools.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{wf.tools.length - 3}</span>
                )}
              </div>

              {/* Result + View link */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <p className="text-sm font-semibold gradient-text">{wf.valueMetric}</p>
                <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowShowcase;

import { useParams, Link } from "react-router-dom";
import { workflowDetails } from "@/data/workflowDetails";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useEffect } from "react";

const WorkflowDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const workflow = workflowDetails.find((w) => w.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!workflow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workflow not found</h1>
          <Link to="/#workflows" className="text-primary hover:underline">← Back to all workflows</Link>
        </div>
      </div>
    );
  }

  const currentIndex = workflowDetails.findIndex((w) => w.slug === slug);
  const prev = currentIndex > 0 ? workflowDetails[currentIndex - 1] : null;
  const next = currentIndex < workflowDetails.length - 1 ? workflowDetails[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#workflows" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">All Workflows</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="BusinessAutomate" className="h-8" />
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: workflow.categoryColor + "22", color: workflow.categoryColor }}
            >
              {workflow.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground">{workflow.nodeCount} nodes</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {workflow.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {workflow.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold gradient-text">{workflow.valueMetric}</span>
          </div>
        </div>

        {/* Screenshot */}
        <div className="mb-16 rounded-2xl border border-border overflow-hidden bg-card shadow-soft">
          <div className="bg-secondary/30 px-4 py-3 border-b border-border flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">n8n workflow editor</span>
          </div>
          <img
            src={workflow.image}
            alt={`${workflow.title} workflow screenshot`}
            className="w-full"
            loading="lazy"
          />
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {/* Left - Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Simplified Flow */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Simplified Flow</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {workflow.simplifiedFlow.split(" → ").map((step, i, arr) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="text-sm font-mono px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground">
                        {step}
                      </span>
                      {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-primary" />}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Full Workflow Steps */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Full Workflow</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                {workflow.workflowSteps.split("\n").map((line, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {line.split(" → ").map((step, j, arr) => (
                        <span key={j} className="flex items-center gap-1.5">
                          <span className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground whitespace-nowrap">
                            {step}
                          </span>
                          {j < arr.length - 1 && <span className="text-primary text-xs">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Key Features</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <ul className="space-y-3">
                  {workflow.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: workflow.categoryColor }} />
                      <span className="text-sm text-muted-foreground leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Data Flow */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Data Flow</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground leading-relaxed font-mono">{workflow.dataFlow}</p>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">
            {/* Tools */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Tools & Integrations</h3>
              <div className="flex flex-wrap gap-2">
                {workflow.tools.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Details table */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Implementation Details</h3>
              <div className="space-y-4">
                {workflow.detailsTable.map((row) => (
                  <div key={row.label}>
                    <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: workflow.categoryColor }}>
                      {row.label}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-card rounded-xl border border-primary/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Want something like this for your business?</p>
              <a
                href="https://wa.me/923061110200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>

        {/* Prev/Next navigation */}
        <div className="border-t border-border pt-10 grid grid-cols-2 gap-6">
          {prev ? (
            <Link to={`/workflows/${prev.slug}`} className="group bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
              <p className="text-xs text-muted-foreground mb-1">← Previous</p>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{prev.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{prev.category}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/workflows/${next.slug}`} className="group bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors text-right">
              <p className="text-xs text-muted-foreground mb-1">Next →</p>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{next.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{next.category}</p>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetailPage;

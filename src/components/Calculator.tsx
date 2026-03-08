import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator as CalcIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Calculator = () => {
  const [dataEntry, setDataEntry] = useState("");
  const [emailFollowups, setEmailFollowups] = useState("");
  const [reports, setReports] = useState("");
  const [result, setResult] = useState<{ weekly: number; monthly: number; yearly: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".calc-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 50, duration: 0.8, ease: "power2.out",
    });
  }, []);

  const calculate = () => {
    const weekly = (parseFloat(dataEntry) || 0) + (parseFloat(emailFollowups) || 0) + (parseFloat(reports) || 0);
    setResult({ weekly, monthly: weekly * 4.33, yearly: weekly * 52 });
  };

  const rate = 5;

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-4">
            Time Savings <span className="gradient-text">Calculator</span>
          </h2>
          <p className="section-subheading">See how much time and money automation can save your business.</p>
        </div>

        <div className="calc-card bg-card rounded-2xl border border-border p-8 md:p-12 shadow-soft">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <CalcIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Estimate Your Savings</span>
          </div>

          <div className="space-y-5">
            {[
              { label: "Hours/week on data entry", value: dataEntry, set: setDataEntry },
              { label: "Hours/week on email follow-ups", value: emailFollowups, set: setEmailFollowups },
              { label: "Hours/week on report generation", value: reports, set: setReports },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-foreground mb-2">{f.label}</label>
                <input
                  type="number"
                  min={0}
                  max={168}
                  placeholder="0"
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            ))}
            <button
              onClick={calculate}
              className="w-full py-4 gradient-bg text-primary-foreground rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              Calculate Savings
            </button>
            {result && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Weekly", hours: result.weekly.toFixed(1), money: (result.weekly * rate).toLocaleString() },
                  { label: "Monthly", hours: result.monthly.toFixed(1), money: (result.monthly * rate).toLocaleString() },
                  { label: "Yearly", hours: result.yearly.toFixed(0), money: (result.yearly * rate).toLocaleString() },
                ].map((r) => (
                  <div key={r.label} className="text-center p-5 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{r.label}</p>
                    <p className="text-2xl font-bold gradient-text mb-1">{r.hours} hrs</p>
                    <p className="text-sm text-foreground font-medium">${r.money}</p>
                  </div>
                ))}
                <p className="col-span-full text-center text-xs text-muted-foreground mt-2">Based on $5/hour value</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

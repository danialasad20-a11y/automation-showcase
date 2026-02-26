import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Calculator = () => {
  const [dataEntry, setDataEntry] = useState("");
  const [emailFollowups, setEmailFollowups] = useState("");
  const [reports, setReports] = useState("");
  const [result, setResult] = useState<{ weekly: number; monthly: number; yearly: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelector(".glass-card"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      opacity: 0, y: 50, duration: 0.8, ease: "power2.out",
    });
  }, []);

  const calculate = () => {
    const weekly = (parseFloat(dataEntry) || 0) + (parseFloat(emailFollowups) || 0) + (parseFloat(reports) || 0);
    setResult({ weekly, monthly: weekly * 4.33, yearly: weekly * 52 });
  };

  const rate = 5;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Time Reclamation Calculator</h2>
            <p className="text-muted-foreground text-sm">Discover how much time and money you're losing to manual tasks</p>
          </div>
          <div className="space-y-6">
            {[
              { label: "Hours/week on data entry:", value: dataEntry, set: setDataEntry },
              { label: "Hours/week on email follow-ups:", value: emailFollowups, set: setEmailFollowups },
              { label: "Hours/week on report generation:", value: reports, set: setReports },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm text-primary mb-2 font-mono">
                  <span className="text-muted-foreground">&gt;</span> {f.label}
                </label>
                <input
                  type="number"
                  min={0}
                  max={168}
                  placeholder="0"
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="cyber-input w-full px-4 py-3 rounded font-mono text-lg"
                />
              </div>
            ))}
            <button onClick={calculate} className="btn-cyan w-full py-4 border border-primary text-primary rounded font-mono text-sm uppercase tracking-widest mt-8">
              [ CALCULATE SAVINGS ]
            </button>
            {result && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Weekly", hours: result.weekly.toFixed(1), money: (result.weekly * rate).toLocaleString() },
                  { label: "Monthly", hours: result.monthly.toFixed(1), money: (result.monthly * rate).toLocaleString() },
                  { label: "Yearly", hours: result.yearly.toFixed(0), money: (result.yearly * rate).toLocaleString() },
                ].map((r) => (
                  <div key={r.label} className="result-card">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{r.label}</p>
                    <p className="text-2xl font-bold text-primary mb-1">{r.hours} hrs</p>
                    <p className="text-sm text-foreground">${r.money}</p>
                  </div>
                ))}
                <p className="col-span-full text-center text-xs text-muted-foreground/60 mt-2">Based on $5/hour value</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const terminalLines = [
  { text: "> ssh businessautomate@server", delay: 25 },
  { text: "> Authenticating...", delay: 20 },
  { text: "> [OK] Connection established", delay: 20 },
  { text: "> Loading 47 active workflows...", delay: 25 },
  { text: "> ██████████████████████ 100%", delay: 15 },
  { text: "> 2,340 hours reclaimed this quarter", delay: 25 },
  { text: "> System status: ALL NOMINAL", delay: 25 },
  { text: "> Rendering portfolio...", delay: 30 },
];

const HeroSection = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    gsap.fromTo(el, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" });

    let lineIdx = 0;
    let charIdx = 0;
    let current = "";

    const interval = setInterval(() => {
      if (lineIdx >= terminalLines.length) {
        clearInterval(interval);
        setShowCursor(false);

        // Glitch effect on title reveal
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 600);

        setTimeout(() => {
          gsap.to("#main-title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
          gsap.to("#hero-ctas", { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" });
          gsap.to("#scroll-indicator", { opacity: 1, duration: 1, delay: 0.8 });
        }, 300);
        return;
      }

      const line = terminalLines[lineIdx];
      if (charIdx < line.text.length) {
        current += line.text[charIdx];
        setCurrentLine(current);
        charIdx++;
      } else {
        setLines((prev) => [...prev, current]);
        setCurrentLine("");
        current = "";
        charIdx = 0;
        lineIdx++;
      }
    }, 22);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(191 100% 50%) 0%, transparent 70%)" }} />

      <div ref={terminalRef} className="mb-12 opacity-0 w-full max-w-2xl">
        <div className="relative glass-card rounded-xl overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(0, 217, 255, 0.08), 0 20px 60px rgba(0,0,0,0.5)" }}>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,255,0.1) 2px, rgba(0,217,255,0.1) 4px)",
              backgroundSize: "100% 4px",
            }} />

          {/* Top bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/10 bg-foreground/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">businessautomate@terminal:~</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[9px] text-green-400/70 uppercase tracking-wider">live</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-5 md:p-6 font-mono text-sm md:text-base space-y-1 min-h-[260px]">
            {lines.map((l, i) => (
              <div key={i} className={`${l.includes("[OK]") || l.includes("NOMINAL") ? "text-green-400/90" : l.includes("100%") ? "text-primary" : "text-primary/70"}`}>
                {l}
              </div>
            ))}
            {currentLine && (
              <div className="text-primary/70">{currentLine}</div>
            )}
            {showCursor && (
              <span
                className="inline-block w-[10px] h-[1.2em] bg-primary align-text-bottom ml-[2px]"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-5 py-2 border-t border-foreground/5 text-[9px] text-muted-foreground/40 uppercase tracking-wider">
            <span>n8n v1.94.1</span>
            <span>47 workflows active</span>
            <span>latency: 12ms</span>
          </div>
        </div>
      </div>

      <div id="main-title" className="text-center opacity-0">
        <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 ${glitchText ? "animate-glitch" : ""}`}>
          <span className="text-foreground text-glow">BUSINESS</span>
          <span className="text-primary text-glow">AUTOMATE</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide mb-10">
          I build invisible systems that save visible time
        </p>
      </div>

      <div id="hero-ctas" className="flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0">
        <a
          href="mailto:danialasad20@gmail.com"
          className="group flex items-center gap-3 px-6 py-3 border border-primary/50 rounded hover:border-primary transition-all duration-300 hover:shadow-cyan-glow"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">danialasad20@gmail.com</span>
        </a>
        <a
          href="https://wa.me/923061110200"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 border border-primary/50 rounded hover:border-primary transition-all duration-300 hover:shadow-cyan-glow"
        >
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-sm font-medium">03061110200</span>
        </a>
      </div>

      <div id="scroll-indicator" className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

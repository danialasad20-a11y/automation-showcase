import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number; radius: number; glowRadius: number; pulsePhase: number; pulseSpeed: number;
}
interface Connection { from: number; to: number; opacity: number; }
interface Packet { from: number; to: number; progress: number; speed: number; }

const tooltipTexts = [
  { text: "Shopify Order → Slack Alert: 0.3s", x: 0.2, y: 0.3 },
  { text: "Gmail → Sheets Archive: Active", x: 0.7, y: 0.2 },
  { text: "AI Response: Processing", x: 0.5, y: 0.7 },
  { text: "Invoice Gen: 2.1s", x: 0.3, y: 0.6 },
  { text: "Lead Score Updated: Real-time", x: 0.8, y: 0.5 },
];

const WorkflowVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const packetTimerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      initNodes();
    }

    function initNodes() {
      const nodes: Node[] = [];
      const connections: Connection[] = [];
      const count = Math.floor(canvas!.width / 150);

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          radius: 4 + Math.random() * 4,
          glowRadius: 15 + Math.random() * 10,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) connections.push({ from: i, to: j, opacity: 1 - d / 200 });
        }
      }

      nodesRef.current = nodes;
      connectionsRef.current = connections;
    }

    function animate(time: number) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;

      connections.forEach((c) => {
        ctx.strokeStyle = `rgba(0, 217, 255, ${c.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[c.from].x, nodes[c.from].y);
        ctx.lineTo(nodes[c.to].x, nodes[c.to].y);
        ctx.stroke();
      });

      packetTimerRef.current += 16;
      if (packetTimerRef.current > 500 && connections.length > 0) {
        const c = connections[Math.floor(Math.random() * connections.length)];
        packetsRef.current.push({ from: c.from, to: c.to, progress: 0, speed: 0.01 + Math.random() * 0.02 });
        packetTimerRef.current = 0;
      }

      packetsRef.current = packetsRef.current.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;
        const x = nodes[p.from].x + (nodes[p.to].x - nodes[p.from].x) * p.progress;
        const y = nodes[p.from].y + (nodes[p.to].y - nodes[p.from].y) * p.progress;
        ctx.fillStyle = "#00d9ff";
        ctx.shadowColor = "#00d9ff";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      nodes.forEach((node) => {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.glowRadius + pulse * 10);
        gradient.addColorStop(0, `rgba(0, 217, 255, ${0.6 * pulse})`);
        gradient.addColorStop(0.5, `rgba(0, 217, 255, ${0.2 * pulse})`);
        gradient.addColorStop(1, "rgba(0, 217, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.glowRadius + pulse * 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#00d9ff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    }

    resize();
    animId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none">
        {tooltipTexts.map((t, i) => (
          <div
            key={i}
            className="absolute glass-card px-3 py-2 rounded text-xs text-primary font-mono"
            style={{
              left: `${t.x * 100}%`,
              top: `${t.y * 100}%`,
              animation: `tooltipFloat 4s ease-in-out infinite ${i * 0.8}s`,
            }}
          >
            {t.text}
          </div>
        ))}
      </div>
      <div className="absolute top-6 left-6 z-10">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Live Workflow Visualizer</span>
      </div>
    </section>
  );
};

export default WorkflowVisualizer;

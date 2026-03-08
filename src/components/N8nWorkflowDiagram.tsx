import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// ── Parsed node data from the provided workflow JSON ──
const workflowNodes = [
  { id: "chatTrigger", label: "Chat Trigger", sub: "Webhook", x: 0, y: 300, type: "trigger" },
  { id: "infoExtract", label: "Information Extractor", sub: "OpenAI GPT-4.1", x: 200, y: 300, type: "ai" },
  { id: "madkuduBrief", label: "MadKudu Brief", sub: "Account Research", x: 420, y: 300, type: "tool" },
  { id: "generateEmail", label: "Generate Outreach", sub: "AI Agent + MCP", x: 660, y: 300, type: "ai" },
  { id: "checkExisting", label: "Check Existing", sub: "Outreach API", x: 900, y: 300, type: "http" },
  { id: "setMailbox", label: "Set Mailbox & Seq", sub: "Config", x: 900, y: 480, type: "set" },
  { id: "contactExists", label: "Contact Exists?", sub: "If / Router", x: 900, y: 620, type: "router" },
  { id: "updateProspect", label: "Update Prospect", sub: "Outreach PATCH", x: 720, y: 720, type: "http" },
  { id: "createProspect", label: "Create Prospect", sub: "Outreach POST", x: 1100, y: 720, type: "http" },
  { id: "setId1", label: "Set Contact ID", sub: "Extract", x: 720, y: 860, type: "set" },
  { id: "setId2", label: "Set Contact ID", sub: "Extract", x: 1100, y: 860, type: "set" },
  { id: "merge", label: "Merge IDs", sub: "Combine Paths", x: 900, y: 960, type: "merge" },
  { id: "submitBatch", label: "Add to Sequence", sub: "Outreach Batch", x: 900, y: 1100, type: "http" },
  { id: "wait", label: "Wait 30s", sub: "Polling", x: 900, y: 1240, type: "wait" },
  { id: "getConfirm", label: "Get Confirmation", sub: "Outreach API", x: 900, y: 1380, type: "http" },
  { id: "getConfirm2", label: "Verify Status", sub: "Outreach API", x: 900, y: 1500, type: "http" },
  { id: "ifFinished", label: "Finished?", sub: "Status Check", x: 900, y: 1620, type: "router" },
  { id: "done", label: "Done ✓", sub: "Complete", x: 720, y: 1740, type: "done" },
];

const connections: [string, string][] = [
  ["chatTrigger", "infoExtract"],
  ["infoExtract", "madkuduBrief"],
  ["madkuduBrief", "generateEmail"],
  ["generateEmail", "checkExisting"],
  ["checkExisting", "setMailbox"],
  ["setMailbox", "contactExists"],
  ["contactExists", "updateProspect"],
  ["contactExists", "createProspect"],
  ["updateProspect", "setId1"],
  ["createProspect", "setId2"],
  ["setId1", "merge"],
  ["setId2", "merge"],
  ["merge", "submitBatch"],
  ["submitBatch", "wait"],
  ["wait", "getConfirm"],
  ["getConfirm", "getConfirm2"],
  ["getConfirm2", "ifFinished"],
  ["ifFinished", "done"],
  ["ifFinished", "wait"],
];

const NODE_W = 170;
const NODE_H = 56;

const typeColors: Record<string, { bg: string; border: string; accent: string }> = {
  trigger: { bg: "hsl(142 50% 14%)", border: "hsl(142 60% 35%)", accent: "hsl(142 60% 50%)" },
  ai: { bg: "hsl(270 40% 16%)", border: "hsl(270 50% 45%)", accent: "hsl(270 60% 65%)" },
  tool: { bg: "hsl(32 50% 14%)", border: "hsl(32 60% 40%)", accent: "hsl(32 70% 55%)" },
  http: { bg: "hsl(200 40% 14%)", border: "hsl(200 50% 40%)", accent: "hsl(200 60% 55%)" },
  router: { bg: "hsl(45 50% 14%)", border: "hsl(45 60% 40%)", accent: "hsl(45 70% 55%)" },
  set: { bg: "hsl(0 0% 14%)", border: "hsl(0 0% 30%)", accent: "hsl(0 0% 55%)" },
  merge: { bg: "hsl(180 30% 14%)", border: "hsl(180 40% 35%)", accent: "hsl(180 50% 50%)" },
  wait: { bg: "hsl(8 40% 14%)", border: "hsl(8 50% 40%)", accent: "hsl(8 60% 55%)" },
  done: { bg: "hsl(142 50% 14%)", border: "hsl(142 60% 40%)", accent: "hsl(142 70% 55%)" },
};

const typeIcons: Record<string, string> = {
  trigger: "⚡", ai: "🤖", tool: "🔧", http: "🌐",
  router: "🔀", set: "📝", merge: "🔗", wait: "⏳", done: "✅",
};

interface Packet {
  fromId: string;
  toId: string;
  progress: number;
  id: number;
}

let packetCounter = 0;

const N8nWorkflowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.55);
  const [dragging, setDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const [packets, setPackets] = useState<Packet[]>([]);

  // Center the diagram initially
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width * 0.1, y: -rect.height * 0.05 });
    }
  }, []);

  // Animate packets
  useEffect(() => {
    let animFrame: number;
    const spawnInterval = setInterval(() => {
      setPackets(prev => {
        const newPackets = [...prev];
        // Spawn from trigger
        const startConn = connections[Math.floor(Math.random() * Math.min(5, connections.length))];
        newPackets.push({
          fromId: startConn[0],
          toId: startConn[1],
          progress: 0,
          id: packetCounter++,
        });
        return newPackets.slice(-12); // max 12 packets
      });
    }, 800);

    const tick = () => {
      setPackets(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + 0.018 }))
          .filter(p => p.progress <= 1)
      );
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const nodeMap = useMemo(() => {
    const m: Record<string, typeof workflowNodes[0]> = {};
    workflowNodes.forEach(n => (m[n.id] = n));
    return m;
  }, []);

  const getNodeCenter = useCallback(
    (id: string) => {
      const n = nodeMap[id];
      return n ? { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 } : { x: 0, y: 0 };
    },
    [nodeMap]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".wf-node")) return;
    setDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
  };
  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setScale(s => Math.min(1.5, Math.max(0.25, s * delta)));
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
  };
  const handleTouchEnd = () => setDragging(false);

  const buildPath = (fromId: string, toId: string) => {
    const from = getNodeCenter(fromId);
    const to = getNodeCenter(toId);
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    // Straight-ish bezier
    if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical dominant
      const cy1 = from.y + dy * 0.4;
      const cy2 = from.y + dy * 0.6;
      return `M${from.x},${from.y} C${from.x},${cy1} ${to.x},${cy2} ${to.x},${to.y}`;
    } else {
      const cx1 = from.x + dx * 0.4;
      const cx2 = from.x + dx * 0.6;
      return `M${from.x},${from.y} C${cx1},${from.y} ${cx2},${to.y} ${to.x},${to.y}`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl border border-border bg-card/30 overflow-hidden relative select-none"
      style={{ cursor: dragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
        <button
          onClick={() => setScale(s => Math.min(1.5, s * 1.2))}
          className="w-7 h-7 rounded bg-secondary/80 border border-border text-foreground text-xs font-bold hover:bg-secondary transition-colors flex items-center justify-center"
        >+</button>
        <button
          onClick={() => setScale(s => Math.max(0.25, s * 0.8))}
          className="w-7 h-7 rounded bg-secondary/80 border border-border text-foreground text-xs font-bold hover:bg-secondary transition-colors flex items-center justify-center"
        >−</button>
        <button
          onClick={() => { setScale(0.55); setPan({ x: containerRef.current ? containerRef.current.getBoundingClientRect().width * 0.1 : 0, y: 0 }); }}
          className="w-7 h-7 rounded bg-secondary/80 border border-border text-muted-foreground text-[9px] font-bold hover:bg-secondary transition-colors flex items-center justify-center"
          title="Reset view"
        >⟳</button>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Live Workflow</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      </div>

      {/* SVG layer for connections + packets */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "0 0" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(([from, to], i) => {
          const isHighlighted = hoveredNode === from || hoveredNode === to;
          return (
            <path
              key={i}
              d={buildPath(from, to)}
              fill="none"
              stroke={isHighlighted ? "hsl(8, 85%, 62%)" : "hsl(0, 0%, 28%)"}
              strokeWidth={isHighlighted ? 2.5 : 1.5}
              strokeDasharray={isHighlighted ? "none" : "none"}
              opacity={hoveredNode && !isHighlighted ? 0.2 : 0.7}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}

        {/* Animated packets */}
        {packets.map(pkt => {
          const from = getNodeCenter(pkt.fromId);
          const to = getNodeCenter(pkt.toId);
          const t = pkt.progress;
          // Simple linear interpolation along bezier approximation
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t;
          const colors = typeColors[nodeMap[pkt.toId]?.type || "http"];
          return (
            <circle
              key={pkt.id}
              cx={x}
              cy={y}
              r={4}
              fill={colors.accent}
              filter="url(#glow)"
              opacity={1 - t * 0.5}
            />
          );
        })}
      </svg>

      {/* Nodes layer */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "0 0" }}
      >
        {workflowNodes.map(node => {
          const colors = typeColors[node.type] || typeColors.http;
          const isHovered = hoveredNode === node.id;
          const isDimmed = hoveredNode !== null && !isHovered && !connections.some(
            ([f, t]) => (f === hoveredNode && t === node.id) || (t === hoveredNode && f === node.id)
          );

          return (
            <div
              key={node.id}
              className="wf-node absolute rounded-xl flex items-center gap-2.5 px-3 transition-all duration-300"
              style={{
                left: node.x,
                top: node.y,
                width: NODE_W,
                height: NODE_H,
                background: colors.bg,
                border: `1.5px solid ${isHovered ? colors.accent : colors.border}`,
                boxShadow: isHovered
                  ? `0 0 20px ${colors.accent}40, 0 4px 12px rgba(0,0,0,0.4)`
                  : "0 2px 8px rgba(0,0,0,0.3)",
                opacity: isDimmed ? 0.3 : 1,
                cursor: "pointer",
                zIndex: isHovered ? 10 : 1,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <span className="text-base flex-shrink-0">{typeIcons[node.type]}</span>
              <div className="min-w-0 overflow-hidden">
                <p className="text-[11px] font-semibold truncate" style={{ color: colors.accent }}>
                  {node.label}
                </p>
                <p className="text-[9px] truncate" style={{ color: "hsl(0 0% 55%)" }}>
                  {node.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default N8nWorkflowDiagram;

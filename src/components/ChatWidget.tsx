import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WEBHOOK_URL = "https://n8n.businessautomate.online/webhook/880772e9-5958-41d0-b64e-cdff38f6f44a";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat-widget", handler);
    return () => window.removeEventListener("open-chat-widget", handler);
  }, []);

  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ id: "greeting", text: "Hi, I'm Danial. How can I help you today!", sender: "bot" }]);
      setGreeted(true);
    }
  }, [open, greeted]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || typing) return;
    const userMsg: Message = { id: crypto.randomUUID(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text, sessionId: sessionId.current }),
      });
      const data = await res.json();
      const reply = typeof data === "string" ? data : data?.output || data?.text || data?.message || JSON.stringify(data);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: reply, sender: "bot" }]);
    } catch {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: "Sorry, something went wrong. Please try again.", sender: "bot" }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[380px] h-[520px] bg-card rounded-2xl border border-border shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 flex flex-col">
          {/* Header */}
          <div className="gradient-bg flex items-center justify-between px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="BusinessAutomate" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-primary-foreground">Danial</p>
                <p className="text-xs text-primary-foreground/70">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center hover:shadow-glow transition-all disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </button>
    </div>
  );
};

export default ChatWidget;

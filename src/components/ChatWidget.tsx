import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const CHAT_URL = "https://n8n.businessautomate.online/webhook/ae0e4c69-bba2-419b-aa92-0ed5c3ced701/chat";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[380px] h-[520px] bg-card rounded-2xl border border-border shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="gradient-bg flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="BusinessAutomate" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-primary-foreground">BusinessAutomate</p>
                <p className="text-xs text-primary-foreground/70">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <iframe
            src={CHAT_URL}
            className="w-full h-[calc(100%-64px)] border-0"
            title="Chat with BusinessAutomate AI"
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
        aria-label="Open chat"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;

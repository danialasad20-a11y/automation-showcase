const Footer = () => (
  <footer className="py-12 px-4 border-t border-foreground/5">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-xs text-muted-foreground/50 mb-6">Built with automation. Powered by n8n.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="mailto:danialasad20@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
          danialasad20@gmail.com
        </a>
        <span className="hidden sm:block text-muted-foreground/30">|</span>
        <a href="https://wa.me/03165590580" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
          WhatsApp: 03165590580
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

import { Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="BusinessAutomate" className="w-14 h-14 rounded-full" />
          <span className="font-semibold text-lg text-foreground">BusinessAutomate</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <a href="mailto:danialasad20@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" /> danialasad20@gmail.com
          </a>
          <a href="https://wa.me/923061110200" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/in/danial-asad-203/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.facebook.com/danial.asad.747358" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.upwork.com/freelancers/~01429ee0680f9c8056?mp_source=share" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Upwork">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.795-3.057 2.838-3.057 1.513 0 2.738 1.227 2.738 2.738 0 1.513-1.228 2.664-2.738 2.664zm0-8.14c-2.447 0-4.486 1.596-5.25 4.016C11.987 7.018 10.824 5.2 10.086 3.2H6.949v7.104c0 1.333-1.12 2.447-2.453 2.447s-2.453-1.114-2.453-2.447V3.2H-1v7.104c0 2.932 2.408 5.396 5.396 5.396s5.396-2.464 5.396-5.396V8.94c.688 1.432 1.552 2.868 2.592 4.08L10.78 20.8h3.143l1.2-5.664c1.088.736 2.34 1.164 3.438 1.164 3.088 0 5.596-2.508 5.596-5.596S21.649 5.018 18.561 5.018z"/></svg>
          </a>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BusinessAutomate. Built with automation. Powered by n8n.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

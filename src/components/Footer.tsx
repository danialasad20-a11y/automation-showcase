import { Mail, Phone, Calendar, ArrowUpRight, MessageCircle } from "lucide-react";

const contactLinks: { name: string; href: string; icon: React.ReactNode; description: string; isChat?: boolean }[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/923061110200",
    icon: <Phone className="w-6 h-6" />,
    description: "Chat on WhatsApp",
  },
  {
    name: "Email",
    href: "mailto:danialasad20@gmail.com",
    icon: <Mail className="w-6 h-6" />,
    description: "danialasad20@gmail.com",
  },
  {
    name: "Calendly",
    href: "https://calendly.com/danialasad20/30min",
    icon: <Calendar className="w-6 h-6" />,
    description: "Book a 30-min call",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/danial-asad-203/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    description: "Connect on LinkedIn",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/danial.asad.747358",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    description: "Follow on Facebook",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~01429ee0680f9c8056?mp_source=share",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.795-3.057 2.838-3.057 1.513 0 2.738 1.227 2.738 2.738 0 1.513-1.228 2.664-2.738 2.664zm0-8.14c-2.447 0-4.486 1.596-5.25 4.016C11.987 7.018 10.824 5.2 10.086 3.2H6.949v7.104c0 1.333-1.12 2.447-2.453 2.447s-2.453-1.114-2.453-2.447V3.2H-1v7.104c0 2.932 2.408 5.396 5.396 5.396s5.396-2.464 5.396-5.396V8.94c.688 1.432 1.552 2.868 2.592 4.08L10.78 20.8h3.143l1.2-5.664c1.088.736 2.34 1.164 3.438 1.164 3.088 0 5.596-2.508 5.596-5.596S21.649 5.018 18.561 5.018z" />
      </svg>
    ),
    description: "Hire on Upwork",
  },
  {
    name: "Fiverr",
    href: "http://www.fiverr.com/s/AyagwRQ",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61V11.89h1.61v.74a1.47 1.47 0 0 1 1.376-.74c.71 0 1.201.36 1.418.93.353-.6.87-.93 1.534-.93h.014v1.99h-.518zm-7.822 3.705a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-1.822-1.479c0-1.276-.75-2.392-2.196-2.392-1.378 0-2.262 1.07-2.262 2.392 0 1.39.93 2.392 2.348 2.392.89 0 1.54-.397 1.904-1.042l-1.1-.635c-.16.3-.44.487-.804.487-.536 0-.845-.394-.893-.803h2.98c.014-.133.023-.263.023-.4zm-2.196-1.238c.44 0 .742.3.793.736h-1.634c.074-.42.392-.736.841-.736zm-4.157-1.078c-.6 0-1.04.26-1.296.63v-.49H3.105v5.558h1.61v-2.92c0-.63.27-1.007.81-1.007.47 0 .736.317.736.9v3.027h1.61v-3.558c0-1.136-.65-2.14-1.83-2.14zm-6.14 0c-1.412 0-2.437 1.07-2.437 2.438 0 1.378 1.025 2.438 2.438 2.438.73 0 1.37-.32 1.812-.87l-.87-.87c-.24.28-.53.43-.87.43-.63 0-1.09-.47-1.09-1.13 0-.66.46-1.13 1.09-1.13.35 0 .64.16.88.44l.86-.87c-.43-.55-1.07-.876-1.813-.876z" />
      </svg>
    ),
    description: "Hire on Fiverr",
  },
  {
    name: "Live Chat",
    href: "#live-chat",
    icon: <MessageCircle className="w-6 h-6" />,
    description: "Chat with our AI assistant",
    isChat: true,
  },
];

const Footer = () => (
  <footer id="contact" className="border-t border-border bg-card/50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Ready to automate? Reach out through any channel — I respond fast.
        </p>
      </div>

      {/* All contact cards in uniform grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
        {contactLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-background hover:border-primary/40 hover:shadow-glow transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <span className="font-semibold text-foreground">{link.name}</span>
            <span className="text-xs text-muted-foreground text-center">{link.description}</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="BusinessAutomate" className="w-10 h-10 rounded-full" />
          <span className="font-semibold text-foreground">BusinessAutomate</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BusinessAutomate. Built with automation. Powered by n8n.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

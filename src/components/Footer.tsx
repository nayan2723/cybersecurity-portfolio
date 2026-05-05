const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold terminal-text mb-4">
              nayan<span className="text-primary">.</span>sec
            </div>
            <p className="text-foreground/70">
              Breaking things to see how they work, building things to make them secure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-foreground/70 hover:text-primary transition-colors">
                About
              </a>
              <a href="#skills" className="block text-foreground/70 hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#projects" className="block text-foreground/70 hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="block text-foreground/70 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Get In Touch</h4>
            <div className="space-y-2 text-foreground/70">
              <p>📧 nayan2723.k@gmail.com</p>
              <p>📍 New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © 2026 Nayan Kshitij. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm mt-2 md:mt-0">
            Built with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
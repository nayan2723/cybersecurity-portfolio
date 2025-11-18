import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Github, Linkedin, Mail, Heart, Code, Terminal } from 'lucide-react';
import ResumeButton from '@/components/ui/resume-button';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Add terminal cursor blink animation
    const cursor = document.querySelector('.terminal-cursor');
    if (cursor) {
      setInterval(() => {
        cursor.classList.toggle('opacity-0');
      }, 500);
    }
  }, []);

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/nayan2723",
      label: "GitHub",
      hoverColor: "hover:text-cyber-green"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/nayan-kshitij",
      label: "LinkedIn",
      hoverColor: "hover:text-cyber-blue"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:nayankshitij128@gmail.com",
      label: "Email",
      hoverColor: "hover:text-neon-pink"
    }
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-green rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left: Branding */}
          <motion.div 
            className="space-y-4"
            data-aos="fade-right"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="p-2 rounded-lg cyber-card"
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(0, 255, 65, 0)",
                    "0 0 20px rgba(0, 255, 65, 0.3)",
                    "0 0 0 rgba(0, 255, 65, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Terminal className="w-5 h-5 text-cyber-green" />
              </motion.div>
              <span className="text-lg font-bold font-mono">
                <span className="text-cyber-green">$</span> Nayan Kshitij
              </span>
            </div>
            <p className="text-foreground/70 text-sm animate__animated animate__fadeInLeft">
              Building secure digital solutions with passion for cybersecurity and innovative development.
            </p>
            <div className="terminal-text text-primary font-mono text-sm flex items-center">
              <span className="text-cyber-green">$</span>
              <span className="ml-2">status: online</span>
              <span className="ml-2 terminal-cursor">|</span>
            </div>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div 
            className="space-y-4"
            data-aos="fade-up"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-primary animate__animated animate__fadeInDown">
              Quick Links
            </h3>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-foreground/70 hover:text-primary transition-colors text-sm magictime slideRight"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="text-cyber-green mr-2">&gt;</span>
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Collaboration CTA & Contact */}
          <motion.div 
            className="space-y-4"
            data-aos="fade-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Collaboration CTA */}
            <motion.div 
              className="cyber-card p-4 bg-gradient-to-br from-primary/10 to-cyber-blue/10 border-primary/30"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 25px rgba(0, 255, 65, 0.2)"
              }}
            >
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Ready to Collaborate?
              </h3>
              <p className="text-sm text-foreground/80 mb-3">
                Want to build something <span className="text-cyber-green font-semibold">secure</span> and <span className="text-cyber-blue font-semibold">innovative</span>? 
                Let's turn ideas into bulletproof code.
              </p>
              <motion.a
                href="mailto:nayankshitij128@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cyber-green transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4" />
                Shoot me an email →
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground/70 mb-3">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 cyber-card ${social.hoverColor} transition-all duration-300 animate__animated animate__zoomIn`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status & Resume */}
            <div className="space-y-3">
              <div className="text-sm text-foreground/60 space-y-1">
                <div className="flex items-center gap-2 animate__animated animate__fadeInUp">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                  <span>Available for security projects</span>
                </div>
                <div className="flex items-center gap-2 animate__animated animate__fadeInUp animate__delay-1s">
                  <Terminal className="w-4 h-4 text-cyber-green" />
                  <span>Breaking & building systems daily</span>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <ResumeButton 
                  variant="outline" 
                  size="sm"
                  text="Download Resume"
                  className="w-full border-primary/30 hover:border-primary hover:bg-primary/10"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-center items-center gap-4"
          data-aos="fade-up"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-sm text-foreground/60 animate__animated animate__fadeIn">
            <span>© {currentYear} Nayan Kshitij. All rights reserved.</span>
          </div>
        </motion.div>

        {/* Matrix rain effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyber-green font-mono text-xs"
              style={{ left: `${i * 10}%` }}
              animate={{
                y: ['-100%', '200%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            >
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
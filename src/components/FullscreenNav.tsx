import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Code, 
  Shield, 
  Mail, 
  FileText,
  Github,
  Linkedin,
  Download
} from 'lucide-react';

const FullscreenNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Home', icon: Home, href: '#home' },
    { label: 'About', icon: User, href: '#about' },
    { label: 'Projects', icon: Code, href: '#curated-projects' },
    { label: 'Skills', icon: Shield, href: '#skills-chart' },
    { label: 'Blog', icon: FileText, href: '#blog' },
    { label: 'Contact', icon: Mail, href: '#contact' },
  ];

  const socialLinks = [
    { label: 'GitHub', icon: Github, href: '#' },
    { label: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            Alex Chen
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </Button>
        </div>
      </motion.nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Animated cursor effect */}
            <motion.div
              className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none mix-blend-difference"
              style={{
                left: mousePosition.x - 8,
                top: mousePosition.y - 8,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="flex flex-col justify-center items-center h-full relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-cyber-green rounded-full animate-ping"></div>
                <div className="absolute bottom-32 left-40 w-1 h-1 bg-cyber-blue rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-neon-pink rounded-full animate-ping"></div>
              </div>

              {/* Main Navigation */}
              <div className="flex-1 flex flex-col justify-center">
                <nav className="space-y-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="group"
                    >
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="flex items-center gap-6 text-4xl md:text-6xl font-bold text-foreground/80 hover:text-primary transition-all duration-300 group-hover:translate-x-4"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="w-8 h-8 md:w-12 md:h-12" />
                        </motion.div>
                        <span className="relative">
                          {item.label}
                          <motion.div
                            className="absolute bottom-0 left-0 w-0 h-1 bg-primary"
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                      </button>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer Section */}
              <motion.div
                className="space-y-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {/* Social Links */}
                <div className="flex justify-center gap-8">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="p-4 rounded-full bg-muted/20 hover:bg-primary/20 transition-colors group"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>

                {/* Download Button */}
                <Button variant="primary" size="lg" className="group">
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </Button>

                {/* Contact Info */}
                <p className="text-foreground/60">
                  alex@example.com • Available for freelance
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FullscreenNav;
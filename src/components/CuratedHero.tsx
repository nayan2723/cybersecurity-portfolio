import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { LottieGlow } from '@/components/LottieAnimations';

const CuratedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // GSAP animations for hero elements
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.from('.hero-avatar', {
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    })
    .from('.hero-badge', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.5')
    .from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.3')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.3');

    // Typewriter effect
    const typewriter = typewriterRef.current;
    if (typewriter) {
      const text = "I craft digital experiences that make an impact.";
      let index = 0;
      
      const typeWriterInterval = setInterval(() => {
        if (index < text.length) {
          typewriter.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(typeWriterInterval);
        }
      }, 50);

      return () => clearInterval(typeWriterInterval);
    }
  }, []);

  const scrollToProjects = () => {
    document.getElementById('curated-projects')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyber-blue/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-neon-pink/5 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Status Badges */}
        <motion.div 
          className="flex justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="success" className="hero-badge">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            Available for work
          </Badge>
          <Badge variant="neon" className="hero-badge">
            <LottieGlow size={16} className="mr-1" />
            Cybersecurity Expert
          </Badge>
        </motion.div>

        {/* Profile Avatar */}
        <motion.div 
          className="relative mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="hero-avatar w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-cyber-gradient rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
              <div className="text-6xl">🛡️</div>
            </div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div 
          className="hero-title mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Alex <span className="text-primary">Chen</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 font-light mb-6">
            Cybersecurity Engineer & Full-Stack Developer
          </h2>
        </motion.div>

        {/* Typewriter Tagline */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xl md:text-2xl text-primary/80 font-mono">
            <span ref={typewriterRef}></span>
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">25+</div>
            <div className="text-sm text-foreground/60">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-green">100+</div>
            <div className="text-sm text-foreground/60">Audits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-blue">5</div>
            <div className="text-sm text-foreground/60">Years Exp</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <Button 
            size="lg" 
            variant="primary" 
            className="hero-cta group"
            onClick={scrollToProjects}
          >
            View My Work
            <ArrowDown className="w-4 h-4 ml-2 group-hover:animate-bounce" />
          </Button>
          <Button size="lg" variant="outline" className="hero-cta">
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "mailto:alex@example.com", label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="hero-cta p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default CuratedHero;
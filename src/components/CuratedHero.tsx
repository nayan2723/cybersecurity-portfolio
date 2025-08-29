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
      const text = "Breaking systems and building them again.";
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
           <div className="hero-avatar w-32 h-32 mx-auto relative" role="img" aria-label="Cybersecurity shield avatar">
             <div className="absolute inset-0 bg-cyber-gradient rounded-full animate-spin-slow"></div>
             <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
               <div className="text-6xl" aria-hidden="true">🛡️</div>
             </div>
           </div>
        </motion.div>

        {/* Main Title */}
        <motion.div 
          className="hero-title mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotateY: [0, 5, -5, 0],
            scale: [1, 1.02, 1, 1.02, 1]
          }}
          transition={{ 
            delay: 0.8,
            rotateY: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Nayan <span className="text-primary animate-pulse">Kshitij</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 font-light mb-6">
            Cybersecurity Student & Full-Stack Developer
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

        {/* Animated Coding Scene */}
        <motion.div 
          className="relative max-w-lg mx-auto mb-12 p-6 bg-muted/20 rounded-xl border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="relative">
            {/* Room Setup */}
            <div className="bg-gradient-to-b from-background/50 to-muted/30 rounded-lg p-4 relative overflow-hidden">
              {/* Desk */}
              <div className="h-4 bg-gradient-to-r from-muted to-muted/60 rounded-sm mb-2"></div>
              
              {/* Monitor with code */}
              <div className="relative bg-background border-2 border-primary/30 rounded-sm p-3 mb-4">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex">
                    <span className="text-cyber-green animate-pulse">$</span>
                    <span className="text-primary ml-1 animate-pulse">nmap -sS target.com</span>
                  </div>
                  <div className="flex">
                    <span className="text-cyber-blue">console.log(</span>
                    <span className="text-cyber-pink animate-pulse">"hacking..."</span>
                    <span className="text-cyber-blue">)</span>
                  </div>
                  <div className="text-cyber-green animate-pulse">// Breaking systems...</div>
                </div>
              </div>
              
              {/* Animated Person */}
              <div className="relative">
                <div className="text-2xl animate-bounce">🧑‍💻</div>
                
                {/* Coffee cup with steam */}
                <div className="absolute -right-2 top-0">
                  <div className="text-lg">☕</div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-3 opacity-60 animate-pulse">💨</div>
                  </div>
                </div>
                
                {/* Floating code particles */}
                <div className="absolute -top-4 left-4 text-xs text-primary/60 animate-pulse">{`{}`}</div>
                <div className="absolute -top-2 right-2 text-xs text-cyber-green/60 animate-pulse delay-500">[]</div>
                <div className="absolute top-2 -left-2 text-xs text-cyber-blue/60 animate-pulse delay-1000">()</div>
              </div>
              
              {/* Room lighting effects */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyber-green/20 rounded-full animate-pulse delay-700"></div>
            </div>
            
            {/* Status text */}
            <div className="text-center mt-3">
              <div className="text-sm text-foreground/60 font-mono">
                Status: <span className="text-primary animate-pulse">Coding Tirelessly</span>
              </div>
            </div>
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
          <Button 
            size="lg" 
            variant="outline" 
            className="hero-cta"
            onClick={() => window.open('/Nayan_resume_final.pdf', '_blank')}
          >
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
            { icon: Github, href: "https://github.com/nayankumar-cybersec", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/nayan-kshitij", label: "LinkedIn" },
            { icon: Mail, href: "mailto:nayankshitij128@gmail.com", label: "Email" }
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
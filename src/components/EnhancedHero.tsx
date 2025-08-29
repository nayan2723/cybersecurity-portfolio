import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, Terminal, Shield, Code } from 'lucide-react';

const EnhancedHero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const glitchRef = useRef(null);
  
  const roles = [
    'Cybersecurity Enthusiast',
    'Ethical Hacker', 
    'Security Researcher',
    'Full Stack Developer',
    'Penetration Tester'
  ];

  useEffect(() => {
    const fullText = `${roles[currentRole]} || CSE Student @ Bennett University`;
    let index = 0;
    
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setDisplayText('');
        }, 2000);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [currentRole]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation timeline
      const tl = gsap.timeline();
      
      tl.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(profileRef.current,
        { opacity: 0, scale: 0.8, rotateY: 15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "back.out(1.7)" },
        "-=0.5"
      );

      // Continuous floating animation for profile
      gsap.to(profileRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Glitch effect on name
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      glitchTl.to(glitchRef.current, {
        x: 2,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        x: -2,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        x: 0,
        duration: 0.1,
        ease: "power2.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 particle-bg">
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
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Cyber grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="border-r border-cyber-green"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1, duration: 1 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={heroRef} className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Enhanced text content */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <motion.span 
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-3 h-3" />
                Available for hire
              </motion.span>
              <motion.span 
                className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="w-3 h-3" />
                Open to Internships
              </motion.span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm{' '}
              <span 
                ref={glitchRef}
                className="text-primary glitch-effect inline-block relative"
                data-text="Nayan"
              >
                <motion.span
                  initial={{ rotateY: -15 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.8, ease: "back.out(1.7)" }}
                >
                  Nayan
                </motion.span>
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl text-foreground/80 terminal-text min-h-[3rem] flex items-center">
              <Terminal className="w-5 h-5 mr-2 text-cyber-green" />
              <span className="text-cyber-green mr-2">$</span>
              {displayText}
              <motion.span 
                className="ml-1 text-cyber-green"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-foreground/70 leading-relaxed max-w-xl"
          >
            Penetrating digital defenses with precision, crafting secure solutions with passion, 
            and building a safer cyber landscape — one vulnerability assessment at a time. 
            Welcome to my digital fortress.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={scrollToContact}
                className="cyber-button group"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Initiate Contact
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground group"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Access Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6 pt-4"
          >
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/nayan-kshitij", color: "hover:text-cyber-blue" },
              { icon: Github, href: "https://github.com/nayankumar-cybersec", color: "hover:text-cyber-green" }
            ].map(({ icon: Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-foreground/60 ${color} transition-colors p-2 hover:bg-primary/10 rounded-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Enhanced profile with 3D effects */}
        <div className="flex justify-center lg:justify-end">
          <motion.div 
            ref={profileRef}
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "back.out(1.7)" }}
          >
            <motion.div 
              className="w-80 h-96 rounded-2xl overflow-hidden cyber-card relative group"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://i.ibb.co/LhYB87c6/Urban-Stillness-Amidst-Evening-Rush.png"
                alt="Nayan Kshitij - Cybersecurity enthusiast and computer science student"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Cyber overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-green/30 to-transparent h-8"
                animate={{ y: [0, 384, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Enhanced glow effects */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-green rounded-2xl blur opacity-30"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyber-green" />
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyber-green" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyber-green" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyber-green" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
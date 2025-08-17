import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Shield, 
  Code, 
  Database, 
  Globe, 
  Terminal, 
  Lock,
  Search,
  Bug,
  Server,
  Cloud,
  ChevronRight
} from 'lucide-react';

const EnhancedSkills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skillCategories = [
    {
      title: "Cybersecurity",
      icon: <Shield className="w-6 h-6" />,
      color: "cyber-green",
      skills: [
        { name: "Penetration Testing", level: 85 },
        { name: "Vulnerability Assessment", level: 90 },
        { name: "Network Security", level: 80 },
        { name: "Web Application Security", level: 95 },
        { name: "Digital Forensics", level: 75 },
        { name: "Threat Intelligence", level: 70 }
      ]
    },
    {
      title: "Development",
      icon: <Code className="w-6 h-6" />,
      color: "cyber-blue",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "TypeScript", level: 70 },
        { name: "Go", level: 65 }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: <Terminal className="w-6 h-6" />,
      color: "neon-pink",
      skills: [
        { name: "Burp Suite", level: 95 },
        { name: "Metasploit", level: 85 },
        { name: "Nmap", level: 90 },
        { name: "Wireshark", level: 80 },
        { name: "Docker", level: 75 },
        { name: "Linux", level: 90 }
      ]
    }
  ];

  useEffect(() => {
    if (isInView) {
      progressRefs.current.forEach((ref, index) => {
        if (ref) {
          const skillIndex = Math.floor(index / skillCategories.length);
          const categoryIndex = index % skillCategories.length;
          const skill = skillCategories[categoryIndex]?.skills[skillIndex];
          
          if (skill) {
            gsap.fromTo(ref, 
              { width: '0%' },
              { 
                width: `${skill.level}%`,
                duration: 1.5,
                delay: index * 0.1,
                ease: "power2.out"
              }
            );
          }
        }
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section className="py-20 px-6 bg-muted/20 relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyber-green font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
            animate={{
              y: [0, window.innerHeight + 20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            TECHNICAL <span className="text-primary animate-hologram">ARSENAL</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Mastering the art of digital warfare through continuous learning and hands-on experience. 
            Each skill represents countless hours of dedication to securing the digital frontier.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="cyber-card group hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className={`p-3 rounded-lg bg-${category.color}/20 text-${category.color} group-hover:animate-cyberpulse`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const progressIndex = skillIndex * skillCategories.length + categoryIndex;
                    return (
                      <motion.div
                        key={skill.name}
                        className="group/skill"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-foreground/80 group-hover/skill:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-foreground/60">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            ref={(el) => progressRefs.current[progressIndex] = el}
                            className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/60 rounded-full relative`}
                            style={{ width: '0%' }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div 
                  className="mt-6 pt-4 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center text-sm text-foreground/60 group-hover:text-primary transition-colors">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Continuously expanding expertise
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating certification badges */}
        <motion.div 
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { name: "CEH", desc: "Certified Ethical Hacker", icon: <Bug className="w-5 h-5" /> },
            { name: "CISSP", desc: "Security Professional", icon: <Lock className="w-5 h-5" /> },
            { name: "OSCP", desc: "Penetration Testing", icon: <Search className="w-5 h-5" /> },
            { name: "AWS", desc: "Cloud Security", icon: <Cloud className="w-5 h-5" /> }
          ].map((cert, index) => (
            <motion.div
              key={cert.name}
              className="cyber-card p-4 text-center group hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
              animate={{ 
                y: [0, -2, 0],
                transition: { 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }
              }}
            >
              <div className="text-primary mb-2 group-hover:animate-pulse">
                {cert.icon}
              </div>
              <h4 className="font-bold text-lg">{cert.name}</h4>
              <p className="text-xs text-foreground/60">{cert.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedSkills;
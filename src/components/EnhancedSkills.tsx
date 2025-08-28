import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
              y: [0, 800],
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
                    className={`p-3 rounded-lg group-hover:animate-cyberpulse ${
                      category.color === 'cyber-green' ? 'bg-cyber-green/20 text-cyber-green' :
                      category.color === 'cyber-blue' ? 'bg-cyber-blue/20 text-cyber-blue' :
                      'bg-cyber-pink/20 text-cyber-pink'
                    }`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group/skill"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-sm font-medium text-foreground/80 group-hover/skill:text-primary transition-colors block py-2 px-3 rounded-lg hover:bg-muted/50">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
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

        {/* Certifications To Do */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Certifications <span className="text-primary">To Conquer</span></h3>
            <p className="text-sm text-foreground/60">Next goals on my cybersecurity journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { name: "CEH", fullName: "Certified Ethical Hacker", icon: <Bug className="w-5 h-5" /> },
              { name: "OSCP", fullName: "Offensive Security Certified Professional", icon: <Search className="w-5 h-5" /> },
              { name: "CISSP", fullName: "Certified Information Systems Security Professional", icon: <Lock className="w-5 h-5" /> },
              { name: "Security+", fullName: "CompTIA Security+", icon: <Shield className="w-5 h-5" /> },
              { name: "CISM", fullName: "Certified Information Security Manager", icon: <Server className="w-5 h-5" /> },
              { name: "GSEC", fullName: "GIAC Security Essentials", icon: <Terminal className="w-5 h-5" /> }
            ].map((cert, index) => (
              <motion.div
                key={cert.name}
                className="cyber-card p-4 text-center relative group hover:scale-105 transition-all duration-300 opacity-75"
                whileHover={{ y: -2 }}
              >
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-foreground/30" />
                </div>
                <div className="text-foreground/50 mb-2 group-hover:text-primary transition-colors">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-foreground/40 leading-tight">{cert.fullName}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedSkills;
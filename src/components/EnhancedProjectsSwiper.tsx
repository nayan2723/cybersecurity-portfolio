import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Shield, Code, Database, Lock } from 'lucide-react';
import { LottieGlow, LottiePulse } from '@/components/LottieAnimations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const EnhancedProjectsSwiper = () => {
  const projects = [
    {
      id: 1,
      title: "CyberShield Security Suite",
      description: "Advanced penetration testing framework with automated vulnerability scanning and real-time threat detection.",
      image: "🛡️",
      tags: ["Python", "React", "PostgreSQL", "Docker"],
      category: "Security",
      icon: <Shield className="w-6 h-6" />,
      status: "Active",
      features: ["Automated Scanning", "Real-time Alerts", "Custom Reports"]
    },
    {
      id: 2,
      title: "Neural Network Intrusion Detection",
      description: "AI-powered system that learns network patterns to detect sophisticated cyber attacks and anomalies.",
      image: "🧠",
      tags: ["TensorFlow", "Python", "Kafka", "Elasticsearch"],
      category: "AI Security",
      icon: <Code className="w-6 h-6" />,
      status: "In Development", 
      features: ["Machine Learning", "Pattern Recognition", "Anomaly Detection"]
    },
    {
      id: 3,
      title: "Blockchain Security Auditor",
      description: "Smart contract vulnerability scanner with formal verification capabilities for DeFi protocols.",
      image: "⛓️",
      tags: ["Solidity", "Node.js", "Web3", "Hardhat"],
      category: "Blockchain",
      icon: <Lock className="w-6 h-6" />,
      status: "Beta",
      features: ["Smart Contract Audit", "DeFi Analysis", "Gas Optimization"]
    },
    {
      id: 4,
      title: "Quantum-Safe Cryptography",
      description: "Post-quantum cryptographic library implementing NIST-approved algorithms for future-proof security.",
      image: "🔮",
      tags: ["C++", "Cryptography", "NIST", "Quantum"],
      category: "Cryptography",
      icon: <Database className="w-6 h-6" />,
      status: "Research",
      features: ["Post-Quantum", "NIST Standards", "High Performance"]
    },
    {
      id: 5,
      title: "Cloud Security Orchestrator",
      description: "Multi-cloud security management platform with automated compliance and incident response.",
      image: "☁️",
      tags: ["AWS", "Azure", "Terraform", "Python"],
      category: "Cloud Security",
      icon: <Shield className="w-6 h-6" />,
      status: "Production",
      features: ["Multi-Cloud", "Compliance", "Automation"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Production': return 'success';
      case 'Beta': return 'warning';
      case 'In Development': return 'processing';
      case 'Research': return 'info';
      default: return 'default';
    }
  };

  return (
    <section className="py-20 px-6 bg-muted/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Cutting-edge cybersecurity solutions and research projects that push the boundaries of digital defense.
            </p>
            <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
          </motion.div>
        </div>

        {/* Enhanced Swiper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16 project-swiper"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <Card className="cyber-card h-full group">
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {project.icon}
                        </div>
                        <Badge variant={getStatusColor(project.status) as any}>
                          <LottiePulse size={12} className="mr-1" />
                          {project.status}
                        </Badge>
                      </div>
                      <LottieGlow size={60} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-4 filter drop-shadow-glow">
                        {project.image}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl text-center group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-foreground/60">
                            <div className="w-1 h-1 bg-cyber-green rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="w-3 h-3" />
                        Code
                      </Button>
                      <Button size="sm" variant="primary" className="flex-1">
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {[
            { label: "Projects Completed", value: "25+", icon: "🚀" },
            { label: "Security Audits", value: "100+", icon: "🔍" },
            { label: "Vulnerabilities Found", value: "500+", icon: "🛡️" },
            { label: "Lines of Code", value: "50K+", icon: "💻" }
          ].map((stat, index) => (
            <Card key={index} className="cyber-card text-center p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedProjectsSwiper;
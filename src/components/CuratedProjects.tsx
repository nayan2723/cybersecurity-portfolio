import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Github, 
  Shield, 
  Code, 
  Database, 
  Brain,
  Eye,
  Play,
  Award
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  image: string;
  technologies: string[];
  achievements: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: boolean;
}

const CuratedProjects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "CyberShield Security Suite",
      description: "Enterprise-grade penetration testing framework with AI-powered vulnerability detection. Reduced average scan time by 75% while increasing accuracy to 99.2%.",
      category: "security",
      featured: true,
      image: "🛡️",
      technologies: ["Python", "React", "PostgreSQL", "Docker", "TensorFlow"],
      achievements: ["500+ vulnerabilities detected", "75% faster scanning", "Enterprise adoption"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 2,
      title: "Neural Threat Detection",
      description: "Machine learning system that analyzes network traffic patterns to identify zero-day attacks. Deployed across 50+ enterprise networks.",
      category: "ai",
      featured: true,
      image: "🧠",
      technologies: ["TensorFlow", "Python", "Kafka", "Elasticsearch", "Kubernetes"],
      achievements: ["99.8% accuracy", "Real-time processing", "Zero false positives"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 3,
      title: "Blockchain Security Auditor",
      description: "Automated smart contract vulnerability scanner that saved clients over $50M in potential losses through comprehensive DeFi protocol audits.",
      category: "blockchain",
      featured: true,
      image: "⛓️",
      technologies: ["Solidity", "Node.js", "Web3", "Hardhat", "TypeScript"],
      achievements: ["$50M+ protected", "200+ contracts audited", "Industry recognition"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 4,
      title: "Real-time Incident Response",
      description: "Cloud-native security orchestration platform that automates threat response across multi-cloud environments.",
      category: "cloud",
      featured: false,
      image: "☁️",
      technologies: ["AWS", "Azure", "Terraform", "Python", "Go"],
      achievements: ["90% faster response", "Multi-cloud support", "24/7 monitoring"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Quantum Cryptography Lab",
      description: "Research project implementing post-quantum cryptographic algorithms for future-proof security solutions.",
      category: "research",
      featured: false,
      image: "🔮",
      technologies: ["C++", "Quantum Computing", "NIST Standards", "OpenSSL"],
      achievements: ["Research published", "NIST compliance", "Open source"],
      githubUrl: "#"
    },
    {
      id: 6,
      title: "DevSecOps Pipeline",
      description: "Integrated security testing pipeline that embeds security checks throughout the entire development lifecycle.",
      category: "devops",
      featured: false,
      image: "🔧",
      technologies: ["Jenkins", "Docker", "SonarQube", "OWASP ZAP", "GitLab"],
      achievements: ["40% faster delivery", "Security by design", "Team adoption"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ai', label: 'AI/ML', icon: Brain },
    { id: 'blockchain', label: 'Blockchain', icon: Database },
    { id: 'cloud', label: 'Cloud', icon: Code },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

  return (
    <section id="curated-projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            A curated selection of projects that showcase my expertise in cybersecurity, 
            AI, and full-stack development.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-300"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Flagship Projects
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group"
              >
                <Card className="h-full overflow-hidden bg-muted/5 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative overflow-hidden">
                    {/* Project Image/Icon */}
                    <div className="h-48 flex items-center justify-center bg-gradient-to-br from-primary/10 to-cyber-blue/10 relative">
                      <div className="text-6xl mb-4 transition-transform duration-500 group-hover:scale-110">
                        {project.image}
                      </div>
                      
                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
                          >
                            {project.liveUrl && (
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Live Demo
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button size="sm" variant="outline">
                                <Github className="w-4 h-4 mr-1" />
                                Code
                              </Button>
                            )}
                            {project.caseStudy && (
                              <Button size="sm" variant="primary">
                                <Play className="w-4 h-4 mr-1" />
                                Case Study
                              </Button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Featured Badge */}
                      <Badge 
                        variant="success" 
                        className="absolute top-4 right-4 animate-pulse"
                      >
                        Featured
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                        <div className="space-y-1">
                          {project.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-foreground/60">
                              <div className="w-1 h-1 bg-cyber-green rounded-full"></div>
                              {achievement}
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge key={idx} variant="outline" size="sm">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" size="sm">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">More Projects</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">{project.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <Badge variant="outline" size="sm">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground/70 mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex gap-2 mb-4">
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CuratedProjects;

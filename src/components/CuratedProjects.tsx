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
      title: "Fharma – Bridging Rural & Urban Healthcare",
      description: "Full-stack web app with AI-powered medicine recommendation system and doctor-patient live chat functionality. User-friendly UI/UX designed and implemented.",
      category: "ai",
      featured: true,
      image: "🏥",
      technologies: ["React", "Supabase", "AI Models", "Real-time Chat", "TailwindCSS"],
      achievements: ["AI medicine recommendations", "Live chat system", "Rural healthcare bridge"],
      liveUrl: "https://fharma-health-bridge-ui-nayan2723s-projects.vercel.app/",
      githubUrl: "https://github.com/nayankumar-cybersec/fharma-health-bridge-ui",
      caseStudy: true
    },
    {
      id: 2,
      title: "PhishTrap",
      description: "Advanced cybersecurity project using rule-based + ML models to detect phishing URLs. Integrates AI (Gemini + Perplexity) for real-time threat intelligence with Google Safe Browsing API validation.",
      category: "security",
      featured: true,
      image: "🎣",
      technologies: ["Python", "Scikit-learn", "Google Gemini API", "Perplexity API", "Google Safe Browsing API"],
      achievements: ["ML + rule-based detection", "Real-time threat intelligence", "Multi-API integration"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 3,
      title: "Cyber Threat Visualization",
      description: "Real-time cyber threat intelligence visualization with geographical attack maps, live updates, severity classification and trend analysis for cybersecurity professionals.",
      category: "security",
      featured: true,
      image: "📊",
      technologies: ["Python", "Flask/Django", "D3.js", "Chart.js", "Threat Intelligence APIs"],
      achievements: ["Real-time visualization", "Geographical mapping", "Trend analysis"],
      liveUrl: "#",
      githubUrl: "#",
      caseStudy: true
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio website built with React and TailwindCSS. Fully responsive custom-built design showcasing skills, resume, and live projects. Optimized for performance and accessibility.",
      category: "web",
      featured: false,
      image: "💼",
      technologies: ["React", "TailwindCSS", "Vercel", "TypeScript", "Framer Motion"],
      achievements: ["Fully responsive design", "Performance optimized", "Accessibility compliant"],
      liveUrl: "https://nayan-cyber-folio.vercel.app/",
      githubUrl: "https://github.com/nayankumar-cybersec/cybersecurity-portfolio"
    },
    {
      id: 5,
      title: "LinkedIn Clone (UI Prototype)",
      description: "Frontend UI prototype replicating LinkedIn's layout and core UI components. Responsive design across devices built as practice project to mimic real-world complexity.",
      category: "web",
      featured: false,
      image: "👥",
      technologies: ["React", "TailwindCSS", "Responsive Design", "Component Libraries"],
      achievements: ["Pixel-perfect UI replica", "Cross-device responsive", "Complex component structure"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "NoxxShell",
      description: "Custom lightweight shell implementation supporting command execution, piping, and process handling. Built for OS and system programming practice using Python on Linux.",
      category: "systems",
      featured: false,
      image: "💻",
      technologies: ["Python", "Linux", "System Programming", "Process Management"],
      achievements: ["Custom shell implementation", "Command piping support", "Process handling"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Eye },
    { id: 'ai', label: 'AI/ML', icon: Brain },
    { id: 'security', label: 'Cybersecurity', icon: Shield },
    { id: 'web', label: 'Web Development', icon: Code },
    { id: 'systems', label: 'Systems Programming', icon: Database },
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
            A curated selection of projects showcasing expertise in AI/ML, cybersecurity, 
            web development, and systems programming.
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

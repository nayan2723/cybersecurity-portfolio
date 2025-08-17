import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'NoXx Shell',
      description: 'Custom Linux Shell - Built a lightweight interactive shell for Linux to automate system tasks.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      technologies: ['Bash', 'Python', 'Linux CLI', 'Git'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'Portfolio Website',
      description: 'Developer Portfolio - Designed a responsive portfolio site showcasing resume, projects, and a blog.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'GitHub', 'Supabase'],
      liveUrl: 'https://nayan-cyber-folio.vercel.app/',
      githubUrl: 'https://github.com/nayan2723/nayan-cyber-folio.git',
      featured: true
    },
    {
      title: 'Fharma',
      description: 'Bridging Rural & Urban Healthcare - Built a healthtech platform connecting rural patients with doctors.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Supabase', 'AI Toolkit'],
      liveUrl: 'https://fharma-health-bridge-ui-nayan2723s-projects.vercel.app/',
      githubUrl: 'https://github.com/nayan2723/fharma-health-bridge-ui.git',
      featured: false
    },
    {
      title: 'Cybersecurity Threat Visualization',
      description: 'Visualized global cybersecurity threats from CSV datasets to identify patterns for SOC teams.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      liveUrl: '#',
      githubUrl: 'https://github.com/nayan2723/cybersecurity-threat-viz',
      featured: false
    },
    {
      title: 'Security Vulnerability Scanner',
      description: 'A comprehensive web application security scanner that identifies common vulnerabilities like SQL injection, XSS, and CSRF. Built with Python and includes automated reporting.',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=300&fit=crop',
      technologies: ['Python', 'Flask', 'SQLite', 'Beautiful Soup', 'Requests'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      title: 'Network Traffic Analyzer',
      description: 'Python-based network monitoring tool that captures and analyzes network packets, detects suspicious activities, and generates security reports.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop',
      technologies: ['Python', 'Scapy', 'Matplotlib', 'Pandas', 'Tkinter'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            FEATURED <span className="text-primary">PROJECTS</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Here's a selection of my technical projects that demonstrate my skills in cybersecurity and web development.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="cyber-card group overflow-hidden hover:scale-105 transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground/70">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="outline"
                      className="border-primary/30 text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    size="sm" 
                    className="cyber-button"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Other <span className="text-primary">Projects</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="cyber-card group hover:scale-105 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/70">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, Eye } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const EnhancedProjects = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuredRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      title: 'Fharma – Bridging Rural & Urban Healthcare',
      description: 'Full-stack web app with AI-powered medicine recommendation system and doctor-patient live chat functionality.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
      technologies: ['React', 'Supabase', 'AI Models', 'Real-time Chat', 'TailwindCSS'],
      liveUrl: 'https://fharma-health-bridge-ui-nayan2723s-projects.vercel.app/',
      githubUrl: 'https://github.com/nayan2723/fharma-health-bridge-ui.git',
      featured: true,
      magicClass: 'magictime slideDown'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React and TailwindCSS. Fully responsive design showcasing skills, resume, and live projects.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      technologies: ['React', 'TailwindCSS', 'Vercel', 'TypeScript', 'Framer Motion'],
      liveUrl: 'https://nayan-cyber-folio.vercel.app/',
      githubUrl: 'https://github.com/nayan2723/nayan-cyber-folio.git',
      featured: true,
      magicClass: 'magictime slideUp'
    },
    {
      title: 'PhishTrap',
      description: 'Advanced cybersecurity project using ML models to detect phishing URLs. Integrates AI (Gemini + Perplexity) for real-time threat intelligence.',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=300&fit=crop',
      technologies: ['Python', 'Scikit-learn', 'Google Gemini API', 'Perplexity API', 'Google Safe Browsing API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      magicClass: 'magictime puffIn'
    },
    {
      title: 'Cyber Threat Visualization',
      description: 'Real-time cyber threat intelligence visualization with geographical attack maps and trend analysis for cybersecurity professionals.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      technologies: ['Python', 'Flask/Django', 'D3.js', 'Chart.js', 'Threat Intelligence APIs'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      magicClass: 'magictime slideLeftReturn'
    },
    {
      title: 'LinkedIn Clone (UI Prototype)',
      description: 'Frontend UI prototype replicating LinkedIn\'s layout and core UI components. Responsive design across devices.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      technologies: ['React', 'TailwindCSS', 'Responsive Design', 'Component Libraries'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      magicClass: 'magictime slideRightReturn'
    },
    {
      title: 'NoxxShell',
      description: 'Custom lightweight shell implementation supporting command execution, piping, and process handling. Built for OS and system programming practice.',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&h=300&fit=crop',
      technologies: ['Python', 'Linux', 'System Programming', 'Process Management'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      magicClass: 'magictime foolishIn'
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  useEffect(() => {
    // Featured projects animation
    featuredRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.8, rotateY: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(1.7)"
          }
        );
      }
    });

    // Other projects stagger animation
    projectRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Title with multiple animations */}
        <div 
          className="text-center mb-16"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__slideInDown animate__delay-1s">
            FEATURED <span className="text-primary magictime spaceInUp">PROJECTS</span>
          </h2>
          <p 
            className="text-lg text-foreground/70 max-w-3xl mx-auto animate__animated animate__fadeInUp animate__delay-2s"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            A selection of technical projects demonstrating expertise in AI/ML, cybersecurity, web development, and systems programming.
          </p>
          <div 
            className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6 animate__animated animate__zoomIn animate__delay-3s"
            data-aos="zoom-in"
            data-aos-delay="600"
          ></div>
        </div>

        {/* Featured Projects with enhanced animations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card 
              key={index} 
              ref={(el) => featuredRefs.current[index] = el}
              className={`cyber-card group overflow-hidden hover:scale-105 transition-all duration-500 ${project.magicClass}`}
              data-aos="flip-left"
              data-aos-delay={index * 200}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground animate__animated animate__bounce animate__infinite animate__slow">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent w-full h-1 animate-pulse"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-primary animate__animated animate__fadeInLeft">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground/70 animate__animated animate__fadeInUp animate__delay-1s">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="outline"
                      className="border-primary/30 text-primary animate__animated animate__zoomIn hover:animate__pulse"
                      style={{ animationDelay: `${techIndex * 0.1}s` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    size="sm" 
                    className="cyber-button group/btn animate__animated animate__slideInLeft"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground animate__animated animate__slideInRight"
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

        {/* Other Projects with AOS animations */}
        <div>
          <h3 
            className="text-2xl font-bold text-center mb-8 animate__animated animate__fadeInDown"
            data-aos="fade-down"
          >
            Other <span className="text-primary magictime slideDown">Projects</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card 
                key={index} 
                ref={(el) => projectRefs.current[index] = el}
                className={`cyber-card group hover:scale-105 transition-all duration-300 ${project.magicClass}`}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Cyber overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-primary animate__animated animate__fadeIn">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/70 animate__animated animate__fadeInUp">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary animate__animated animate__zoomIn"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs animate__animated animate__zoomIn animate__delay-1s">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs hover:animate__pulse"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs hover:animate__pulse"
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

        {/* Call to action with magic animation */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <Card className="cyber-card p-8 magictime spaceInUp">
            <h3 className="text-2xl font-bold text-primary mb-4 animate__animated animate__fadeInDown">
              Want to see more?
            </h3>
            <p className="text-foreground/70 mb-6 animate__animated animate__fadeInUp animate__delay-1s">
              Check out my GitHub for more projects and contributions
            </p>
            <Button 
              className="cyber-button animate__animated animate__pulse animate__infinite"
              onClick={() => window.open('https://github.com/nayankumar-cybersec', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Visit GitHub
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedProjects;

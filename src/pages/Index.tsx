import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">Nayan Dev</div>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-foreground/70 hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Nayan <span className="text-primary">Dev</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 mb-8">
            Cybersecurity Expert & Full-Stack Developer
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12">
            Welcome to my portfolio! I'm a cybersecurity enthusiast and developer passionate about ethical hacking and secure systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View My Work
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/Nayan_resume_final.pdf" download="Nayan_Resume.pdf">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com/nayan2723" className="p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/nayan-kshitij" className="p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:nayankshitij128@gmail.com" className="p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-muted/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            I'm a cybersecurity student and full-stack developer with a passion for ethical hacking and secure system development. 
            Currently pursuing B.Tech in Computer Science Engineering, I enjoy breaking things to understand how they work 
            and then building them back better and more secure.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Ready to collaborate on exciting projects or discuss cybersecurity? Let's connect!
          </p>
          <Button size="lg" asChild>
            <a href="mailto:nayankshitij128@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
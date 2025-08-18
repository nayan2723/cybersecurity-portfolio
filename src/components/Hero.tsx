import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cybersecurity Enthusiast || CSE Student @ Bennett University';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 particle-bg">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-green rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyber-blue rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyber-purple rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-cyber-pink rounded-full animate-pulse opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                🟢 Available for hire
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30">
                🎓 Available for Internships
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm{' '}
              <span 
                className="text-primary glitch-effect inline-block"
                data-text="Nayan"
              >
                Nayan
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl text-foreground/80 terminal-text min-h-[3rem]">
              {displayText}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <p className="text-lg text-foreground/70 leading-relaxed max-w-xl">
            Blending curiosity with code to secure systems, build meaningful solutions, 
            and make the digital world safer — one thoughtful line at a time. 
            Welcome to my corner of the web.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={scrollToContact}
              className="cyber-button"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            
            <Button 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('/Nayan_resume_final.pdf', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right side - Profile image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative animate-float">
            <div className="w-80 h-96 rounded-2xl overflow-hidden cyber-card">
              <img
                src="https://i.ibb.co/LhYB87c6/Urban-Stillness-Amidst-Evening-Rush.png"
                alt="Nayan Kshitij - Cybersecurity enthusiast and computer science student"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-2xl blur opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
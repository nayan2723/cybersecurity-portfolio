import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EnhancedAbout = () => {
  const terminalRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const terminalCommands = [
    { command: '$ whoami', output: 'Cybersecurity enthusiast with a focus on ethical hacking and secure development' },
    { command: '$ education', output: 'B.Tech CSE @ Bennett University | Expected 2027' },
    { command: '$ location', output: 'India' },
    { command: '$ interests', output: 'cybersecurity, ethical hacking, web development' },
  ];

  const interests = [
    {
      title: 'Cybersecurity',
      description: 'Passionate about ethical hacking, penetration testing, and security threat analysis.',
      icon: '🛡️',
      animateClass: 'magictime puffIn'
    },
    {
      title: 'Web Development',
      description: 'Designing & making websites with modern technologies and secure practices.',
      icon: '💻',
      animateClass: 'magictime slideDownReturn'
    },
    {
      title: 'LAMP Stack',
      description: 'Building secure web applications using Linux, Apache, MySQL, and PHP.',
      icon: '🔧',
      animateClass: 'magictime slideUpReturn'
    }
  ];

  useEffect(() => {
    // Terminal typewriter effect with GSAP
    const tl = gsap.timeline();
    
    terminalCommands.forEach((cmd, index) => {
      tl.fromTo(`[data-command="${index}"]`, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(`[data-output="${index}"]`,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
    });

    // Cards entrance animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotateX: 15 },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)"
          }
        );
      }
    });
  }, []);

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title with AOS animation */}
        <div 
          className="text-center mb-16"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate__animated animate__fadeInDown animate__delay-1s">
            <span className="text-primary">ABOUT</span> ME
          </h2>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full animate__animated animate__zoomIn animate__delay-2s"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Description with AOS */}
          <div className="space-y-6">
            <p 
              className="text-lg text-foreground/80 leading-relaxed animate__animated animate__fadeInLeft"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              I'm a Computer Science Engineering student at Bennett University, passionate about 
              cybersecurity and ethical hacking. My journey in tech started with a fascination 
              for how systems work.
            </p>
            
            <p 
              className="text-lg text-foreground/80 leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              Currently pursuing my B.Tech in CSE (Class of 2027), I'm focused on developing 
              my skills and exploring the field.
            </p>
            
            <p 
              className="text-lg text-foreground/80 leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              I believe in continuous learning and staying ahead of emerging trends. When I'm 
              not coding, I enjoy playing cricket and listening to music.
            </p>

            {/* Enhanced Terminal simulation */}
            <Card 
              className="cyber-card animate__animated animate__zoomIn animate__delay-1s"
              data-aos="flip-left"
              data-aos-delay="800"
            >
              <CardContent className="p-6">
                <div className="space-y-3" ref={terminalRef}>
                  {terminalCommands.map((cmd, index) => (
                    <div key={index} className="space-y-1">
                      <div 
                        className="terminal-text text-primary font-mono"
                        data-command={index}
                      >
                        {cmd.command}
                      </div>
                      <div 
                        className="text-foreground/70 font-mono text-sm pl-4"
                        data-output={index}
                      >
                        {cmd.output}
                      </div>
                    </div>
                  ))}
                  <div className="terminal-text text-primary font-mono flex animate__animated animate__flash animate__infinite">
                    $ <span className="animate-pulse ml-1">█</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Enhanced Interests & Focus */}
          <div className="space-y-6">
            <h3 
              className="text-2xl font-bold text-primary mb-6 animate__animated animate__bounceInDown"
              data-aos="fade-left"
            >
              INTERESTS & FOCUS
            </h3>
            
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <Card 
                  key={index} 
                  ref={(el) => cardsRef.current[index] = el}
                  className={`cyber-card group hover:scale-105 transition-all duration-300 ${interest.animateClass}`}
                  data-aos="zoom-in"
                  data-aos-delay={index * 200}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl animate__animated animate__bounceIn animate__delay-2s">
                        {interest.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2 animate__animated animate__fadeInRight">
                          {interest.title}
                        </h4>
                        <p className="text-foreground/70 animate__animated animate__fadeInUp animate__delay-1s">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional stats with magic animations */}
            <div 
              className="grid grid-cols-2 gap-4 mt-8"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <Card className="cyber-card text-center p-4 magictime spaceInUp">
                <div className="text-2xl font-bold text-cyber-green animate__animated animate__heartBeat animate__infinite animate__slow">
                  3+
                </div>
                <div className="text-sm text-foreground/60">Years Learning</div>
              </Card>
              <Card className="cyber-card text-center p-4 magictime spaceInDown">
                <div className="text-2xl font-bold text-cyber-blue animate__animated animate__pulse animate__infinite">
                  15+
                </div>
                <div className="text-sm text-foreground/60">Projects Built</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAbout;
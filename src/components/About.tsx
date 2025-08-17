import { Card, CardContent } from '@/components/ui/card';

const About = () => {
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
      icon: '🛡️'
    },
    {
      title: 'Web Development',
      description: 'Designing & making websites with modern technologies and secure practices.',
      icon: '💻'
    },
    {
      title: 'LAMP Stack',
      description: 'Building secure web applications using Linux, Apache, MySQL, and PHP.',
      icon: '🔧'
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">ABOUT</span> ME
          </h2>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Description */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a Computer Science Engineering student at Bennett University, passionate about 
              cybersecurity and ethical hacking. My journey in tech started with a fascination 
              for how systems work.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Currently pursuing my B.Tech in CSE (Class of 2027), I'm focused on developing 
              my skills and exploring the field.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              I believe in continuous learning and staying ahead of emerging trends. When I'm 
              not coding, I enjoy playing cricket and listening to music.
            </p>

            {/* Terminal simulation */}
            <Card className="cyber-card">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {terminalCommands.map((cmd, index) => (
                    <div key={index} className="space-y-1">
                      <div className="terminal-text text-primary font-mono">
                        {cmd.command}
                      </div>
                      <div className="text-foreground/70 font-mono text-sm pl-4">
                        {cmd.output}
                      </div>
                    </div>
                  ))}
                  <div className="terminal-text text-primary font-mono flex">
                    $ <span className="animate-pulse ml-1">█</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Interests & Focus */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">
              INTERESTS & FOCUS
            </h3>
            
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <Card key={index} className="cyber-card group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{interest.icon}</div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2">
                          {interest.title}
                        </h4>
                        <p className="text-foreground/70">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
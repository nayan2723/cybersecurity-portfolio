import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cybersecurity Tools',
      icon: '🛡️',
      skills: [
        'Kali Linux', 'Metasploit', 'Nmap', 'Wireshark', 'Burp Suite',
        'OWASP ZAP', 'Nikto', 'Aircrack-ng', 'John the Ripper'
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        'Python', 'JavaScript', 'PHP', 'C', 'C++', 'Java', 'SQL', 'Bash'
      ]
    },
    {
      title: 'Web Technologies',
      icon: '🌐',
      skills: [
        'HTML5', 'CSS3', 'React', 'Node.js', 'Express.js', 'MongoDB',
        'MySQL', 'Apache', 'Nginx'
      ]
    },
    {
      title: 'Security Frameworks',
      icon: '🔒',
      skills: [
        'OWASP Top 10', 'NIST Framework', 'ISO 27001', 'PCI DSS',
        'GDPR Compliance', 'SANS Top 25'
      ]
    },
    {
      title: 'Development Tools',
      icon: '🔧',
      skills: [
        'Git', 'VS Code', 'Docker', 'VirtualBox', 'VMware',
        'Postman', 'Chrome DevTools'
      ]
    },
    {
      title: 'Operating Systems',
      icon: '💽',
      skills: [
        'Linux (Ubuntu, CentOS)', 'Windows', 'macOS', 'Android'
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            SKILLS & <span className="text-primary">EXPERTISE</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            My technical toolkit spans cybersecurity, programming languages, and development 
            tools that I've honed through projects and continuous learning.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="cyber-card group hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{category.icon}</div>
                <CardTitle className="text-xl text-primary">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional certifications section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Learning & <span className="text-primary">Certifications</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Ethical Hacking Essentials',
              'OWASP Top 10',
              'Linux Fundamentals',
              'Web Application Security'
            ].map((cert, index) => (
              <Card key={index} className="cyber-card text-center p-4">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-sm font-medium text-primary">{cert}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
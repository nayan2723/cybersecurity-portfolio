import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { Alert } from '@/components/ui/alert-enhanced';
import { Progress } from '@/components/ui/progress-enhanced';
import { EnhancedSelect } from '@/components/ui/select-enhanced';
import { 
  Shield, 
  Code, 
  Database, 
  Cpu, 
  Zap, 
  Star,
  Github,
  ExternalLink,
  Play,
  Download,
  Settings
} from 'lucide-react';

const ComponentShowcase = () => {
  const [selectedSkill, setSelectedSkill] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const skillOptions = [
    { value: 'penetration-testing', label: 'Penetration Testing', icon: <Shield className="w-4 h-4" /> },
    { value: 'web-development', label: 'Web Development', icon: <Code className="w-4 h-4" /> },
    { value: 'database-security', label: 'Database Security', icon: <Database className="w-4 h-4" /> },
    { value: 'system-administration', label: 'System Administration', icon: <Cpu className="w-4 h-4" /> },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const handleDemoAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="py-20 px-6 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ENHANCED <span className="text-primary">UI COMPONENTS</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Experience the power of Material-UI, Chakra UI, and Ant Design patterns 
            seamlessly integrated with our cyberpunk aesthetic.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Enhanced Buttons Showcase */}
          <Card 
            className="cyber-card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-green" />
                Enhanced Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <Play className="w-4 h-4" />
                  Cyberpunk Primary
                </Button>
                <Button variant="neon" className="w-full">
                  <Shield className="w-4 h-4" />
                  Neon Border
                </Button>
                <Button variant="matrix" className="w-full">
                  <Code className="w-4 h-4" />
                  Matrix Style
                </Button>
                <Button 
                  variant="glitch" 
                  className="w-full"
                  loading={loading}
                  onClick={handleDemoAction}
                >
                  <Download className="w-4 h-4" />
                  {loading ? 'Processing...' : 'Glitch Effect'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Badges Showcase */}
          <Card 
            className="cyber-card"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cyber-blue" />
                Smart Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="neon" interactive>
                  <Shield className="w-3 h-3" />
                  Security Expert
                </Badge>
                <Badge variant="matrix" interactive>
                  <Code className="w-3 h-3" />
                  Full Stack
                </Badge>
                <Badge variant="processing">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                  Learning
                </Badge>
                <Badge variant="success" closable>
                  Certified
                </Badge>
                <Badge variant="glitch" interactive>
                  Hacker
                </Badge>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-sm text-foreground/70">Interactive badges with animations</p>
                <div className="flex gap-2">
                  <Badge variant="chip" size="lg" interactive>
                    <Github className="w-3 h-3" />
                    GitHub Pro
                  </Badge>
                  <Badge variant="subtle" size="lg" interactive>
                    <ExternalLink className="w-3 h-3" />
                    Portfolio
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading States Showcase */}
          <Card 
            className="cyber-card"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-neon-pink animate-spin" />
                Loading States
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Loading variant="circular" color="primary" />
                  <span className="text-sm">Circular</span>
                </div>
                <div className="flex items-center gap-3">
                  <Loading variant="dots" color="accent" />
                  <span className="text-sm">Dots</span>
                </div>
                <div className="flex items-center gap-3">
                  <Loading variant="pulse" color="secondary" />
                  <span className="text-sm">Pulse</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Linear Progress</p>
                <Loading variant="linear" color="primary" />
              </div>
            </CardContent>
          </Card>

          {/* Progress Components */}
          <Card 
            className="cyber-card"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-cyber-green" />
                Progress Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">Cyberpunk Line Progress</p>
                  <Progress 
                    value={progress} 
                    variant="cyber" 
                    showText 
                    status="active"
                  />
                </div>
                
                <div>
                  <p className="text-sm mb-2">Success Progress</p>
                  <Progress 
                    value={85} 
                    variant="success" 
                    size="lg"
                    showText 
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-sm mb-2">Circular Progress</p>
                  <Progress 
                    value={progress} 
                    type="circle" 
                    variant="cyber"
                    showText 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Select */}
          <Card 
            className="cyber-card"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyber-blue" />
                Smart Select
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <EnhancedSelect
                  options={skillOptions}
                  value={selectedSkill}
                  onValueChange={setSelectedSkill}
                  placeholder="Choose your expertise..."
                  searchable
                  variant="cyber"
                />
                
                <EnhancedSelect
                  options={skillOptions}
                  placeholder="Multiple selection..."
                  multiple
                  searchable
                  variant="outlined"
                />
              </div>
              
              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-cyber-green/10 border border-cyber-green/20 rounded-md"
                >
                  <p className="text-sm text-cyber-green">
                    Selected: {skillOptions.find(opt => opt.value === selectedSkill)?.label}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Alert Components */}
          <Card 
            className="cyber-card"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-pink" />
                Alert System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert
                status="success"
                title="Security Scan Complete"
                description="All vulnerabilities have been patched successfully."
                closable
              />
              
              <Alert
                status="warning"
                title="System Update Required"
                description="Please update your security protocols."
                closable
              />
              
              <Alert
                status="info"
                title="Cybersecurity Tip"
                description="Enable 2FA for enhanced protection."
                closable
              />
              
              <Alert
                status="loading"
                title="Analyzing Network Traffic"
                description="Please wait while we scan for threats..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <Card className="cyber-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Experience the Future of UI
            </h3>
            <p className="text-foreground/70 mb-6">
              These enhanced components combine the best of Material-UI's accessibility, 
              Chakra UI's simplicity, and Ant Design's enterprise features with our 
              unique cyberpunk aesthetic.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary">
                <Github className="w-4 h-4" />
                View Source Code
              </Button>
              <Button variant="neon">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentShowcase;
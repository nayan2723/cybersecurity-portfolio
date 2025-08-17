import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  Bug, 
  Skull, 
  Heart, 
  Zap, 
  RefreshCw,
  Trophy,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const QuirkyAbout = () => {
  const [selectedFail, setSelectedFail] = useState<number | null>(null);
  const [coffeCount, setCoffeCount] = useState(1247);
  const [bugsSquashed, setBugsSquashed] = useState(9999);

  const epicFails = [
    {
      year: "2019",
      title: "The Great Database Disaster",
      description: "Accidentally deleted the entire user table during my first internship. Spent 14 hours straight recovering it. Now I triple-check EVERY SQL query.",
      lesson: "Always backup before you f*** up 😅",
      icon: <Skull className="w-5 h-5" />,
      mood: "panic"
    },
    {
      year: "2020",
      title: "WiFi Password Incident",
      description: "Tried to crack my own WiFi password for a security project. Locked myself out for 3 days. Had to use neighbor's WiFi to submit the assignment.",
      lesson: "Know when to stop 'testing' 🤦‍♂️",
      icon: <Bug className="w-5 h-5" />,
      mood: "embarrassed"
    },
    {
      year: "2021", 
      title: "Assembly Code Nightmare",
      description: "Spent 6 hours debugging assembly code. The issue? I forgot a single semicolon. My brain literally blue-screened.",
      lesson: "Syntax errors are the real villains 💀",
      icon: <Zap className="w-5 h-5" />,
      mood: "frustrated"
    },
    {
      year: "2022",
      title: "The Infinite Loop of Doom",
      description: "Created an infinite loop that crashed the entire lab's computers during finals week. Professor was... not amused.",
      lesson: "With great power comes great responsibility 🕷️",
      icon: <RefreshCw className="w-5 h-5" />,
      mood: "guilty"
    },
    {
      year: "2023",
      title: "Penetration Testing Gone Wrong",
      description: "Accidentally triggered the actual security system while testing. Fire department showed up. Oops?",
      lesson: "Always tell security before 'breaking in' 🚨",
      icon: <Trophy className="w-5 h-5" />,
      mood: "proud"
    }
  ];

  const fakeInterviewQs = [
    {
      q: "Why do you love microprocessors?",
      a: "Because they never ask for group assignments! 🙌"
    },
    {
      q: "What's your biggest weakness?",
      a: "I care too much... about whether my code compiles on the first try 😂"
    },
    {
      q: "Where do you see yourself in 5 years?",
      a: "Still trying to center a div perfectly 📐"
    },
    {
      q: "Why cybersecurity?",
      a: "Someone has to protect the world from my old code 🛡️"
    },
    {
      q: "What motivates you?",
      a: "The fear of production bugs and unlimited coffee ☕"
    }
  ];

  const stats = [
    { label: "Coffee Consumed", value: coffeCount, icon: <Coffee className="w-4 h-4" />, unit: "cups" },
    { label: "Bugs Squashed", value: bugsSquashed, icon: <Bug className="w-4 h-4" />, unit: "🐛" },
    { label: "All-Nighters", value: 127, icon: <Skull className="w-4 h-4" />, unit: "nights" },
    { label: "StackOverflow Visits", value: "∞", icon: <Heart className="w-4 h-4" />, unit: "times" }
  ];

  useEffect(() => {
    // Randomly increment stats for fun
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCoffeCount(prev => prev + 1);
      }
      if (Math.random() > 0.8) {
        setBugsSquashed(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How I Survived <span className="text-primary">Engineering Hell</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            A totally honest timeline of epic fails, caffeine addiction, and somehow becoming a cybersecurity engineer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Epic Fails Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Skull className="w-6 h-6 text-red-400" />
                Epic Tech Fails That Made Me Stronger
              </h3>

              <div className="space-y-6">
                {epicFails.map((fail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedFail === index ? 'border-primary/50 shadow-primary/10' : ''
                      }`}
                      onClick={() => setSelectedFail(selectedFail === index ? null : index)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{fail.year}</Badge>
                          <div className="text-red-400">{fail.icon}</div>
                          <CardTitle className="text-lg">{fail.title}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {selectedFail === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="space-y-3">
                              <p className="text-foreground/70 text-sm leading-relaxed">
                                {fail.description}
                              </p>
                              <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                                <p className="text-sm font-medium text-primary">
                                  Lesson learned: {fail.lesson}
                                </p>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats & Fun Facts */}
          <div className="space-y-8">
            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-cyber-blue/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Career Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {stat.icon}
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <Badge variant="neon">
                        {stat.value} {stat.unit}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Fake Interview Q&A */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyber-green" />
                    Fake Interview Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fakeInterviewQs.map((qa, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">
                        {qa.q}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {qa.a}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-cyber-green/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyber-green" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">Graduated: 2024 (Somehow!) 🎓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">Job Status: Available for hire! 💼</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">Coffee Level: Dangerously Low ⚠️</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-sm">Relationship Status: It&apos;s complicated (with code) 💻</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuirkyAbout;
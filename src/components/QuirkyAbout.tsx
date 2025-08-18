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
  const [coffeCount, setCoffeCount] = useState(650);
  const [bugsSquashed, setBugsSquashed] = useState(40);

  const epicFails = [
    {
      year: "2022",
      title: "The Great OS Deletion",
      description: "Deleted my OS and panicked the shit outta myself... reinstalled it somehow. That was a wild 8-hour adventure.",
      lesson: "Always backup your system before experimenting 💀",
      icon: <Skull className="w-5 h-5" />,
      mood: "panic"
    },
    {
      year: "2023",
      title: "Pen Drive Format Fiasco",
      description: "Accidentally formatted my pen drive while setting up Kali. Lost all my assignments. Thank god for cloud backups!",
      lesson: "Backups are life savers 🤦‍♂️",
      icon: <Bug className="w-5 h-5" />,
      mood: "embarrassed"
    },
    {
      year: "2024", 
      title: "The Missing Semicolon Saga",
      description: "Spent 6 hours debugging only to realize I missed a semicolon. My brain literally went into debug mode.",
      lesson: "Attention to detail > caffeine 😅",
      icon: <Zap className="w-5 h-5" />,
      mood: "frustrated"
    },
    {
      year: "2025",
      title: "Self-Hack Attack",
      description: "Ran a hack script on my own PC... against myself. Basically DoS'd my own system for testing. Brilliant!",
      lesson: "Know your target before you fire 🎯",
      icon: <RefreshCw className="w-5 h-5" />,
      mood: "guilty"
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
    { label: "Bugs Squashed", value: 0, icon: <Bug className="w-4 h-4" />, unit: "🐛" },
    { label: "All-Nighters", value: 83, icon: <Skull className="w-4 h-4" />, unit: "nights" },
    { label: "Security Labs", value: bugsSquashed, icon: <Heart className="w-4 h-4" />, unit: "labs" }
  ];

  useEffect(() => {
    // Randomly increment stats for fun
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCoffeCount(prev => prev < 742 ? prev + 1 : prev);
      }
      if (Math.random() > 0.8) {
        setBugsSquashed(prev => prev < 50 ? prev + 1 : prev);
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
                    <GraduationCap className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">Student: 3rd Year B.Tech CSE 🎓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">Location: Greater Noida, India 📍</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm">PC Fan Status: Ready for takeoff 🚀</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-sm">Dark mode everything, tabs &gt; spaces 💻</span>
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
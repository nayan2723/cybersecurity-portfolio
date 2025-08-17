import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Coffee, Bug, Zap } from 'lucide-react';

interface MascotProps {
  className?: string;
}

const AnimatedMascot = ({ className = "" }: MascotProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [mood, setMood] = useState<'happy' | 'tired' | 'hacking' | 'coffee'>('happy');
  
  const messages = [
    "Welcome to my digital fortress! 🛡️",
    "404: Social life not found. Please try debugging it! 😅",
    "This project almost broke me... and my coffee machine ☕",
    "Fun fact: I've debugged more code than I've eaten pizza slices. That's saying something! 🍕",
    "Still awake at 3 AM fixing vulnerabilities? Same! 🌙",
    "My code is so secure, even I can't hack into it sometimes 😂",
    "Warning: Excessive caffeine levels detected! ⚠️",
    "Segmentation fault. Blame the user! (Just kidding... or am I?) 💀",
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "I speak fluent binary: 01001000 01101001! 👋"
  ];

  const moods = {
    happy: { emoji: '😊', color: 'text-green-400' },
    tired: { emoji: '😴', color: 'text-yellow-400' },
    hacking: { emoji: '👨‍💻', color: 'text-cyber-green' },
    coffee: { emoji: '☕', color: 'text-orange-400' }
  };

  useEffect(() => {
    // Cycle through moods
    const moodInterval = setInterval(() => {
      const moodKeys = Object.keys(moods) as (keyof typeof moods)[];
      setMood(moodKeys[Math.floor(Math.random() * moodKeys.length)]);
    }, 15000);

    // Show random messages
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to show message
        setCurrentMessage(Math.floor(Math.random() * messages.length));
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
      }
    }, 8000);

    return () => {
      clearInterval(moodInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const handleMascotClick = () => {
    setCurrentMessage(Math.floor(Math.random() * messages.length));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 mb-4 max-w-xs"
          >
            <Card className="bg-background/95 backdrop-blur-sm border-primary/30 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {messages[currentMessage]}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Character */}
      <motion.div
        className="relative cursor-pointer group"
        onClick={handleMascotClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Mascot Body */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyber-blue rounded-full flex items-center justify-center shadow-lg shadow-primary/20 border-2 border-primary/30">
          <span className={`text-2xl transition-all duration-500 ${moods[mood].color}`}>
            {moods[mood].emoji}
          </span>
        </div>

        {/* Mood indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {mood === 'coffee' && <Coffee className="w-3 h-3 text-orange-400" />}
          {mood === 'tired' && <div className="w-2 h-1 bg-yellow-400 rounded-full" />}
          {mood === 'hacking' && <Bug className="w-3 h-3 text-cyber-green" />}
          {mood === 'happy' && <Zap className="w-3 h-3 text-green-400" />}
        </motion.div>

        {/* Hover tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap border border-primary/20">
          Click me for wisdom! 🧠
        </div>
      </motion.div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-background/80 hover:bg-background/90"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default AnimatedMascot;
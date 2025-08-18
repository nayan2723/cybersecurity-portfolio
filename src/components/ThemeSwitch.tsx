import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark' | 'hacker';

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.className = ''; // Clear existing classes
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'hacker') {
      // Add special hacker mode effects
      document.body.style.cursor = 'crosshair';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const themes = [
    { 
      id: 'light' as Theme, 
      icon: Sun, 
      label: 'Light Mode',
      description: 'Clean & Professional'
    },
    { 
      id: 'dark' as Theme, 
      icon: Moon, 
      label: 'Dark Mode',
      description: 'Sleek & Modern'
    },
    { 
      id: 'hacker' as Theme, 
      icon: Terminal, 
      label: 'Hacker Mode',
      description: 'Welcome to the Matrix'
    }
  ];

  const currentTheme = themes.find(t => t.id === theme);
  const CurrentIcon = currentTheme?.icon || Moon;

  return (
    <div className="fixed top-20 right-4 z-50">
      <motion.div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={theme === 'hacker' ? 'matrix' : 'outline'}
          size="icon"
          className={`${theme === 'hacker' ? 'animate-cyberpulse border-cyber-green text-cyber-green' : ''}`}
        >
          <CurrentIcon className="h-4 w-4" />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-12 right-0 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg p-2 min-w-48 shadow-lg"
            >
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <motion.button
                    key={themeOption.id}
                    onClick={() => switchTheme(themeOption.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-md transition-all hover:bg-accent/20 ${
                      theme === themeOption.id ? 'bg-accent/30 text-accent-foreground' : 'text-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{themeOption.label}</div>
                      <div className="text-xs opacity-70">{themeOption.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ThemeSwitch;
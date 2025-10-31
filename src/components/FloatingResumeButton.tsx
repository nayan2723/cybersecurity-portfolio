import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeButton from '@/components/ui/resume-button';
import { FileText, X } from 'lucide-react';

const FloatingResumeButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 200px
      const shouldShow = window.scrollY > 200;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="relative">
            {/* Expanded Card */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute bottom-16 left-0 bg-card border border-border/50 rounded-lg p-4 shadow-lg backdrop-blur-sm min-w-[280px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-primary">Quick Access</h3>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-foreground/60 hover:text-foreground p-1"
                      aria-label="Close quick access menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    Download my resume or get in touch
                  </p>
                  <div className="space-y-2">
                    <ResumeButton 
                      variant="primary" 
                      size="sm"
                      text="Download Resume"
                      className="w-full"
                    />
                    <motion.button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Me
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isExpanded ? "Close quick access menu" : "Open resume and contact options"}
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(0, 0, 0, 0.3)",
                  "0 8px 30px rgba(var(--primary), 0.4)",
                  "0 4px 20px rgba(0, 0, 0, 0.3)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <FileText className="w-6 h-6 group-hover:animate-pulse" />
            </motion.button>

            {/* Tooltip */}
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-card border border-border/50 px-3 py-1 rounded-md text-sm whitespace-nowrap shadow-lg"
              >
                Resume & Contact
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-r-4 border-r-card border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingResumeButton;
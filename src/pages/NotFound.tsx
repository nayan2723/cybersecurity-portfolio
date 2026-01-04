import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Skull, Ghost, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Glitch effect
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const interval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        const glitched = "404"
          .split("")
          .map((char) =>
            Math.random() > 0.5
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("");
        setGlitchText(glitched);
        setTimeout(() => setGlitchText("404"), 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Skull, delay: 0 },
    { Icon: Ghost, delay: 0.5 },
    { Icon: Bug, delay: 1 },
    { Icon: Ghost, delay: 1.5 },
    { Icon: Bug, delay: 2 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated matrix-like background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20 font-mono text-xs"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20 
            }}
            animate={{ 
              y: window.innerHeight + 20,
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            {Math.random() > 0.5 ? "0" : "1"}
          </motion.div>
        ))}
      </div>

      {/* Floating glitch orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Floating error icons */}
      {floatingIcons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/30"
          style={{
            left: `${15 + index * 18}%`,
            top: `${20 + (index % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      <motion.div 
        className="text-center z-10 max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="cyber-card p-8 backdrop-blur-xl border border-primary/20">
          <motion.div 
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            {/* Glitchy 404 */}
            <motion.div
              className="relative"
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
            >
              <h1 
                className="text-8xl font-bold mb-2 font-mono tracking-wider"
                style={{
                  textShadow: `
                    2px 2px hsl(var(--destructive)),
                    -2px -2px hsl(var(--primary))
                  `
                }}
              >
                <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent">
                  {glitchText}
                </span>
              </h1>
              
              {/* Glitch overlay layers */}
              <motion.h1 
                className="absolute inset-0 text-8xl font-bold font-mono tracking-wider text-primary/50"
                animate={{ x: [-3, 3, -3], opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1.5 }}
              >
                {glitchText}
              </motion.h1>
              <motion.h1 
                className="absolute inset-0 text-8xl font-bold font-mono tracking-wider text-destructive/50"
                animate={{ x: [3, -3, 3], opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1.8 }}
              >
                {glitchText}
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Page Not Found
              </h2>
              <p className="text-sm font-mono text-primary mb-4">
                ERROR: ROUTE_NOT_EXIST
              </p>
              <p className="text-muted-foreground mb-4">
                Oops! Looks like you've ventured into the void. 
                This page doesn't exist or has been eaten by bugs. 🐛
              </p>
              
              {/* Countdown timer */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">
                  Redirecting in {countdown}s...
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild className="w-full group" size="lg">
              <Link to="/">
                <Home className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Take Me Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="w-full group"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-6 pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-muted-foreground font-mono">
              PATH: {location.pathname}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Don't worry, even the best hackers get lost sometimes. 😎
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  RotateCcw, 
  Trophy, 
  Coffee,
  Bug,
  Zap,
  RefreshCw,
  Target,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';

const MiniGames = () => {
  const [currentGame, setCurrentGame] = useState<'none' | 'bubbles' | 'robot' | 'whack'>('none');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScores, setHighScores] = useState({
    bubbles: 0,
    robot: 0,
    whack: 0
  });

  // Bubble Pop Game
  const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const bubbleGameRef = useRef<HTMLDivElement>(null);

  // Robot Control Game
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 50 });
  const [collectibles, setCollectibles] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);

  // Whack-a-Bug Game
  const [bugs, setBugs] = useState<Array<{id: number, active: boolean, position: number}>>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const startGame = (game: 'bubbles' | 'robot' | 'whack') => {
    setCurrentGame(game);
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    
    if (game === 'bubbles') {
      generateBubbles();
    } else if (game === 'robot') {
      generateCollectibles();
      setRobotPosition({ x: 50, y: 50 });
    } else if (game === 'whack') {
      initWhackGame();
    }
  };

  const endGame = () => {
    setGameActive(false);
    if (score > highScores[currentGame as keyof typeof highScores]) {
      setHighScores(prev => ({
        ...prev,
        [currentGame]: score
      }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 280,
      y: Math.random() * 280,
      size: Math.random() * 30 + 20
    }));
    setBubbles(newBubbles);
  };

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 10);
    if (bubbles.length <= 1) {
      generateBubbles();
    }
  };

  const generateCollectibles = () => {
    const items = ['☕', '🐛', '💻', '🔒', '⚡'];
    const newCollectibles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 250,
      y: Math.random() * 250,
      type: items[Math.floor(Math.random() * items.length)]
    }));
    setCollectibles(newCollectibles);
  };

  const moveRobot = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameActive) return;
    
    setRobotPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'up': newY = Math.max(0, prev.y - 20); break;
        case 'down': newY = Math.min(250, prev.y + 20); break;
        case 'left': newX = Math.max(0, prev.x - 20); break;
        case 'right': newX = Math.min(250, prev.x + 20); break;
      }
      
      // Check collisions
      setCollectibles(current => {
        const remaining = current.filter(item => {
          const distance = Math.sqrt((item.x - newX) ** 2 + (item.y - newY) ** 2);
          if (distance < 30) {
            setScore(prev => prev + 15);
            return false;
          }
          return true;
        });
        
        if (remaining.length === 0) {
          setTimeout(generateCollectibles, 500);
        }
        return remaining;
      });
      
      return { x: newX, y: newY };
    });
  };

  const initWhackGame = () => {
    const newBugs = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      active: false,
      position: i
    }));
    setBugs(newBugs);
    
    // Randomly activate bugs
    const bugInterval = setInterval(() => {
      if (!gameActive) {
        clearInterval(bugInterval);
        return;
      }
      
      setBugs(prev => prev.map(bug => ({
        ...bug,
        active: Math.random() > 0.7
      })));
    }, 800);
  };

  const whackBug = (id: number) => {
    setBugs(prev => prev.map(bug => 
      bug.id === id && bug.active 
        ? { ...bug, active: false }
        : bug
    ));
    setScore(prev => prev + 20);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentGame === 'robot' && gameActive) {
        switch (e.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            e.preventDefault();
            moveRobot('up');
            break;
          case 's':
          case 'arrowdown':
            e.preventDefault();
            moveRobot('down');
            break;
          case 'a':
          case 'arrowleft':
            e.preventDefault();
            moveRobot('left');
            break;
          case 'd':
          case 'arrowright':
            e.preventDefault();
            moveRobot('right');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentGame, gameActive]);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Mini <span className="text-primary">Games</span> & Fun
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Take a break from serious stuff! Play some silly games and wake up your browser 🎮
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-purple-400" />
                  Choose Your Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => startGame('bubbles')}
                  className="w-full justify-start"
                  variant={currentGame === 'bubbles' ? 'primary' : 'outline'}
                >
                  🫧 Bubble Pop Madness
                </Button>
                <Button 
                  onClick={() => startGame('robot')}
                  className="w-full justify-start"
                  variant={currentGame === 'robot' ? 'primary' : 'outline'}
                >
                  🤖 Robot Collector (Use WASD!)
                </Button>
                <Button 
                  onClick={() => startGame('whack')}
                  className="w-full justify-start"
                  variant={currentGame === 'whack' ? 'primary' : 'outline'}
                >
                  🔨 Whack-a-Bug
                </Button>
              </CardContent>
            </Card>

            {/* High Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  High Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>🫧 Bubbles</span>
                  <Badge variant="neon">{highScores.bubbles}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>🤖 Robot</span>
                  <Badge variant="neon">{highScores.robot}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>🔨 Whack-a-Bug</span>
                  <Badge variant="neon">{highScores.whack}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2">
            <Card className="h-[500px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    {currentGame === 'none' && <Target className="w-5 h-5" />}
                    {currentGame === 'bubbles' && '🫧'}
                    {currentGame === 'robot' && '🤖'}
                    {currentGame === 'whack' && '🔨'}
                    {currentGame === 'none' ? 'Game Arena' : 
                     currentGame === 'bubbles' ? 'Bubble Pop Madness' :
                     currentGame === 'robot' ? 'Robot Collector' : 'Whack-a-Bug'}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    {gameActive && (
                      <>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {timeLeft}s
                        </Badge>
                        <Badge variant="success">
                          Score: {score}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[400px] relative">
                {currentGame === 'none' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Gamepad2 className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                      <p className="text-foreground/60">Select a game to start playing!</p>
                      <p className="text-sm text-foreground/60 mt-2">
                        Perfect for procrastinating from real work 😄
                      </p>
                    </div>
                  </div>
                )}

                {/* Bubble Pop Game */}
                {currentGame === 'bubbles' && (
                  <div 
                    ref={bubbleGameRef}
                    className="relative w-full h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg overflow-hidden"
                  >
                    {bubbles.map(bubble => (
                      <motion.div
                        key={bubble.id}
                        className="absolute bg-gradient-to-br from-cyan-400/60 to-blue-500/60 rounded-full cursor-pointer border-2 border-cyan-300/30"
                        style={{
                          left: bubble.x,
                          top: bubble.y,
                          width: bubble.size,
                          height: bubble.size
                        }}
                        onClick={() => popBubble(bubble.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.6, 0.8, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Robot Collector Game */}
                {currentGame === 'robot' && (
                  <div className="relative w-full h-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg overflow-hidden">
                    {/* Robot */}
                    <motion.div
                      className="absolute text-2xl z-10"
                      style={{
                        left: robotPosition.x,
                        top: robotPosition.y
                      }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🤖
                    </motion.div>
                    
                    {/* Collectibles */}
                    {collectibles.map(item => (
                      <motion.div
                        key={item.id}
                        className="absolute text-xl"
                        style={{
                          left: item.x,
                          top: item.y
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        {item.type}
                      </motion.div>
                    ))}
                    
                    {gameActive && (
                      <div className="absolute bottom-4 left-4 text-xs text-foreground/60">
                        Use WASD or arrow keys to move!
                      </div>
                    )}
                  </div>
                )}

                {/* Whack-a-Bug Game */}
                {currentGame === 'whack' && (
                  <div className="grid grid-cols-3 gap-4 h-full p-4">
                    {bugs.map(bug => (
                      <motion.div
                        key={bug.id}
                        className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg flex items-center justify-center cursor-pointer border-2 border-red-400/20"
                        onClick={() => whackBug(bug.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="text-4xl"
                          animate={{
                            scale: bug.active ? [0.8, 1.2, 0.8] : 0,
                            opacity: bug.active ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {bug.active ? '🐛' : '🕳️'}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniGames;
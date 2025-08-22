import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smile, 
  Coffee, 
  Skull, 
  Zap, 
  Heart,
  RefreshCw,
  Shuffle,
  Download
} from 'lucide-react';

const EasterEggs = () => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMood, setCurrentMood] = useState('happy');
  const [konami, setKonami] = useState('');
  const [easterEggFound, setEasterEggFound] = useState<string[]>([]);
  const [ghibliCharacter, setGhibliCharacter] = useState('');
  const [terminalMode, setTerminalMode] = useState(false);

  const moods = {
    happy: { emoji: '😊', text: 'Living my best dev life!', color: 'text-green-400' },
    tired: { emoji: '😴', text: 'Need... more... coffee...', color: 'text-yellow-400' },
    panic: { emoji: '😱', text: 'FINALS PANIC MODE ACTIVATED!', color: 'text-red-400' },
    coffee: { emoji: '☕', text: 'Caffeine levels: MAXIMUM', color: 'text-orange-400' },
    hacker: { emoji: '😎', text: 'Hack the planet! (ethically)', color: 'text-cyber-green' },
    debugging: { emoji: '🐛', text: 'Why... why won\'t you work?!', color: 'text-purple-400' }
  };

  const ghibliCharacters = [
    '🔥 Calcifer - Because you\'re fired up about coding!',
    '🌙 Totoro - Big, fluffy, and comforting like good documentation',
    '✨ Kiki - Delivering code magic across the digital sky',
    '🗡️ San - Fighting bugs in the code forest',
    '🏰 Howl - Your code is beautiful (when it works)',
    '🐱 Jiji - Silent but judgmental about your coding choices'
  ];

  const secretCodes = {
    'konami': '↑↑↓↓←→←→BA',
    'coffee': 'coffee',
    'debug': 'debug',
    'segfault': 'segfault'
  };

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "There are only 10 types of people: those who understand binary and those who don't 💻",
    "Why did the programmer quit his job? He didn't get arrays! 📊",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem 💡",
    "Why do Java developers wear glasses? Because they can't C# 👓"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      let konamiChar = '';
      
      switch(key) {
        case 'ArrowUp': konamiChar = '↑'; break;
        case 'ArrowDown': konamiChar = '↓'; break;
        case 'ArrowLeft': konamiChar = '←'; break;
        case 'ArrowRight': konamiChar = '→'; break;
        case 'b': case 'B': konamiChar = 'B'; break;
        case 'a': case 'A': konamiChar = 'A'; break;
        default: konamiChar = key;
      }
      
      setKonami(prev => {
        const newCode = (prev + konamiChar).slice(-10);
        
        // Check for secret codes
        if (newCode.includes(secretCodes.konami.slice(-8))) {
          foundEasterEgg('konami');
          setTerminalMode(true);
        }
        
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const foundEasterEgg = (egg: string) => {
    if (!easterEggFound.includes(egg)) {
      setEasterEggFound(prev => [...prev, egg]);
      
      // Trigger confetti or special effect
      if (typeof window !== 'undefined' && (window as any).confetti) {
        (window as any).confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const changeMood = () => {
    setClickCount(prev => prev + 1);
    const moodKeys = Object.keys(moods);
    const randomMood = moodKeys[Math.floor(Math.random() * moodKeys.length)];
    setCurrentMood(randomMood);
    
    if (clickCount === 9) {
      foundEasterEgg('mood-master');
    }
  };

  const generateGhibliCharacter = () => {
    const randomCharacter = ghibliCharacters[Math.floor(Math.random() * ghibliCharacters.length)];
    setGhibliCharacter(randomCharacter);
  };

  const triggerBlueScreen = () => {
    const blueScreen = document.createElement('div');
    blueScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #0000FF;
      color: white;
      font-family: 'Courier New', monospace;
      font-size: 16px;
      padding: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    `;
    
    // Create content safely without innerHTML
    const container = document.createElement('div');
    
    const title = document.createElement('h1');
    title.style.cssText = 'font-size: 24px; margin-bottom: 20px;';
    title.textContent = '😱 SEGMENTATION FAULT 😱';
    
    const description = document.createElement('p');
    description.textContent = 'A problem has been detected and your portfolio has been shut down to prevent damage.';
    
    const blameText = document.createElement('p');
    blameText.textContent = 'BLAME_THE_USER';
    
    const techInfo = document.createElement('p');
    techInfo.textContent = 'Technical information:';
    
    const errorCode = document.createElement('p');
    errorCode.textContent = '*** STOP: 0x0000001E (0xC0000005, 0xFDE38AF7, 0x0000001, 0x7E8B0EB4)';
    
    const clickPrompt = document.createElement('p');
    clickPrompt.style.fontSize = '12px';
    clickPrompt.textContent = "Just kidding! Click anywhere to continue 😄";
    
    // Append elements with line breaks
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(document.createElement('br'));
    container.appendChild(blameText);
    container.appendChild(document.createElement('br'));
    container.appendChild(techInfo);
    container.appendChild(errorCode);
    container.appendChild(document.createElement('br'));
    container.appendChild(clickPrompt);
    
    blueScreen.appendChild(container);
    
    blueScreen.onclick = () => {
      document.body.removeChild(blueScreen);
      foundEasterEgg('blue-screen');
    };
    
    document.body.appendChild(blueScreen);
  };

  const currentMoodData = moods[currentMood as keyof typeof moods];

  // Terminal Mode Component
  const TerminalMode = () => (
    <div className="fixed inset-0 z-[9999] bg-black text-cyber-green font-mono overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-matrix-rain text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <div key={j} className="block">
                {String.fromCharCode(Math.random() * 94 + 33)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Terminal Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <div className="text-6xl md:text-8xl font-bold text-cyber-green animate-cyber-pulse">
            YOU ARE A G
          </div>
          
          <div className="text-xl md:text-2xl text-cyber-green/80 animate-fade-in-up">
            Matrix access granted... Welcome to the code
          </div>
          
          <div className="text-sm text-cyber-green/60 mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            ► SYSTEM STATUS: ELITE HACKER MODE ACTIVATED
          </div>
          
          <div className="text-sm text-cyber-green/60 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            ► ACCESS LEVEL: LEGENDARY
          </div>
          
          <motion.button
            onClick={() => setTerminalMode(false)}
            className="mt-8 px-6 py-3 border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            [ EXIT MATRIX ]
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  if (terminalMode) {
    return <TerminalMode />;
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-indigo-900/10 to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Easter Eggs & <span className="text-primary">Hidden Fun</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Click around, try some key combos, and discover hidden jokes! 🥚✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mood Changer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-yellow-400" />
                  Mood Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  key={currentMood}
                >
                  {currentMoodData.emoji}
                </motion.div>
                <p className={`text-sm ${currentMoodData.color}`}>
                  {currentMoodData.text}
                </p>
                <Button onClick={changeMood} variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Change Mood ({clickCount}/10)
                </Button>
                {clickCount >= 10 && (
                  <Badge variant="success" className="animate-pulse">
                    Mood Master Unlocked! 🎭
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Ghibli Character Generator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Ghibli Character Match
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 text-center">
                  Discover which Studio Ghibli character you are today!
                </p>
                {ghibliCharacter && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-pink-500/10 rounded-lg text-center"
                  >
                    <p className="text-sm text-pink-400">{ghibliCharacter}</p>
                  </motion.div>
                )}
                <Button onClick={generateGhibliCharacter} variant="outline" className="w-full">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate Character
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secret Joke Generator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Programming Jokes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 text-center">
                  Get a random programming joke to brighten your day!
                </p>
                <Button 
                  onClick={() => {
                    const joke = jokes[Math.floor(Math.random() * jokes.length)];
                    alert(joke);
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Tell Me a Joke
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hidden Blue Screen Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Skull className="w-5 h-5 text-red-400" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 text-center">
                  Click this if you dare... 💀
                </p>
                <Button 
                  onClick={triggerBlueScreen}
                  variant="outline" 
                  className="w-full border-red-400/30 hover:border-red-400/50"
                >
                  <Skull className="w-4 h-4 mr-2" />
                  Assembly Code
                </Button>
                <p className="text-xs text-red-400/60 text-center">
                  (It&apos;s safe, I promise! 😉)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Easter Eggs Found */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="w-5 h-5 text-purple-400" />
                  Easter Eggs Discovered
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'konami', name: 'Konami Code', hint: 'Try ↑↑↓↓←→←→BA' },
                    { id: 'mood-master', name: 'Mood Master', hint: 'Click mood 10 times' },
                    { id: 'blue-screen', name: 'Blue Screen', hint: 'Click "Assembly Code"' },
                    { id: 'secret-nav', name: 'Secret Navigation', hint: 'Try WASD in robot game' }
                  ].map(egg => (
                    <div
                      key={egg.id}
                      className={`p-2 rounded-lg border text-center text-xs ${
                        easterEggFound.includes(egg.id)
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-muted/20 border-muted/30 text-foreground/60'
                      }`}
                    >
                      <div className="font-medium">{egg.name}</div>
                      <div className="text-xs opacity-60">{egg.hint}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-foreground/60">
                  Found {easterEggFound.length}/4 secrets! Keep exploring 🕵️‍♂️
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Hidden Konami Code Input Display */}
        {konami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <Badge variant="outline" className="font-mono">
              Input: {konami.slice(-10)}
            </Badge>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EasterEggs;
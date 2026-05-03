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
import confetti from 'canvas-confetti';

const EASTER_SECRET_CODES = {
  konami: '↑↑↓↓←→←→BA',
  coffee: 'coffee',
  debug: 'debug',
  segfault: 'segfault'
} as const;

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
    debugging: { emoji: '🐛', text: 'Why... why won\'t you work?!', color: 'text-purple-400' },
    excited: { emoji: '🤩', text: 'Code compiles on first try!', color: 'text-pink-400' },
    confused: { emoji: '🤔', text: 'This should work... shouldn\'t it?', color: 'text-indigo-400' },
    proud: { emoji: '😤', text: 'My code is art!', color: 'text-purple-500' },
    sleepy: { emoji: '😪', text: '3 AM coding session activated', color: 'text-blue-400' },
    motivated: { emoji: '💪', text: 'Ready to conquer this algorithm!', color: 'text-red-500' },
    zen: { emoji: '🧘', text: 'One with the code...', color: 'text-green-500' },
    caffeinated: { emoji: '⚡', text: 'Powered by pure caffeine!', color: 'text-yellow-500' },
    frustrated: { emoji: '😤', text: 'It was working yesterday!', color: 'text-orange-500' },
    genius: { emoji: '🧠', text: 'Big brain time!', color: 'text-cyan-400' },
    lazy: { emoji: '😑', text: 'TODO: Write better code', color: 'text-gray-400' },
    savage: { emoji: '😈', text: 'Deleting legacy code like...', color: 'text-red-600' },
    accomplished: { emoji: '🏆', text: 'Bug-free code achieved!', color: 'text-yellow-600' },
    overwhelmed: { emoji: '🤯', text: 'Too many tabs open!', color: 'text-purple-600' },
    focused: { emoji: '🎯', text: 'In the zone!', color: 'text-blue-500' },
    creative: { emoji: '🎨', text: 'Crafting elegant solutions', color: 'text-pink-500' },
    mysterious: { emoji: '🕵️', text: 'Hunting down mysterious bugs', color: 'text-indigo-500' },
    victorious: { emoji: '🎉', text: 'Deploy successful!', color: 'text-green-600' },
    nostalgic: { emoji: '🥺', text: 'Remember when this worked?', color: 'text-amber-400' },
    optimistic: { emoji: '🌟', text: 'This time it will work!', color: 'text-cyan-500' },
    philosophical: { emoji: '🤨', text: 'What is code but organized chaos?', color: 'text-slate-400' },
    determined: { emoji: '😠', text: 'I WILL make this work!', color: 'text-orange-600' },
    euphoric: { emoji: '🤤', text: 'Clean code gives me life', color: 'text-emerald-400' },
    paranoid: { emoji: '👀', text: 'Someone is watching my commits', color: 'text-red-300' },
    enlightened: { emoji: '✨', text: 'I finally understand recursion!', color: 'text-violet-400' },
    rebellious: { emoji: '🤘', text: 'Who needs documentation anyway?', color: 'text-rose-400' },
    humble: { emoji: '😇', text: 'Stack Overflow saved me again', color: 'text-blue-300' },
    dramatic: { emoji: '🎭', text: 'To debug or not to debug', color: 'text-purple-300' },
    athletic: { emoji: '🏃', text: 'Sprint through this code!', color: 'text-lime-400' },
    musical: { emoji: '🎵', text: 'My keyboard is my instrument', color: 'text-fuchsia-400' },
    magical: { emoji: '🪄', text: 'Abracadabra! Fix my code!', color: 'text-violet-500' },
    robotic: { emoji: '🤖', text: 'Beep boop, compiling...', color: 'text-gray-500' },
    pirate: { emoji: '🏴‍☠️', text: 'Arr! Ye code be broken!', color: 'text-amber-600' },
    ninja: { emoji: '🥷', text: 'Silent but deadly (bugs)', color: 'text-slate-600' },
    superhero: { emoji: '🦸', text: 'Saving the day, one commit at a time', color: 'text-blue-600' },
    chef: { emoji: '👨‍🍳', text: 'Cooking up some fresh code!', color: 'text-red-400' },
    detective: { emoji: '🔍', text: 'The case of the missing semicolon', color: 'text-amber-500' },
    wizard: { emoji: '🧙', text: 'Casting spells in JavaScript', color: 'text-indigo-600' },
    alien: { emoji: '👽', text: 'This code is not from this world', color: 'text-green-300' },
    vampire: { emoji: '🧛', text: 'I only code at night', color: 'text-red-700' },
    ghost: { emoji: '👻', text: 'Haunted by deprecated functions', color: 'text-gray-300' },
    unicorn: { emoji: '🦄', text: 'Magical code that actually works!', color: 'text-pink-300' },
    dragon: { emoji: '🐉', text: 'Breathing fire into my algorithms', color: 'text-orange-400' },
    phoenix: { emoji: '🔥', text: 'Rising from crashed code!', color: 'text-red-500' },
    warrior: { emoji: '⚔️', text: 'Battling bugs in production!', color: 'text-steel-400' },
    sage: { emoji: '👴', text: 'With great code comes great responsibility', color: 'text-emerald-600' }
  };

  const moodSongs = {
    happy: [
      '🎵 Happy - Pharrell Williams',
      '🎶 खुशियों का गीत - Lata Mangeshkar',
      '🎵 Good as Hell - Lizzo',
      '🎶 Zindagi Ek Safar - Kishore Kumar'
    ],
    tired: [
      '🎵 Tired - Alan Walker',
      '🎶 सुन रे पगली - Lata Mangeshkar',
      '🎵 Heavy - Linkin Park',
      '🎶 चल गुजारा - Kishore Kumar'
    ],
    panic: [
      '🎵 Stressed Out - Twenty One Pilots',
      '🎶 जब कोई बात बिगड़ जाए - Kumar Sanu',
      '🎵 Anxiety - Julia Michaels',
      '🎶 तेरे बिना जिंदगी से - Lata Mangeshkar'
    ],
    coffee: [
      '🎵 Coffee - BTS',
      '🎶 चाय गरम - Kishore Kumar',
      '🎵 But First, Coffee - Katy Perry',
      '🎶 कॉफी पीके - Arijit Singh'
    ],
    hacker: [
      '🎵 Technologic - Daft Punk',
      '🎶 कंप्यूटर जी - Udit Narayan',
      '🎵 Digital Love - Daft Punk',
      '🎶 टेक्नो तक धिमी - Badshah'
    ],
    debugging: [
      '🎵 Fix You - Coldplay',
      '🎶 कुछ तो गड़बड़ है - Shankar Mahadevan',
      '🎵 Help! - The Beatles',
      '🎶 समस्या का समाधान - Rahat Fateh Ali Khan'
    ],
    excited: [
      '🎵 Uptown Funk - Bruno Mars',
      '🎶 जश्न-ए-बहारां - Javed Ali',
      '🎵 Can\'t Stop the Feeling - Justin Timberlake',
      '🎶 खुशी के गीत - Shreya Ghoshal'
    ],
    confused: [
      '🎵 Somebody That I Used to Know - Gotye',
      '🎶 ये क्या हुआ - Alka Yagnik',
      '🎵 Mad World - Gary Jules',
      '🎶 समझ नहीं आता - Sonu Nigam'
    ],
    motivated: [
      '🎵 Eye of the Tiger - Survivor',
      '🎶 हौसला - Rahat Fateh Ali Khan',
      '🎵 Stronger - Kelly Clarkson',
      '🎶 जीत की आशा - Kailash Kher'
    ],
    zen: [
      '🎵 Weightless - Marconi Union',
      '🎶 ॐ नमः शिवाय - Hariharan',
      '🎵 Claire de Lune - Debussy',
      '🎶 शांति का गीत - Pandit Jasraj'
    ]
  };

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "There are only 10 types of people: those who understand binary and those who don't 💻",
    "Why did the programmer quit his job? He didn't get arrays! 📊",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem 💡",
    "Why do Java developers wear glasses? Because they can't C# 👓",
    "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
    "Why don't programmers like nature? It has too many bugs 🌿",
    "What's a programmer's favorite hangout place? The Foo Bar! 🍻",
    "How do you comfort a JavaScript bug? You console it! 🐞",
    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
    "What do you call a programmer from Finland? Nerdic! 🇫🇮",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25! 🎃",
    "What's the object-oriented way to become wealthy? Inheritance! 💰",
    "Why did the programmer go broke? Because he used up all his cache! 💸",
    "What do you get when you cross a computer and a lifeguard? A screensaver! 🏊",
    "Why don't developers trust stairs? They're always up to something! 🪜",
    "What's a computer's favorite beat? An algo-rhythm! 🎵",
    "Why did the developer get kicked out of school? For debugging during class! 🎓",
    "What do you call a sleeping bull at the computer? A bulldozer! 🐂",
    "Why was the math book sad? Because it had too many problems! 📚",
    "What's the best thing about a Boolean? Even if you're wrong, you're only off by a bit! ⚡",
    "Why do programmers hate nature? It has too many trees! 🌳",
    "What did the router say to the doctor? It hurts when IP! 🏥",
    "Why don't programmers like to go outside? The sun causes too much glare on their screens! ☀️",
    "What do you call a computer superhero? A screensaver! 🦸",
    "Why was the cell phone wearing glasses? It lost all its contacts! 📱",
    "What's a programmer's favorite type of music? Algo-rhythm and blues! 🎼",
    "Why do programmers prefer iOS development? Because it's Objective-C! 📱",
    "What do you call a programmer who doesn't comment their code? A monster! 👹",
    "Why did the programmer break up with the internet? Too many connection issues! 💔",
    "What's the difference between a programmer and a non-programmer? The programmer thinks there are 1024 meters in a kilometer! 📏",
    "Why don't developers ever pay full price? They always wait for the next version! 💵",
    "What do you call a factory that makes great programmers? A constructor! 🏭",
    "Why was the programmer cold? He left Windows open! 🥶",
    "What's a programmer's favorite place to hang out? The space bar! ⌨️",
    "Why don't programmers like to exercise? They get enough runtime! 🏃",
    "What did the Java code say to the C code? You've got no class! 👔",
    "Why was the programmer late to work? He got stuck in an infinite loop at breakfast! 🥞",
    "What do you call a programmer's pet? A cursor! 🐕",
    "Why don't programmers like going to parties? Too many people, not enough bandwidth! 🎉",
    "What's a programmer's favorite kind of tree? A binary tree! 🌲",
    "Why did the programmer get arrested? For killing a process! 👮",
    "What do you call a programmer who works at a bakery? A cookie developer! 🍪",
    "Why don't programmers make good comedians? Their jokes are too recursive! 😂",
    "What's the programmer's favorite type of exercise? Code running! 🏃‍♂️",
    "Why was the database administrator tired? Too many queries! 😴",
    "What do you call a programmer's favorite snack? Chips and salsa verde! 🥨",
    "Why don't programmers like the beach? Too much sand-boxing! 🏖️",
    "What's a programmer's favorite drink? Java! ☕",
    "Why did the programmer refuse to go skydiving? He was afraid of a fatal exception! 🪂",
    "What do you call a programmer who loves gardening? A root user! 🌱"
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
        if (newCode.includes(EASTER_SECRET_CODES.konami.slice(-8))) {
          foundEasterEgg('konami');
          setTerminalMode(true);
        }
        
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- foundEasterEgg is defined after handler; Konami stays one stable listener
  }, []);

  const foundEasterEgg = (egg: string) => {
    if (!easterEggFound.includes(egg)) {
      setEasterEggFound(prev => [...prev, egg]);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
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

  const generateSong = async () => {
    // Use hardcoded songs directly (removed Supabase dependency)
    const moodKey = currentMood as keyof typeof moodSongs;
    const songsForMood = moodSongs[moodKey] || moodSongs.happy;
    const randomSong = songsForMood[Math.floor(Math.random() * songsForMood.length)];
    setGhibliCharacter(randomSong);
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
          <div className="text-4xl md:text-6xl font-bold text-cyber-green animate-cyber-pulse">
            YOU ARE A REAL GAMER
          </div>
          
          <div className="text-xl md:text-2xl text-cyber-green/80 animate-fade-in-up">
            Konami Code Master... Welcome to the elite
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

  // Render Terminal Mode if activated
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

          {/* Song Generator */}
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
                  AI-Powered Songs Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 text-center">
                  Get personalized song recommendations from Gemini AI based on your current mood!
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
                <Button onClick={generateSong} variant="outline" className="w-full">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate Song
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
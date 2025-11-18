import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmojiReactorProps {
  projectId: number;
  className?: string;
}

const availableReactions = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '💯', label: 'Perfect' },
  { emoji: '🚀', label: 'Rocket' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '⭐', label: 'Star' }
];

export const EmojiReactor = ({ projectId, className }: EmojiReactorProps) => {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);

  const handleReaction = (emoji: string) => {
    // Update reaction count
    setReactions(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));

    // Create floating emoji animation
    const id = Date.now();
    const x = Math.random() * 60 - 30; // Random horizontal offset
    setFloatingEmojis(prev => [...prev, { id, emoji, x }]);

    // Remove floating emoji after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 1000);

    setShowReactionPicker(false);
  };

  const topReactions = Object.entries(reactions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className={cn("relative", className)}>
      {/* Floating emojis */}
      <AnimatePresence>
        {floatingEmojis.map(({ id, emoji, x }) => (
          <motion.div
            key={id}
            className="absolute text-2xl pointer-events-none z-50"
            initial={{ opacity: 1, y: 0, x }}
            animate={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ left: '50%', bottom: '100%' }}
          >
            {emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Reaction display and trigger */}
      <div className="flex items-center gap-2">
        {/* Show top reactions */}
        {topReactions.length > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-muted/30 rounded-full">
            {topReactions.map(([emoji, count]) => (
              <span key={emoji} className="text-sm flex items-center gap-1">
                {emoji}
                <span className="text-xs text-foreground/60">{count}</span>
              </span>
            ))}
          </div>
        )}

        {/* Reaction button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
            onClick={() => setShowReactionPicker(!showReactionPicker)}
          >
            <span className="text-lg">😊</span>
          </Button>

          {/* Reaction picker */}
          <AnimatePresence>
            {showReactionPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-2 shadow-lg flex gap-1 z-50"
              >
                {availableReactions.map(({ emoji, label }) => (
                  <motion.button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="text-2xl hover:scale-125 transition-transform p-1 rounded hover:bg-muted"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title={label}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

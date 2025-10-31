import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader4 from './ui/loader-4';

const WebsiteLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip loader entirely for better LCP
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Simplified Background - removed heavy animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 via-transparent to-cyber-blue/10"></div>
            {/* Animated Loader */}
            <motion.div
              className="mb-8 relative z-10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Loader4 />
            </motion.div>

            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-cyber-green mb-4 relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Loading Experience
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default WebsiteLoader;
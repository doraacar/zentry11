import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Zap } from 'lucide-react';

const CTABanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show banner after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-t-4 border-cyan-300"
        >
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black/20 flex items-center justify-center neon-glow">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-black text-lg uppercase tracking-wide">READY FOR DEPLOYMENT?</h3>
                <p className="text-sm font-light">
                  Initialize your automation protocol with a free strategic consultation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-black text-cyan-400 hover:bg-gray-900 px-8 py-3 font-bold transition-all duration-300 flex items-center gap-2 border border-black hover:border-cyan-400 uppercase tracking-wide"
              >
                INITIATE
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-black/20 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Animated border */}
          <div className="h-1 bg-gradient-to-r from-black via-cyan-600 to-black animate-pulse"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CTABanner;
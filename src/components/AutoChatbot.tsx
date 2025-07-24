import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const AutoChatbot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVoiceflowLoaded, setIsVoiceflowLoaded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Load Voiceflow chat widget script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(d, t) {
          var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
          v.onload = function() {
            window.voiceflow.chat.load({
              verify: { projectID: '683b4d229ea212a7c30fd04c' },
              url: 'https://general-runtime.voiceflow.com',
              versionID: 'production',
              voice: {
                url: "https://runtime-api.voiceflow.com"
              }
            });
            // Mark Voiceflow as loaded
            window.voiceflowLoaded = true;
          }
          v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
          v.type = "text/javascript"; 
          s.parentNode.insertBefore(v, s);
      })(document, 'script');
    `;
    document.head.appendChild(script);

    // Check if Voiceflow is loaded and show chatbot after 3 seconds
    const checkVoiceflowAndShow = () => {
      if ((window as any).voiceflowLoaded && !isDismissed) {
        setIsVoiceflowLoaded(true);
        setTimeout(() => {
          setIsVisible(true);
        }, 3000); // 3 second delay
      } else if (!isDismissed) {
        // Keep checking every 500ms until Voiceflow is loaded
        setTimeout(checkVoiceflowAndShow, 500);
      }
    };

    // Start checking after a short delay to ensure page is loaded
    setTimeout(checkVoiceflowAndShow, 100);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isDismissed]);

  const handleOpenChat = () => {
    // Open Voiceflow chat
    if ((window as any).voiceflow?.chat?.open) {
      (window as any).voiceflow.chat.open();
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      x: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: prefersReducedMotion ? 0.1 : 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      x: 20,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && isVoiceflowLoaded && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-1 rounded-2xl shadow-2xl">
            <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 animate-pulse"></div>
              
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                aria-label="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative z-10 max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center neon-glow"
                  >
                    <MessageCircle className="w-6 h-6 text-black" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg">ZENTRY AI</h3>
                    <p className="text-gray-400 text-sm">Assistant Online</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Ready to deploy your automation systems? I'm here to help you get started with intelligent solutions.
                </p>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenChat}
                    className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 neon-glow"
                  >
                    START CHAT
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDismiss}
                    className="px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-lg text-sm transition-all duration-300"
                  >
                    Later
                  </motion.button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-500 rounded-full opacity-30"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoChatbot;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CandleProps {
  delay?: number;
  onBlowOut?: () => void;
}

const Candle = ({ delay = 0, onBlowOut }: CandleProps) => {
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowOut = () => {
    if (isLit) {
      setIsLit(false);
      setShowSmoke(true);
      onBlowOut?.();
      setTimeout(() => setShowSmoke(false), 1500);
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={handleBlowOut}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="relative mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-flame-yellow/30 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            
            {/* Flame shape */}
            <motion.div
              className="relative w-4 h-8 rounded-full candle-flame"
              animate={{
                scaleY: [1, 1.1, 0.95, 1.05, 1],
                scaleX: [1, 0.95, 1.05, 0.98, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "bottom center",
              }}
            >
              {/* Inner flame */}
              <motion.div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-foreground/80"
                animate={{
                  scaleY: [1, 1.15, 0.9, 1],
                  opacity: [0.9, 1, 0.85, 0.9],
                }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smoke */}
      <AnimatePresence>
        {showSmoke && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute -top-4 w-3 h-3 rounded-full bg-smoke/60"
                initial={{ y: 0, x: 0, scale: 0.5, opacity: 0.8 }}
                animate={{
                  y: -50 - i * 10,
                  x: [0, (i - 1) * 8, 0],
                  scale: [0.5, 1.5, 2],
                  opacity: [0.8, 0.4, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="w-0.5 h-3 bg-foreground/60 rounded-full" />

      {/* Candle body */}
      <motion.div
        className="relative w-6 h-16 rounded-t-sm rounded-b-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        }}
      >
        {/* Wax drip effect */}
        <div className="absolute top-0 left-1 w-2 h-4 bg-foreground/10 rounded-b-full" />
        <div className="absolute top-0 right-1 w-1.5 h-3 bg-foreground/10 rounded-b-full" />
        
        {/* Shine */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-foreground/20 to-transparent" />
      </motion.div>

      {/* Tooltip */}
      {isLit && (
        <motion.span
          className="absolute -bottom-8 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          initial={{ opacity: 0 }}
        >
          Click to blow out!
        </motion.span>
      )}
    </motion.div>
  );
};

export default Candle;

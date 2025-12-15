import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CandleProps {
  delay?: number;
  onBlowOut?: () => void;
}

const Candle = memo(({ delay = 0, onBlowOut }: CandleProps) => {
  const [isLit, setIsLit] = useState(true);

  const handleBlowOut = () => {
    if (isLit) {
      setIsLit(false);
      onBlowOut?.();
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
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
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-3 rounded-full bg-flame-yellow/30 blur-lg animate-pulse" />
            <div className="w-3 h-6 rounded-full candle-flame animate-flicker will-change-transform" style={{ transformOrigin: "bottom center" }}>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-foreground/70" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="w-0.5 h-2.5 bg-foreground/60 rounded-full" />

      {/* Candle body */}
      <div
        className="w-5 h-14 rounded-t-sm rounded-b-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)" }}
      >
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-foreground/15 to-transparent rounded-lg" />
      </div>

      {isLit && (
        <span className="absolute -bottom-6 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Click to blow!
        </span>
      )}
    </motion.div>
  );
});

Candle.displayName = "Candle";

export default Candle;

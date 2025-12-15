import { useState } from "react";
import { motion } from "framer-motion";

interface BalloonProps {
  color: string;
  initialX: number;
  initialY: number;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

const Balloon = ({ color, initialX, initialY, delay = 0, size = "md" }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);

  const sizeClasses = {
    sm: "w-12 h-14",
    md: "w-16 h-20",
    lg: "w-20 h-24",
  };

  const handlePop = () => {
    setIsPopped(true);
  };

  if (isPopped) {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: initialX, top: initialY }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pop particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.cos((i * 45 * Math.PI) / 180) * 60,
              y: Math.sin((i * 45 * Math.PI) / 180) * 60,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
        <span className="text-2xl">💥</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: initialX, top: initialY }}
      initial={{ opacity: 0, y: 100, scale: 0 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      transition={{ 
        delay, 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.1 }}
      onClick={handlePop}
    >
      <motion.div
        animate={{
          y: [0, -15, -8, -20, 0],
          x: [0, 5, -3, 3, 0],
          rotate: [-3, 3, -2, 2, -3],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      >
        {/* Balloon body */}
        <div
          className={`${sizeClasses[size]} rounded-full relative overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}aa 100%)`,
            boxShadow: `0 10px 30px ${color}40, inset -5px -10px 20px ${color}40`,
          }}
        >
          {/* Shine */}
          <div 
            className="absolute top-3 left-3 w-4 h-6 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)",
            }}
          />
          {/* Secondary shine */}
          <div 
            className="absolute top-6 left-5 w-2 h-3 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Balloon knot */}
        <div 
          className="w-3 h-3 mx-auto -mt-1 rotate-45"
          style={{ backgroundColor: color }}
        />

        {/* String */}
        <motion.svg
          className="absolute left-1/2 -translate-x-1/2 w-1 h-24"
          viewBox="0 0 4 96"
          animate={{
            d: [
              "M2 0 Q 0 24 2 48 Q 4 72 2 96",
              "M2 0 Q 4 24 2 48 Q 0 72 2 96",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            d="M2 0 Q 0 24 2 48 Q 4 72 2 96"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            fill="none"
          />
        </motion.svg>

        {/* Pop hint */}
        <motion.span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          Pop me!
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Balloon;

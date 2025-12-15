import { useState, memo } from "react";
import { motion } from "framer-motion";

interface BalloonProps {
  color: string;
  initialX: number;
  initialY: number;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

const Balloon = memo(({ color, initialX, initialY, delay = 0, size = "md" }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-12",
    md: "w-14 h-16",
    lg: "w-16 h-20",
  };

  if (isPopped) {
    return (
      <div
        className="absolute pointer-events-none text-2xl animate-scale-out"
        style={{ left: initialX, top: initialY }}
      >
        💥
      </div>
    );
  }

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: initialX, top: initialY }}
      initial={{ opacity: 0, y: 50, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 150 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setIsPopped(true)}
    >
      <div className="animate-float-balloon will-change-transform">
        {/* Balloon body */}
        <div
          className={`${sizeClasses[size]} rounded-full relative`}
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
            boxShadow: `0 8px 20px ${color}30`,
          }}
        >
          <div 
            className="absolute top-2 left-2 w-3 h-4 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
          />
        </div>
        <div className="w-2.5 h-2.5 mx-auto -mt-1 rotate-45" style={{ backgroundColor: color }} />
        <div className="w-px h-16 mx-auto bg-muted-foreground/50" />
      </div>
    </motion.div>
  );
});

Balloon.displayName = "Balloon";

export default Balloon;

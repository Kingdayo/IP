import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LoadingAnimation = () => {
  const { shouldReduceAnimations } = useReducedMotion();
  const particleCount = shouldReduceAnimations ? 6 : 8;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative">
        {/* Ring of particles using CSS */}
        <div className="relative w-32 h-32">
          {particles.map((i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2.5 h-2.5 rounded-full bg-primary animate-pulse will-change-transform"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * (360 / particleCount)}deg) translateY(-50px)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Center pulsing cake */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl animate-heartbeat text-glow-strong">🎂</div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/4 text-center">
        <p className="text-xl font-display text-primary text-glow tracking-wider animate-pulse">
          Preparing something special...
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;

import { motion } from "framer-motion";

const LoadingAnimation = () => {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  const innerParticles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative">
        {/* Outer ring of particles */}
        <div className="relative w-40 h-40">
          {particles.map((i) => (
            <motion.div
              key={`outer-${i}`}
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-6px",
                marginTop: "-6px",
              }}
              animate={{
                x: Math.cos((i * 30 * Math.PI) / 180) * 70,
                y: Math.sin((i * 30 * Math.PI) / 180) * 70,
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Inner ring of particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {innerParticles.map((i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute w-2 h-2 rounded-full bg-accent"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
              animate={{
                x: Math.cos((i * 45 * Math.PI) / 180 + Math.PI / 4) * 35,
                y: Math.sin((i * 45 * Math.PI) / 180 + Math.PI / 4) * 35,
                scale: [1.2, 0.8, 1.2],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Center pulsing heart */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-5xl"
            animate={{
              scale: [1, 1.2, 1, 1.15, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-glow-strong">🎂</span>
          </motion.div>
        </div>

        {/* Orbiting sparkles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 text-gold"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <motion.span
              className="absolute"
              style={{
                transform: `translateX(${55 + i * 15}px)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ✨
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-1/4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-2xl font-display text-primary text-glow tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Preparing something special...
        </motion.p>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [0.6, 1, 0.6],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;

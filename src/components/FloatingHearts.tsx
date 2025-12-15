import { motion } from "framer-motion";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 12 + Math.random() * 16,
    opacity: 0.2 + Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-10vh",
            rotate: [0, 15, -15, 10, -10, 0],
            x: [0, 30, -30, 20, -20, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            },
            rotate: {
              duration: heart.duration / 2,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            },
            x: {
              duration: heart.duration / 2,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            },
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;

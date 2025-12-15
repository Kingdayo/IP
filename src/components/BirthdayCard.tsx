import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Candle from "./Candle";
import Balloon from "./Balloon";
import Confetti from "./Confetti";
import FloatingHearts from "./FloatingHearts";
import SparkleEffect from "./SparkleEffect";

const BirthdayCard = () => {
  const [candlesBlownOut, setCandlesBlownOut] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const totalCandles = 5;

  useEffect(() => {
    if (candlesBlownOut === totalCandles && !showWish) {
      setShowWish(true);
      setShowConfetti(true);
    }
  }, [candlesBlownOut, showWish]);

  const handleCandleBlowOut = () => {
    setCandlesBlownOut((prev) => prev + 1);
  };

  const balloons = [
    { color: "#ff1493", x: 50, y: 100, size: "lg" as const },
    { color: "#ff69b4", x: 150, y: 150, size: "md" as const },
    { color: "#da70d6", x: -30, y: 180, size: "sm" as const },
    { color: "#ff1493", x: 250, y: 120, size: "md" as const },
    { color: "#ffb6c1", x: -80, y: 80, size: "lg" as const },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background p-4">
      {/* Background effects */}
      <FloatingHearts />
      <SparkleEffect />
      <Confetti trigger={showConfetti} />

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((balloon, i) => (
          <div key={i} className="pointer-events-auto">
            <Balloon
              color={balloon.color}
              initialX={balloon.x < 0 ? window.innerWidth + balloon.x : balloon.x}
              initialY={balloon.y}
              delay={i * 0.2}
              size={balloon.size}
            />
          </div>
        ))}
        {/* Right side balloons */}
        {balloons.map((balloon, i) => (
          <div key={`right-${i}`} className="pointer-events-auto">
            <Balloon
              color={balloon.color}
              initialX={window.innerWidth - balloon.x - 100}
              initialY={balloon.y + 50}
              delay={i * 0.2 + 0.5}
              size={balloon.size}
            />
          </div>
        ))}
      </div>

      {/* Main card */}
      <motion.div
        className="relative z-10 glassmorphism rounded-3xl p-8 md:p-12 max-w-2xl w-full box-glow"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-3xl animate-heartbeat">🎀</div>
        <div className="absolute top-4 right-4 text-3xl animate-heartbeat" style={{ animationDelay: "0.2s" }}>🎀</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-heartbeat" style={{ animationDelay: "0.4s" }}>🎀</div>
        <div className="absolute bottom-4 right-4 text-3xl animate-heartbeat" style={{ animationDelay: "0.6s" }}>🎀</div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-primary text-glow-strong mb-4"
            animate={{
              textShadow: [
                "0 0 20px hsl(330 100% 60% / 0.8), 0 0 40px hsl(330 100% 60% / 0.6)",
                "0 0 30px hsl(330 100% 60% / 1), 0 0 60px hsl(330 100% 60% / 0.8)",
                "0 0 20px hsl(330 100% 60% / 0.8), 0 0 40px hsl(330 100% 60% / 0.6)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy Birthday!
          </motion.h1>
          <motion.div
            className="flex justify-center gap-2 text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            🎉 🎊 🥳 🎊 🎉
          </motion.div>
        </motion.div>

        {/* Cake section */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Cake */}
          <div className="relative mx-auto w-64 md:w-80">
            {/* Candles */}
            <div className="flex justify-center gap-6 mb-2 relative z-10">
              {Array.from({ length: totalCandles }).map((_, i) => (
                <Candle
                  key={i}
                  delay={0.8 + i * 0.1}
                  onBlowOut={handleCandleBlowOut}
                />
              ))}
            </div>

            {/* Cake layers */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Top layer */}
              <div 
                className="h-8 rounded-t-xl mx-8"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                }}
              >
                <div className="absolute top-2 left-10 right-10 h-1 bg-foreground/20 rounded-full" />
              </div>
              
              {/* Frosting drips */}
              <div className="relative h-4 mx-6 overflow-visible">
                <div 
                  className="absolute inset-x-0 top-0 h-full"
                  style={{ background: "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(330 100% 75%) 100%)" }}
                />
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-6 rounded-b-full"
                    style={{
                      left: `${10 + i * 14}%`,
                      background: "linear-gradient(180deg, hsl(330 100% 75%) 0%, hsl(var(--primary)) 100%)",
                    }}
                    animate={{ height: [24, 28, 24] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Middle layer */}
              <div 
                className="h-12 mx-4"
                style={{
                  background: "linear-gradient(180deg, hsl(330 80% 85%) 0%, hsl(330 70% 80%) 100%)",
                }}
              >
                <div className="flex justify-around items-center h-full px-4">
                  {["💖", "🌸", "💖", "🌸", "💖"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom layer */}
              <div 
                className="h-14 rounded-b-2xl"
                style={{
                  background: "linear-gradient(180deg, hsl(330 60% 75%) 0%, hsl(330 50% 65%) 100%)",
                }}
              >
                <div className="flex justify-around items-center h-full px-6">
                  {["✨", "💝", "✨", "💝", "✨", "💝", "✨"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-base"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Cake plate */}
              <div 
                className="h-3 -mx-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--gold)) 0%, hsl(35 80% 40%) 100%)",
                  boxShadow: "0 4px 20px hsl(var(--gold) / 0.3)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-muted-foreground font-medium mb-2">
            Candles blown out: {candlesBlownOut} / {totalCandles}
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(candlesBlownOut / totalCandles) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Wish message */}
        <AnimatePresence>
          {showWish && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="p-6 rounded-2xl glassmorphism box-glow-intense"
                animate={{
                  boxShadow: [
                    "0 0 30px hsl(330 100% 60% / 0.5)",
                    "0 0 60px hsl(330 100% 60% / 0.7)",
                    "0 0 30px hsl(330 100% 60% / 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.p
                  className="text-2xl md:text-3xl font-display text-foreground mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Make a Wish! ✨
                </motion.p>
                <p className="text-lg text-muted-foreground">
                  May all your dreams come true! 💫
                </p>
                <motion.div
                  className="mt-4 flex justify-center gap-3 text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {["🌟", "💖", "🎁", "💖", "🌟"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer message */}
        <motion.p
          className="text-center mt-8 text-muted-foreground italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Click the candles to blow them out! 🎂
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BirthdayCard;

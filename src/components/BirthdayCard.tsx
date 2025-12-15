import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Candle from "./Candle";
import Balloon from "./Balloon";
import Confetti from "./Confetti";
import FloatingHearts from "./FloatingHearts";
import SparkleEffect from "./SparkleEffect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
const BirthdayCard = () => {
  const [candlesBlownOut, setCandlesBlownOut] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const {
    shouldReduceAnimations
  } = useReducedMotion();
  const totalCandles = 5;
  useEffect(() => {
    if (candlesBlownOut === totalCandles && !showWish) {
      setShowWish(true);
      setShowConfetti(true);
    }
  }, [candlesBlownOut, showWish]);
  const balloons = useMemo(() => {
    const base = [{
      color: "#ff1493",
      x: 50,
      y: 100,
      size: "lg" as const
    }, {
      color: "#ff69b4",
      x: 150,
      y: 150,
      size: "md" as const
    }, {
      color: "#da70d6",
      x: -30,
      y: 180,
      size: "sm" as const
    }];
    if (shouldReduceAnimations) return base.slice(0, 2);
    return base;
  }, [shouldReduceAnimations]);
  return <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background p-4">
      <FloatingHearts />
      <SparkleEffect />
      <Confetti trigger={showConfetti} />

      {/* Simple pulsing background */}
      <div className="absolute inset-0 opacity-20 animate-pulse" style={{
      background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)"
    }} />

      {/* Balloons - reduced count */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((balloon, i) => <div key={i} className="pointer-events-auto">
            <Balloon color={balloon.color} initialX={balloon.x < 0 ? Math.min(window.innerWidth - 100, 300) : Math.min(balloon.x, window.innerWidth - 100)} initialY={balloon.y} delay={i * 0.15} size={balloon.size} />
          </div>)}
        {!shouldReduceAnimations && balloons.slice(0, 2).map((balloon, i) => <div key={`right-${i}`} className="pointer-events-auto">
            <Balloon color={balloon.color} initialX={Math.max(window.innerWidth - balloon.x - 100, 100)} initialY={balloon.y + 50} delay={i * 0.15 + 0.3} size={balloon.size} />
          </div>)}
      </div>

      {/* Main card */}
      <motion.div className="relative z-10 glassmorphism rounded-3xl p-6 md:p-10 max-w-xl w-full box-glow" initial={{
      opacity: 0,
      scale: 0.9,
      y: 30
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      type: "spring",
      stiffness: 120
    }}>
        {/* Decorative corners */}
        <div className="absolute top-3 left-3 text-2xl animate-heartbeat">🎀</div>
        <div className="absolute top-3 right-3 text-2xl animate-heartbeat" style={{
        animationDelay: "0.3s"
      }}>🎀</div>
        <div className="absolute bottom-3 left-3 text-2xl animate-heartbeat" style={{
        animationDelay: "0.6s"
      }}>🎀</div>
        <div className="absolute bottom-3 right-3 text-2xl animate-heartbeat" style={{
        animationDelay: "0.9s"
      }}>🎀</div>

        {/* Header */}
        <motion.div className="text-center mb-6" initial={{
        opacity: 0,
        y: -15
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary text-glow-strong mb-3">Happy Birthday Princess!</h1>
          <div className="flex justify-center gap-2 text-3xl">
            🎉 🎊 🥳 🎊 🎉
          </div>
        </motion.div>

        {/* Cake section */}
        <motion.div className="relative mb-6" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.4
      }}>
          <div className="relative mx-auto w-56 md:w-72">
            {/* Candles */}
            <div className="flex justify-center gap-5 mb-2 relative z-10">
              {Array.from({
              length: totalCandles
            }).map((_, i) => <Candle key={i} delay={0.5 + i * 0.08} onBlowOut={() => setCandlesBlownOut(p => p + 1)} />)}
            </div>

            {/* Cake layers - simplified */}
            <div className="relative">
              <div className="h-7 rounded-t-xl mx-6" style={{
              background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)"
            }} />
              <div className="h-3 mx-4" style={{
              background: "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(330 100% 75%) 100%)"
            }} />
              <div className="h-10 mx-3" style={{
              background: "linear-gradient(180deg, hsl(330 80% 85%) 0%, hsl(330 70% 80%) 100%)"
            }}>
                <div className="flex justify-around items-center h-full px-3">
                  {["💖", "🌸", "💖", "🌸", "💖"].map((emoji, i) => <span key={i} className="text-base">{emoji}</span>)}
                </div>
              </div>
              <div className="h-12 rounded-b-2xl" style={{
              background: "linear-gradient(180deg, hsl(330 60% 75%) 0%, hsl(330 50% 65%) 100%)"
            }}>
                <div className="flex justify-around items-center h-full px-4">
                  {["✨", "💝", "✨", "💝", "✨"].map((emoji, i) => <span key={i} className="text-sm">{emoji}</span>)}
                </div>
              </div>
              <div className="h-2.5 -mx-1 rounded-full" style={{
              background: "linear-gradient(180deg, hsl(var(--gold)) 0%, hsl(35 80% 40%) 100%)"
            }} />
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div className="text-center mb-5" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }}>
          <p className="text-muted-foreground text-sm mb-2">Candles: {candlesBlownOut} / {totalCandles}</p>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full" initial={{
            width: 0
          }} animate={{
            width: `${candlesBlownOut / totalCandles * 100}%`
          }} transition={{
            duration: 0.3
          }} />
          </div>
        </motion.div>

        {/* Wish message */}
        <AnimatePresence>
          {showWish && <motion.div className="text-center" initial={{
          opacity: 0,
          scale: 0.9,
          y: 15
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0
        }} transition={{
          type: "spring",
          stiffness: 120
        }}>
              <div className="p-5 rounded-2xl glassmorphism box-glow-intense">
                <p className="text-xl md:text-2xl font-display text-foreground mb-3">✨ Make a Wish! ✨</p>
                <p className="text-base text-muted-foreground">May all your dreams come true! 💫</p>
                <div className="mt-3 flex justify-center gap-2 text-2xl">
                  {["🌟", "💖", "🎁", "💖", "🌟"].map((emoji, i) => <span key={i} className="animate-bounce" style={{
                animationDelay: `${i * 0.1}s`
              }}>{emoji}</span>)}
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        <motion.p className="text-center mt-6 text-muted-foreground text-sm italic" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1
      }}>
          Click the candles to blow them out! 🎂
        </motion.p>
      </motion.div>
    </div>;
};
export default BirthdayCard;
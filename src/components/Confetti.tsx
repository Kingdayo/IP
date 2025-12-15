import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  trigger?: boolean;
}

const Confetti = ({ trigger = false }: ConfettiProps) => {
  const hasTriggered = useRef(false);

  const fireConfetti = useCallback(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ff1493", "#ff69b4", "#ffb6c1", "#ffd700", "#ffffff", "#da70d6"];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from both sides
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.5, 0.5),
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.5, 0.5),
      });
    }, 250);

    // Big burst at the start
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      shapes: ["circle", "square", "star"],
      startVelocity: 45,
    });
  }, []);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null;
};

export default Confetti;

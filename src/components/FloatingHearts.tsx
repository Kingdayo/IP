import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FloatingHearts = () => {
  const { shouldReduceAnimations } = useReducedMotion();

  const hearts = useMemo(() => {
    const count = shouldReduceAnimations ? 6 : 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.2,
    }));
  }, [shouldReduceAnimations]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary text-base animate-float-heart will-change-transform"
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

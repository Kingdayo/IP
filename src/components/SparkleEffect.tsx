import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SparkleEffect = () => {
  const { shouldReduceAnimations } = useReducedMotion();
  
  const sparkles = useMemo(() => {
    const count = shouldReduceAnimations ? 8 : 15;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  }, [shouldReduceAnimations]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute text-sm animate-sparkle will-change-transform"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

export default SparkleEffect;

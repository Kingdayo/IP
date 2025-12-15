import { useState, useEffect } from "react";

export const useReducedMotion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    checkMobile();
    setPrefersReducedMotion(mediaQuery.matches);

    window.addEventListener("resize", checkMobile);
    mediaQuery.addEventListener("change", (e) => setPrefersReducedMotion(e.matches));

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return { isMobile, prefersReducedMotion, shouldReduceAnimations: isMobile || prefersReducedMotion };
};

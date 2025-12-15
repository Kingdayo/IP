import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingAnimation from "@/components/LoadingAnimation";
import BirthdayCard from "@/components/BirthdayCard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation key="loading" />}
      </AnimatePresence>
      
      {!isLoading && <BirthdayCard />}
    </>
  );
};

export default Index;

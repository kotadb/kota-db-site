"use client";

import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const Component = () => {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || width === 0 || height === 0) {
    return (
      <div className={cn("flex flex-col items-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800")} />
    );
  }

  return (
    <div className={cn("flex flex-col items-center")}>
        <UnicornScene 
        production={true} projectId="1grEuiVDSVmyvEMAYhA6" width={width} height={height} />
    </div>
  );
};
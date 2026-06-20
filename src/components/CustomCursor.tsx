"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for outer ring lag effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand on interactive elements
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "INPUT" || 
        target.tagName === "SELECT" || 
        target.tagName === "TEXTAREA" ||
        target.closest("a") || 
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-red rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Outer Lagging Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-brand-blue/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(220, 38, 38, 0.4)" : "rgba(30, 58, 138, 0.3)",
          backgroundColor: isHovered ? "rgba(220, 38, 38, 0.05)" : "rgba(30, 58, 138, 0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />
    </>
  );
}

"use client";

import { motion } from "framer-motion";

export default function AnimatedHeading({
  text,
  className = "",
  delay = 0,
}) {
  const letters = text.split("");

  return (
    <motion.h2
      className={`relative font-black text-[3.7em] leading-none ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: 2.75,
        delay,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "easeOut",
        times: [0, 0.64, 1],
      }}
    >
      <span className="relative inline-block overflow-hidden pt-[0.2em] pr-[0.05em] pb-[0.1em]">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block leading-none"
            style={{
              transformOrigin: "0 100%",
            }}
            initial={{
              y: "1.1em",
              x: "0.55em",
              rotateZ: 180,
            }}
            animate={{
              y: 0,
              x: 0,
              rotateZ: 0,
            }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
}
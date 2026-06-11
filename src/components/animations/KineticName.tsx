"use client";

import { motion } from "framer-motion";

const letters = "Nous NLP".split("");

export default function KineticName() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className={`inline-block ${letter === " " ? "w-4 sm:w-6 md:w-8" : ""}`}
            style={{ color: "#DC2626" }}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1 + 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

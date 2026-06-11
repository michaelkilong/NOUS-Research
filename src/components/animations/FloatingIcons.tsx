"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Brain, Code2, Database, Globe, Layers, MessageSquare } from "lucide-react";

const icons = [
  { Icon: Brain, label: "AI" },
  { Icon: Code2, label: "Code" },
  { Icon: Database, label: "Data" },
  { Icon: Globe, label: "Web" },
  { Icon: Layers, label: "Stack" },
  { Icon: MessageSquare, label: "NLP" },
];

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  iconIndex: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingIcons() {
  const [items, setItems] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const generated: FloatingIcon[] = icons.map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      iconIndex: i,
      size: Math.random() * 20 + 24,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => {
        const { Icon } = icons[item.iconIndex];
        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={item.size}
              className="text-primary/20"
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

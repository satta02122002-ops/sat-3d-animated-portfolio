"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingTitles({ titles }: { titles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % titles.length), 2400);
    return () => clearInterval(t);
  }, [titles.length]);

  return (
    <div className="mt-3 flex h-9 items-center">
      <span className="mr-3 font-mono text-[10px] uppercase tracking-[0.4em] text-silver-300">
        Role
      </span>
      <span className="mr-3 inline-block h-4 w-px bg-electric/40" />
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[i]}
          initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-gradient font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          {titles[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

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
    <div className="mt-3 flex h-10 items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-silver-300/80">
        Role
      </span>
      <span className="inline-block h-4 w-px bg-electric/40" />
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[i]}
          initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-gradient font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          {titles[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

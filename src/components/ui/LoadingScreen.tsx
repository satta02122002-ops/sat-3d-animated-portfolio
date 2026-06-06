"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="relative h-20 w-20"
            >
              <span className="absolute inset-0 rounded-full border border-electric/40" />
              <span className="absolute inset-2 rounded-full border border-electric/30" />
              <span className="absolute inset-4 rounded-full border border-electric/50" />
              <span className="absolute left-1/2 top-0 -ml-1 h-2 w-2 rounded-full bg-electric shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-electric"
            >
              Initializing Logistics Grid
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

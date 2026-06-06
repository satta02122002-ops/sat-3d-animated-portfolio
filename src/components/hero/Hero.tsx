"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, ExternalLink, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { heroCopy, profile } from "@/data/portfolio";
import { RotatingTitles } from "./RotatingTitles";

const Globe3D = dynamic(() => import("./Globe3D").then((m) => m.Globe3D), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-electric/30 via-electric/10 to-transparent blur-2xl" />
    </div>
  ),
});

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      {/* Background grid + radial glow */}
      <div className="absolute inset-0 -z-20 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-20 bg-radial-fade" />
      <div className="absolute -left-32 top-1/3 -z-10 h-[36rem] w-[36rem] rounded-full bg-electric/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* 3D Globe absolute layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 md:pointer-events-auto md:opacity-100">
        <div className="absolute inset-0 mx-auto h-full w-full max-w-[1500px]">
          <Globe3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
      </div>

      <div className="container-x relative flex min-h-screen items-center pb-20 pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.35em] text-electric backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            Live · Dubai → Global Logistics Grid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-silver-50 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block text-gradient-silver">{heroCopy.headline.split("Through")[0]}</span>
            <span className="mt-2 block text-gradient">Through Operational Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-silver-300 sm:text-lg"
          >
            {heroCopy.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-electric">
              Identity
            </span>
            <div className="mt-2">
              <h2 className="font-display text-2xl font-semibold tracking-[0.2em] text-silver-50 sm:text-3xl">
                SATTANATHAN
              </h2>
              <RotatingTitles titles={profile.roles} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href={profile.resumeUrl}
              download
              variant="primary"
              icon={<Download size={16} strokeWidth={2.5} />}
            >
              Download Resume
            </MagneticButton>
            <MagneticButton
              href="#projects"
              variant="secondary"
              icon={<ExternalLink size={16} strokeWidth={2.5} />}
            >
              View Portfolio
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="ghost"
              icon={<Mail size={16} strokeWidth={2.5} />}
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.3em] text-silver-300"
          >
            <span><span className="text-electric">99%+</span> Inventory Accuracy</span>
            <span className="hidden h-3 w-px bg-white/15 sm:inline" />
            <span><span className="text-electric">98%</span> On-Time Delivery</span>
            <span className="hidden h-3 w-px bg-white/15 sm:inline" />
            <span><span className="text-electric">10+</span> Global Clients</span>
            <span className="hidden h-3 w-px bg-white/15 sm:inline" />
            <span><span className="text-electric">Zero</span> Customs Holds</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 1.8 } }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-silver-300/70"
      >
        Scroll · Initialize Profile
      </motion.div>
    </section>
  );
}

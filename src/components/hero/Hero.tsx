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
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
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
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
      </div>

      <div className="container-x relative w-full pb-24 pt-36 md:pt-32">
        <div className="max-w-3xl">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-electric/25 bg-electric/[0.06] px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.4em] text-electric/90 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            Live · Dubai → Global Logistics Grid
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-display text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold tracking-[-0.03em]"
          >
            <span className="block text-gradient-silver">
              Transforming Global Supply Chains
            </span>
            <span className="mt-2 block text-gradient">
              Through Operational Excellence
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 max-w-[640px] text-pretty text-[15px] leading-[1.75] text-silver-200/90 sm:text-[17px]"
          >
            {heroCopy.subheadline}
          </motion.p>

          {/* Identity block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10"
          >
            <span className="label-mono">Identity</span>
            <div className="mt-3">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.22em] text-silver-50 sm:text-[28px]">
                Sattanathan
              </h2>
              <RotatingTitles titles={profile.roles} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
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

          {/* Stats strip */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4"
          >
            {[
              { value: "99%+", label: "Inventory Accuracy" },
              { value: "98%", label: "On-Time Delivery" },
              { value: "10+", label: "Global Clients" },
              { value: "Zero", label: "Customs Holds" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xl font-semibold text-electric">
                  {s.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.25em] text-silver-300">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
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

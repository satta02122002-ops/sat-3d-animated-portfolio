"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail, MapPin, Phone, Languages, BadgeCheck } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Personal() {
  return (
    <section id="personal" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[400px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto h-[380px] w-[300px]"
          >
            {/* Holographic frame */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-[2rem] border border-electric/20"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(34,211,238,0.0), rgba(34,211,238,0.4), rgba(96,165,250,0.4), rgba(167,139,250,0.4), rgba(34,211,238,0.0))",
                maskImage:
                  "linear-gradient(#000,transparent)",
              }}
            />
            <div className="absolute inset-[2px] overflow-hidden rounded-[1.95rem] glass-strong">
              {/* Glow halo behind the photo */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-8 rounded-full bg-electric/25 blur-3xl"
              />
              {/* Profile photo */}
              <Image
                src="/profile.jpg"
                alt={`${profile.name} — ${profile.title}`}
                fill
                priority
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover"
              />
              {/* Subtle vignette so HUD reads on any photo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight/70" />
              {/* HUD overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-electric drop-shadow-[0_1px_4px_rgba(2,6,23,0.9)]">
                  ID · SC-001
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.3em] text-electric drop-shadow-[0_1px_4px_rgba(2,6,23,0.9)]">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-electric" /> Online
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-electric drop-shadow-[0_1px_4px_rgba(2,6,23,0.9)]">
                  <span>Dubai · 25.20°N</span>
                  <span>55.27°E</span>
                </div>
                {/* Scan line */}
                <div className="absolute left-0 right-0 h-px bg-electric/40 animate-scan-line" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="label-mono">Executive Profile</span>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em] text-silver-50">
              {profile.name}
            </h2>
            <p className="mt-2 text-[15px] font-medium text-electric">
              {profile.title}
            </p>
            <p className="mt-1 text-[13.5px] text-silver-300">
              {profile.subtitle}
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <MapPin size={15} className="shrink-0 text-electric" /> {profile.location}
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <BadgeCheck size={15} className="shrink-0 text-electric" /> UAE Resident (Active)
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <Phone size={15} className="shrink-0 text-electric" /> {profile.phone}
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <Mail size={15} className="shrink-0 text-electric" />
                <a href={`mailto:${profile.email}`} className="truncate hover:text-electric">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <Linkedin size={15} className="shrink-0 text-electric" />
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="truncate hover:text-electric">
                  linkedin.com/in/sat-logistics
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-[13.5px] text-silver-100">
                <Languages size={15} className="shrink-0 text-electric" /> Tamil · English · Malayalam · Hindi
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

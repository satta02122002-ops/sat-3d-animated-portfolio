"use client";

import { motion } from "framer-motion";
import {
  Route,
  Ship,
  Cpu,
  Target,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCards, profile } from "@/data/portfolio";

const ICONS: Record<string, LucideIcon> = { Route, Ship, Cpu, Target };

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="Operations Strategist · Automation Builder"
          description={profile.summary.split("Combines")[0]}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Target;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-glow"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent opacity-60" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-electric-glow/10 text-electric ring-1 ring-electric/30">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-lg font-semibold text-silver-50">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-300">
                  {card.description}
                </p>
                <span className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-electric/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

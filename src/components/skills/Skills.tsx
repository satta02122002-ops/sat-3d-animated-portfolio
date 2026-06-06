"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillsGroups } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills · Command Stack"
          title="Holographic Capability Matrix"
          description="Each panel measures fluency from years of hands-on operations — calibrated against on-the-job results, not theoretical familiarity."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillsGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: gi * 0.08 }}
              className="relative overflow-hidden rounded-2xl glass p-6"
            >
              {/* Scan line */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
                <div className="absolute inset-x-0 h-px bg-electric/50 animate-scan-line" />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold uppercase tracking-[0.15em] text-silver-50">
                  {group.category}
                </h3>
                <span
                  className={cn(
                    "h-2 w-12 rounded-full bg-gradient-to-r",
                    group.accent,
                  )}
                />
              </div>
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={item.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-silver-100">{item.name}</span>
                      <span className="font-mono text-[11px] text-electric">
                        {item.level}%
                      </span>
                    </div>
                    <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 1.1, delay: i * 0.05, ease: "easeOut" }}
                        className={cn("h-full rounded-full bg-gradient-to-r", group.accent)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

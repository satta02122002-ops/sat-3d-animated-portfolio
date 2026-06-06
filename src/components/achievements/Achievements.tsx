"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { achievements, awards, certifications } from "@/data/portfolio";

export function Achievements() {
  return (
    <section id="achievements" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Achievements · Impact"
          title="Numbers, Awards, and Certifications That Hold Weight"
          description="Quantified outcomes from the warehouse and freight desk — alongside the awards and credentials that back them up."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-2xl glass p-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />
              <span className="label-mono">{a.note}</span>
              <div className="mt-3 flex items-baseline gap-1">
                <Counter
                  to={a.value}
                  suffix={a.suffix}
                  className="text-gradient font-display text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-5xl"
                />
              </div>
              <p className="mt-3 text-[14px] font-medium text-silver-200">
                {a.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl glass p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric/10 text-electric ring-1 ring-electric/30">
                <Trophy size={18} />
              </span>
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-silver-50">
                Awards & Recognition
              </h3>
            </div>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li
                  key={a.name}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    <Star size={14} className="shrink-0 text-electric" />
                    <p className="font-display text-[14px] font-semibold leading-tight text-silver-50">
                      {a.name}
                    </p>
                  </div>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-electric">
                    {a.org}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-[1.65] text-silver-300">
                    {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl glass p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric/10 text-electric ring-1 ring-electric/30">
                <Award size={18} />
              </span>
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-silver-50">
                Certifications
              </h3>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-3.5"
                >
                  <p className="text-[13px] font-medium leading-snug text-silver-100">
                    {c.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.25em] text-electric">
                    {c.issuer}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="experience" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Five Years · Three Industries · One Operating Standard"
          description="From automotive JIT lines in Kanchipuram to Alstom's rolling-stock SAP power-user role in Coimbatore, to Dubai's international freight-forwarding desk — a single thread of disciplined execution."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical rail */}
          <div
            className="absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-electric/40 via-electric/30 to-transparent sm:left-[23px]"
            aria-hidden
          />

          <div className="space-y-6">
            {experience.map((job, i) => {
              const open = openIdx === i;
              return (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Node */}
                  <div className="absolute left-[11px] top-6 z-10 sm:left-[15px]">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-electric/40" />
                      <span className="relative h-3 w-3 rounded-full bg-electric shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
                    </span>
                  </div>

                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className={cn(
                      "group block w-full overflow-hidden rounded-2xl text-left transition-all",
                      open ? "glass-strong shadow-glow" : "glass hover:shadow-glow",
                    )}
                  >
                    <div className="flex items-start gap-4 p-5 sm:p-6">
                      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric ring-1 ring-electric/30">
                        <Briefcase size={18} strokeWidth={1.8} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-electric">
                            <Calendar className="mr-1.5 inline-block" size={11} />
                            {job.period}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-[17px] font-semibold leading-tight text-silver-50 sm:text-lg">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-electric">
                          {job.company}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-silver-300">
                          <MapPin size={11} /> {job.location}
                        </p>
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-electric/20 bg-electric/[0.06] px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.15em] text-electric/90"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <ChevronDown
                        size={18}
                        className={cn(
                          "mt-2 shrink-0 text-silver-300 transition-transform duration-300",
                          open && "rotate-180 text-electric",
                        )}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/5 p-5 pt-5 sm:p-6">
                            <div>
                              <span className="label-mono">Context</span>
                              <p className="mt-2 text-[14px] leading-[1.75] text-silver-300">
                                {job.context}
                              </p>
                            </div>
                            <div className="mt-5">
                              <span className="label-mono">Key Achievements</span>
                              <ul className="mt-3 space-y-3">
                                {job.achievements.map((a, ai) => (
                                  <li
                                    key={ai}
                                    className="flex gap-3 text-[14px] leading-[1.7] text-silver-200"
                                  >
                                    <span
                                      className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                                      aria-hidden
                                    />
                                    <span>{a}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

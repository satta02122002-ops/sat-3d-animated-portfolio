"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
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

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-electric/0 via-electric/40 to-electric/0 md:left-1/2" />
          <div className="space-y-10">
            {experience.map((job, i) => {
              const open = openIdx === i;
              const sideRight = i % 2 === 1;
              return (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.05 }}
                  className={cn(
                    "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:items-start md:gap-10",
                  )}
                >
                  {/* Node */}
                  <div className="absolute left-[7px] top-3 z-10 md:left-1/2 md:-ml-2">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-electric/50" />
                      <span className="relative h-3 w-3 rounded-full bg-electric shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
                    </span>
                  </div>

                  <div className={cn("md:col-start-1 md:pr-10 md:text-right", sideRight && "md:col-start-2 md:pl-10 md:pr-0 md:text-left")}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">
                      {job.period}
                    </span>
                  </div>

                  <div className={cn("mt-2 md:mt-0 md:col-start-2", sideRight && "md:col-start-1 md:row-start-1")}>
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className={cn(
                        "group block w-full overflow-hidden rounded-2xl glass text-left transition-all hover:shadow-glow",
                        open && "shadow-glow",
                      )}
                    >
                      <div className="flex items-start gap-4 p-6">
                        <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric ring-1 ring-electric/30">
                          <Briefcase size={18} />
                        </span>
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-semibold text-silver-50">
                            {job.role}
                          </h3>
                          <p className="mt-1 text-sm text-electric">{job.company}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-silver-300">
                            <MapPin size={12} /> {job.location}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-electric/20 bg-electric/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-electric/90"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronDown
                          size={18}
                          className={cn(
                            "mt-2 text-silver-300 transition-transform",
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
                            <div className="border-t border-white/5 p-6 pt-5">
                              <p className="text-sm leading-relaxed text-silver-300">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">
                                  Context
                                </span>
                                <br />
                                <span className="mt-1 inline-block">{job.context}</span>
                              </p>
                              <ul className="mt-5 space-y-3">
                                {job.achievements.map((a, ai) => (
                                  <li
                                    key={ai}
                                    className="flex gap-3 text-sm leading-relaxed text-silver-200"
                                  >
                                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                                    <span>{a}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

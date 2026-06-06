"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Cog,
  Database,
  LayoutDashboard,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

const ICONS: Record<string, LucideIcon> = {
  Cog,
  Database,
  LayoutDashboard,
  Warehouse,
};

export function Projects() {
  return (
    <section id="projects" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects · Automation Initiatives"
          title="Tools That Removed Real-World Bottlenecks"
          description="Each project shipped against a specific operational pain — month-end billing chaos, SAP negative-stock cleanup, reconciliation drift, picking inefficiency — and produced a measurable result."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Card3D key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card3D({
  project,
  delay,
}: {
  project: (typeof projects)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotX = useTransform(sy, [-50, 50], [10, -10]);
  const rotY = useTransform(sx, [-50, 50], [-10, 10]);
  const Icon = ICONS[project.icon] ?? LayoutDashboard;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-glow"
    >
      <div className="pointer-events-none absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-electric/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-blue-500/10 text-electric ring-1 ring-electric/30">
          <Icon size={22} strokeWidth={1.8} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">
            {project.company}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-silver-50">
            {project.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-silver-300">{project.summary}</p>
      <div className="mt-4 rounded-lg border border-electric/15 bg-electric/5 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">
          Outcome
        </p>
        <p className="mt-1 text-sm text-silver-100">{project.outcome}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-silver-200"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { analyticsKPIs } from "@/data/portfolio";

export function Analytics() {
  return (
    <section id="analytics" className="section relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Data Analytics"
          title="Operating KPIs · Bloomberg-Grade Visibility"
          description="The metrics that mattered on the floor — accuracy, on-time, efficiency, cost, fulfilment — kept under live observation through Excel, Power BI, and SAP-extracted data."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {analyticsKPIs.map((k, i) => (
            <KPIRing key={k.label} kpi={k} delay={i * 0.08} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <BarChart />
          <LineChart />
        </div>
      </div>
    </section>
  );
}

function KPIRing({
  kpi,
  delay,
}: {
  kpi: { label: string; value: number; suffix: string; color: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (c * kpi.value) / 100;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl glass p-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r={r}
              stroke={kpi.color}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: inView ? offset : c }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
              style={{ filter: `drop-shadow(0 0 6px ${kpi.color}90)` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[17px] font-semibold tracking-tight text-silver-50">
              <Counter to={kpi.value} suffix={kpi.suffix} />
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <span className="label-mono">Metric</span>
          <p className="mt-1.5 font-display text-[13.5px] font-semibold leading-snug text-silver-50">
            {kpi.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BarChart() {
  const data = [
    { label: "Q1", in: 68, out: 60 },
    { label: "Q2", in: 78, out: 72 },
    { label: "Q3", in: 84, out: 80 },
    { label: "Q4", in: 92, out: 88 },
    { label: "Q5", in: 96, out: 94 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl glass p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="label-mono">Throughput</span>
          <h4 className="mt-1.5 font-display text-[15px] font-semibold tracking-tight text-silver-50">
            Inbound vs Outbound · Quarterly
          </h4>
        </div>
        <div className="flex items-center gap-4 text-xs text-silver-300">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-electric" /> Inbound
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-indigo-400" /> Outbound
          </span>
        </div>
      </div>
      <div className="mt-6 flex h-44 items-end gap-3">
        {data.map((d, i) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end justify-center gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${d.in}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08 }}
                className="w-3 rounded-t bg-gradient-to-t from-electric/40 to-electric shadow-[0_0_15px_rgba(34,211,238,0.6)]"
              />
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${d.out}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08 + 0.1 }}
                className="w-3 rounded-t bg-gradient-to-t from-indigo-500/40 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              />
            </div>
            <span className="font-mono text-[10px] text-silver-300">{d.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LineChart() {
  const points = [85, 88, 92, 90, 95, 96, 98, 97, 99, 99];
  const width = 360;
  const height = 160;
  const stepX = width / (points.length - 1);
  const min = 80;
  const max = 100;
  const path = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${i * stepX},${height - ((p - min) / (max - min)) * (height - 20)}`,
    )
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-2xl glass p-7"
    >
      <div>
        <span className="label-mono">Trend</span>
        <h4 className="mt-1.5 font-display text-[15px] font-semibold tracking-tight text-silver-50">
          Inventory Accuracy · 10-Week Trail
        </h4>
      </div>
      <div className="mt-6 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
          <defs>
            <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
          ))}
          <motion.path
            d={`${path} L ${width},${height} L 0,${height} Z`}
            fill="url(#lineFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
          <motion.path
            d={path}
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.6))" }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={i * stepX}
              cy={height - ((p - min) / (max - min)) * (height - 20)}
              r="3"
              fill="#a5f3fc"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.05 }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Activity, Boxes, Forklift, PackageSearch, Radio, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewport } from "@/lib/useInViewport";

const WarehouseScene = dynamic(
  () => import("./WarehouseScene").then((m) => m.WarehouseScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-navy/20" />,
  },
);

const panels = [
  { icon: Boxes, label: "Automated Storage", value: "Live · 24 / 7", accent: "from-cyan-400 to-blue-400" },
  { icon: Forklift, label: "Forklift Movements", value: "12 active", accent: "from-blue-400 to-indigo-400" },
  { icon: Truck, label: "Container Tracking", value: "38 in-bound", accent: "from-indigo-400 to-purple-400" },
  { icon: PackageSearch, label: "Shipment Flow", value: "OK", accent: "from-cyan-400 to-blue-400" },
  { icon: Activity, label: "Inventory Dashboard", value: "99% accurate", accent: "from-blue-400 to-cyan-400" },
  { icon: Radio, label: "KPI Monitoring", value: "5 streams", accent: "from-indigo-400 to-cyan-400" },
];

export function CommandCenter() {
  const { ref: sceneRef, inView } = useInViewport<HTMLDivElement>({ rootMargin: "150px" });

  return (
    <section id="command-center" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-25" />
      <div className="absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-electric/10 blur-[60px] md:blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="3D Logistics Command Center"
          title="Interactive Warehouse Operations Twin"
          description="A simplified real-time digital twin — racking, container flow, and forklift movement — modelled in the browser to convey the rhythm of a live operations floor."
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-5">
          <motion.div
            ref={sceneRef}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative col-span-3 h-[460px] overflow-hidden rounded-2xl glass-strong"
          >
            {inView && <WarehouseScene />}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-electric">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" /> Live Sim
              </span>
              <span>Mode: Warehouse Twin · v1.0</span>
            </div>
            <div className="absolute left-4 top-4 rounded-md border border-electric/30 bg-midnight/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-electric">
              Zone A · Inbound → Storage → Outbound
            </div>
          </motion.div>

          <div className="col-span-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {panels.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-xl glass p-5 transition-shadow hover:shadow-glow"
              >
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent} opacity-70`} />
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-electric/10 text-electric ring-1 ring-electric/30">
                    <p.icon size={16} />
                  </span>
                  <span className="font-mono text-[9.5px] font-medium uppercase leading-none tracking-[0.25em] text-electric">
                    {p.value}
                  </span>
                </div>
                <h4 className="mt-4 font-display text-[13.5px] font-semibold leading-snug text-silver-50">
                  {p.label}
                </h4>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full w-[85%] rounded-full bg-gradient-to-r ${p.accent}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

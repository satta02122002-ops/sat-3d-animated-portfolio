"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
}

export function MagneticButton({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const tx = useTransform(springX, (v) => `${v}px`);
  const ty = useTransform(springY, (v) => `${v}px`);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px * 0.25);
    y.set(py * 0.25);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 select-none";
  const variants = {
    primary:
      "bg-gradient-to-r from-electric to-electric-glow text-midnight shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(34,211,238,0.9)]",
    secondary:
      "border border-electric/40 bg-navy/30 text-silver-50 backdrop-blur-md hover:border-electric/80 hover:bg-navy/50",
    ghost: "text-silver-100 hover:text-electric",
  } as const;

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      className={cn(base, variants[variant], className)}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.a>)}
    >
      <span className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_70%)]" />
      {icon && <span className="text-current">{icon}</span>}
      <span>{children}</span>
    </motion.a>
  );
}

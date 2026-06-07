"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Command Center", href: "#command-center" },
  { label: "Analytics", href: "#analytics" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border border-white/5 px-4 py-2 transition-all duration-300",
              scrolled ? "glass-strong shadow-executive" : "glass",
            )}
          >
            <a href="#top" className="group flex items-center gap-2.5 pl-2">
              <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-electric/40">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 -z-10 rounded-full bg-electric/30 blur-md transition group-hover:blur-lg" />
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-wide text-silver-50 sm:inline">
                Sattanathan<span className="text-electric">.</span>
              </span>
            </a>
            <nav className="hidden items-center gap-0.5 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-silver-300 transition-colors hover:bg-electric/10 hover:text-electric"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                download
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-glow px-4 py-2 text-[10.5px] font-semibold uppercase leading-none tracking-[0.22em] text-midnight shadow-[0_8px_24px_-8px_rgba(34,211,238,0.6)] transition hover:shadow-[0_12px_30px_-6px_rgba(34,211,238,0.9)] md:inline-flex"
              >
                <Download size={14} strokeWidth={2.5} />
                Resume
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy/40 text-silver-100 transition hover:border-electric/60 hover:text-electric lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex flex-col bg-midnight/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-base font-semibold text-silver-50">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver-100"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-5">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 py-4 font-display text-2xl font-semibold text-silver-50"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a
              href={profile.resumeUrl}
              download
              className="mx-5 mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-glow px-4 py-3 text-sm font-semibold text-midnight"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

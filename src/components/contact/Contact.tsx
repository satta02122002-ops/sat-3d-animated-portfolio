"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio enquiry · ${data.get("name") || "Anonymous"}`,
    );
    const body = encodeURIComponent(
      `From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-electric/10 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact · Communication Hub"
          title="Let's Build the Next Supply Chain Together"
          description="Looking for a senior supply chain operator, logistics coordinator, or inventory planner in the UAE? The fastest channels are below."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl glass-strong p-6 md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required placeholder="Your full name" />
              <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <Field
              label="Company / Role"
              name="company"
              placeholder="Hiring company or position"
              className="mt-5"
            />
            <div className="mt-5">
              <label className="label-mono">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about the role or project..."
                className="mt-2.5 w-full resize-none rounded-lg border border-white/10 bg-midnight/60 px-4 py-3 text-[14px] leading-[1.65] text-silver-50 placeholder:text-silver-300/50 outline-none transition focus:border-electric/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
              />
            </div>
            <button
              type="submit"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-glow px-6 py-3 text-sm font-semibold text-midnight shadow-[0_10px_30px_-10px_rgba(34,211,238,0.7)] transition hover:shadow-[0_15px_40px_-10px_rgba(34,211,238,0.9)]"
            >
              <Send size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
              {submitted ? "Opened your mail client…" : "Send Message"}
            </button>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-silver-300">
              Submits via mailto — no data leaves your browser.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <ContactLink
              icon={<Mail size={18} />}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactLink
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="linkedin.com/in/sat-logistics"
              href={profile.linkedin}
            />
            <ContactLink
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value={profile.phone}
              href={profile.whatsapp}
            />
            <div className="relative mt-2 overflow-hidden rounded-2xl glass p-6">
              <div className="pointer-events-none absolute inset-0">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.line
                    x1="0"
                    x2="100"
                    y1="50"
                    y2="50"
                    stroke="#22d3ee"
                    strokeWidth="0.2"
                    strokeDasharray="2 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
              <span className="label-mono">Availability</span>
              <p className="mt-3 font-display text-[15.5px] font-semibold leading-snug tracking-tight text-silver-50">
                Open to senior roles in supply chain operations, logistics coordination, and
                inventory planning across the UAE.
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-silver-300">
                Notice period: standard 30 days · Open to relocation within UAE.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label-mono">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2.5 w-full rounded-lg border border-white/10 bg-midnight/60 px-4 py-3 text-[14px] text-silver-50 placeholder:text-silver-300/50 outline-none transition focus:border-electric/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
      />
    </div>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl glass p-5 transition hover:shadow-glow"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric ring-1 ring-electric/30 transition group-hover:bg-electric group-hover:text-midnight">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="label-mono">{label}</span>
        <p className="mt-1.5 truncate text-[14px] text-silver-50">{value}</p>
      </div>
      <span className="text-silver-300 transition group-hover:text-electric">→</span>
    </a>
  );
}

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-midnight">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric-glow font-display text-sm font-bold text-midnight">
              SC
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-silver-50">
              {profile.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[13.5px] leading-[1.7] text-silver-300">
            Supply Chain & Logistics Professional · SAP S/4HANA Power User · Building
            data-driven, automation-first logistics operations from Dubai.
          </p>
        </div>
        <div>
          <span className="label-mono">Connect</span>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-silver-200">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="shrink-0 text-electric" />
              <a href={`mailto:${profile.email}`} className="hover:text-electric">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Linkedin size={14} className="shrink-0 text-electric" />
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-electric">
                linkedin.com/in/sat-logistics
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="shrink-0 text-electric" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
        <div>
          <span className="label-mono">Navigate</span>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-[13.5px] text-silver-200">
            <li><a href="#about" className="hover:text-electric">About</a></li>
            <li><a href="#experience" className="hover:text-electric">Experience</a></li>
            <li><a href="#skills" className="hover:text-electric">Skills</a></li>
            <li><a href="#projects" className="hover:text-electric">Projects</a></li>
            <li><a href="#analytics" className="hover:text-electric">Analytics</a></li>
            <li><a href="#contact" className="hover:text-electric">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[12px] text-silver-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver-300/70">
            Crafted with precision · Dubai → World
          </p>
        </div>
      </div>
    </footer>
  );
}

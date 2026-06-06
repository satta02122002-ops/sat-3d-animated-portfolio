import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Skills } from "@/components/skills/Skills";
import { CommandCenter } from "@/components/command/CommandCenter";
import { Analytics } from "@/components/analytics/Analytics";
import { Projects } from "@/components/projects/Projects";
import { Achievements } from "@/components/achievements/Achievements";
import { Personal } from "@/components/personal/Personal";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/nav/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <CommandCenter />
      <Analytics />
      <Projects />
      <Achievements />
      <Personal />
      <Contact />
      <Footer />
    </>
  );
}

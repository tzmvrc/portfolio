import { Navbar } from "@/components/Navbar";
import { MobileDock } from "@/components/MobileDock";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <PageTransition>
      <main className="relative pb-28 md:pb-0">
        <SmoothScroll />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <MobileDock />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </PageTransition>
  );
}

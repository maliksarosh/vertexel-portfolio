import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const words = settings.heroHeadline.split(" ");
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 -left-24 w-96 h-96 rounded-full bg-foreground/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-foreground/5 blur-3xl pointer-events-none" />


      {/* Edge-on monolith logo — centered, rotated on Y axis, slowly floating. */}
      <MonolithLogo />

      <div className="container-x relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          <span className="w-8 h-px bg-primary" /> Vertexel · Software Studio
        </motion.p>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] text-balance max-w-6xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground text-balance"
        >
          {settings.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-transform hover:-translate-y-0.5"
          >
            Book a call →
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-surface transition-transform hover:-translate-y-0.5"
          >
            See recent work
          </a>
        </motion.div>
      </div>

      {/* Footer strip: ©year / creating since — echoes the reference */}
      <div className="container-x relative z-10 mt-24 md:mt-32 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>©{new Date().getFullYear()} Vertexel</span>
        <span>/ Creating since 2023</span>
      </div>
    </section>
  );
}

function MonolithLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Rotate from edge-on (88deg) through full face and beyond as user scrolls.
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [88, -272]);
  const rotateY = useSpring(rotateYRaw, { stiffness: 80, damping: 20, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.9]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      style={{ perspective: "1600px" }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", rotateY, scale }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* The diamond — same faceted mark as the Vertexel logo, sized to feel monolithic */}
          <svg
            viewBox="0 0 200 200"
            className="w-[420px] h-[420px] md:w-[560px] md:h-[560px] lg:w-[680px] lg:h-[680px] drop-shadow-[0_60px_80px_rgba(0,0,0,0.25)]"
          >
            <defs>
              <linearGradient id="tealFacet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.88 0.14 180)" />
                <stop offset="100%" stopColor="oklch(0.62 0.12 190)" />
              </linearGradient>
              <linearGradient id="tealFacet2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.72 0.14 185)" />
                <stop offset="100%" stopColor="oklch(0.42 0.08 210)" />
              </linearGradient>
              <linearGradient id="violetFacet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.18 290)" />
                <stop offset="100%" stopColor="oklch(0.42 0.14 285)" />
              </linearGradient>
              <linearGradient id="violetFacet2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.62 0.16 300)" />
                <stop offset="100%" stopColor="oklch(0.32 0.10 285)" />
              </linearGradient>
            </defs>
            {/* top */}
            <polygon points="100,10 190,100 100,100" fill="url(#tealFacet)" />
            <polygon points="10,100 100,10 100,100" fill="url(#tealFacet2)" />
            {/* bottom */}
            <polygon points="190,100 100,190 100,100" fill="url(#violetFacet)" />
            <polygon points="100,190 10,100 100,100" fill="url(#violetFacet2)" />
            {/* subtle edge highlight */}
            <polyline
              points="100,10 100,190"
              stroke="oklch(1 0 0 / 30%)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

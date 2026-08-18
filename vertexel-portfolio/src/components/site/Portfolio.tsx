import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useProjects } from "@/hooks/useFirestore";

export function Portfolio() {
  const { data: projects } = useProjects();

  return (
    <section id="work" className="py-24 md:py-32 border-t border-border">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Selected work
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-balance max-w-2xl">
                Recent projects.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              A handful of the products I've built and shipped. Every one designed, coded, and deployed by me personally.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-surface border border-border aspect-[16/10]"
                >
                  {p.coverUrl ? (
                    <img
                      src={p.coverUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                      <span className="font-display text-6xl md:text-7xl text-foreground/20">
                        {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-background/70 backdrop-blur border border-border text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    {p.blurb && (
                      <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                    )}
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "./Reveal";
import { services } from "@/lib/defaults";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-border">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Services
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-balance max-w-2xl">
                Services, end to end.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Comprehensive digital solutions from concept through production deployment. We deliver direct, focused development without layers or delays.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="bg-background p-8 h-full group hover:bg-surface transition-colors">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs font-mono text-primary">{s.n}</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">↗</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">{s.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-surface-2 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

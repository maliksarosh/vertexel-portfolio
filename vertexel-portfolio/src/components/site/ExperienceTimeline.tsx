import { Reveal } from "./Reveal";
import { useExperience } from "@/hooks/useFirestore";

export function ExperienceTimeline() {
  const { data } = useExperience();

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-border">
      <div className="container-x">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Journey
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-balance mb-16">
            Experience.
          </h2>
        </Reveal>

        <div className="relative max-w-3xl">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border" />
          {data.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.05}>
              <div className="relative pl-12 md:pl-16 pb-12 last:pb-0">
                <span className="absolute left-0 md:left-1 top-1 w-6 h-6 md:w-7 md:h-7 rounded-full border border-primary bg-background flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div className="text-xs font-mono text-muted-foreground mb-2">
                  {e.startDate} — {e.endDate ?? "Present"}
                </div>
                <h3 className="text-xl md:text-2xl font-medium">
                  {e.role}{" "}
                  <span className="text-muted-foreground">· {e.organization}</span>
                </h3>
                <p className="mt-2 text-muted-foreground max-w-xl">{e.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

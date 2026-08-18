import { Reveal } from "./Reveal";
import type { SiteSettings } from "@/lib/types";

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              About
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-balance">
              One person. Full stack. No middlemen.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-balance">
              {settings.bio}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "Projects", v: "20+" },
                { k: "Since", v: "2023" },
                { k: "Solo", v: "100%" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-3xl md:text-4xl text-primary">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

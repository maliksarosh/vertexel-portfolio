import { Reveal } from "./Reveal";
import { useTestimonials } from "@/hooks/useFirestore";

export function Testimonials() {
  const { data } = useTestimonials();
  if (!data.length) return null;
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container-x">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Kind words
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-balance mb-16 max-w-3xl">
            What clients say.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <figure className="p-8 md:p-10 rounded-2xl bg-surface border border-border h-full">
                <blockquote className="font-display text-2xl md:text-3xl leading-snug text-balance">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  {t.photoUrl && (
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.title}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

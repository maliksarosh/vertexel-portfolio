import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { fetchProjectBySlug, useSiteSettings } from "@/hooks/useFirestore";
import type { Project } from "@/lib/types";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleize(params.slug)} — Vertexel` },
      { property: "og:title", content: `${titleize(params.slug)} — Vertexel` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/work/${params.slug}` }],
  }),
  component: WorkDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl mb-4">Not found</h1>
        <Link to="/" className="text-primary underline">
          Back home
        </Link>
      </div>
    </div>
  ),
});

function titleize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function WorkDetail() {
  const { slug } = Route.useParams();
  const { data: settings } = useSiteSettings();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    fetchProjectBySlug(slug).then((p) => setProject(p));
  }, [slug]);

  if (project === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!project) throw notFound();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <article className="pt-40 pb-24">
        <div className="container-x">
          <Reveal>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
            >
              ← Back to work
            </Link>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-surface border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance max-w-5xl">
              {project.title}
            </h1>
            {project.blurb && (
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl">{project.blurb}</p>
            )}
          </Reveal>

          {project.coverUrl && (
            <Reveal delay={0.15}>
              <div className="mt-16 rounded-2xl overflow-hidden border border-border">
                <img src={project.coverUrl} alt={project.title} className="w-full" />
              </div>
            </Reveal>
          )}

          <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-16">
              <Section title="The problem" body={project.problem} />
              <Section title="What I built" body={project.solution} />
              <Section title="Outcome" body={project.outcome} />
            </div>
            <aside className="md:col-span-4 space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Tech stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-surface border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Visit project ↗
                </a>
              )}
            </aside>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((g, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl overflow-hidden border border-border">
                    <img src={g} alt="" className="w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </article>
      <Footer settings={settings} />
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <Reveal>
      <h2 className="font-display text-3xl md:text-4xl mb-4">{title}</h2>
      <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">{body}</p>
    </Reveal>
  );
}

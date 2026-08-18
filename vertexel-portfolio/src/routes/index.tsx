import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { ExperienceTimeline } from "@/components/site/ExperienceTimeline";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useSiteSettings } from "@/hooks/useFirestore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vertexel — Software, web & mobile studio" },
      {
        name: "description",
        content:
          "Vertexel is a one-person software studio. Full-stack products designed, built and shipped by Sarosh.",
      },
      { property: "og:title", content: "Vertexel — Software, web & mobile studio" },
      {
        property: "og:description",
        content: "Full-stack products designed, built and shipped by Sarosh.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: settings } = useSiteSettings();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero settings={settings} />
        <Portfolio />
        <Services />
        <ExperienceTimeline />
        <About settings={settings} />
        <Testimonials />
        <FAQ />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}

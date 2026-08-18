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
      { title: "Vertexel — Software & Digital Solutions Company" },
      {
        name: "description",
        content:
          "Vertexel designs and develops modern, scalable digital solutions that help businesses establish a stronger online presence, streamline operations, and achieve their objectives.",
      },
      { property: "og:title", content: "Vertexel — Software & Digital Solutions Company" },
      {
        property: "og:description",
        content: "We design and develop modern, scalable digital solutions for businesses. Web applications, mobile apps, AI integrations, and custom software.",
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

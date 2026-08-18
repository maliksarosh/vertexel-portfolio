import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-x flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative inline-block w-5 h-5">
              <span className="absolute inset-0 rotate-45 bg-primary/80" />
              <span className="absolute inset-1 rotate-45 bg-secondary/80" />
            </span>
            <span className="font-semibold tracking-tight">Vertexel</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Software, web & mobile — designed and shipped by Sarosh.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 items-start">
          {settings.socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {s.platform} ↗
            </a>
          ))}
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Vertexel. All rights reserved.</span>
        <a href="/admin" className="hover:text-foreground transition-colors">
          Admin
        </a>
      </div>
    </footer>
  );
}

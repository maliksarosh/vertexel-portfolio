import type { SiteSettings } from "@/lib/types";

function SocialIcon({ platform }: { platform: string }) {
  const iconClassName = "h-4 w-4";

  if (platform === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName} fill="currentColor">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.13 3.18a4.7 4.7 0 0 1 1.23 3.22c0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  }

  if (platform === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.27ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46Z" />
      </svg>
    );
  }

  if (platform === "Email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (platform === "WhatsApp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 1.9 2.6 2.5l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3 0 .5-.4.7-.3.2-1.1.5-1.9.2-1-.3-2.2-1-3.3-2.1s-1.8-2.3-2.1-3.3c-.3-.8 0-1.6.2-1.9Z" />
      </svg>
    );
  }

  return null;
}

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
            Software and digital solutions company. Building reliable, modern technology for businesses.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-start">
          {settings.socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SocialIcon platform={s.platform} />
              <span>{s.platform}</span>
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

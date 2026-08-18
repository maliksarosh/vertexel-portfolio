import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { ExperienceTab } from "@/components/admin/ExperienceTab";
import { TestimonialsTab } from "@/components/admin/TestimonialsTab";
import { SubmissionsTab } from "@/components/admin/SubmissionsTab";
import { SettingsTab } from "@/components/admin/SettingsTab";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Vertexel" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type Tab = "projects" | "experience" | "testimonials" | "submissions" | "settings";
const TABS: { id: Tab; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "submissions", label: "Submissions" },
  { id: "settings", label: "Settings" },
];

function AdminPage() {
  const { user, isAdmin, loading, login, logout } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("projects");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl mb-4">Not authorized.</h1>
          <p className="text-muted-foreground mb-6">
            This account isn't the admin. Sign out and try a different account.
          </p>
          <button
            onClick={logout}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-xl">
              Vertexel
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground hidden sm:inline">{user.email}</span>
            <button
              onClick={logout}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm border-b-2 whitespace-nowrap transition ${
                tab === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === "projects" && <ProjectsTab />}
        {tab === "experience" && <ExperienceTab />}
        {tab === "testimonials" && <TestimonialsTab />}
        {tab === "submissions" && <SubmissionsTab />}
        {tab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

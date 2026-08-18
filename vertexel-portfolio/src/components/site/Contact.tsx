import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { db } from "@/lib/firebase";
import type { SiteSettings } from "@/lib/types";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  projectType: z.string().min(1, "Please choose"),
  budget: z.string().min(1, "Please choose"),
  message: z.string().trim().min(10, "Tell me a bit more").max(4000),
});

const projectTypes = ["Web app", "Mobile app", "AI / automation", "API / backend", "Something else"];
const budgets = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];

export function Contact({ settings }: { settings: SiteSettings }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    // Honeypot — silently drop bots.
    if (fd.get("website")) {
      setState("sent");
      return;
    }
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      projectType: fd.get("projectType"),
      budget: fd.get("budget"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid submission");
      return;
    }
    setState("sending");
    try {
      await addDoc(collection(db, "submissions"), {
        ...parsed.data,
        read: false,
        createdAt: serverTimestamp(),
      });
      setState("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try emailing me directly.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Contact
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-balance">
              Let's build something.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-md">
              Have a project in mind? Send the details and I'll get back within a business day.
            </p>
            {settings.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-8 inline-block text-lg text-primary hover:underline"
              >
                {settings.contactEmail}
              </a>
            )}
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            {state === "sent" ? (
              <div className="p-8 rounded-2xl bg-surface border border-border">
                <h3 className="font-display text-3xl mb-2">Message received.</h3>
                <p className="text-muted-foreground">
                  I'll reply within a business day. In the meantime, feel free to email me directly.
                </p>
                <button
                  type="button"
                  className="mt-6 text-sm underline text-muted-foreground hover:text-foreground"
                  onClick={() => setState("idle")}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field name="name" label="Name" placeholder="Your name" />
                  <Field name="email" label="Email" type="email" placeholder="you@company.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select name="projectType" label="Project type" options={projectTypes} />
                  <Select name="budget" label="Budget" options={budgets} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Project description
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about the project — the problem, the users, the timeline."
                    className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
                >
                  {state === "sending" ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-muted-foreground mb-2 block">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground mb-2 block">{label}</label>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="" disabled>
          Choose one…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

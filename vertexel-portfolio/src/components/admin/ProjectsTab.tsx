import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/types";
import { Button, Card, Field, Input, Textarea } from "./ui";
import { GalleryUpload, ImageUpload } from "./ImageUpload";

const empty: Omit<Project, "id"> = {
  title: "",
  slug: "",
  tags: [],
  coverUrl: "",
  gallery: [],
  problem: "",
  solution: "",
  outcome: "",
  techStack: [],
  link: null,
  status: "draft",
  order: 1,
  blurb: "",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "projects"), orderBy("order", "asc")));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Project[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(p: Project) {
    const { id, ...data } = p;
    if (id) {
      await updateDoc(doc(db, "projects", id), data as any);
    } else {
      await addDoc(collection(db, "projects"), data as any);
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    load();
  }

  if (editing) {
    return <ProjectForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Projects</h2>
        <Button onClick={() => setEditing({ id: "", ...empty } as Project)}>+ New project</Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">
            No projects yet. Click "New project" to add one. The site is showing default seed data
            until you save your first entry.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <Card key={p.id} className="!p-4 flex items-center gap-4">
              {p.coverUrl ? (
                <img src={p.coverUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{p.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.status === "published"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">/{p.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setEditing(p)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => remove(p.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Project;
  onSave: (p: Project) => Promise<void>;
  onCancel: () => void;
}) {
  const [p, setP] = useState<Project>(initial);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">{initial.id ? "Edit project" : "New project"}</h2>
        <Button variant="ghost" onClick={onCancel}>
          ← Back
        </Button>
      </div>
      <Card className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title">
            <Input
              value={p.title}
              onChange={(e) => {
                const t = e.target.value;
                set("title", t);
                if (!initial.id) set("slug", slugify(t));
              }}
            />
          </Field>
          <Field label="Slug">
            <Input value={p.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
          </Field>
        </div>
        <Field label="Blurb (one-liner shown on grid)">
          <Input value={p.blurb ?? ""} onChange={(e) => set("blurb", e.target.value)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Tags (comma-separated)">
            <Input
              value={p.tags.join(", ")}
              onChange={(e) =>
                set(
                  "tags",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                )
              }
            />
          </Field>
          <Field label="Tech stack (comma-separated)">
            <Input
              value={p.techStack.join(", ")}
              onChange={(e) =>
                set(
                  "techStack",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                )
              }
            />
          </Field>
        </div>
        <ImageUpload
          label="Cover image"
          value={p.coverUrl}
          onChange={(v) => set("coverUrl", v)}
        />
        <GalleryUpload value={p.gallery} onChange={(v) => set("gallery", v)} />
        <Field label="Problem">
          <Textarea rows={3} value={p.problem} onChange={(e) => set("problem", e.target.value)} />
        </Field>
        <Field label="Solution">
          <Textarea rows={3} value={p.solution} onChange={(e) => set("solution", e.target.value)} />
        </Field>
        <Field label="Outcome">
          <Textarea rows={3} value={p.outcome} onChange={(e) => set("outcome", e.target.value)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="External link (optional)">
            <Input
              value={p.link ?? ""}
              onChange={(e) => set("link", e.target.value || null)}
              placeholder="https://…"
            />
          </Field>
          <Field label="Order">
            <Input
              type="number"
              value={p.order}
              onChange={(e) => set("order", Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Status">
            <select
              value={p.status}
              onChange={(e) => set("status", e.target.value as Project["status"])}
              className="w-full rounded-lg bg-surface border border-border px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={saving || !p.title || !p.slug}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave(p);
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

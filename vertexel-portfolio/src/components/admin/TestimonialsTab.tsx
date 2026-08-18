import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Testimonial } from "@/lib/types";
import { Button, Card, Field, Input, Textarea } from "./ui";
import { ImageUpload } from "./ImageUpload";

const empty: Omit<Testimonial, "id"> = {
  quote: "",
  name: "",
  title: "",
  photoUrl: "",
  order: 1,
};

export function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "testimonials"), orderBy("order", "asc")));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Testimonial[]);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function save(t: Testimonial) {
    const { id, ...data } = t;
    if (id) await updateDoc(doc(db, "testimonials", id), data as any);
    else await addDoc(collection(db, "testimonials"), data as any);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete testimonial?")) return;
    await deleteDoc(doc(db, "testimonials", id));
    load();
  }

  if (editing) {
    return <Form initial={editing} onSave={save} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Testimonials</h2>
        <Button onClick={() => setEditing({ id: "", ...empty } as Testimonial)}>+ New</Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">None yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <Card key={t.id} className="!p-4 flex items-start gap-4">
              {t.photoUrl && (
                <img src={t.photoUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
              )}
              <div className="flex-1">
                <p className="text-sm italic">"{t.quote}"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.name} — {t.title}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setEditing(t)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(t.id)}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Form({
  initial,
  onSave,
  onCancel,
}: {
  initial: Testimonial;
  onSave: (t: Testimonial) => Promise<void>;
  onCancel: () => void;
}) {
  const [t, setT] = useState<Testimonial>(initial);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof Testimonial>(k: K, v: Testimonial[K]) =>
    setT((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">{initial.id ? "Edit" : "New"} testimonial</h2>
        <Button variant="ghost" onClick={onCancel}>
          ← Back
        </Button>
      </div>
      <Card className="space-y-4">
        <Field label="Quote">
          <Textarea rows={4} value={t.quote} onChange={(e) => set("quote", e.target.value)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={t.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Title / role">
            <Input value={t.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
        </div>
        <ImageUpload
          label="Photo"
          value={t.photoUrl ?? ""}
          onChange={(v) => set("photoUrl", v)}
        />
        <Field label="Order">
          <Input
            type="number"
            value={t.order}
            onChange={(e) => set("order", Number(e.target.value) || 0)}
          />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave(t);
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

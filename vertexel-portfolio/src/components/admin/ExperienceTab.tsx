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
import type { Experience } from "@/lib/types";
import { Button, Card, Field, Input, Textarea } from "./ui";

const empty: Omit<Experience, "id"> = {
  role: "",
  organization: "",
  startDate: "",
  endDate: null,
  description: "",
  order: 1,
};

export function ExperienceTab() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, "experience"), orderBy("order", "asc")));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Experience[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(x: Experience) {
    const { id, ...data } = x;
    if (id) await updateDoc(doc(db, "experience", id), data as any);
    else await addDoc(collection(db, "experience"), data as any);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry?")) return;
    await deleteDoc(doc(db, "experience", id));
    load();
  }

  if (editing) {
    return <Form initial={editing} onSave={save} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Experience</h2>
        <Button onClick={() => setEditing({ id: "", ...empty } as Experience)}>+ New entry</Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">No entries yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((x) => (
            <Card key={x.id} className="!p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">
                  {x.role} — <span className="text-muted-foreground">{x.organization}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {x.startDate} — {x.endDate ?? "Present"}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setEditing(x)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(x.id)}>
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
  initial: Experience;
  onSave: (x: Experience) => Promise<void>;
  onCancel: () => void;
}) {
  const [x, setX] = useState<Experience>(initial);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof Experience>(k: K, v: Experience[K]) => setX((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">{initial.id ? "Edit" : "New"} experience</h2>
        <Button variant="ghost" onClick={onCancel}>
          ← Back
        </Button>
      </div>
      <Card className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Role">
            <Input value={x.role} onChange={(e) => set("role", e.target.value)} />
          </Field>
          <Field label="Organization">
            <Input
              value={x.organization}
              onChange={(e) => set("organization", e.target.value)}
            />
          </Field>
          <Field label="Start date">
            <Input value={x.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </Field>
          <Field label="End date (blank = Present)">
            <Input
              value={x.endDate ?? ""}
              onChange={(e) => set("endDate", e.target.value || null)}
            />
          </Field>
        </div>
        <Field label="Description">
          <Textarea
            rows={4}
            value={x.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
        <Field label="Order">
          <Input
            type="number"
            value={x.order}
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
                await onSave(x);
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

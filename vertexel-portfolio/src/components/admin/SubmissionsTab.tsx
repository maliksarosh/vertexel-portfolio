import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Submission } from "@/lib/types";
import { Button, Card } from "./ui";

export function SubmissionsTab() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "submissions"), orderBy("createdAt", "desc")),
      );
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as Submission[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function toggleRead(s: Submission) {
    await updateDoc(doc(db, "submissions", s.id), { read: !s.read });
    load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this submission?")) return;
    await deleteDoc(doc(db, "submissions", id));
    load();
  }

  const unread = items.filter((i) => !i.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">
          Submissions{" "}
          {unread > 0 && (
            <span className="ml-2 text-sm bg-primary text-primary-foreground rounded-full px-2 py-0.5 align-middle">
              {unread} new
            </span>
          )}
        </h2>
        <Button variant="ghost" onClick={load}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">No submissions yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((s) => {
            const isOpen = open === s.id;
            return (
              <Card key={s.id} className={`!p-4 ${!s.read ? "border-primary/40" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  className="w-full flex items-center gap-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{s.name}</p>
                      {!s.read && (
                        <span className="text-[10px] uppercase tracking-wide bg-primary/20 text-primary rounded px-1.5 py-0.5">
                          new
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {s.email} · {s.projectType} · {s.budget}
                    </p>
                  </div>
                  <span className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <p className="whitespace-pre-wrap text-sm">{s.message}</p>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${s.email}?subject=Re:%20your%20project%20inquiry`}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
                      >
                        Reply by email
                      </a>
                      <Button variant="ghost" onClick={() => toggleRead(s)}>
                        Mark as {s.read ? "unread" : "read"}
                      </Button>
                      <Button variant="danger" onClick={() => remove(s.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

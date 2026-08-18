import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SiteSettings, SocialLink } from "@/lib/types";
import { defaultSiteSettings } from "@/lib/defaults";
import { Button, Card, Field, Input, Textarea } from "./ui";

export function SettingsTab() {
  const [s, setS] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "siteSettings", "main"));
        if (snap.exists()) setS({ ...defaultSiteSettings, ...(snap.data() as SiteSettings) });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) =>
    setS((prev) => ({ ...prev, [k]: v }));

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      await setDoc(doc(db, "siteSettings", "main"), s);
      setMsg("Saved.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function updateSocial(i: number, patch: Partial<SocialLink>) {
    const next = [...s.socialLinks];
    next[i] = { ...next[i], ...patch };
    set("socialLinks", next);
  }

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Site settings</h2>
      </div>
      <Card className="space-y-4">
        <Field label="Hero headline">
          <Textarea
            rows={2}
            value={s.heroHeadline}
            onChange={(e) => set("heroHeadline", e.target.value)}
          />
        </Field>
        <Field label="Hero subtext">
          <Textarea
            rows={3}
            value={s.heroSubtext}
            onChange={(e) => set("heroSubtext", e.target.value)}
          />
        </Field>
        <Field label="Bio (About section)">
          <Textarea rows={5} value={s.bio} onChange={(e) => set("bio", e.target.value)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Contact email">
            <Input
              type="email"
              value={s.contactEmail}
              onChange={(e) => set("contactEmail", e.target.value)}
            />
          </Field>
          <Field label="Contact phone (optional)">
            <Input value={s.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
          </Field>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-muted-foreground">Social links</label>
            <Button
              variant="ghost"
              onClick={() =>
                set("socialLinks", [...s.socialLinks, { platform: "", url: "" }])
              }
            >
              + Add
            </Button>
          </div>
          <div className="space-y-2">
            {s.socialLinks.map((sl, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="Platform"
                  value={sl.platform}
                  onChange={(e) => updateSocial(i, { platform: e.target.value })}
                />
                <Input
                  placeholder="https://…"
                  value={sl.url}
                  onChange={(e) => updateSocial(i, { url: e.target.value })}
                />
                <Button
                  variant="danger"
                  onClick={() =>
                    set(
                      "socialLinks",
                      s.socialLinks.filter((_, j) => j !== i),
                    )
                  }
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
          <Button disabled={saving} onClick={save}>
            {saving ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

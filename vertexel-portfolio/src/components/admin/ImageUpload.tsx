import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export function ImageUpload({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setErr(null);
    try {
      const url = await uploadToCloudinary(f);
      onChange(url);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="text-sm text-muted-foreground mb-2 block">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <img
            src={value}
            alt=""
            className="w-16 h-16 rounded-lg object-cover border border-border"
          />
        )}
        <label className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:bg-muted">
          {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-muted-foreground hover:text-destructive"
          >
            Remove
          </button>
        )}
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="mt-2 w-full rounded-lg bg-surface border border-border px-3 py-2 text-sm"
      />
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}

export function GalleryUpload({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBusy(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      onChange([...value, ...urls]);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="text-sm text-muted-foreground mb-2 block">Gallery</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((u, i) => (
          <div key={i} className="relative group">
            <img src={u} alt="" className="w-20 h-20 rounded-lg object-cover border border-border" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <label className="cursor-pointer inline-block rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:bg-muted">
        {busy ? "Uploading…" : "Add images"}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </label>
    </div>
  );
}

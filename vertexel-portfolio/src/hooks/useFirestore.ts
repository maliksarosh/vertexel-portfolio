import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Experience, Project, SiteSettings, Testimonial } from "@/lib/types";
import {
  defaultExperience,
  defaultProjects,
  defaultSiteSettings,
  defaultTestimonials,
} from "@/lib/defaults";

/** Generic loader with defaults fallback so the site renders before Firestore is seeded. */
function useCollection<T>(
  name: string,
  fallback: T[],
  opts?: { publishedOnly?: boolean },
) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const base = collection(db, name);
        const q = opts?.publishedOnly
          ? query(base, where("status", "==", "published"), orderBy("order", "asc"))
          : query(base, orderBy("order", "asc"));
        const snap = await getDocs(q);
        if (cancelled) return;
        if (snap.empty) {
          setData(fallback);
        } else {
          setData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as T[]);
        }
      } catch (err) {
        console.warn(`[useFirestore] ${name} fell back to defaults:`, err);
        if (!cancelled) setData(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return { data, loading };
}

export const useProjects = () =>
  useCollection<Project>("projects", defaultProjects, { publishedOnly: true });

export const useExperience = () => useCollection<Experience>("experience", defaultExperience);

export const useTestimonials = () =>
  useCollection<Testimonial>("testimonials", defaultTestimonials);

export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "siteSettings", "main"));
        if (cancelled) return;
        if (snap.exists()) setData({ ...defaultSiteSettings, ...(snap.data() as SiteSettings) });
      } catch (err) {
        console.warn("[useSiteSettings] fell back:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return { data, loading };
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(
      collection(db, "projects"),
      where("slug", "==", slug),
      where("status", "==", "published"),
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as object) } as Project;
    }
  } catch (err) {
    console.warn("[fetchProjectBySlug] error:", err);
  }
  // Fallback to defaults so detail pages work before Firestore is seeded.
  return defaultProjects.find((p) => p.slug === slug) ?? null;
}

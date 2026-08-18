import type { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  coverUrl: string;
  gallery: string[];
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  link: string | null;
  status: "draft" | "published";
  order: number;
  blurb?: string;
  createdAt?: Timestamp;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  description: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  photoUrl?: string;
  order: number;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  read: boolean;
  createdAt?: Timestamp;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubtext: string;
  bio: string;
  socialLinks: SocialLink[];
  contactEmail: string;
  contactPhone: string;
}

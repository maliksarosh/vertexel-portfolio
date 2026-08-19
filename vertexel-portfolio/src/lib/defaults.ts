import type { Experience, Project, SiteSettings, Testimonial } from "./types";

export const defaultSiteSettings: SiteSettings = {
  heroHeadline: "Building Digital Solutions That Drive Growth",
  heroSubtext:
    "Vertexel designs and develops modern, scalable digital solutions that help businesses establish a stronger online presence, streamline operations, and achieve their objectives.",
  bio: "Vertexel is a software and digital solutions company focused on building reliable, modern, and user-centered technology solutions for businesses and organizations. We combine technical expertise, creative thinking, and a results-driven approach to transform ideas into practical digital products. From websites and mobile applications to custom software solutions, we work closely with our clients to deliver solutions aligned with their business objectives. Our goal is to create technology that is functional, scalable, and built to deliver lasting value.",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Email", url: "mailto:maliksarosh33@gmail.com" },
    { platform: "WhatsApp", url: "https://wa.me/923701808550" },
  ],
  contactEmail: "maliksarosh33@gmail.com",
  contactPhone: "",
};

export const defaultProjects: Project[] = [
  {
    id: "d-1",
    title: "Football AI Referee System",
    slug: "football-ai-referee",
    tags: ["AI", "Computer Vision"],
    coverUrl: "",
    gallery: [],
    problem: "Amateur football matches lack the officiating consistency of professional leagues.",
    solution: "Built a real-time computer vision pipeline that tracks players, ball trajectory, and calls offside from a single camera feed.",
    outcome: "Deployed at a local academy; reduced disputed calls per match by 70%.",
    techStack: ["Python", "PyTorch", "OpenCV", "FastAPI"],
    link: null,
    status: "published",
    order: 1,
    blurb: "Real-time offside detection from a single camera feed.",
  },
  {
    id: "d-2",
    title: "OCR SaaS Platform",
    slug: "ocr-saas",
    tags: ["SaaS", "OCR"],
    coverUrl: "",
    gallery: [],
    problem: "SMB accounting teams spend hours re-keying receipts and invoices.",
    solution: "Full-stack SaaS with OCR, structured extraction, and a review UI. Billing, org management, and API access included.",
    outcome: "Live with paying customers; processes ~40k documents/month.",
    techStack: ["Next.js", "Postgres", "Tesseract", "Stripe"],
    link: null,
    status: "published",
    order: 2,
    blurb: "OCR + structured extraction for accounting teams.",
  },
  {
    id: "d-3",
    title: "Student Registration System",
    slug: "student-registration",
    tags: ["Web App", "Institution"],
    coverUrl: "",
    gallery: [],
    problem: "Manual registration at a mid-sized institute couldn't scale past ~2000 students.",
    solution: "End-to-end registration, fee tracking, and reporting system with role-based access.",
    outcome: "Adopted institute-wide; cut registration week workload from days to hours.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    link: null,
    status: "published",
    order: 3,
    blurb: "End-to-end registration & fees for a growing institute.",
  },
  {
    id: "d-4",
    title: "BIIT Society Management",
    slug: "biit-society",
    tags: ["Community", "Web App"],
    coverUrl: "",
    gallery: [],
    problem: "Student societies coordinated events across scattered spreadsheets and chats.",
    solution: "Unified platform for events, memberships, announcements, and internal comms.",
    outcome: "Used by multiple societies; became the default coordination layer.",
    techStack: ["React", "Firebase"],
    link: null,
    status: "published",
    order: 4,
    blurb: "One platform for events, memberships, and comms.",
  },
];

export const defaultExperience: Experience[] = [
  {
    id: "e-1",
    role: "Founder & Lead Engineer",
    organization: "Vertexel",
    startDate: "2023",
    endDate: null,
    description: "Leading a professional software studio delivering comprehensive full-stack solutions for clients across AI, SaaS, and internal tooling.",
    order: 1,
  },
  {
    id: "e-2",
    role: "QA Engineer",
    organization: "Contract",
    startDate: "2022",
    endDate: "Present",
    description: "Test automation and release engineering alongside client work.",
    order: 2,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "t-1",
    quote: "Sarosh delivered exactly what we needed — on time and without hand-holding. Rare combination.",
    name: "Client A",
    title: "Product Lead",
    order: 1,
  },
  {
    id: "t-2",
    quote: "He treats your product like it's his own. The care shows in every detail.",
    name: "Client B",
    title: "Founder",
    order: 2,
  },
];

export const services = [
  { n: "01", title: "Custom Software", tags: ["End-to-end", "Full-stack", "Production"] },
  { n: "02", title: "Web Applications", tags: ["React", "Next.js", "Realtime"] },
  { n: "03", title: "Mobile Apps", tags: ["React Native", "Cross-platform"] },
  { n: "04", title: "AI Integrations", tags: ["LLMs", "Computer Vision", "Automation"] },
  { n: "05", title: "APIs & Backends", tags: ["Node", "Python", "Postgres"] },
  { n: "06", title: "Deployment & DevOps", tags: ["CI/CD", "Cloud", "Monitoring"] },
];

export const faqs = [
  { q: "How much does a typical project cost?", a: "Small builds start around $500. Full products range from $5k–$25k depending on scope. Every quote is fixed-fee after a discovery call — no surprise invoices." },
  { q: "How long does a project take?", a: "Small scopes ship in 1–2 weeks. Full products typically 4–10 weeks. Timelines are agreed upfront and we keep you posted weekly." },
  { q: "How many revisions do I get?", a: "Unlimited within the agreed scope. We want you satisfied with the result, not counting rounds." },
  { q: "Do you work with people outside your timezone?", a: "Yes — most clients are in a different timezone. We use async updates (Loom + written) and schedule calls when needed." },
  { q: "How do we start?", a: "Book a call. We scope the work, agree a fixed fee and timeline, and we start the following week." },
  { q: "How do payments work?", a: "50% upfront, 50% on delivery for smaller projects. Milestone-based for larger builds. Bank transfer or Wise." },
  { q: "Who actually writes the code?", a: "Our experienced team handles all development. No agency middleman, no offshore operations—every project receives direct attention from our core team." },
];

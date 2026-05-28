import type { CareerEvent, University } from "@/lib/types";

export const universities: University[] = [
  { id: "u_chula", name: "Chulalongkorn University", shortName: "Chula", city: "Bangkok" },
  { id: "u_tu", name: "Thammasat University", shortName: "Thammasat", city: "Bangkok" },
  { id: "u_mahidol", name: "Mahidol University", shortName: "Mahidol", city: "Nakhon Pathom" },
  { id: "u_ku", name: "Kasetsart University", shortName: "Kasetsart", city: "Bangkok" },
  { id: "u_kmutt", name: "KMUTT", shortName: "KMUTT", city: "Bangkok" },
  { id: "u_cmu", name: "Chiang Mai University", shortName: "CMU", city: "Chiang Mai" },
];

// Dates are fixed in the near future relative to the build.
export const events: CareerEvent[] = [
  {
    id: "e_chula_fair",
    slug: "chula-tech-career-fair-2026",
    title: "Chula Tech Career Fair 2026",
    host: "Chulalongkorn University",
    kind: "Career fair",
    mode: "On-site",
    location: "Chamchuri Square, Bangkok",
    date: "2026-06-12T09:00:00+07:00",
    durationMins: 360,
    attendees: 1200,
    description:
      "Meet 40+ top tech employers hiring interns and new grads. Bring your resume and your questions.",
  },
  {
    id: "e_agoda_info",
    slug: "agoda-engineering-info-session",
    title: "Inside Agoda Engineering",
    companyId: "c_agoda",
    host: "Agoda",
    kind: "Info session",
    mode: "Hybrid",
    location: "Agoda HQ + Online",
    date: "2026-06-03T18:00:00+07:00",
    durationMins: 90,
    attendees: 320,
    description:
      "Engineers share what it's like to build at scale, followed by a live Q&A and internship walkthrough.",
  },
  {
    id: "e_resume_workshop",
    slug: "resume-workshop-for-new-grads",
    title: "Resume Workshop for New Grads",
    host: "Spotlights",
    kind: "Workshop",
    mode: "Remote",
    location: "Online",
    date: "2026-05-30T19:00:00+07:00",
    durationMins: 60,
    attendees: 540,
    description:
      "A hands-on session on building a standout resume for the Thai tech market. Templates included.",
  },
  {
    id: "e_kbtg_ai",
    slug: "kbtg-ai-night",
    title: "KBTG AI Night",
    companyId: "c_kbtg",
    host: "KBTG",
    kind: "Networking",
    mode: "On-site",
    location: "KBTG Campus, Bangkok",
    date: "2026-06-20T17:30:00+07:00",
    durationMins: 180,
    attendees: 260,
    description:
      "Talks from KBTG's AI lab plus networking with researchers and recruiters. Refreshments provided.",
  },
  {
    id: "e_cmu_fair",
    slug: "northern-thailand-startup-fair",
    title: "Northern Thailand Startup Fair",
    host: "Chiang Mai University",
    kind: "Career fair",
    mode: "On-site",
    location: "CMU Convention Hall, Chiang Mai",
    date: "2026-07-04T10:00:00+07:00",
    durationMins: 300,
    attendees: 680,
    description:
      "Connect with startups and scale-ups hiring across the North. Roles in software, data and operations.",
  },
  {
    id: "e_fintech_panel",
    slug: "breaking-into-fintech-panel",
    title: "Breaking Into Fintech",
    host: "Spotlights",
    kind: "Networking",
    mode: "Remote",
    location: "Online",
    date: "2026-06-09T19:00:00+07:00",
    durationMins: 75,
    attendees: 410,
    description:
      "A panel with engineers and PMs from SCB TechX, Bitkub and Opn on starting a fintech career.",
  },
];

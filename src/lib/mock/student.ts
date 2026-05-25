import type { StudentProfile } from "@/lib/types";

/** Demo student used to render the dashboard/profile in this frontend-only build. */
export const demoStudent: StudentProfile = {
  name: "Praewa Saetang",
  headline: "CS student @ Chulalongkorn · seeking 2026 software internship",
  university: "Chulalongkorn University",
  major: "Computer Engineering",
  gradYear: 2026,
  location: "Bangkok",
  about:
    "Third-year computer engineering student who loves building web apps and tinkering with ML side-projects. Looking for a summer 2026 internship where I can learn from a strong engineering team.",
  skills: ["React", "TypeScript", "Python", "SQL", "Figma", "Git"],
  openTo: ["Internship", "New grad"],
  profileCompletion: 72,
};

/** Job ids the demo student has saved / applied to, for dashboard state. */
export const demoSavedJobIds = ["j_agoda_fe", "j_kbtg_ml", "j_scb_data"];
export const demoAppliedJobIds = ["j_bitkub_pm", "j_true_ux"];

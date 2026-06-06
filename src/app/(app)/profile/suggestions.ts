import type { Locale } from "@/lib/i18n/dictionaries";

/**
 * Autocomplete suggestions for the profile editor. Locale-aware so the Thai UI
 * has full parity. Tech skill names (Python, React, …) stay in Latin script in
 * both locales — that's how they're written in Thai job posts too.
 */
type SuggestionSet = {
  skills: string[];
  languages: string[];
  jobTypes: string[];
  roles: string[];
  industries: string[];
  locations: string[];
  schools: string[];
  pronouns: string[];
  employmentTypes: string[];
  degrees: string[];
};

const SKILLS = [
  "Python", "JavaScript", "TypeScript", "Java", "C++", "Go", "SQL",
  "React", "Next.js", "Node.js", "HTML", "CSS", "Tailwind CSS",
  "Figma", "UI Design", "UX Research", "Product Management",
  "Data Analysis", "Machine Learning", "Excel", "Power BI", "Tableau",
  "Git", "Docker", "AWS", "Communication", "Project Management",
  "Marketing", "SEO", "Content Writing", "Public Speaking",
];

const en: SuggestionSet = {
  skills: SKILLS,
  languages: [
    "Thai", "English", "Chinese (Mandarin)", "Japanese", "Korean",
    "French", "German", "Spanish", "Lao", "Khmer", "Vietnamese", "Burmese",
  ],
  jobTypes: ["Internship", "New grad", "Full-time", "Part-time", "Contract"],
  roles: [
    "Software Engineer", "Frontend Developer", "Backend Engineer",
    "Full-Stack Developer", "Data Analyst", "Data Scientist",
    "Product Manager", "UX/UI Designer", "Marketing", "Business Analyst",
    "DevOps Engineer", "Mobile Developer", "QA Engineer",
  ],
  industries: [
    "Software", "Fintech", "E-commerce", "Consulting", "Marketing",
    "Design", "Data & AI", "Hospitality", "Healthcare", "Energy",
  ],
  locations: [
    "Bangkok", "Chiang Mai", "Phuket", "Khon Kaen", "Nonthaburi",
    "Remote", "Hybrid", "Anywhere in Thailand",
  ],
  schools: [
    "Chulalongkorn University", "Thammasat University", "Mahidol University",
    "Kasetsart University", "KMUTT", "Chiang Mai University",
    "KMITL", "Mahidol University International College", "Assumption University",
    "Srinakharinwirot University",
  ],
  pronouns: ["he/him", "she/her", "they/them"],
  employmentTypes: [
    "Internship", "Full-time", "Part-time", "Contract", "Freelance", "Volunteer",
  ],
  degrees: [
    "Bachelor's degree", "Master's degree", "Doctorate", "High School Diploma",
    "Associate's degree", "Certificate",
  ],
};

const th: SuggestionSet = {
  skills: SKILLS,
  languages: [
    "ไทย", "อังกฤษ", "จีน (กลาง)", "ญี่ปุ่น", "เกาหลี",
    "ฝรั่งเศส", "เยอรมัน", "สเปน", "ลาว", "เขมร", "เวียดนาม", "พม่า",
  ],
  jobTypes: ["ฝึกงาน", "จบใหม่", "งานประจำ", "งานพาร์ทไทม์", "สัญญาจ้าง"],
  roles: [
    "วิศวกรซอฟต์แวร์", "นักพัฒนา Frontend", "วิศวกร Backend",
    "นักพัฒนา Full-Stack", "นักวิเคราะห์ข้อมูล", "นักวิทยาศาสตร์ข้อมูล",
    "ผู้จัดการผลิตภัณฑ์", "นักออกแบบ UX/UI", "การตลาด", "นักวิเคราะห์ธุรกิจ",
    "วิศวกร DevOps", "นักพัฒนาแอปมือถือ", "วิศวกรทดสอบ (QA)",
  ],
  industries: [
    "ซอฟต์แวร์", "ฟินเทค", "อีคอมเมิร์ซ", "ที่ปรึกษา", "การตลาด",
    "ดีไซน์", "ข้อมูลและ AI", "งานบริการ", "สุขภาพ", "พลังงาน",
  ],
  locations: [
    "กรุงเทพฯ", "เชียงใหม่", "ภูเก็ต", "ขอนแก่น", "นนทบุรี",
    "ทำงานทางไกล", "ไฮบริด", "ที่ไหนก็ได้ในไทย",
  ],
  schools: [
    "จุฬาลงกรณ์มหาวิทยาลัย", "มหาวิทยาลัยธรรมศาสตร์", "มหาวิทยาลัยมหิดล",
    "มหาวิทยาลัยเกษตรศาสตร์", "มจธ. (KMUTT)", "มหาวิทยาลัยเชียงใหม่",
    "สจล. (KMITL)", "วิทยาลัยนานาชาติ มหิดล", "มหาวิทยาลัยอัสสัมชัญ",
    "มหาวิทยาลัยศรีนครินทรวิโรฒ",
  ],
  pronouns: ["เขา/เขา", "เธอ/เธอ", "เขา (กลาง)"],
  employmentTypes: [
    "ฝึกงาน", "งานประจำ", "งานพาร์ทไทม์", "สัญญาจ้าง", "ฟรีแลนซ์", "อาสาสมัคร",
  ],
  degrees: [
    "ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก", "มัธยมปลาย",
    "อนุปริญญา", "ประกาศนียบัตร",
  ],
};

const SETS: Record<Locale, SuggestionSet> = { en, th };

export function getSuggestions(locale: Locale): SuggestionSet {
  return SETS[locale] ?? en;
}

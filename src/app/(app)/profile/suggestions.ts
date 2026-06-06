import type { Locale } from "@/lib/i18n/dictionaries";

/**
 * Autocomplete suggestions for the profile editor. Locale-aware with full EN/TH
 * parity (lists are index-aligned). Tech/proper-noun terms (Python, Figma, Excel)
 * stay in Latin script in both locales — that's how they're written in Thai job
 * posts too; everything else is localized.
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

const en: SuggestionSet = {
  skills: [
    // Tech
    "Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "React",
    "Next.js", "Node.js", "HTML", "CSS", "Git", "Docker", "AWS",
    "Machine Learning", "Data Analysis",
    // Tools & office
    "Excel", "Power BI", "Tableau", "PowerPoint", "Google Workspace", "Notion",
    // Design & creative
    "Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva", "UI Design",
    "UX Research", "Video Editing", "Photography",
    // Business & finance
    "Financial Modeling", "Accounting", "Market Research",
    "Business Development", "Sales", "Negotiation",
    // Marketing
    "Digital Marketing", "SEO", "Social Media Marketing", "Content Writing",
    "Copywriting",
    // Soft / general
    "Communication", "Leadership", "Teamwork", "Project Management",
    "Problem Solving", "Public Speaking", "Customer Service", "Event Planning",
    "Translation", "Research", "Teaching", "Data Entry",
  ],
  languages: [
    "Thai", "English", "Chinese (Mandarin)", "Japanese", "Korean", "French",
    "German", "Spanish", "Lao", "Khmer", "Vietnamese", "Burmese", "Malay",
    "Hindi", "Arabic", "Russian",
  ],
  jobTypes: ["Internship", "New grad", "Full-time", "Part-time", "Contract"],
  roles: [
    // Tech
    "Software Engineer", "Frontend Developer", "Backend Engineer",
    "Full-Stack Developer", "Mobile Developer", "Data Analyst",
    "Data Scientist", "DevOps Engineer", "QA Engineer", "Product Manager",
    "UX/UI Designer",
    // Business / finance / ops
    "Business Analyst", "Financial Analyst", "Investment Analyst",
    "Accountant", "Auditor", "Management Consultant", "Operations Associate",
    "Supply Chain Analyst",
    // Marketing / creative
    "Marketing Associate", "Digital Marketer", "Social Media Manager",
    "Content Creator", "Graphic Designer", "Copywriter", "PR Associate",
    // People / sales / admin
    "HR Coordinator", "Recruiter", "Sales Associate", "Account Manager",
    "Customer Success Associate",
    // Other fields
    "Research Assistant", "Teaching Assistant", "Journalist", "Translator",
    "Civil Engineer", "Mechanical Engineer", "Architect", "Nurse",
    "Hospitality Associate",
  ],
  industries: [
    "Software", "Fintech", "E-commerce", "Banking & Finance", "Consulting",
    "Marketing & Advertising", "Design & Creative", "Data & AI",
    "Hospitality & Tourism", "Healthcare", "Energy", "Education",
    "Media & Entertainment", "Manufacturing", "Logistics & Supply Chain",
    "Real Estate", "Government & Public Sector", "Nonprofit & NGO", "Retail",
    "Telecommunications",
  ],
  locations: [
    "Bangkok", "Chiang Mai", "Phuket", "Khon Kaen", "Nonthaburi", "Pattaya",
    "Nakhon Ratchasima", "Hat Yai", "Ayutthaya", "Chiang Rai", "Remote",
    "Hybrid", "Anywhere in Thailand",
  ],
  schools: [
    "Chulalongkorn University", "Thammasat University", "Mahidol University",
    "Kasetsart University", "KMUTT", "Chiang Mai University", "KMITL",
    "KMUTNB", "Khon Kaen University", "Prince of Songkla University",
    "Silpakorn University", "Bangkok University", "Assumption University",
    "Srinakharinwirot University", "Mahidol University International College",
  ],
  pronouns: ["he/him", "she/her", "they/them"],
  employmentTypes: [
    "Internship", "Full-time", "Part-time", "Contract", "Freelance", "Volunteer",
  ],
  degrees: [
    "Bachelor's degree", "Master's degree", "Doctorate", "High School Diploma",
    "Vocational Certificate", "Associate's degree", "Certificate",
  ],
};

const th: SuggestionSet = {
  skills: [
    // Tech (kept Latin)
    "Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "React",
    "Next.js", "Node.js", "HTML", "CSS", "Git", "Docker", "AWS",
    "Machine Learning", "การวิเคราะห์ข้อมูล",
    // Tools & office
    "Excel", "Power BI", "Tableau", "PowerPoint", "Google Workspace", "Notion",
    // Design & creative
    "Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva", "ออกแบบ UI",
    "วิจัย UX", "ตัดต่อวิดีโอ", "ถ่ายภาพ",
    // Business & finance
    "การสร้างแบบจำลองทางการเงิน", "บัญชี", "วิจัยตลาด",
    "พัฒนาธุรกิจ", "การขาย", "การเจรจาต่อรอง",
    // Marketing
    "การตลาดดิจิทัล", "SEO", "การตลาดโซเชียลมีเดีย", "เขียนคอนเทนต์",
    "เขียนโฆษณา",
    // Soft / general
    "การสื่อสาร", "ความเป็นผู้นำ", "การทำงานเป็นทีม", "การบริหารโครงการ",
    "การแก้ปัญหา", "การพูดในที่สาธารณะ", "บริการลูกค้า", "การวางแผนอีเวนต์",
    "การแปลภาษา", "การวิจัย", "การสอน", "การป้อนข้อมูล",
  ],
  languages: [
    "ไทย", "อังกฤษ", "จีน (กลาง)", "ญี่ปุ่น", "เกาหลี", "ฝรั่งเศส",
    "เยอรมัน", "สเปน", "ลาว", "เขมร", "เวียดนาม", "พม่า", "มลายู",
    "ฮินดี", "อาหรับ", "รัสเซีย",
  ],
  jobTypes: ["ฝึกงาน", "จบใหม่", "งานประจำ", "งานพาร์ทไทม์", "สัญญาจ้าง"],
  roles: [
    // Tech
    "วิศวกรซอฟต์แวร์", "นักพัฒนา Frontend", "วิศวกร Backend",
    "นักพัฒนา Full-Stack", "นักพัฒนาแอปมือถือ", "นักวิเคราะห์ข้อมูล",
    "นักวิทยาศาสตร์ข้อมูล", "วิศวกร DevOps", "วิศวกรทดสอบ (QA)",
    "ผู้จัดการผลิตภัณฑ์", "นักออกแบบ UX/UI",
    // Business / finance / ops
    "นักวิเคราะห์ธุรกิจ", "นักวิเคราะห์การเงิน", "นักวิเคราะห์การลงทุน",
    "นักบัญชี", "ผู้ตรวจสอบบัญชี", "ที่ปรึกษาด้านการจัดการ",
    "เจ้าหน้าที่ปฏิบัติการ", "นักวิเคราะห์ซัพพลายเชน",
    // Marketing / creative
    "เจ้าหน้าที่การตลาด", "นักการตลาดดิจิทัล", "ผู้จัดการโซเชียลมีเดีย",
    "ครีเอเตอร์คอนเทนต์", "นักออกแบบกราฟิก", "นักเขียนโฆษณา",
    "เจ้าหน้าที่ประชาสัมพันธ์",
    // People / sales / admin
    "เจ้าหน้าที่ทรัพยากรบุคคล", "เจ้าหน้าที่สรรหา", "พนักงานขาย",
    "ผู้จัดการลูกค้า", "เจ้าหน้าที่ดูแลลูกค้า",
    // Other fields
    "ผู้ช่วยวิจัย", "ผู้ช่วยสอน", "นักข่าว", "นักแปล",
    "วิศวกรโยธา", "วิศวกรเครื่องกล", "สถาปนิก", "พยาบาล",
    "เจ้าหน้าที่งานบริการ",
  ],
  industries: [
    "ซอฟต์แวร์", "ฟินเทค", "อีคอมเมิร์ซ", "ธนาคารและการเงิน", "ที่ปรึกษา",
    "การตลาดและโฆษณา", "ดีไซน์และครีเอทีฟ", "ข้อมูลและ AI",
    "งานบริการและท่องเที่ยว", "สุขภาพ", "พลังงาน", "การศึกษา",
    "สื่อและบันเทิง", "การผลิต", "โลจิสติกส์และซัพพลายเชน",
    "อสังหาริมทรัพย์", "ภาครัฐ", "องค์กรไม่แสวงหากำไร", "ค้าปลีก",
    "โทรคมนาคม",
  ],
  locations: [
    "กรุงเทพฯ", "เชียงใหม่", "ภูเก็ต", "ขอนแก่น", "นนทบุรี", "พัทยา",
    "นครราชสีมา", "หาดใหญ่", "อยุธยา", "เชียงราย", "ทำงานทางไกล",
    "ไฮบริด", "ที่ไหนก็ได้ในไทย",
  ],
  schools: [
    "จุฬาลงกรณ์มหาวิทยาลัย", "มหาวิทยาลัยธรรมศาสตร์", "มหาวิทยาลัยมหิดล",
    "มหาวิทยาลัยเกษตรศาสตร์", "มจธ. (KMUTT)", "มหาวิทยาลัยเชียงใหม่", "สจล. (KMITL)",
    "มจพ. (KMUTNB)", "มหาวิทยาลัยขอนแก่น", "มหาวิทยาลัยสงขลานครินทร์",
    "มหาวิทยาลัยศิลปากร", "มหาวิทยาลัยกรุงเทพ", "มหาวิทยาลัยอัสสัมชัญ",
    "มหาวิทยาลัยศรีนครินทรวิโรฒ", "วิทยาลัยนานาชาติ มหิดล",
  ],
  pronouns: ["เขา/เขา", "เธอ/เธอ", "เขา (กลาง)"],
  employmentTypes: [
    "ฝึกงาน", "งานประจำ", "งานพาร์ทไทม์", "สัญญาจ้าง", "ฟรีแลนซ์", "อาสาสมัคร",
  ],
  degrees: [
    "ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก", "มัธยมปลาย",
    "ปวช./ปวส.", "อนุปริญญา", "ประกาศนียบัตร",
  ],
};

const SETS: Record<Locale, SuggestionSet> = { en, th };

export function getSuggestions(locale: Locale): SuggestionSet {
  return SETS[locale] ?? en;
}

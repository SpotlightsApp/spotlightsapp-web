// English + Thai strings for the marketing surface and shared chrome.
// `th` must mirror the shape of `en` (TypeScript enforces this via `Dict`).

export const en = {
  nav: {
    findJobs: "Find jobs",
    companies: "Companies",
    events: "Events",
    forEmployers: "For employers",
    login: "Log in",
    signup: "Sign up",
    menu: "Menu",
  },
  hero: {
    badge: "Thailand's home for early-career talent",
    titlePre: "Find what's ",
    titleHighlight: "next",
    titlePost: ".",
    subhead:
      "Where Thailand's students and new grads connect with internships, jobs, and the companies building the region's future.",
    student: "I'm a student",
    hiring: "I'm hiring",
    searchStudent: "Job title, skill, or company",
    searchEmployer: "What role are you hiring for?",
    location: "Location (e.g. Bangkok)",
    search: "Search",
    popular: "Popular:",
    popularItems: ["Software Internship", "Data Analyst", "New Grad"],
  },
  demo: {
    eyebrow: "Our product",
    heading: "Your whole job search, in one place",
    subhead:
      "From discovery to offer — here's how Spotlight works for students.",
    tabs: {
      jobs: "Find jobs",
      detail: "Role details",
      dashboard: "Your dashboard",
      company: "Companies",
    },
    blurbs: {
      jobs: "Search and filter internships and new-grad roles built for students.",
      detail: "See the full role, salary in THB, and apply in a single click.",
      dashboard:
        "Track applications, saved jobs, and recommendations in one place.",
      company:
        "Explore companies hiring in Thailand and all of their open roles.",
    },
  },
  stats: {
    eyebrow: "The early-career gap",
    heading: "The problem isn't talent — it's access",
    subhead:
      "Thailand graduates more capable students every year than the job market connects them to. Opportunity still depends on who you know.",
    items: [
      { value: "5×", label: "Youth unemployment runs several times Thailand's national rate" },
      { value: "1 in 3", label: "Grads work in jobs that don't require their degree" },
      { value: "70%", label: "Of roles are filled through personal networks — not open applications" },
    ],
    footnote:
      "Directional estimates from Thai labour-market and graduate-employment research.",
  },
  positioning: {
    eyebrow: "Why Spotlight",
    heading: "Built for students — not the already-employed",
    subhead:
      "LinkedIn, JobsDB and JobThai were made for people already in the workforce. We're building the opposite: a level playing field for the people just starting out.",
    oldTitle: "Generic job platforms",
    oldWay: [
      "Built for experienced professionals — students compete against senior hires",
      "You need a polished network and résumé just to get seen",
      "Opportunity flows to whoever already has connections",
      "Employers can't filter for early-career potential",
    ],
    spotlightTitle: "The Spotlight way",
    spotlightWay: [
      "Built only for students and new grads — everyone's at the same stage",
      "A verified university community (.ac.th) — no gatekeeping",
      "Matched on skills and potential, not who you know",
      "Employers discover talent by what they can do, not years of experience",
    ],
  },
  how: {
    heading: "Your career, three steps away",
    subhead:
      "Spotlight makes it simple to go from student to hired — across every field.",
    steps: [
      {
        title: "Build your profile",
        body: "Add your university, skills, and what you're looking for. Stand out to employers in minutes.",
      },
      {
        title: "Discover opportunities",
        body: "Browse internships and jobs from Thailand's top companies, filtered to fit you.",
      },
      {
        title: "Apply & connect",
        body: "Apply in one click, message recruiters, and track every application in one place.",
      },
    ],
    fieldsLabel: "Opportunities across every field",
    fields: [
      "Software",
      "Data & AI",
      "Fintech",
      "E-commerce",
      "Design",
      "Marketing",
      "Consulting",
      "Hospitality",
    ],
  },
  waitlist: {
    eyebrow: "Launching soon",
    heading: "Be first in the spotlight",
    subhead:
      "We're building Thailand's home for early-career talent. Join the waitlist and we'll get you in as we roll out.",
    student: "I'm a student",
    hiring: "I'm hiring",
    placeholder: "you@university.ac.th",
    submit: "Join the waitlist",
    helper: "Be among the first students and employers on Spotlight. No spam.",
    invalid: "Please enter a valid email address.",
    serverError: "Something went wrong — please try again.",
    success: "You're on the list! We'll be in touch as we roll out.",
    already: "You're already on the list — see you at launch!",
  },
  footer: {
    tagline: "Where Thailand's students and new grads find what's next.",
    studentsTitle: "For students",
    employersTitle: "For employers",
    resourcesTitle: "Resources",
    companyTitle: "Company",
    links: {
      findJobs: "Find jobs",
      internships: "Internships",
      companies: "Companies",
      careerEvents: "Career events",
      postJob: "Post a job",
      findTalent: "Find talent",
      campusEvents: "Campus events",
      pricing: "Pricing",
      careerGuides: "Career guides",
      resumeTips: "Resume tips",
      salaryInsights: "Salary insights",
      helpCenter: "Help center",
      about: "About",
      universities: "Universities",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
    },
    madeIn: "Spotlight. Made in Bangkok 🇹🇭",
  },
};

export const th: typeof en = {
  nav: {
    findJobs: "หางาน",
    companies: "บริษัท",
    events: "อีเวนต์",
    forEmployers: "สำหรับผู้ว่าจ้าง",
    login: "เข้าสู่ระบบ",
    signup: "สมัครสมาชิก",
    menu: "เมนู",
  },
  hero: {
    badge: "บ้านของคนรุ่นใหม่ที่กำลังเริ่มต้นอาชีพในไทย",
    titlePre: "ค้นหา",
    titleHighlight: "ก้าวต่อไป",
    titlePost: "ของคุณ",
    subhead:
      "ที่ที่นักศึกษาและบัณฑิตจบใหม่ในไทยได้เชื่อมต่อกับงานฝึกงาน งานประจำ และบริษัทที่กำลังสร้างอนาคตของภูมิภาค",
    student: "ฉันเป็นนักศึกษา",
    hiring: "ฉันกำลังหาคน",
    searchStudent: "ตำแหน่งงาน ทักษะ หรือบริษัท",
    searchEmployer: "คุณกำลังรับสมัครตำแหน่งใด?",
    location: "สถานที่ (เช่น กรุงเทพฯ)",
    search: "ค้นหา",
    popular: "ยอดนิยม:",
    popularItems: ["ฝึกงานสายซอฟต์แวร์", "นักวิเคราะห์ข้อมูล", "บัณฑิตจบใหม่"],
  },
  demo: {
    eyebrow: "ผลิตภัณฑ์ของเรา",
    heading: "ทุกการหางานของคุณ ในที่เดียว",
    subhead: "ตั้งแต่ค้นหาจนถึงได้งาน — นี่คือวิธีที่ Spotlight ช่วยนักศึกษา",
    tabs: {
      jobs: "หางาน",
      detail: "รายละเอียดงาน",
      dashboard: "แดชบอร์ดของคุณ",
      company: "บริษัท",
    },
    blurbs: {
      jobs: "ค้นหาและกรองงานฝึกงานและงานสำหรับบัณฑิตจบใหม่ที่ออกแบบมาเพื่อนักศึกษา",
      detail: "ดูรายละเอียดงานทั้งหมด เงินเดือนเป็นบาท และสมัครได้ในคลิกเดียว",
      dashboard: "ติดตามใบสมัคร งานที่บันทึกไว้ และคำแนะนำ ได้ในที่เดียว",
      company: "สำรวจบริษัทที่กำลังรับสมัครในไทยและตำแหน่งงานที่เปิดรับทั้งหมด",
    },
  },
  stats: {
    eyebrow: "ช่องว่างของการเริ่มต้นอาชีพ",
    heading: "ปัญหาไม่ใช่ความสามารถ — แต่คือการเข้าถึงโอกาส",
    subhead:
      "ทุกปีไทยผลิตบัณฑิตที่มีความสามารถมากกว่าที่ตลาดงานจะเชื่อมต่อให้ได้ และโอกาสยังขึ้นอยู่กับว่าคุณรู้จักใคร",
    items: [
      { value: "5 เท่า", label: "อัตราว่างงานของคนรุ่นใหม่สูงกว่าค่าเฉลี่ยของประเทศหลายเท่า" },
      { value: "1 ใน 3", label: "บัณฑิตทำงานที่ไม่ได้ใช้วุฒิที่เรียนมา" },
      { value: "70%", label: "ของตำแหน่งงานถูกเติมผ่านคนรู้จัก ไม่ใช่การสมัครแบบเปิด" },
    ],
    footnote: "ค่าประมาณการจากงานวิจัยตลาดแรงงานและการจ้างงานบัณฑิตของไทย",
  },
  positioning: {
    eyebrow: "ทำไมต้อง Spotlight",
    heading: "สร้างมาเพื่อนักศึกษา — ไม่ใช่คนที่มีงานทำอยู่แล้ว",
    subhead:
      "LinkedIn, JobsDB และ JobThai ถูกสร้างมาเพื่อคนที่อยู่ในตลาดแรงงานอยู่แล้ว เรากำลังสร้างสิ่งที่ตรงกันข้าม: สนามที่เท่าเทียมสำหรับคนที่เพิ่งเริ่มต้น",
    oldTitle: "แพลตฟอร์มหางานทั่วไป",
    oldWay: [
      "สร้างมาเพื่อมืออาชีพที่มีประสบการณ์ — นักศึกษาต้องแข่งกับคนที่อาวุโสกว่า",
      "ต้องมีคอนเนกชันและเรซูเม่ที่ดีเยี่ยมแค่เพื่อให้ถูกมองเห็น",
      "โอกาสไหลไปหาคนที่มีคอนเนกชันอยู่แล้ว",
      "ผู้ว่าจ้างคัดกรองศักยภาพของคนเริ่มต้นอาชีพไม่ได้",
    ],
    spotlightTitle: "แบบฉบับ Spotlight",
    spotlightWay: [
      "สร้างมาเพื่อนักศึกษาและบัณฑิตจบใหม่เท่านั้น — ทุกคนอยู่ในจุดเริ่มต้นเดียวกัน",
      "คอมมูนิตี้มหาวิทยาลัยที่ยืนยันตัวตน (.ac.th) — ไม่มีการกีดกัน",
      "จับคู่ด้วยทักษะและศักยภาพ ไม่ใช่คนที่คุณรู้จัก",
      "ผู้ว่าจ้างค้นพบคนเก่งจากสิ่งที่ทำได้ ไม่ใช่จำนวนปีประสบการณ์",
    ],
  },
  how: {
    heading: "อาชีพของคุณ ห่างแค่สามขั้นตอน",
    subhead:
      "Spotlight ทำให้การก้าวจากนักศึกษาสู่การได้งานเป็นเรื่องง่าย — ในทุกสาขา",
    steps: [
      {
        title: "สร้างโปรไฟล์ของคุณ",
        body: "เพิ่มมหาวิทยาลัย ทักษะ และสิ่งที่คุณกำลังมองหา โดดเด่นในสายตาผู้ว่าจ้างได้ในไม่กี่นาที",
      },
      {
        title: "ค้นพบโอกาส",
        body: "เลือกดูงานฝึกงานและงานจากบริษัทชั้นนำของไทย กรองให้เหมาะกับคุณ",
      },
      {
        title: "สมัครและเชื่อมต่อ",
        body: "สมัครในคลิกเดียว พูดคุยกับผู้สรรหา และติดตามทุกใบสมัครในที่เดียว",
      },
    ],
    fieldsLabel: "โอกาสในทุกสาขา",
    fields: [
      "ซอฟต์แวร์",
      "ข้อมูลและ AI",
      "ฟินเทค",
      "อีคอมเมิร์ซ",
      "ดีไซน์",
      "การตลาด",
      "ที่ปรึกษา",
      "งานบริการ",
    ],
  },
  waitlist: {
    eyebrow: "เปิดตัวเร็ว ๆ นี้",
    heading: "เป็นคนแรกที่ได้อยู่ในสปอตไลต์",
    subhead:
      "เรากำลังสร้างบ้านของคนรุ่นใหม่ที่กำลังเริ่มต้นอาชีพในไทย ลงชื่อรอแล้วเราจะพาคุณเข้าร่วมเมื่อเปิดให้บริการ",
    student: "ฉันเป็นนักศึกษา",
    hiring: "ฉันกำลังหาคน",
    placeholder: "you@university.ac.th",
    submit: "ลงชื่อรอ",
    helper: "เป็นกลุ่มแรกของนักศึกษาและผู้ว่าจ้างบน Spotlight ไม่มีสแปม",
    invalid: "กรุณากรอกอีเมลที่ถูกต้อง",
    serverError: "เกิดข้อผิดพลาด — กรุณาลองใหม่อีกครั้ง",
    success: "คุณอยู่ในรายชื่อแล้ว! เราจะติดต่อกลับเมื่อเปิดให้บริการ",
    already: "คุณอยู่ในรายชื่ออยู่แล้ว — เจอกันตอนเปิดตัว!",
  },
  footer: {
    tagline: "ที่ที่นักศึกษาและบัณฑิตจบใหม่ในไทยค้นพบก้าวต่อไป",
    studentsTitle: "สำหรับนักศึกษา",
    employersTitle: "สำหรับผู้ว่าจ้าง",
    resourcesTitle: "แหล่งข้อมูล",
    companyTitle: "บริษัท",
    links: {
      findJobs: "หางาน",
      internships: "ฝึกงาน",
      companies: "บริษัท",
      careerEvents: "อีเวนต์อาชีพ",
      postJob: "ประกาศงาน",
      findTalent: "ค้นหาคนเก่ง",
      campusEvents: "อีเวนต์ในมหาวิทยาลัย",
      pricing: "ราคา",
      careerGuides: "คู่มืออาชีพ",
      resumeTips: "เคล็ดลับเรซูเม่",
      salaryInsights: "ข้อมูลเงินเดือน",
      helpCenter: "ศูนย์ช่วยเหลือ",
      about: "เกี่ยวกับเรา",
      universities: "มหาวิทยาลัย",
      privacy: "ความเป็นส่วนตัว",
      terms: "ข้อกำหนด",
      contact: "ติดต่อ",
    },
    madeIn: "Spotlight สร้างในกรุงเทพฯ 🇹🇭",
  },
};

export type Dict = typeof en;
export const dictionaries = { en, th };
export type Locale = keyof typeof dictionaries;

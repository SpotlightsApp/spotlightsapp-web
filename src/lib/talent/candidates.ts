// Seeded demo dataset for the employer talent console.
// Generated 2026-06-10 — 48 fictional candidates with CV-grade profiles.
// Swap for Supabase-backed fetchers (see src/lib/data.ts conventions) when
// the employer side moves past the seeded MVP.

import type { TalentCandidate } from "./types";

export const talentCandidates: TalentCandidate[] = [
  {
    "id": "c01",
    "name": "Jason Liang",
    "universityId": "berkeley",
    "degree": "BS",
    "major": "Electrical Engineering & Computer Sciences",
    "gradYear": 2026,
    "gpa": 3.96,
    "location": "Berkeley, CA",
    "headline": "Distributed systems & infra · EECS @ Berkeley '26 · ex-Databricks, ex-Stripe",
    "about": "Systems-focused engineer with production internships at Databricks and Stripe and research in Berkeley's Sky Computing Lab on LLM serving. Strongest at the boundary between low-level performance work and large-scale distributed infrastructure. Targeting new-grad infra/platform roles with hard scaling problems.",
    "domain": "Software",
    "skills": [
      "Go",
      "Rust",
      "Scala",
      "Kubernetes",
      "gRPC",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "CUDA",
      "Terraform"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Databricks",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Cut p99 metadata-resolution latency 41% in Unity Catalog by adding a sharded in-memory cache with async invalidation (Scala, gRPC)",
          "Shipped a backpressure-aware ingestion path that sustained 2.3M events/s in load tests; merged into the production Delta ingestion service"
        ]
      },
      {
        "title": "Software Engineer Intern",
        "company": "Stripe",
        "location": "San Francisco, CA",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Built idempotency-key garbage collection for the payments API surface, reclaiming ~14 TB of hot storage with zero correctness regressions",
          "Drove flaky-test rate in the API monorepo CI from 4.1% to 0.7% by quarantining and fixing 60+ tests"
        ]
      },
      {
        "title": "Undergraduate Researcher",
        "company": "Sky Computing Lab, UC Berkeley",
        "location": "Berkeley, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Landed a prefix-caching scheduler improvement merged upstream into vLLM, +9% throughput on ShareGPT replay traces",
          "Co-author on a workload-aware autoscaling submission to an MLSys 2026 workshop"
        ]
      }
    ],
    "projects": [
      {
        "name": "raftkv",
        "description": "Fault-tolerant distributed key-value store in Go — linearizable, Jepsen-tested, 40K ops/s on a 5-node cluster"
      },
      {
        "name": "cujson",
        "description": "GPU JSON parser in CUDA hitting 6 GB/s on an RTX 4090, 11x faster than simdjson on large nested documents"
      }
    ],
    "awards": [
      "Cal Hacks 11 — 1st place overall (300+ teams)",
      "ICPC Pacific Northwest Regional — 3rd place",
      "EECS Honors Program"
    ],
    "coursework": [
      "CS 162 Operating Systems",
      "CS 186 Database Systems",
      "CS 170 Algorithms",
      "CS 262A Advanced Topics in Computer Systems"
    ],
    "scores": {
      "overall": 96,
      "technical": 98,
      "execution": 95,
      "leadership": 90,
      "communication": 91,
      "trajectory": 97
    },
    "signals": [
      "Return offers from both Databricks and Stripe",
      "Merged contributor to vLLM with measurable throughput wins",
      "Production impact at scale as an intern, twice"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 2,
    "avatarUrl": "/people/candidates/c01.jpg"
  },
  {
    "id": "c02",
    "name": "Lauren Whitaker",
    "universityId": "stanford",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2027,
    "gpa": 3.89,
    "location": "San Francisco, CA",
    "headline": "Full-stack & dev tools · CS @ Stanford '27 · SWE intern @ Figma",
    "about": "Full-stack engineer who gravitates toward developer tools and performance-critical front-end work. Shipped at Vercel, currently on Figma's editor performance team, and taught Stanford intro CS for four quarters. Looking for a new-grad team where engineering craft and product taste both matter.",
    "domain": "Software",
    "skills": [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "C++",
      "WebAssembly",
      "PostgreSQL",
      "GraphQL",
      "Playwright"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Figma",
        "location": "San Francisco, CA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Editor performance team: profiling canvas re-render cost on files with 10K+ layers (C++/WebAssembly)",
          "Landed a first-week fix trimming redundant layout passes, ~6% faster file-open on the internal perf suite"
        ]
      },
      {
        "title": "Software Engineer Intern",
        "company": "Vercel",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped an ISR observability dashboard adopted by 1,800+ teams; cut median time-to-diagnose for stale-page reports roughly in half",
          "Reduced edge-function cold-start p95 by 22% by pruning the serverless bundle dependency graph"
        ]
      },
      {
        "title": "Section Leader, CS 106A/B",
        "company": "Stanford Computer Science Dept",
        "location": "Stanford, CA",
        "start": "Sep 2024",
        "end": "Jun 2026",
        "bullets": [
          "Taught weekly sections of 12-15 students across four quarters; 4.9/5.0 average section rating",
          "Mentored 50+ students through first programming projects; wrote autograder smoke tests adopted by course staff"
        ]
      }
    ],
    "projects": [
      {
        "name": "lintfix",
        "description": "VS Code extension that batch-fixes TypeScript ESLint violations with an LLM repair pass — 12K installs, 4.8-star rating"
      },
      {
        "name": "draftd",
        "description": "Collaborative markdown editor with CRDT sync (Yjs) used by three Stanford student organizations"
      }
    ],
    "awards": [
      "TreeHacks 2025 — Best Developer Tool"
    ],
    "coursework": [
      "CS 140 Operating Systems",
      "CS 143 Compilers",
      "CS 161 Algorithms",
      "CS 147 Human-Computer Interaction"
    ],
    "scores": {
      "overall": 89,
      "technical": 90,
      "execution": 91,
      "leadership": 84,
      "communication": 88,
      "trajectory": 93
    },
    "signals": [
      "Shipped a dashboard used by 1,800+ teams as a Vercel intern",
      "Four quarters teaching Stanford intro CS at 4.9/5",
      "Currently on Figma's editor performance team"
    ],
    "status": "shortlisted",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 11,
    "avatarUrl": "/people/candidates/c02.jpg"
  },
  {
    "id": "c03",
    "name": "Patrick Donahue",
    "universityId": "mit",
    "degree": "MEng",
    "major": "Electrical Engineering & Computer Science",
    "gradYear": 2026,
    "gpa": 3.85,
    "location": "Cambridge, MA",
    "headline": "Compilers & GPU performance · MEng EECS @ MIT '26 · ex-NVIDIA",
    "about": "Compiler and GPU-performance specialist finishing an MIT MEng in CSAIL's compilers group after a kernels-focused NVIDIA internship. Happiest several layers below the framework: CUTLASS, MLIR, and cache behavior. Seeking new-grad systems and performance engineering roles.",
    "domain": "Software",
    "skills": [
      "C++",
      "CUDA",
      "MLIR",
      "LLVM",
      "Triton",
      "Python",
      "x86-64 assembly",
      "Cilk",
      "PyTorch internals"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "NVIDIA",
        "location": "Santa Clara, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Fused attention epilogue kernels in CUTLASS, cutting p95 latency 31% on an internal LLM-serving benchmark (H100, FP8)",
          "Added INT8 GEMM autotuning paths adopted in two production inference configurations"
        ]
      },
      {
        "title": "MEng Researcher",
        "company": "MIT CSAIL (compilers group)",
        "location": "Cambridge, MA",
        "start": "Sep 2025",
        "end": "Present",
        "bullets": [
          "Built an MLIR pass vectorizing sparse tensor contractions; 3.4x geomean speedup over the TACO baseline on SuiteSparse kernels",
          "MEng thesis on portable sparse code generation; artifact submitted to the CGO 2026 student research competition"
        ]
      },
      {
        "title": "Teaching Assistant, 6.106 Software Performance Engineering",
        "company": "MIT EECS",
        "location": "Cambridge, MA",
        "start": "Sep 2024",
        "end": "Dec 2024",
        "bullets": [
          "Coached 40+ students through Cilk parallelization and cache-optimization projects",
          "Rewrote the profiling lab handout, cutting mean lab completion time ~25%"
        ]
      }
    ],
    "projects": [
      {
        "name": "tinyjit",
        "description": "Tracing JIT compiler for a Lua subset targeting x86-64 — 12x speedup over the reference interpreter on a 30-program benchmark suite"
      },
      {
        "name": "flashsort-cuda",
        "description": "Segmented GPU radix sort beating CUB by 1.6x on skewed key distributions"
      }
    ],
    "coursework": [
      "6.106 Software Performance Engineering",
      "6.S965 Machine Learning Compilation",
      "6.5810 Operating Systems Engineering",
      "6.1100 Compiler Design"
    ],
    "scores": {
      "overall": 87,
      "technical": 93,
      "execution": 88,
      "leadership": 79,
      "communication": 81,
      "trajectory": 88
    },
    "signals": [
      "Kernel-level GPU work shipped into NVIDIA production configs",
      "Publishable compiler research with hard speedup numbers",
      "Rare CUTLASS/MLIR depth for a new grad"
    ],
    "watchouts": [
      "Deep IC/systems profile — little exposure to leading teams or working with product stakeholders"
    ],
    "status": "new",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 19,
    "avatarUrl": "/people/candidates/c03.jpg"
  },
  {
    "id": "c04",
    "name": "Vivian Zheng",
    "universityId": "cmu",
    "degree": "MS",
    "major": "Machine Learning",
    "gradYear": 2026,
    "gpa": 3.92,
    "location": "Pittsburgh, PA",
    "headline": "ML systems & LLM evaluation · MSML @ CMU '26 · ex-NVIDIA, ex-Duolingo",
    "about": "ML engineer-researcher spanning pretraining data work at NVIDIA, LLM-evaluation research at CMU's Language Technologies Institute, and product experimentation at Duolingo. Combines large-scale pipeline engineering with statistical rigor in eval design. Targeting ML engineering roles on training-data or evaluation teams.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "PyTorch",
      "Rust",
      "Hugging Face",
      "Ray",
      "Spark",
      "SQL",
      "dbt",
      "Airflow",
      "Weights & Biases"
    ],
    "experience": [
      {
        "title": "Machine Learning Intern",
        "company": "NVIDIA",
        "location": "Santa Clara, CA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Built dedup and quality-filter pipeline for a 1.2T-token pretraining corpus; +1.8 MMLU at 8B-parameter scale versus the prior data mix",
          "Rewrote tokenization preprocessing in Rust (rayon) for 5x throughput, removing the corpus-refresh bottleneck"
        ]
      },
      {
        "title": "Graduate Research Assistant",
        "company": "CMU Language Technologies Institute",
        "location": "Pittsburgh, PA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "First-author paper on contamination-aware LLM evaluation (ACL 2026 workshop); audit tooling flagged 7.3% of a widely used benchmark as contaminated",
          "Built lab-wide eval job presets for a 64-GPU cluster, cutting median queue wait ~30%"
        ]
      },
      {
        "title": "Data Science Intern",
        "company": "Duolingo",
        "location": "Pittsburgh, PA",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Designed and shipped an A/B test on spaced-repetition review ranking; +0.9% D7 retention across a 4M-learner experiment",
          "Built dbt models powering the streak-health dashboard used weekly by three product teams"
        ]
      }
    ],
    "projects": [
      {
        "name": "evalforge",
        "description": "Open-source LLM eval harness with paired-bootstrap significance testing and regression diffing — 1.1K GitHub stars"
      }
    ],
    "coursework": [
      "10-708 Probabilistic Graphical Models",
      "11-667 Large Language Models",
      "10-714 Deep Learning Systems",
      "36-705 Intermediate Statistics"
    ],
    "scores": {
      "overall": 90,
      "technical": 94,
      "execution": 89,
      "leadership": 85,
      "communication": 87,
      "trajectory": 91
    },
    "signals": [
      "Pretraining-data work with measured downstream gains at NVIDIA",
      "First-author NLP workshop paper plus 1.1K-star OSS tool",
      "Unusual blend of pipeline engineering and eval rigor"
    ],
    "status": "shortlisted",
    "appliedFor": "Machine Learning Engineer, New Grad",
    "addedDaysAgo": 5,
    "avatarUrl": "/people/candidates/c04.jpg"
  },
  {
    "id": "c05",
    "name": "Henry Caldwell",
    "universityId": "harvard",
    "degree": "BA",
    "major": "Statistics",
    "gradYear": 2027,
    "location": "New York, NY",
    "headline": "Stats + ML · Statistics @ Harvard '27 · ML intern @ Hebbia",
    "about": "Statistics concentrator pairing causal-inference research with a first industry internship in applied LLM evaluation at Hebbia. Strong probabilistic fundamentals and reproducible-code habits carried over from academic work. Aiming for ML engineering or data science roles that reward statistical depth.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "R",
      "PyTorch",
      "PyMC",
      "Stan",
      "pandas",
      "scikit-learn",
      "SQL"
    ],
    "experience": [
      {
        "title": "Machine Learning Intern",
        "company": "Hebbia",
        "location": "New York, NY",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Building a retrieval-eval suite for multi-document agent workflows; first shipped change cut false-positive citation rate 18% in offline evals",
          "Stood up nightly regression runs over 1,200 labeled queries with automatic diff reports"
        ]
      },
      {
        "title": "Research Assistant",
        "company": "Harvard Dept. of Statistics (causal inference group)",
        "location": "Cambridge, MA",
        "start": "Jan 2025",
        "end": "May 2026",
        "bullets": [
          "Implemented doubly-robust treatment-effect estimators over a 2.1M-row Medicare claims dataset (R, Python)",
          "Co-author on a manuscript in preparation; released replication code with full test coverage"
        ]
      },
      {
        "title": "Teaching Fellow, Stat 110 (Probability)",
        "company": "Harvard University",
        "location": "Cambridge, MA",
        "start": "Sep 2025",
        "end": "Dec 2025",
        "bullets": [
          "Led two weekly sections totaling 45 students; 4.7/5 course-staff rating",
          "Wrote 12 practice problem sets adopted into the official section archive"
        ]
      }
    ],
    "projects": [
      {
        "name": "bayes-bracket",
        "description": "Hierarchical Bayesian NCAA bracket model in PyMC — top 2% of 60K entries in Kaggle March Mania 2026"
      }
    ],
    "coursework": [
      "Stat 110 Probability",
      "Stat 111 Statistical Inference",
      "Stat 186 Causal Inference",
      "CS 1810 Machine Learning",
      "CS 124 Data Structures & Algorithms"
    ],
    "scores": {
      "overall": 80,
      "technical": 84,
      "execution": 78,
      "leadership": 74,
      "communication": 79,
      "trajectory": 87
    },
    "signals": [
      "Rigorous statistical foundation — Stat 110 TF plus causal-inference RA",
      "Top 2% Kaggle finish with a fully Bayesian approach"
    ],
    "watchouts": [
      "Research-heavy profile — first industry internship currently in progress"
    ],
    "status": "new",
    "appliedFor": "Machine Learning Engineer Intern",
    "addedDaysAgo": 23,
    "avatarUrl": "/people/candidates/c05.jpg"
  },
  {
    "id": "c06",
    "name": "Audrey Yoon",
    "universityId": "princeton",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.71,
    "location": "Princeton, NJ",
    "headline": "Product builder · CS @ Princeton '26 · ex-Ramp PM intern",
    "about": "Product-minded CS major who has shipped as both a PM intern at Ramp and a student developer on Princeton's most-used campus apps. Founded and scaled the university's first product-management club. Targeting APM programs with real ownership early.",
    "domain": "Product",
    "skills": [
      "Figma",
      "SQL",
      "Amplitude",
      "Mixpanel",
      "React",
      "Python",
      "Linear",
      "A/B testing"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "Ramp",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Owned the receipt-matching rules editor from spec to launch; adopted by 3,400+ finance teams in the first month, cutting the unmatched-transaction queue 27%",
          "Ran 22 customer interviews; findings re-prioritized multi-entity support on the Q3 roadmap"
        ]
      },
      {
        "title": "Founder & President",
        "company": "Princeton Product Collective",
        "location": "Princeton, NJ",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Grew the club from zero to 180 members in three semesters; case-prep program placed 11 members into PM internships",
          "Raised $6K in sponsorships and ran a 120-attendee product case competition with judges from Figma and Datadog"
        ]
      },
      {
        "title": "Student Developer",
        "company": "TigerApps",
        "location": "Princeton, NJ",
        "start": "Feb 2024",
        "end": "May 2025",
        "bullets": [
          "Maintained the ReCal course-selection app used by 4,000+ students each enrollment period",
          "Shipped a schedule conflict-detection feature that cut support emails ~40% during add/drop week"
        ]
      }
    ],
    "projects": [
      {
        "name": "coursegraph",
        "description": "Interactive prerequisite map of Princeton COS courses — 2,300 unique users in its first semester"
      }
    ],
    "scores": {
      "overall": 78,
      "technical": 71,
      "execution": 80,
      "leadership": 84,
      "communication": 86,
      "trajectory": 79
    },
    "signals": [
      "Shipped a PM-owned feature adopted by 3,400+ teams as an intern",
      "Founder energy — built a 180-member campus org from scratch",
      "Technical enough to prototype and ship code herself"
    ],
    "status": "shortlisted",
    "appliedFor": "APM Program",
    "addedDaysAgo": 8,
    "avatarUrl": "/people/candidates/c06.jpg"
  },
  {
    "id": "c07",
    "name": "Brandon Tsai",
    "universityId": "ucla",
    "degree": "BS",
    "major": "Mathematics of Computation",
    "gradYear": 2026,
    "gpa": 3.82,
    "location": "Los Angeles, CA",
    "headline": "Quant research · Math of Computation @ UCLA '26 · ex-Akuna Capital",
    "about": "Applied-math student blending derivatives intuition from an Akuna trading internship with research experience in rough-volatility modeling. Ran alpha research for UCLA's quant club and builds market-microstructure tooling from scratch. Seeking new-grad quantitative research seats.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "C++",
      "kdb+/q",
      "NumPy",
      "pandas",
      "statsmodels",
      "PyTorch",
      "SQL"
    ],
    "experience": [
      {
        "title": "Quantitative Trading Intern",
        "company": "Akuna Capital",
        "location": "Chicago, IL",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Backtested an SPX skew mean-reversion signal over 3 years of options data; Sharpe 1.4 after fees, handed off to a desk for paper trading",
          "Built an intraday vol-surface monitoring dashboard (Python, kdb+/q) adopted by two desks"
        ]
      },
      {
        "title": "Quant Research Lead",
        "company": "Bruin Quant Society (UCLA)",
        "location": "Los Angeles, CA",
        "start": "Oct 2024",
        "end": "Jun 2026",
        "bullets": [
          "Led a 14-member alpha-research team; paper-traded book returned 11.2% vs 7.9% benchmark over two quarters",
          "Built the club's shared backtesting framework — vectorized pandas rewrite ran 30x faster than the prior loop-based code"
        ]
      },
      {
        "title": "REU Researcher, Financial Mathematics",
        "company": "UC Santa Barbara",
        "location": "Santa Barbara, CA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Calibrated rough-volatility (rBergomi) models to SPX surfaces; poster presented at JMM 2025",
          "Cut calibration time 8x with a neural surrogate for the forward-variance map"
        ]
      }
    ],
    "projects": [
      {
        "name": "lobster-sim",
        "description": "C++ limit-order-book simulator with queue-position modeling — replays LOBSTER ITCH data at 80x real time"
      }
    ],
    "awards": [
      "Putnam 2025 — top 500",
      "IMC Prosperity 3 — top 1% of 12,000+ teams"
    ],
    "coursework": [
      "Math 171 Stochastic Processes",
      "Math 174E Mathematical Finance",
      "Math 170E/S Probability & Statistics",
      "PIC 16B Python with Applications"
    ],
    "scores": {
      "overall": 81,
      "technical": 88,
      "execution": 80,
      "leadership": 73,
      "communication": 75,
      "trajectory": 84
    },
    "signals": [
      "Desk-adopted tooling and a Sharpe-1.4 signal as an intern",
      "Putnam top 500 plus top-1% trading-competition finish"
    ],
    "watchouts": [
      "Options theory is strong; production-grade software engineering still developing"
    ],
    "status": "new",
    "appliedFor": "Quantitative Researcher, New Grad",
    "addedDaysAgo": 14,
    "avatarUrl": "/people/candidates/c07.jpg"
  },
  {
    "id": "c08",
    "name": "Hannah Petersen",
    "universityId": "uiuc",
    "degree": "BS",
    "major": "Electrical Engineering",
    "gradYear": 2028,
    "location": "Champaign, IL",
    "headline": "Hardware & avionics · ECE @ UIUC '28 · Illinois Space Society",
    "about": "Second-year ECE student who learns by building: rocket avionics with the Illinois Space Society, a first hardware internship at Starfire Industries, and a self-designed PCB product with 120 units sold. Drawn to mixed-signal and embedded work. Looking for hardware internships with strong mentorship and lab time.",
    "domain": "Hardware",
    "skills": [
      "KiCad",
      "C",
      "STM32",
      "FreeRTOS",
      "Verilog",
      "LTspice",
      "Python",
      "LabVIEW",
      "Soldering & rework"
    ],
    "experience": [
      {
        "title": "Hardware Engineering Intern",
        "company": "Starfire Industries",
        "location": "Champaign, IL",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Designing a 4-layer test-fixture PCB in KiCad for RF plasma-source QA; first revision passed bring-up with only two reworks",
          "Automated thermal-cycling data collection with Python and LabVIEW, cutting ~6 hours/week of manual logging"
        ]
      },
      {
        "title": "Avionics Team Member",
        "company": "Illinois Space Society",
        "location": "Urbana, IL",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Designed an STM32-based flight-computer daughterboard for the IREC rocket; survived a 9 km flight with full telemetry recovered",
          "Brought up the SPI driver for the barometer/IMU stack reused across three avionics revisions"
        ]
      },
      {
        "title": "Course Assistant, ECE 110",
        "company": "UIUC Dept. of Electrical & Computer Engineering",
        "location": "Urbana, IL",
        "start": "Jan 2026",
        "end": "May 2026",
        "bullets": [
          "Helped 60+ intro students debug breadboard labs during weekly open-lab hours",
          "Built a common-faults checklist adopted by the lab staff, cutting average debug time per student visit"
        ]
      }
    ],
    "projects": [
      {
        "name": "nixie-drive",
        "description": "Open-hardware Nixie tube clock driver board (HV supply + ESP32) — 120 boards sold on Tindie"
      }
    ],
    "coursework": [
      "ECE 110 Intro to Electronics",
      "ECE 120 Computing Systems",
      "ECE 210 Analog Signal Processing",
      "ECE 385 Digital Systems Laboratory",
      "PHYS 212 Electricity & Magnetism"
    ],
    "scores": {
      "overall": 68,
      "technical": 70,
      "execution": 66,
      "leadership": 62,
      "communication": 67,
      "trajectory": 76
    },
    "signals": [
      "Hands-on builder — flight hardware survived a 9 km rocket launch",
      "Self-driven: designs and sells her own PCB product"
    ],
    "watchouts": [
      "Early in coursework — first industry internship currently in progress"
    ],
    "status": "new",
    "appliedFor": "Hardware Engineer Intern",
    "addedDaysAgo": 27,
    "avatarUrl": "/people/candidates/c08.jpg"
  },
  {
    "id": "c09",
    "name": "Arnav Krishnamurthy",
    "universityId": "gatech",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.95,
    "location": "Atlanta, GA",
    "headline": "Distributed systems · CS @ Georgia Tech '26 · ex-Stripe, ex-Google",
    "about": "Systems-focused engineer who shipped production code at Stripe and Google before graduating. Two years leading Georgia Tech's operating systems course staff, with side projects in consensus protocols and serialization. Looking for a high-ownership new-grad seat on a storage or infra team.",
    "domain": "Software",
    "skills": [
      "Go",
      "Rust",
      "C",
      "Distributed systems",
      "gRPC",
      "Kubernetes",
      "PostgreSQL",
      "Kafka",
      "eBPF",
      "Terraform"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "Stripe",
        "location": "San Francisco, CA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Rebuilt the idempotency-key garbage-collection path for the payments API in Go, reclaiming 4.2 TB of orphaned records and cutting p99 write latency 22%",
          "Shipped a shadow-traffic replay service sustaining 18K req/s, used to validate 3 storage migrations before cutover"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "Google",
        "location": "Sunnyvale, CA",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Added incremental compaction to a Spanner-backed config service, cutting tail read latency 31% for 3 internal customer teams",
          "Built a protobuf fuzzing harness that surfaced 7 production-reachable parsing bugs, all fixed before launch"
        ]
      },
      {
        "title": "Head TA, CS 3210 Operating Systems",
        "company": "Georgia Tech College of Computing",
        "location": "Atlanta, GA",
        "start": "Aug 2024",
        "end": "May 2026",
        "bullets": [
          "Led a 14-TA staff for 380 students per semester; redesigned the kernel-module lab, cutting office-hour load 35%",
          "Built a QEMU + Docker autograder that grades ~2,900 kernel submissions per semester with zero manual regrades"
        ]
      }
    ],
    "projects": [
      {
        "name": "RaftKV",
        "description": "Distributed key-value store in Rust (Raft, leader leases, snapshot transfer); sustains 92K ops/s across 5 nodes with sub-10 ms p99 under chaos-injected leader failures. 800+ GitHub stars."
      },
      {
        "name": "wirefmt",
        "description": "Zero-copy binary serialization library for Go; benchmarked 2.3x faster than protobuf on small messages, with a published benchmark suite."
      }
    ],
    "awards": [
      "ICPC Southeast USA Regional — 2nd place (2024)",
      "HackGT 11 — Best Systems Hack",
      "Faculty Honors (6 semesters)"
    ],
    "coursework": [
      "CS 3210 Operating Systems",
      "CS 4210 Advanced Operating Systems",
      "CS 6210 Distributed Computing (grad)",
      "CS 4400 Database Systems",
      "CS 4240 Compilers"
    ],
    "scores": {
      "overall": 96,
      "technical": 99,
      "execution": 97,
      "leadership": 89,
      "communication": 91,
      "trajectory": 98
    },
    "signals": [
      "Shipped production code at Stripe and Google before graduating",
      "ICPC Southeast medalist with deep OS/distributed background",
      "Led a 14-TA operating systems course staff for two years"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 5,
    "avatarUrl": "/people/candidates/c09.jpg"
  },
  {
    "id": "c10",
    "name": "Imani Whitfield",
    "universityId": "umich",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2027,
    "gpa": 3.86,
    "location": "New York, NY",
    "headline": "Backend & infra · CS @ Michigan '27 · Datadog intern, ex-Microsoft",
    "about": "Backend engineer with two production internships (Microsoft Azure, Datadog) and a habit of attaching latency or dollar figures to every change. Also runs backend for MHacks' 1,800-hacker platform. Targeting new-grad platform and infrastructure roles for 2027.",
    "domain": "Software",
    "skills": [
      "Go",
      "Python",
      "TypeScript",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "gRPC",
      "Terraform"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "Datadog",
        "location": "New York, NY",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Migrating span-enrichment workers from Python to Go; first cut-over service is running 3.1x throughput per pod in canary",
          "Instrumented the trace-ingest hot path with continuous profiling, identifying an allocation hotspot worth ~$240K/yr in compute"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "Microsoft (Azure Service Bus)",
        "location": "Redmond, WA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped a regional failover probe that cut mean detection time for partition outages from 11 min to 90 s",
          "Raised namespace-provisioning integration coverage from 62% to 91% with 40+ new tests, catching 2 regressions pre-release"
        ]
      },
      {
        "title": "Backend Lead",
        "company": "MHacks",
        "location": "Ann Arbor, MI",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Led 6 engineers on the registration and judging platform for 1,800 hackers; held p95 page load under 300 ms through check-in spikes",
          "Cut judging-cycle time 40% with a live expo-judging queue used across 2 events"
        ]
      }
    ],
    "projects": [
      {
        "name": "shardline",
        "description": "Open-source Postgres logical-replication monitor that alerts on slot lag before WAL bloat; 1.1K GitHub stars and production users in 3 companies per the issue tracker."
      }
    ],
    "awards": [
      "William J. Branstrom Freshman Prize",
      "Dean's List (4 terms)"
    ],
    "coursework": [
      "EECS 482 Operating Systems",
      "EECS 485 Web Systems",
      "EECS 388 Computer Security",
      "EECS 489 Computer Networks"
    ],
    "scores": {
      "overall": 89,
      "technical": 91,
      "execution": 92,
      "leadership": 86,
      "communication": 88,
      "trajectory": 94
    },
    "signals": [
      "Two production infra internships before senior year",
      "Quantifies everything — latency, coverage, compute dollars",
      "Runs backend for an 1,800-hacker event platform"
    ],
    "status": "shortlisted",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 12,
    "avatarUrl": "/people/candidates/c10.jpg"
  },
  {
    "id": "c11",
    "name": "Aditya Raghunathan",
    "universityId": "uw",
    "degree": "MS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.9,
    "location": "Seattle, WA",
    "headline": "ML serving & efficient inference · MS CS @ UW '26 · ex-Databricks",
    "about": "ML engineer-researcher hybrid: first-author EMNLP Findings paper on efficient distillation plus a 38% serving-latency win from a Databricks internship. Comfortable owning everything from CUDA kernels to eval harnesses. Seeking an applied-research or inference-infrastructure role.",
    "domain": "Data & ML",
    "skills": [
      "PyTorch",
      "CUDA",
      "Triton",
      "Ray",
      "Hugging Face Transformers",
      "vLLM",
      "Spark",
      "SQL",
      "Weights & Biases"
    ],
    "experience": [
      {
        "title": "Machine Learning Intern",
        "company": "Databricks",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Sep 2025",
        "bullets": [
          "Cut p95 latency of the model-serving gateway 38% by batching tokenizer calls and pinning hot LoRA adapters in GPU memory",
          "Built an eval harness covering 12 model families, adopted by 3 product teams for fine-tune regression gating"
        ]
      },
      {
        "title": "Graduate Research Assistant",
        "company": "UW NLP, Allen School",
        "location": "Seattle, WA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "First-authored an EMNLP 2025 Findings paper on retrieval-augmented distillation: recovers 96% of teacher accuracy at 11% of inference cost",
          "Maintains the lab's training stack on UW Hyak (64 A100s); cut average job-queue turnaround 30% with gang-scheduling presets"
        ]
      },
      {
        "title": "Data Science Intern",
        "company": "Zillow",
        "location": "Seattle, WA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Improved Zestimate median absolute percent error from 4.1% to 3.8% by adding parcel-level geospatial features to a LightGBM ensemble",
          "Automated the feature-backfill pipeline in Spark, cutting refresh time from 9 h to 70 min"
        ]
      }
    ],
    "projects": [
      {
        "name": "FlashEval",
        "description": "Open-source LLM evaluation runner with KV-cache-aware speculative scoring; 600+ GitHub stars and citations in 2 published papers."
      }
    ],
    "coursework": [
      "CSE 599 Efficient ML",
      "CSE 547 Machine Learning for Big Data",
      "CSE 544 Database Systems"
    ],
    "scores": {
      "overall": 88,
      "technical": 94,
      "execution": 87,
      "leadership": 80,
      "communication": 85,
      "trajectory": 92
    },
    "signals": [
      "First-author EMNLP Findings paper as a master's student",
      "Shipped a 38% serving-latency win at Databricks"
    ],
    "watchouts": [
      "Leans deep-IC/research — limited people-leadership signal"
    ],
    "status": "new",
    "appliedFor": "ML Engineer, New Grad",
    "addedDaysAgo": 3,
    "avatarUrl": "/people/candidates/c11.jpg"
  },
  {
    "id": "c12",
    "name": "Zora Mitchell",
    "universityId": "cornell",
    "degree": "BS",
    "major": "Statistical Science",
    "gradYear": 2027,
    "gpa": 3.71,
    "location": "Ithaca, NY",
    "headline": "DS/ML · Statistics @ Cornell '27 · ex-Duolingo data science",
    "about": "Statistics major pairing experiment-design rigor with production data work — shipped a retention-moving uplift model at Duolingo after sophomore year. Currently contributing to conformal-prediction research at Cornell. Looking for an ML engineering internship for summer 2027.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Spark",
      "SQL",
      "dbt",
      "Airflow",
      "Snakemake"
    ],
    "experience": [
      {
        "title": "Data Science Intern",
        "company": "Duolingo",
        "location": "Pittsburgh, PA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped an uplift model for streak-repair notifications, lifting D7 retention 1.8 pts in a 4M-learner experiment",
          "Rewrote pandas feature backfills in Spark, cutting pipeline runtime from 6 h to 45 min"
        ]
      },
      {
        "title": "Undergraduate Researcher",
        "company": "Cornell Machine Learning Group",
        "location": "Ithaca, NY",
        "start": "Jan 2025",
        "end": "Present",
        "bullets": [
          "Ran conformal-prediction ablations across 14 tabular benchmarks for an AISTATS 2026 submission (acknowledged contributor)",
          "Built a Snakemake pipeline making every experiment one-command reproducible, cutting iteration time from days to hours"
        ]
      },
      {
        "title": "Course Consultant, CS 1110",
        "company": "Cornell University",
        "location": "Ithaca, NY",
        "start": "Aug 2024",
        "end": "May 2025",
        "bullets": [
          "Supported a 700-student intro-Python course; debugged 300+ student submissions per semester",
          "Rebuilt the autograder style-check config, cutting regrade requests ~25%"
        ]
      }
    ],
    "projects": [
      {
        "name": "nudge-lab",
        "description": "Open replication of 5 published uplift-modeling benchmarks with honest confidence intervals; accompanying write-up has 20K+ reads."
      }
    ],
    "awards": [
      "Dean's List (4 semesters)"
    ],
    "coursework": [
      "CS 4780 Machine Learning",
      "CS 4787 Large-Scale ML",
      "STSCI 4030 Linear Models",
      "BTRY 4090 Theory of Statistics"
    ],
    "scores": {
      "overall": 80,
      "technical": 84,
      "execution": 79,
      "leadership": 74,
      "communication": 81,
      "trajectory": 87
    },
    "signals": [
      "Moved a real retention metric at Duolingo as a sophomore",
      "Research-grade experimental rigor (conformal prediction)"
    ],
    "status": "new",
    "appliedFor": "ML Engineer Intern",
    "addedDaysAgo": 19,
    "avatarUrl": "/people/candidates/c12.jpg"
  },
  {
    "id": "c13",
    "name": "Jalen Mosley",
    "universityId": "utaustin",
    "degree": "BA",
    "major": "Design",
    "gradYear": 2026,
    "location": "Austin, TX",
    "headline": "Product design · Design @ UT Austin '26 · ex-Calendly, TPEO design lead",
    "about": "Product designer trained in a research-heavy, end-to-end process — from moderated usability testing to flows shipped at Calendly. Leads a 5-designer team building apps for Austin nonprofits through TPEO. Seeking an early-career product design seat with tight design-engineering collaboration.",
    "domain": "Design",
    "skills": [
      "Figma",
      "Framer",
      "Design systems",
      "User research",
      "Prototyping",
      "Webflow",
      "After Effects",
      "HTML/CSS"
    ],
    "experience": [
      {
        "title": "Product Design Intern",
        "company": "Calendly",
        "location": "Atlanta, GA (Remote)",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Redesigned the meeting-poll creation flow; usability-test completion rose from 68% to 91% across 12 participants, shipped to 100% of the free tier",
          "Built a Figma component set adopted by 3 product squads, cutting design-handoff defects ~30%"
        ]
      },
      {
        "title": "Design Lead",
        "company": "Texas Product Engineering Organization (TPEO)",
        "location": "Austin, TX",
        "start": "Sep 2024",
        "end": "May 2026",
        "bullets": [
          "Led 5 designers across 4 nonprofit client apps; ran 30+ moderated usability sessions end to end",
          "Stood up a weekly critique ritual that cut average iteration cycles from 3 weeks to 1"
        ]
      },
      {
        "title": "Freelance Brand & UI Designer",
        "company": "Self-employed",
        "location": "Austin, TX",
        "start": "Jan 2024",
        "end": "Present",
        "bullets": [
          "Delivered identity and marketing sites for 6 Austin startups",
          "One client's signup conversion rose from 2.1% to 3.4% after the redesign"
        ]
      }
    ],
    "projects": [
      {
        "name": "Transit ATX",
        "description": "End-to-end CapMetro trip-planning redesign: 14 rider interviews, a 40-screen Figma prototype, and a public case study featured on Bestfolios."
      }
    ],
    "scores": {
      "overall": 78,
      "technical": 74,
      "execution": 81,
      "leadership": 80,
      "communication": 85,
      "trajectory": 82
    },
    "signals": [
      "Intern work shipped to 100% of Calendly's free tier",
      "Heavy moderated-research practice — 30+ sessions led"
    ],
    "watchouts": [
      "Portfolio skews UX research — visual/motion craft still developing"
    ],
    "status": "new",
    "appliedFor": "Product Designer, Early Career",
    "addedDaysAgo": 27,
    "avatarUrl": "/people/candidates/c13.jpg"
  },
  {
    "id": "c14",
    "name": "Riya Chandrasekhar",
    "universityId": "columbia",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.68,
    "location": "New York, NY",
    "headline": "Product · CS @ Columbia '26 · ex-Squarespace PM, ex-MongoDB SWE",
    "about": "CS major turned product builder: a SWE internship at MongoDB, then a PM internship at Squarespace with a quantified GMV win. Runs product practice for founder teams at Columbia Build Lab. Aiming for an APM program with a strong experimentation culture.",
    "domain": "Product",
    "skills": [
      "SQL",
      "Amplitude",
      "Mixpanel",
      "Figma",
      "A/B testing",
      "Python",
      "Looker",
      "Jira"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "Squarespace",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Drove discovery and spec for a checkout-abandonment email flow; A/B test recovered 4.6% of abandoned carts (+$1.1M annualized GMV)",
          "Wrote PRDs and ran sprint rituals for a 7-person pod through 2 releases"
        ]
      },
      {
        "title": "Product Lead",
        "company": "Columbia Build Lab",
        "location": "New York, NY",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Scoped MVPs with 4 founder teams; 2 launched to a combined 3,000 users",
          "Recruited and trained 9 student PMs; standardized a discovery playbook used across 12 projects"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "MongoDB",
        "location": "New York, NY",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Built an internal dashboard tracking driver-version adoption across 40K+ clusters; now a default tab for 3 PM teams",
          "Closed 14 tickets in the Node.js driver's CI tooling, cutting flaky-test reruns ~20%"
        ]
      }
    ],
    "projects": [
      {
        "name": "CampusSwap",
        "description": "Peer-to-peer dorm marketplace grown to 1,200 Columbia/Barnard users in one semester with a 9% weekly transaction rate; public post-mortem covers marketplace cold-start lessons."
      }
    ],
    "scores": {
      "overall": 82,
      "technical": 76,
      "execution": 84,
      "leadership": 86,
      "communication": 89,
      "trajectory": 85
    },
    "signals": [
      "Quantified GMV win as a PM intern (+$1.1M annualized)",
      "Engineer-credible PM — shipped at MongoDB first",
      "Built and trained a 9-PM campus practice"
    ],
    "status": "shortlisted",
    "appliedFor": "APM Program",
    "addedDaysAgo": 8,
    "avatarUrl": "/people/candidates/c14.jpg"
  },
  {
    "id": "c15",
    "name": "Devansh Mehrotra",
    "universityId": "berkeley",
    "degree": "BS",
    "major": "Applied Mathematics",
    "gradYear": 2027,
    "location": "San Francisco, CA",
    "headline": "Quant-track · Applied Math @ Berkeley '27 · BIG quant pod, Parallax intern",
    "about": "Applied-math student building toward quantitative research: backtesting infrastructure for Berkeley's student-run fund, a vol-surface QC project at an SF options firm this summer, and a proof-based course load underneath. Wants a quant research or trading internship with real mentorship.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "NumPy",
      "pandas",
      "vectorbt",
      "statsmodels",
      "SQL",
      "C++ (coursework)",
      "Bloomberg Terminal"
    ],
    "experience": [
      {
        "title": "Quantitative Intern",
        "company": "Parallax Volatility Advisers",
        "location": "San Francisco, CA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Automating daily P&L attribution, replacing a 45-minute manual Excel workflow for the desk",
          "Building a vol-surface QC monitor flagging fit anomalies across 400+ optionable names"
        ]
      },
      {
        "title": "Quant Research Analyst",
        "company": "Berkeley Investment Group",
        "location": "Berkeley, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Backtested a cross-sectional momentum strategy on the Russell 1000 (2010–2024): Sharpe 1.1 after a realistic transaction-cost model",
          "Wrote the club's shared vectorbt backtesting library, now used by 4 strategy pods"
        ]
      },
      {
        "title": "Reader, MATH 104 (Real Analysis)",
        "company": "UC Berkeley Mathematics Department",
        "location": "Berkeley, CA",
        "start": "Jan 2025",
        "end": "May 2026",
        "bullets": [
          "Graded weekly real-analysis problem sets for 90 students",
          "Ran pre-midterm review sessions averaging 25 attendees"
        ]
      }
    ],
    "projects": [
      {
        "name": "kalman-pairs",
        "description": "Pairs-trading research repo using Kalman-filter hedge ratios on 8 years of equity data; out-of-sample report honestly documents post-2021 signal decay."
      }
    ],
    "coursework": [
      "MATH 104 Real Analysis",
      "STAT 134 Probability",
      "STAT 135 Statistical Inference",
      "IND ENG 173 Stochastic Processes",
      "CS 188 Artificial Intelligence"
    ],
    "scores": {
      "overall": 70,
      "technical": 75,
      "execution": 68,
      "leadership": 64,
      "communication": 67,
      "trajectory": 78
    },
    "signals": [
      "Built backtesting infra a 60-person student fund actually uses",
      "Proof-based math core with honest research instincts"
    ],
    "watchouts": [
      "No institutional quant experience yet — first industry internship in progress"
    ],
    "status": "new",
    "appliedFor": "Quantitative Research Intern",
    "addedDaysAgo": 0,
    "avatarUrl": "/people/candidates/c15.jpg"
  },
  {
    "id": "c16",
    "name": "Amara Jefferson",
    "universityId": "stanford",
    "degree": "BS",
    "major": "Electrical Engineering",
    "gradYear": 2028,
    "gpa": 3.55,
    "location": "San Francisco, CA",
    "headline": "Hardware · EE @ Stanford '28 · SSI avionics, SPAN intern",
    "about": "Sophomore EE doing real bringup work early — flight computers for Stanford Student Space Initiative balloon launches and bench validation at SPAN this summer. Drawn to power electronics and mixed-signal design. Looking for hardware internships with serious lab time.",
    "domain": "Hardware",
    "skills": [
      "KiCad",
      "STM32",
      "C",
      "Python",
      "I2C/SPI",
      "LTspice",
      "Oscilloscope & logic-analyzer debugging",
      "PCB bringup"
    ],
    "experience": [
      {
        "title": "Electrical Engineering Intern",
        "company": "SPAN",
        "location": "San Francisco, CA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Writing automated bench tests (Python + PyVISA) for a current-sense AFE board revision, covering 30 production test points",
          "Traced an I2C bus-contention bug dropping telemetry on ~1 in 20 boot cycles; fix merged into the next firmware release"
        ]
      },
      {
        "title": "Avionics Engineer",
        "company": "Stanford Student Space Initiative",
        "location": "Stanford, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Designed a 4-layer STM32 flight-computer PCB in KiCad; flown on 2 high-altitude balloon launches to 30 km",
          "Built a pre-launch self-test harness cutting checkout time from 3 h to 40 min"
        ]
      },
      {
        "title": "Section Leader, CS106A",
        "company": "Stanford University",
        "location": "Stanford, CA",
        "start": "Jan 2025",
        "end": "Jun 2026",
        "bullets": [
          "Taught a weekly section of 12 students across 3 quarters with a 4.8/5 average student rating",
          "Graded ~80 assignments per quarter with structured rubric feedback"
        ]
      }
    ],
    "projects": [
      {
        "name": "mppt-60",
        "description": "Solar MPPT charge controller (buck converter + STM32 firmware) hitting 94% efficiency at 60 W; full design log published on a personal site."
      }
    ],
    "coursework": [
      "EE 101A Circuits I",
      "EE 101B Circuits II",
      "EE 102A Signals & Systems",
      "ENGR 40M Making Stuff",
      "CS 106B"
    ],
    "scores": {
      "overall": 67,
      "technical": 72,
      "execution": 66,
      "leadership": 61,
      "communication": 64,
      "trajectory": 76
    },
    "signals": [
      "Hands-on board bringup as a rising junior",
      "Flight-proven avionics with Stanford SSI"
    ],
    "watchouts": [
      "Early in degree — core EE theory still in progress"
    ],
    "status": "new",
    "appliedFor": "Hardware Engineer Intern",
    "addedDaysAgo": 16,
    "avatarUrl": "/people/candidates/c16.jpg"
  },
  {
    "id": "c17",
    "name": "Mateo Carrillo",
    "universityId": "mit",
    "degree": "MEng",
    "major": "Electrical Engineering & Computer Science",
    "gradYear": 2026,
    "gpa": 3.94,
    "location": "Cambridge, MA",
    "headline": "Distributed systems & ML infra · MEng EECS @ MIT '26 · ex-OpenAI, ex-Stripe",
    "about": "Systems generalist who has shipped production infrastructure at OpenAI and Stripe and co-authored distributed-systems research at CSAIL. Strongest at the infrastructure layer — schedulers, replication, inference serving. Looking for a high-ownership systems or ML-infra team after graduating this spring.",
    "domain": "Software",
    "skills": [
      "Rust",
      "Go",
      "C++",
      "CUDA",
      "eBPF",
      "Kubernetes",
      "gRPC",
      "PyTorch",
      "Postgres",
      "Terraform"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "OpenAI",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Cut p95 latency of an internal inference gateway 41% by adding KV-cache-aware request routing and batching across 3 regions",
          "Shipped a Rust token-streaming proxy sustaining 12K req/s that replaced a Python service and cut fleet spend ~$30K/month"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "Stripe",
        "location": "San Francisco, CA",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Built idempotency-key garbage collection for a payments ledger service, reclaiming 1.8TB of hot storage and retiring a recurring on-call page",
          "Drove zero-downtime migration of 14 internal services onto a new gRPC auth layer"
        ]
      },
      {
        "title": "Undergraduate Researcher, Parallel & Distributed OS Group",
        "company": "MIT CSAIL",
        "location": "Cambridge, MA",
        "start": "Sep 2023",
        "end": "Present",
        "bullets": [
          "Co-authored a workshop paper on speculative page prefetching for far-memory systems showing 2.3x speedup on graph workloads",
          "Built the C++/eBPF evaluation harness now reused by 4 other lab projects"
        ]
      }
    ],
    "projects": [
      {
        "name": "ferrite-kv",
        "description": "Raft-replicated key-value store in Rust; survived 72-hour chaos-mesh fault injection at 50K ops/s with zero lost writes."
      },
      {
        "name": "schedviz",
        "description": "eBPF-based Linux scheduler visualizer that surfaces per-cgroup runqueue latency; 900+ GitHub stars."
      }
    ],
    "awards": [
      "ICPC North America Championship — 11th place team",
      "MIT Battlecode finalist (top 8 of 600+)",
      "William L. Stewart Jr. Award for research"
    ],
    "coursework": [
      "6.5840 Distributed Systems",
      "6.106 Performance Engineering",
      "6.5940 TinyML",
      "6.1810 Operating Systems"
    ],
    "scores": {
      "overall": 96,
      "technical": 99,
      "execution": 95,
      "leadership": 88,
      "communication": 90,
      "trajectory": 97
    },
    "signals": [
      "Shipped production infra at OpenAI and Stripe before finishing MEng",
      "CSAIL systems research with a published workshop paper",
      "Rare depth across kernel, networking, and inference-serving layers"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 4,
    "avatarUrl": "/people/candidates/c17.jpg"
  },
  {
    "id": "c18",
    "name": "Caroline Mercer",
    "universityId": "cmu",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.86,
    "location": "Pittsburgh, PA",
    "headline": "Backend & developer platforms · CS @ CMU '26 · ex-Stripe, ex-Duolingo",
    "about": "Backend engineer with two production internships and a systems-heavy CMU foundation (15-213 TA). Gravitates toward API platforms, reliability, and developer experience. Targeting a backend or platform team where on-call quality is taken seriously.",
    "domain": "Software",
    "skills": [
      "Go",
      "Ruby",
      "Python",
      "Kafka",
      "Redis",
      "Postgres",
      "Datadog",
      "Terraform",
      "C",
      "Docker"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "Stripe",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped per-merchant rate-limit observability dashboards now used by 200+ on-call engineers across the API platform",
          "Reduced false-positive 429 responses 23% by replacing a fixed-window limiter with a sliding-window-log implementation in the gateway"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "Duolingo",
        "location": "Pittsburgh, PA",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Built A/B-experiment guardrail checks into the deploy pipeline that auto-halted 7 metric regressions in one summer",
          "Cut Android cold-start time 380ms by lazy-loading lesson assets behind a feature-flagged loader"
        ]
      },
      {
        "title": "Teaching Assistant, 15-213 Intro to Computer Systems",
        "company": "Carnegie Mellon University",
        "location": "Pittsburgh, PA",
        "start": "Aug 2024",
        "end": "Present",
        "bullets": [
          "Lead weekly recitation for 40 students; consistently top-quartile TA ratings",
          "Rewrote the malloc-lab autograder used by 700+ students per semester, cutting grading turnaround from days to hours"
        ]
      }
    ],
    "projects": [
      {
        "name": "raceray",
        "description": "Dynamic data-race detector for Go using vector clocks; surfaced 3 confirmed races in popular open-source libraries, all patched upstream."
      },
      {
        "name": "scotty-scheduler",
        "description": "CMU course scheduler with a constraint-solver core; 4,100 registered users during fall registration week."
      }
    ],
    "awards": [
      "HackCMU 2024 — 1st of 87 teams",
      "Dean's List, 6 semesters"
    ],
    "coursework": [
      "15-440 Distributed Systems",
      "15-445 Database Systems",
      "15-418 Parallel Computer Architecture"
    ],
    "scores": {
      "overall": 89,
      "technical": 92,
      "execution": 90,
      "leadership": 82,
      "communication": 86,
      "trajectory": 91
    },
    "signals": [
      "Two production internships at Stripe and Duolingo with shipped, measured wins",
      "Systems depth validated by 15-213 TA role and autograder rebuild"
    ],
    "status": "shortlisted",
    "appliedFor": "Backend Engineer, New Grad",
    "addedDaysAgo": 9,
    "avatarUrl": "/people/candidates/c18.jpg"
  },
  {
    "id": "c19",
    "name": "Diego Salgado",
    "universityId": "harvard",
    "degree": "BA",
    "major": "Computer Science",
    "gradYear": 2027,
    "gpa": 3.78,
    "location": "New York, NY",
    "headline": "Full-stack product engineering · CS @ Harvard '27 · Ramp intern, ex-Microsoft",
    "about": "Product-minded engineer currently interning at Ramp after a Microsoft summer, with a track record of organizing student developers around real shipped software. Equally comfortable owning a feature end-to-end and rallying a team around it. Looking for a fast-shipping product engineering org for 2027.",
    "domain": "Software",
    "skills": [
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Postgres",
      "Temporal",
      "GraphQL",
      "Playwright",
      "AWS"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Ramp",
        "location": "New York, NY",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Owning a self-serve statement-import flow (Temporal + Postgres) slated to reach 8K finance teams this quarter",
          "Cut a flaky Playwright CI suite from 14 to 6 minutes in week one by parallelizing shards and quarantining nondeterministic specs"
        ]
      },
      {
        "title": "Software Engineer Intern",
        "company": "Microsoft",
        "location": "Redmond, WA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped incremental sync for OneDrive shared libraries, cutting full-rescan syncs 62% for tenants with >10K files",
          "Added adaptive telemetry sampling that reduced event volume 35% with no loss in crash diagnosability"
        ]
      },
      {
        "title": "Co-Director",
        "company": "Tech for Social Good, Harvard",
        "location": "Cambridge, MA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Lead 24 student developers across 5 nonprofit builds per semester; shipped a volunteer-matching portal used by 3 Boston nonprofits",
          "Grew active membership from 90 to 210 in two semesters"
        ]
      }
    ],
    "projects": [
      {
        "name": "crimson-courses",
        "description": "Harvard course explorer with embedding-based search over Q-guide reviews; 6K MAU during shopping week."
      }
    ],
    "coursework": [
      "CS 161 Operating Systems",
      "CS 124 Algorithms & Data Structures",
      "CS 1380 Distributed Systems"
    ],
    "scores": {
      "overall": 87,
      "technical": 85,
      "execution": 86,
      "leadership": 92,
      "communication": 90,
      "trajectory": 91
    },
    "signals": [
      "Leads a 24-person student dev org while holding top-tier internships",
      "Microsoft work shipped to massive tenant scale with measured impact",
      "Strong communicator — natural fit for product-facing engineering"
    ],
    "watchouts": [
      "Breadth over depth so far — strongest work is product glue rather than deep systems ownership"
    ],
    "status": "new",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 16,
    "avatarUrl": "/people/candidates/c19.jpg"
  },
  {
    "id": "c20",
    "name": "Elise Hartman",
    "universityId": "princeton",
    "degree": "BS",
    "major": "Computer Science (Statistics & Machine Learning minor)",
    "gradYear": 2027,
    "gpa": 3.71,
    "location": "Princeton, NJ",
    "headline": "NLP research & LLM evals · CS @ Princeton '27 · Princeton NLP, ex-Arcadia",
    "about": "Research-leaning ML student working on data contamination and evaluation reliability in the Princeton NLP group, with one applied data-science internship in climate tech. Cares about measurement rigor — what evals actually capture and where they break. Seeking an ML engineering internship with a path from research-grade ideas to shipped models.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Rust",
      "Slurm",
      "dbt",
      "Airflow",
      "pandas",
      "scikit-learn"
    ],
    "experience": [
      {
        "title": "Research Assistant",
        "company": "Princeton NLP Group",
        "location": "Princeton, NJ",
        "start": "Sep 2025",
        "end": "Present",
        "bullets": [
          "Built a contamination-checking pipeline over 1.2B-token corpora (Rust + Slurm), cutting dedup runtime from 6 hours to 40 minutes",
          "Co-running a 120-participant human-eval study for a long-context summarization paper under submission to EMNLP 2026"
        ]
      },
      {
        "title": "Data Science Intern",
        "company": "Arcadia",
        "location": "Washington, DC",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Built a gradient-boosted utility-tariff anomaly detector that flagged $1.4M in misbilled customer accounts",
          "Productionized the feature pipeline in dbt + Airflow, powering 3 customer-facing dashboards"
        ]
      }
    ],
    "projects": [
      {
        "name": "evalscope",
        "description": "Open-source harness comparing 9 LLM judges against human labels on 2K examples; documented an 18-point agreement drop on adversarial paraphrases."
      }
    ],
    "coursework": [
      "COS 324 Intro to Machine Learning",
      "COS 484 Natural Language Processing",
      "ORF 350 Analysis of Big Data",
      "COS 333 Advanced Programming"
    ],
    "awards": [
      "Shapiro Prize for Academic Excellence"
    ],
    "scores": {
      "overall": 80,
      "technical": 84,
      "execution": 78,
      "leadership": 73,
      "communication": 79,
      "trajectory": 86
    },
    "signals": [
      "Hands-on LLM evaluation and data-contamination work in a top NLP lab",
      "Already converted research skills into a measurable business win at Arcadia"
    ],
    "watchouts": [
      "No production ML deployment yet — profile is research and pipeline heavy"
    ],
    "status": "new",
    "appliedFor": "ML Engineer Intern",
    "addedDaysAgo": 21,
    "avatarUrl": "/people/candidates/c20.jpg"
  },
  {
    "id": "c21",
    "name": "Julián Espinoza",
    "universityId": "ucla",
    "degree": "BS",
    "major": "Statistics & Data Science",
    "gradYear": 2026,
    "location": "Los Angeles, CA",
    "headline": "Applied ML & analytics · Stats & Data Science @ UCLA '26 · ex-OpenX, DataRes lead",
    "about": "Applied ML student who has shipped a CTR model lift to live ad traffic and led paid client analytics work through DataRes. Comfortable across the full stack of messy data — Spark pipelines, feature stores, model evaluation. Looking for a data science or MLE seat with real production feedback loops.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "Spark",
      "SQL",
      "XGBoost",
      "R",
      "Rcpp",
      "Airflow",
      "Tableau",
      "AWS EMR"
    ],
    "experience": [
      {
        "title": "Machine Learning Intern",
        "company": "OpenX",
        "location": "Pasadena, CA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Trained a CTR-prediction GBM on 600M auction logs; +2.1% AUC lift validated on a 5% live-traffic holdout",
          "Cut feature-store backfill cost 35% by moving Spark jobs to checkpointed spot fleets"
        ]
      },
      {
        "title": "Project Lead",
        "company": "DataRes @ UCLA",
        "location": "Los Angeles, CA",
        "start": "Jan 2025",
        "end": "Present",
        "bullets": [
          "Lead 6 analysts on a paid engagement with an LA logistics client; demand-forecast model cut reported stockouts 14%",
          "Teach a quarterly intro-to-pandas workshop drawing ~80 students"
        ]
      },
      {
        "title": "Research Assistant",
        "company": "UCLA Department of Statistics",
        "location": "Los Angeles, CA",
        "start": "Mar 2024",
        "end": "Dec 2024",
        "bullets": [
          "Implemented MCMC samplers for a spatial epidemiology model; 11x speedup from an Rcpp rewrite of the R inner loop",
          "Maintained simulation suite of 40+ scenario configs used in the group's JASA revision"
        ]
      }
    ],
    "projects": [
      {
        "name": "la-transit-lateness",
        "description": "GTFS-RT model predicting LA Metro bus lateness (MAE 1.9 min); accompanying blog write-up reached 20K reads."
      }
    ],
    "coursework": [
      "Stats 101C Statistical Models & Data Mining",
      "Stats 102B Computation for Statistics",
      "CS 145 Data Mining"
    ],
    "scores": {
      "overall": 78,
      "technical": 81,
      "execution": 80,
      "leadership": 74,
      "communication": 71,
      "trajectory": 83
    },
    "signals": [
      "Shipped a measured model lift to live ad traffic as an intern",
      "Runs paid client analytics engagements through DataRes"
    ],
    "status": "new",
    "appliedFor": "Data Scientist, New Grad",
    "addedDaysAgo": 0,
    "avatarUrl": "/people/candidates/c21.jpg"
  },
  {
    "id": "c22",
    "name": "Marisol Duarte",
    "universityId": "uiuc",
    "degree": "BS",
    "major": "Information Sciences (HCI concentration)",
    "gradYear": 2026,
    "gpa": 3.64,
    "location": "Urbana, IL",
    "headline": "Product design & UX research · iSchool HCI @ UIUC '26 · ex-Sprout Social",
    "about": "Product designer who pairs studio craft with real usability evidence — every major project ships with study data attached. Led design across four nonprofit teams at Hack4Impact while interning in Chicago SaaS. Looking for an early-career product design role on a research-respecting team.",
    "domain": "Design",
    "skills": [
      "Figma",
      "FigJam",
      "Framer",
      "Design systems",
      "Usability testing",
      "Maze",
      "HTML/CSS",
      "WCAG accessibility",
      "Prototyping"
    ],
    "experience": [
      {
        "title": "Product Design Intern",
        "company": "Sprout Social",
        "location": "Chicago, IL",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Redesigned the post-composer flow; moderated study (n=12) raised task completion 71% to 94% before shipping to 30K+ customers",
          "Built a Figma component library for the listening dashboard adopted by 3 product squads"
        ]
      },
      {
        "title": "Design Lead",
        "company": "Hack4Impact UIUC",
        "location": "Urbana, IL",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Direct design across 4 nonprofit project teams (14 designers); standardized research-to-handoff process cut rework cycles ~30%",
          "Introduced accessibility review gates that caught 40+ WCAG issues before launch across two product cycles"
        ]
      },
      {
        "title": "Undergraduate UX Research Assistant",
        "company": "UIUC School of Information Sciences",
        "location": "Urbana, IL",
        "start": "Jan 2024",
        "end": "May 2025",
        "bullets": [
          "Ran 22 contextual interviews for a screen-reader navigation study; co-authored a CHI Late-Breaking Work poster",
          "Coded 300+ interview excerpts in a shared affinity framework used by two follow-on studies"
        ]
      }
    ],
    "projects": [
      {
        "name": "Quad Eats redesign",
        "description": "End-to-end case study of the campus dining app with 38 user tests; menu information architecture partially adopted by University Housing's site."
      }
    ],
    "awards": [
      "HackIllinois 2025 — Best Design award"
    ],
    "scores": {
      "overall": 82,
      "technical": 75,
      "execution": 84,
      "leadership": 83,
      "communication": 88,
      "trajectory": 85
    },
    "signals": [
      "Ships design work with usability evidence attached, not just mocks",
      "Led 14 designers across parallel nonprofit teams while interning"
    ],
    "status": "shortlisted",
    "appliedFor": "Product Designer, Early Career",
    "addedDaysAgo": 12,
    "avatarUrl": "/people/candidates/c22.jpg"
  },
  {
    "id": "c23",
    "name": "Connor Whitaker",
    "universityId": "gatech",
    "degree": "BS",
    "major": "Computational Media",
    "gradYear": 2027,
    "location": "Atlanta, GA",
    "headline": "Aspiring PM · Computational Media @ Georgia Tech '27 · NCR Voyix PM intern",
    "about": "Early-stage product profile with one honest founder attempt, sustained nonprofit product leadership through Bits of Good, and a first PM internship now underway in Atlanta. Strengths are user discovery and writing; technical depth is still developing. Targeting APM programs for 2027.",
    "domain": "Product",
    "skills": [
      "PRD writing",
      "User interviews",
      "SQL",
      "Figma",
      "Amplitude",
      "Jira",
      "A/B test design",
      "Python (basic)"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "NCR Voyix",
        "location": "Atlanta, GA",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Own backlog grooming for a restaurant-POS reporting module used across 1,100+ merchant sites",
          "Wrote a kitchen-display alerting PRD adopted into the Q3 roadmap after two rounds of merchant interviews"
        ]
      },
      {
        "title": "Co-Founder",
        "company": "RoomSplit (CREATE-X Startup Launch)",
        "location": "Atlanta, GA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Grew a rent-splitting app to 310 beta users with one engineer; shut down after D30 retention stalled at 8%",
          "Published a public postmortem on mispriced acquisition channels that circulated widely in the CREATE-X cohort"
        ]
      },
      {
        "title": "Product Lead",
        "company": "Bits of Good",
        "location": "Atlanta, GA",
        "start": "Aug 2024",
        "end": "Present",
        "bullets": [
          "Led a 9-person student team building a case-management app for an Atlanta nonprofit serving 400+ clients per year; MVP shipped in 12 weeks",
          "Cut the client intake form from 40 to 12 fields after biweekly interviews with 6 case workers"
        ]
      }
    ],
    "projects": [
      {
        "name": "course-pulse",
        "description": "Chrome extension showing live seat availability during GT registration; 1,200 installs and a 4.7-star rating."
      }
    ],
    "coursework": [
      "CS 2340 Objects & Design",
      "CS 4400 Intro to Database Systems",
      "MGT 3300 Marketing Management"
    ],
    "scores": {
      "overall": 69,
      "technical": 62,
      "execution": 70,
      "leadership": 74,
      "communication": 76,
      "trajectory": 78
    },
    "signals": [
      "Real founder reps — built to 310 users and wrote a candid postmortem",
      "Sustained product leadership shipping for nonprofit clients"
    ],
    "watchouts": [
      "First industry PM internship still in progress — shipped-feature track record is thin"
    ],
    "status": "new",
    "appliedFor": "APM Program",
    "addedDaysAgo": 26,
    "avatarUrl": "/people/candidates/c23.jpg"
  },
  {
    "id": "c24",
    "name": "Natalie Kowalczyk",
    "universityId": "umich",
    "degree": "BS",
    "major": "Mathematics (Computer Science minor)",
    "gradYear": 2027,
    "gpa": 3.52,
    "location": "Detroit, MI",
    "headline": "Quant-curious · Math @ Michigan '27 · Comerica market-risk intern",
    "about": "Math major building toward quant research through club strategy work, probability TA-ing, and a first market-risk internship in Detroit banking. Notable for unusually honest out-of-sample analysis in club backtests. Seeking a first quantitative research or trading internship for summer 2027.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "NumPy",
      "pandas",
      "vectorbt",
      "R",
      "SQL",
      "Excel/VBA",
      "Probability & stochastic processes"
    ],
    "experience": [
      {
        "title": "Market Risk Intern",
        "company": "Comerica Bank",
        "location": "Detroit, MI",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Automating the daily VaR backtesting report in Python, replacing a 90-minute manual Excel process",
          "Building a ±300bp rate-shock scenario grid supporting the quarterly review of a $4B securities portfolio"
        ]
      },
      {
        "title": "Quant Team Analyst",
        "company": "Michigan Investment Group",
        "location": "Ann Arbor, MI",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Backtested a momentum/mean-reversion pairs strategy on 10 years of equities data (Sharpe 1.1 in-sample, 0.4 OOS) and presented the decay analysis to 60 members",
          "Built the club's shared vectorbt backtesting library now used by 5 project teams"
        ]
      },
      {
        "title": "Instructional Aide, MATH 425 Probability",
        "company": "University of Michigan",
        "location": "Ann Arbor, MI",
        "start": "Sep 2025",
        "end": "Apr 2026",
        "bullets": [
          "Graded weekly problem sets for 120 students and held twice-weekly office hours",
          "Wrote a supplementary problem bank of 60 exam-style questions adopted by the course coordinator"
        ]
      }
    ],
    "projects": [
      {
        "name": "event-market spread scanner",
        "description": "Cross-venue scanner for Kalshi/Polymarket binary markets; flagged 37 spreads wider than 4 cents over 3 months of paper trading."
      }
    ],
    "coursework": [
      "MATH 425 Probability",
      "MATH 423 Mathematics of Finance",
      "STATS 413 Applied Regression",
      "EECS 281 Data Structures & Algorithms"
    ],
    "scores": {
      "overall": 66,
      "technical": 70,
      "execution": 64,
      "leadership": 59,
      "communication": 67,
      "trajectory": 74
    },
    "signals": [
      "Reports out-of-sample decay honestly instead of overfitting club backtests",
      "Strong probability foundation reinforced by TA-ing MATH 425"
    ],
    "watchouts": [
      "No quant-firm exposure yet — experience is banking-adjacent and club-level"
    ],
    "status": "new",
    "appliedFor": "Quantitative Research Intern",
    "addedDaysAgo": 7,
    "avatarUrl": "/people/candidates/c24.jpg"
  },
  {
    "id": "c25",
    "name": "Omar Haddad",
    "universityId": "uw",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.96,
    "location": "Seattle, WA",
    "headline": "Distributed systems & infra · CS @ UW '26 · ex-Stripe, ex-AWS",
    "about": "Systems-focused engineer with production wins at Stripe and AWS plus a research stint in UW's Computer Systems Lab. Strongest at the storage/streaming layer: hot-path profiling, replication, and making tail latency boring. Targeting a new-grad role owning high-throughput backend infrastructure.",
    "domain": "Software",
    "skills": [
      "Rust",
      "Go",
      "Java",
      "Kubernetes",
      "gRPC",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Terraform",
      "AWS"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Stripe",
        "location": "Seattle, WA",
        "start": "Jun 2025",
        "end": "Sep 2025",
        "bullets": [
          "Cut p99 latency of the payment-intents API 31% by replacing hot-path idempotency Redis round-trips with an in-process LRU and async write-behind",
          "Built a shadow-traffic replay harness adopted by 4 teams to validate a Ruby-to-Java migration of a service handling 12K RPS",
          "Closed out the internship with a return offer and a post-intern design doc that shipped Q4 2025"
        ]
      },
      {
        "title": "Software Development Engineer Intern",
        "company": "Amazon Web Services (S3)",
        "location": "Seattle, WA",
        "start": "Jun 2024",
        "end": "Sep 2024",
        "bullets": [
          "Built a fleet-wide hot-partition detector for S3 index nodes that surfaces anomalies in under 60s, cutting on-call triage ~6 hrs/week",
          "Drove the design review across 3 partner teams and launched via staged rollout to 100% of production cells"
        ]
      },
      {
        "title": "Undergraduate Researcher",
        "company": "UW Computer Systems Lab",
        "location": "Seattle, WA",
        "start": "Jan 2024",
        "end": "Present",
        "bullets": [
          "Co-authored an NSDI '26 workshop paper on adaptive RPC scheduling; measured 2.1x tail-latency improvement on a 64-node cluster",
          "Maintains the lab's benchmarking rig (Rust + eBPF tracing) used by 5 grad students"
        ]
      }
    ],
    "projects": [
      {
        "name": "KiteKV",
        "description": "Log-structured key-value store in Rust with MVCC and group commit; sustains 480K writes/s on a single i3.2xlarge, with a Jepsen-style fault-injection suite."
      },
      {
        "name": "Husky Scheduler",
        "description": "Open-source course-scheduling service used by 9K+ UW students per quarter; Go backend, sub-100ms constraint solves."
      }
    ],
    "awards": [
      "ICPC Pacific Northwest Regional — 2nd place (2024)",
      "Allen School Dean's List (6 quarters)"
    ],
    "coursework": [
      "Distributed Systems",
      "Operating Systems",
      "Database Internals",
      "Computer Networks",
      "Compilers"
    ],
    "scores": {
      "overall": 96,
      "technical": 98,
      "execution": 96,
      "leadership": 90,
      "communication": 91,
      "trajectory": 97
    },
    "signals": [
      "Production impact at Stripe scale as an intern (p99 down 31% on a hot path)",
      "Return offers from both Stripe and AWS",
      "NSDI workshop co-author while carrying a 3.96 in Allen School"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 5,
    "avatarUrl": "/people/candidates/c25.jpg"
  },
  {
    "id": "c26",
    "name": "Yuna Sakamoto",
    "universityId": "cornell",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2027,
    "gpa": 3.88,
    "location": "San Francisco, CA (summer)",
    "headline": "Full-stack & realtime systems · CS @ Cornell '27 · Figma intern, ex-Datadog",
    "about": "Product-minded systems engineer with shipped, measured wins at Datadog and a current internship on Figma's multiplayer infrastructure. Comfortable across the stack but happiest in realtime and observability code paths. Recruiting for 2027 new-grad backend/full-stack roles.",
    "domain": "Software",
    "skills": [
      "TypeScript",
      "React",
      "Go",
      "Python",
      "WebSockets",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Datadog"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Figma",
        "location": "San Francisco, CA",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Building multiplayer-presence batching for FigJam; early benchmarks cut WebSocket fan-out messages 44% on 200-user boards",
          "Migrated an internal feature-flag dashboard from JavaScript to TypeScript (28K LOC) with zero regressions in two weeks"
        ]
      },
      {
        "title": "Software Engineer Intern",
        "company": "Datadog",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped a Live Tail query-caching layer that cut median log-stream start time from 1.9s to 700ms for 8K+ daily users",
          "Added OpenTelemetry span-link support to the trace explorer, closing the third-most-upvoted customer request of H1"
        ]
      },
      {
        "title": "Teaching Assistant, CS 4410 Operating Systems",
        "company": "Cornell University",
        "location": "Ithaca, NY",
        "start": "Aug 2025",
        "end": "May 2026",
        "bullets": [
          "Ran weekly sections for 35 students in Cornell's hardest systems course",
          "Rewrote the multithreaded filesystem project autograder, cutting grading turnaround from 5 days to 1"
        ]
      }
    ],
    "projects": [
      {
        "name": "BigRedRides",
        "description": "Campus rideshare-matching app with 3,200 registered Cornell users; React Native frontend, Go backend, geohash-based matching."
      },
      {
        "name": "raft-kv",
        "description": "Fault-tolerant key-value store implementing Raft in Go; survives randomized partition tests in a Jepsen-style harness."
      }
    ],
    "awards": [
      "BigRed//Hacks 2024 — 1st place of 110 teams"
    ],
    "coursework": [
      "Operating Systems",
      "Distributed Systems",
      "Databases",
      "Algorithms",
      "ML for Engineers"
    ],
    "scores": {
      "overall": 89,
      "technical": 90,
      "execution": 92,
      "leadership": 84,
      "communication": 88,
      "trajectory": 93
    },
    "signals": [
      "Back-to-back internships at Datadog and Figma with quantified shipped wins",
      "TA for Cornell's flagship OS course while interning every summer",
      "Hackathon winner who turned the project into a 3,200-user app"
    ],
    "status": "shortlisted",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 2,
    "avatarUrl": "/people/candidates/c26.jpg"
  },
  {
    "id": "c27",
    "name": "Karim El-Sayed",
    "universityId": "utaustin",
    "degree": "MS",
    "major": "Computer Science (ML Systems)",
    "gradYear": 2026,
    "gpa": 3.91,
    "location": "Austin, TX",
    "headline": "ML inference & GPU systems · MSCS @ UT Austin '26 · ex-NVIDIA, ex-Amazon",
    "about": "ML-systems engineer who lives at the kernel-to-model boundary: CUDA fusion, FP8 quantization, KV-cache compression. Combines a first-author NeurIPS workshop paper with production internships at NVIDIA and Amazon. Looking for an inference/training-infrastructure role on a serious GPU fleet.",
    "domain": "Data & ML",
    "skills": [
      "PyTorch",
      "CUDA",
      "Triton",
      "TensorRT",
      "vLLM",
      "C++",
      "Python",
      "Ray",
      "Spark",
      "MLflow"
    ],
    "experience": [
      {
        "title": "Deep Learning Intern",
        "company": "NVIDIA",
        "location": "Santa Clara, CA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Cut p95 inference latency 38% on a production recommender by fusing attention CUDA kernels and moving to FP8 with <0.2% accuracy loss",
          "Built a Triton-based kernel autotuning harness adopted by 2 internal teams, sweeping 1,400 configurations nightly"
        ]
      },
      {
        "title": "Applied Scientist Intern",
        "company": "Amazon",
        "location": "Seattle, WA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Improved CTR-model offline AUC +1.8% with sequence-aware feature pipelines over 2B-event Spark jobs",
          "Shipped a feature-store backfill that reduced training-data staleness from 36h to 4h"
        ]
      },
      {
        "title": "Graduate Research Assistant",
        "company": "UT Austin Statistical ML Lab",
        "location": "Austin, TX",
        "start": "Aug 2024",
        "end": "Present",
        "bullets": [
          "First-author NeurIPS 2025 ENLSP workshop paper on KV-cache compression: 2.6x memory reduction at equal perplexity on Llama-3-8B",
          "Runs the lab's 8xH100 node scheduling and profiling setup for 6 students"
        ]
      }
    ],
    "projects": [
      {
        "name": "kvzip",
        "description": "Open-source KV-cache compression library (1.1K GitHub stars) with a vLLM integration; powers the lab's long-context serving experiments."
      }
    ],
    "coursework": [
      "Large-Scale Machine Learning",
      "GPU Architectures",
      "Convex Optimization",
      "Distributed Computing"
    ],
    "scores": {
      "overall": 90,
      "technical": 96,
      "execution": 89,
      "leadership": 82,
      "communication": 85,
      "trajectory": 92
    },
    "signals": [
      "Kernel-level production wins at NVIDIA (p95 down 38% via CUDA fusion + FP8)",
      "First-author NeurIPS workshop paper plus a 1.1K-star OSS library"
    ],
    "watchouts": [
      "Deep IC profile — little evidence of leading people or cross-team work yet"
    ],
    "status": "new",
    "appliedFor": "Machine Learning Engineer, New Grad",
    "addedDaysAgo": 11,
    "avatarUrl": "/people/candidates/c27.jpg"
  },
  {
    "id": "c28",
    "name": "Jiwoo Han",
    "universityId": "columbia",
    "degree": "BS",
    "major": "Computer Science & Statistics",
    "gradYear": 2026,
    "location": "New York, NY",
    "headline": "Applied ML & NLP eval · CS+Stats @ Columbia '26 · ex-Spotify ML intern",
    "about": "Applied ML engineer who pairs rigorous evaluation work (ACL Findings co-author on multilingual factuality) with a measured production win at Spotify. Equally fluent in retrieval modeling and the data-engineering grind underneath it. Seeking a new-grad role on a recommendations or LLM-evaluation team.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Polars",
      "pandas",
      "SQL",
      "BigQuery",
      "Airflow",
      "Docker"
    ],
    "experience": [
      {
        "title": "Machine Learning Intern",
        "company": "Spotify",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Lifted podcast-recommendation engagement +2.3% in a 5M-user A/B by adding two-tower retrieval with listening-session features",
          "Cut candidate-generation pipeline runtime 55% by migrating pandas ETL to Polars over the 800M-row interaction table"
        ]
      },
      {
        "title": "Research Assistant, NLP Group",
        "company": "Columbia Data Science Institute",
        "location": "New York, NY",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Co-authored an ACL 2026 Findings paper on multilingual factuality evaluation; built the 12-language, 31K-claim benchmark",
          "Maintains the lab's eval harness running 40+ model configs nightly on an 8xA100 node"
        ]
      },
      {
        "title": "Teaching Assistant, COMS 4771 Machine Learning",
        "company": "Columbia University",
        "location": "New York, NY",
        "start": "Jan 2025",
        "end": "May 2025",
        "bullets": [
          "Held office hours for a 180-student class",
          "Authored 2 new kernel-methods problem sets now in the permanent course rotation"
        ]
      }
    ],
    "projects": [
      {
        "name": "FactCheckKo",
        "description": "Korean claim-verification model fine-tuned on the lab's 31K-claim benchmark; 81 F1 vs. 74 for the prior open baseline, released on Hugging Face."
      }
    ],
    "awards": [
      "Columbia Dean's List (5 semesters)"
    ],
    "coursework": [
      "Machine Learning",
      "NLP",
      "Statistical Inference",
      "Causal Inference",
      "Databases"
    ],
    "scores": {
      "overall": 87,
      "technical": 91,
      "execution": 85,
      "leadership": 81,
      "communication": 90,
      "trajectory": 89
    },
    "signals": [
      "Measured +2.3% engagement lift in a 5M-user A/B as a Spotify intern",
      "ACL Findings co-author as an undergrad, with the benchmark built end-to-end"
    ],
    "watchouts": [
      "Research-leaning profile — one production internship so far"
    ],
    "status": "new",
    "appliedFor": "Machine Learning Engineer, New Grad",
    "addedDaysAgo": 19,
    "avatarUrl": "/people/candidates/c28.jpg"
  },
  {
    "id": "c29",
    "name": "Reza Farahani",
    "universityId": "berkeley",
    "degree": "BA",
    "major": "Cognitive Science (HCI focus)",
    "gradYear": 2027,
    "location": "San Francisco, CA (summer)",
    "headline": "Product design · CogSci/HCI @ Berkeley '27 · Retool design intern, Cal Hacks design lead",
    "about": "Systems-thinking product designer who moves from research to polished, dev-ready components fast. Cut prototype time-to-first-app from 24 to 11 minutes at Retool and rebranded an 1,800-hacker event at Cal Hacks. Looking for an early-career product design seat on a dev-tools or productivity team.",
    "domain": "Design",
    "skills": [
      "Figma",
      "Framer",
      "ProtoPie",
      "Adobe Illustrator",
      "Design systems",
      "Usability testing",
      "HTML/CSS",
      "JavaScript (prototyping)"
    ],
    "experience": [
      {
        "title": "Product Design Intern",
        "company": "Retool",
        "location": "San Francisco, CA",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Redesigning mobile app-builder onboarding; usability tests with 9 customers cut time-to-first-app from 24 to 11 minutes in prototype testing",
          "Shipped 30+ production-ready screens and a Figma component library adopted by 3 product squads"
        ]
      },
      {
        "title": "Design Lead",
        "company": "Cal Hacks",
        "location": "Berkeley, CA",
        "start": "Sep 2024",
        "end": "May 2026",
        "bullets": [
          "Led the 6-person design team for the 1,800-hacker flagship event; site rebrand lifted applications 27% YoY",
          "Built and taught a 10-session Figma workshop series averaging 80 attendees"
        ]
      },
      {
        "title": "Student Design Consultant",
        "company": "Berkeley Innovation",
        "location": "Berkeley, CA",
        "start": "Jan 2024",
        "end": "May 2025",
        "bullets": [
          "Delivered end-to-end redesigns for 3 client startups",
          "One shipped signup flow reduced drop-off 18% measured over 6 weeks"
        ]
      }
    ],
    "projects": [
      {
        "name": "Wayfind",
        "description": "Accessibility-first campus-navigation app (wheelchair routing, low-vision mode); won Best Design at TreeHacks 2026 out of 450 teams."
      },
      {
        "name": "ContrastKit",
        "description": "Figma plugin for batch WCAG contrast auditing across component variants; 4,000+ installs."
      }
    ],
    "awards": [
      "Best Design — TreeHacks 2026"
    ],
    "scores": {
      "overall": 80,
      "technical": 74,
      "execution": 82,
      "leadership": 84,
      "communication": 86,
      "trajectory": 83
    },
    "signals": [
      "Prototype testing cut time-to-first-app from 24 to 11 minutes at Retool",
      "Led the design rebrand for an 1,800-person hackathon, +27% applications"
    ],
    "watchouts": [
      "First industry internship in progress — portfolio is mostly campus work"
    ],
    "status": "new",
    "appliedFor": "Product Designer, Early Career",
    "addedDaysAgo": 26,
    "avatarUrl": "/people/candidates/c29.jpg"
  },
  {
    "id": "c30",
    "name": "Leila Nassar",
    "universityId": "stanford",
    "degree": "BS",
    "major": "Management Science & Engineering",
    "gradYear": 2026,
    "gpa": 3.74,
    "location": "Stanford, CA",
    "headline": "Product · MS&E @ Stanford '26 · ex-Ramp PM intern",
    "about": "Analytics-first product builder who has shipped a 100%-rollout feature at Ramp and run growth experiments at Strava. Built Stanford's product fellowship from scratch and a course-planning app used by 1,100 students. Aiming for an APM program with a data-heavy product surface.",
    "domain": "Product",
    "skills": [
      "SQL",
      "Amplitude",
      "Mixpanel",
      "A/B testing",
      "Figma",
      "Linear",
      "Python (pandas)",
      "Looker"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "Ramp",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Sep 2025",
        "bullets": [
          "Owned the spend-alerts revamp end-to-end; shipped to 100% of customers and cut alert-related support tickets 23%",
          "Wrote PRDs and ran weekly syncs across 2 engineering pods (9 engineers) and design"
        ]
      },
      {
        "title": "VP Product, BASES",
        "company": "Stanford BASES",
        "location": "Stanford, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Launched a product fellowship matching 40 students with 12 startups; 92% completion rate in year one",
          "Grew the program's recruiting pipeline to 300+ applications with 5 sponsor companies"
        ]
      },
      {
        "title": "Product Analyst Intern",
        "company": "Strava",
        "location": "San Francisco, CA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Analyzed the activation funnel in SQL and Amplitude across 4 cohorts",
          "Recommendations drove an experiment that won +6% week-1 retention"
        ]
      }
    ],
    "projects": [
      {
        "name": "PaperTrail",
        "description": "Course-planning web app used by 1,100 Stanford students; led the 4-person team, owned specs, 25 user interviews, and the launch."
      }
    ],
    "coursework": [
      "Decision Analysis",
      "Data Science for Product",
      "Org Behavior",
      "CS106B",
      "Marketing Analytics"
    ],
    "scores": {
      "overall": 82,
      "technical": 75,
      "execution": 84,
      "leadership": 87,
      "communication": 88,
      "trajectory": 85
    },
    "signals": [
      "Shipped a 100%-rollout feature with measured support-ticket impact as a PM intern",
      "Built a 40-student product fellowship from zero with 92% completion"
    ],
    "status": "shortlisted",
    "appliedFor": "APM Program",
    "addedDaysAgo": 8,
    "avatarUrl": "/people/candidates/c30.jpg"
  },
  {
    "id": "c31",
    "name": "Kenta Mori",
    "universityId": "mit",
    "degree": "BS",
    "major": "Mathematics (CS minor)",
    "gradYear": 2027,
    "gpa": 3.81,
    "location": "Cambridge, MA",
    "headline": "Quant research · Math @ MIT '27 · ex-Akuna Capital · Putnam top-200",
    "about": "Probability-heavy quant with a desk-validated track record: a dispersion signal promoted to paper trading by week 8 at Akuna and a vol-surface tool that cut calibration time 60%. Runs MIT's 300-member trading club. Targeting a 2027 quantitative research internship at a research-driven shop.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "C++17",
      "pandas",
      "NumPy",
      "statsmodels",
      "PyTorch",
      "SQL",
      "Linux"
    ],
    "experience": [
      {
        "title": "Quantitative Trading Intern",
        "company": "Akuna Capital",
        "location": "Chicago, IL",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Built an implied-vol surface fitting tool in Python/C++ that cut the desk's overnight calibration time 60%",
          "Backtested a dispersion signal across 3 years of options data; promoted to paper trading by week 8"
        ]
      },
      {
        "title": "Undergraduate Researcher",
        "company": "MIT LIDS",
        "location": "Cambridge, MA",
        "start": "Feb 2025",
        "end": "Present",
        "bullets": [
          "Studies regime-switching models for limit-order-book dynamics",
          "Reproduced and extended 2 baseline papers with 1.4x better out-of-sample fill-rate prediction"
        ]
      },
      {
        "title": "Co-President",
        "company": "Traders@MIT",
        "location": "Cambridge, MA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Runs the 300-member club and its quant-education curriculum",
          "Organized an intercollegiate trading competition with 21 schools and $15K in sponsorships from 5 firms"
        ]
      }
    ],
    "projects": [
      {
        "name": "lobsim",
        "description": "Open-source limit-order-book simulator with realistic queue-position dynamics; used as the backtest engine in 2 MIT course projects."
      }
    ],
    "awards": [
      "Putnam Competition — top 200 (2024)",
      "MIT Pokerbots 2026 — 4th of 80 teams"
    ],
    "coursework": [
      "Probability Theory",
      "Stochastic Processes",
      "Real Analysis",
      "Convex Optimization",
      "Algorithms"
    ],
    "scores": {
      "overall": 81,
      "technical": 88,
      "execution": 79,
      "leadership": 78,
      "communication": 74,
      "trajectory": 87
    },
    "signals": [
      "Intern signal promoted to paper trading at Akuna by week 8",
      "Putnam top-200 math depth with desk-usable C++"
    ],
    "status": "new",
    "appliedFor": "Quantitative Research Intern",
    "addedDaysAgo": 14,
    "avatarUrl": "/people/candidates/c31.jpg"
  },
  {
    "id": "c32",
    "name": "Lina Khoury",
    "universityId": "cmu",
    "degree": "BS",
    "major": "Electrical & Computer Engineering",
    "gradYear": 2028,
    "gpa": 3.52,
    "location": "Pittsburgh, PA",
    "headline": "Embedded & PCB design · ECE @ CMU '28 · Rocket Command avionics",
    "about": "Hands-on embedded builder two years into CMU ECE: flight-proven PCB work with the rocketry team, a self-published RP2040 logic analyzer, and a first industry internship at a Pittsburgh motion-control firm. Wants a hardware internship doing board bring-up or embedded firmware.",
    "domain": "Hardware",
    "skills": [
      "KiCad",
      "Altium Designer",
      "C",
      "STM32",
      "FreeRTOS",
      "SPI/I2C/UART",
      "Oscilloscopes & logic analyzers",
      "Python",
      "MATLAB"
    ],
    "experience": [
      {
        "title": "Hardware Engineering Intern",
        "company": "Aerotech Inc.",
        "location": "Pittsburgh, PA",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Bringing up a 4-layer STM32-based motor-controller board; wrote the SPI and I2C peripheral drivers",
          "Built an automated test jig that cut the board bring-up checklist time ~30%"
        ]
      },
      {
        "title": "Makerspace Technician",
        "company": "CMU TechSpark",
        "location": "Pittsburgh, PA",
        "start": "Sep 2025",
        "end": "Present",
        "bullets": [
          "Trains ~30 students/month on soldering, rework, and 3D-printing equipment",
          "Maintains the shop's fleet of 12 printers and 4 rework stations"
        ]
      },
      {
        "title": "Avionics Member",
        "company": "Carnegie Mellon Rocket Command",
        "location": "Pittsburgh, PA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Designed the flight computer's 6-rail power-distribution PCB in KiCad; flew on 2 launches with zero electrical failures",
          "Wrote telemetry-logging firmware in C on STM32 sampling 8 sensors at 100Hz"
        ]
      }
    ],
    "projects": [
      {
        "name": "PocketLA",
        "description": "8-channel RP2040-based logic analyzer with a $19 BOM; fully documented open-hardware build with 150+ GitHub stars."
      }
    ],
    "coursework": [
      "Logic Design & Verification",
      "Circuits",
      "Signals & Systems",
      "Embedded Systems (in progress)"
    ],
    "scores": {
      "overall": 68,
      "technical": 72,
      "execution": 67,
      "leadership": 62,
      "communication": 65,
      "trajectory": 76
    },
    "signals": [
      "Flight hardware with zero electrical failures across 2 launches",
      "Self-taught PCB design — shipped a documented $19 open-hardware logic analyzer"
    ],
    "watchouts": [
      "First industry internship just started — limited professional experience"
    ],
    "status": "new",
    "appliedFor": "Hardware Engineer Intern",
    "addedDaysAgo": 3,
    "avatarUrl": "/people/candidates/c32.jpg"
  },
  {
    "id": "c33",
    "name": "Darius Coleman",
    "universityId": "harvard",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.96,
    "location": "Cambridge, MA",
    "headline": "Distributed systems · CS @ Harvard '26 · ex-Stripe, ex-Google intern",
    "about": "Systems-focused engineer with two production infra internships and an upstream Kubernetes contribution before senior year. Deep interest in storage engines, consensus, and latency work at scale. Looking for a backend/infra new-grad seat on a team that owns hard reliability problems.",
    "domain": "Software",
    "skills": [
      "Rust",
      "Go",
      "C++",
      "Kubernetes",
      "PostgreSQL",
      "gRPC",
      "eBPF",
      "Kafka",
      "Terraform"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Stripe",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Cut p99 latency of the PaymentIntents API 31% by sharding a hot Postgres table and adding request coalescing in the Go edge proxy",
          "Shipped an idempotency-key garbage collector processing 1.2B keys/day, reducing storage spend ~$14K/month",
          "Wrote the rollout runbook and dashboards; change deployed to 100% of traffic with zero incident pages"
        ]
      },
      {
        "title": "Software Engineering Intern",
        "company": "Google (Cloud / GKE)",
        "location": "Sunnyvale, CA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Implemented a watch-cache deduplication path in kube-apiserver that cut memory 22% on 5K-node test clusters",
          "Patch merged upstream into Kubernetes 1.32 after review with two SIG API Machinery maintainers"
        ]
      },
      {
        "title": "Teaching Fellow, CS 161 (Operating Systems)",
        "company": "Harvard University",
        "location": "Cambridge, MA",
        "start": "Sep 2024",
        "end": "May 2026",
        "bullets": [
          "Ran weekly sections and design reviews for ~45 students across the kernel and file-system assignments",
          "Rebuilt the autograder's QEMU harness, cutting average grading turnaround from 5 days to 36 hours"
        ]
      }
    ],
    "projects": [
      {
        "name": "Ferrite",
        "description": "Raft-based distributed key-value store in Rust; sustains 40K writes/sec across 5 nodes and passes Jepsen-style partition tests. 1.1K GitHub stars."
      },
      {
        "name": "hsched",
        "description": "eBPF-based CPU scheduler tracer that visualizes run-queue latency per cgroup; used in CS 161 lectures."
      }
    ],
    "awards": [
      "ICPC North America Championship — 9th place (2025)",
      "HackMIT 2024 — 1st place overall"
    ],
    "coursework": [
      "Operating Systems",
      "Distributed Systems",
      "Compilers",
      "Advanced Algorithms",
      "Database Systems"
    ],
    "scores": {
      "overall": 96,
      "technical": 99,
      "execution": 96,
      "leadership": 89,
      "communication": 91,
      "trajectory": 98
    },
    "signals": [
      "Merged a performance patch upstream into Kubernetes as a junior-year intern",
      "Two top-tier infra internships (Stripe, Google) with quantified production wins",
      "ICPC NAC top-10 finisher"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 3,
    "avatarUrl": "/people/candidates/c33.jpg"
  },
  {
    "id": "c34",
    "name": "Ananya Krishnan",
    "universityId": "princeton",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2027,
    "gpa": 3.89,
    "location": "San Francisco, CA",
    "headline": "Full-stack + infra · COS @ Princeton '27 · Figma SWE intern",
    "about": "Product-minded engineer who moves comfortably between React frontends and Rust/Go services, currently interning on Figma's realtime sync team. Previously shipped a customer-facing observability feature at Datadog. Targeting a new-grad SWE role on a product-infra team after graduation.",
    "domain": "Software",
    "skills": [
      "TypeScript",
      "React",
      "Rust",
      "Go",
      "PostgreSQL",
      "Kafka",
      "GraphQL",
      "Playwright",
      "AWS"
    ],
    "experience": [
      {
        "title": "Software Engineer Intern",
        "company": "Figma",
        "location": "San Francisco, CA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Building a Rust rate limiter for the multiplayer sync gateway that serves ~9M daily collaborative sessions",
          "Cut a flaky end-to-end suite's runtime 41% in week two by sharding Playwright runs across CI workers"
        ]
      },
      {
        "title": "Software Engineer Intern",
        "company": "Datadog",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped a log-pattern clustering view (React + Go) adopted by 3,000+ customer orgs within the first month of GA",
          "Reduced ingest-backlog alerts 60% by adding adaptive batching to a high-volume Kafka consumer"
        ]
      },
      {
        "title": "Co-Director",
        "company": "HackPrinceton",
        "location": "Princeton, NJ",
        "start": "Feb 2025",
        "end": "Present",
        "bullets": [
          "Grew sponsorship revenue from $38K to $61K and attendance to ~600 hackers across two cycles",
          "Led a 22-person organizing team across logistics, judging, and sponsor tracks"
        ]
      }
    ],
    "projects": [
      {
        "name": "CourseLens",
        "description": "Course-review and planning platform used by ~4,500 Princeton students; Next.js + Postgres with 12 years of registrar data scraped and normalized."
      }
    ],
    "awards": [
      "Dean's List (4 semesters)"
    ],
    "coursework": [
      "Algorithms",
      "Systems Programming",
      "Distributed Systems",
      "Programming Languages"
    ],
    "scores": {
      "overall": 90,
      "technical": 91,
      "execution": 93,
      "leadership": 88,
      "communication": 90,
      "trajectory": 95
    },
    "signals": [
      "Back-to-back Figma and Datadog internships before senior year",
      "Shipped a GA feature adopted by 3,000+ orgs as an intern",
      "Runs a 600-person hackathon while keeping a 3.89 in COS"
    ],
    "status": "shortlisted",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 11,
    "avatarUrl": "/people/candidates/c34.jpg"
  },
  {
    "id": "c35",
    "name": "Rohan Venkataraman",
    "universityId": "ucla",
    "degree": "MS",
    "major": "Computer Science (ML Systems)",
    "gradYear": 2026,
    "gpa": 3.82,
    "location": "Los Angeles, CA",
    "headline": "ML systems · MS CS @ UCLA '26 · ex-NVIDIA inference intern",
    "about": "ML-systems engineer working at the intersection of model efficiency and GPU performance, with a NeurIPS workshop paper on KV-cache compression. Production experience shipping quantized inference pipelines at NVIDIA and Adobe. Seeking an ML engineer role on an inference, training-infra, or model-efficiency team.",
    "domain": "Data & ML",
    "skills": [
      "PyTorch",
      "CUDA",
      "Triton",
      "TensorRT-LLM",
      "C++",
      "Python",
      "Ray",
      "Docker",
      "Weights & Biases"
    ],
    "experience": [
      {
        "title": "Deep Learning Software Intern",
        "company": "NVIDIA",
        "location": "Santa Clara, CA",
        "start": "Jun 2025",
        "end": "Sep 2025",
        "bullets": [
          "Cut p95 inference latency 38% on a production ViT pipeline by fusing CUDA kernels and migrating it to TensorRT-LLM",
          "Built INT8 calibration tooling adopted by 4 internal model teams; documented the workflow in the team wiki"
        ]
      },
      {
        "title": "Graduate Research Assistant",
        "company": "UCLA — ML Systems Lab",
        "location": "Los Angeles, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Co-authored a NeurIPS 2025 workshop paper on KV-cache compression: 3.1x memory reduction at <0.5% accuracy loss",
          "Maintain the lab's training stack across 32 A100s; cut average job queue time 45% with gang scheduling"
        ]
      },
      {
        "title": "Machine Learning Intern",
        "company": "Adobe",
        "location": "San Jose, CA",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Shipped a diffusion-based background-removal model to the Photoshop Web beta, +7pt IoU over the incumbent model",
          "Reduced training cost 30% by switching the data loader to WebDataset shards on S3"
        ]
      }
    ],
    "projects": [
      {
        "name": "kvzip",
        "description": "Open-source KV-cache quantization library for Hugging Face transformers; 800+ GitHub stars, benchmarked across 6 model families."
      },
      {
        "name": "TritonScan",
        "description": "Autotuner that sweeps Triton kernel configs and emits flame-graph comparisons; used by 3 labmates for paper benchmarks."
      }
    ],
    "coursework": [
      "GPU Architecture",
      "Large-Scale ML Systems",
      "Convex Optimization",
      "Operating Systems"
    ],
    "scores": {
      "overall": 88,
      "technical": 95,
      "execution": 89,
      "leadership": 80,
      "communication": 83,
      "trajectory": 92
    },
    "signals": [
      "Published NeurIPS workshop author with matching production inference experience",
      "Quantified GPU-performance wins at NVIDIA scale (38% p95 latency cut)"
    ],
    "status": "new",
    "appliedFor": "ML Engineer, New Grad",
    "addedDaysAgo": 7,
    "avatarUrl": "/people/candidates/c35.jpg"
  },
  {
    "id": "c36",
    "name": "Imani Brooks",
    "universityId": "uiuc",
    "degree": "BS",
    "major": "Statistics & Computer Science",
    "gradYear": 2027,
    "gpa": 3.72,
    "location": "Chicago, IL",
    "headline": "Data science + ML · Stats & CS @ UIUC '27 · John Deere DS intern",
    "about": "Data scientist in training with a knack for wrangling large messy sensor datasets into reliable pipelines, currently working on agricultural telemetry at John Deere. Strong applied-stats foundation backed by NCSA research work. Wants a data science or ML role where models actually ship to users.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "pandas",
      "Polars",
      "scikit-learn",
      "LightGBM",
      "PySpark",
      "SQL",
      "Airflow",
      "Tableau"
    ],
    "experience": [
      {
        "title": "Data Science Intern",
        "company": "John Deere",
        "location": "Chicago, IL",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Building yield-anomaly detection on telemetry from ~18K connected combines using PySpark on Databricks",
          "Stood up data-quality checks that flagged 3 upstream schema drifts in the first month"
        ]
      },
      {
        "title": "Undergraduate Research Assistant",
        "company": "NCSA, University of Illinois",
        "location": "Urbana, IL",
        "start": "Sep 2025",
        "end": "May 2026",
        "bullets": [
          "Merged and cleaned a 240M-row environmental sensor dataset for a climate-modeling group",
          "Cut feature-pipeline runtime from 6 hours to 35 minutes by rewriting pandas transforms in Polars"
        ]
      },
      {
        "title": "Course Assistant, CS 225 (Data Structures)",
        "company": "University of Illinois Urbana-Champaign",
        "location": "Urbana, IL",
        "start": "Jan 2025",
        "end": "May 2026",
        "bullets": [
          "Held weekly office hours for 60+ students per semester",
          "Rebuilt flaky autograder fixtures, cutting regrade requests ~30%"
        ]
      }
    ],
    "projects": [
      {
        "name": "ChampaignTransit",
        "description": "GTFS-based bus delay predictor for the Champaign-Urbana MTD (LightGBM, MAE 1.9 min); deployed as a Streamlit app with ~900 monthly users."
      }
    ],
    "coursework": [
      "Machine Learning",
      "Applied Regression",
      "Data Mining",
      "Probability & Statistics",
      "Database Systems"
    ],
    "scores": {
      "overall": 80,
      "technical": 79,
      "execution": 84,
      "leadership": 76,
      "communication": 85,
      "trajectory": 88
    },
    "signals": [
      "Comfortable at 100M+ row scale (PySpark, Polars) earlier than most juniors",
      "Clear upward trajectory: TA → NCSA research → industry DS internship in 18 months"
    ],
    "watchouts": [
      "No production ML deployment yet — experience skews analytics and pipelines"
    ],
    "status": "new",
    "appliedFor": "Data Scientist, New Grad",
    "addedDaysAgo": 18,
    "avatarUrl": "/people/candidates/c36.jpg"
  },
  {
    "id": "c37",
    "name": "Nikhil Chandran",
    "universityId": "gatech",
    "degree": "BS",
    "major": "Computational Media (HCI track)",
    "gradYear": 2026,
    "location": "Atlanta, GA",
    "headline": "Product design · Computational Media @ Georgia Tech '26 · ex-Mailchimp design intern",
    "about": "Hybrid designer-developer who prototypes in code and validates with real users, with systems-level design experience from Mailchimp and two years of shipped nonprofit products through Bits of Good. Looking for an early-career product design role on a data-dense B2B or consumer product.",
    "domain": "Design",
    "skills": [
      "Figma",
      "Framer",
      "ProtoPie",
      "Webflow",
      "HTML/CSS",
      "After Effects",
      "Design tokens",
      "Usability testing"
    ],
    "experience": [
      {
        "title": "Product Design Intern",
        "company": "Mailchimp (Intuit)",
        "location": "Atlanta, GA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Redesigned campaign-analytics onboarding; moderated tests with 14 SMB customers lifted task completion 58%→86%",
          "Shipped 21 components into the Figma design system, reducing detached instances ~35% across two product squads"
        ]
      },
      {
        "title": "Design Lead",
        "company": "Bits of Good (Georgia Tech)",
        "location": "Atlanta, GA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Led end-to-end design for 2 nonprofit web apps now used by 1,200+ clients of Atlanta service orgs",
          "Ran 9 usability sessions and a quarterly design-crit program for 12 student designers"
        ]
      },
      {
        "title": "Undergraduate TA, LMC 3705 (Information Design)",
        "company": "Georgia Tech",
        "location": "Atlanta, GA",
        "start": "Jan 2025",
        "end": "May 2025",
        "bullets": [
          "Graded and gave written critique on 120+ student visualization projects",
          "Built a Figma starter-kit template adopted as the course default"
        ]
      }
    ],
    "projects": [
      {
        "name": "MARTA Companion",
        "description": "Accessibility-first real-time transit app concept; 32-participant study informed the final design, selected for the GT undergraduate design showcase."
      }
    ],
    "awards": [
      "Georgia Tech Undergraduate Design Showcase — selected work (2026)"
    ],
    "scores": {
      "overall": 78,
      "technical": 74,
      "execution": 80,
      "leadership": 77,
      "communication": 86,
      "trajectory": 81
    },
    "signals": [
      "Design-systems experience at a real product org (Mailchimp), not just coursework",
      "Validates with users by default — 23+ moderated sessions across roles"
    ],
    "status": "new",
    "appliedFor": "Product Designer, Early Career",
    "addedDaysAgo": 24,
    "avatarUrl": "/people/candidates/c37.jpg"
  },
  {
    "id": "c38",
    "name": "Zora Whitaker",
    "universityId": "umich",
    "degree": "BS",
    "major": "Information Science",
    "gradYear": 2027,
    "gpa": 3.81,
    "location": "Detroit, MI",
    "headline": "Aspiring PM · Info Sci @ Michigan '27 · StockX PM intern",
    "about": "Product-leaning builder who has shipped experiments at StockX and run student product teams through V1 Michigan. Strong on discovery, scrappy analytics, and writing PRDs engineers actually use. Aiming for an APM program with real ownership from day one.",
    "domain": "Product",
    "skills": [
      "SQL",
      "Amplitude",
      "Mixpanel",
      "Figma",
      "Jira",
      "A/B testing",
      "User interviews",
      "Notion"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "StockX",
        "location": "Detroit, MI",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Own discovery for seller-fee transparency; shipped first A/B test to 12% of traffic by week four",
          "Synthesized 18 seller interviews into a pricing-clarity opportunity brief adopted by the marketplace squad"
        ]
      },
      {
        "title": "Product Lead",
        "company": "V1 Michigan",
        "location": "Ann Arbor, MI",
        "start": "Jan 2025",
        "end": "Present",
        "bullets": [
          "Led a 6-person team running ProductLab, matching 110 students with 14 startups for project sprints",
          "Raised program NPS from 31 to 58 by redesigning matching criteria and adding mid-sprint check-ins"
        ]
      },
      {
        "title": "Product Intern",
        "company": "Autobooks",
        "location": "Detroit, MI",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Wrote PRDs for invoice-reminder flows that lifted on-time payments 9% post-launch",
          "Built the team's first funnel dashboard in Amplitude, replacing a weekly manual SQL pull"
        ]
      }
    ],
    "projects": [
      {
        "name": "WolverinePlanner",
        "description": "Degree-planning tool with ~2,100 MAU; defined the roadmap from 60 user interviews and led a 4-person student team to launch."
      }
    ],
    "coursework": [
      "Product Management (SI 339)",
      "Data Analysis",
      "UX Research Methods",
      "Intro Programming"
    ],
    "scores": {
      "overall": 82,
      "technical": 73,
      "execution": 84,
      "leadership": 88,
      "communication": 90,
      "trajectory": 87
    },
    "signals": [
      "Already runs real experiments on live marketplace traffic as an intern",
      "Repeatedly turns user research into shipped, measured changes"
    ],
    "watchouts": [
      "Technical depth is light relative to top APM peers — intro programming only"
    ],
    "status": "shortlisted",
    "appliedFor": "APM Program",
    "addedDaysAgo": 1,
    "avatarUrl": "/people/candidates/c38.jpg"
  },
  {
    "id": "c39",
    "name": "Devon Marshall",
    "universityId": "uw",
    "degree": "BS",
    "major": "Applied & Computational Mathematical Sciences",
    "gradYear": 2026,
    "location": "Seattle, WA",
    "headline": "Quant-curious · ACMS @ UW '26 · ex-Russell Investments risk intern",
    "about": "Math-first candidate building toward quantitative research, with risk-analytics internship experience and a habit of turning club projects into rigorous backtests. Strongest in probability and time-series work; still early on live-market experience. Seeking a new-grad quant research or risk seat with mentorship.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "pandas",
      "NumPy",
      "R",
      "SQL",
      "vectorbt",
      "Bloomberg Terminal",
      "LaTeX"
    ],
    "experience": [
      {
        "title": "Risk Analytics Intern",
        "company": "Russell Investments",
        "location": "Seattle, WA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Automated monthly factor-exposure reporting in Python, cutting prep time from ~3 days to 4 hours",
          "Backtested a low-volatility tilt across 1,200 funds and presented findings to the 8-person risk team"
        ]
      },
      {
        "title": "Head of Research",
        "company": "UW Quantitative Finance Club",
        "location": "Seattle, WA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Run a weekly research seminar for ~45 members; standardized a walk-forward validation template",
          "Built the club's vectorbt backtesting starter repo, used in 11 member projects this year"
        ]
      },
      {
        "title": "Grader, MATH 394 (Probability)",
        "company": "University of Washington",
        "location": "Seattle, WA",
        "start": "Sep 2023",
        "end": "Jun 2024",
        "bullets": [
          "Graded weekly problem sets for a 90-student probability course",
          "Wrote solution notes the instructor adopted for two subsequent quarters"
        ]
      }
    ],
    "projects": [
      {
        "name": "meanrev-lab",
        "description": "Pairs-trading backtest over 10 years of US equities; Sharpe 1.1 out-of-sample after transaction costs with walk-forward validation."
      }
    ],
    "coursework": [
      "Probability",
      "Stochastic Processes",
      "Real Analysis",
      "Numerical Linear Algebra",
      "Time Series Analysis"
    ],
    "awards": [
      "UW Datathon 2025 — finalist"
    ],
    "scores": {
      "overall": 69,
      "technical": 74,
      "execution": 67,
      "leadership": 66,
      "communication": 64,
      "trajectory": 76
    },
    "signals": [
      "Self-built backtesting rigor (walk-forward, cost-adjusted) unusual for club-level work",
      "Solid probability/analysis course base for a quant track"
    ],
    "watchouts": [
      "No prop-firm or buy-side internship yet — profile is club research plus one risk internship"
    ],
    "status": "new",
    "appliedFor": "Quantitative Researcher, New Grad",
    "addedDaysAgo": 14,
    "avatarUrl": "/people/candidates/c39.jpg"
  },
  {
    "id": "c40",
    "name": "Shreya Raghunathan",
    "universityId": "cornell",
    "degree": "BS",
    "major": "Electrical & Computer Engineering",
    "gradYear": 2028,
    "gpa": 3.58,
    "location": "Ithaca, NY",
    "headline": "Hardware · ECE @ Cornell '28 · Cornell Racing electronics, Moog intern",
    "about": "Hands-on ECE underclassman who learned hardware the project-team way: PCBs that had to pass FSAE tech inspection, not just simulation. First industry internship in progress at Moog on actuator test hardware. Looking for a hardware internship with board-level design and bring-up ownership.",
    "domain": "Hardware",
    "skills": [
      "Altium Designer",
      "KiCad",
      "STM32",
      "C",
      "SPICE simulation",
      "Oscilloscope & lab debug",
      "Python",
      "Soldering/rework"
    ],
    "experience": [
      {
        "title": "Hardware Engineering Intern",
        "company": "Moog Inc.",
        "location": "East Aurora, NY",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Bringing up test fixtures for actuator control boards on a flight-hardware program",
          "Wrote Python/SCPI automation for thermal-cycle testing, replacing a manual 6-hour logging procedure"
        ]
      },
      {
        "title": "Battery Management Subteam Member",
        "company": "Cornell Racing (FSAE)",
        "location": "Ithaca, NY",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Designed a 4-layer BMS cell-sense PCB in Altium for the 600V accumulator; passed tech inspection on the first attempt at FSAE Michigan",
          "Cut cell-voltage measurement error ~40% by redesigning the analog front end and grounding scheme"
        ]
      },
      {
        "title": "Lab Assistant, ECE 2100 (Intro Circuits)",
        "company": "Cornell University",
        "location": "Ithaca, NY",
        "start": "Jan 2026",
        "end": "May 2026",
        "bullets": [
          "Supported weekly labs for an 80-student intro circuits course",
          "Triaged and repaired 15+ malfunctioning bench setups over the semester"
        ]
      }
    ],
    "projects": [
      {
        "name": "STM32 Macropad",
        "description": "Open-source mechanical macropad: designed the PCB, wrote the C firmware (USB HID), and sold ~120 units on Tindie."
      }
    ],
    "coursework": [
      "Circuits",
      "Signals & Systems",
      "Embedded Systems",
      "Semiconductor Devices"
    ],
    "scores": {
      "overall": 66,
      "technical": 70,
      "execution": 68,
      "leadership": 62,
      "communication": 60,
      "trajectory": 74
    },
    "signals": [
      "Real board-level design that survived FSAE tech inspection as a sophomore",
      "Ships physical product end to end (PCB, firmware, small-batch sales)"
    ],
    "watchouts": [
      "Early in degree — core ECE coursework still in progress, one internship underway"
    ],
    "status": "new",
    "appliedFor": "Hardware Engineer Intern",
    "addedDaysAgo": 26,
    "avatarUrl": "/people/candidates/c40.jpg"
  },
  {
    "id": "c41",
    "name": "Mateo Salazar",
    "universityId": "utaustin",
    "degree": "BS",
    "major": "Computer Science (Turing Scholars)",
    "gradYear": 2026,
    "gpa": 3.96,
    "location": "Austin, TX",
    "headline": "Distributed systems & infra · CS (Turing) @ UT Austin '26 · ex-Stripe, ex-NVIDIA",
    "about": "Systems-focused engineer with production experience on Stripe's payments path and CUDA-level performance work at NVIDIA. Comfortable from kernel fusion up through distributed consensus, with a track record of shipping under load. Looking for a new-grad infrastructure role on a high-throughput backend or ML-systems team.",
    "domain": "Software",
    "skills": [
      "Go",
      "Rust",
      "C++",
      "CUDA",
      "Kubernetes",
      "gRPC",
      "PostgreSQL",
      "Kafka",
      "Terraform",
      "Linux internals"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "Stripe",
        "location": "San Francisco, CA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Shipped idempotency-key garbage collection for the payments API, reclaiming ~1.8 TB/month and cutting p99 write latency 22% on a 40K RPS path",
          "Migrated 31 endpoints of a Go service off a deprecated ORM with zero rollbacks across 6 staged deploys",
          "Authored load-shedding design doc adopted as the team standard for two adjacent services"
        ]
      },
      {
        "title": "Systems Software Intern",
        "company": "NVIDIA",
        "location": "Austin, TX",
        "start": "May 2024",
        "end": "Aug 2024",
        "bullets": [
          "Cut p95 inference latency 38% on T4 GPUs by fusing three CUDA preprocessing kernels in a cuDNN pipeline",
          "Built a nightly perf-regression harness that caught 11 regressions before they reached the release branch"
        ]
      },
      {
        "title": "Undergraduate TA, CS 439 Operating Systems",
        "company": "UT Austin",
        "location": "Austin, TX",
        "start": "Aug 2024",
        "end": "May 2026",
        "bullets": [
          "Led weekly sections of 45 students across 4 semesters of the Pintos-based OS course",
          "Rebuilt the project autograder, cutting grading turnaround from 5 days to 12 hours"
        ]
      }
    ],
    "projects": [
      {
        "name": "Raftling",
        "description": "Raft consensus implementation in Rust with Jepsen-style fault injection; passes 100% of linearizability checks across simulated 5-node clusters with partition and clock-skew nemeses."
      },
      {
        "name": "qmux",
        "description": "Userspace QUIC stream multiplexer in Go benchmarked at 2.1x throughput vs. naive per-stream TCP fallback on lossy links (3% loss)."
      }
    ],
    "awards": [
      "ICPC South Central USA Regional — 2nd place (2024)",
      "UT Austin Dean's Honor List (5 semesters)"
    ],
    "coursework": [
      "Operating Systems (Honors)",
      "Distributed Computing",
      "Compilers",
      "Parallel Architectures"
    ],
    "scores": {
      "overall": 95,
      "technical": 98,
      "execution": 96,
      "leadership": 87,
      "communication": 90,
      "trajectory": 97
    },
    "signals": [
      "Shipped production code on Stripe's 40K RPS payments path",
      "ICPC regional medalist with rare CUDA-to-consensus systems depth",
      "Autograder and perf-harness work shows force-multiplier instincts"
    ],
    "status": "advanced",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 3,
    "avatarUrl": "/people/candidates/c41.jpg"
  },
  {
    "id": "c42",
    "name": "Claire Donahue",
    "universityId": "columbia",
    "degree": "BS",
    "major": "Computer Science",
    "gradYear": 2026,
    "gpa": 3.85,
    "location": "New York, NY",
    "headline": "Full-stack & data infra · CS @ Columbia '26 · ex-Datadog, ex-Google STEP",
    "about": "Backend-leaning generalist who has shipped observability infrastructure at Datadog and developer tooling at Google. Strong communicator who has run a 400-student course staff. Targeting new-grad software roles on platform or data-infrastructure teams in NYC.",
    "domain": "Software",
    "skills": [
      "TypeScript",
      "React",
      "Go",
      "Python",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Terraform",
      "OpenTelemetry"
    ],
    "experience": [
      {
        "title": "Software Engineering Intern",
        "company": "Datadog",
        "location": "New York, NY",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Built a Kafka consumer-lag autoscaler for the logs intake pipeline, cutting peak backlog 63% across 200+ internal services",
          "Shipped OpenTelemetry span-sampling controls adopted by ~40 internal teams within a month of launch"
        ]
      },
      {
        "title": "STEP Intern",
        "company": "Google",
        "location": "New York, NY",
        "start": "Jun 2024",
        "end": "Aug 2024",
        "bullets": [
          "Built an internal flake-triage dashboard (Angular + Spanner) that surfaced the top 1% flakiest tests, used by 3 sister teams",
          "Reduced a CI presubmit suite's median runtime 27% by sharding and caching hermetic test targets"
        ]
      },
      {
        "title": "Head TA, COMS W3157 Advanced Programming",
        "company": "Columbia University",
        "location": "New York, NY",
        "start": "Jan 2024",
        "end": "May 2026",
        "bullets": [
          "Managed 18 TAs and office-hour operations for a 400-student systems course in C/C++",
          "Wrote 6 new lab assignments on sockets and HTTP servers still in use by the course"
        ]
      }
    ],
    "projects": [
      {
        "name": "Subwaylert",
        "description": "Real-time NYC subway delay notifier consuming the MTA GTFS-RT feed (Go + Postgres + push notifications); ~2,100 weekly active users at peak."
      }
    ],
    "awards": [
      "DivHacks 2024 — 1st place overall (of 90 teams)"
    ],
    "coursework": [
      "Advanced Programming",
      "Databases",
      "Distributed Systems",
      "Networks"
    ],
    "scores": {
      "overall": 89,
      "technical": 90,
      "execution": 91,
      "leadership": 85,
      "communication": 92,
      "trajectory": 90
    },
    "signals": [
      "Shipped infra adopted by 40+ teams at Datadog as an intern",
      "Ran an 18-TA staff for a 400-student systems course",
      "Side project sustained 2K+ weekly real users"
    ],
    "status": "shortlisted",
    "appliedFor": "Software Engineer, New Grad",
    "addedDaysAgo": 9,
    "avatarUrl": "/people/candidates/c42.jpg"
  },
  {
    "id": "c43",
    "name": "Andrés Villanueva",
    "universityId": "berkeley",
    "degree": "BS",
    "major": "Electrical Engineering & Computer Sciences",
    "gradYear": 2026,
    "gpa": 3.82,
    "location": "San Francisco, CA",
    "headline": "ML infra · EECS @ UC Berkeley '26 · ex-Databricks intern · BAIR research",
    "about": "ML systems engineer spanning production feature-store work at Databricks and inference-efficiency research at BAIR. Publishes and open-sources: a NeurIPS workshop paper and a Triton kernel library with real adoption. Seeking a new-grad role at the training/inference infrastructure layer.",
    "domain": "Data & ML",
    "skills": [
      "PyTorch",
      "Triton",
      "CUDA",
      "Spark",
      "Ray",
      "MLflow",
      "Python",
      "C++",
      "Kubernetes",
      "Weights & Biases"
    ],
    "experience": [
      {
        "title": "ML Engineering Intern",
        "company": "Databricks",
        "location": "San Francisco, CA",
        "start": "May 2025",
        "end": "Aug 2025",
        "bullets": [
          "Optimized feature-store point-in-time joins in Spark, cutting median training-data build time 44% across 300+ internal pipelines",
          "Shipped drift-detection alerting adopted by 25 customer-facing model serving endpoints"
        ]
      },
      {
        "title": "Undergraduate Researcher",
        "company": "Berkeley AI Research (BAIR)",
        "location": "Berkeley, CA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Co-authored NeurIPS 2025 ENLSP workshop paper on low-rank KV-cache compression: 2.3x decode throughput at <0.5% perplexity loss on Llama-3-8B",
          "Maintained the lab's 32-GPU SLURM eval harness; cut queue-to-result time roughly in half by batching tokenization and warm-starting checkpoints"
        ]
      },
      {
        "title": "Course Staff (TA), CS 189 Machine Learning",
        "company": "UC Berkeley",
        "location": "Berkeley, CA",
        "start": "Jan 2025",
        "end": "May 2025",
        "bullets": [
          "Held sections of 30+ and rewrote the kernel-methods problem set used by 700 students",
          "Rated 4.7/5.0 on end-of-term staff evaluations"
        ]
      }
    ],
    "projects": [
      {
        "name": "kvzip",
        "description": "Open-source Triton kernels for KV-cache compression (800+ GitHub stars); integrated by two external inference frameworks via plugin API."
      }
    ],
    "awards": [
      "NeurIPS 2025 ENLSP Workshop — co-author"
    ],
    "coursework": [
      "Deep Learning (CS 182)",
      "ML (CS 189)",
      "Systems for AI",
      "Convex Optimization"
    ],
    "scores": {
      "overall": 91,
      "technical": 95,
      "execution": 89,
      "leadership": 84,
      "communication": 86,
      "trajectory": 94
    },
    "signals": [
      "Shipped production ML at Databricks scale",
      "NeurIPS workshop co-author as an undergrad",
      "Open-source Triton kernels with 800+ stars and external adopters"
    ],
    "status": "new",
    "appliedFor": "ML Engineer, New Grad",
    "addedDaysAgo": 17,
    "avatarUrl": "/people/candidates/c43.jpg"
  },
  {
    "id": "c44",
    "name": "Lily Hartmann",
    "universityId": "stanford",
    "degree": "MS",
    "major": "Statistics",
    "gradYear": 2027,
    "gpa": 3.9,
    "location": "Stanford, CA",
    "headline": "Applied ML & geospatial data · Stats MS (coterm) @ Stanford '27 · climate ML",
    "about": "Statistician-turned-ML-practitioner working at the intersection of climate data and machine learning, with a startup data-science internship and lab research on satellite imagery. Strong on rigor and modeling, now seeking more production exposure. Interested in ML engineering or applied-science internships for 2027.",
    "domain": "Data & ML",
    "skills": [
      "Python",
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "dbt",
      "SQL",
      "GeoPandas",
      "Airflow"
    ],
    "experience": [
      {
        "title": "Data Science Intern",
        "company": "Watershed",
        "location": "San Francisco, CA",
        "start": "Jun 2025",
        "end": "Sep 2025",
        "bullets": [
          "Built an emissions-factor entity-resolution pipeline (Python + dbt) that raised auto-match rate from 71% to 93% across 1.2M supplier records",
          "Designed sampling-based QA that caught mismatches at 4x the rate of the prior manual spot-check process"
        ]
      },
      {
        "title": "Research Assistant",
        "company": "Stanford Sustainability & AI Lab",
        "location": "Stanford, CA",
        "start": "Jan 2025",
        "end": "Present",
        "bullets": [
          "Trained U-Net segmentation models on Sentinel-2 imagery to map irrigated cropland; improved IoU from 0.74 baseline to 0.81",
          "Presented results as an AGU 2025 poster; dataset pipeline reused by two other lab projects"
        ]
      },
      {
        "title": "Section Leader, CS 106B",
        "company": "Stanford University",
        "location": "Stanford, CA",
        "start": "Sep 2024",
        "end": "Jun 2025",
        "bullets": [
          "Taught weekly sections of 12 students across 3 quarters; rated 4.8/5.0",
          "Graded and gave line-level feedback on ~450 C++ assignments"
        ]
      }
    ],
    "projects": [
      {
        "name": "wildfire-nowcast",
        "description": "XGBoost model on GOES satellite features predicting next-12h fire spread; placed 12th of 480 (top 3%) in a DrivenData challenge."
      }
    ],
    "coursework": [
      "Statistical Learning (STATS 315)",
      "Deep Learning (CS 230)",
      "Spatial Statistics",
      "Causal Inference"
    ],
    "scores": {
      "overall": 80,
      "technical": 84,
      "execution": 77,
      "leadership": 74,
      "communication": 82,
      "trajectory": 86
    },
    "signals": [
      "Top-3% finish in a competitive geospatial ML challenge",
      "Raised a production matching pipeline from 71% to 93% as an intern"
    ],
    "watchouts": [
      "Research-heavy profile — limited production engineering experience so far"
    ],
    "status": "new",
    "appliedFor": "ML Engineer Intern",
    "addedDaysAgo": 6,
    "avatarUrl": "/people/candidates/c44.jpg"
  },
  {
    "id": "c45",
    "name": "Nico Esparza",
    "universityId": "mit",
    "degree": "BS",
    "major": "Art and Design (Course 4-B)",
    "gradYear": 2027,
    "location": "San Francisco, CA",
    "headline": "Product design + creative code · Art & Design @ MIT '27 · Media Lab UROP · Grammarly intern",
    "about": "Designer who prototypes in code, with Media Lab research on haptic interfaces and a current product-design internship at Grammarly. Comfortable running usability studies and shipping the resulting changes personally. Looking for early-career product design roles where engineering fluency matters.",
    "domain": "Design",
    "skills": [
      "Figma",
      "Framer",
      "p5.js",
      "React",
      "After Effects",
      "Blender",
      "Design systems",
      "Usability testing"
    ],
    "experience": [
      {
        "title": "Product Design Intern",
        "company": "Grammarly",
        "location": "San Francisco, CA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Redesigning the tone-rewrite onboarding flow; shipped first A/B variant in week 2 of the internship",
          "Audited 60+ empty-state screens and proposed a consolidated pattern adopted into the design system backlog"
        ]
      },
      {
        "title": "UROP Researcher, Fluid Interfaces",
        "company": "MIT Media Lab",
        "location": "Cambridge, MA",
        "start": "Sep 2025",
        "end": "May 2026",
        "bullets": [
          "Prototyped a haptic wearable UI (Figma + Arduino) and ran an 18-participant usability study; task completion improved 31% over the baseline interface",
          "Built the study's web-based stimulus player in p5.js, reused by two follow-on experiments"
        ]
      },
      {
        "title": "Design Lead",
        "company": "HackMIT",
        "location": "Cambridge, MA",
        "start": "Feb 2025",
        "end": "Oct 2025",
        "bullets": [
          "Led a 4-person team on the HackMIT 2025 rebrand; site served 12K unique visitors and applications rose 19% YoY",
          "Produced the full event design kit — signage, badges, motion idents — on a 6-week timeline"
        ]
      }
    ],
    "projects": [
      {
        "name": "type-tides",
        "description": "Generative typography tool in p5.js where letterforms deform with live tide data; featured in an MIT creative-coding showcase, ~30K views online."
      },
      {
        "name": "Crit",
        "description": "Mobile-first app for structured design feedback (Figma plugin + React Native prototype) used by 70 students across two MIT studio courses."
      }
    ],
    "coursework": [
      "Interaction Design Studio",
      "Information Visualization",
      "Intro to Computational Design"
    ],
    "scores": {
      "overall": 78,
      "technical": 74,
      "execution": 76,
      "leadership": 80,
      "communication": 85,
      "trajectory": 83
    },
    "signals": [
      "Rare designer-who-codes profile (p5.js, React, Arduino)",
      "Ran an 18-participant usability study end to end as a sophomore"
    ],
    "watchouts": [
      "Portfolio skews experimental/creative-code — limited shipped product surface area so far"
    ],
    "status": "new",
    "appliedFor": "Product Designer, Early Career",
    "addedDaysAgo": 23,
    "avatarUrl": "/people/candidates/c45.jpg"
  },
  {
    "id": "c46",
    "name": "Hannah Voss",
    "universityId": "cmu",
    "degree": "BS",
    "major": "Information Systems (HCI minor)",
    "gradYear": 2027,
    "gpa": 3.72,
    "location": "Pittsburgh, PA",
    "headline": "Product · Information Systems @ CMU '27 · PM intern @ Duolingo",
    "about": "Product-minded builder currently PM-interning at Duolingo after a healthcare-AI startup internship at Abridge. Co-founded CMU's product club and grew it to 180 members in three semesters. Targeting APM programs with a consumer or edtech bent.",
    "domain": "Product",
    "skills": [
      "SQL",
      "Amplitude",
      "Figma",
      "A/B experiment design",
      "Python (pandas)",
      "Looker",
      "Jira"
    ],
    "experience": [
      {
        "title": "Product Management Intern",
        "company": "Duolingo",
        "location": "Pittsburgh, PA",
        "start": "May 2026",
        "end": "Present",
        "bullets": [
          "Owning the experiment backlog for streak-repair flows; first shipped test lifted D7 retention +0.6pp on a 2M-DAU surface",
          "Wrote the instrumentation spec that unified three conflicting streak-event definitions across clients"
        ]
      },
      {
        "title": "Product Intern",
        "company": "Abridge",
        "location": "Pittsburgh, PA",
        "start": "Jun 2025",
        "end": "Aug 2025",
        "bullets": [
          "Wrote the PRD and ran the beta for a clinician note-template editor; 120 pilot clinicians reached 68% weekly active usage",
          "Synthesized 25 clinician interviews into a prioritized friction map that drove the Q3 roadmap's top two items"
        ]
      },
      {
        "title": "Co-Founder & President",
        "company": "CMU Product Club",
        "location": "Pittsburgh, PA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Grew the club from 0 to 180 members in 3 semesters; ran 6 case-competition nights judged by Google and Figma PMs",
          "Placed 2nd of 40 teams at the CMU x McKinsey product case competition (2025)"
        ]
      }
    ],
    "projects": [
      {
        "name": "CourseCompass",
        "description": "Schedule-planning web app cross-referencing CMU course evals, prereqs, and seat data; 1,400 student users during Spring 2026 registration."
      }
    ],
    "awards": [
      "CMU x McKinsey Product Case Competition — 2nd of 40 teams"
    ],
    "coursework": [
      "A/B Testing & Experimentation",
      "HCI Methods",
      "Database Systems",
      "Managerial Economics"
    ],
    "scores": {
      "overall": 81,
      "technical": 73,
      "execution": 83,
      "leadership": 87,
      "communication": 88,
      "trajectory": 85
    },
    "signals": [
      "Already shipped a retention win on a 2M-DAU surface as an intern",
      "Founded and scaled a 180-member product org from scratch",
      "Healthcare + consumer breadth unusual at this stage"
    ],
    "status": "shortlisted",
    "appliedFor": "APM Program",
    "addedDaysAgo": 1,
    "avatarUrl": "/people/candidates/c46.jpg"
  },
  {
    "id": "c47",
    "name": "Connor McAllister",
    "universityId": "harvard",
    "degree": "BS",
    "major": "Applied Mathematics",
    "gradYear": 2027,
    "location": "Boston, MA",
    "headline": "Quant-curious · Applied Math @ Harvard '27 · investment club PM · RIA summer intern",
    "about": "Applied-math student building toward quantitative research via factor-replication RA work, a student-fund analyst seat, and a first buy-side internship at a Boston RIA. Math fundamentals are ahead of markets experience, and the gap is closing fast. Seeking a quantitative research or trading internship for 2027.",
    "domain": "Quant & Finance",
    "skills": [
      "Python",
      "pandas",
      "NumPy",
      "R",
      "SQL",
      "Excel/VBA",
      "Bloomberg Terminal (basic)"
    ],
    "experience": [
      {
        "title": "Investment Intern",
        "company": "Crestwood Advisors",
        "location": "Boston, MA",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Built a Python/Excel screener ranking ~600 mid-caps on quality and momentum factors; 3 names added to the firm's coverage list",
          "Automated a weekly holdings-attribution report, cutting prep time from 4 hours to 20 minutes"
        ]
      },
      {
        "title": "Research Assistant",
        "company": "Harvard Department of Economics",
        "location": "Cambridge, MA",
        "start": "Sep 2025",
        "end": "May 2026",
        "bullets": [
          "Cleaned and merged 40 years of CRSP/Compustat data for a momentum-factor study",
          "Replicated published factor returns to within 5bps annualized, surfacing one data-vintage discrepancy in the original code"
        ]
      },
      {
        "title": "Analyst, then Portfolio Manager",
        "company": "Harvard Undergraduate Capital Partners",
        "location": "Cambridge, MA",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Pitched 7 long theses; paper book returned +9.4% vs. SPX +6.1% over calendar 2025",
          "Built the club's backtest template (pandas) now used by all 12 analysts"
        ]
      }
    ],
    "projects": [
      {
        "name": "kalman-pairs",
        "description": "Pairs-trading backtest using Kalman-filter hedge ratios on 10 years of US equity data; Sharpe 1.1 after transaction costs, with an honest out-of-sample decay writeup."
      }
    ],
    "awards": [
      "Putnam 2025 — score 21 (top ~15% nationally)"
    ],
    "coursework": [
      "Probability (Stat 110)",
      "Stochastic Processes",
      "Linear Algebra",
      "Econometrics",
      "CS50"
    ],
    "scores": {
      "overall": 70,
      "technical": 74,
      "execution": 68,
      "leadership": 66,
      "communication": 72,
      "trajectory": 78
    },
    "signals": [
      "Replicated academic factor returns to within 5bps as an RA",
      "Putnam top-15% signals real mathematical horsepower"
    ],
    "watchouts": [
      "No quant-firm experience yet — markets exposure is club- and RIA-level"
    ],
    "status": "new",
    "appliedFor": "Quantitative Research Intern",
    "addedDaysAgo": 27,
    "avatarUrl": "/people/candidates/c47.jpg"
  },
  {
    "id": "c48",
    "name": "Camila Reyes-Fuentes",
    "universityId": "princeton",
    "degree": "BS",
    "major": "Electrical & Computer Engineering",
    "gradYear": 2027,
    "gpa": 3.55,
    "location": "Princeton, NJ",
    "headline": "Embedded & board design · ECE @ Princeton '27 · FSAE EV electronics · PPPL intern",
    "about": "Hands-on hardware engineer whose strongest work is bringing up real boards: a CAN-bus battery-monitoring node for Princeton's FSAE EV car and a signal-conditioning PCB now in bench test at PPPL. Equally comfortable in KiCad, Embedded C, and behind an oscilloscope. Seeking a hardware or embedded internship for 2027.",
    "domain": "Hardware",
    "skills": [
      "KiCad",
      "Altium (basic)",
      "Embedded C",
      "STM32",
      "CAN bus",
      "Verilog",
      "Oscilloscope/logic analyzer debug",
      "Python",
      "SolidWorks (basic)"
    ],
    "experience": [
      {
        "title": "Hardware Engineering Intern",
        "company": "Princeton Plasma Physics Laboratory (PPPL)",
        "location": "Princeton, NJ",
        "start": "Jun 2026",
        "end": "Present",
        "bullets": [
          "Designing a 4-layer signal-conditioning board in KiCad for a diagnostic sensor array; first revision passed initial EMI bench testing",
          "Wrote the board's STM32 acquisition firmware sampling 8 channels at 50 kS/s with CRC-checked UART telemetry"
        ]
      },
      {
        "title": "Electronics Subteam Member",
        "company": "Princeton Racing Electric (FSAE EV)",
        "location": "Princeton, NJ",
        "start": "Sep 2024",
        "end": "Present",
        "bullets": [
          "Designed and brought up a CAN-bus battery-monitoring node (STM32), cutting cell-voltage telemetry dropout from 8% to under 1% at competition",
          "Car placed 11th of 70 entries at FSAE Electric 2026; led the accumulator wiring re-harness that passed tech inspection on the first attempt"
        ]
      },
      {
        "title": "Grader, ELE 206 Digital Logic",
        "company": "Princeton University",
        "location": "Princeton, NJ",
        "start": "Sep 2025",
        "end": "Jan 2026",
        "bullets": [
          "Graded Verilog labs for ~120 students and held weekly debugging office hours",
          "Wrote a common-mistakes guide on blocking vs. non-blocking assignments adopted into the course materials"
        ]
      }
    ],
    "projects": [
      {
        "name": "pocket-scope",
        "description": "DIY two-channel 1 MS/s oscilloscope (STM32 + custom analog front-end, KiCad); full build writeup featured on Hackaday.io with ~5K reads."
      }
    ],
    "coursework": [
      "Digital Logic Design",
      "Circuits & Systems",
      "Embedded Systems",
      "Electromagnetics"
    ],
    "scores": {
      "overall": 67,
      "technical": 71,
      "execution": 66,
      "leadership": 63,
      "communication": 64,
      "trajectory": 75
    },
    "signals": [
      "Real board bring-up experience: PCB design through firmware and EMI test",
      "Measurable hardware win at FSAE competition (telemetry dropout 8% to <1%)"
    ],
    "watchouts": [
      "Early-stage profile — strongest work is club-based; first industry internship currently in progress"
    ],
    "status": "new",
    "appliedFor": "Hardware Engineer Intern",
    "addedDaysAgo": 12,
    "avatarUrl": "/people/candidates/c48.jpg"
  }
];

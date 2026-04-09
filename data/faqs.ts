export type FaqCategory =
  | "Admissions"
  | "Fees"
  | "Courses"
  | "Exams"
  | "Hostel"
  | "Placements"
  | "Library";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  keywords: string[];
};

export const CONTACT_FALLBACK =
  "I could not find a specific answer. Please check the official SRMCEM website at https://srmcem.ac.in/ or contact the admission office through the website contact page.";

export const FAQS: FaqItem[] = [
  {
    id: "adm-1",
    category: "Admissions",
    question: "When does the admission process begin?",
    answer:
      "Admissions generally open before the academic session and continue as per seat availability and counseling schedule.",
    keywords: ["admission", "start", "date", "apply", "opening", "session"],
  },
  {
    id: "adm-2",
    category: "Admissions",
    question: "What are the eligibility criteria for B.Tech?",
    answer:
      "For B.Tech, candidates need 10+2 with Physics, Chemistry, and Mathematics with minimum 60% aggregate.",
    keywords: ["eligibility", "btech", "criteria", "pcm", "percentage"],
  },
  {
    id: "adm-3",
    category: "Admissions",
    question: "Is there an entrance exam for admission?",
    answer:
      "Yes. B.Tech admissions are based on JEE Main score, while MBA admissions consider CAT/MAT scores.",
    keywords: ["entrance", "jee", "cat", "mat", "exam", "admission test"],
  },
  {
    id: "adm-4",
    category: "Admissions",
    question: "Can I apply online?",
    answer:
      "Yes, applications can be submitted through the college admission portal with online document upload and fee payment.",
    keywords: ["online", "apply", "portal", "form", "registration"],
  },
  {
    id: "adm-5",
    category: "Admissions",
    question: "Which documents are required for admission?",
    answer:
      "Common documents include mark sheets, transfer certificate, ID proof, passport-size photos, and category certificate if applicable.",
    keywords: ["documents", "required", "certificate", "id proof", "marksheet"],
  },
  {
    id: "adm-6",
    category: "Admissions",
    question: "Is lateral entry available?",
    answer:
      "Yes, lateral entry is available for diploma holders in selected engineering branches based on merit.",
    keywords: ["lateral", "entry", "diploma", "engineering", "branch"],
  },
  {
    id: "adm-7",
    category: "Admissions",
    question: "Are scholarships available for new students?",
    answer:
      "Merit-based and need-based scholarships are available. Students can apply during admission with supporting documents.",
    keywords: ["scholarship", "new", "student", "merit", "need"],
  },
  {
    id: "fee-1",
    category: "Fees",
    question: "What is the annual tuition fee for B.Tech?",
    answer:
      "The annual B.Tech tuition fee is approximately INR 1,25,000, excluding hostel and exam charges.",
    keywords: ["tuition", "annual", "btech", "fee", "cost"],
  },
  {
    id: "fee-2",
    category: "Fees",
    question: "Can fees be paid in installments?",
    answer:
      "Yes, the college allows semester-wise or installment-based payment as per finance office guidelines.",
    keywords: ["installment", "semester", "payment", "fees"],
  },
  {
    id: "fee-3",
    category: "Fees",
    question: "What payment modes are accepted?",
    answer:
      "UPI, net banking, debit card, and demand draft are accepted through the official payment gateway.",
    keywords: ["payment mode", "upi", "net banking", "card", "dd"],
  },
  {
    id: "fee-4",
    category: "Fees",
    question: "Is there a refund policy for admission cancellation?",
    answer:
      "Yes. Refunds are processed as per UGC norms after deducting applicable administrative charges.",
    keywords: ["refund", "cancellation", "ugc", "policy"],
  },
  {
    id: "fee-5",
    category: "Fees",
    question: "Are there any additional charges apart from tuition?",
    answer:
      "Additional charges may include exam fee, lab fee, library deposit, and student activity fee.",
    keywords: ["additional", "charges", "lab", "exam", "deposit"],
  },
  {
    id: "fee-6",
    category: "Fees",
    question: "How much is the hostel fee per year?",
    answer:
      "Hostel fee ranges from INR 75,000 to INR 1,10,000 per year depending on room type and facilities.",
    keywords: ["hostel fee", "yearly", "room type", "accommodation cost"],
  },
  {
    id: "fee-7",
    category: "Fees",
    question: "Do scholarship students get fee concessions?",
    answer:
      "Yes, scholarship-approved students receive tuition concessions based on scholarship scheme terms.",
    keywords: ["concession", "scholarship", "discount", "fee waiver"],
  },
  {
    id: "course-1",
    category: "Courses",
    question: "Which undergraduate programs are offered?",
    answer:
      "SRMCEM offers programs across Engineering, Computer Application, Pharmacy, Management, and Commerce streams.",
    keywords: ["undergraduate", "ug", "programs", "btech", "bba", "bca"],
  },
  {
    id: "course-2",
    category: "Courses",
    question: "Which postgraduate programs are available?",
    answer:
      "Postgraduate programs include M.Tech, MBA, MCA, and M.Com, subject to seat availability.",
    keywords: ["postgraduate", "pg", "mtech", "mba", "mca"],
  },
  {
    id: "course-3",
    category: "Courses",
    question: "How long is the B.Tech course duration?",
    answer: "B.Tech is a 4-year full-time program divided into 8 semesters.",
    keywords: ["duration", "btech", "semesters", "years"],
  },
  {
    id: "course-4",
    category: "Courses",
    question: "Does the college offer elective subjects?",
    answer:
      "Yes, elective subjects are offered from the third year onward depending on department curriculum.",
    keywords: ["elective", "subjects", "curriculum", "third year"],
  },
  {
    id: "course-5",
    category: "Courses",
    question: "Are internships part of the curriculum?",
    answer:
      "Yes, most professional programs include mandatory internships or industry training in final years.",
    keywords: ["internship", "training", "mandatory", "industry"],
  },
  {
    id: "course-6",
    category: "Courses",
    question: "Is there any bridge course for first-year students?",
    answer:
      "Yes, bridge courses in mathematics, programming, and communication are provided for first-year students.",
    keywords: ["bridge course", "first year", "maths", "programming"],
  },
  {
    id: "course-7",
    category: "Courses",
    question: "Can students change branch after first year?",
    answer:
      "Branch change is allowed in limited cases based on first-year CGPA, seat availability, and policy rules.",
    keywords: ["branch change", "cgpa", "policy", "seat"],
  },
  {
    id: "exam-1",
    category: "Exams",
    question: "How are internal marks calculated?",
    answer:
      "Internal marks are based on class tests, assignments, attendance, and practical performance.",
    keywords: ["internal", "marks", "attendance", "assignment", "test"],
  },
  {
    id: "exam-2",
    category: "Exams",
    question: "What is the passing criteria?",
    answer:
      "Students must secure at least 40% in theory and practical components, and meet minimum overall score.",
    keywords: ["passing", "criteria", "minimum marks", "pass"],
  },
  {
    id: "exam-3",
    category: "Exams",
    question: "When are semester exams conducted?",
    answer:
      "Odd semester exams are usually in November-December and even semester exams in April-May.",
    keywords: ["semester exam", "schedule", "odd", "even", "date"],
  },
  {
    id: "exam-4",
    category: "Exams",
    question: "Can I apply for revaluation?",
    answer:
      "Yes, students can apply for revaluation within the declared deadline by paying the prescribed fee.",
    keywords: ["revaluation", "recheck", "deadline", "exam form"],
  },
  {
    id: "exam-5",
    category: "Exams",
    question: "What happens if I fail in a subject?",
    answer:
      "You can appear in supplementary/backlog exams as per the academic calendar and university rules.",
    keywords: ["fail", "backlog", "supplementary", "arrear"],
  },
  {
    id: "exam-6",
    category: "Exams",
    question: "How can I download admit card?",
    answer:
      "Admit cards are available on the student portal under the examination section before exams.",
    keywords: ["admit card", "download", "portal", "hall ticket"],
  },
  {
    id: "exam-7",
    category: "Exams",
    question: "How is CGPA calculated?",
    answer:
      "CGPA is calculated from semester grade points using the credit-weighted average formula.",
    keywords: ["cgpa", "calculate", "grade point", "credit"],
  },
  {
    id: "hostel-1",
    category: "Hostel",
    question: "Is hostel facility available for both boys and girls?",
    answer:
      "Yes, separate hostel blocks are available for boys and girls with dedicated wardens.",
    keywords: ["boys hostel", "girls hostel", "separate", "facility"],
  },
  {
    id: "hostel-2",
    category: "Hostel",
    question: "What room types are available in hostel?",
    answer:
      "Single, double, and triple occupancy rooms are offered, subject to availability.",
    keywords: ["room type", "single", "double", "triple", "occupancy"],
  },
  {
    id: "hostel-3",
    category: "Hostel",
    question: "Does hostel provide mess facility?",
    answer:
      "Yes, vegetarian and non-vegetarian meal options are available in the hostel mess.",
    keywords: ["mess", "food", "meal", "veg", "non veg"],
  },
  {
    id: "hostel-4",
    category: "Hostel",
    question: "What are the hostel timings?",
    answer:
      "Hostel entry timing is generally 8:30 PM on weekdays and 9:30 PM on weekends, as per warden policy.",
    keywords: ["timings", "curfew", "entry", "weekend"],
  },
  {
    id: "hostel-5",
    category: "Hostel",
    question: "Is Wi-Fi available in hostel?",
    answer:
      "Yes, campus-wide high-speed Wi-Fi is available in hostel rooms and common areas.",
    keywords: ["wifi", "internet", "hostel room", "network"],
  },
  {
    id: "hostel-6",
    category: "Hostel",
    question: "How can I apply for hostel accommodation?",
    answer:
      "Hostel applications can be submitted online after admission confirmation, on first-come-first-served basis.",
    keywords: ["apply hostel", "accommodation", "allotment", "online form"],
  },
  {
    id: "hostel-7",
    category: "Hostel",
    question: "Is medical support available in hostel?",
    answer:
      "Yes, basic medical support and emergency tie-ups with nearby hospitals are available.",
    keywords: ["medical", "emergency", "health", "doctor"],
  },
  {
    id: "place-1",
    category: "Placements",
    question: "What is the average placement package?",
    answer:
      "Placement outcomes vary by branch and year; SRMCEM reports strong placement support and industry opportunities through its placement cell.",
    keywords: ["average package", "lpa", "salary", "placement"],
  },
  {
    id: "place-2",
    category: "Placements",
    question: "What is the highest package offered recently?",
    answer:
      "The highest package in recent placement season was around INR 16 LPA for select roles.",
    keywords: ["highest package", "maximum salary", "placement record"],
  },
  {
    id: "place-3",
    category: "Placements",
    question: "Which companies visit the campus?",
    answer:
      "A wide range of recruiters and corporates participate in campus drives. The exact list changes each season.",
    keywords: ["companies", "recruiters", "campus drive", "tcs", "infosys"],
  },
  {
    id: "place-4",
    category: "Placements",
    question: "Is placement training provided?",
    answer:
      "Yes, aptitude training, mock interviews, coding practice, and resume workshops are conducted.",
    keywords: ["training", "mock interview", "aptitude", "resume"],
  },
  {
    id: "place-5",
    category: "Placements",
    question: "Are internships offered through placement cell?",
    answer:
      "Yes, the placement cell coordinates paid and unpaid internships with partner companies.",
    keywords: ["internship", "placement cell", "partner companies"],
  },
  {
    id: "place-6",
    category: "Placements",
    question: "Who is eligible for campus placements?",
    answer:
      "Final-year students with minimum CGPA and no active backlogs are typically eligible.",
    keywords: ["eligibility placement", "final year", "backlog", "cgpa"],
  },
  {
    id: "place-7",
    category: "Placements",
    question: "How can alumni help with placements?",
    answer:
      "Alumni support through mentorship, referrals, and guest sessions that improve career readiness.",
    keywords: ["alumni", "referral", "mentorship", "career support"],
  },
  {
    id: "lib-1",
    category: "Library",
    question: "What are the library working hours?",
    answer:
      "The central library is open from 8:00 AM to 8:00 PM on weekdays and 9:00 AM to 4:00 PM on Saturdays.",
    keywords: ["library hours", "timing", "open", "weekdays"],
  },
  {
    id: "lib-2",
    category: "Library",
    question: "How many books can a student borrow?",
    answer:
      "UG students can issue up to 3 books, while PG students can issue up to 5 books at a time.",
    keywords: ["borrow", "issue books", "limit", "students"],
  },
  {
    id: "lib-3",
    category: "Library",
    question: "Is digital library access available?",
    answer:
      "Yes, students get access to digital resources including e-journals, e-books, and research databases.",
    keywords: ["digital library", "ebooks", "ejournals", "database"],
  },
  {
    id: "lib-4",
    category: "Library",
    question: "Is there a late fine for overdue books?",
    answer:
      "Yes, overdue books attract a per-day fine as per library rules displayed on the portal.",
    keywords: ["late fine", "overdue", "penalty", "book return"],
  },
  {
    id: "lib-5",
    category: "Library",
    question: "Can I reserve books online?",
    answer:
      "Yes, you can reserve books through the library management portal using your student login.",
    keywords: ["reserve", "online", "library portal", "book booking"],
  },
  {
    id: "lib-6",
    category: "Library",
    question: "Does the library have study spaces?",
    answer:
      "Yes, quiet reading halls, discussion tables, and computer terminals are available.",
    keywords: ["study space", "reading hall", "discussion", "computer"],
  },
  {
    id: "lib-7",
    category: "Library",
    question: "How can I get a library card?",
    answer:
      "Library cards are auto-generated after admission and can be collected from the circulation desk.",
    keywords: ["library card", "circulation desk", "collect", "id"],
  },
];

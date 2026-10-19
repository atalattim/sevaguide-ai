export interface ServiceData {
  id: string;
  name: string;
  nameKn: string;
  slug: string;
  description: { en: string; kn: string };
  state: "Karnataka" | "Central";
  department: string;
  category: "certificates" | "education" | "schemes" | "revenue" | "transport" | "health" | "employment" | "identity" | "agriculture";
  mode: string;
  processingTime: string;
  fee: string;
  validity: string;
  eligibility: { en: string[]; kn: string[] };
  documents: { en: string[]; kn: string[] };
  applicationSteps: { en: string[]; kn: string[] };
  commonMistakes: { en: string[]; kn: string[] };
  fees: { en: string; kn: string };
  processingInfo: { en: string; kn: string };
  officialUrl: string;
  sourceUrl: string;
  language: string;
  lastVerifiedAt: string;
  status: "VERIFIED" | "NEEDS_VERIFICATION" | "DEMO";
  iconName: string;
}

export const ALL_SERVICES: ServiceData[] = [
  {
    id: "svc-income-cert",
    name: "Income Certificate",
    nameKn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
    slug: "income-certificate",
    description: {
      en: "Official legal certificate declaring the annual gross income of a family from all sources, essential for fee concessions, scholarships, and Karnataka welfare schemes.",
      kn: "ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಒಟ್ಟು ಆದಾಯವನ್ನು ದೃಢೀಕರಿಸುವ ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ. ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶೈಕ್ಷಣಿಕ ಶುಲ್ಕ ರಿಯಾಯಿತಿ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಇದು ಅತ್ಯಗತ್ಯ."
    },
    state: "Karnataka",
    department: "Revenue Department (Nadakacheri / Atalji Janasnehi Kendra)",
    category: "certificates",
    mode: "Online (Nadakacheri / Seva Sindhu / Grama One)",
    processingTime: "7 - 14 Working Days",
    fee: "₹40 Service charge",
    validity: "5 Years",
    eligibility: {
      en: [
        "Applicant or family must be permanent residents of Karnataka.",
        "Must declare verified income from all family sources (agriculture, salary, business).",
        "Valid for individuals needing income proof for educational concessions or state welfare."
      ],
      kn: [
        "ಅರ್ಜಿದಾರರು ಅಥವಾ ಕುಟುಂಬ ಕರ್ನಾಟಕದ ಖಾಯಂ ನಿವಾಸಿಗಳಾಗಿರಬೇಕು.",
        "ಎಲ್ಲಾ ಮೂಲಗಳ (ಕೃಷಿ, ವೇತನ, ವ್ಯಾಪಾರ) ಕುಟುಂಬದ ಆದಾಯವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಮೂದಿಸಬೇಕು.",
        "ಶಿಕ್ಷಣ ಶುಲ್ಕ ರಿಯಾಯಿತಿ ಅಥವಾ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಿಗೆ ಆದಾಯ ಪುರಾವೆ ಅಗತ್ಯವಿರುವವರಿಗೆ ಮಾನ್ಯ."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card of Applicant & Family Head",
        "Ration Card or Voter ID (Address Proof)",
        "Salary Slip / Form 16 or Self-declaration Affidavit",
        "Recent Passport Size Photograph",
        "Active Mobile Number linked with Aadhaar"
      ],
      kn: [
        "ಅರ್ಜಿದಾರ ಮತ್ತು ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್) ಅಥವಾ ವೋಟರ್ ಐಡಿ",
        "ವೇತನ ಚೀಟಿ / ಫಾರ್ಮ್ 16 ಅಥವಾ ಸ್ವಯಂ ಘೋಷಣಾ ಪ್ರಮಾಣಪತ್ರ",
        "ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ",
        "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
      ]
    },
    applicationSteps: {
      en: [
        "Visit the official Nadakacheri or Seva Sindhu Karnataka portal.",
        "Login with your mobile number via OTP verification.",
        "Select 'Apply Online' -> 'Revenue Department' -> 'Income Certificate'.",
        "Enter Applicant Details, Aadhaar Number, and Village/Taluk jurisdiction.",
        "Upload scanned supporting proofs (Identity, Address, and Income declaration).",
        "Make online payment of ₹40 fee via UPI, Net Banking, or Debit Card.",
        "Download acknowledgment slip with 15-digit GSC tracking number.",
        "Track status online and download digitally signed certificate once Revenue Inspector approves."
      ],
      kn: [
        "ಅಧಿಕೃತ ನಾಡಕಚೇರಿ ಅಥವಾ ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",
        "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಒಟಿಪಿ ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ.",
        "'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ' -> 'ಕಂದಾಯ ಇಲಾಖೆ' -> 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ' ಆಯ್ಕೆಮಾಡಿ.",
        "ಅರ್ಜಿದಾರರ ವಿವರ, ಆಧಾರ್ ಸಂಖ್ಯೆ, ಮತ್ತು ತಾಲೂಕು/ಗ್ರಾಮ ವ್ಯಾಪ್ತಿಯನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
        "ದಾಖಲೆಗಳನ್ನು (ಗುರುತು, ವಿಳಾಸ, ಆದಾಯ ದೃಢೀಕರಣ) ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        "₹40 ಶುಲ್ಕವನ್ನು ಯುಪಿಐ ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ಪಾವತಿಸಿ.",
        "15 ಅಂಕಿಯ GSC ರಶೀದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಸಂಗ್ರಹಿಸಿ.",
        "ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆಯ ನಂತರ ಡಿಜಿಟಲ್ ಸಹಿ ಹೊಂದಿದ ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Mismatched name between Aadhaar Card and Ration Card causing field rejection.",
        "Uploading blurry or illegible scanned document images.",
        "Providing incomplete family member details in declaration.",
        "Submitting at a different taluk jurisdictional counter."
      ],
      kn: [
        "ಆಧಾರ್ ಮತ್ತು ರೇಷನ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಹೆಸರಿನ ಕಾಗುಣಿತ ವ್ಯತ್ಯಾಸವಿರುವುದು.",
        "ಅಸ್ಪಷ್ಟ ಅಥವಾ ಓದಲಾಗದ ದಾಖಲೆಗಳ ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದು.",
        "ಕುಟುಂಬದ ಎಲ್ಲಾ ಸದಸ್ಯರ ವಿವರ ನಮೂದಿಸದೇ ಇರುವುದು."
      ]
    },
    fees: { en: "₹40 standard service facilitation fee.", kn: "₹40 ಅಧಿಕೃತ ಸೇವಾ ಶುಲ್ಕ." },
    processingInfo: { en: "Standard statutory processing takes 7 to 14 days following Village Accountant/RI field verification.", kn: "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರು ಹಾಗೂ ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆ ಬಳಿಕ 7 ರಿಂದ 14 ದಿನಗಳಲ್ಲಿ ಸಿಗುತ್ತದೆ." },
    officialUrl: "https://nadakacheri.karnataka.gov.in",
    sourceUrl: "https://sevasindhu.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-15T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "FileCheck"
  },
  {
    id: "svc-caste-cert",
    name: "Caste Certificate",
    nameKn: "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ",
    slug: "caste-certificate",
    description: {
      en: "Statutory government document certifying an individual's caste category (SC/ST/Category-1/2A/2B/3A/3B/General) under Karnataka reservation rules.",
      kn: "ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಮೀಸಲಾತಿ ನಿಯಮಗಳಡಿ ವ್ಯಕ್ತಿಯ ಜಾತಿ ವರ್ಗವನ್ನು (SC/ST/Category-1/2A/2B/3A/3B) ಅಧಿಕೃತವಾಗಿ ದೃಢೀಕರಿಸುವ ಶಾಸನಬದ್ಧ ಪ್ರಮಾಣಪತ್ರ."
    },
    state: "Karnataka",
    department: "Revenue Department (Social Welfare & Backward Classes)",
    category: "certificates",
    mode: "Online (Nadakacheri / Seva Sindhu / Bangalore One)",
    processingTime: "15 - 21 Working Days",
    fee: "₹40 Portal Charge",
    validity: "Permanent (Life-time for SC/ST; subject to periodic income check for OBC)",
    eligibility: {
      en: [
        "Must belong to recognized Scheduled Castes, Scheduled Tribes, or Backward Classes in Karnataka.",
        "Resident of Karnataka with ancestral records or School TC indicating caste.",
        "Parents' or siblings' existing caste certificate provides fast-track verification."
      ],
      kn: [
        "ಕರ್ನಾಟಕದ ಅನುಸೂಚಿತ ಜಾತಿ, ಅನುಸೂಚಿತ ಪಂಗಡ ಅಥವಾ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಪಟ್ಟಿಯಲ್ಲಿ ಬರುವವರು.",
        "ಶಾಲಾ ವರ್ಗಾವಣೆ ಪತ್ರ (TC) ಅಥವಾ ವಂಶಾವಳಿ ದಾಖಲೆಗಳಲ್ಲಿ ಜಾತಿ ಉಲ್ಲೇಖ ಹೊಂದಿರುವವರು."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card of Applicant & Parents",
        "School Transfer Certificate (TC) or Study Certificate showing caste",
        "Father's / Brother's / Sister's Caste Certificate (if available)",
        "Ration Card or Voter Identity Proof",
        "Passport Size Photograph"
      ],
      kn: [
        "ಅರ್ಜಿದಾರ ಮತ್ತು ಪೋಷಕರ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಜಾತಿ ನಮೂದಿಸಿರುವ ಶಾಲಾ ವರ್ಗಾವಣೆ ಪ್ರಮಾಣಪತ್ರ (TC) ಅಥವಾ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ",
        "ತಂದೆ ಅಥವಾ ರಕ್ತಸಂಬಂಧಿಗಳ ಹಿಂದಿನ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ಲಭ್ಯವಿದ್ದರೆ)",
        "ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ",
        "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಫೋಟೋ"
      ]
    },
    applicationSteps: {
      en: [
        "Open Nadakacheri portal (nadakacheri.karnataka.gov.in).",
        "Login with mobile number and select 'Caste Certificate' under Revenue services.",
        "Choose category (Form-D for SC/ST, Form-F for Cat-1, Form-E for 2A/2B/3A/3B).",
        "Enter RD number of family member's certificate for instant auto-verification if available.",
        "Upload applicant photo and school TC document.",
        "Pay ₹40 online and save acknowledgment slip.",
        "Track application and download certificate with digitally signed QR code."
      ],
      kn: [
        "ನಾಡಕಚೇರಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ ಲಾಗಿನ್ ಆಗಿ.",
        "ಕಂದಾಯ ಸೇವೆಗಳಲ್ಲಿ 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ' ಆಯ್ಕೆಮಾಡಿ.",
        "ನಿಮ್ಮ ವರ್ಗಕ್ಕೆ ತಕ್ಕಂತೆ ಫಾರ್ಮ್ (SC/ST ಗಾಗಿ Form-D, Cat-1 ಗಾಗಿ Form-F, 2A/2B/3A/3B ಗಾಗಿ Form-E) ಆರಿಸಿ.",
        "ಕುಟುಂಬದವರ ಹಿಂದಿನ ಪ್ರಮಾಣಪತ್ರದ RD ಸಂಖ್ಯೆ ಇದ್ದರೆ ನಮೂದಿಸಿ (ತ್ವರಿತ ಪರಿಶೀಲನೆಗೆ ಸಹಕಾರಿ).",
        "ಶಾಲಾ ಟಿಸಿ ಮತ್ತು ಭಾವಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಶುಲ್ಕ ಪಾವತಿಸಿ.",
        "ಅಕ್ನಾಲೆಡ್ಜ್‌ಮೆಂಟ್ ರಶೀದಿ ಪಡೆದು, ಪ್ರಕ್ರಿಯೆ ಮುಗಿದ ನಂತರ ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Applying under incorrect sub-caste or category code.",
        "No caste mention in school records without submitting revenue genealogical tree (Vamshavruksha)."
      ],
      kn: [
        "ತಪ್ಪಾದ ಉಪಜಾತಿ ಅಥವಾ ವರ್ಗ ಕೋಡ್ ಆಯ್ಕೆ ಮಾಡುವುದು.",
        "ಶಾಲಾ ದಾಖಲೆಯಲ್ಲಿ ಜಾತಿ ಉಲ್ಲೇಖವಿಲ್ಲದಿದ್ದಾಗ ವಂಶವೃಕ್ಷ ಸಲ್ಲಿಸದಿರುವುದು."
      ]
    },
    fees: { en: "₹40 standard portal fee.", kn: "₹40 ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಶುಲ್ಕ." },
    processingInfo: { en: "15 to 21 working days with field verification by Revenue Inspector.", kn: "ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆ ಬಳಿಕ 15 ರಿಂದ 21 ದಿನಗಳಲ್ಲಿ ಲಭ್ಯ." },
    officialUrl: "https://nadakacheri.karnataka.gov.in",
    sourceUrl: "https://sevasindhu.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-12T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Award"
  },
  {
    id: "svc-residence-cert",
    name: "Residence Certificate",
    nameKn: "ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ",
    slug: "residence-certificate",
    description: {
      en: "Proof of domicile confirming uninterrupted continuous stay in a specific village, town, or city in Karnataka for statutory, academic, and employment purposes.",
      kn: "ಕರ್ನಾಟಕದ ನಿರ್ದಿಷ್ಟ ವಿಳಾಸದಲ್ಲಿ ನಿರಂತರವಾಗಿ ವಾಸಿಸುತ್ತಿರುವುದನ್ನು ದೃಢೀಕರಿಸುವ ವಾಸಸ್ಥಳ (ರೆಸಿಡೆನ್ಸ್/ಡೊಮಿಸೈಲ್) ಪ್ರಮಾಣಪತ್ರ."
    },
    state: "Karnataka",
    department: "Revenue Department Karnataka",
    category: "certificates",
    mode: "Online (Nadakacheri / Grama One / Seva Sindhu)",
    processingTime: "7 - 14 Working Days",
    fee: "₹40 Portal Charge",
    validity: "5 Years",
    eligibility: {
      en: [
        "Minimum continuous residence of 7+ years in Karnataka (standard quota requirement).",
        "Valid proof of residence (Electricity bill, House tax receipt, or Rental agreement)."
      ],
      kn: [
        "ಕರ್ನಾಟಕದಲ್ಲಿ ಕನಿಷ್ಠ 7 ವರ್ಷಗಳ ಕಾಲ ನಿರಂತರ ವಾಸವಿರಬೇಕು.",
        "ಸ್ಥಳೀಯ ವಿಳಾಸದ ಮಾನ್ಯ ಪುರಾವೆ (ವಿದ್ಯುತ್ ಬಿಲ್, ಆಸ್ತಿ ತೆರಿಗೆ ರಶೀದಿ ಅಥವಾ ಬಾಡಿಗೆ ಒಪ್ಪಂದ) ಹೊಂದಿರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card with local address",
        "Electricity Bill / Water Bill / Property Tax Paid Receipt",
        "Ration Card or Voter ID Card",
        "School Study Certificate showing 7 years Karnataka study",
        "Passport Photo"
      ],
      kn: [
        "ಸ್ಥಳೀಯ ವಿಳಾಸ ಹೊಂದಿರುವ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ವಿದ್ಯುತ್ ಬಿಲ್ / ನೀರಿನ ಬಿಲ್ / ಆಸ್ತಿ ತೆರಿಗೆ ರಶೀದಿ",
        "ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ",
        "7 ವರ್ಷಗಳ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ",
        "ಪಾಸ್‌ಪೋರ್ಟ್ ಸೈಜ್ ಫೋಟೋ"
      ]
    },
    applicationSteps: {
      en: [
        "Access Nadakacheri portal online.",
        "Choose 'Residence Certificate' under Citizen services.",
        "Input personal details, duration of stay in years, and current municipal jurisdiction.",
        "Upload residence proof and identity documents.",
        "Pay the ₹40 processing fee through online payment gateway.",
        "Download acknowledgment and track status."
      ],
      kn: [
        "ನಾಡಕಚೇರಿ ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",
        "ನಾಗರಿಕ ಸೇವೆಗಳಲ್ಲಿ 'ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ' ಆಯ್ಕೆಮಾಡಿ.",
        "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ, ವಾಸವಿರುವ ವರ್ಷಗಳು ಮತ್ತು ವಿಳಾಸ ದಾಖಲಿಸಿ.",
        "ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ₹40 ಶುಲ್ಕ ಪಾವತಿಸಿ.",
        "ಅಕ್ನಾಲೆಡ್ಜ್‌ಮೆಂಟ್ ಸ್ಲಿಪ್ ಪಡೆದು ಸ್ಟೇಟಸ್ ಗಮನಿಸಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Aadhaar address does not match the residence address claimed in application.",
        "Insufficient consecutive years documented."
      ],
      kn: ["ಅರ್ಜಿಯಲ್ಲಿ ನಮೂದಿಸಿದ ವಿಳಾಸ ಮತ್ತು ಆಧಾರ್ ವಿಳಾಸ ತಾಳೆಯಾಗದಿರುವುದು."]
    },
    fees: { en: "₹40 portal fee.", kn: "₹40 ಶುಲ್ಕ." },
    processingInfo: { en: "7 - 14 working days.", kn: "7 ರಿಂದ 14 ದಿನಗಳು." },
    officialUrl: "https://nadakacheri.karnataka.gov.in",
    sourceUrl: "https://sevasindhu.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-10T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Home"
  },
  {
    id: "svc-ssp-scholarship",
    name: "State Scholarship Portal (SSP)",
    nameKn: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳು (SSP)",
    slug: "scholarship",
    description: {
      en: "Single integrated Karnataka government portal for Pre-Matric and Post-Matric scholarships, maintenance allowances, and fee reimbursement for SC/ST/OBC/Minority students.",
      kn: "ಕರ್ನಾಟಕದ ಮೆಟ್ರಿಕ್ ಪೂರ್ವ ಹಾಗೂ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶುಲ್ಕ ಮರುಪಾವತಿ, ಹಾಸ್ಟೆಲ್ ಭತ್ಯೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ ನೀಡುವ ಏಕೀಕೃತ ಪೋರ್ಟಲ್."
    },
    state: "Karnataka",
    department: "Social Welfare, Backward Classes & Minorities Welfare Departments",
    category: "education",
    mode: "Online (SSP Portal)",
    processingTime: "Sanctioned as per academic cycle",
    fee: "Free of cost (No Government Fee)",
    validity: "Annual (Renew every academic year)",
    eligibility: {
      en: [
        "Student enrolled in recognized Karnataka school, college, or university.",
        "Family annual income below prescribed ceiling (SC/ST: up to ₹2.5 Lakhs; OBC Cat-1: up to ₹2.5 Lakhs; 2A/3A/3B: up to ₹1 Lakh).",
        "Aadhaar must be seeded with student's bank account (NPCI mapping enabled)."
      ],
      kn: [
        "ಕರ್ನಾಟಕದ ಮಾನ್ಯತೆ ಪಡೆದ ಶಾಲೆ ಅಥವಾ ಕಾಲೇಜಿನಲ್ಲಿ ಪ್ರವೇಶ ಪಡೆದಿರಬೇಕು.",
        "ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಸರ್ಕಾರದ ನಿಗದಿತ ಮಿತಿಯೊಳಗಿರಬೇಕು.",
        "ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಲಿಂಕ್ ಮತ್ತು NPCI ಮ್ಯಾಪಿಂಗ್ ಕಡ್ಡಾಯವಾಗಿರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Student Aadhaar Card & Aadhaar Consent Form",
        "College Registration / Student ID / SATS ID",
        "Income Certificate RD Number & Caste Certificate RD Number",
        "Fee Receipt / Admission Letter with College Fee details",
        "Active Bank Passbook mapped with NPCI / DBT",
        "Hostel Stay Certificate (if staying in government or recognized private hostel)"
      ],
      kn: [
        "ವಿದ್ಯಾರ್ಥಿಯ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಕಾಲೇಜು ಪ್ರವೇಶ ರಶೀದಿ / ವಿದ್ಯಾರ್ಥಿ ಗುರುತಿನ ಚೀಟಿ / SATS ಸಂಖ್ಯೆ",
        "ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರದ RD ಸಂಖ್ಯೆ",
        "ಕಾಲೇಜು ಶುಲ್ಕ ಪಾವತಿ ರಶೀದಿ",
        "NPCI ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
        "ಹಾಸ್ಟೆಲ್ ಪ್ರಮಾಣಪತ್ರ (ಅನ್ವಯಿಸಿದರೆ)"
      ]
    },
    applicationSteps: {
      en: [
        "Visit State Scholarship Portal (ssp.postmatric.karnataka.gov.in).",
        "Create citizen account using Student Aadhaar and mobile number.",
        "Authenticate e-KYC via Aadhaar OTP.",
        "Enter RD numbers of Income & Caste certificates (system fetches data automatically).",
        "Select your University / Board and enter College Registration / Roll number.",
        "Submit college fee receipt and hostel details if applicable.",
        "Submit application and take printout to submit to your college scholarship nodal officer."
      ],
      kn: [
        "SSP ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",
        "ಆಧಾರ್ ಮತ್ತು ಮೊಬೈಲ್ ಒಟಿಪಿ ಮೂಲಕ ಖಾತೆ ತೆರೆಯಿರಿ.",
        "ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರದ RD ನಂಬರ್ ನಮೂದಿಸಿ (ಮಾಹಿತಿ ತಾನಾಗಿಯೇ ಬರುತ್ತದೆ).",
        "ಕಾಲೇಜು ಮತ್ತು ಕೋರ್ಸ್ ವಿವರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
        "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ, ಪ್ರಿಂಟ್‌ಔಟ್ ತೆಗೆದು ಕಾಲೇಜಿನ ಸ್ಕಾಲರ್‌ಶಿಪ್ ಅಧಿಕಾರಿಗೆ ನೀಡಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Bank account not linked with NPCI / Aadhaar DBT mapper, causing payment rejection.",
        "Entering expired or invalid RD number of income certificate.",
        "Failure to submit physical acknowledgment to college nodal officer."
      ],
      kn: [
        "ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ NPCI ಲಿಂಕ್ ಆಗದಿರುವುದು (ಡಿಬಿಟಿ ಹಣ ಬರುವುದಿಲ್ಲ).",
        "ಅವಧಿ ಮುಗಿದಿರುವ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ನಂಬರ್ ನೀಡುವುದು."
      ]
    },
    fees: { en: "100% Free. No fee for scholarship submission.", kn: "ಸಂಪೂರ್ಣ ಉಚಿತ. ಅರ್ಜಿ ಸಲ್ಲಿಕೆಗೆ ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ." },
    processingInfo: { en: "Direct Benefit Transfer (DBT) directly credited to student bank accounts following college e-attestation.", kn: "ಕಾಲೇಜು ದೃಢೀಕರಣದ ನಂತರ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ ಜಮೆಯಾಗುತ್ತದೆ." },
    officialUrl: "https://ssp.postmatric.karnataka.gov.in",
    sourceUrl: "https://dbt.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-18T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "GraduationCap"
  },
  {
    id: "svc-rtc-bhoomi",
    name: "RTC & Land Records (Pahani / Bhoomi)",
    nameKn: "ಆರ್‌ಟಿಸಿ ಮತ್ತು ಭೂಮಿ ದಾಖಲೆಗಳು (ಪಹಣಿ)",
    slug: "rtc",
    description: {
      en: "Record of Rights, Tenancy and Crops (RTC / Pahani) detailing land ownership, survey numbers, soil type, and cultivation status in Karnataka via the Bhoomi system.",
      kn: "ಕರ್ನಾಟಕದ ಭೂಮಿ ತಂತ್ರಾಂಶದ ಮೂಲಕ ಜಮೀನಿನ ಮಾಲೀಕತ್ವ, ಸರ್ವೇ ನಂಬರ್, ಬೆಳೆ ವಿವರ ಮತ್ತು ವಿಸ್ತೀರ್ಣ ತಿಳಿಸುವ ಆರ್‌ಟಿಸಿ (ಪಹಣಿ) ಪತ್ರ."
    },
    state: "Karnataka",
    department: "Revenue Department Karnataka (Bhoomi Project)",
    category: "revenue",
    mode: "Online (Bhoomi Portal / KIOSK / Nadakacheri)",
    processingTime: "Instant (Download View RTC in seconds; ₹15 for signed copy)",
    fee: "Free to view / ₹15 for official digitally signed RTC",
    validity: "Issued per crop season / current financial year",
    eligibility: {
      en: [
        "Any citizen or landholder can view RTC using District, Taluk, Hobli, Village, and Survey Number.",
        "Farmers and landowners requiring legal proof for bank loans, crop insurance, or property sale."
      ],
      kn: [
        "ಯಾವುದೇ ನಾಗರಿಕರು ಜಿಲ್ಲೆ, ತಾಲೂಕು, ಹೋಬಳಿ, ಗ್ರಾಮ ಮತ್ತು ಸರ್ವೇ ನಂಬರ್ ಬಳಸಿ ಪಹಣಿ ನೋಡಬಹುದು.",
        "ಕೃಷಿ ಸಾಲ, ಬೆಳೆ ವಿಮೆ ಅಥವಾ ಆಸ್ತಿ ವಹಿವಾಟಿಗೆ ಪಹಣಿ ಅಗತ್ಯವಿರುವ ರೈತರು."
      ]
    },
    documents: {
      en: [
        "Land Survey Number & Hissa Number",
        "District, Taluk, Hobli, and Village name",
        "Aadhaar Number (optional for viewing, needed for e-KYC mutation tracking)"
      ],
      kn: [
        "ಜಮೀನಿನ ಸರ್ವೇ ನಂಬರ್ ಮತ್ತು ಹಿಸ್ಸಾ ನಂಬರ್",
        "ಜಿಲ್ಲೆ, ತಾಲೂಕು, ಹೋಬಳಿ ಮತ್ತು ಗ್ರಾಮದ ಹೆಸರು",
        "ಆಧಾರ್ ಸಂಖ್ಯೆ"
      ]
    },
    applicationSteps: {
      en: [
        "Visit Karnataka Bhoomi portal (bhoomi.karnataka.gov.in).",
        "Select 'View RTC Information' or 'Citizen Portal'.",
        "Choose District -> Taluk -> Hobli -> Village from dropdown lists.",
        "Enter Survey Number, Surnoc, and Hissa Number.",
        "Select Current Year or Old Year RTC.",
        "Click 'Fetch Details' -> 'View RTC' to inspect record on screen.",
        "For legally valid certified signed copy, pay ₹15 online and download PDF with digital signature."
      ],
      kn: [
        "ಕರ್ನಾಟಕ ಭೂಮಿ ಪೋರ್ಟಲ್‌ಗೆ (bhoomi.karnataka.gov.in) ಭೇಟಿ ನೀಡಿ.",
        "'ಆರ್‌ಟಿಸಿ ವೀಕ್ಷಣೆ' ಅಥವಾ 'ನಾಗರಿಕ ಸೇವೆ' ಆಯ್ಕೆಮಾಡಿ.",
        "ಜಿಲ್ಲೆ -> ತಾಲೂಕು -> ಹೋಬಳಿ -> ಗ್ರಾಮ ಆಯ್ಕೆಮಾಡಿ.",
        "ಸರ್ವೇ ನಂಬರ್ ಮತ್ತು ಹಿಸ್ಸಾ ನಂಬರ್ ನಮೂದಿಸಿ.",
        "ಚಾಲ್ತಿ ವರ್ಷ ಅಥವಾ ಹಳೆಯ ವರ್ಷದ ಪಹಣಿ ಆರಿಸಿ 'Fetch' ಕ್ಲಿಕ್ ಮಾಡಿ.",
        "ಕೇವಲ ನೋಡಲು ಉಚಿತ; ಡಿಜಿಟಲ್ ಸಹಿ ಹೊಂದಿದ ಮೂಲ ಪ್ರತಿಯನ್ನು ₹15 ಪಾವತಿಸಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Entering incorrect Surnoc or Hissa sub-division number.",
        "Confusing View RTC (for information) with Certified Signed RTC (required for court/banks)."
      ],
      kn: ["ತಪ್ಪಾದ ಹಿಸ್ಸಾ ನಂಬರ್ ನಮೂದಿಸುವುದು ಅಥವಾ ಸಹಿ ಇಲ್ಲದ ಪ್ರತಿಯನ್ನು ಬ್ಯಾಂಕ್‌ಗೆ ನೀಡುವುದು."]
    },
    fees: { en: "Free to view; ₹15 for digitally signed certified copy.", kn: "ನೋಡಲು ಉಚಿತ; ಸಹಿ ಹೊಂದಿದ ಸರ್ಕಾರಿ ಪ್ರತಿ ಪಡೆಯಲು ₹15." },
    processingInfo: { en: "Instant electronic generation 24/7.", kn: "ತಕ್ಷಣವೇ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು." },
    officialUrl: "https://bhoomi.karnataka.gov.in",
    sourceUrl: "https://landrecords.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-20T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "MapPin"
  },
  {
    id: "svc-driving-licence",
    name: "Driving Licence (LL & DL)",
    nameKn: "ಚಾಲನಾ ಪರವಾನಗಿ (Driving Licence)",
    slug: "driving-licence",
    description: {
      en: "Official authorization issued by Karnataka Transport Department (RTO) permitting individuals to operate motor vehicles on public roads across India.",
      kn: "ಭಾರತದ ಸಾರ್ವಜನಿಕ ರಸ್ತೆಗಳಲ್ಲಿ ವಾಹನ ಚಾಲನೆ ಮಾಡಲು ಕರ್ನಾಟಕ ಸಾರಿಗೆ ಇಲಾಖೆ (RTO) ನೀಡುವ ಅಧಿಕೃತ ಚಾಲನಾ ಪರವಾನಗಿ."
    },
    state: "Karnataka",
    department: "Transport Department Karnataka / Ministry of Road Transport (Parivahan)",
    category: "transport",
    mode: "Online (Sarathi Parivahan) + RTO Driving Test",
    processingTime: "Learner Licence instant online; DL 7-15 days after driving test",
    fee: "₹200 (Learner's) / ₹500 - ₹1000 (Permanent DL + Test Fee)",
    validity: "Learner's: 6 Months; Permanent DL: 20 Years or age 40",
    eligibility: {
      en: [
        "Age 18+ for Light Motor Vehicle (Car/Bike with gear); Age 16+ for gearless bike (<50cc).",
        "Learner's Licence must be held for minimum 30 days before applying for permanent DL test.",
        "Medical Fitness Certificate (Form 1A for applicants over 40 years or commercial vehicles)."
      ],
      kn: [
        "ದ್ವಿಚಕ್ರ ಮತ್ತು ಲಘು ವಾಹನಗಳಿಗೆ ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು.",
        "ಖಾಯಂ ಲೈಸೆನ್ಸ್ ಪರೀಕ್ಷೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಲರ್ನರ್ ಲೈಸೆನ್ಸ್ ಪಡೆದು ಕನಿಷ್ಠ 30 ದಿನ ಆಗಿರಬೇಕು.",
        "ದೈಹಿಕ ಮತ್ತು ದೃಷ್ಟಿ ಸಾಮರ್ಥ್ಯದ ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ (40 ವರ್ಷ ಮೀರಿದವರಿಗೆ Form 1A)."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card (enables contactless online LL test from home)",
        "Proof of Age (SSLC Marks Card / Birth Certificate / Passport)",
        "Address Proof (Aadhaar / Voter ID / Passport)",
        "Medical Certificate Form 1A (if age > 40)",
        "Learner's Licence number (for permanent DL)",
        "Passport size photograph and signature scan"
      ],
      kn: [
        "ಆಧಾರ್ ಕಾರ್ಡ್ (ಮನೆಯಿಂದಲೇ ಆನ್‌ಲೈನ್ ಲರ್ನರ್ ಟೆಸ್ಟ್ ಬರೆಯಲು ನೆರವಾಗುತ್ತದೆ)",
        "ವಯಸ್ಸಿನ ಪುರಾವೆ (ಎಸ್ಸೆಸ್ಸೆಲ್ಸಿ ಅಂಕಪಟ್ಟಿ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ)",
        "ವಿಳಾಸದ ಪುರಾವೆ",
        "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ ಮತ್ತು ಸಹಿ",
        "ಖಾಯಂ ಡಿಎಲ್‌ಗೆ ಲರ್ನರ್ ಲೈಸೆನ್ಸ್ ನಂಬರ್"
      ]
    },
    applicationSteps: {
      en: [
        "Go to Sarathi Parivahan portal (parivahan.gov.in).",
        "Select 'Karnataka' as state.",
        "Apply for 'Learner Licence (LL)' with Aadhaar authentication (no RTO visit needed for LL test).",
        "Take online video tutorial and pass 15-question road safety exam online.",
        "Download Learner's Licence immediately upon passing.",
        "After 30 days, apply for 'Permanent Driving Licence', pay fee, and book slot at local RTO.",
        "Appear for vehicle driving test with vehicle at designated RTO track.",
        "Smart card DL dispatched via speed post to registered residential address."
      ],
      kn: [
        "ಪರಿವಾಹನ ಪೋರ್ಟಲ್‌ಗೆ (parivahan.gov.in) ಭೇಟಿ ನೀಡಿ.",
        "ರಾಜ್ಯ 'ಕರ್ನಾಟಕ' ಆಯ್ಕೆಮಾಡಿ.",
        "ಆಧಾರ್ ಮೂಲಕ ಲರ್ನರ್ ಲೈಸೆನ್ಸ್ (LL) ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ (ಮನೆಯಲ್ಲೇ ಟೆಸ್ಟ್ ನೀಡಬಹುದು).",
        "ಆನ್‌ಲೈನ್ ರಸ್ತೆ ಸುರಕ್ಷತಾ ಪರೀಕ್ಷೆ ಪಾಸ್ ಮಾಡಿ LL ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
        "30 ದಿನಗಳ ನಂತರ ಖಾಯಂ ಡಿಎಲ್ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ ಆರ್ಟಿಒ ಕಚೇರಿಗೆ ಹೋಗಿ ಡ್ರೈವಿಂಗ್ ಟೆಸ್ಟ್ ನೀಡಿ.",
        "ಪಾಸ್ ಆದ ನಂತರ ಸ್ಮಾರ್ಟ್ ಕಾರ್ಡ್ ನಿಮ್ಮ ಮನೆ ವಿಳಾಸಕ್ಕೆ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್ ಮೂಲಕ ಬರುತ್ತದೆ."
      ]
    },
    commonMistakes: {
      en: [
        "Allowing Learner's Licence to expire before taking permanent DL test (LL valid only 6 months).",
        "Bringing vehicle without valid Insurance, Fitness, or Emission certificate on test day."
      ],
      kn: [
        "ಲರ್ನರ್ ಲೈಸೆನ್ಸ್ ಅವಧಿ 6 ತಿಂಗಳು ಮುಗಿಯುವ ಮುನ್ನ ಟೆಸ್ಟ್ ತೆಗೆದುಕೊಳ್ಳದಿರುವುದು.",
        "ಟೆಸ್ಟ್ ದಿನ ವಾಹನದ ಇನ್ಶೂರೆನ್ಸ್ ಅಥವಾ ಮಾಲಿನ್ಯ ಪ್ರಮಾಣಪತ್ರ ತರಲು ಮರೆಯುವುದು."
      ]
    },
    fees: { en: "LL: ₹200; Permanent DL: ₹200 + Test Fee ₹300 + Smart Card ₹200 = ₹700 total.", kn: "ಲರ್ನರ್ ಲೈಸೆನ್ಸ್ ₹200; ಖಾಯಂ ಲೈಸೆನ್ಸ್ ಒಟ್ಟು ಸುಮಾರು ₹700." },
    processingInfo: { en: "LL instant; Smart Card delivered via India Post within 15-20 days.", kn: "ಖಾಯಂ ಡಿಎಲ್ 15-20 ದಿನಗಳಲ್ಲಿ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್ ಮೂಲಕ ಮನೆಗೆ ಬರುತ್ತದೆ." },
    officialUrl: "https://parivahan.gov.in",
    sourceUrl: "https://transport.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-22T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Compass"
  },
  {
    id: "svc-ration-card",
    name: "Ration Card (BPL / APL / Antyodaya)",
    nameKn: "ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್)",
    slug: "ration-card",
    description: {
      en: "Official identity and food security card issued to households in Karnataka for subsidized food grains under the National Food Security Act & Anna Bhagya scheme.",
      kn: "ಅನ್ನಭಾಗ್ಯ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಆಹಾರ ಭದ್ರತಾ ಕಾಯ್ದೆಯಡಿ ಆಹಾರ ಧಾನ್ಯ ಪಡೆಯಲು ಕರ್ನಾಟಕ ಸರ್ಕಾರ ನೀಡುವ ಪಡಿತರ ಚೀಟಿ (BPL / APL / ಅಂತ್ಯೋದಯ)."
    },
    state: "Karnataka",
    department: "Food, Civil Supplies & Consumer Affairs Department Karnataka",
    category: "schemes",
    mode: "Online (Ahara Karnataka Portal / Grama One)",
    processingTime: "15 - 30 Working Days",
    fee: "₹50 - ₹70 for card printing & dispatch",
    validity: "Subject to annual e-KYC",
    eligibility: {
      en: [
        "BPL Card: Annual family income under ₹1.20 Lakhs, no four-wheeler (except commercial taxi), less than 3 hectares dry land.",
        "APL Card: Open to all Karnataka residents with family income above BPL limits.",
        "All family members must have Aadhaar with biometric e-KYC completed."
      ],
      kn: [
        "ಬಿಪಿಎಲ್ ಕಾರ್ಡ್: ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹1.20 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು ಮತ್ತು ಸ್ವಂತ ಕಾರು ಹೊಂದಿರಬಾರದು.",
        "ಎಪಿಎಲ್ ಕಾರ್ಡ್: ಬಿಪಿಎಲ್ ಮಿತಿ ಮೀರಿದ ಎಲ್ಲಾ ರಾಜ್ಯ ನಿವಾಸಿಗಳಿಗೆ ಲಭ್ಯ.",
        "ಕುಟುಂಬದ ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರ ಆಧಾರ್ ಬಯೋಮೆಟ್ರಿಕ್ e-KYC ಆಗಿರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Aadhaar cards of all family members to be listed on card",
        "Income Certificate from Revenue Department (for BPL status)",
        "Electricity Bill of current house (RR Number)",
        "Mobile Number linked to family head's Aadhaar",
        "Recent passport photographs"
      ],
      kn: [
        "ಕುಟುಂಬದ ಎಲ್ಲಾ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್‌ಗಳು",
        "ಕಂದಾಯ ಇಲಾಖೆಯಿಂದ ಪಡೆದ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
        "ಮನೆಯ ವಿದ್ಯುತ್ ಬಿಲ್ (RR ನಂಬರ್)",
        "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        "ಭಾವಚಿತ್ರಗಳು"
      ]
    },
    applicationSteps: {
      en: [
        "Visit Food & Civil Supplies portal (ahara.kar.nic.in).",
        "Navigate to 'e-Services' -> 'New Ration Card' application window (portal opens during designated government windows).",
        "Choose card type (Priority Household / Non-Priority).",
        "Authenticate all family members with Aadhaar OTP.",
        "Enter RR number of electricity meter to verify residence address.",
        "Submit and download application reference token.",
        "Card is approved after Food Inspector verification and delivered via post or fair price shop."
      ],
      kn: [
        "ಆಹಾರ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ (ahara.kar.nic.in) ಭೇಟಿ ನೀಡಿ.",
        "'ಇ-ಸೇವೆಗಳು' -> 'ಹೊಸ ಪಡಿತರ ಚೀಟಿಗೆ ಅರ್ಜಿ' ಆರಿಸಿ (ಸರ್ಕಾರ ತೆರೆದ ದಿನಗಳಲ್ಲಿ).",
        "ಆಧಾರ್ ಒಟಿಪಿ ಮೂಲಕ ಕುಟುಂಬದ ಸದಸ್ಯರ ಹೆಸರು ಸೇರಿಸಿ.",
        "ಮನೆಯ ವಿದ್ಯುತ್ ಮೀಟರ್ RR ಸಂಖ್ಯೆ ದಾಖಲಿಸಿ.",
        "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಟೋಕನ್ ರಶೀದಿ ಪಡೆಯಿರಿ. ಆಹಾರ ನಿರೀಕ್ಷಕರ ಪರಿಶೀಲನೆಯ ನಂತರ ಕಾರ್ಡ್ ನೀಡಲಾಗುತ್ತದೆ."
      ]
    },
    commonMistakes: {
      en: [
        "Applying for BPL card when income certificate exceeds ₹1.20 Lakhs threshold.",
        "Family member already active on another state/family ration card."
      ],
      kn: ["ಬೇರೆ ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ಈಗಾಗಲೇ ಹೆಸರು ದಾಖಲಾಗಿದ್ದರೆ ಹೊಸ ಕಾರ್ಡ್ ಬರುವುದಿಲ್ಲ."]
    },
    fees: { en: "₹50 - ₹70 nominal charge upon delivery.", kn: "₹50 ರಿಂದ ₹70 ಮುದ್ರಣ ಮತ್ತು ವಿತರಣಾ ಶುಲ್ಕ." },
    processingInfo: { en: "Processed in batches during notified government intake windows.", kn: "ಸರ್ಕಾರ ಅರ್ಜಿ ಆಹ್ವಾನಿಸಿದ ದಿನಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ ನೀಡಲಾಗುತ್ತದೆ." },
    officialUrl: "https://ahara.kar.nic.in",
    sourceUrl: "https://sevasindhu.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-14T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "ShoppingBag"
  },
  {
    id: "svc-pan-card",
    name: "PAN Card (Permanent Account Number)",
    nameKn: "ಪ್ಯಾನ್ ಕಾರ್ಡ್ (PAN Card)",
    slug: "pan-card",
    description: {
      en: "10-digit alphanumeric identifier issued by the Income Tax Department of India, essential for taxation, banking transactions, investments, and business registration.",
      kn: "ಭಾರತೀಯ ಆದಾಯ ತೆರಿಗೆ ಇಲಾಖೆ ನೀಡುವ 10 ಅಂಕಿಯ ಶಾಶ್ವತ ಖಾತೆ ಸಂಖ್ಯೆ. ತೆರಿಗೆ ಸಲ್ಲಿಕೆ, ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆಯಲು ಮತ್ತು ಹಣಕಾಸು ವಹಿವಾಟಿಗೆ ಕಡ್ಡಾಯ."
    },
    state: "Central",
    department: "Income Tax Department, Government of India",
    category: "identity",
    mode: "Online (Instant e-PAN via Income Tax Portal / Physical via Protean or UTIITSL)",
    processingTime: "Instant (10 minutes for e-PAN); 10-15 days for physical card",
    fee: "Free for instant digital e-PAN; ₹107 for physical plastic PVC card in India",
    validity: "Permanent / Lifetime",
    eligibility: {
      en: [
        "Any Indian citizen of any age (Minors can apply through legal guardians).",
        "For instant free e-PAN, applicant must have an Aadhaar number linked to an active mobile phone."
      ],
      kn: [
        "ಯಾವುದೇ ಭಾರತೀಯ ನಾಗರಿಕರು ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು (ಅಪ್ರಾಪ್ತರಿಗೆ ಪೋಷಕರು ಅರ್ಜಿ ಹಾಕಬಹುದು).",
        "ತಕ್ಷಣದ ಉಚಿತ ಇ-ಪ್ಯಾನ್‌ಗೆ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಮೊಬೈಲ್ ಒಟಿಪಿ ಇರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Aadhaar Card (serves as Proof of Identity, Date of Birth, and Address)",
        "Scanned signature (for physical card applications)",
        "Passport size photo (auto-fetched from Aadhaar for instant e-PAN)"
      ],
      kn: [
        "ಆಧಾರ್ ಕಾರ್ಡ್ (ಗುರುತು, ಜನನ ದಿನಾಂಕ ಮತ್ತು ವಿಳಾಸದ ಏಕೈಕ ಪುರಾವೆ)",
        "ಅರ್ಜಿದಾರರ ಸಹಿಯ ಫೋಟೋ",
        "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಫೋಟೋ"
      ]
    },
    applicationSteps: {
      en: [
        "For instant 100% free digital PAN: Go to incometax.gov.in -> 'Instant e-PAN'.",
        "Enter 12-digit Aadhaar number and validate with OTP received on phone.",
        "Confirm details fetched automatically from UIDAI database.",
        "Instantly download digitally signed PDF e-PAN within 10 minutes.",
        "For physical plastic card delivered home: Visit onlineservices.nsdl.com (Protean), fill Form 49A, pay ₹107, and verify via Aadhaar Paperless e-KYC."
      ],
      kn: [
        "ಉಚಿತ ಡಿಜಿಟಲ್ ಇ-ಪ್ಯಾನ್‌ಗೆ: incometax.gov.in ನಲ್ಲಿ 'Instant e-PAN' ಕ್ಲಿಕ್ ಮಾಡಿ.",
        "ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ ಮೊಬೈಲ್ ಒಟಿಪಿ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.",
        "ಆಧಾರ್ ಮಾಹಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ 10 ನಿಮಿಷಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ಪ್ಯಾನ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
        "ಪ್ಲಾಸ್ಟಿಕ್ ಕಾರ್ಡ್ ಮನೆಗೆ ಬರಲು Protean/NSDL ಪೋರ್ಟಲ್‌ನಲ್ಲಿ Form 49A ಭರ್ತಿ ಮಾಡಿ ₹107 ಪಾವತಿಸಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Name spelling discrepancy between Aadhaar and Matriculation marksheet.",
        "Applying for a second PAN (holding multiple PANs is an offense punishable by a ₹10,000 fine)."
      ],
      kn: [
        "ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಹೊಂದುವುದು ಕಾನೂನುಬಾಹಿರ (₹10,000 ದಂಡ).",
        "ಆಧಾರ್‌ನಲ್ಲಿರುವ ಹೆಸರು ಮತ್ತು ಅಂಕಪಟ್ಟಿಯಲ್ಲಿರುವ ಹೆಸರು ಬೇರೆ ಇರುವುದು."
      ]
    },
    fees: { en: "Instant e-PAN: ₹0 (Free); Physical card home delivery: ₹107.", kn: "ಡಿಜಿಟಲ್ ಇ-ಪ್ಯಾನ್ ಸಂಪೂರ್ಣ ಉಚಿತ; ಪ್ಲಾಸ್ಟಿಕ್ ಕಾರ್ಡ್‌ಗೆ ₹107." },
    processingInfo: { en: "Instant PDF within 10 mins; Physical card in 7-14 days.", kn: "ಇ-ಪ್ಯಾನ್ 10 ನಿಮಿಷದಲ್ಲಿ, ಪ್ಲಾಸ್ಟಿಕ್ ಕಾರ್ಡ್ 10-14 ದಿನದಲ್ಲಿ ಬರುತ್ತದೆ." },
    officialUrl: "https://www.incometax.gov.in",
    sourceUrl: "https://www.onlineservices.nsdl.com",
    language: "en,kn",
    lastVerifiedAt: "2026-09-25T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "CreditCard"
  },
  {
    id: "svc-gruha-lakshmi",
    name: "Gruha Lakshmi Scheme",
    nameKn: "ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ",
    slug: "gruha-lakshmi",
    description: {
      en: "Flagship Karnataka guarantee scheme providing ₹2,000 monthly financial assistance directly into bank accounts of female heads of eligible households.",
      kn: "ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ: ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ನಗದು ಸಹಾಯ ಧನ."
    },
    state: "Karnataka",
    department: "Women and Child Development Department, Karnataka",
    category: "schemes",
    mode: "Assisted Online (Seva Sindhu / Grama One / Karnataka One / Bangalore One)",
    processingTime: "Monthly direct bank transfer cycle",
    fee: "100% Free of Cost",
    validity: "Continuous monthly benefit",
    eligibility: {
      en: [
        "Woman must be listed as 'Family Head' in Karnataka Antyodaya / BPL / APL Ration Card.",
        "Woman or her husband must not be Income Tax or GST payers.",
        "Bank account must be seeded with Aadhaar and active on NPCI DBT mapper."
      ],
      kn: [
        "ಮಹಿಳೆಯು ರೇಷನ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಕುಟುಂಬದ ಯಜಮಾನಿ ಎಂದು ನಮೂದಾಗಿರಬೇಕು.",
        "ಮಹಿಳೆ ಅಥವಾ ಆಕೆಯ ಪತಿ ಆದಾಯ ತೆರಿಗೆ (IT) ಅಥವಾ ಜಿಎಸ್‌ಟಿ ಪಾವತಿದಾರರಾಗಿರಬಾರದು.",
        "ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ NPCI ಲಿಂಕ್ ಆಗಿರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Ration Card Number (showing applicant as female family head)",
        "Aadhaar Card of Woman Head",
        "Aadhaar Card of Husband",
        "Bank Passbook linked to Aadhaar (with IFSC code)",
        "Mobile Number linked to Aadhaar"
      ],
      kn: [
        "ರೇಷನ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
        "ಯಜಮಾನಿ ಮಹಿಳೆಯ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆ ಪಾಸ್‌ಬುಕ್",
        "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
      ]
    },
    applicationSteps: {
      en: [
        "Visit local Grama One, Karnataka One, or Bangalore One citizen center (free registration).",
        "Provide your Ration Card number to the operator.",
        "Verify beneficiary name appearing on screen as woman head.",
        "Authenticate biometric fingerprint or mobile OTP.",
        "Collect free printed acknowledgment slip with registration number.",
        "Track monthly DBT deposit via Karnataka DBT Mobile App (dbt.karnataka.gov.in)."
      ],
      kn: [
        "ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್, ಕರ್ನಾಟಕ ಒನ್ ಅಥವಾ ಬೆಂಗಳೂರು ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
        "ರೇಷನ್ ಕಾರ್ಡ್ ನಂಬರ್ ನೀಡಿ ಯಜಮಾನಿಯ ವಿವರ ದೃಢೀಕರಿಸಿ.",
        "ಆಧಾರ್ ಒಟಿಪಿ ಅಥವಾ ಬಯೋಮೆಟ್ರಿಕ್ ಮೂಲಕ ನೋಂದಣಿ ಮಾಡಿಸಿ.",
        "ಉಚಿತ ರಶೀದಿ ಪಡೆಯಿರಿ. ಪ್ರತಿ ತಿಂಗಳು ₹2000 ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ."
      ]
    },
    commonMistakes: {
      en: [
        "Paying unauthorized middlemen (registration is completely free).",
        "Bank account not active or lacking NPCI mapping, blocking monthly credits."
      ],
      kn: [
        "ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡುವುದು (ಈ ಯೋಜನೆಗೆ ಸರ್ಕಾರ ಯಾವುದೇ ಶುಲ್ಕ ವಿಧಿಸುವುದಿಲ್ಲ).",
        "ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ NPCI ಮ್ಯಾಪಿಂಗ್ ಇಲ್ಲದಿರುವುದು."
      ]
    },
    fees: { en: "Completely Free. Zero charges.", kn: "ಸಂಪೂರ್ಣ ಉಚಿತ." },
    processingInfo: { en: "Credited on monthly schedule directly into bank account via DBT.", kn: "ಪ್ರತಿ ತಿಂಗಳು ಡಿಬಿಟಿ ಮೂಲಕ ಖಾತೆಗೆ ನೇರವಾಗಿ ಜಮೆಯಾಗುತ್ತದೆ." },
    officialUrl: "https://sevasindhu.karnataka.gov.in",
    sourceUrl: "https://dbt.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-24T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Heart"
  },
  {
    id: "svc-yuva-nidhi",
    name: "Yuva Nidhi Scheme",
    nameKn: "ಯುವ ನಿಧಿ ಯೋಜನೆ",
    slug: "yuva-nidhi",
    description: {
      en: "Karnataka government unemployment allowance offering ₹3,000/month for degree holders and ₹1,500/month for diploma holders seeking employment.",
      kn: "ಕರ್ನಾಟಕದ ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರಿಗೆ ತಿಂಗಳಿಗೆ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರಿಗೆ ತಿಂಗಳಿಗೆ ₹1,500 ನೀಡುವ ಆರ್ಥಿಕ ನೆರವು ಯೋಜನೆ."
    },
    state: "Karnataka",
    department: "Skill Development, Entrepreneurship and Livelihood Department Karnataka",
    category: "employment",
    mode: "Online (Seva Sindhu Portal)",
    processingTime: "Approved on monthly verification cycle",
    fee: "Free of charge",
    validity: "Up to 2 Years or until employment is secured",
    eligibility: {
      en: [
        "Karnataka domicile graduate or diploma holder graduated in designated academic batches.",
        "Unemployed for at least 180 days (6 months) post course completion.",
        "Not pursuing higher education or employed in private/government sector."
      ],
      kn: [
        "ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿದ್ದು, ಮಾನ್ಯತೆ ಪಡೆದ ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಉತ್ತೀರ್ಣರಾಗಿರಬೇಕು.",
        "ಕೋರ್ಸ್ ಮುಗಿದ ನಂತರ ಕನಿಷ್ಠ 180 ದಿನಗಳವರೆಗೆ ನಿರುದ್ಯೋಗಿಯಾಗಿರಬೇಕು.",
        "ಉನ್ನತ ವ್ಯಾಸಂಗದಲ್ಲಿ ತೊಡಗಿರಬಾರದು ಮತ್ತು ಯಾವುದೇ ಸರ್ಕಾರಿ/ಖಾಸಗಿ ನೌಕರಿ ಹೊಂದಿರಬಾರದು."
      ]
    },
    documents: {
      en: [
        "Degree / Diploma Marks Card & Convocation Certificate",
        "Aadhaar Card with phone linkage",
        "Karnataka Domicile / Residence Proof",
        "Bank Passbook mapped to NPCI Aadhaar DBT",
        "Self-declaration of unemployment status"
      ],
      kn: [
        "ಪದವಿ ಅಥವಾ ಡಿಪ್ಲೊಮಾ ಅಂಕಪಟ್ಟಿ",
        "ಆಧಾರ್ ಕಾರ್ಡ್",
        "ವಾಸಸ್ಥಳ ದೃಢೀಕರಣ ಪತ್ರ",
        "NPCI ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
        "ಸ್ವಯಂ ಘೋಷಣಾ ಪ್ರಮಾಣಪತ್ರ"
      ]
    },
    applicationSteps: {
      en: [
        "Visit Seva Sindhu Yuva Nidhi Portal (sevasindhugs.karnataka.gov.in).",
        "Login and select 'Yuva Nidhi Scheme Application'.",
        "Enter University Registration Number (system verifies degree through NAD / DigiLocker).",
        "Confirm Aadhaar e-KYC and bank account DBT linkage.",
        "Submit monthly self-declaration to confirm continued job-seeker status.",
        "Allowance credited each month directly to beneficiary bank account."
      ],
      kn: [
        "ಸೇವಾ ಸಿಂಧು ಯುವನಿಧಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.",
        "ವಿಶ್ವವಿದ್ಯಾಲಯದ ನೋಂದಣಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ ಅಂಕಪಟ್ಟಿ ಪರಿಶೀಲಿಸಿ.",
        "ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ದೃಢೀಕರಿಸಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
        "ಪ್ರತಿ ತಿಂಗಳು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸ್ವಯಂ ಘೋಷಣೆ ಸಲ್ಲಿಸಿ ಭತ್ಯೆ ಪಡೆಯಿರಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Failing to submit the mandatory monthly self-declaration on portal.",
        "Applying while actively enrolled in higher degree courses."
      ],
      kn: ["ಪ್ರತಿ ತಿಂಗಳು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ಸ್ವಯಂ ಘೋಷಣೆ ಸಲ್ಲಿಸದಿರುವುದು."]
    },
    fees: { en: "Free of cost.", kn: "ಸಂಪೂರ್ಣ ಉಚಿತ." },
    processingInfo: { en: "Credited monthly for up to 2 years.", kn: "2 ವರ್ಷಗಳವರೆಗೆ ಅಥವಾ ಉದ್ಯೋಗ ಸಿಗುವವರೆಗೆ ಮಾಸಿಕ ಜಮೆ." },
    officialUrl: "https://sevasindhugs.karnataka.gov.in",
    sourceUrl: "https://skillconnect.kaushalkar.com",
    language: "en,kn",
    lastVerifiedAt: "2026-09-20T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Briefcase"
  },
  {
    id: "svc-pm-fasal-bima",
    name: "Crop Insurance (PMFBY / Samrakshane)",
    nameKn: "ಬೆಳೆ ವಿಮೆ (ಸಂರಕ್ಷಣೆ / PMFBY)",
    slug: "crop-insurance",
    description: {
      en: "Comprehensive risk insurance protection for Karnataka farmers against non-preventable natural risks, drought, floods, and unseasonal rainfall.",
      kn: "ಅತಿವೃಷ್ಟಿ, ಅನಾವೃಷ್ಟಿ ಮತ್ತು ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳಿಂದ ಬೆಳೆ ನಷ್ಟವಾದಾಗ ರೈತರಿಗೆ ಆರ್ಥಿಕ ರಕ್ಷಣೆ ನೀಡುವ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಸಂರಕ್ಷಣೆ ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ."
    },
    state: "Karnataka",
    department: "Agriculture Department Karnataka / Samrakshane Portal",
    category: "agriculture",
    mode: "Online (Samrakshane Portal) / Banks / CSC / Raitha Samparka Kendra",
    processingTime: "Seasonal cut-off dates for Kharif & Rabi enrollment",
    fee: "Nominal farmer premium (1.5% for Rabi, 2% for Kharif, 5% for Horticultural crops)",
    validity: "One crop season",
    eligibility: {
      en: [
        "All farmers growing notified crops in notified areas of Karnataka (both loanee and non-loanee).",
        "Must have valid land ownership (RTC/Pahani) or registered tenant farmer agreement (FID / FRUITS ID)."
      ],
      kn: [
        "ಅಧಿಸೂಚಿತ ಪ್ರದೇಶದಲ್ಲಿ ಅಧಿಸೂಚಿತ ಬೆಳೆ ಬೆಳೆಯುವ ಎಲ್ಲಾ ರೈತರು (ಸಾಲ ಪಡೆದವರು ಮತ್ತು ಪಡೆಯದವರು).",
        "ಜಮೀನಿನ ಪಹಣಿ (RTC) ಅಥವಾ FRUITS ಐಡಿ (ರೈತ ಐಡಿ) ಹೊಂದಿರುವವರು."
      ]
    },
    documents: {
      en: [
        "FRUITS ID (Farmer Registration & Unified Beneficiary Information System)",
        "Current Season Land RTC / Pahani",
        "Bank Passbook linked with Aadhaar",
        "Sowing Certificate issued by Village Accountant / Raitha Samparka Kendra",
        "Aadhaar Card"
      ],
      kn: [
        "FRUITS ಐಡಿ (ರೈತರ ನೋಂದಣಿ ಸಂಖ್ಯೆ)",
        "ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC)",
        "ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
        "ಬಿತ್ತನೆ ಪ್ರಮಾಣಪತ್ರ",
        "ಆಧಾರ್ ಕಾರ್ಡ್"
      ]
    },
    applicationSteps: {
      en: [
        "Visit Samrakshane portal (samrakshane.karnataka.gov.in) or visit nearest Raitha Samparka Kendra.",
        "Select crop season (Kharif / Rabi) and enter FRUITS ID.",
        "Land details and survey numbers are automatically retrieved from Bhoomi.",
        "Select crop sown and area in acres/guntas.",
        "Pay farmer share of premium online or at bank counter.",
        "Collect policy acknowledgment number with proposal receipt.",
        "Track loss claims and payment settlements directly on Samrakshane."
      ],
      kn: [
        "ಸಂರಕ್ಷಣೆ ಪೋರ್ಟಲ್‌ಗೆ (samrakshane.karnataka.gov.in) ಭೇಟಿ ನೀಡಿ.",
        "ಬೆಳೆ ಹಂಗಾಮು (ಖಾರೀಫ್ / ರಬಿ) ಆರಿಸಿ, FRUITS ಐಡಿ ನಮೂದಿಸಿ.",
        "ಭೂಮಿ ತಂತ್ರಾಂಶದಿಂದ ಜಮೀನಿನ ವಿವರ ತಾಳೆಯಾಗುತ್ತದೆ.",
        "ಬಿತ್ತಿದ ಬೆಳೆ ಆರಿಸಿ ರೈತರ ಪಾಲಿನ ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಿ.",
        "ವಿಮಾ ರಶೀದಿ ಪಡೆದು ಹಾನಿ ಪರಿಹಾರದ ಸ್ಥಿತಿಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ."
      ]
    },
    commonMistakes: {
      en: [
        "Missing the strict seasonal cut-off date for premium deposit.",
        "Discrepancy between crop recorded on RTC and crop declared in insurance proposal."
      ],
      kn: ["ಸರ್ಕಾರ ನಿಗದಿಪಡಿಸಿದ ಕಡೆಯ ದಿನಾಂಕದೊಳಗೆ ಪ್ರೀಮಿಯಂ ಪಾವತಿಸದಿರುವುದು."]
    },
    fees: { en: "1.5% to 2% subsidized farmer premium; rest paid by State & Central Governments.", kn: "ಕೇವಲ 1.5% ರಿಂದ 2% ಕಡಿಮೆ ಪ್ರೀಮಿಯಂ." },
    processingInfo: { en: "Assessed based on Crop Cutting Experiments (CCE) and localized weather stations.", kn: "ಬೆಳೆ ಕಟಾವು ಪ್ರಯೋಗಗಳು ಮತ್ತು ಹವಾಮಾನ ವರದಿ ಆಧಾರಿಸಿ ಪರಿಹಾರ ಜಮೆ." },
    officialUrl: "https://samrakshane.karnataka.gov.in",
    sourceUrl: "https://fruits.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-22T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "Sprout"
  },
  {
    id: "svc-senior-citizen-card",
    name: "Senior Citizen Identity Card",
    nameKn: "ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ",
    slug: "senior-citizen-card",
    description: {
      en: "Official identity card certifying senior citizen status (age 60+), granting concessional bus passes, healthcare priority, banking interest benefits, and elder care protection.",
      kn: "60 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಬಸ್ ಪ್ರಯಾಣ ರಿಯಾಯಿತಿ, ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಆದ್ಯತೆ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಅಧಿಕೃತ ಗುರುತಿನ ಚೀಟಿ."
    },
    state: "Karnataka",
    department: "Directorate of Empowerment of Differently Abled and Senior Citizens Karnataka",
    category: "health",
    mode: "Online (Seva Sindhu) / Bangalore One / Grama One",
    processingTime: "15 - 20 Working Days",
    fee: "Free / ₹25 nominal service charge at centers",
    validity: "Permanent (Lifetime)",
    eligibility: {
      en: [
        "Indian citizen resident of Karnataka.",
        "Must have attained 60 years of age on date of application."
      ],
      kn: [
        "ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿರಬೇಕು.",
        "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 60 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು."
      ]
    },
    documents: {
      en: [
        "Proof of Age (Aadhaar / Voter ID / Passport / School TC)",
        "Proof of Residence (Ration Card / Electricity Bill)",
        "Blood Group Report certified by laboratory or doctor",
        "Recent passport photographs"
      ],
      kn: [
        "ವಯಸ್ಸಿನ ಪುರಾವೆ (ಆಧಾರ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ)",
        "ವಿಳಾಸದ ಪುರಾವೆ",
        "ರಕ್ತದ ಗುಂಪಿನ (Blood Group) ವರದಿ",
        "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು"
      ]
    },
    applicationSteps: {
      en: [
        "Visit Seva Sindhu Karnataka portal.",
        "Select 'Application for Senior Citizen Identity Card'.",
        "Enter applicant age, address, blood group, and emergency contact.",
        "Upload scanned photograph and age proof.",
        "Submit and download acknowledgement slip.",
        "District Disability/Welfare Officer approves card for home postal delivery."
      ],
      kn: [
        "ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ 'ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ' ಅರ್ಜಿ ಆಯ್ಕೆಮಾಡಿ.",
        "ವಯಸ್ಸು, ವಿಳಾಸ, ರಕ್ತದ ಗುಂಪು ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕ ವಿವರ ದಾಖಲಿಸಿ.",
        "ಫೋಟೋ ಮತ್ತು ವಯಸ್ಸಿನ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
        "ಜಿಲ್ಲಾ ಕಲ್ಯಾಣಾಧಿಕಾರಿಗಳ ಅನುಮೋದನೆ ನಂತರ ಕಾರ್ಡ್ ಲಭ್ಯವಾಗುತ್ತದೆ."
      ]
    },
    commonMistakes: {
      en: ["Submitting application before completing 60 years of age."],
      kn: ["60 ವರ್ಷ ತುಂಬುವ ಮುನ್ನವೇ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು."]
    },
    fees: { en: "Free online; ₹25 at citizen centers.", kn: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಉಚಿತ." },
    processingInfo: { en: "15 to 20 days.", kn: "15 ರಿಂದ 20 ದಿನಗಳು." },
    officialUrl: "https://sevasindhu.karnataka.gov.in",
    sourceUrl: "https://welfareofdisabled.karnataka.gov.in",
    language: "en,kn",
    lastVerifiedAt: "2026-09-11T00:00:00.000Z",
    status: "VERIFIED",
    iconName: "UserCheck"
  }
];

export const CATEGORIES_LIST = [
  { id: "all", labelEn: "All Services", labelKn: "ಎಲ್ಲಾ ಸೇವೆಗಳು" },
  { id: "certificates", labelEn: "Certificates", labelKn: "ಪ್ರಮಾಣಪತ್ರಗಳು" },
  { id: "education", labelEn: "Education", labelKn: "ಶಿಕ್ಷಣ" },
  { id: "schemes", labelEn: "Schemes", labelKn: "ಯೋಜನೆಗಳು" },
  { id: "revenue", labelEn: "Revenue & Land", labelKn: "ಕಂದಾಯ ಮತ್ತು ಭೂಮಿ" },
  { id: "transport", labelEn: "Transport", labelKn: "ಸಾರಿಗೆ" },
  { id: "health", labelEn: "Health & Welfare", labelKn: "ಆರೋಗ್ಯ ಮತ್ತು ಕಲ್ಯಾಣ" },
  { id: "employment", labelEn: "Employment", labelKn: "ಉದ್ಯೋಗ" },
  { id: "identity", labelEn: "Identity", labelKn: "ಗುರುತು" },
  { id: "agriculture", labelEn: "Agriculture", labelKn: "ಕೃಷಿ" }
];

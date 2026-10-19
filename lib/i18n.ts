export const LANGS = ["en", "kn"] as const;
export type Lang = (typeof LANGS)[number];
export type Localized<T> = { en: T } & Partial<Record<Lang, T>>;

export function pick<T>(v: unknown, lang: Lang): T | undefined {
  const o = v as Partial<Record<Lang, T>> | null;
  return o?.[lang] ?? o?.en;
}

const en = {
  // Brand
  brandName: "SevaGuide AI",
  tagline: "Your Government Service Assistant",
  badgeGovSimple: "🇮🇳 Government Services Made Simple",
  
  // Navigation
  navHome: "Home",
  navServices: "Services",
  navAssistant: "AI Assistant",
  navResources: "Resources",
  navAbout: "About",
  navDashboard: "Dashboard",
  navAdmin: "Admin",
  signIn: "Sign In",
  signOut: "Sign Out",

  // Hero
  heroTitle1: "Find Government",
  heroTitle2: "Services Easily",
  heroSubtitle: "Get step-by-step guidance for Karnataka government services, documents, eligibility, fees, and application processes with the help of AI.",
  searchPlaceholder: "Search for a government service...",
  voiceSearch: "Voice search",
  searchBtn: "Search",
  popularServices: "Popular Services",
  popularIncome: "Income Certificate",
  popularCaste: "Caste Certificate",
  popularResidence: "Residence Certificate",
  popularScholarship: "Scholarship",
  popularRTC: "RTC",
  popularDL: "Driving Licence",

  // CTA Cards
  ctaFindTitle: "Find a Service",
  ctaFindSub: "Browse all government services",
  ctaAITitle: "Ask SevaGuide AI",
  ctaAISub: "Get instant AI guidance",

  // Trust Strip
  trustReliable: "Reliable Information",
  trustKarnataka: "Karnataka Focused",
  trustMultilingual: "Multilingual Support",
  trustStepByStep: "Step-by-Step Guidance",

  // Stats
  statServicesCount: "200+",
  statServicesLabel: "Government Services",
  statCitizensCount: "50K+",
  statCitizensLabel: "Citizens Helped",
  statQueriesCount: "10K+",
  statQueriesLabel: "Queries Resolved",
  statFreeCount: "100%",
  statFreeLabel: "Free to Use",

  // Services Directory
  servicesHeading: "Government Services",
  servicesSubtitle: "Find the service you need and understand exactly how to apply.",
  servicesFilterAll: "All",
  servicesResultsFound: "services found",
  servicesNoMatch: "No services match your search. Try different keywords or reset category filters.",
  estProcessingTime: "Est. Time",
  officialDepartment: "Department",
  viewDetails: "View Checklist & Steps",

  // Categories
  cat: {
    all: "All",
    certificates: "Certificates",
    education: "Education",
    schemes: "Schemes",
    revenue: "Revenue",
    transport: "Transport",
    health: "Health",
    employment: "Employment",
    identity: "Identity",
    agriculture: "Agriculture",
  } as Record<string, string>,

  // Service Detail Tabs & Key Info
  tabOverview: "Overview",
  tabEligibility: "Eligibility",
  tabDocuments: "Documents",
  tabProcess: "Process",
  tabFees: "Fees",
  tabFAQs: "FAQs",
  
  keyDept: "Department",
  keyMode: "Mode of Application",
  keyTime: "Processing Time",
  keyFee: "Government Fee",
  keyValidity: "Validity",
  
  // Checklist
  reqDocsTitle: "Required Documents",
  docsReady: "documents ready",
  downloadChecklist: "Download Checklist",
  printChecklist: "Print Checklist",
  shareChecklist: "Share Checklist",
  allDocsReadyNotice: "Great! All required documents are assembled. Proceed to the official portal.",
  checklistStoredLocal: "Checklist progress is securely preserved on your device.",

  // Process Timeline
  applicationTimelineTitle: "Step-by-Step Application Timeline",
  guidanceVsOfficialTitle: "Important Distinction",
  guidanceVsOfficialText: "SevaGuide AI provides free civic guidance. Official applications must be completed exclusively on the official government portal.",
  openOfficialPortal: "Open Official Portal ↗",
  officialSource: "Source URL",

  // AI Assistant Chat
  aiNewChat: "New Chat",
  aiToday: "Today",
  aiPreviousChats: "Previous Conversations",
  aiSavedChats: "Saved Chats",
  aiComposerPlaceholder: "Ask anything about government services...",
  aiSend: "Send",
  aiVoiceTooltip: "Click to speak your question in English or Kannada",
  aiAttachTooltip: "Attach document or reference query",
  aiListening: "Listening...",
  aiThinking: "SevaGuide AI is analyzing verified government criteria...",
  suggestedPromptsTitle: "Suggested Questions:",
  suggested1: "How can I apply for an income certificate?",
  suggested2: "What documents are required for caste certificate?",
  suggested3: "Which scholarships am I eligible for?",
  suggested4: "How do I check RTC online?",

  // AI Cards
  cardOfficialPortal: "Official Portal",
  cardChecklistTitle: "Actionable Checklist",
  cardImportantTitle: "Important Notice",
  cardAiTipTitle: "AI Pro Tip",
  cardVerifiedFactsTitle: "Verified Government Facts",
  cardGeneralGuidanceTitle: "General Guidance",
  cardThingsToVerifyTitle: "Verify Before Submitting",

  // Footer & Disclaimer
  footerDisclaimerTitle: "Notice & Disclaimer",
  footerDisclaimerText: "SevaGuide AI is an independent civic-tech information assistant and is NOT an official government website, agency, or portal. Information is curated for citizen awareness. Rules and fees may be updated by government bodies; always verify on official portals.",
  copyrightText: "© 2026 SevaGuide AI. Empowering citizens across Karnataka and India.",

  // Errors & Alerts
  errGeneric: "Something went wrong. Please try again.",
  errBusy: "Assistant is currently busy. Please wait a moment.",
  verifiedBadge: "Verified Service",
  demoBadge: "Demo Information",
  clDetails: "Fill in your application details",
  clVerify: "Verify information on the official portal",
  clSubmit: "Submit through the official portal",
  verified: "Verified Information",
  needsVerification: "Verification Required",
  lastVerified: "Last verified",
};

type Dict = typeof en;

const kn: Dict = {
  // Brand
  brandName: "ಸೇವಾಗೈಡ್ AI (SevaGuide AI)",
  tagline: "ನಿಮ್ಮ ಸರ್ಕಾರಿ ಸೇವಾ ಸಹಾಯಕ",
  badgeGovSimple: "🇮🇳 ಸರ್ಕಾರಿ ಸೇವೆಗಳು ಸರಳವಾಗಿ",

  // Navigation
  navHome: "ಮುಖಪುಟ",
  navServices: "ಸೇವೆಗಳು",
  navAssistant: "AI ಸಹಾಯಕ",
  navResources: "ಸಂಪನ್ಮೂಲಗಳು",
  navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
  navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  navAdmin: "ನಿರ್ವಹಣೆ (Admin)",
  signIn: "ಲಾಗಿನ್",
  signOut: "ಲಾಗ್‌ಔಟ್",

  // Hero
  heroTitle1: "ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು",
  heroTitle2: "ಸುಲಭವಾಗಿ ಹುಡುಕಿ",
  heroSubtitle: "ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಸೇವೆಗಳು, ದಾಖಲೆಗಳು, ಅರ್ಹತೆ, ಶುಲ್ಕ ಮತ್ತು ಅರ್ಜಿ ಹಂತಗಳ ಬಗ್ಗೆ AI ಸಹಾಯದೊಂದಿಗೆ ಹಂತ-ಹಂತದ ನಿಖರ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
  searchPlaceholder: "ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಹುಡುಕಿ...",
  voiceSearch: "ಧ್ವನಿ ಹುಡುಕಾಟ",
  searchBtn: "ಹುಡುಕಿ",
  popularServices: "ಜನಪ್ರಿಯ ಸೇವೆಗಳು",
  popularIncome: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
  popularCaste: "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ",
  popularResidence: "ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ",
  popularScholarship: "ವಿದ್ಯಾರ್ಥಿವೇತನ",
  popularRTC: "ಆರ್‌ಟಿಸಿ (ಪಹಣಿ)",
  popularDL: "ಚಾಲನಾ ಪರವಾನಗಿ (DL)",

  // CTA Cards
  ctaFindTitle: "ಸೇವೆ ಹುಡುಕಿ",
  ctaFindSub: "ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
  ctaAITitle: "ಸೇವಾಗೈಡ್ AI ಕೇಳಿ",
  ctaAISub: "ತಕ್ಷಣವೇ AI ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",

  // Trust Strip
  trustReliable: "ವಿಶ್ವಾಸಾರ್ಹ ಮಾಹಿತಿ",
  trustKarnataka: "ಕರ್ನಾಟಕಕ್ಕೆ ಆದ್ಯತೆ",
  trustMultilingual: "ದ್ವಿಭಾಷಾ ಬೆಂಬಲ",
  trustStepByStep: "ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶನ",

  // Stats
  statServicesCount: "200+",
  statServicesLabel: "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
  statCitizensCount: "50,000+",
  statCitizensLabel: "ನಾಗರಿಕರಿಗೆ ನೆರವು",
  statQueriesCount: "10,000+",
  statQueriesLabel: "ಪ್ರಶ್ನೆಗಳಿಗೆ ಪರಿಹಾರ",
  statFreeCount: "100%",
  statFreeLabel: "ಸಂಪೂರ್ಣ ಉಚಿತ",

  // Services Directory
  servicesHeading: "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
  servicesSubtitle: "ನಿಮಗೆ ಬೇಕಾದ ಸೇವೆಯನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ನಿಖರ ವಿಧಾನವನ್ನು ತಿಳಿಯಿರಿ.",
  servicesFilterAll: "ಎಲ್ಲಾ",
  servicesResultsFound: "ಸೇವೆಗಳು ದೊರೆತಿವೆ",
  servicesNoMatch: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಸೇವೆಗಳು ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಪದ ಬಳಸಿ ಅಥವಾ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ.",
  estProcessingTime: "ಅಂದಾಜು ಸಮಯ",
  officialDepartment: "ಇಲಾಖೆ",
  viewDetails: "ಚೆಕ್‌ಲಿಸ್ಟ್ ಮತ್ತು ಹಂತಗಳನ್ನು ವೀಕ್ಷಿಸಿ",

  // Categories
  cat: {
    all: "ಎಲ್ಲಾ",
    certificates: "ಪ್ರಮಾಣಪತ್ರಗಳು",
    education: "ಶಿಕ್ಷಣ",
    schemes: "ಯೋಜನೆಗಳು",
    revenue: "ಕಂದಾಯ & ಭೂಮಿ",
    transport: "ಸಾರಿಗೆ",
    health: "ಆರೋಗ್ಯ & ಕಲ್ಯಾಣ",
    employment: "ಉದ್ಯೋಗ",
    identity: "ಗುರುತಿನ ಚೀಟಿ",
    agriculture: "ಕೃಷಿ",
  },

  // Service Detail Tabs & Key Info
  tabOverview: "ಅವಲೋಕನ",
  tabEligibility: "ಅರ್ಹತೆ",
  tabDocuments: "ದಾಖಲೆಗಳು",
  tabProcess: "ಪ್ರಕ್ರಿಯೆ",
  tabFees: "ಶುಲ್ಕ",
  tabFAQs: "ಪ್ರಶ್ನೋತ್ತರ",

  keyDept: "ಇಲಾಖೆ",
  keyMode: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ",
  keyTime: "ಪ್ರಕ್ರಿಯೆ ಸಮಯ",
  keyFee: "ಸರ್ಕಾರಿ ಶುಲ್ಕ",
  keyValidity: "ಮಾನ್ಯತೆಯ ಅವಧಿ",

  // Checklist
  reqDocsTitle: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
  docsReady: "ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ",
  downloadChecklist: "ಚೆಕ್‌ಲಿಸ್ಟ್ ಡೌನ್‌ಲೋಡ್",
  printChecklist: "ಚೆಕ್‌ಲಿಸ್ಟ್ ಪ್ರಿಂಟ್",
  shareChecklist: "ಹಂಚಿಕೊಳ್ಳಿ",
  allDocsReadyNotice: "ಉತ್ತಮ! ನಿಮ್ಮ ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ. ಈಗ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.",
  checklistStoredLocal: "ನಿಮ್ಮ ದಾಖಲೆಗಳ ಚೆಕ್‌ಲಿಸ್ಟ್ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಯುತ್ತದೆ.",

  // Process Timeline
  applicationTimelineTitle: "ಹಂತ-ಹಂತದ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ಪ್ರಕ್ರಿಯೆ",
  guidanceVsOfficialTitle: "ಮುಖ್ಯ ಸೂಚನೆ",
  guidanceVsOfficialText: "ಸೇವಾಗೈಡ್ AI ಸ್ವತಂತ್ರ ಮಾಹಿತಿ ವೇದಿಕೆಯಾಗಿದೆ. ಅಧಿಕೃತ ಅರ್ಜಿಯನ್ನು ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿಯೇ ಸಲ್ಲಿಸಬೇಕು.",
  openOfficialPortal: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ ↗",
  officialSource: "ಮೂಲ ವೆಬ್‌ಸೈಟ್",

  // AI Assistant Chat
  aiNewChat: "ಹೊಸ ಸಂಭಾಷಣೆ",
  aiToday: "ಇಂದು",
  aiPreviousChats: "ಹಿಂದಿನ ಸಂಭಾಷಣೆಗಳು",
  aiSavedChats: "ಉಳಿಸಿದ ಚಾಟ್‌ಗಳು",
  aiComposerPlaceholder: "ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...",
  aiSend: "ಕಳುಹಿಸಿ",
  aiVoiceTooltip: "ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಧ್ವನಿಯ ಮೂಲಕ ಕೇಳಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
  aiAttachTooltip: "ದಾಖಲೆ ಅಥವಾ ಉಲ್ಲೇಖ ಪ್ರಶ್ನೆ ಲಗತ್ತಿಸಿ",
  aiListening: "ಆಲಿಸುತ್ತಿದೆ...",
  aiThinking: "ಸೇವಾಗೈಡ್ AI ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದೆ...",
  suggestedPromptsTitle: "ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು:",
  suggested1: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?",
  suggested2: "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?",
  suggested3: "ನನಗೆ ಯಾವ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು ಲಭ್ಯವಿವೆ?",
  suggested4: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಹಣಿ (RTC) ನೋಡುವುದು ಹೇಗೆ?",

  // AI Cards
  cardOfficialPortal: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್",
  cardChecklistTitle: "ಕಾರ್ಯಸಾಧ್ಯ ಚೆಕ್‌ಲಿಸ್ಟ್",
  cardImportantTitle: "ಮುಖ್ಯ ಸೂಚನೆ",
  cardAiTipTitle: "AI ಸಲಹೆ",
  cardVerifiedFactsTitle: "ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಸತ್ಯಗಳು",
  cardGeneralGuidanceTitle: "ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ",
  cardThingsToVerifyTitle: "ಸಲ್ಲಿಸುವ ಮುನ್ನ ಪರಿಶೀಲಿಸಿ",

  // Footer & Disclaimer
  footerDisclaimerTitle: "ಸೂಚನೆ ಮತ್ತು ಹಕ್ಕು ನಿರಾಕರಣೆ",
  footerDisclaimerText: "ಸೇವಾಗೈಡ್ AI ನಾಗರಿಕರಿಗೆ ಮಾಹಿತಿ ಒದಗಿಸುವ ಸ್ವತಂತ್ರ ವೇದಿಕೆಯಾಗಿದ್ದು, ಯಾವುದೇ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ಪ್ರಾಧಿಕಾರವಲ್ಲ. ಸರ್ಕಾರಿ ನಿಯಮಗಳು ಬದಲಾಗಬಹುದು; ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  copyrightText: "© 2026 SevaGuide AI. ಕರ್ನಾಟಕ ಹಾಗೂ ಭಾರತೀಯ ನಾಗರಿಕರ ಸೇವೆಗಾಗಿ.",

  // Errors & Alerts
  errGeneric: "ಏನೋ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  errBusy: "ಸಹಾಯಕ ಸದ್ಯ ಕಾರ್ಯನಿರತವಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ಕಾಯಿರಿ.",
  verifiedBadge: "ಪರಿಶೀಲಿಸಿದ ಸೇವೆ",
  demoBadge: "ಮಾದರಿ ಮಾಹಿತಿ",
  clDetails: "ಅರ್ಜಿ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
  clVerify: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ",
  clSubmit: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಸಲ್ಲಿಸಿ",
  verified: "ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿ",
  needsVerification: "ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
  lastVerified: "ಕೊನೆಯ ಪರಿಶೀಲನೆ",
};

const dicts: Record<Lang, Dict> = { en, kn };
export const t = (lang: Lang): Dict => dicts[lang] ?? en;

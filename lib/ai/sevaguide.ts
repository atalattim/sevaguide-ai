import "server-only";
import type { GovernmentService } from "@prisma/client";
import { groqChat, GroqError } from "@/lib/groq";
import { searchServices, getService, getAllServices } from "@/lib/services";
import type { ChatTurn, SevaAnswer } from "@/types/ai";
import { ALL_SERVICES } from "@/lib/data/servicesData";

type L = "en" | "kn";
type Intent = "documents" | "eligibility" | "steps" | "fees" | "website" | "mistakes" | "general";

export const SYSTEM_PROMPT = `You are SevaGuide AI, an AI assistant that helps users understand Indian and Karnataka government services.

Provide clear, concise, step-by-step guidance.

Never claim to be a government authority.

Never fabricate official rules, fees, deadlines, URLs, eligibility requirements, or application statuses.

When information may have changed, clearly tell the user to verify it on the official government portal.

Separate general guidance from official information.

Ask clarifying questions when the user's state, service, category, age, or purpose matters.

Prefer Karnataka-specific guidance when the user asks about Karnataka.

Explain complex government processes in simple language.

When appropriate, structure responses as:

1. Eligibility
2. Required Documents
3. Application Process
4. Fees
5. Processing Time
6. Official Portal
7. Important Notes

Never request unnecessary sensitive personal information.
Answer in the user's selected language. When answering in Kannada, use clear, natural Kannada.

Reply with ONLY a JSON object in this format:
{
  "answer": "Clear, markdown-formatted structured explanation",
  "verifiedFacts": ["Fact 1", "Fact 2"],
  "generalGuidance": ["Guidance 1", "Guidance 2"],
  "thingsToVerify": ["Item 1", "Item 2"],
  "checklistItems": ["Document 1", "Document 2"],
  "importantNotes": ["Warning 1"],
  "aiTip": "Practical tip for faster processing"
}`;

const INTENTS: [Intent, RegExp][] = [
  ["documents", /document|proof|certificate needed|ದಾಖಲೆ|dakhale|documents beku/i],
  ["eligibility", /eligib|who can|qualify|ಅರ್ಹ|arhate/i],
  ["fees", /fee|cost|charge|price|ಶುಲ್ಕ|shulka/i],
  ["website", /website|portal|url|link|ವೆಬ್|apply online/i],
  ["mistakes", /mistake|reject|error|ತಪ್ಪು|tappu/i],
  ["steps", /step|process|how to|how do|apply|procedure|ಹಂತ|ಪ್ರಕ್ರಿಯೆ|hege/i],
];

export function detectIntent(msg: string): Intent {
  return INTENTS.find(([, re]) => re.test(msg))?.[0] ?? "general";
}

const ALIASES: Record<string, string[]> = {
  "income-certificate": ["income", "aadaya", "adaya", "ಆದಾಯ", "income certificate"],
  "caste-certificate": ["caste", "jati", "jaati", "jathi", "ಜಾತಿ", "caste certificate"],
  "residence-certificate": ["residence", "residency", "domicile", "vasa", "ವಾಸ", "residential"],
  "scholarship": ["scholarship", "vidyarthi", "ವಿದ್ಯಾರ್ಥಿವೇತನ", "ssp", "post-matric", "pre-matric"],
  "rtc": ["rtc", "pahani", "bhoomi", "land record", "survey number", "ಪಹಣಿ", "ಭೂಮಿ"],
  "driving-licence": ["driving licence", "driver", "licence", "license", "dl", "ll", "learner", "ಚಾಲನಾ", "parivahan"],
  "ration-card": ["ration card", "bpl", "apl", "ahara", "ಪಡಿತರ", "ರೇಷನ್"],
  "pan-card": ["pan", "pan card", "income tax", "ಪ್ಯಾನ್"],
  "gruha-lakshmi": ["gruha lakshmi", "gruhalakshmi", "2000", "ಗೃಹಲಕ್ಷ್ಮಿ"],
  "yuva-nidhi": ["yuva nidhi", "yuvanidhi", "unemployment", "ಯುವ ನಿಧಿ"],
  "crop-insurance": ["crop insurance", "samrakshane", "fasal bima", "pmfby", "ಬೆಳೆ ವಿಮೆ"],
  "senior-citizen-card": ["senior citizen", "elderly", "60 years", "ಹಿರಿಯ ನಾಗರಿಕ"],
};

export function findMatchingService(msg: string, all: GovernmentService[], hintSlug?: string): GovernmentService | null {
  const m = msg.toLowerCase();
  let best: { svc: GovernmentService; score: number } | null = null;
  for (const svc of all) {
    const keys = [
      svc.name.toLowerCase(),
      svc.nameKn ? svc.nameKn.toLowerCase() : "",
      ...(ALIASES[svc.slug] ?? []),
    ].filter(Boolean);
    
    let score = 0;
    for (const k of keys) {
      if (m.includes(k.toLowerCase())) {
        score += k.length > 3 ? 3 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { svc, score };
    }
  }
  return best?.svc ?? all.find((s) => s.slug === hintSlug) ?? null;
}

const isVerified = (s: GovernmentService) => s.status === "VERIFIED";
const pickL = <T>(v: unknown, l: L): T | undefined =>
  (v as Record<string, T> | null)?.[l] ?? (v as Record<string, T> | null)?.en;

export function buildContext(svc: GovernmentService, lang: L, intent: Intent): string {
  const verified = isVerified(svc);
  const j = (v: unknown) => (v == null ? "Not available" : JSON.stringify(v));
  return [
    `SERVICE: ${svc.name}${svc.nameKn ? ` (${svc.nameKn})` : ""}`,
    `DEPARTMENT: ${svc.department} | STATE: ${svc.state} | CATEGORY: ${svc.category}`,
    `VERIFICATION: ${verified ? "VERIFIED GOVERNMENT SERVICE" : "UNVERIFIED"}`,
    `OFFICIAL PORTAL URL: ${svc.officialUrl ?? "Not specified"}`,
    `SOURCE URL: ${svc.sourceUrl ?? "Not specified"}`,
    `USER INTENT FOCUS: ${intent}`,
    `DESCRIPTION: ${pickL<string>(svc.description, lang)}`,
    `ELIGIBILITY: ${j(pickL(svc.eligibility, lang))}`,
    `DOCUMENTS: ${j(pickL(svc.documents, lang))}`,
    `APPLICATION STEPS: ${j(pickL(svc.applicationSteps, lang))}`,
    `COMMON MISTAKES: ${j(pickL(svc.commonMistakes, lang))}`,
    `FEES: ${j(pickL(svc.fees, lang))}`,
    `PROCESSING INFO: ${j(pickL(svc.processingInfo, lang))}`,
  ].join("\n");
}

function parseModelJson(raw: string) {
  const cleaned = raw.replace(/^```(?:json)?|```$/gm, "").trim();
  try {
    const o = JSON.parse(cleaned);
    return {
      answer: typeof o.answer === "string" ? o.answer : "",
      verifiedFacts: Array.isArray(o.verifiedFacts) ? o.verifiedFacts : [],
      generalGuidance: Array.isArray(o.generalGuidance) ? o.generalGuidance : [],
      thingsToVerify: Array.isArray(o.thingsToVerify) ? o.thingsToVerify : [],
      checklistItems: Array.isArray(o.checklistItems) ? o.checklistItems : [],
      importantNotes: Array.isArray(o.importantNotes) ? o.importantNotes : [],
      aiTip: typeof o.aiTip === "string" ? o.aiTip : undefined,
    };
  } catch {
    return {
      answer: cleaned,
      verifiedFacts: [],
      generalGuidance: [],
      thingsToVerify: [],
      checklistItems: [],
      importantNotes: [],
      aiTip: undefined,
    };
  }
}

export const containsSensitive = (m: string) =>
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/.test(m) ||
  /\botp\b\D{0,10}\d{4,8}/i.test(m) ||
  /password\s*[:=]/i.test(m);

// Local fallback response when Groq key is not yet set in environment
function buildLocalAnswer(svc: GovernmentService, lang: L): SevaAnswer {
  const isKn = lang === "kn";
  const name = isKn && svc.nameKn ? svc.nameKn : svc.name;
  const desc = pickL<string>(svc.description, lang) ?? "";
  const docs = (pickL<string[]>(svc.documents, lang) ?? []).slice(0, 5);
  const steps = (pickL<string[]>(svc.applicationSteps, lang) ?? []).slice(0, 5);
  const elig = (pickL<string[]>(svc.eligibility, lang) ?? []).slice(0, 3);
  const fees = pickL<string>(svc.fees, lang) ?? (isKn ? "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಡಿ" : "Verify on portal");
  const proc = pickL<string>(svc.processingInfo, lang) ?? (isKn ? "7 - 14 ಕೆಲಸದ ದಿನಗಳು" : "7 - 14 working days");

  const answer = isKn
    ? `### ${name} ಬಗ್ಗೆ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶನ

**ವಿವರಣೆ:**
${desc}

#### 1. ಅರ್ಹತೆ
${elig.map((e, i) => `${i + 1}. ${e}`).join("\n")}

#### 2. ಅಗತ್ಯ ದಾಖಲೆಗಳು
${docs.map((d, i) => `${i + 1}. ${d}`).join("\n")}

#### 3. ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಹಂತಗಳು
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

#### 4. ಶುಲ್ಕ & ಪ್ರಕ್ರಿಯೆ ಸಮಯ
- **ಶುಲ್ಕ:** ${fees}
- **ಅಂದಾಜು ಸಮಯ:** ${proc}

> **ಗಮನಿಸಿ:** ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಿಯಮಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`
    : `### Comprehensive Guide for ${name}

**Overview:**
${desc}

#### 1. Eligibility Criteria
${elig.map((e, i) => `${i + 1}. ${e}`).join("\n")}

#### 2. Required Documents Checklist
${docs.map((d, i) => `${i + 1}. ${d}`).join("\n")}

#### 3. Step-by-Step Application Process
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

#### 4. Government Fees & Processing Time
- **Statutory Fee:** ${fees}
- **Estimated Duration:** ${proc}

> **Official Notice:** SevaGuide AI provides guidance only. Always review latest statutory guidelines on the official portal before submitting your application.`;

  return {
    answer,
    language: lang,
    verifiedFacts: [
      `Official Department: ${svc.department}`,
      `State Jurisdiction: ${svc.state}`,
      `Statutory Fee: ${fees}`,
      `Estimated Processing: ${proc}`
    ],
    generalGuidance: [
      isKn ? "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರುವ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಕೈಯಲ್ಲಿಟ್ಟುಕೊಳ್ಳಿ." : "Ensure your mobile number is actively linked to your Aadhaar card for instant OTP e-KYC.",
      isKn ? "ಎಲ್ಲಾ ದಾಖಲೆಗಳ ಸ್ಪಷ್ಟ ಸ್ಕ್ಯಾನ್ ಪ್ರತಿಗಳನ್ನು ಸಿದ್ಧವಾಗಿಡಿ." : "Keep clean, high-resolution scanned copies of all identity and address proofs."
    ],
    thingsToVerify: [
      isKn ? "ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಮೂದಿಸಲಾದ ಕೊನೆಯ ದಿನಾಂಕ ಅಥವಾ ಶುಲ್ಕ ಬದಲಾವಣೆ." : "Verify latest application windows and notifications on official portal.",
      isKn ? "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ NPCI ಮ್ಯಾಪಿಂಗ್ ಸಕ್ರಿಯವಾಗಿದೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ." : "Confirm your bank account is linked to NPCI Aadhaar DBT mapper."
    ],
    checklistItems: docs,
    importantNotes: [
      isKn ? "ಅನಧಿಕೃತ ದಲ್ಲಾಳಿಗಳು ಅಥವಾ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬೇಡಿ." : "Never pay unauthorized agents or private intermediaries. Use official government counters only."
    ],
    aiTip: isKn ? "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ನಂತರ GSC ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆಯನ್ನು ಸೇವ್ ಮಾಡಿಡಿ." : "Always preserve your application reference / GSC acknowledgment slip for real-time status tracking.",
    officialUrl: svc.officialUrl,
    serviceSlug: svc.slug,
    serviceName: name,
    modelUsed: "SevaGuide AI Intelligence Engine",
  };
}

export async function answerQuestion(input: {
  message: string;
  lang: L;
  history: ChatTurn[];
  serviceSlug?: string;
}): Promise<SevaAnswer> {
  const { message, lang, history, serviceSlug } = input;

  if (containsSensitive(message)) {
    return {
      answer: lang === "kn"
        ? "ದಯವಿಟ್ಟು ಆಧಾರ್ ಸಂಖ್ಯೆ, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ OTP ಯಂತಹ ಸೂಕ್ಷ್ಮ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ನಾನು ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಮಾರ್ಗದರ್ಶನಕ್ಕೆ ಮಾತ್ರ ಸಹಾಯಕನಾಗಿದ್ದೇನೆ."
        : "Please do not share sensitive personal information such as Aadhaar numbers, passwords, bank credentials, or OTPs. I am here to guide you on services and documentation.",
      language: lang,
      verifiedFacts: [],
      generalGuidance: [],
      thingsToVerify: [],
      officialUrl: null,
      serviceSlug: null,
      serviceName: null,
    };
  }

  const all = await getAllServices();
  const svc = findMatchingService(message, all, serviceSlug) || (serviceSlug ? await getService(serviceSlug) : null);

  if (!svc) {
    const listNames = all.slice(0, 6).map((s) => (lang === "kn" && s.nameKn ? s.nameKn : s.name)).join(", ");
    return {
      answer: lang === "kn"
        ? `ನಮ್ಮ ಕರ್ನಾಟಕ ನಾಗರಿಕ ಸೇವಾ ಕೋಶದಲ್ಲಿ ನೀವು ಕೇಳಿದ ನಿರ್ದಿಷ್ಟ ಸೇವೆ ಲಭ್ಯವಿಲ್ಲ. ಲಭ್ಯವಿರುವ ಜನಪ್ರಿಯ ಸೇವೆಗಳು: **${listNames}** ಇತ್ಯಾದಿ. ನೀವು ಈ ಸೇವೆಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಒಂದರ ಬಗ್ಗೆ ಕೇಳಬಹುದು.`
        : `I could not locate an exact match in our verified Karnataka civic database. Popular services available include: **${listNames}**. Feel free to ask about any of these, or specify your requirement.`,
      language: lang,
      verifiedFacts: [],
      generalGuidance: [
        lang === "kn" ? "ವಿವರಣೆಗಾಗಿ ಸೇವೆಯ ಹೆಸರನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಮೂದಿಸಿ." : "Please specify the exact name of the government certificate or scheme."
      ],
      thingsToVerify: [],
      officialUrl: "https://sevasindhu.karnataka.gov.in",
      serviceSlug: null,
      serviceName: null,
    };
  }

  // Attempt live Groq chat if GROQ_API_KEY is configured
  const hasGroqKey = !!process.env.GROQ_API_KEY?.trim();
  if (hasGroqKey) {
    try {
      const intent = detectIntent(message);
      const context = buildContext(svc, lang, intent);
      const raw = await groqChat(
        [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "system",
            content: `CONTEXT (Source of Truth for verified facts):\n${context}\n\nSelected Language: ${lang === "kn" ? "Kannada (kn)" : "English (en)"}`,
          },
          ...history.slice(-6),
          { role: "user", content: message },
        ],
        { json: true, timeoutMs: 20000 }
      );

      const parsed = parseModelJson(raw);
      if (parsed.answer) {
        return {
          answer: parsed.answer,
          language: lang,
          verifiedFacts: isVerified(svc) ? parsed.verifiedFacts : [],
          generalGuidance: parsed.generalGuidance,
          thingsToVerify: parsed.thingsToVerify.length
            ? parsed.thingsToVerify
            : [lang === "kn" ? "ಸಲ್ಲಿಸುವ ಮೊದಲು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ." : "Verify on official portal before submitting."],
          checklistItems: parsed.checklistItems.length
            ? parsed.checklistItems
            : pickL<string[]>(svc.documents, lang) || [],
          importantNotes: parsed.importantNotes,
          aiTip: parsed.aiTip,
          officialUrl: svc.officialUrl,
          serviceSlug: svc.slug,
          serviceName: lang === "kn" && svc.nameKn ? svc.nameKn : svc.name,
          modelUsed: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        };
      }
    } catch (groqErr) {
      console.warn("[Groq Fallback triggered]", (groqErr as Error).message);
    }
  }

  // Resilient fallback grounded directly in our verified database
  return buildLocalAnswer(svc, lang);
}

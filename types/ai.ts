export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type SevaAnswer = {
  answer: string;
  language: "en" | "kn";
  verifiedFacts: string[];
  generalGuidance: string[];
  thingsToVerify: string[];
  officialUrl: string | null;
  serviceSlug: string | null;
  serviceName: string | null;
  checklistItems?: string[];
  importantNotes?: string[];
  aiTip?: string;
  modelUsed?: string;
};

export type ApiError = {
  error: string;
  code: string;
};

import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { 
  FileCheck, 
  Phone, 
  HelpCircle, 
  ExternalLink, 
  ShieldCheck, 
  Landmark, 
  Download, 
  BookOpen, 
  AlertCircle 
} from "lucide-react";

export const metadata = {
  title: "Citizen Resources & Helplines — SevaGuide AI",
  description:
    "Official Karnataka citizen helpline numbers, portal links, and essential documentation guides.",
};

export default async function ResourcesPage() {
  const lang = await getLang();
  const dict = t(lang);

  const helplines = [
    { name: "Seva Sindhu Citizen Helpdesk", number: "080-22230282 / 080-22279954", hours: "9:00 AM - 6:00 PM (Working days)" },
    { name: "Nadakacheri Revenue Services", number: "080-22370281", hours: "10:00 AM - 5:30 PM" },
    { name: "Karnataka Sakala Mission", number: "080-44554455", hours: "24/7 Citizen Right to Services Helpline" },
    { name: "State Scholarship Portal (SSP)", number: "1902 / 080-35254757", hours: "Academic Working Hours" },
    { name: "Bhoomi Land Records Toll-Free", number: "080-22113251", hours: "10:00 AM - 5:30 PM" },
    { name: "Karnataka Transport (RTO / Parivahan)", number: "080-22864666", hours: "Transport Working Days" },
  ];

  const guides = [
    {
      title: "How to Link Aadhaar with NPCI for Direct Benefit Transfer (DBT)",
      description: "Crucial step-by-step procedure to ensure government scholarships, Gruha Lakshmi, and PM-KISAN funds are not blocked by bank servers.",
      tag: "Banking & DBT",
      slug: "scholarship",
    },
    {
      title: "Understanding Karnataka Sakala Timelines & Rejection Endorsements",
      description: "Know your statutory rights under the Guarantee of Services to Citizens Act and how to challenge wrongful rejections.",
      tag: "Citizen Rights",
      slug: "income-certificate",
    },
    {
      title: "How to Get Certified Copy of RTC / Pahani Online in 5 Minutes",
      description: "Step-by-step walkthrough of viewing and downloading official digitally-signed land ownership documents on Bhoomi.",
      tag: "Land Records",
      slug: "rtc",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Citizen Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
          Citizen Resources & Helplines
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-slate-600">
          Official statutory emergency contacts, verified helpline phone numbers, and procedural guides for Karnataka residents.
        </p>
      </div>

      {/* Official Helplines Directory */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Phone className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-bold text-navy-900">
            Official Karnataka Government Helplines
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {helplines.map((hl, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80 space-y-2 hover:border-brand/40 transition-colors"
            >
              <h3 className="text-sm font-bold text-navy-900">{hl.name}</h3>
              <p className="text-base font-extrabold text-brand tracking-wide">{hl.number}</p>
              <p className="text-xs text-slate-400">{hl.hours}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Procedural Guides */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FileCheck className="h-5 w-5 text-govgreen" />
          <h2 className="text-xl font-bold text-navy-900">
            Essential Procedure Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {guides.map((g, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-slate-50 p-6 border border-slate-200/80 space-y-4 hover:border-brand/40 transition-all"
            >
              <div className="space-y-2">
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-brand border border-blue-200/60">
                  {g.tag}
                </span>
                <h3 className="text-base font-bold text-navy-900">{g.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
              </div>

              <Link
                href={`/services/${g.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
              >
                <span>Read Full Guidance</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

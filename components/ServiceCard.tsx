import Link from "next/link";
import type { GovernmentService } from "@prisma/client";
import { pick, t, type Lang } from "@/lib/i18n";
import { 
  FileCheck, 
  Award, 
  Home, 
  GraduationCap, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Compass, 
  Heart, 
  Briefcase, 
  Sprout, 
  UserCheck, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface ServiceCardProps {
  svc: GovernmentService;
  lang: Lang;
}

export default function ServiceCard({ svc, lang }: ServiceCardProps) {
  const dict = t(lang);
  const isVerified = svc.status === "VERIFIED";

  // Pick suitable Lucide icon based on slug or category
  const getIcon = () => {
    switch (svc.slug) {
      case "income-certificate":
      case "income-certificate-karnataka":
        return <FileCheck className="h-6 w-6 text-brand" />;
      case "caste-certificate":
      case "caste-certificate-karnataka":
        return <Award className="h-6 w-6 text-govorange" />;
      case "residence-certificate":
      case "residence-certificate-karnataka":
        return <Home className="h-6 w-6 text-govgreen" />;
      case "scholarship":
      case "student-scholarships":
        return <GraduationCap className="h-6 w-6 text-indigo-600" />;
      case "rtc":
        return <MapPin className="h-6 w-6 text-emerald-600" />;
      case "driving-licence":
        return <Compass className="h-6 w-6 text-blue-600" />;
      case "pan-card":
        return <CreditCard className="h-6 w-6 text-sky-600" />;
      case "ration-card":
        return <ShoppingBag className="h-6 w-6 text-amber-600" />;
      case "gruha-lakshmi":
        return <Heart className="h-6 w-6 text-rose-500" />;
      case "yuva-nidhi":
        return <Briefcase className="h-6 w-6 text-violet-600" />;
      case "crop-insurance":
        return <Sprout className="h-6 w-6 text-lime-600" />;
      case "senior-citizen-card":
        return <UserCheck className="h-6 w-6 text-teal-600" />;
      default:
        return <FileCheck className="h-6 w-6 text-brand" />;
    }
  };

  const title = lang === "kn" && svc.nameKn ? svc.nameKn : svc.name;
  const description = pick<string>(svc.description, lang) ?? "";
  const processingTime = svc.processingInfo 
    ? (typeof svc.processingInfo === "string" ? svc.processingInfo : pick<string>(svc.processingInfo, lang) ?? "7 - 14 Days")
    : "7 - 14 Days";

  return (
    <Link
      href={`/services/${svc.slug}`}
      className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-card border border-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
    >
      <div>
        {/* Top Header: Icon + Category Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-brand-soft transition-colors">
            {getIcon()}
          </div>
          <div className="flex items-center gap-1.5">
            {isVerified && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified</span>
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {dict.cat[svc.category] ?? svc.category}
            </span>
          </div>
        </div>

        {/* Title & Department */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500 line-clamp-1">
            {svc.department}
          </p>
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Info & Arrow */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{processingTime}</span>
        </div>

        <div className="flex items-center gap-1 font-semibold text-brand group-hover:translate-x-1 transition-transform">
          <span>{dict.viewDetails}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { Shield, ExternalLink, HelpCircle, FileCheck, Landmark } from "lucide-react";

export default async function Footer() {
  const lang = await getLang();
  const dict = t(lang);

  return (
    <footer className="mt-20 border-t border-slate-200 bg-navy-950 text-slate-300">
      {/* Official State Portals Direct Link Bar */}
      <div className="border-b border-navy-800/80 bg-navy-900/60 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-300">
            <Landmark className="h-4 w-4 text-amber-400" />
            <span className="font-semibold text-white">Karnataka Official Gateways:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-300">
            <a
              href="https://sevasindhu.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              Seva Sindhu <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://nadakacheri.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              Nadakacheri <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://bhoomi.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              Bhoomi (RTC) <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://ssp.postmatric.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              SSP Scholarship <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://ahara.kar.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              Ahara (Ration) <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-md">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                SevaGuide <span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="max-w-md text-sm text-slate-300 leading-relaxed">
              {dict.heroSubtitle}
            </p>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
              <strong className="block font-semibold text-amber-300 mb-1">
                {dict.footerDisclaimerTitle}
              </strong>
              {dict.footerDisclaimerText}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.navServices}
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/services?category=certificates" className="hover:text-white transition-colors">
                  {dict.cat.certificates}
                </Link>
              </li>
              <li>
                <Link href="/services?category=education" className="hover:text-white transition-colors">
                  {dict.cat.education}
                </Link>
              </li>
              <li>
                <Link href="/services?category=schemes" className="hover:text-white transition-colors">
                  {dict.cat.schemes}
                </Link>
              </li>
              <li>
                <Link href="/services?category=revenue" className="hover:text-white transition-colors">
                  {dict.cat.revenue}
                </Link>
              </li>
              <li>
                <Link href="/services?category=transport" className="hover:text-white transition-colors">
                  {dict.cat.transport}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.navResources}
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/ai-assistant" className="hover:text-white transition-colors">
                  {dict.navAssistant}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Application Checklists
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {dict.navAbout}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {dict.navDashboard}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row pb-16 md:pb-0">
          <p>{dict.copyrightText}</p>
          <div className="flex items-center gap-6">
            <span>Built for Karnataka & Indian Citizens</span>
            <span>•</span>
            <span>Privacy-First Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
